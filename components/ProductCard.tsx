import Link from 'next/link';
import { ArrowIcon } from './icons';
import { formatPrice, type Product } from '@/lib/mock-store';

const VARIANT_PHOTO: Record<string, string> = {
  'vinyl-magnet': 'photo-ph',
  'mini-keychain': 'photo-ph-2',
  'gift-bundle': 'photo-ph-4',
};

export function ProductCard({ product }: { product: Product }) {
  const photoCls = VARIANT_PHOTO[product.id] ?? 'photo-ph';
  return (
    <Link href={`/shop/${product.slug}`} className="card-paper group block overflow-hidden rounded-[14px]">
      <div className={`${photoCls} aspect-[4/5]`} />
      <div className="relative z-10 p-6">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-[22px] text-ink">{product.name}</h3>
          <span className="font-mono text-[12px] text-muted">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-1 text-[13.5px] text-muted">{product.subtitle}</p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-ink">
          <span className="underline-grow">Customise</span>
          <ArrowIcon
            style={{ width: 12, height: 12 }}
            className="transition group-hover:text-accent"
          />
        </div>
      </div>
    </Link>
  );
}
