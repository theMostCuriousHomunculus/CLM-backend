import ICECandidate from '../../../../types/interfaces/ICECandidate.js';
import RTCSessionDescription from '../../../../types/interfaces/RTCSessionDescription.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default function (
  message: ICECandidate | RTCSessionDescription
  // context: any,
  // info: any
) {
  if ('candidate' in message) return 'ICECandidate';
  if ('sdp' in message) return 'RTCSessionDescription';

  throw new HTTPError('Invalid type.', 500);
}
