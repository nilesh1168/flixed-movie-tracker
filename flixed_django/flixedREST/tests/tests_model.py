from django.test import TestCase

from ..models import WatchedMovie, WatchList, User
import datetime
# Create your tests here.

class ModelTest(TestCase):
    """
        Test class for model testing.
    """
    def setUp(self):
        User.objects.create(username="testUser",first_name="John",last_name="Doe",
            email="johndoe23@anywhere.com")
        
        user = User.objects.get(username="testUser")
        
        WatchedMovie.objects.create(id=1, imdb_id="tt4737", title="Test Watched Movie",
            rating=8.0,genre="Development, Application",release_date="2015-12-10",runtime=100,
            watched_date=datetime.date.today(),language="Python, Java",user=user)
        
        WatchList.objects.create(id=2,imdb_id="tt4738", title="Test WatchList Movie",
            rating=7.7,genre="Development, Application",release_date="2021-10-21",runtime=101,
            language="Python, Java",user=user)

    def test_movies_has_user(self):
        watchedMovie = WatchedMovie.objects.get(title="Test Watched Movie")
        watchlistMovie = WatchList.objects.get(title="Test WatchList Movie")
        self.assertIsInstance(watchedMovie.getUser(),User,"Watched Movie has User")
        self.assertIsInstance(watchlistMovie.getUser(),User,"WatchList Movie has User")

    def test_watchedmovie_is_watched(self):
        watchedMovie = WatchedMovie.objects.get(title="Test Watched Movie")
        self.assertGreaterEqual(watchedMovie.getTimesWatched(),1)                