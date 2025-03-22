import { IncomingMessage } from "http"

export interface Request {
    /** The path of the request's URL (e.g. "/about") */
    path: string
    /** The request's HTTP method (e.g. "GET", "POST") */
    method: string
    /** The request's HTTP headers */
    headers: Record<string, string | string[] | undefined>
}

/**
 * Agent types that can be controlled with robots.txt rules.
 */
export enum AgentType {
    AIAssistant = "AI Assistant",
    AIDataScraper = "AI Data Scraper",
    AISearchCrawler = "AI Search Crawler",
    UndocumentedAIAgent = "Undocumented AI Agent"
}

export class DarkVisitors {
    private readonly accessToken: string

    /**
     * Creates a new instance of the Dark Visitors client.
     * 
     * @param accessToken - Your project's access token.
     */
    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

    /**
     * Tracks an agent visit in Dark Visitors agent analytics.
     *
     * @param visitRequest - The incoming visit request.
     */
    trackVisit(request: Request): void
    trackVisit(request: IncomingMessage): void
    trackVisit(visitRequest: Request | IncomingMessage): void {
        const request: Request = "path" in visitRequest ? visitRequest : {
            path: visitRequest.url ? new URL(visitRequest.url, "https://example.org/").pathname : "/",
            method: visitRequest.method ?? "GET",
            headers: visitRequest.headers
        }

        fetch("https://api.darkvisitors.com/visits", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_path: request.path,
                request_method: request.method,
                request_headers: this.filterHeaders(request.headers)
            })
        }).catch(error => {
            console.error(`Dark Visitors failed to track visit: ${error.message}`)
        })
    }

    /**
     * Generates a `robots.txt` file that disallows the specified agent types.
     * Cache and serve this string at your website’s `/robots.txt` endpoint.
     *
     * @param agentTypes - A list of agent types to include.
     * @param disallow - A path to disallow (default is "/" for all paths).
     * @returns The generated `robots.txt` as a string.
     * @throws If the API call fails or returns a non-200 status.
     */
    async generateRobotsTxt(agentTypes: AgentType[], disallow: string = "/"): Promise<string> {
        const response = await fetch("https://api.darkvisitors.com/robots-txts", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                agent_types: agentTypes,
                disallow: disallow
            })
        })

        if (response.ok) {
            return await response.text()
        } else {
            throw new Error(`Dark Visitors failed to generate robots.txt: ${response.status} ${response.statusText}`)
        }
    }

    // Helpers

    private filterHeaders(headers: Record<string, string | string[] | undefined>): Record<string, string | string[] | undefined> {
        const excludedHeaders = new Set([
            "authorization",
            "proxy-authorization",
            "cookie",
            "set-cookie"
        ])

        return Object.fromEntries(
            Object.entries(headers).filter(([key]) => {
                return !excludedHeaders.has(key.toLowerCase())
            })
        )
    }
}