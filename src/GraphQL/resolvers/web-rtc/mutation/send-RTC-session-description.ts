import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import RTCSessionDescriptionType from '../../../../types/enums/RTCSessionDescriptionType.js';
import pubsub from '../../../pubsub.js';
import AccountModel from '../../../../mongodb/models/account.js';

interface SendRTCSessionDescriptionArgs {
  accountIDs: string[];
  room: string;
  sdp: string;
  type: RTCSessionDescriptionType;
}

export default async function (
  parent: any,
  args: SendRTCSessionDescriptionArgs,
  context: CLMRequest
) {
  const { bearer } = context;

  if (!bearer) {
    throw new HTTPError('Login to use this feature!', 401);
  }

  const { accountIDs, room, sdp, type } = args;

  try {
    const otherAccounts = await AccountModel.find({
      _id: {
        $in: accountIDs
      }
    });

    for (const otherAccount of otherAccounts) {
      pubsub.publish(`${room}-${otherAccount._id.toString()}`, {
        subscribeWebRTC: {
          remote_account: bearer._id,
          sdp,
          type
        }
      });
    }

    return true;
  } catch {
    return false;
  }
}
