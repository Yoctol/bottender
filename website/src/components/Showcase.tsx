import React, { FC } from 'react';

type UserLinkProps = {
  caption: string;
  image: string;
  infoLink: string;
};

const UserLink: FC<UserLinkProps> = ({ infoLink, image, caption }) => (
  <a className="link" href={infoLink} key={infoLink}>
    <img src={image} alt={caption} title={caption} />
    <span className="caption">{caption}</span>
  </a>
);

type ShowcaseProps = {
  users: { infoLink: string; image: string; caption: string }[];
};

const Showcase: FC<ShowcaseProps> = ({ users }) => (
  <div className="showcase">
    {users.map((user) => (
      <UserLink
        key={user.infoLink}
        infoLink={user.infoLink}
        image={user.image}
        caption={user.caption}
      />
    ))}
  </div>
);

export default Showcase;
