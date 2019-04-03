# azrael -- Jason Tung and Mohammed Uddin
#
# SoftDev2 pd7
#
# K #07: Import/Export Bank
#
# 2019-03-01

# --------DB INFO--------
# NAME: POKEMON GO POKEDEX
# CONTAINS INFORMATION FOR EACH POKEMON IN POKEMON GO
# NOTE: WE ONLY PARSED INFORMATION PERTAINING TO REAL POKEMON GAMES!!!
# LINK: https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
# IMPORT MECHANISM: other py file parses pokedex into a db compatible json and writes it to the server


import pymongo


# server_addr = "jayy.mooo.com"
# connection = pymongo.MongoClient(server_addr)
# db = connection.test
# connection = db.azrael


# for k in connection.find({}):
#     print(k)


def find_pokemans(db, **kwargs):
    """
    :param db: connection = pymongo.MongoClient("jayy.mooo.com",serverSelectionTimeoutMS=maxSevSelDelay)
        connection.server_info()
        db = connection.test
    :param kwargs: kwargs... something like find_pokemans(db, type = "Flying", Sp. Attack = {"$gt" : "1.0"})
    :return:
    """

    connection = db.miesesgang
    # POSSIBLE ARGS:{"id": 1, "name": "Bulbasaur", "type": ["Grass", "Poison"],
    # "HP": 45, "Attack": 49, "Defense": 49, "Sp. Attack": 65, "Sp. Defense": 65, "Speed": 45,
    # "abilities": ["chlorophyll", "overgrow"], "sprite": ".../1.png", "height": "0.7", "weight": "6.9"},
    find_query = {}
    args = {"id": None, "name": None, "type": None,
            "HP": None, "Attack": None, "Defense": None, "Sp Attack": None, "Sp Defense": None, "Speed": None,
            "abilities": None, "sprite": None,"height": None,"weight": None}
    for k in args.keys():
        args[k] = kwargs.get(k, None)
        if args[k] is not None:
            # if k == "evolutions":
            #     find_query["$or"] = [{"next_evolution": {"$elemMatch": {"name": args[k]}}},
            #                          {"prev_evolution": {"$elemMatch": {"name": args[k]}}}]
            # elif k in ["weaknesses", 'type']:
            if k in ["type" or "abilities"]:
                find_query[k] = {'$in': [args[k]]}
            else:
                find_query[k] = args[k]
    return connection.find(find_query)
    #tot_str = []
    # tot_str.append("QUERY:" + str(find_query))
    # tot_str.append("-+-+-")
    # for k in connection.find(find_query):
    #     tot_str.append("name: " + str(k['name']))
    #     for ele in args:
    #         if args[ele] is not None:
    #             if ele == "evolutions":
    #                 ret_str = "evolutions: "
    #                 prefixes = ["next", "prev"]
    #                 for pref in prefixes:
    #                     try:
    #                         ret_str += [x["name"] for x in k[pref + "_evolution"]] + ", "
    #                     except:
    #                         pass
    #             elif ele != "name":
    #                 tot_str.append(ele + ": " + str(k[ele]))
    #     tot_str.append("")
    # tot_str.append("-+-+-")
    # return tot_str

# print("EVOLUTION: CHARIZARD")
# print("~~~~~~~~~~~~~~~~~~")
# find_pokemans("jayy.mooo.com",evolutions="Charizard")
# # print("HEIGHT: 1.19 m, TYPE: FLYING")
# print("~~~~~~~~~~~~~~~~~~")
# find_pokemans("jayy.mooo.com",height='1.19 m', type=['Flying'])
# # print("NUM: >050, HEIGHT: >1.00 m, TYPE: WATER OR ICE, WEAKNESS: BUG OR FIRE")
# print("~~~~~~~~~~~~~~~~~~")
# find_pokemans("jayy.mooo.com", num={"$gt": "050"}, height={"$gt": "1.00 m"}, type='Water', weaknesses='Bug')
