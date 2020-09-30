import requests
import psycopg2
import json
import sys
import os
import time
import random
import re

proxies = []
proxies_index = 0

error_count = 0

global keys

keys = { 
    "one": [
        "200923781-0499d6ab55cfe4473f310f09ee8b7c8c",
        "200923773-a3ab469e70c4d07a0bd4d5b7d8f9715e",
        "200923775-66f700a9a5e779a2b239733dd23b776f",
        "200923771-d01352b2c8eeb0de7fbc8431f4363167",
        "200923772-dd41e36a8fb1dc5e09ca2c203cb6f835",
    ],
    "two": [
        "200923469-d634ec8b0a38749550a52e91e243081d",
        "200923472-b57d689fe61d2de7180e71aa01d0d4ec",
        "200923474-379c42c4a5edfffd7ebaa8c7f613ed8d",
        "200923476-bb226291b3870cbf08bb5cea3cec8c25",
        "200923471-1202e131ddfb7a48a495d944a457fafa",
    ],
    "three": [
        "200923459-533ee9a24d888b82ace409a4ab20e405",
        "200923458-2ef04c5df07b1ffe724af72420b9c2ac",
        "200923468-30518c827b21e3c213cf53ad57137180",
        "200923473-5fee3f7ae2918816635e15924ac992c4",
    ]
}

start_ids = {
    "one": 106849000,
    "two": 110859600,
    "three": 115746000,
    }

# helper function to sanitize route object and set defaults


def route_cleaner(route):
    vals = {
        "id": [int, 0],
        "name": [str, "Unknown"],
        "type": [str, ""],
        "rating": [str, ""],
        "stars": [float, 0],
        "starVotes": [int, 0],
        "pitches": [int, 0],
        "url": [str, ""],
        "longitude": [float, 0],
        "latitude": [float, 0],
    }
    # loop through each property of route
    for key in vals:
        val = route[key]
        if(type(val) == vals[key][0]):
            route[key] = val
        else:
            route[key] = vals[key][1]
    if(len(route["rating"]) > 10):
        route["rating"] = ""
    return route

# def init_proxies():
#     global proxies
#     url = 'https://free-proxy-list.net/'
#     headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36'}
#     source = str(requests.get(url, headers=headers, timeout=10).text)
#     data = [list(filter(None, i))[0] for i in re.findall('<td class="hm">(.*?)</td>|<td>(.*?)</td>|<td class="hx">yes</td>', source)]
#     groupings = [dict(zip(['ip', 'port', 'code', 'using_anonymous'], data[i:i+4])) for i in range(0, len(data), 4)]
#     proxies = ["{ip}:{port}".format(**i) for i in groupings][0:100]

def init_db():
    print('connecting to db')
    global connection
    if(len(sys.argv) == 3):
        if(sys.argv[2] == "-local"):
            connection = psycopg2.connect(
                host='localhost', database='harness_dev')
    else:
        db_password = os.environ.get('DB_PASSWORD')
        if(db_password == None):
            print("ERROR: Must set DB_PASSWORD")
            exit()

        connection = psycopg2.connect(
            host='harness.cqnluwlmobzi.us-east-2.rds.amazonaws.com',
            database='harness',
            user="postgres",
            password=db_password
        )

    print('db connected')

def main():
    init_db()
    # init_proxies()

    if (len(sys.argv) < 2):
        print("ERROR: Must provide batch value")
        exit()
    user_input = sys.argv[1]

    global api_keys
    global api_keys_index
    api_keys_index = 0

    api_keys = keys[user_input]
    first_route = start_ids[user_input]
    begin_scrape(first_route)


def begin_scrape(batch_start):
    global error_count, proxies_index, api_keys_index
    err_log = open(f"error.log", "w")
    for _ in range(0, 25000):
        try:
            fetch_range(batch_start)
            batch_start = batch_start + 200
        # except requests.Timeout as ex:
        #     print("PROXY timeout, rotating to next proxy!")
        #     proxies_index = (proxies_index + 1) % 100
        except Exception as ex:
            err_log.write(
                f"FAILED: {batch_start} \t KEY: {api_keys[api_keys_index]}" + os.linesep + str(ex) + os.linesep + str(sys.exc_info())
            )
            err_log.flush()
            error_count = error_count + 1
            api_keys_index = (api_keys_index + 1) % 5
            if(error_count > 1000):
                exit()
        finally:
            pass
    err_log.close()


def fetch_range(start_id):
    global api_keys_index
    # global proxies_index

    # proxy_address = proxies[proxies_index]

    # create comma delimited string for query
    ids = f'{start_id}'
    # add 200 ids (max request size for mp API) to ids string
    for x in range(0, 200):
        if (x != 0):
            ids = ids + f',{start_id + x}'

    print(f"Making request for: \t{start_id} => {start_id + 200}")
    # fetch up to 200 routes
    # proxies = {
    #     https: "41.217.219.53:31398"
    # }
    
    data = requests.get(
        f'https://www.mountainproject.com/data/get-routes?routeIds={ids}&key={api_keys[api_keys_index]}',
        # proxies={"https": proxy_address},
        timeout=4
        )
    print("request sent")

    if(data.status_code != 200):
        if(data.json()['message'] == "Rate Limit Exceeded"):
            # if we get rate limited, sleep for an hour
            print(data.json())
            print("we got rate limited :( going to bed for an hour zZzZzZzZ")
            time.sleep(60*60)
            
        # print(data.json())
        # print(f"we got a bad response for PROXY: {proxy_address} \t\t API KEY: {api_keys[api_keys_index]}")
        # proxies_index = (proxies_index + 1) % 100
        # # if we get an error from the api request, start using the next api key in our list
        # api_keys_index = (api_keys_index + 1) % 5
        return
    routes = data.json()["routes"]

    # as long as object @ routes isn't an empty array, loop through routes array, run cleaner function, push each route to db
    if (routes != []):
        # print(routes)

        for route in routes:
            route = route_cleaner(route)
            cursor = connection.cursor()            
            cursor.execute('INSERT INTO routes (mp_id, name, type, rating, stars, starVotes, pitches, url, longitude, latitude, raw) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                           (route["id"], route["name"], route["type"], route["rating"], route["stars"], route["starVotes"], route["pitches"], route["url"], route["longitude"], route["latitude"], json.dumps(route)))
            cursor.close()
    else:
        print(f'NOT FOUND: {start_id}')
    # save to db
    connection.commit()
    print(f"Committed {len(routes)} records")

print("Successfully initialized")
print("Executing program")
main()
print("Succesfully Completed!")
