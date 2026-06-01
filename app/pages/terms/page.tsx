import { PolicyPage } from '@/components/PolicyPage';
import { TERMS } from '@/lib/policies';

export const metadata = { title: 'Terms & Conditions — Plynth' };

export default function Page() {
  return <PolicyPage data={TERMS} />;
}
