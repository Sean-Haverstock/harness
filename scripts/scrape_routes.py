import requests
import psycopg2
import json
import sys
import os
import time
import random

global first_batch
global second_batch
global third_batch

first_batch = [
    "200923770-3c46583b18a399acb3766949606349f6",
    "200923773-a3ab469e70c4d07a0bd4d5b7d8f9715e",
    "",
    "200923771-d01352b2c8eeb0de7fbc8431f4363167",
    "200923772-dd41e36a8fb1dc5e09ca2c203cb6f835",
]

second_batch = [
    "200923469-d634ec8b0a38749550a52e91e243081d",
    "200923472-b57d689fe61d2de7180e71aa01d0d4ec",
    "200923474-379c42c4a5edfffd7ebaa8c7f613ed8d",
    "200923476-bb226291b3870cbf08bb5cea3cec8c25",
    "200923471-1202e131ddfb7a48a495d944a457fafa",
]

third_batch = [
    "200923459-533ee9a24d888b82ace409a4ab20e405",
    "200923458-2ef04c5df07b1ffe724af72420b9c2ac",
    "200923468-30518c827b21e3c213cf53ad57137180",
    "200923473-5fee3f7ae2918816635e15924ac992c4",
]

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


def init():
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
    if (len(sys.argv) < 2):
        print("ERROR: Must provide batch value")
        exit()
    user_input = sys.argv[1]
    if(user_input == "one"):
        execute_batch(105700000, first_batch)
    if(user_input == "two"):
        execute_batch(110700000, second_batch)
    if(user_input == "three"):
        execute_batch(115700000, third_batch)


def execute_batch(start, keys):
    # script for getting routes
    # make request for route
    # our best guess at starting id
    i = 0
    child_pids = []
    for key in keys:
        batch_start = start + i
        child_pid = execute(batch_start, key)
        child_pids.append(child_pid)
        i = i + 1000000
    for pid in child_pids:
        os.waitpid(pid, 0)


def execute(batch_start, key):
    pid = os.fork()
    if(pid == 0):
        err_log = open(f"error-{key[37: 42]}.log", "w")
        print(f"New Process Started: {pid} \t | \t Start ID: {batch_start}")
        for _ in range(0, 10):
            try:
                fetch_range(batch_start, key)
            except:
                err_log.write(
                    f"FAILED: {batch_start} \t KEY: {key}" + os.linesep)
                time.sleep(2)
            finally:
                pass
            batch_start = batch_start + 200
        print(f"Closing child process that ran from ID: {batch_start}")
        err_log.close()
        os._exit(os.EX_OK)
    else:
        return pid


def fetch_range(start_id, key):
    # create comma delimited string for query
    ids = f'{start_id}'
    # add 200 ids (max request size for mp API) to ids string
    for x in range(0, 200):
        if (x != 0):
            ids = ids + f',{start_id + x}'

    print(f"Making request for: \t{start_id} => {start_id + 200}")
    # fetch up to 200 routes
    data = requests.get(
        f'https://www.mountainproject.com/data/get-routes?routeIds={ids}&key={key}')

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


print("Initializing...")
init()
print("Successfully initialized")
print("Executing program")
main()
print("Succesfully Completed!")
