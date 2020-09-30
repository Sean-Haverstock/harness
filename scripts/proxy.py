import requests
import re

url = 'https://free-proxy-list.net/'
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36'}
source = str(requests.get(url, headers=headers, timeout=10).text)
data = [list(filter(None, i))[0] for i in re.findall('<td class="hm">(.*?)</td>|<td>(.*?)</td>', source)]
groupings = [dict(zip(['ip', 'port', 'code', 'using_anonymous'], data[i:i+4])) for i in range(0, len(data), 4)]
final_groupings = ["{ip}:{port}".format(**i) for i in groupings]