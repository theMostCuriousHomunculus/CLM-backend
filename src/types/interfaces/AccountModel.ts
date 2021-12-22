import mongoose from 'mongoose';

import Account from './Account';

// https://mongoosejs.com/docs/typescript/statics.html

export default interface AccountModel extends mongoose.Model<Account> {
  findByCredentials(email: string, enteredPassword: string): Promise<Account>;
}
