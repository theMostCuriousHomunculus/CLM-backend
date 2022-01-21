import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import RTCSessionDescriptionType from '../../../../types/enums/RTCSessionDescriptionType.js';
import pubsub from '../../../pubsub.js';
import AccountModel from '../../../../models/account-model.js';

interface SendRTCSessionDescriptionArgs {
  accountID: string;
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

  const { accountID, room, sdp, type } = args;

  try {
    const otherAccount = await AccountModel.findById(accountID);

    if (otherAccount) {
      otherAccount.tokens.forEach((token) => {
        pubsub.publish(`${room}-${token}`, {
          subscribeWebRTC: {
            remote_account: bearer._id.toString(),
            sdp,
            type
          }
        });
      });
    }

    return true;
  } catch {
    return false;
  }
}
