// https://github.com/LN-Zap/lndconnect/blob/master/lnd_connect_uri.md
const fs = require('fs')
const base64url = require('base64url')
const ip = require('ip')

// ip
const address = ip.address()
const port = '10009'
const url = `${address}:${port}`

// open tls.cert file
const certFile = fs.readFileSync('./tls.cert', 'utf8');

// remove '-----BEGIN CERTIFICATE-----', '-----END CERTIFICATE-----' and line breaks
let lines = certFile.split(/\n/);
lines = lines.filter(line => line != "");
lines.pop();
lines.shift();
const cert = base64url.fromBase64(lines.join(''));

// open macaroon file in base64 encoding
const macaroonPath = './admin.macaroon' 
const macaroonData = fs.readFileSync(macaroonPath);
const macaroon = base64url(Buffer.from(macaroonData));

const lnconnect = 'lndconnect://' + url + '?cert=' + cert + '&macaroon=' + macaroon
console.log(lnconnect)