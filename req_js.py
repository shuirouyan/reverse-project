import requests
import subprocess, json



def get_content(num, data):
    
    url = 'https://www.cnpcbidding.com/cms/article/page'    
    headers = {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
        'Accept': "application/json, text/plain, */*",
        'Content-Type': "application/json",
        'Accept-Language': "en-US,en;q=0.5",
        'Content-Type': "application/json;charset=UTF-8",
        'MACHINE_CODE': "1745225501540",
        'Origin': "https://www.cnpcbidding.com",
        'Referer': "https://www.cnpcbidding.com/?",
        'Sec-Fetch-Dest': "empty",
        'Sec-Fetch-Mode': "cors",
        'Sec-Fetch-Site': "same-origin",
        'Priority': "u=0"
    }
    # data = "QUrNLEptnAmvR74tyagGDavD6Z2V7w6L1iPEtGKKBdy0rNAW7nMu/disjFCymUOvFpemhzYB0DxmIbo2Kqn7HbsWzXt3Xfv6tydyCKJlxUQQbyVJZnC+VQlOojVPVaI+5wEG/MgalI20QelwlM/0nJALacY+1GHdS1cXq5v9FRA="
    if data != '':
        resp = requests.post(url=url, data=json.dumps(data), headers=headers)
        print(f'resp.text:{resp.text}')
        if resp.text.startswith('"'):
            with open(f'handlerjson/page{num}.json', 'w', encoding='utf-8') as f:
                f.write(resp.text)

def get_html(current):
    
    params = '{"current":' + str(current) + ',"size":30000,"condition":{"columnId":"1","title":"","projectType":""}}'
    commandPrev = ['node', 'D:\\temp\\node\\node2.js',params, 'arg2']
    data = ''
    try:
        result = subprocess.run(commandPrev, capture_output=True, text=True, encoding='utf-8')
        if result.returncode == 0:
            print("Node.js 脚本执行成功，输出如下：")
            print(result.stdout)
            data = result.stdout
        else:
            print(f"Node.js 脚本执行失败，错误信息：{result.stderr}")
    except FileNotFoundError:
        print("找不到 node 命令，请确保 Node.js 已正确安装并配置在系统路径中。")
    
    # data = "JnggujqBilOoLCWMe4EfhYYZ6in+Gj+z3rdmOWE7qRgLaxTujhqPMX4YlDwQY13ko2XOGdYVZlOnKkNRVYbyH9S2ODNWN6tN2CTVAN/cbNgviEN7HOcCvpT+Nhn66jHK0b8tlFme5Ixzch5WfXGjqV6UBuGDtpPk0KeJ6QdLugE="
    print(f'data:{data}')
    # data = "MP3G0fL2oniDwlMUrG75x7dZcKEQL5pDaidCShb4+lRQCewS37fKaoSVMTXo9tNpFzte6mvw9kJDdlu1mEkojXrQMtNqc1czhsJsoAgxIQK44TFCNy/g2hTTpd87zcwwwi0Dc/tXrNtjSNXA64iCWe1+4UEcKoh36/JO9tTmQA8="
    # data = "NOh07/0beLS5B3tZQA4bwE+/Q4q+pTK076pY/U612negzEEWwHMyocny/iZJLOJ1Enzo2jm98LNy0z1lPqO/8wVIe5opGIjC6ylabUvy3PQQbhyXCG15ao3hhTKP9EI5sEUvxx80AsnZMKgbyz6jrn+Z+bv1hA9sTjpKh5UWfU4="
    # data = '\"TA4veD6myII0R1P7/SF1WjNaOrxZohz7VZYCLHvbJCwKj4L4QEShjMUDihWEWp/BpyzELwybwHtiiyKORggnxcFpiz20EvOMCvRibGP66q8K9mlnxfgs8RyWAGjsRUy0zR/svhHvCTSByNXDS8Qtg2ch3xEiD2lH+75fLLSEe6o=\"'
    # data = "QUrNLEptnAmvR74tyagGDavD6Z2V7w6L1iPEtGKKBdy0rNAW7nMu/disjFCymUOvFpemhzYB0DxmIbo2Kqn7HbsWzXt3Xfv6tydyCKJlxUQQbyVJZnC+VQlOojVPVaI+5wEG/MgalI20QelwlM/0nJALacY+1GHdS1cXq5v9FRA="

    url = 'https://www.cnpcbidding.com/cms/article/page'    
    headers = {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
        'Accept': "application/json, text/plain, */*",
        'Content-Type': "application/json",
        'Accept-Language': "en-US,en;q=0.5",
        'Content-Type': "application/json;charset=UTF-8",
        'MACHINE_CODE': "1745225501540",
        'Origin': "https://www.cnpcbidding.com",
        'Referer': "https://www.cnpcbidding.com/?",
        'Sec-Fetch-Dest': "empty",
        'Sec-Fetch-Mode': "cors",
        'Sec-Fetch-Site': "same-origin",
        'Priority': "u=0"
    }

    resp = requests.post(url=url, data=json.dumps(data), headers=headers)
    print(f'resp.text:{resp.text}')
    
    # 要执行的 Node.js 命令，加上参数
    command = ['node', 'D:\\temp\\scrapy_crawl\\node1.js',resp.text, 'arg2']
    try:
        result = subprocess.run(command, capture_output=True, text=True, encoding='utf-8')
        if result.returncode == 0:
            print("Node.js 脚本执行成功，输出如下：")
            terminal_result = result.stdout
            print(f'terminal_result:{terminal_result}')
            with open ('handlerjson/result.txt', 'a', encoding='utf-8') as f:
                f.write(json.dumps(terminal_result, ensure_ascii=False) + '\n')
        else:
            print(f"Node.js 脚本执行失败，错误信息：{result.stderr}")
    except FileNotFoundError:
        print("找不到 node 命令，请确保 Node.js 已正确安装并配置在系统路径中。")



def get_param(current):
    params = '{"current":' + str(current) + ',"size":10000,"condition":{"columnId":"1","title":"","projectType":""}}'
    commandPrev = ['node', 'D:\\temp\\scrapy_crawl\\node2.js',params, 'arg2']
    try:
        result = subprocess.run(commandPrev, capture_output=True, text=True, encoding='utf-8')
        if result.returncode == 0:
            print("Node.js 脚本执行成功，输出如下：")
            print(result.stdout)
            return result.stdout
        else:
            print(f"Node.js 脚本执行失败，错误信息：{result.stderr}")
    except FileNotFoundError:
        print("找不到 node 命令，请确保 Node.js 已正确安装并配置在系统路径中。")


def node_handler_json(num):
    commandPrev = ['node', 'D:\\temp\\scrapy_crawl\\node1.js', str(num)]
    try:
        result = subprocess.run(commandPrev, capture_output=True, text=True, encoding='utf-8')
        if result.returncode == 0:
            print("Node.js 脚本执行成功，输出如下：")
            print(result.stdout)
            return result.stdout
        else:
            print(f"Node.js 脚本执行失败，错误信息：{result.stderr}")
    except FileNotFoundError:
        print("找不到 node 命令，请确保 Node.js 已正确安装并配置在系统路径中。")


if __name__ == '__main__':
    # for i in range(7, 28):
    #     # get_html(i)
    #     data = get_param(i)
    #     get_content(i, data)
    # get_content()
    for i in range(1, 4):
        node_handler_json(i)