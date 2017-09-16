# -*- coding: utf-8 -*-

from SearchReuters.ReutersDataSource import ReutersDataSource
import requests, json

CALAIS_URL = 'https://api.thomsonreuters.com/permid/calais'
TOKEN = 'qj4g21ktlFiHqUsnXTt3XbKqBmeTOa9E'

class EntityIdentification:

    def __init__(self):
        self.headers = {'X-AG-Access-Token' : TOKEN,
                        'Content-Type' : 'text/raw',
                        'outputformat' : 'application/json'}

    def identify_entity(self, input_text):
        response = requests.post(CALAIS_URL, data=input_text, headers=self.headers, timeout=80)

        # Create dictionary

        if response.status_code == 200:
            response_json_obj = json.loads(response.content.decode("utf-8"))

            for key, value in response_json_obj.items():
                if (value.get('confidence') is not None) and \
                        (value.get('confidence').get('statisticalfeature') is not None) and \
                        (float(value.get('confidence').get('statisticalfeature'))> 0.5):
                    print(value.get('_typeGroup', 'Empty Group') + ' -> ' + value.get('_type', 'Empty Type') + ' -> ' + value.get('name', 'Empty Name'))

