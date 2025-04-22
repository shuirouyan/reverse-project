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


const { Base64 } = require('js-base64');
const Encrypt = require('encryptlong');
const fs = require('fs'); // 引入文件系统模块


const args = process.argv.slice(2);
console.log('接收到的参数：', args);

if (args.length < 1) 
    return 

// 从文件中读取数据
let data_read = fs.readFileSync('D:/temp/scrapy_crawl/handlerjson/' + 'page'+ args[0] +'.json', 'utf8').trim();



// let setPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCHXm0qOftPMakEZHPK8aA5u2JBcKeki/Bfa9V8/gM9pDk/CqD57A+kVEngpkiFjw5Xw6W9bdA9BAXzkrWLFtX/krLXIdDvl3j7q2q99/OkIkCcqkNiuerDohio870bP3NaIqU3mDtEY4v+wZ68twENfpBdnDInarfcUwnuGEOxtQIDAQAB '
// setPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCirQ0N6EeHtgzIIGFkKzotkA3omuNvN6O3fFy/3qWhGhwAra/Nno650DdHv5SJagERW18KN9bZZlOb1krvA1h1GhfZYkh6kxxDPKawC9ikjuacThLYCRR3oPvSbhfIoGvL8E/Gi76XcjqXpNpolSKNBvgmLYEEGoIRS5jnPuLEIwIDAQAB "
// setPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCh5jfSmQvEeBZHUEijsYTnL9Xl4Wg0ogEHxp9XiXH/5IU+pqPzAU2iHgs1M/D4lkLCakexQSTgIXleBPCAwYfLkfmLkLav6y5EMUu78kx4nuH/2X696T1LPuzql88zLkxdY2ZADmJ3r9Lgcrp7SwpSHdc2YdK8ybv9L+1WhfOR8QIDAQAB "

// let getPublicKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJEEJnSMbC4rdP+iJombOnGnpvbPJOG6WMDc7TeN21PkKEJ8xncY3UgNzoLD1WxLdPaWbtwc2nn9jVmL0/D8TKmOdOTglV/S4HPT1ew47sTZKvB0LExIyGIbhaWbZoLzhZtaqRd3ITwQxH9FBXQlbtC5mFo4E+Y88qmoJ9eyGr3tAgMBAAECgYEAgfudWIRxhyTOt0ApmNg5l5w1rS5ZGbeFTEH6ovwVJunwKEBdSG1SEv7FJzLPv0UXbtvCPKvkLMpXg3cxHuWW9FuTJuN8voDOlWhC5FNJ7P21yy6NoXNZS3p6IuUrrAXJFdKStWkjXo6aAXVivuXKy0CIYoPD8dafRGmhqCi+S2UCQQDdQvGAQTdjfMJmBmCW755yecjY8j57G4D+bYl+9NN/VTM1DYeQf6RwHbz4ecW6UzY4VWWeyQMldIwoyUiv9dn7AkEAp8i3hE9JKTnNqjX49vRCGzejPYbm+5VO0DiphXtOkea3H5q78pGS4KMQK3fASKECZ/gwo0mmsTcO9bWqo/drNwJAUEmrYnPHyoUJ8YWc5Qg8QaPperekbn2TeD99JiFm4YykETtAlvGKVNilqrBdTHhHc3ehcVXVm3DIL0Ci7J7UowJAOhhBkspxJpkhISJ3BeslSI9HMnKXX90e4PH9oH5FgjdEiOjm0uKc3LMZUjOwnHVDhARnsuI5mXra7zDr2MI+mQJAePA5Ez73I38mkGLWi0ALYPoYN2Z9vNGi43/Suh2y8KiI152vLC/oDO2P97gf55K62fe03jgiDthCbLTrQwaoHA== '
// getPublicKey = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKpiI/kqGHrvqiT2PVeeHsfVNfwwBRNC60LElB2jiuuxrHiHZTauAhoRDC/HDjRce+1dDAOIexQs+aKpn1jxBhOPda3CL4I3ienb/p8pRYZtXZvkCQL3Je1HzolH0oENpthV0l9gGdOEOx0k254kofJTewKB2IB/7SX5sddwZTnhAgMBAAECgYA9HmlTFvOjHdfF3ILSrEjUXDo6VatsZmPoFoYfP6w0sg5xSfhXrgHZAeaCOQBybf6Sff8yQUINUbjWzcv4ZrVLtnMkenN/Ea1rZQ7mRBki1DCQ5HCoBsRsMAtigLo8gJvzHwcn7IpE13RLd/lcEMhZUCaFEn3G2PDgjoH/bxSlwQJBAOXZRMcZ+HmBffnmSq7mVQnq9FuX/E2axNXBoKFYbguxe2OCgpYqFB2HOZ2BIWKldGdr6OdUkvKE54TOAdhRcakCQQC9xNfntksVIdu+ycqxoaQghFwaCc+Om+2gY8HOcad53jygfFMYVqNMbMrcd529hyr+WByAAxdZYWObcYdJhRl5AkAM3iYIk36ipso7tFXYBtMZ9ApsGk0otxJv+SAaCE5Y3z3OK19OMtrfcFOcar9Iu4SRyavHT6fOZfxkJfhaeOzJAkALGgrveVCnKdXrMW70OVqatGOW+l/0Hdcm/O8HnsqHbKLrWJqb3+WpwOuVPkIyJkgznP/91TB2gCYNn/SkLm8xAkByxCc3f/ma62HveCDPpzHwWJ8wzjUJbUKE9vcRfbeaCYmUvXYYUpj4ZYi+1khmO8yxhdg4D1VeLCaAGsTX+ckt "
let getPublicKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKj9TylY/NmIxort9VUwO2intyTxrzmdVWEmpouuidIOXEvez0HzYrkGx/QzAlEBXlQO30Xf9J8hTIHGqYQuYmuSABt5VwdyZloNUOFDWfrtuM5a3ODWwwfFAZ3Ec28adiX5hOmT5q6rqju98DRQWROZK6LKaz8cT3xsXYR3l3PbAgMBAAECgYEAibBLDa955WyyCIS2PkDcRvtQGAPr94+f/1ZUoL8HgGU/Anp6eIvsRkGmLexZ2NK6nta3SOGfGQEyqxLJD/ATM6m/BvR4hfQlWQZXVRfQrmRQ5k3ElwmBYn3i90AMh+udXh1kRcPROXqPugKr3wUuGDUaFsreLj7egTQC76XclMECQQDmVPmq3T0nYp9SCzzF4xgwIan0KfcDi4LyxI4KleHP9j3MiDYZTp9K+3I3TcwrC8UpIakmi7cj70yUfarqEctrAkEAu9JTcq3c1W+JFZyrWZENJ589zC2N7fxPheEafSmY8yS0IFt8eE6lL/y6de6Y9vS91GO0I5Xs6V3HpNgr0TcFUQJALOptNXCnOEL3JpyiYUSDtv8ZkU+Np9dQ1d6WhGHuAwvVyUjWo+C9F3YpM7esFMjazcaOocGlGRDVMi+/YJ3PuQJAMZL4N6KwUR2ZXzz09TUV9clQNF4pwhEApGOf7D1Yg4TCjm/XUKHhc+MPDCWn9jbvC+otF99wor///ACawCP3oQJAHk+/LBtdy2eLZK5PHbybjv3oHfJFe3exaxGvlL5c+IQnQIJm5eYq47sQD9keOMmVXsKY+YERA1+LPITXIBjcEQ== "


let resp = ''

var encryptorJm = new Encrypt.JSEncrypt();

encryptorJm.setPrivateKey(getPublicKey);

resp=data_read;


var result = encryptorJm.decryptLong(resp);

const ResultData = Base64.decode(result);

console.log(ResultData);
// 将解码后的数据写入到文件
fs.writeFileSync('D:/temp/scrapy_crawl/handlerjson/' + 'page_decoded_data'+ args[0] +'.json', ResultData);
console.log('解码后的数据已成功写入到 decoded_data.txt 文件中');