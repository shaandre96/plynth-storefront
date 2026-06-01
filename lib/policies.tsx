import type { PolicyData } from '@/components/PolicyPage';

export const PRIVACY: PolicyData = {
  title: 'Privacy Policy',
  lastUpdated: '12 May 2026',
  intro:
    'Plynth is built on trust. This policy explains what we collect when you order a personalised vinyl, why we collect it, and the controls you have over your information.',
  sections: [
    {
      id: 'collect',
      title: 'Information we collect',
      body: (
        <>
          <p>
            When you place an order or browse our site we collect a small set of information
            necessary to deliver your gift and to keep the experience working:
          </p>
          <ul>
            <li>
              <strong>Account & order details.</strong> Name, email, shipping address, billing
              details, and the song, photo, and message you choose to press onto your magnet.
            </li>
            <li>
              <strong>Usage data.</strong> Pages visited, device type, and approximate location
              (city level), via privacy-respecting analytics.
            </li>
            <li>
              <strong>Communications.</strong> Any correspondence with our team — email replies,
              support chats, returns conversations.
            </li>
          </ul>
          <p>
            We never collect what we don&rsquo;t need. We don&rsquo;t buy data from third parties,
            and we don&rsquo;t enrich your profile with information from elsewhere.
          </p>
        </>
      ),
    },
    {
      id: 'use',
      title: 'How we use it',
      body: (
        <>
          <p>Your information is used to:</p>
          <ul>
            <li>Press, package, and ship your order.</li>
            <li>Email order confirmations, proofs, and shipping updates.</li>
            <li>Respond to support requests and process returns.</li>
            <li>Improve our products — anonymised, aggregated metrics only.</li>
          </ul>
          <p>
            We never sell your data, and we never use the photos or messages you submit for
            marketing without your written consent.
          </p>
        </>
      ),
    },
    {
      id: 'sharing',
      title: 'Sharing & third parties',
      body: (
        <>
          <p>We share data only with carefully chosen partners required to deliver your gift:</p>
          <ul>
            <li>
              <strong>Payment processing.</strong> Stripe — we never see or store your full card
              number.
            </li>
            <li>
              <strong>Shipping.</strong> Australia Post and DHL for international.
            </li>
            <li>
              <strong>Licensing.</strong> Audio rights administered by APRA AMCOS.
            </li>
          </ul>
          <p>
            Each partner is bound by data-processing agreements that meet or exceed Australian
            Privacy Act standards.
          </p>
        </>
      ),
    },
    {
      id: 'rights',
      title: 'Your rights',
      body: (
        <>
          <p>
            You can ask us to <strong>access</strong>, <strong>correct</strong>,{' '}
            <strong>export</strong>, or <strong>delete</strong> your data at any time. Email{' '}
            <a href="mailto:privacy@plynth.studio">privacy@plynth.studio</a> and we&rsquo;ll
            action it within 30 days.
          </p>
          <blockquote>
            We&rsquo;ll only ever retain your custom song / photo / message data for as long as
            needed to support your order — typically 12 months.
          </blockquote>
        </>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies',
      body: (
        <>
          <p>
            We use a small set of essential cookies (cart, checkout) and one privacy-respecting
            analytics cookie (Plausible). No advertising trackers, no retargeting pixels.
          </p>
        </>
      ),
    },
  ],
};

export const REFUNDS: PolicyData = {
  title: 'Refund Policy',
  lastUpdated: '12 May 2026',
  intro:
    'Because each Plynth is pressed by hand for one person, returns work a little differently than off-the-shelf gifts. We want you to love it, and we’ll repress, refund, or replace if you don’t.',
  sections: [
    {
      id: 'guarantee',
      title: 'Our 30-day guarantee',
      body: (
        <p>
          If the gift doesn&rsquo;t land — wrong song chosen in haste, photo quality not quite
          right, or it simply isn&rsquo;t what you hoped — write to us within 30 days of delivery
          and we&rsquo;ll <strong>repress one replacement on us</strong>. No questions, one swap
          per order.
        </p>
      ),
    },
    {
      id: 'personalised',
      title: 'Personalised items',
      body: (
        <p>
          Outside the 30-day guarantee, personalised items aren&rsquo;t eligible for general
          refund — they can&rsquo;t be resold. We&rsquo;ll always help you with manufacturing
          issues, transit damage, or genuine errors on our end.
        </p>
      ),
    },
    {
      id: 'damaged',
      title: 'Damaged in transit',
      body: (
        <p>
          If your order arrives damaged, send a photo within 7 days of delivery. We&rsquo;ll
          repress and reship at no cost, and you won&rsquo;t need to return the damaged piece.
        </p>
      ),
    },
    {
      id: 'process',
      title: 'How to start a return',
      body: (
        <p>
          Email <a href="mailto:hello@plynth.studio">hello@plynth.studio</a> with your order
          number and a short note. Most cases are resolved within two business days.
        </p>
      ),
    },
  ],
};

export const TERMS: PolicyData = {
  title: 'Terms & Conditions',
  lastUpdated: '12 May 2026',
  intro:
    'By using plynth.studio you agree to the terms below. They’re written in plain language; if anything is unclear, ask us.',
  sections: [
    {
      id: 'accept',
      title: 'Acceptance',
      body: (
        <p>
          By placing an order or creating an account, you confirm you&rsquo;re at least 18 and
          accept these terms.
        </p>
      ),
    },
    {
      id: 'orders',
      title: 'Orders & pricing',
      body: (
        <p>
          Prices are listed in AUD and include GST. We reserve the right to refuse or cancel an
          order if a product is mispriced, out of stock, or the customisation violates these
          terms (e.g. hate speech, copyrighted artwork without rights).
        </p>
      ),
    },
    {
      id: 'ip',
      title: 'Intellectual property',
      body: (
        <p>
          You retain rights to anything you upload (photos, messages). You grant Plynth a limited
          licence to use those uploads solely to produce your order. Audio rights are licensed via
          APRA AMCOS per gift; we do not sell audio.
        </p>
      ),
    },
    {
      id: 'liability',
      title: 'Liability',
      body: (
        <p>
          Plynth&rsquo;s liability is limited to the amount paid for the order in question.
          Nothing here limits rights under the Australian Consumer Law.
        </p>
      ),
    },
  ],
};

export const SHIPPING: PolicyData = {
  title: 'Shipping Policy',
  lastUpdated: '12 May 2026',
  intro:
    'We press to order in Melbourne and dispatch within 5–7 business days. Most Australian orders arrive within two weeks of placing them.',
  sections: [
    {
      id: 'aus',
      title: 'Australia',
      body: (
        <ul>
          <li>
            <strong>Standard.</strong> Free over $99 AUD. Otherwise $9 AUD flat. 3–7 business days.
          </li>
          <li>
            <strong>Express.</strong> $14 AUD. 1–3 business days after dispatch.
          </li>
        </ul>
      ),
    },
    {
      id: 'intl',
      title: 'International',
      body: (
        <p>
          We ship to most countries via DHL. Rates from $14 AUD; delivery 5–12 business days.
          Customs and import duties (where applicable) are the recipient&rsquo;s responsibility.
        </p>
      ),
    },
    {
      id: 'tracking',
      title: 'Tracking',
      body: (
        <p>
          You&rsquo;ll get a tracking link when your order dispatches. If a parcel goes quiet for
          more than 10 days, write to us and we&rsquo;ll chase it.
        </p>
      ),
    },
  ],
};

export const POLICY_MAP: Record<string, PolicyData> = {
  privacy: PRIVACY,
  refunds: REFUNDS,
  terms: TERMS,
  shipping: SHIPPING,
};
