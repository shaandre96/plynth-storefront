export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  images: string[];
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: 'vinyl-magnet',
    slug: 'vinyl-magnet',
    name: 'The Vinyl',
    subtitle: 'Personalised NFC Music Magnet',
    price: 7900,
    images: ['/images/vinyl-1.jpg', '/images/vinyl-2.jpg', '/images/vinyl-3.jpg'],
    description:
      'A miniature, premium-pressed vinyl magnet — etched with the song that means the most. Tap the embedded NFC chip with any phone and the track plays instantly.',
    features: [
      'Embedded NFC chip — taps to a custom landing page',
      'Recyclable bio-resin disc, hand finished',
      'Personalised artwork: title, artist, and a colour palette chosen by AI from the song',
      'Magnet backing — designed for the fridge, a record sleeve, or a frame',
    ],
  },
  {
    id: 'mini-keychain',
    slug: 'mini-keychain',
    name: 'The Key',
    subtitle: 'Mini Music Keychain',
    price: 4900,
    images: ['/images/key-1.jpg', '/images/key-2.jpg'],
    description:
      'Pocket-sized NFC keychain in the shape of a 7" single. Carry the song that started it all.',
    features: [
      'Brass-finished hardware, leather loop',
      'NFC tap to the same custom landing page',
      'Personalised micro-engraving on the reverse',
      'Ships in a recycled kraft envelope',
    ],
  },
  {
    id: 'gift-bundle',
    slug: 'gift-bundle',
    name: 'The Gift',
    subtitle: 'Complete Gift Bundle',
    price: 9900,
    images: ['/images/gift-1.jpg', '/images/gift-2.jpg', '/images/gift-3.jpg'],
    description:
      'The Vinyl and The Key, paired in a hand-folded gift box with a handwritten card. Our most given combination.',
    features: [
      'The Vinyl + The Key together — same song, same artwork',
      'Linen-wrapped gift box, wax-sealed',
      'Handwritten note (you write it, we letterpress it)',
      'Free express shipping in Australia',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type SimulatedOrderDetails = {
  email: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

export type SimulatedCartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type SimulatedCheckoutResult = {
  success: true;
  orderId: string;
  total: number;
};

export async function simulateCheckout(
  cart: SimulatedCartItem[],
  details: SimulatedOrderDetails,
): Promise<SimulatedCheckoutResult> {
  await new Promise((r) => setTimeout(r, 1500));
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Visible in the dev console for demo purposes
  // eslint-disable-next-line no-console
  console.log('Plynth — simulated order:', { cart, details, total });
  return { success: true, orderId: `PLY-${Date.now()}`, total };
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
