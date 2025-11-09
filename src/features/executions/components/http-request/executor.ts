import { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as kyOptions } from "ky";

type HttpRequestData = {
    variableName?: string,
    endpoint?: string,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: string,

}

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
    data,
    nodeId,
    context,
    step
}) => {
    //TODO : publish "loading" state for http request 

    if (!data.endpoint) {
        //TODO: Publish "error" state for http request
        throw new NonRetriableError("HTTP request node: no endpoint configured");
    }

    if (!data.variableName) {
        //TODO: Publish "error" state for http request
        throw new NonRetriableError("variable name not configured");
    }

    const result = await step.run("http-request", async () => {
        const endpoint = data.endpoint!;
        const method = data.method || "GET";

        const options: kyOptions = { method };

        if (["POST", "PATCH", "PUT"].includes(method)) {
            options.body = data.body;
            options.headers = {
                "Content-Type": "application/json"
            }
        }

        const response = await ky(endpoint, options);
        const contentType = response.headers.get("content-type");
        const responseData = contentType?.includes("application/json")
            ? await response.json()
            : await response.text()

        const responsePayload = {
            httpResponse: {
                status: response.status,
                statusText: response.statusText,
                data: responseData,
            },
        };

        if (data.variableName) {
            return {
                ...context,
                [data.variableName]: responsePayload
            }
        };

        // fallback to direct httpResponse for backward compatibility
        return {
            ...context,
            ...responsePayload
        }
    })

    //TODO : publish "success" state for http request 

    return result;
};
