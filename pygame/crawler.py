import requests
from bs4 import BeautifulSoup
import time

def find_video_page(base_url, start=1, delay=1):
    """
    Incrementally checks URLs by appending a number until a page with a video is found.
    
    Parameters:
    - base_url (str): The base URL with a placeholder for the number (e.g., 'https://example.com/page/{}')
    - start (int): The initial number to start checking from.
    - delay (int): Delay in seconds between requests to avoid rate limiting.

    Returns:
    - str: The URL of the first page found with a video.
    """
    number = start
    
    while True:
        # Construct the URL by inserting the current number
        url = base_url.format(number)
        response = requests.get(url)

        # Check if the request was successful
        if response.status_code != 200:
            print(f"Failed to load page {url} (status code {response.status_code})")
            break
        
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Check for "This content is not available" message
        if "This content is not available" in soup.text:
            print(f"No video on page {url} (content unavailable)")
        else:
            # Assuming the presence of a <video> tag means the page has a video
            video = soup.find('video')
            if video:
                print(f"Video found on page {url}")
                return url
            else:
                print(f"No video found on page {url}")
        
        # Increment and wait
        number += 1
        time.sleep(delay)

# Usage
base_url = 'https://www.nba.com/watch/event/oklahoma-city-thunder-postgame-press-conference-{}'
result_url = find_video_page(base_url, start=57, delay=1)
print(f"First page with video found: {result_url}")
