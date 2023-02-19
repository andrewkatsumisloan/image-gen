from flask import Flask, request, jsonify
import requests
import string
import openai
import base64
import sys
import os

app = Flask(__name__)
openai.api_key = os.environ.get('OPENAI_API_KEY')


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/textgen', methods=['POST'])
def textgen():
    payload = request.get_json()

    # Set openai api key
    openai.api_key = os.environ.get('OPENAI_API_KEY')

    # Call open ai api
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=payload['input'],
        temperature=0,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        stop=["\n"]
    )

    print('This is the response: ', response)
    print(payload)

    payload = {
        "text": "Hello, World!"
    }

    # Send payload to OPENAPI server

    sys.stdout.flush()

    return response


@app.route('/imagegen', methods=['POST'])
def imagegen():
    payload = request.get_json()
    print('This is payload: ', payload)

    openai.api_key = os.getenv('OPENAI_API_KEY')

    response = openai.Image.create(
        prompt=payload['input'],
        n=1,
        size=payload['size'],
    )

    image_url = response['data'][0]['url']
    image = requests.get(image_url).content

    print(type(image))
    # print(image)

    # remove spaces from the input
    filename = payload['input'].replace(' ', '')

    # remove punctuation from the input
    filename = filename.translate(str.maketrans('', '', string.punctuation))

    # Save image to file with a unique name to avoid overwriting
    try:
        with open('static/{0}.png'.format(filename), 'wb') as handler:
            handler.write(image)
    except:
        print('Error saving image to file')
        pass

    print('This is the response: ', response)
    sys.stdout.flush()

    # encode bytes of image to base64
    image = base64.b64encode(image).decode('utf-8')

    # add to response object
    response['base64'] = image

    return jsonify(response)


if __name__ == '__main__':
    print(os.environ.get('OPENAI_API_KEY'))

    # response = openai.Completion.create(
    #     model="text-davinci-003",
    #     prompt="The best place in the world to get a burger is",
    #     temperature=0,
    #     max_tokens=100,
    #     top_p=1,
    #     frequency_penalty=0.0,
    #     presence_penalty=0.0,
    #     stop=["\n"]
    # )

    # print(response)
