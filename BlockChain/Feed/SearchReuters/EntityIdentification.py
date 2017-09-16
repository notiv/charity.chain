# -*- coding: utf-8 -*-

from SearchReuters.ReutersDataSource import ReutersDataSource
import requests

CALAIS_URL = 'https://api.thomsonreuters.com/permid/calais'

class EntityIdentification:

    def __init__(self, username = USERNAME, password = PASSWORD):
        # Initialize ReutersDataSource
        self.rds = ReutersDataSource()
        self.headers = {'X-AG_Access-Token' : self.rds.get('authToken'),
                        'Content-Type' : 'text/raw',
                        'outputformat' : 'application/json'}

    def identify_entity(self, input_text):
        response = requests.post(CALAIS_URL, data = input_text, headers = self.headers, timeout = 80)

