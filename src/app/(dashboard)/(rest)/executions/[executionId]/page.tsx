import { requireAuth } from "@/lib/auth-utils";

interface pageProps {
    params: Promise<{
        executionId: string,
    }>
}
const page = async ({ params }: pageProps) => {
    await requireAuth();
    const { executionId } = await params;
    return (
        <div>execution id: {executionId}</div>
    )
}

export default page