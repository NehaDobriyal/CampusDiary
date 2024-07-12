import crypto from 'crypto';
import { promisify } from 'util';

const generateKeyPair = promisify(crypto.generateKeyPair);

const generateSymmetricKey = () => crypto.randomBytes(32);

export const encryptMessage = (message, symmetricKey) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedMessage: encrypted, iv: iv.toString('hex') };
};

export const decryptMessage = (encryptedMessage, symmetricKey, iv) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', symmetricKey, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

export const encryptSymmetricKey = (symmetricKey, publicKey) => {
    return crypto.publicEncrypt(publicKey, symmetricKey).toString('hex');
};

export const decryptSymmetricKey = (encryptedKey, privateKey) => {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedKey, 'hex'));
};
