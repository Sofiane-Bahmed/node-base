"use client"

import LogoutButton from "./logout-button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const testAi = useMutation(trpc.testAi.mutationOptions());
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Workflow creation started");
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center flex-col gap-y-6">
      protected user component
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      <Button
        onClick={() => { testAi.mutate() }}
        disabled={testAi.isPending}
      >
        Test AI
      </Button>
      <Button
        disabled={create.isPending}
        onClick={() => { create.mutate() }}
      >
        Create workflow
      </Button>
      <LogoutButton />
    </div>
  );
}
