import { PolicyPage } from '@/components/PolicyPage';
import { SHIPPING } from '@/lib/policies';

export const metadata = { title: 'Shipping Policy — Plynth' };

export default function Page() {
  return <PolicyPage data={SHIPPING} />;
}
