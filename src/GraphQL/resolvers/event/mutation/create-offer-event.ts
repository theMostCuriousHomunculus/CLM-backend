import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import RTCSessionDescriptionType from '../../../../types/enums/RTCSessionDescriptionType.js';
import pubsub from '../../../pubsub.js';

interface CreateOfferEventArgs {
  accountID: string;
  sdp: string;
}

export default async function (
  parent: any,
  args: CreateOfferEventArgs,
  context: CLMRequest
) {
  const { event, player } = context;

  if (!event || !player) {
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );
  }

  const { accountID, sdp } = args;

  const otherPlayer = event.players.find(
    (plr) => plr.account._id.toString() === accountID
  );

  if (otherPlayer) {
    otherPlayer.offers.pull({ remote_account: player.account._id.toString() });

    otherPlayer.offers.push({
      remote_account: player.account._id,
      type: RTCSessionDescriptionType.OFFER,
      sdp
    });

    await event.save();
    pubsub.publish(event._id.toString(), { subscribeEvent: event });
  }

  return event;
}
