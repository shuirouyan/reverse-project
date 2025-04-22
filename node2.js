const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html>', {
    url: 'http://localhost',
    referrer: 'http://localhost',
    contentType: 'text/html',
    includeNodeLocations: true,
    storageQuota: 10000000
});

// 将 JSDOM 中的全局对象挂载到 Node.js 的全局对象上
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = dom.window.localStorage;
global.sessionStorage = dom.window.sessionStorage;

// 模拟 requestAnimationFrame 和 cancelAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);


const Encrypt = require('encryptlong');


const args = process.argv.slice(2);
// console.log('接收到的参数：', args, ' typeof data', typeof args, ' ', args[0]);

let setPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLFTKREvMgAd0hcpzasCmmq1Z4RRVX/VgrINqEeenZ3FH1GKBpr/KQKJDqO/tBrDNGKkT1ZbiG0xB8BkRpncZQ3ri+jUmV7Xktz+ICcpoZX7MxTxwtbWAxBOgOj4lC/BqTS3v+YrhhSuX9YYGR4qg3fFIWFoDy2Qp9LYBdxSQH5wIDAQAB "

let resp = args[0]
// console.log(`resp:${resp}`)

var encryptorJm = new Encrypt.JSEncrypt();

encryptorJm.setPublicKey(setPublicKey)

// 对字符串进行 Base64 编码
const encodedString = Buffer.from(JSON.stringify(JSON.parse(resp)), 'utf8').toString('base64');

data = encryptorJm.encryptLong(JSON.stringify(encodedString))

console.log(data);

