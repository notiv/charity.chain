# -*- coding: utf-8 -*-

MONGO_URI = 'localhost:5142'
MONGO_DATABASE = 'local'

from SearchReuters.ReutersDataSource import ReutersDataSource
from bs4 import BeautifulSoup

def test_search():
    rd = ReutersDataSource()

    # Get search results for term (e.g. charity AND donate)
    search_results = rd.call('search',
                   {'q': 'main:(charity AND donate)',
                    'maxAge': '30D',
                    'mediaType': 'T'})

    # For each result get text
    for r in search_results.get('results').get('result'):
        guid = r.get('guid')
        item = rd.call('item',
                       {
                           'id': guid
                       })
        soup = BeautifulSoup(item.get('body_xhtml'))
        pass
        # row = soup.findAll(text=True)
        # text = []
        # for r in row:
        #
        #
        #
        #
        #     for r in row:
        #         ...
        #         nextSib = r.nextSibling
        #     ...
        #     while nextSib.name != 'td' and nextSib is not None:
        #         ...
        #         nextSib = nextSib.nextSibling
        #     ...
        #     print(nextSib.text)
        # data = data.replace("\n", "")
        #print(data)


if __name__ == '__main__':
    test_search()
