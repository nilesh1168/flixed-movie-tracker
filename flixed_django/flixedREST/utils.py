import requests, os
from rest_framework.response import Response

class Util:
    OMDB_API_KEY = os.getenv("OMDB_API_KEY")
    TMDB_API_KEY = os.getenv("TMDB_API_KEY")
    TMDB_API_AUTH_ACCESS = os.getenv("TMDB_API_AUTH_ACCESS")
    OMDB_URL = os.getenv("OMDB_URL")
    TMDB_URL = os.getenv("TMDB_URL")
    TMDB_CONFIG_URL = os.getenv("TMDB_CONFIG_URL")
    LANGUAGE = 'en-US'

    @classmethod
    def getMovieDetailsById(cls, movie_id):

        url = Util.TMDB_URL + "movie/" + str(movie_id['id'])
        headers = {
             "accept": "application/json",
            "Authorization": "Bearer " + Util.TMDB_API_AUTH_ACCESS
        }
        response = requests.get(url = url, headers = headers, params = {'language':[Util.LANGUAGE]})
        if response.ok != True:
            return Response(data = response.json(), status = response.status_code)
        status_code = response.status_code
        response = response.json()
        movieDetails =  {}
        movieDetails['id'] = response['id']
        movieDetails['imdb_id'] = response['imdb_id']
        movieDetails['title'] = response['title']
        movieDetails['runtime'] = response['runtime']
        movieDetails['language'] = response['original_language']
        movieDetails['imageUrl'] = response['poster_path']
        movieDetails['backDropUrl'] = response['backdrop_path']
        movieDetails['release_date'] = response['release_date']
        genres=""
        for genre in response['genres']:
            genres = genres + genre['name'] + ", "
        movieDetails['genre'] = genres[:-2]
        return Response(data = movieDetails, status = status_code)
    
    @classmethod
    def getIMDBRatingFromOMDB(cls, imdb_id):
        url = Util.OMDB_URL+"?apikey="+ Util.OMDB_API_KEY +"&i="+imdb_id
        response = requests.get(url).json()
        return response['imdbRating'] 