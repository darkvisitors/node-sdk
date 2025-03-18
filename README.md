# Dark Visitors SDK

[![NPM version](https://img.shields.io/npm/v/@darkvisitors/sdk.svg)](https://npmjs.org/package/@darkvisitors/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@darkvisitors/sdk)

This library provides convenient access to the Dark Visitors REST API from server-side TypeScript or JavaScript.

Further documentation can be found on [darkvisitors.com](https://darkvisitors.com/).

## Installation

Install the package via npm:

```sh
npm install @darkvisitors/sdk
```

## Usage

### Initializing the Client

Create a new instance of `DarkVisitors` using your project's access token:

```ts
import { DarkVisitors } from "@darkvisitors/sdk"

const darkVisitors = new DarkVisitors("your-access-token")
```

### Tracking Visits

In your route, call `trackVisit` with the incoming request:

```ts
darkVisitors.trackVisit(incomingRequest)
```

### Using Express Middleware

If you're using Express, you can use middleware to track all requests automatically:

```ts
import express from "express"
import { DarkVisitors } from "@darkvisitors/sdk"

const app = express()
const darkVisitors = new DarkVisitors("your-access-token")

app.use((req, res, next) => {
    darkVisitors.trackVisit(req)
    next()
})

app.get("/", (req, res) => {
    res.send("Hello, world!")
})

app.listen(3000, () => console.log("Server running on port 3000"))
```

## Requirements

TypeScript >= 4.7 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.

## Support

Please [open an issue](https://github.com/darkvisitors/node-sdk/issues) with questions, bugs, or suggestions.