import prisma from '@/lib/db';
import { createTRPCRouter, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
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