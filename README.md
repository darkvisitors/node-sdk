# Dark Visitors SDK

[![NPM version](https://img.shields.io/npm/v/@darkvisitors/sdk.svg)](https://npmjs.org/package/@darkvisitors/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@darkvisitors/sdk)

This library provides convenient access to Dark Visitors from server-side TypeScript or JavaScript.

Further documentation can be found on [darkvisitors.com](https://darkvisitors.com/).

## Installation

Install the package via npm:

```sh
npm install @darkvisitors/sdk
```

## Initializing the Client

Create a new instance of `DarkVisitors` with your project's access token:

```ts
import { DarkVisitors } from "@darkvisitors/sdk"

const darkVisitors = new DarkVisitors("your-projects-access-token")
```

## Agent Analytics ([Docs](https://darkvisitors.com/docs/analytics/server))

Track visits from crawlers and scrapers in Dark Visitors agent analytics. In addition to server-side tracking, you can track browser-using AI agents client-side with the [JavaScript tag](https://darkvisitors.com/docs/analytics/client).

### Tracking Visits

In your route, simply call `trackVisit` with the incoming request:

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

## Automatic Robots.txt ([Docs](https://darkvisitors.com/docs/robots-txt))

Serve a continuously updating robots.txt with rules for all known agents in the Dark Visitors [agent list](https://darkvisitors.com/agents), of the specified types. This is useful if you want to opt out of LLM training or protect sensitive information.

### Generating a Robots.txt

```ts
const robotsTxt = await darkVisitors.generateRobotsTxt([
  AgentType.AIDataScraper,
  AgentType.UndocumentedAIAgent
])

```

Do this periodically (e.g. once per day), then cache and serve `robotsTxt` from your website's `/robots.txt` endpoint.

## Requirements

TypeScript >= 4.7 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.

## Support

Please [open an issue](https://github.com/darkvisitors/node-sdk/issues) with questions, bugs, or suggestions.