const crypto = require('crypto')

//this is used to generate the secret keys for access and refresh token 
// which is used in .env file

const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');
console.table({ key1, key2 })