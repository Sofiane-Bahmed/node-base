import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import LogoutButton from "./logout-button";

export default async function Home() {
  await requireAuth();

  const data = await caller.getUsers()
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center flex-col gap-y-6">
      protected user component
      <div>
        {JSON.stringify(data)}
      </div>
      <LogoutButton />
    </div>
  );
}
