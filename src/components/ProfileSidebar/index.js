import Box from '../Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

export default function ProfileSidebar(props) {
  const { githubUser } = props;

  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
        alt="githubUser"
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @
          {githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}
