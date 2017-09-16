# -*- coding: utf-8 -*-

from SearchReuters.ReutersDataSource import ReutersDataSource
from bs4 import BeautifulSoup
import html2text
import datetime
import pymongo

MONGO_URI = 'localhost:5142'
MONGO_DATABASE = 'local'

class Query:

    item_collection_name = 'ThomsonReuters'

    def __init__(self):
        # Initialize ReutersDataSource
        self.rds = ReutersDataSource()

        # Initialize mongodb client and collections (if none exist)
        self.mongo_uri = MONGO_URI
        self.mongo_db = MONGO_DATABASE

        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

        if not self.db.get_collection(self.item_collection_name):
            self.db.create_collection(self.item_collection_name)

        self.db[self.item_collection_name].create_index([('guid', pymongo.ASCENDING), ('dateCreated', pymongo.DESCENDING)])
        self.db[self.item_collection_name].create_index([('dateCreated', pymongo.DESCENDING)])

    def search(self, query_string, maxAge = 30, mediaType = 'T' ):

        # Get search results for term (e.g. charity AND donate)
        search_results = self.rds.call('search',
                                 {'q': 'main:(%s)' % query_string,
                                  'maxAge': '%sD' % maxAge,
                                  'mediaType': '%s' % mediaType})

        for r in search_results.get('results').get('result'):
            # Build a dictionary
            d = {}
            d['headline'] = r.get('headline')

            guid = r.get('guid')
            item = self.rds.call('item',{'id': guid})

            text = html2text.html2text(item.get('body_xhtml'))

            d['guid'] = guid
            d['text'] = text
            d['dateCreated'] = datetime.datetime.fromtimestamp(r.get('dateCreated') / 1e3)

            if r.get('geography') is None:
                d['geography'] = ''
            else:
                d['geography'] = r.get('geography')[0]

            self.db[self.item_collection_name].update({'guid': guid}, d, upsert=True)


