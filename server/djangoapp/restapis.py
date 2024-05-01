import requests
import os
from dotenv import load_dotenv

load_dotenv()

<<<<<<< HEAD
backend_url = os.getenv(
  'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
  'sentiment_analyzer_url',
  default="http://localhost:5050/")

=======
backend_url = os.getenv('backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv('sentiment_analyzer_url', default="http://localhost:5050/")
>>>>>>> temp_main

def get_request(endpoint, **kwargs):
<<<<<<< HEAD
    params = ""
    if (kwargs):
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"

    request_url = backend_url + endpoint + "?" + params

    print("GET from {} ".format(request_url))
=======
    params = "&".join([f"{key}={value}" for key, value in kwargs.items()])
    request_url = f"{backend_url}{endpoint}?{params}"

    print(f"GET from {request_url}")
>>>>>>> temp_main
    try:
        response = requests.get(request_url)
        return response.json()
<<<<<<< HEAD
    except requests.exceptions.RequestException as err:
        # If any error occurs
        print(f"Network exception occurred: {err}")


# def analyze_review_sentiments(text):
def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + "analyze/" + text
=======
    except Exception as e:
        print(f"Network exception occurred: {e}")

def analyze_review_sentiments(text):
    request_url = f"{sentiment_analyzer_url}analyze/{text}"
>>>>>>> temp_main
    try:
        response = requests.get(request_url)
        return response.json()
<<<<<<< HEAD
    except requests.exceptions.RequestException as err:
        print(f"Unexpected error: {err}")
        print("Network exception occurred")


# def post_review(data_dict):
def post_review(data_dict):
    request_url = backend_url + "/insert_review"
=======
    except Exception as e:
        print(f"Network exception occurred: {e}")

def post_review(data_dict):
    request_url = f"{backend_url}/insert_review"
>>>>>>> temp_main
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
<<<<<<< HEAD
    except requests.exceptions.RequestException as err:
        print(f"Network exception occurred: {err}")
=======
    except Exception as e:
        print(f"Network exception occurred: {e}")
>>>>>>> temp_main
