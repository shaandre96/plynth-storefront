import { PolicyPage } from '@/components/PolicyPage';
import { SHIPPING } from '@/lib/policies';

export const metadata = { title: 'Shipping Policy' };

export default function Page() {
  return <PolicyPage data={SHIPPING} />;
}
