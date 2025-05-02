

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
            },
            proxy:{
                protocol: 'http',
                host: '127.0.0.1',
                port: 10001
            }
        };
        const response = await axios.get('https://www.cnpcbidding.com/cms/css/bj.css', config);
        // console.log('GET 请求响应数据:', response.data);
        let res = response.data
        if (!localStorage.getItem("time")) {
            var timeStamp = new Date().getTime();
            var time = JSON.parse(JSON.stringify(timeStamp));
            localStorage.setItem("time", time);
        }
        const css = res.split('.')
        const css1 = css[1]
        const css2 = css[2]
        const regex = /base64,([^)]+)\)/
        const c1 = css1.match(regex)
        const c2 = css2.match(regex)
        console.log(`css1:${c1}\n${c2}`)
        localStorage.setItem('logo1', c1[1])
        localStorage.setItem('logo2', c2[1])

        // console.log('-------------> curtime', localStorage.getItem("time"))
        // const css = res.split('.')
        // const css1 = css[1]
        // const css2 = css[2]
        // const regex = /base64,([^)]+)\)/
        // const c1 = css1.match(regex)
        // const c2 = css2.match(regex)
        // console.log('logo1', c1[1])
        // console.log('logo2', c2[1])
        let item = {
            'logo1': c1[1],
            'logo2': c2[1]
        }
        // let current = 5

        let params = {
            "current": current,
            "size": 10,
            "condition": {
                "columnId": "21",
                "title": "",
                "projectType": ""
            }
        };
        console.log(`params:${JSON.stringify(params)}`)

        let base64_str = Base64.encode(JSON.stringify(params))

        // let base64_str = Buffer.from(JSON.stringify(params), 'utf8').toString('base64');


        console.log(`base_64 str:${base64_str}`)
        var encryptorJm = new Encrypt.JSEncrypt();
        let item_logo1 = item.logo1
        console.log(`item_logo1:${JSON.stringify(item)}`)

        encryptorJm.setPublicKey(item_logo1)
        encryptorJm.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIeiU1RTO1CCbNRo0yg4c5WbImFrGt3LuZsQ0au/g8zW4Gj0R/8MyH4Oyp4VNbHs/dDTtG1Pn6kX+60XBi57tjwIa6CMaGIzERZjliYc73A703T4BkzQP35k0ZeD+FS7EM0I906YQMKmTyG7paMAPrfzRkr4kHCY3yS6BcnT93TQIDAQAB ")
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
                // 'Content-Length': '174',
                'Content-Length': Buffer.byteLength(encData, 'utf-8'),
                'Content-Type': 'application/json;charset=UTF-8',
                'Host': 'www.cnpcbidding.com',
                'MACHINE_CODE': 1745930200441,
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
            },
            // proxy:{
            //     protocol: 'http',
            //     host: '10.8.0.1',
            //     port: 11000,
            //     auth: {
            //         username: 'user',
            //         password: 'Aa123456'
            //     }
            // },
            proxy: {
                protocol: 'http',
                host: '127.0.0.1',
                port: 10001
            },
            maxRedirects: 15, // 限制重定向次数
        }

        encData = "LmAOIV1in6nmOoab4L01dhcuyZFTxP8Xi2YsuOYx8ZAEVAjOX5Yoglpy+Bh93asWVqSEiSxwsqOTaLMmexWrROgfzsDOFBdEpZFHOMQvO3DTeJyoUqPW3RsxS/OWoacVjxBqeDK1KkcfdLhFUOiAbIYD1wGxtLKqmsyshNVCz+U="
        // 发送加密请求参数数据，得到加密响应数据
        const response1 = await axios.post(url, encData, config2);
        console.log(`=======> response1:${JSON.stringify(response1.data)}`)

        if (JSON.stringify(response1.data).startsWith('"')) {
            // 解码响应数据
            var decryptorJm = new Encrypt.JSEncrypt();
            decryptorJm.setPrivateKey(localStorage.getItem('logo2'))
            decryptorJm.setPrivateKey("MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAJzeb8ar23mB+ppgJLHdxNo59P8GtiLxbDEa4ZKbgAyW358u29m06uw1hN4H4QAcmESOHsE5LY5EuunlJA6WF1zxxrynvwxIfcfZ+a6COe+2OwnPXkaVe0N/kMWBJlU199TauxZg4Bu/GuYRQwDuEf2gQEBYroN8qtLSxIkQOjN1AgMBAAECgYB65/0D2Br5tNE4qyOVCID3ynkeZ4/FCQsP3lPmnldRhdRn0DsI9CssLzKPE/VCNSVIcWG/WqFK2qboI1SA6TAbrNJOj/ewY8JnfvCZQvqmCnj7VfwoSzHCr7B4KUM6BsdHwGBOiKHRu22oV3Xtx5LrvMFCGSeXoJ/AVnlISHiX8QJBAPnYXTN3LP0PEfvwt6EJ3MXHI9oK223r1YSO4dwDQlUumPqcpio7uI4wUR3F/J+1f4QlHrWJJNl8RRjbQd27amcCQQCgu7jsmghwQIcTa5QMJOGYpsMfySB+W+3X+Q42npmoj+MS6WrDtmxrDSShVZ/ecPoStUqgcgEWNmLb56YnbEHDAkBvXjelQkFGiBovIIzp9rh3XJ4pil9nbxFdJkedR8Kgr8W3KG6VMsvAbd8qk19ZXZD6uYUnzHslitROESYaDXmPAkBoFEaRhshyD4an76BFINioJUvyWCVfTR29HPu0KIztVoa+Z0EIDCc2RqNyiORlgJid5qC1Nj036e2n4d94ZaRLAkA8N44ILQyWSL31i4VdZdJ5QjTLX0cu5+CQDWaOMwFyTdA87pAjroybKjrJF5OmrAfUuW58Z0LYZAzLO7+PCgzJ ")
            let decData = decryptorJm.decryptLong(response1.data)
            let res_bs64_data = Base64.decode(decData)
            console.log(`res_bs64_data:${JSON.stringify(res_bs64_data)}`)
            // return res_bs64_data
            return ""
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
    for (let i = 11; i < 13; i++) {
        resp = await sendGetRequest(i)
        console.log(`===========>   resp:${JSON.stringify(resp)}`)
        if (resp != '') {
            // fs.appendFileSync('D:/temp/scrapy_crawl/handlerjson/' + 'nodejs-axios公开招标中标结果公告.json', resp + ',\r\n');
        } else {
            break
        }
        await sleep(200);
    }
}

request()