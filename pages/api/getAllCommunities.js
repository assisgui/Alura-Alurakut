import { SiteClient } from 'datocms-client';

export default async function getAllCommunities(request, response) {
  const client = new SiteClient('d95ba8e72b05de9eaf63dfe428f0f8');
  const result = await client.items.all({
    filter: {
      type: 'community',
    },
  });

  /* fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: 'd95ba8e72b05de9eaf63dfe428f0f8',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      const resultApi = result.data.allCommunities;

      setCommunities(resultApi.splice(0, 6).map((value) => ({
        id: value.id + new Date().toISOString(),
        title: value.title,
        image: value.imageUrl,
        url: `/users/${value.title}`,
      })));
    }); */

  response.json(result.splice(0, 6).map((value) => ({
    id: value.id + new Date().toISOString(),
    title: value.title,
    image: value.imageUrl,
    url: `/users/${value.title}`,
  })));
}
