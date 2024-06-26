# Backend Entitlement System

This is a backend system for managing dataset entitlements. The system allows Quantitative Traders to request access to datasets, which can be approved or rejected by Operations team members. The system is built with Node, TypeScript, Sequelize and PostgreSQL, and can be run locally or using Docker.

## Table of Contents

- [Project Setup](#project-setup)
- [Running the Project Locally](#running-the-project-locally)
- [Running the Project with Docker](#running-the-project-with-docker)
- [API Endpoints](#api-endpoints)
  - [GET /metadata](#get-metadata)
  - [POST /requests](#post-requests)
  - [GET /requests/pending](#get-requestspending)
  - [PATCH /requests/:requestAccessId](#patch-requestsrequestaccessid)
  - [GET /datasets](#get-datasets)
- [Running Tests](#running-tests)

## Project Setup

`/docs` folder contains:
- System design of the different services, their relationships and potential deployment on AWS (open with draw.io)
- Database modelling (open with draw.io)
- Postman requests ready to test the application

### Prerequisites

- Node.js
- PostgreSQL
- Docker (for running with Docker)

### Environment Variables

Create a `.env` file in the root directory. Please refer to `.env.example` file to add your variables.

### Docker Variables

Create a `docker-compose.yml` file in the root directory. Please refer to `.docker-compose.example.yml` file to add your variables.

### Install Dependencies

`npm install`

## Running the Project Locally

### Initialise the Database

Runn the following commands to initialise and populate the database:

`npm run initDB`
`npm run populateDB`

### Start the Server

`npm run dev`

## Running the Project with Docker

⚠️Please, remember to remove the `/docs` folder from the repository, as Docker will struggle recognising these files

`docker-compose build`
`docker-compose up`

### API Endpoints

## GET /metadata

Retrieve metadata for all datasets

#### Response example:

`{
  "status": "ok",
  "data": [
    {
      "id": "1",
      "name": "Bitcoin",
      "symbol": "BTC",
      "frequencies_dataset": [
        { "frequencyId": "1", "frequency": "hourly" },
        { "frequencyId": "2", "frequency": "daily" },
        { "frequencyId": "3", "frequency": "monthly" }
      ]
    },
    {
      "id": "2",
      "name": "Ethereum",
      "symbol": "ETH",
      "frequencies_dataset": [
        { "frequencyId": "2", "frequency": "daily" }
      ]
    }
  ]
}
`

## POST /requests

Quant users can request access to view pricing of a dataset with an available frequency.

#### Request example:

`Content-Type: application/json
Authorization: Bearer <token>`

`{
  "datasetId": "1",
  "freqId": "1"
}`

#### Response example:

`{
  "status": "ok",
  "message": "You have successfully made a request",
  "data": {
    "id": "1",
    "user_id": "1",
    "dataset_id": "1",
    "frequency_id": "1",
    "status": null
  }
}
`

## GET /requests/pending

Ops users can view all pending dataset access requests.

#### Request:

`Content-Type: application/json
Authorization: Bearer <token>`

#### Response example:

`{
  "status": "ok",
  "data": [
    {
      "id": "1",
      "user_id": "1",
      "dataset_id": "1",
      "frequency_id": "1",
      "status": null
    },
    {
      "id": "2",
      "user_id": "2",
      "dataset_id": "2",
      "frequency_id": "2",
      "status": null
    }
  ]
}
`

## PATCH /requests/:requestAccessId

Ops users can approve or reject a quant request.

#### Request example:

`Content-Type: application/json
Authorization: Bearer <token>`

`{
  "access": "approve"
}`

#### Response example:

`{
  "status": "ok",
  "message": "You have updated the request"
}
`

## GET /datasets

Quant users with granted access can view the datasets including pricing for the requested frequency.

#### Request example:

`Content-Type: application/json
Authorization: Bearer <token>`

`{
  "datasetId": "1",
  "freqId": "1"
}`

#### Response example:

`{
  "status": "ok",
  "data": [
    {
      "priceUsd": "10000",
      "time": 1622505600000,
      "date": "2021-06-01T00:00:00.000Z"
    },
    {
      "priceUsd": "20000",
      "time": 1625097600000,
      "date": "2021-07-01T00:00:00.000Z"
    }
  ]
}
`

## Running Tests

`npm run test`

If there is an issue with the server (EADDRINUSE :::3000), please run the tests individually. You can do that by installing Jest Runner in VSCode or with command, example: `npx jest src/tests/metadata.test.ts`
