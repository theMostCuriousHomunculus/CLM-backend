import Account from '../../../../types/interfaces/Account';
import CLMRequest from '../../../../types/interfaces/CLMRequest';

export default async function (
  parent: Account,
  args: any,
  context: CLMRequest
) {
  const { bearer } = context;

  if (!bearer) {
    return false;
  } else {
    bearer.tokens = bearer.tokens.filter((token) => {
      return token !== context.token;
    });

    await bearer.save();
    return true;
  }
}
