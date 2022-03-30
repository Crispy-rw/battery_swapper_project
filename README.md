# Summary

Ths bigger picture of my implementation is to have a gps device attached on the battery and will be sending coordinates and battery seriel_number to the server in every 2 seconds so that those data can be used to live track and calculate distance travelled. The battery serial number is the source information because it is unique and will be used to identify the battery.

My database design is as follows:
 - Battery Table: used to save all the necessary information of a battery whether is in cicrulation or changing or idle, etc
 - mototbike: table used to save all the necessary information of a motorbike with the driver information
 - travel table: used to save all the necessary information of a travel, the travel is the movement of a motorbike. This table store all the information regarding the travel of a motorbike like battery_id, motorbike_id, starting battery_power, ending battery_power, start_time, end_time, travelled and the status of the travel.
 - coordinates table: used to store the latitude and longitude of the motorbike with its travel_id.

## Key Feature implementation

1. assets in motion: can be obtained from the battery table by checking its status if its `motion`.
2. battery swaps: can be obtained from the travel table by checking every travel done by the driver.
3. calculate distance travelled: can be obtained from the travel table and coordinates table by calculating distance from recorded coordinates.
4. how many batteries should be at a given station: this can be obtained from the travel table by checking the checkout station. the station with more number of travel will be the most visited station.




## API ENDPOINTS

| Ressource URL                         | Methods | Description              |
| --------------------------------------| ------- | -------------------------|
| /api/addbattery                       | POST    | Create a battery record  |
| /api/addmotorbike                     | POST    | Add a motorbike          |
| /api/createtravel                     | PUT     | Create a travel          |
| /api/starttravel/:batterserialnumber  | POST    | Start a travel           |   
| /api/stoptravel/:batterserialnumber   | POST    | Stop a travel            |   
| /api/track/:batterserialnumber        | POST    | Track a travel           |
| /api/distancetravelled                | POST    | get distance             |

### Language

```
 Javascript
```

### Server Environment

```
 NodeJS (run time Environment for running JS codes)
```

### Framework

```
 Express
```

## Getting started

These instructions will get you a copy of this project up and running on your local machine for development and testing purposes.

## Prerequisites

I assume you already have NodeJS, npm and mysql installed.
To install this project on your local machine, you need first to Unzip the project and set up the env variable file by filling in the required environment variables (Refer to the env.example file)

## Install

```sh
npm install
```

## Usage

This project built on top of expressJS and Mysql as database and then import database. So, to make things easy, you need to setup your env variable properly by by refering to the `.env.example` file and then run`npm start` to migrate and start the server accordingly or if you want to run in development mode you can just run the following commands and lasty import this file `c796debe-9542-499a-998d-d6e09b3a9883.json` to `https://hoppscotch.io/`

```sh
npm run dev
```

## Author

👤 **Nshimyumukiza Christian**

## License & copyright

ISC License (ISC)

Copyright (c) 2021 Nshimyumukiza Christian

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
