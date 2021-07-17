import { useEffect, useState } from 'react';
import nookies from 'nookies';
import { decode } from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';

export default function Home({ githubUser }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [communities, setCommunities] = useState([]);

  const handleCreatingCommunity = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);

    const result = await (await fetch('/api/createCommunities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: dataForm.get('title'),
        imageUrl: dataForm.get('image'),
        creatorSlug: githubUser,
      }),
    })).json();

    setCommunities([...communities, result]);
  };

  useEffect(async () => {
    const result = await (await fetch(`http://api.github.com/users/${githubUser}/followers`)).json();
    setFollowers(result.splice(0, 6).map((value) => ({
      id: value.id + value.login + new Date().toISOString(),
      title: value.login,
      image: value.avatar_url,
      url: value.html_url,
    })));
  }, []);

  useEffect(async () => {
    const result = await (await fetch(`http://api.github.com/users/${githubUser}/following`)).json();
    setFollowing(result.splice(0, 6).map((value) => ({
      id: value.id + value.login + new Date().toISOString(),
      title: value.login,
      image: value.avatar_url,
      url: value.html_url,
    })));
  }, []);

  useEffect(async () => {
    const result = await (await fetch('/api/getAllCommunities', {
      method: 'GET',
    })).json();

    setCommunities(result);
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
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

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;

  const { isAuthenticated } = (await (await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token,
    },
  })).json());
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { githubUser } = decode(token);
  return {
    props: {
      githubUser,
    },
  };
}
