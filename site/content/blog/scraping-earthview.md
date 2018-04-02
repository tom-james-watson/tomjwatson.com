---
title: "Scraping Google Earth View"
date: 2016-04-19
tags: [programming, python]
---

I'm currently working on a desktop app, written in [Electron](http://electron.atom.io/), that will allow users to set desktop backgrounds from various sources such as Flickr, Google Art Project etc.

I recently stumbled across [Google Earth View](https://earthview.withgoogle.com/) and thought this would be perfect as another source. With a bit of research I discovered that sadly they have no open API.

However, let's take a look at the site and see where these images are coming from.

<!--more-->

![Would you look at that!](http://i.imgur.com/2314VA3.png)

Well would you look at that - it turns out they do have an API! Browsing through the images on the site updates this `data-photo` attribute on the body element with some JSON. Here's what that JSON looks like:

```json
{
    api : "/_api/polanczyk-poland-5484.json"
    attribution : "©2015 CNES / Astrium, Cnes/Spot Image, DigitalGlobe, Eurosense/Geodis Slovakia"
    country : "Poland"
    downloadUrl : "/download/5484.jpg"
    id : "5484"
    lat : "49.377978"
    lng : "22.449616"
    mapsLink : "https://www.google.com/maps/@49.377978,22.449616,14z/data=!3m1!1e3"
    mapsTitle : "View Polańczyk, Poland in Google Maps"
    nextApi : "/_api/nouadhibou-mauritania-6311.json"
    nextUrl : "/nouadhibou-mauritania-6311"
    photoUrl : "https://www.gstatic.com/prettyearth/assets/full/5484.jpg"
    prevApi : "/_api/south-iceland-1823.json"
    prevUrl : "/south-iceland-1823"
    region : "Polańczyk"
    slug : "polanczyk-poland-5484"
    thumbUrl : "https://www.gstatic.com/prettyearth/assets/preview/5484.jpg"
    title : "Polańczyk, Poland – Earth View from Google"
    url : "/polanczyk-poland-5484"
}
```

Well this seems to already have everything we could possibly need! It contains the URLs of the image/thumbnail, metadata and, most importantly, URLs to the next and previous images the series.

Scraping this API should be fairly straightforward:

```python
# Take the current api URL and convert that into a full URL.
url = 'https://earthview.withgoogle.com/_api/polanczyk-poland-5484.json'

# Request the JSON from said URL
import requests
page = requests.get(url)
photo_json = page.json()

# Print the download URL of the image (credited, copyright-safe version)
print 'earthview.withgoogle.com' + photo_json['downloadUrl']

# Grab the next URL
next_url = photo_json['nextApi']
```

At this point it is fairly trivial to write up a simple program to step through these URLs and save the returned JSON. You can find the full code and resultant JSON at [https://github.com/tom-james-watson/earthview-scraper](https://github.com/tom-james-watson/earthview-scraper), or read the code below.

We now have a JSON file with all 1523 images from Google Earth View ready for consumption!

```python
import sys
import json
import requests


seen_photos = {}


def recursive_scrape(url, count=0):

    # The API seems to link the images in a loop, so we can stop once we see an
    # image we have already seen.
    if url in seen_photos:
        return
    seen_photos[url] = True

    page = requests.get(url)
    photo_json = page.json()

    print photo_json
    yield photo_json

    next_url = 'https://earthview.withgoogle.com' + photo_json['nextApi']

    # Yielding from recursive functions is a bit funky
    for photo_json in recursive_scrape(next_url, count + 1):
        yield photo_json


if __name__ == "__main__":
    # Google Earth View contains around 1500 photos, so we need to up the
    # recursion limit
    sys.setrecursionlimit(2000)

    photos_json = json.dumps(list(recursive_scrape(
        'https://earthview.withgoogle.com/_api/polanczyk-poland-5484.json'
    )))

    with open('earthview.json', 'w+') as f:
        f.write(photos_json)
```
