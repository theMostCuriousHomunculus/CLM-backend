import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import EventPlayer from '../../../../types/interfaces/EventPlayer.js';

export default async function (
  parent: EventPlayer,
  args: null,
  context: CLMRequest
) {
  const { bearer } = context;
  if (!bearer || parent.account.toString() !== bearer._id.toString()) {
    return null;
  } else {
    return parent.queue[0];
  }
}
