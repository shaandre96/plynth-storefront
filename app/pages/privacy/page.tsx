import { PolicyPage } from '@/components/PolicyPage';
import { PRIVACY } from '@/lib/policies';

export const metadata = { title: 'Privacy Policy — Plynth' };

export default function Page() {
  return <PolicyPage data={PRIVACY} />;
}
