# GMO Yours Automatic Order (deprecated)

An automated ordering system for GMO Yours utilizing Puppeteer, Node.js, and Slack notifications.

## Overview

This repository contains code for an application that automates the process of placing an order on GMO Yours. The script logs into the platform, checks the last order date, places a new order if necessary, and sends a confirmation to a specified Slack channel. 

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/en/download/) installed. This project uses Node.js version `14.16.0`.

### Dependencies

The following Node.js libraries are used in this project:
- puppeteer
- dotenv
- moment-timezone
- @slack/bolt
- @types/puppeteer
- typescript

### Installation

- Clone this repository to your local machine using `git clone <repository url>`.
- Navigate to the project folder `cd gmo-yours-automatic-order`.
- Install the dependencies using `npm install`.

### Configuration

Set the environment variables in a `.env` file:

```env
OAUTH_TOKEN=<your-slack-oauth-token>
SIGNING_SECRET=<your-slack-signing-secret>

ID=dvsdbvdfsbfr323gp4553
EMAIL=xxx@xxxx.com
PASSWORD=password
```

These are used to authorize your app to send messages and files to Slack.

### Running the script

To start the script, you can run:

```bash
npm run start
```

## Docker 

A Dockerfile is provided to run this application in a container. 

### Building the Docker image

Build the Docker image using the following command:

```bash
docker build -t gmo-yours-automatic-order .
```

### Running the Docker image

Run the Docker image using the following command:

```bash
docker run -p 4000:4000 gmo-yours-automatic-order
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the terms of the [MIT license](https://choosealicense.com/licenses/mit/).

## Contact

For any questions or concerns, please open an issue on this repository.

---

Please adjust as necessary to fit the needs of your project.
