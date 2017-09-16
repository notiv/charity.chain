# -*- coding: utf-8 -*-

from SearchReuters.Query import Query

def test_query():
    q = Query()
    q.search('charity AND donate')

if __name__ == '__main__':
    test_query()