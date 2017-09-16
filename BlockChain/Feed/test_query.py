# -*- coding: utf-8 -*-

from SearchReuters.Query import Query
from time import sleep

def test_query():
    q = Query()
    q.search('unicef AND refugees', 'UNICEF', 'refugee crisis')
    sleep(60) # To avoid throttling error
    q.search('red AND cross AND refugees', 'Red Cross', 'refugee crisis')
    sleep(60)
    q.search('unicef AND poverty', 'UNICEF', 'poverty')
    sleep(60)
    q.search('women AND rights AND unicef', 'UNICEF', 'women rights')
    sleep(60)
    q.search('women AND rights AND amnesty AND international', 'Amnesty International', 'women rights')
    sleep(60)
    q.search('gates AND foundation AND melinda', 'Bill and Melinda Gates Foundation', 'poverty')
    sleep(60)
    q.search('unicef AND ebola', 'UNICEF', 'epidemics')
    sleep(60)
    q.search('red AND cross AND war', 'Red Cross', 'war')
    sleep(60)
    q.search('amnesty AND international AND war', 'Amnesty International', 'war')
    sleep(60)
    q.search('unicef AND war', 'UNICEF', 'war')
    sleep(60)
    q.search('red AND cross AND children', 'Red Cross', 'children')
    sleep(60)
    q.search('red AND cross AND hurricane', 'Red Cross', 'hurricane')
    sleep(60)
    q.search('red AND cross AND earthquake', 'Red Cross', 'earthquake')
    sleep(60)
    q.search('gates AND foundation AND melinda AND medicine', 'Bill and Melinda Gates Foundation', 'medicine')
    sleep(60)
    q.search('gates AND foundation AND melinda AND children', 'Bill and Melinda Gates Foundation', 'children')
    sleep(60)
    q.search('unicef AND schools', 'UNICEF', 'education')
    sleep(60)
    q.search('Amnesty AND International AND human AND rights', 'Amnesty International', 'human rights')
    sleep(60)
    #q.search('Direct AND Relief AND hurricane', 'Direct Relief', 'hurricane')
    q.search('unicef AND children', 'UNICEF', 'children')

if __name__ == '__main__':
    test_query()