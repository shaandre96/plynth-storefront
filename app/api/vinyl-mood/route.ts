import Anthropic from '@anthropic-ai/sdk';
import type { AiSuggestion } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Body = {
  trackName: string;
  artistName: string;
  collectionName: string;
};

const FALLBACK: AiSuggestion = {
  palette: ['#C8873A', '#2C2416', '#F5F0E8'],
  style: 'minimalist',
  tagline: 'A song held still on warm parchment.',
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Body>;
  const { trackName, artistName, collectionName } = body;

  // Always respond with valid JSON — a missing field just yields the fallback,
  // so the client never has to parse an empty/non-JSON error body.
  if (!trackName || !artistName || !process.env.ANTHROPIC_API_KEY) {
    return Response.json(FALLBACK);
  }

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `You are a vinyl record designer. Based on this song, suggest a design for a personalised vinyl record gift.

Song: "${trackName}" by ${artistName} from the album "${collectionName ?? 'Unknown'}"

Respond in JSON only:
{
  "palette": ["#hex1", "#hex2", "#hex3"],
  "style": "one of: minimalist | retro | bold | dreamy | raw",
  "tagline": "a short poetic phrase (max 8 words) inspired by this song's feeling"
}`,
        },
      ],
    });

    const text = message.content[0]?.type === 'text' ? message.content[0].text : '{}';
    const parsed = JSON.parse(text) as AiSuggestion;
    return Response.json(parsed);
  } catch {
    // Network error, bad key, model error, or unparseable output — fall back.
    return Response.json(FALLBACK);
  }
}
