import * as CryptoJS from 'crypto-js';

const PROGRAM_KEY = '94C3C2CEDDD345AFA269643B0AA27A29';
const AES_KEY = 'EcaremeFC1AesKey';
const AES_KEY_HEX = CryptoJS.enc.Utf8.parse(AES_KEY);
const PROGRAM_KEY_HEX = CryptoJS.enc.Utf8.parse(PROGRAM_KEY);

const options = {
	mode: CryptoJS.mode.ECB,
	padding: CryptoJS.pad.Pkcs7,
};

export function encodeBase64(str: string) {
	return Buffer.from(str).toString('base64');
}

export function decodeBase64(str: string) {
	return Buffer.from(str, 'base64').toString('utf8');
}

export function md5(str: string): string {
	return CryptoJS.MD5(str).toString();
}

export function encryptAES(str: string): string {
	return CryptoJS.AES.encrypt(str, AES_KEY_HEX, options).toString();
}

export function encryptAESBase64(str: string): string {
	return encodeBase64(encryptAES(str));
}

export function decryptAES(str: string): string {
	return CryptoJS.AES.decrypt(str, AES_KEY_HEX, options).toString(CryptoJS.enc.Utf8);
}

export function decryptAESBase64(str: string): string {
	return decryptAES(decodeBase64(str));
}

// check
export function encryptTripleDES(str: string): string {
	return CryptoJS.TripleDES.encrypt(str, PROGRAM_KEY_HEX, options).toString();
}

// check
export function decryptTripleDES(str: string): string {
	return CryptoJS.TripleDES.decrypt(str, PROGRAM_KEY_HEX, options).toString(CryptoJS.enc.Utf8);
}
