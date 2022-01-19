import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import EventPlayer from '../../../../types/interfaces/EventPlayer.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface AddICECandidateArgs {
  // address: string;
  candidate: string;
  // component: string;
  // foundation: string;
  // port: number;
  // priority: number;
  // protocol: string;
  // relatedAddress: string;
  // relatedPort: number;
  sdpMLineIndex: number;
  sdpMid: string;
  // tcpType: string;
  // type: string;
  usernameFragment: string;
}

export default async function (
  parent: any,
  args: AddICECandidateArgs,
  context: CLMRequest
) {
  const { event, player } = context;

  if (!event || !player)
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );

  const {
    // address,
    candidate,
    // component,
    // foundation,
    // port,
    // priority,
    // protocol,
    // relatedAddress,
    // relatedPort,
    sdpMLineIndex,
    sdpMid,
    // tcpType,
    // type,
    usernameFragment
  } = args;

  (player as EventPlayer).ice_candidates.push({
    // address,
    candidate,
    // component,
    // foundation,
    // port,
    // priority,
    // protocol,
    // relatedAddress,
    // relatedPort,
    sdpMLineIndex,
    sdpMid,
    // tcpType,
    // type,
    usernameFragment
  });

  await event.save();
  pubsub.publish(event._id.toString(), { subscribeEvent: event });

  return event;
}
