import type { GetStepTools, Inngest } from "inngest";

export type WorkflowContext = Record<string, unknown>;

export type stepTools = GetStepTools<Inngest, any>

export interface NodeExecutorParams<TData = Record<string, unknown>> {
    data: TData,
    nodeId: string,
    context: WorkflowContext,
    step: stepTools,
    // publish: TODO
}

export type NodeExecutor<TData = Record<string, unknown>> = (
    params: NodeExecutorParams<TData>,

) => Promise<WorkflowContext>