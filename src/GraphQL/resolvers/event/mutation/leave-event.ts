import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import EventPlayer from '../../../../types/interfaces/EventPlayer.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { event, player } = context;

  if (!event || !player) {
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );
  }

  try {
    (player as EventPlayer).answers.splice(
      0,
      (player as EventPlayer).answers.length
    );
    (player as EventPlayer).offers.splice(
      0,
      (player as EventPlayer).offers.length
    );
    (player as EventPlayer).present = false;

    for (const plr of event.players) {
      plr.answers.pull({ remote_account: player.account._id });
      plr.offers.pull({ remote_account: player.account._id });
    }

    await event.save();

    return true;
  } catch {
    return false;
  }
}
