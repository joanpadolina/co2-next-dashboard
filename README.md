# CO2 smart charging dashboard

This project is a graduation project made possible by Voorhoede and Green Caravan.

## [View prototype](https://smart-charging.vercel.app/)

## Table of contents

1. Installation
1. Introduction
1. Concept
1. Features
1. Data
1. Credit

![Application](https://user-images.githubusercontent.com/34737850/120447329-cc92ad80-c38a-11eb-8e09-906a1f4b3c7b.png)

## Installation

### Tech stack

1. NextJS
1. InfluxDB
1. Redux
1. Vercel

```
git clone https://github.com/joanpadolina/co2-next-dashboard.git
```

```
npm install
```

```
npm vercel dev
```

Open on http://localhost:3000


## Introduction

Green Caravan and Voorhoede are working on an application where electric drivers can save up Carbon during charging sessions. The overal energy production changes overtime due to the weather. This is the reason why time of charge has influence on your savings. If timed correctly one session can saved up to 60% Carbon in a day. Read more about carbon saving at [CO2 smart charging](https://www.co2smartcharging.com/)

## Concept

The project started around October 2020 and as a graduate student I had the honour to research the case further. The main question from the parties was: "How can we inform new and old user about saving carbon". During my research I've interviewd current users of CO2 smart charging and came to the following conclusion:

In the current situation user are not informed about that the total amount saving, in kilograms. This doesn't impact the situation where the endgoal is to be more alert on charging sessions. Getting feedback on your session is also a pain because of many inbetween steps for the user and product owner. How can I simplify this for both end?

With this in mind I began my project to benefit both user and product owner.

## Features

The prototype has a few key features to create a personal dashboard for the end user.

### Tracking

Keep track carbon savings by using this product.

### Fill in session

The important feature is for users to be able to control their session without other parties involved. With this they are able to directly fill in their session and see results.

### Community

With this feature the goal is to motivate eachother by having a 'Road trip' together. The gimmick for the community on savings is compared to distance with a petrol car. This way the total kilograms in savings are translated in everyday situation.

### Your garden

Another goal for users is to fill their garden up with trees. This is a gimmick that translate tree consumption of carbon in one year.

### Timeslots for best savings

This project is using [Elektricitymap's](https://www.electricitymap.org/) data to translate the best timeslot for charging.

## Data

The Mock-data is in json format.

example:

user.json

```json
{
    "user": {
        "id": Number,
        "name": String,
        "elektricityConsumed": Number,
        "anualKm": Number,
        "avarageConsumption": Number,
        "chargeSpeedKmHour": Number
    }
}
```

chargingSession.json

```json
{
    "chargingSession": {
        "id": String,
        "created": Date,
        "chargedIn": String,
        "duration": String,
        "savedCarbon": Number,
        "amountCharge": Number,
        "start": String,
        "end": String,
        "savingsInPercentage": Number,
        "date": String
    }
}
```

## Credit

- [Voorhoede](https://www.voorhoede.nl/nl/) | For the opportunity graduating on the project.
- [Jasper Moel](https://github.com/jbmoelker) | Influx DB and forecast setup
- [Ferry Tap](https://nl.linkedin.com/in/drtap) | Project informations in details
- [Sjoerd Beentjes](https://github.com/sjoerdbeentjes) | Meetings every other week / Deploy NextJS
- [Sander voor 't Hekke](https://nl.linkedin.com/in/voorthekke) | Feedback on designs
