import requests
import json
def get_content():
  url = "https://www.cnpcbidding.com/cms/article/page"

  payload = "QUrNLEptnAmvR74tyagGDavD6Z2V7w6L1iPEtGKKBdy0rNAW7nMu/disjFCymUOvFpemhzYB0DxmIbo2Kqn7HbsWzXt3Xfv6tydyCKJlxUQQbyVJZnC+VQlOojVPVaI+5wEG/MgalI20QelwlM/0nJALacY+1GHdS1cXq5v9FRA="

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

  response = requests.post(url, data=json.dumps(payload), headers=headers)

  print(response.text)


def handler_json(origin_json):
  file_name = 'handlerjson/招标公告.csv'
  with open(origin_json, 'r', encoding='utf-8') as f:
    data = json.load(f)
    # print(data)
    for item in data['data']['records']:
      with open(file_name, 'a+', encoding='utf-8') as f:
        f.write(str(item['id']) + ',' + item['title'] + ',' + item['publishedTime'] + '\n')



if  __name__ == "__main__":
  # get_content()
  for i in range(21, 27):
    handler_json(f'D:/temp/scrapy_crawl/page_decoded_data{str(i)}.json')