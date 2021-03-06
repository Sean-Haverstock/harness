import requests
import psycopg2
import json
import sys
import os
import time
import random

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
    "one": 106700000,
    "two": 110700000,
    "three": 115700000,
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
    return route


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
    global cursor
    cursor = connection.cursor()


def main():
    init_db()
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
    err_log = open(f"error.log", "w")
    for _ in range(0, 25000):
        try:
            fetch_range(batch_start)
        except Exception as ex:
            err_log.write(
                f"FAILED: {batch_start} \t KEY: {api_keys[api_keys_index]}" + os.linesep + str(ex) + os.linesep
            )
            err_log.flush()
        finally:
            pass
        batch_start = batch_start + 200
    err_log.close()


def fetch_range(start_id):
    global api_keys_index
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
        f'https://www.mountainproject.com/data/get-routes?routeIds={ids}&key={api_keys[api_keys_index]}')
    print("request sent")
    if(data.status_code != 200):
        # if we get an error from the api request, start using the next api key in our list
        api_keys_index = (api_keys_index + 1) % 5
    routes = data.json()["routes"]

    # as long as object @ routes isn't an empty array, loop through routes array, run cleaner function, push each route to db
    if (routes != []):
        # print(routes)

        for route in routes:
            route = route_cleaner(route)
            cursor.execute('INSERT INTO routes (mp_id, name, type, rating, stars, starVotes, pitches, url, longitude, latitude, raw) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                           (route["id"], route["name"], route["type"], route["rating"], route["stars"], route["starVotes"], route["pitches"], route["url"], route["longitude"], route["latitude"], json.dumps(route)))
        # print(data.elapsed.total_seconds())
    else:
        print(f'NOT FOUND: {start_id}')
    # save to db
    connection.commit()
    print(f"Committed {len(routes)} records")

print("Successfully initialized")
print("Executing program")
main()
print("Succesfully Completed!")
