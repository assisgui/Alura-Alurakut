import { useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations';

export default function Home() {
  const usuarioAleatorio = 'assisgui';
  const pessoasFavoritas = [
    'BarbiieCode',
    'WilliamYizima',
    'giopecora',
    'luizsandoval',
    'lukasfialho',
    'EmersonCDias',
  ];

  const [communities, setCommunities] = useState([{
    id: '12802378123789378912789789123896123',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  }]);

  const handleCreatingCommunity = (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);

    const newCommunity = {
      id: new Date().toISOString(),
      title: dataForm.get('title'),
      image: dataForm.get('image'),
    };

    setCommunities([...communities, newCommunity]);
  };

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades (
              {communities.length}
              )
            </h2>

            <ul>
              {communities.map((itemAtual) => (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image} alt={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas Favoritas (
              {pessoasFavoritas.length}
              )
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} alt={`${itemAtual}`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
