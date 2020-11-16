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
This app using [Travelpayouts flights search API](https://www.travelpayouts.com/developers/api), to access the flights search API you should be registered in our travel affiliate program and submit your request on [support@travelpayouts.com](mailto:support@travelpayouts.com) with the following information:

* URL of your website;
* Design prototypes of search result;
* Description of your project;
* How you will use the search API?
* Why aren’t the standard methods of integration ([search forms](https://support.travelpayouts.com/hc/en-us/articles/203638588-Search-form), [White Label](https://support.travelpayouts.com/hc/en-us/categories/115000474487), [API access to data](https://support.travelpayouts.com/hc/en-us/articles/203956163-Travel-insights-with-Travelpayouts-Data-API)) suitable for you. 

**[More information about flights search api](https://support.travelpayouts.com/hc/en-us/categories/200358578)**

After granting access to [Travelpayouts flight search Api](https://support.travelpayouts.com/hc/en-us/sections/200989107-Flights-search-API) you need to get your **api token** and **marker** [here](https://www.travelpayouts.com/developers/api).

![](https://habrastorage.org/web/b53/770/96e/b5377096e4dc473ba09ad67b21c8d198.png)


## Installation

Download and unzip package or clone it to your web folder `git clone https://github.com/travelpayouts/flights-api-project.git`

Use [composer](https://getcomposer.org/) to install dependencies.


### Changing your app parameters
Before first running of your app, you need to set app params. All your params is located in **config/params.php**

```
return [
    'adminEmail' => 'admin@example.com',
    'apiToken'=> '', // Token https://www.travelpayouts.com/developers/api
    'apiMarker'=> '', // Marker https://www.travelpayouts.com/developers/api
    'apiResponseLang'=> 'en', // Response language : en,ru,de,es,fr,it,pl,th.
    'title'=> 'TravelPayouts sample app', // Title of your app
    'baseUrl'=> '/flights-api-project' // Path of your app (for example: if your project url is http//site.com/flight set 'baseUrl'=> '/flights', if it in root directory set 'baseUrl'=> '/'
];
```

### Setting webserver 
* [Apache HTTP server](http://httpd.apache.org/) users have all needed .htaccess files out of box. 
* [Nginx HTTP server](http://nginx.org/) users should install PHP as an [FPM SAPI](http://php.net/install.fpm). You may use the following Nginx configuration, replacing `path/to/basic/web` with the actual path for `basic/web` and `mysite.local` with the actual hostname to serve.
