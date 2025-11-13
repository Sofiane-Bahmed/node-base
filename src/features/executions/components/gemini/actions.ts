"use server"

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { geminiChannel } from "@/inngest/channels/gemini";

export type GeminToken = Realtime.Token<
    typeof geminiChannel,
    ["status"]
>;

export async function fetchGeminiRealtimeToken(): Promise<GeminToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: geminiChannel(),
        topics: ["status"]
    });

    return token;
}