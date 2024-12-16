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
        <li><a href="#environment-variables-setup-guide-for-django-and-reactjs">Environment Variables Setup Guide for Django and ReactJS</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
        <li>
      <a href="#deployment">Deployment</a>
      <ul>
        <li><a href="#deploying-on-macos">MacOS</a></li>
        <li><a href="#deploying-frontend">Deploying Frontend</a></li>
      </ul>
    </li>
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
* <a href="https://developer.themoviedb.org/docs/getting-started"><img src="flixed_reactjs/src/styles/images/TMDB-sm.svg" alt="TMDB" width="100"></img></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
You need to install ```Node```, ```Python``` and ```Django```.

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

### Environment Variables Setup Guide for Django and ReactJS
#### Django Environment Variables
#### **Where to Define:**
Environment variables for Django need to be initialized in your shell profile file:  
- `.bash_profile` (for Bash users)  
- `.zsh_profile` (for Zsh users)  

#### **Required Variables:**
Below is the list of environment variables required for Django, along with their usage:

| **Variable**           | **Purpose**                                  |
|-------------------------|----------------------------------------------|
| `CORS_ORIGIN_WHITELIST` | List of origins allowed for CORS requests.   |
| `DJANGO_DEBUG`          | Enables or disables debug mode (`True/False`). |
| `DJANGO_SECRET_KEY`     | Secret key for Django security.             |
| `REACT_HOST`            | Used for the `ALLOWED_HOSTS` property in `settings.py`. |
| `OMDB_API_KEY`          | API key for OMDB integration.               |
| `TMDB_API_KEY`          | API key for TMDB integration.               |
| `TMDB_API_AUTH_ACCESS`  | Authentication token for TMDB API.          |
| `OMDB_URL`              | Base URL for OMDB API.                      |
| `TMDB_URL`              | Base URL for TMDB API.                      |
| `TMDB_CONFIG_URL`       | URL for TMDB configuration settings.        |

#### **Example: Adding Variables to `.bash_profile` or `.zsh_profile`**
```bash
export CORS_ORIGIN_WHITELIST="http://localhost:3000"
export DJANGO_DEBUG=True
export DJANGO_SECRET_KEY="your-secret-key"
export REACT_HOST="localhost"
export OMDB_API_KEY="your-omdb-api-key"
export TMDB_API_KEY="your-tmdb-api-key"
export TMDB_API_AUTH_ACCESS="your-tmdb-auth-access"
export OMDB_URL="https://www.omdbapi.com"
export TMDB_URL="https://api.themoviedb.org/3"
export TMDB_CONFIG_URL="https://api.themoviedb.org/3/configuration"
```
#### ReactJS Environment Variables Setup Guide

#### Where to Define
React environment variables must be defined in a `.env` file located at the root of your React project (where `package.json` is present).

#### Naming Convention
All React environment variables must start with the prefix `REACT_APP_`. This is a requirement for Create React App to recognize them.

#### Required Variables
Below is the list of environment variables required for your React project:

| **Variable**                     | **Purpose**                                  |
|-----------------------------------|----------------------------------------------|
| `REACT_APP_FLIXED_REST_BASE_URL` | Base URL for the REST API used in the app.   |
| `REACT_APP_TMDB_IMG_BASE_URL`    | Base URL for TMDB images.                    |
| `REACT_APP_TMDB_SEC_IMG_BASE_URL`| Base URL for secondary TMDB images.          |

#### **Steps to Define:**
1. Create a `.env` file in the root directory of your React project.
2. Add the environment variables in the following format:
  ```bash
  REACT_APP_FLIXED_REST_BASE_URL=https://api.flixed.com
  REACT_APP_TMDB_IMG_BASE_URL=https://image.tmdb.org/t/p/original
  REACT_APP_TMDB_SEC_IMG_BASE_URL=https://image.tmdb.org/t/p/w500
  ```
### Installation

1. Get a free API Key for OMDB at [OMDB API](https://www.omdbapi.com/apikey.aspx) and TMDB at [TMDB API](https://www.themoviedb.org/signup)

2. Clone the repo
   ```sh
   git clone https://github.com/nilesh1168/flixed-movie-tracker.git
   ```
3. Install Python packages
    ```sh
    pip3 install -r requirements.txt
    ```
    📝 **Note:** Run this command from the directory where requirements.txt is available.

4. Install NPM packages
   ```js
   cd flixed_reactjs
   npm install
   ```

5. Create a superuser in Django which can be used to login to the app.
    ```sh
    python manage.py createsuperuser
    ```
    Enter the email, username and password that is asked.
    📝 **Note:** Run this command from the directory where manage.py is available.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
Here is a sample screen of the application

- [login-view-screenshot]
- [search-view-screenshot]
- [dashboard-view-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deployment

This section tells you about how to deploy this application on a system.

### Deploying on MacOS
1. Run the following command to install the required packages. This will also install gunicorn.
    ```sh
      $ pip install -r /path/to/requirements.txt
    ```

2. Create a Config File for Gunicorn. 
  
    1. You can use the existing ```gunicorn_config.py``` with desired changes according to your directory structure.
    
    2. Set the ```bind``` variable as desired in the ```gunicorn_config.py``` file. 

3. Create a bash file to set up all the required environment variables for the application and to start Gunicorn.
    1. You can use the existing ```gunicorn-env.sh``` file.
    Make sure to make changes in the file according to your directory structure. 
    2. Set the ```OMDB_API_KEY, TMDB_API_AUTH_ACCESS```, and ```TMDB_API_KEY``` to successfully run the application.

4. Create a property list file for launching Gunicorn at system startup.
    1. You can use the existing ```flixed_launctl.plist``` file. 
    2. Make sure to change the ```PATH``` variable in the file according to your directory structure. 3. Update the ```UserName``` and ```GroupName``` accordingly.
    
    📝 **Note:** This property list file will run the bash script to create the environment variables and start the Gunicorn server on system startup.
    
    3. For user-specific setup, copy the property list file to your system's LaunchAgents folder. For all users, copy it to LaunchDaemons at the root location.
        ```sh
        $ cp /your/path/flixed_launctl.plist /your/path/LaunchAgents
        ```
5. After copying the file, use the launchctl utility to load this file.
    ```sh
    $ launchctl load flixed_launctl.plist
    ```
    To check if the load was successful, run:
    ```sh
    $ launchctl list com.nilesh.flixed.gunicorn
    ```
    This should return a JSON response similar to:
    ```sh
    {
	    "LimitLoadToSessionType" = "Aqua";
	    "Label" = "com.nilesh.flixed.gunicorn";
	    "OnDemand" = true;
	    "LastExitStatus" = 0;
	    "PID" = 6869;
	    "Program" = "/bin/bash";
	    "ProgramArguments" = (
	    	"/bin/bash";
	    	"/your/path/gunicorn-env.sh";
	        );
      };
    ```

6. Your Gunicorn should now be up and running at the specified bind IP and port.

7. To stop the gunicorn service run
    ```sh
    $ launchctl unload flixed_launctl.plist
    ```
8. To verify if the unload was success, run
    ```sh
    $ launchctl list com.nilesh.flixed.gunicorn
    ```

    This should give the following output
    ```sh
    Could not find service "com.nilesh.flixed.gunicorn" in domain for port
    ```
    This means that the service has been stopped successfully.

9. Install **nginx** as following
    ```sh
    brew install nginx
    ```

10. Goto ```/opt/homebrew/Cellar/nginx/1.25.5/``` and run the following command on the file ```homebrew.mxcl.nginx.plist```:
      ```sh
      launchctl load homebrew.mxcl.nginx.plist
      ```
      This will start the nginx service on you macOS.
      
      📝 **Note**: To stop the service, use the following command:
      ```sh
       launchctl unload homebrew.mxcl.nginx.plist
       ```


11. Update the ```nginx.conf``` at ```/opt/homebrew/etc/nginx/nginx.conf``` to include the settings to add nginx as reverse proxy server.
    ```sh
    upstream server_django {
        server 127.0.0.1:8000; # whatever bind value that you gave in gunicorn_config.py
    }
    server {
        server_name  localhost;

        listen 80;
        location / {
            proxy_pass http://server_django;
            proxy_set_header Host $host;
        }

        location /static/ {
            alias /your/venv/lib/python3.9/site-packages/rest_framework/static/;
        }
    ```
    Once you update the ```nginx.conf``` you can restart the nginx service. 
    
    📝 **Note**: You can stop and start the nginx service for a restart.

12. All the REST APIs will then be available at ```server_name:listen``` that you provided for ```server_name``` and ```listen``` in ```nginx.conf``` .

## Deploying Frontend
1. Install the required packages and libraries.
    ```sh
      npm install
    ```

    📝 **Note**: Run this command at ```flixed_reactjs``` location.

2. Update the ```base_url``` property under ```flixed_reactjs/src/components/config.js``` as per your nginx configuration.

3. Head to the ```flixed_reactjs``` directory, and run the following command on the terminal
    ```sh
    npm start
    ```
4. This will start the frontend server at ```localhost:3000```.




<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add back to top links
- [ ] Dashboard with graphs and information
- [ ] Add charts and comparisons in a page called statistics
- [x] Display movies with poster; Use TMDB API
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
* [TMDB API](https://developer.themoviedb.org/docs/getting-started)
* [Best Readme Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md?plain=1)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)
* [gunicorn on macOS](https://chat.openai.com/share/e3ae209a-1ce0-48c9-85f2-c78dca9c6911)
* [What is NGINX? and how to set it up on Mac.](https://medium.com/@VenuThomas/what-is-nginx-and-how-to-set-it-up-on-mac-107a2482a33a)
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