import sys
import os
import openai
import requests
import json


def imagegen(text):
    openai.api_key = os.environ.get('OPENAI_API_KEY')

    response = openai.Image.create(
        prompt=text,
        n=1,
        size="1024x1024",
    )

    image_url = response['data'][0]['url']
    print(image_url)


if __name__ == '__main__':
    imagegen('A japanese watercolor painting of a rabbit eating a high quality piece of sashimi as the sun sets. Looking out over the ocean. Warm, miyazaki, ghibli-esque')
