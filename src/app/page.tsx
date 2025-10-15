import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {
  await requireAuth();

  const data = await caller.getUsers()
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      protected user component
      {JSON.stringify(data)}
    </div>
  );
}
