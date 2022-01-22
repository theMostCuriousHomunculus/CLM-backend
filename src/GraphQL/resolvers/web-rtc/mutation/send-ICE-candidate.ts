import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface SendICECandidateArgs {
  accountIDs: string[];
  // address: string;
  candidate: string;
  // component: string;
  // foundation: string;
  // port: number;
  // priority: number;
  // protocol: string;
  // relatedAddress: string;
  // relatedPort: number;
  room: string;
  sdpMLineIndex: number;
  sdpMid: string;
  // tcpType: string;
  // type: string;
  usernameFragment: string;
}

export default async function (
  parent: any,
  args: SendICECandidateArgs,
  context: CLMRequest
) {
  const { bearer } = context;

  if (!bearer) {
    throw new HTTPError('Login to use this feature!', 401);
  }

  const {
    accountIDs,
    // address,
    candidate,
    // component,
    // foundation,
    // port,
    // priority,
    // protocol,
    // relatedAddress,
    // relatedPort,
    room,
    sdpMLineIndex,
    sdpMid,
    // tcpType,
    // type,
    usernameFragment
  } = args;

  try {
    const otherAccounts = await AccountModel.find({
      _id: {
        $in: accountIDs
      }
    });
    for (const otherAccount of otherAccounts) {
      pubsub.publish(`${room}-${otherAccount._id.toString()}`, {
        subscribeWebRTC: {
          candidate,
          remote_account: bearer._id,
          sdpMLineIndex,
          sdpMid,
          usernameFragment
        }
      });
    }

    return true;
  } catch {
    return false;
  }
}
