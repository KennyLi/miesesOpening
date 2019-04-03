import util_stuff.json_setup as stp
import util_stuff.find as fnd

import pymongo

def run():
    #connect to and check for a valid instance
    #change this line!
    ip = "jayy.mooo.com"
    maxSevSelDelay = 2
    connection = pymongo.MongoClient(ip, serverSelectionTimeoutMS=maxSevSelDelay)
    connection.server_info()
    db = connection.test
    stp.setup(db)
    for k in fnd.find_pokemans(db, Speed=45):
        print(k)

# #connect to and check for a valid instance
# #change this line!
# ip = "jayy.mooo.com"
# maxSevSelDelay = 2
# connection = pymongo.MongoClient(ip, serverSelectionTimeoutMS=maxSevSelDelay)
# connection.server_info()
# db = connection.test
# stp.setup(db)
# for k in fnd.find_pokemans(db, Speed=45):
#     print(k)
