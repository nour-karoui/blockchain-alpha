import EC from 'elliptic/lib/elliptic/ec/index.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const ec = new EC('secp256k1');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const privateKeyLocation = __dirname + '/wallet/private_key';

const initWallet = () => {
    let privateKey;
    if (fs.existsSync(privateKeyLocation)) {
        const buffer = fs.readFileSync(privateKeyLocation, 'utf8');
        privateKey = buffer.toString();
    } else {
        privateKey = generatePrivateKey();
        fs.writeFileSync(privateKeyLocation, privateKey);
    }

    const key = ec.keyFromPrivate(privateKey, 'hex');
    const publicKey = key.getPublic().encode('hex');
    return({'privateKeyLocation': privateKeyLocation, 'publicKey': publicKey});
};

const generatePrivateKey = () => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
};

export default initWallet;