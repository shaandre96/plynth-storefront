import { PolicyPage } from '@/components/PolicyPage';
import { REFUNDS } from '@/lib/policies';

export const metadata = { title: 'Refund Policy — Plynth' };

export default function Page() {
  return <PolicyPage data={REFUNDS} />;
}
