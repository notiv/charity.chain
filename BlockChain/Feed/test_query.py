# -*- coding: utf-8 -*-

from SearchReuters.Query import Query

def test_query():
    q = Query()
    q.search('charity AND donate')
    q.search('hurricane AND charity')
    q.search('hurricane AND (donate OR donation)')
    q.search('natural AND (catastrophe OR disaster)')

if __name__ == '__main__':
    test_query()