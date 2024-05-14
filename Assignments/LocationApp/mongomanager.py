from pymongo import MongoClient

class MongoManager:
    def __init__(self, uri, db_name):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def __getitem__(self, collection_name):
        return self.db[collection_name]

    def set_collection(self, collection_name):
        self.collection = self.db[collection_name]

    def post(self, data):
        return self.collection.insert_one(data)
    
    def insert_many(self, data):
        return self.collection.insert_many(data)

    def get(self, query=None):
        if query:
            return list(self.collection.find(query))
        else:
            return list(self.collection.find())

    def drop_collection(self, collection_name):
        self.db.drop_collection(collection_name)

    def set_database(self, db_name):
        self.db = self.client[db_name]
