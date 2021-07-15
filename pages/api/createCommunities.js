import { SiteClient } from 'datocms-client';

export default async function createCommunity(request, response) {
  const client = new SiteClient('d95ba8e72b05de9eaf63dfe428f0f8');

  if (request.method === 'POST') {
    const result = await client.items.create({
      itemType: '968040',
      ...request.body,
    });

    response.json({
      id: result.id + new Date().toISOString(),
      title: result.title,
      image: result.imageUrl,
      url: `/users/${result.title}`,
    });
  }
}
