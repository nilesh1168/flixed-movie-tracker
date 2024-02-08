# This file fetches the config from TMDB and stores it in a dictionary which can be used by main application
import requests
import json
import os
from .utils import Util

class Configuration:
    configurations={}
    @classmethod
    def getTMDBConfigurations(cls):
        url = Util.TMDB_CONFIG_URL
        headers = {
                "accept": "application/json",
                "Authorization": "Bearer "+Util.TMDB_API_AUTH_ACCESS
        }
        configurations = requests.get(url, headers=headers).json()
        return configurations