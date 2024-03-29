import AccountModel from '../../../../mongodb/models/account.js';
import ICECandidate from '../../../../types/interfaces/ICECandidate.js';
import RTCSessionDescription from '../../../../types/interfaces/RTCSessionDescription.js';

export default async function (parent: ICECandidate | RTCSessionDescription) {
  return await AccountModel.findById(parent.remote_account);
}
