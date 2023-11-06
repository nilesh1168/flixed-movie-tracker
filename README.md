<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#releases">Releases</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
### Flixed

- Keeps track of all movies watched  and want to watch.
- Personalised movie tracker.
- Search for movies.
- Add them to Watch list.
- Add them to Watched list.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Django][Django]][Django-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
You need to install Node, Python and Django.

* Node

    You can dowload Node from the below link depending on the OS you have. 
    ```
    https://nodejs.org/en/download
    ```

* Python 
    
    Download and install python3 on your system.
    ```
    https://www.python.org/downloads/
    ```

* Django
    ```sh
    python -m pip install Django
    ```

### Installation

1. Get a free API Key at [OMDB API](https://www.omdbapi.com/apikey.aspx)
2. Clone the repo
   ```sh
   git clone https://github.com/nilesh1168/flixed-movie-tracker.git
   ```
3. Install Python packages
    ```sh
    pip3 install -r requirements.txt
    ```
    Note: Run this command from the directory where requirements.txt is available.

4. Install NPM packages
   ```js
   cd flixed_reactjs
   npm install
   ```
5. Setup your API KEY in environment variable
   ```sh
   REACT_APP_API_KEY = 'yourapikey'
   ```

6. Create a superuser in Django which can be used to login to the app.
    ```sh
    python manage.py createsuperuser
    ```
    Enter the email, username and password that is asked.
    Note: Run this command from the directory where manage.py is available.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
Here is a sample screen of the application

- [login-view-screenshot]
- [search-view-screenshot]
- [dashboard-view-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add back to top links
- [ ] Dashboard with graphs and information
- [ ] Add charts and comparisons in a page called statistics
- [ ] Display movies with poster; Use TMDB API
- [ ] Optimise component loading for huge data

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Releases

### v0.1
- Search movies
- Add them to watched movies or add them to watchlist

### v1.0
- User can login and access the home
- Search movies
- Add them to watched movies or watchlist
- Added eye-catching UI 
- Personalised user experience

### v1.1
- Added test cases for REST API

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

[Nilesh](https://www.linkedin.com/in/nilesh-suryawanshi1168/) - n.suryawanshi1168@gmail.com

Project Link: [https://github.com/nilesh1168/flixed-movie-tracker](https://github.com/nilesh1168/flixed-movie-tracker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [OMDB API](https://www.omdbapi.com/)
* [Best Readme Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md?plain=1)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Django]: https://img.shields.io/badge/DJANGO-Django?style=for-the-badge&logo=Django&logoColor=white&color=%230B4B33
[Django-url]: https://www.djangoproject.com
[login-view-screenshot]: /documentation/login-screen.png
[search-view-screenshot]: /documentation/search.png
[dashboard-view-screenshot]: /documentation/dashboard.png