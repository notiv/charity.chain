# -*- coding: utf-8 -*-

MONGO_URI = 'localhost:5142'
MONGO_DATABASE = 'local'

from SearchReuters.ReutersDataSource import ReutersDataSource
from bs4 import BeautifulSoup
import html2text
import datetime

def test_search():
    rd = ReutersDataSource()

    # Get search results for term (e.g. charity AND donate)
    search_results = rd.call('search',
                   {'q': 'main:(charity AND donate)',
                    'maxAge': '30D',
                    'mediaType': 'T'})

    # For each result get text
    for r in search_results.get('results').get('result'):

        # Build a dictionary
        d = {}
        d['headline'] = r.get('headline')

        guid = r.get('guid')
        item = rd.call('item',
                       {
                           'id': guid
                       })

        text = html2text.html2text(item.get('body_xhtml'))

        d['guid'] = guid
        d['text'] = text
        d['timestamp'] = datetime.datetime.fromtimestamp(r.get('dateCreated')/1e3)
        d['geography'] = r.get('geography')[0]

        # soup = BeautifulSoup(item.get('body_xhtml'))
        # text = str(soup.findAll(text=True))
        # text = text.replace("'\n'", "")
        pass

if __name__ == '__main__':
    test_search()
