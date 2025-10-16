import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {

        //fetch the youtube video
        await step.sleep("fetching", "5s");
        //transcribing
        await step.sleep("transcribing", "5s");
        //send transcription to AI
        await step.sleep("sending-to-AI", "5s");

        await step.run("create-workflow", () => {
            return prisma.workflow.create({
                data: {
                    name: "worflow-from-inngest"
                }
            })
        })
        return { message: `Hello ${event.data.email}!` };
    },
);