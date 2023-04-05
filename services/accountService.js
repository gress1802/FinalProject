const Account = require('../models/account');

async function getAccountByEmail(email) {
  try {
    const account = await Account.findOne({
      where: { email },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    return account;
  } catch (error) {
    console.error('Error getting account by email:', error);
    return null;
  }
}

module.exports = {
  getAccountByEmail
};
