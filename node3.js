

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

const axios = require('axios');
const { Base64 } = require('js-base64')
const Encrypt = require('encryptlong');
const fs = require('fs');
// 发送 GET 请求
async function sendGetRequest(current) {

    try {

        const config = {
            headers: {
                'Host': 'www.cnpcbidding.com',
                'Connection': 'keep-alive',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'sec-ch-ua-platform': "Windows",
                'MACHINE_CODE': new Date().getTime(),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*,',
                'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
                'sec-ch-ua-mobile': '?0',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://www.cnpcbidding.com/',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'zh-CN,zh;q=0.9'
            }
        };
        const response = await axios.get('https://www.cnpcbidding.com/cms/css/bj.css', config);
        // console.log('GET 请求响应数据:', response.data);
        let res = response.data
        const css = res.split('.')
        const css1 = css[1]
        const css2 = css[2]
        const regex = /base64,([^)]+)\)/
        const c1 = css1.match(regex)
        const c2 = css2.match(regex)
        // localStorage.setItem('logo1', c1[1])
        // localStorage.setItem('logo2', c2[1])
        console.log('logo1', c1[1])
        console.log('logo2', c2[1])
        let item = {
            'logo1': c1[1],
            'logo2': c2[1]
        }
        // let current = 5

        let params = {
            "current": current,
            "size": 10000,
            "condition": {
                "columnId": "21",
                "title": "",
                "projectType": ""
            }
        };
        console.log(`params:${JSON.stringify(params)}`)

        // let base64_str = JSON.stringify(Base64.encode(JSON.stringify(params)))

        let base64_str = Buffer.from(JSON.stringify(params), 'utf8').toString('base64');


        console.log(`base_64 str:${base64_str}`)
        var encryptorJm = new Encrypt.JSEncrypt();
        let item_logo1 = item.logo1
        console.log(`item_logo1:${JSON.stringify(item)}`)

        // encryptorJm.setPublicKey(item_logo1)
        encryptorJm.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXTUYmP7Hc9YsiB8vpZQeMrnXEdBuCH0IvUZFgGKgshuAp80Zy+q7J19qG/algealatS6efDMC0KYDdwBUQLII6sW87xC1wFE4VkA3UWNpwkrwalxKg4Dw4Sm+Cp1eZGY40s8n7Snu+h35pcjK1IuOXvmxVW9plXqmtaImBQDpmQIDAQAB ")
        let encData = encryptorJm.encryptLong(JSON.stringify(base64_str))
        console.log(`encData:${JSON.stringify(JSON.stringify(encData))}`)


        url = 'https://www.cnpcbidding.com/cms/article/page'
        let config2 = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Length': '174',
                'Content-Type': 'application/json;charset=UTF-8',
                'Host': 'www.cnpcbidding.com',
                'MACHINE_CODE': 'null',
                'Origin': 'https://www.cnpcbidding.com',
                'Pragma': 'no-cache',
                'Referer': 'https://www.cnpcbidding.com/?',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': 'Windows'
            }
        }
        // encData = "gy4BFLLwAFz9X7wGhC2szQ2xwCBnut/c1ksA1+vc1QgEisqh0g2IzOl6fnGvzqX1yPMR9FkN0qUMpbnC9zOirk0+hl3gGsiBXTKEGtb+u3yC48hHcu02RLvV86oKNFkc6GWYYjSB1TqT2S81YAcheu/V5GoGDT0zFKJ888NM1Ts=";

        // 发送加密请求参数数据，得到加密响应数据
        const response1 = await axios.post(url, JSON.stringify(encData), config2);
        console.log(`=======> response1:${JSON.stringify(response1.data)}`)

        if (JSON.stringify(response1.data).startsWith('"')) {
            // 解码响应数据
            var decryptorJm = new Encrypt.JSEncrypt();
            decryptorJm.setPrivateKey("MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKs1NnxN4+Y3axzpBYEJ7F2eJkD3ZHoAlZPVmn89nsPHviNCzS82w7IFKrzh7f1SMxIynvKsn+7kx44INYSODv1RlLQj6L718/1wf4kn8DMriF3Pwwku10PpMZ8n0w+i3q9QLYAUcS9YKY8HiH9UXvfZZ+mCo0CI7HYiAan9lrkTAgMBAAECgYBho/du7P0MTo7H7h01enNS8N7gLjcfXTXxGeECsCHbhg7qDS73vkPdQxUco70Wu8pklnoP7GNJ2y/z0Lq03k+tOQbvvD+XbMeul91LOwco6Z7YvDovoxiFv8XpgvkRnYJe2UZQV1WbzIvW05fYfFoSHl+lfrmVDSmdY+J5ugkAAQJBAOW0H+cbNMZfyfJqCQVDPdnqCMlKrb6m4+UMpoWxZZ58NwzjHiBOqP2bk4FGpwUbXXu8DULuiM6lQmGg56/1uoECQQC+zsP/G97sTB+M6BwGDnctLokBFIzFnM7A/v1k9pBwFVgS0Rx9hM4CnKTz9wXCpNGmiTQmgbugbJv83z25ciGTAkEAivFrosWIJL5oT2PoVPCZhyjTa77qXbphe3kteQ0XJMiKHBd9b5llCxKCJN5xxNsKrv/PHb9frW+1OYy02HDRAQJAPXjr2DKofUSBHaph7OmYJ6xIY1q1h6zfR3pfNLnjCtk1iMpp/V5d6KWC1z6MUos7KAYoEQfW5PZYwv1BK4/DlQJAG0DOLHJQZKjFBWFbIi2WCw3UkPDpS1lBzkk7zNnzHnN65vayayWd7k5y5HsqNKHK3ww6FwtgHCwamlIr6JhUBA== ")
            let decData = decryptorJm.decryptLong(response1.data)
            let res_bs64_data = Base64.decode(decData)
            console.log(`res_bs64_data:${JSON.stringify(res_bs64_data)}`)
            return res_bs64_data
        } else {
            let json_str = response1.data
            let html_str = `
            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>png</title>
                <link rel="stylesheet" href="">
            </head>

            <body>
                <img
                    src="data:image/png;base64,${json_str.data}">
            </body>

            </html>
            `
            fs.writeFileSync('D:/temp/scrapy_crawl/handlerjson/pic.html', html_str);
        }
        return ""
    } catch (error) {
        console.error('GET 请求出错:', error);
    }
}

async function request() {
    // 定义 sleep 函数
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // for (let i = 2308; i < 25548+1; i++) {
    for (let i = 10; i < 13; i++) {
        resp = await sendGetRequest(i)
        console.log(`===========>   resp:${JSON.stringify(resp)}`)
        if (resp != '') {
            fs.appendFileSync('D:/temp/scrapy_crawl/handlerjson/' + 'nodejs-axios公开招标中标结果公告.json', resp + ',\r\n');
        } else {
            break
        }
        await sleep(200);
    }
}

request()