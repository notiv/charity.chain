# -*- coding: utf-8 -*-

from SearchReuters.ReutersDataSource import ReutersDataSource

def test_search():
    rd = ReutersDataSource()

    tree = rd.call('search',
                   {'q': 'main:(charity AND donate)',
                    'maxAge': '30D',
                    'mediaType': 'T'})
# http://rmb.reuters.com/rmd/rest/json/search?q=main:(charity%20AND%20donate)&maxAge=20D&mediaType=T&token=0Uar2fCpykVWWcohxcpQFGW3ML1oJ2z381kIX5wuiTI=

if __name__ == '__main__':
    test_search()
