import Box from '../Box';

export default function ProfileSidebar(props) {
  console.log(props);
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}
