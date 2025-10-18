import { requireAuth } from '@/lib/auth-utils';

const page = async () => {
  await requireAuth();
  return (
    <div>crdentials page</div>
  )
}

export default page