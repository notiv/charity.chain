# -*- coding: utf-8 -*-

from SearchReuters.ReutersDataSource import ReutersDataSource
from SearchReuters.EntityIdentification import EntityIdentification
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
        self.ei = EntityIdentification()

        # Initialize mongodb client and collections (if none exist)
        self.mongo_uri = MONGO_URI
        self.mongo_db = MONGO_DATABASE

        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

        if not self.db.get_collection(self.item_collection_name):
            self.db.create_collection(self.item_collection_name)

        self.db[self.item_collection_name].create_index([('guid', pymongo.ASCENDING), ('dateCreated', pymongo.DESCENDING)])
        self.db[self.item_collection_name].create_index([('dateCreated', pymongo.DESCENDING)])

    def search(self, query_string, charity_org, cause, maxAge = 30, mediaType = 'T' ):

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
            d['cause'] = cause
            d['charityOrg'] = charity_org

            if r.get('geography') is None:
                d['geography'] = 'US' # Faking it ;-)
            else:
                d['geography'] = r.get('geography')[0]

            # Perform entity identification - Right now fake it by passing an argument
            #ei = self.ei.identify_entity(text)

            self.db[self.item_collection_name].update({'guid': guid}, d, upsert=True)


