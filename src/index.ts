import { IncomingMessage } from "http"

export interface Request {
    path: string
    method: string
    headers: Record<string, string | string[] | undefined>
}

export class DarkVisitors {
    private readonly accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

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
            }
        ))
    }
}