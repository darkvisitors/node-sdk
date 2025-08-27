# Dark Visitors SDK

[![NPM version](https://img.shields.io/npm/v/@darkvisitors/sdk.svg)](https://npmjs.org/package/@darkvisitors/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@darkvisitors/sdk)

This library provides convenient access to [Dark Visitors](https://darkvisitors.com/) from server-side TypeScript or JavaScript.

## Install the Package

Download and include the package via npm:

```sh
npm install @darkvisitors/sdk
```

## Initialize the Client

[Sign up](https://darkvisitors.com/sign-up) for Dark Visitors, create a project, and copy your access token from the project's settings page. Then, create a new instance of `DarkVisitors`.

```ts
import { DarkVisitors } from "@darkvisitors/sdk"

const darkVisitors = new DarkVisitors("YOUR_ACCESS_TOKEN")
```

## Set Up Server Analytics ([Docs](https://darkvisitors.com/docs/analytics))

Track crawlers, scrapers, AI agents, and other bots that don't run JavaScript.

In the endpoints where you serve your pages, call `trackVisit` for each incoming pageview request.

```ts
darkVisitors.trackVisit(incomingRequest)
```

### Use Middleware if Possible

If you can, do this in middleware to track incoming requests to all pages from a single place. Here's an example with Express, but you can apply this same technique with other frameworks:

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

## Set Up Client Analytics ([Docs](https://darkvisitors.com/docs/analytics))

Track browser-using AI agents (that do run JavaScript) and human LLM referrals from AI chat and search platforms (e.g. ChatGPT, Perplexity, Gemini).

Simply copy the JavaScript tag from your project's settings page and paste it into your website's `<head>` tag.

## Set Up Automatic Robots.txt ([Docs](https://darkvisitors.com/docs/robots-txt))

Serve a continuously updating robots.txt with rules for entire categories of agents in the Dark Visitors [agent list](https://darkvisitors.com/agents). This is useful if you want to opt out of LLM training, protect sensitive information from scraping, etc. without needing to manually update your robots.txt.

Select which `AgentType`s you want to block, and a string specifying which URLs are disallowed (e.g. "/" to disallow all paths).

```ts
const robotsTxt = await darkVisitors.generateRobotsTxt([
  AgentType.AIDataScraper,
  AgentType.Scraper,
  AgentType.IntelligenceGatherer,
  AgentType.SEOCrawler
  // ...
], "/")

```

The return value is a plain text robots.txt. You can use this as is, or append additional lines to include things like sitemap links. Do this periodically (e.g. once per day), then cache and serve `robotsTxt` from your website's `/robots.txt` endpoint.

## Requirements

TypeScript >= 4.7 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.

## Support

Please [open an issue](https://github.com/darkvisitors/node-sdk/issues) with questions, bugs, or suggestions.