import type { ITunesTrack } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();
  if (!query) {
    return Response.json([] satisfies ITunesTrack[]);
  }

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=8&country=AU`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    return new Response('iTunes upstream error', { status: 502 });
  }
  const data = (await res.json()) as { results: ITunesTrack[] };
  return Response.json(data.results ?? []);
}
