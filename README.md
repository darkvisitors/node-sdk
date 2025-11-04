# Dark Visitors SDK

[![NPM version](https://img.shields.io/npm/v/@darkvisitors/sdk.svg)](https://npmjs.org/package/@darkvisitors/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@darkvisitors/sdk)

This library provides convenient access to [Dark Visitors](https://darkvisitors.com/) from server-side TypeScript or JavaScript.

## Install the Package

Download and include the package via NPM:

```sh
npm install @darkvisitors/sdk
```

## Initialize the Client

[Sign up](https://darkvisitors.com/sign-up) for Dark Visitors, create a project, and copy your access token from the project's settings page. Then, create a new instance of `DarkVisitors`.

```ts
import { DarkVisitors } from "@darkvisitors/sdk"

const darkVisitors = new DarkVisitors("YOUR_ACCESS_TOKEN")
```

## How To Set Up Agent & LLM Analytics ([Full Docs](https://darkvisitors.com/docs/analytics))

Get realtime insight into the hidden ecosystem of [crawlers, scrapers, AI agents, and other bots](https://darkvisitors.com/agents) browsing your website. Measure human traffic coming from AI chat and search platforms like ChatGPT, Perplexity, and Gemini.

To collect this data, call `trackVisit` for each incoming request in the endpoints where you serve your pages.

```ts
darkVisitors.trackVisit(incomingRequest)
```

### Use Middleware if Possible

If you can, add this in middleware to track incoming requests to all pages from a single place.

Here's an example with Express, but you can apply this same technique with other frameworks:

```ts
import express from "express"
import { DarkVisitors } from "@darkvisitors/sdk"

const app = express()
const darkVisitors = new DarkVisitors("YOUR_ACCESS_TOKEN")

app.use((req, res, next) => {
    darkVisitors.trackVisit(req)
    next()
})

app.get("/", (req, res) => {
    res.send("Hello, world!")
})

app.listen(3000, () => console.log("Server running on port 3000"))
```

### Test Your Integration

- Open your project's settings page
- Click **Send a Test Visit**
- Click **Realtime**

If your website is correctly connected, you should see visits from the Dark Visitor agent in the realtime timeline within a few seconds.

## How To Set Up Automatic Robots.txt ([Full Docs](https://darkvisitors.com/docs/robots-txt))

Protect sensitive content from unwanted access and scraping. Generate a continuously updating robots.txt that stays up to date with [all current and future bots](https://darkvisitors.com/agents) in the specified categories automatically.

Use the `generateRobotsTxt` function. Select which `AgentType`s you want to block, and a string specifying which URLs are disallowed (e.g. `"/"` to disallow all paths).

```ts
const robotsTxt = await darkVisitors.generateRobotsTxt([
  AgentType.AIDataScraper,
  AgentType.Scraper,
  AgentType.IntelligenceGatherer,
  AgentType.SEOCrawler
  // ...
], "/")

```

The return value is a plain text robots.txt string. Generate a `robotsTXT` periodically (e.g. once per day), then cache and serve it from your website's `/robots.txt` endpoint.

## Requirements

TypeScript >= 4.7 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.

## Support

Please [open an issue](https://github.com/darkvisitors/node-sdk/issues) with questions, bugs, or suggestions.