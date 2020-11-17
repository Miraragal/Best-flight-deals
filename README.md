# Best-flight-deals
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript) 
![MaterialUI](https://img.shields.io/badge/-MaterialUI-563D7C?style=flat-square&logo=materialui)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Nodejs](https://img.shields.io/badge/-NodeJS-black?style=flat-square&logo=Node.js)
![VSCode](https://img.shields.io/badge/-VS_Code-007ACC?style=flat-square&logo=visual-studio-code)

Allows users to browse global flights and compare the results of a round trip to individual legs with one click.

This is a standalone app based on [ReactJs](https://reactjs.org/) on frontend. It uses [Amadeus api](https://developers.amadeus.com/) for retrieving flights information and view search results on a domain or subdomain of your site. 


#### [Check out demo](https://github.com/Miraragal/Best-flight-deals/blob/main/frontend/public/ezgif.com-gif-maker.gif) 
![LandingPage](https://github.com/Miraragal/Best-flight-deals/blob/main/frontend/public/ezgif.com-gif-maker.gif) 



## Requirements
This app using [Amadeus Self-Service API](https://developers.amadeus.com/get-started/get-started-with-self-service-apis-335), to access to Amadeus Self-Service APIs you should be registered. After granting access, you need to get your **API Token** [here](https://developers.amadeus.com/self-service/apis-docs/guides/authorization-262).This token will identify you as valid user and is generated from two parameters: **API Key and API Secret**.


### Installation

Download and unzip package or clone it to your web folder `git clone https://github.com/Miraragal/Best-flight-deals`


### Changing your app parameters
Before first running of your app, you need to set app params. All your params is located in **config.js**

```
 clientId= 'Client Id'
 clientSecret='Client Secret'
 url='https://test.api.amadeus.com/v1/security/oauth2/token'
 urlGetFlights= 'https://test.api.amadeus.com/v2/shopping/flight-offers'

```

