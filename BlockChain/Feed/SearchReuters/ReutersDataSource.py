# -*- coding: utf-8 -*-

import urllib.request
import urllib
import urllib.parse
import requests

from lxml import etree
import datetime, re, json

AUTH_URL = "https://commerce.reuters.com/rmd/rest/xml/"
SERVICE_URL = "http://rmb.reuters.com/rmd/rest/json/"
# USERNAME = 'HackZurichAPI'
# PASSWORD = '8XtQb447'
USERNAME = 'chris.blatchfordAPI'
PASSWORD = 'Ce88t6cU'

class ReutersDataSource:

    def __init__(self, username=USERNAME, password=PASSWORD):
        self.authToken = None
        print("Getting auth token")
        # get a new auth token every time, expires after a week
        tree = self._call('login', {'username': username, 'password': password}, True)
        if tree.tag == 'authToken':
            self.authToken = tree.text
        else:
            raise Exception('unable to obtain authToken')

    def _call(self, method, args={}, auth=False):
        if auth:
            root_url = AUTH_URL
            return self.base_call(method, root_url, args)
        else:
            root_url = SERVICE_URL
            # print("self.authToken: ", self.authToken)
            args['token'] = self.authToken
            return self.search_call(method, root_url, args)

    def base_call(self, method, root_url, args={}):
        url = root_url + method + '?' + urllib.parse.urlencode(args)
        resp = urllib.request.urlopen(url, timeout=10)
        rawd = resp.read()
        # print(rawd)
        parsed = etree.fromstring(rawd)
        return etree.fromstring(rawd)

    def search_call(self, method, root_url, args={}):
        url = root_url + method + '?' + urllib.parse.urlencode(args)
        resp = urllib.request.urlopen(url, timeout=10)
        data = resp.read()
        encoding = resp.info().get_content_charset('utf-8')
        json_obj = json.loads(data.decode(encoding))
        return json_obj

    def authenticate_url(self, url):
        authUrl = url + "?token=" + self.authToken
        return authUrl

    def call(self, method, args={}):
        return self._call(method, args, False)

