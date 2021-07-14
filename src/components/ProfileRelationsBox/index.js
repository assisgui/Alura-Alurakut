import ProfileRelationsBoxWrapper from '../ProfileRelations';

export default function ProfileRelationsBox({ items, title }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title}

        (
        {items.length}
        )
      </h2>

      <ul>
        {items.map((value) => (
          <li key={value.id}>
            <a href={value.url} target="_blank" rel="noreferrer">
              <img src={value.image} alt={value.image} />
              <span>{value.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}
