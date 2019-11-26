# GPSAPP - Centrale Mapper ![deer](deer.png)
*CentraleSupélec 2019 - Object-Oriented Programming Course*

*By Quentin Churet, Pauline Gloumeau & Thomas Descamps / September - December 2019*

Centrale Mapper is an app that enables you to look at the different modes of transport to go from an origin to a 
destination (in the region of Île-de-France, France only). The application can propose different modes of transport :
car, bike, walking, public transport, public bikes and public scooters.

On this repository, you can only find the front-end part of the application. The back-end part is available here : 
[https://github.com/qchuchu/POOA_Project_CityMapper](https://github.com/qchuchu/POOA_Project_CityMapper).

## 1. Installation

### 1.1 API Server

The API Server installation process is available on the adapted Github : 
[https://github.com/qchuchu/POOA_Project_CityMapper](https://github.com/qchuchu/POOA_Project_CityMapper)

Once you have installed all the dependencies and launched the server (front and back), the front app will be available at the following
address : http://localhost:8080, and will directly call the API Server at http://127.0.0.1:5000/itineraries, by sending
`POST` requests.

### 1.2 Front-End Server

1.2.1. Clone this repository

`git clone git@github.com:qchuchu/vue_gpsapp.git` with SSH

`git clone https://github.com/qchuchu/vue_gpsapp.git` with HTTPS

1.2.2. Install Node Package Manager

In order to easily install the dependencies of the project and launch the front server, you should download npm 
(node package manager). Here is the link : https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Once installed, you will be able to use the package by using the command line `npm`.

1.2.3 Project setup

Go into your project directory, and run the following command : 
```
npm install
```

1.2.4 Run Server

Still in your project directory, run the following command :
```
npm run
```

The server will then be available at the following address : http://localhost:8080

