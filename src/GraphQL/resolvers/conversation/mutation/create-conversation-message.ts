import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import ConversationModel from '../../../../mongodb/models/conversation.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface CreateConversationMessageArgs {
  body: string;
  participants?: [string];
}

export default async function (
  parent: any,
  args: CreateConversationMessageArgs,
  context: CLMRequest
) {
  const { bearer, conversation } = context;

  if (!bearer) {
    throw new HTTPError('You must be logged in to send messages.', 401);
  }

  const { body, participants } = args;

  if (conversation) {
    conversation.messages.push({
      author: bearer._id,
      body
    });

    try {
      await conversation.save();

      for (const participantID of conversation.participants) {
        const participant = await AccountModel.findById(participantID);
        pubsub.publish(participantID.toString(), {
          subscribeAccount: participant
        });
      }

      return conversation;
    } catch (error) {
      throw new HTTPError((error as Error).message, 500);
    }
  } else {
    if (!participants || participants.length < 2) {
      throw new HTTPError(
        'No ConversationID provided and the list of participants either was not provided contained fewer than 2 AccountIDs.',
        400
      );
    }

    // check to see if a conversation with all and only the participants already exists
    const existingConversation = await ConversationModel.findOne({
      participants: { $size: participants.length, $all: participants }
    });

    if (existingConversation) {
      existingConversation.messages.push({
        author: bearer._id,
        body
      });

      try {
        await existingConversation.save();

        for (const participantID of existingConversation.participants) {
          const participant = await AccountModel.findById(participantID);
          pubsub.publish(participantID.toString(), {
            subscribeAccount: participant
          });
        }

        return existingConversation;
      } catch (error) {
        throw new HTTPError((error as Error).message, 500);
      }
    } else {
      const newConversation = new ConversationModel({
        participants,
        messages: [
          {
            author: bearer._id,
            body
          }
        ]
      });

      try {
        await newConversation.save();

        for (const participantID of newConversation.participants) {
          const participant = await AccountModel.findById(participantID);
          pubsub.publish(participantID.toString(), {
            subscribeAccount: participant
          });
        }

        return newConversation;
      } catch (error) {
        throw new HTTPError((error as Error).message, 500);
      }
    }
  }
}
