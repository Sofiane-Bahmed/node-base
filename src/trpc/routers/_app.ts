import prisma from '@/lib/db';
import { createTRPCRouter, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { TRPCError } from '@trpc/server';

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    throw new TRPCError({ code: "BAD_REQUEST", message: "something went wrong" })
    await inngest.send({
      name: "execute/ai",
    })
    return { success: true, message: 'job queued' }

  }),

  getWorkflows: protectedProcedure.query(() => {

    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: "soaba@gmail.com"
      }
    })

    return { success: true, message: 'Workflow creation started via Inngest' }
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;