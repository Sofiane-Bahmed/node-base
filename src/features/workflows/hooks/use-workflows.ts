import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
};

/**hook to create a new workflow */
export const useCreateWorkflowHook = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`workflow "${data.name}"created`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions(),
            );
        },
        onError: (error) => {
            toast.error(`failed to create workflow${error.message}`)
        }
    }))
}