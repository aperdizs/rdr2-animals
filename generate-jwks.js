const fs = require('fs');
const { pem2jwk, jwk2pem } = require('pem-jwk');

const str = fs.readFileSync('./keys/privkey.pem');
const jwk = pem2jwk(str);

jwk.use = 'sig';
jwk.kid = 'rdr2';
fs.writeFileSync('./keys/jwks.json', JSON.stringify({keys: [jwk]}));
console.log('File generated in jwk.json');
