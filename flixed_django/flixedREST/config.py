# This file fetches the config from TMDB and stores it in a dictionary which can be used by main application
import requests
import json
import os
from utils import Util

class Configuration:
    configurations={}
    def __init__(self):
        url = Util.TMDB_URL + "/configuration"
        headers = {
                "accept": "application/json",
                "Authorization": "Bearer "+Util.TMDB_API_AUTH_ACCESS
        }
        configurations = requests.get(url, headers=headers).json()