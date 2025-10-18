import { requireAuth } from "@/lib/auth-utils";

interface pageProps {
    params: Promise<{
        credentialsId: string,
    }>
}
const page = async ({ params }: pageProps) => {
    await requireAuth();
    const { credentialsId } = await params;
    return (
        <div>credential id: {credentialsId}</div>
    )
}

export default page