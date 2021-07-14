import { useEffect, useState } from 'react';
import { SiteClient } from 'datocms-client';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';

export default function Home() {
  const user = 'assisgui';

  const client = new SiteClient('d95ba8e72b05de9eaf63dfe428f0f8');

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [communities, setCommunities] = useState([]);

  const handleCreatingCommunity = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);

    await client.items.create({
      itemType: '968040',
      title: dataForm.get('title'),
      imageUrl: dataForm.get('image'),
    });

    setCommunities([]);
  };

  useEffect(async () => {
    const result = await (await fetch(`http://api.github.com/users/${user}/followers`)).json();
    setFollowers(result.splice(0, 6).map((value) => ({
      id: value.id + value.login + new Date().toISOString(),
      title: value.login,
      image: value.avatar_url,
      url: value.html_url,
    })));
  }, []);

  useEffect(async () => {
    const result = await (await fetch(`http://api.github.com/users/${user}/following`)).json();
    setFollowing(result.splice(0, 6).map((value) => ({
      id: value.id + value.login + new Date().toISOString(),
      title: value.login,
      image: value.avatar_url,
      url: value.html_url,
    })));
  }, []);

  useEffect(async () => {
    const result = await client.items.all({
      filter: {
        type: 'community',
      },
    });

    setCommunities(result.splice(0, 6).map((value) => ({
      id: value.id + new Date().toISOString(),
      title: value.title,
      image: value.imageUrl,
      url: `/users/${value.title}`,
    })));
  }, [communities]);

  return (
    <>
      <AlurakutMenu githubUser={user} />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={handleCreatingCommunity}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type="text" />
              </div>

              <div>
                <input placeholder="Coloque uma URL pra usarmos de capa" name="image" aria-label="Coloque uma URL pra usarmos de capa" type="text" />
              </div>

              <button type="submit">
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={followers} />

          <ProfileRelationsBox title="Seguindo" items={following} />

          <ProfileRelationsBox title="Comunidades" items={communities} />
        </div>
      </MainGrid>
    </>
  );
}
