import PropTypes from 'prop-types';
import React from 'react';

const UserLink = ({ infoLink, image, caption }) => (
  <a className="link" href={infoLink} key={infoLink}>
    <img src={image} alt={caption} title={caption} />
    <span className="caption">{caption}</span>
  </a>
);

UserLink.propTypes = {
  caption: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  infoLink: PropTypes.string.isRequired,
};

const Showcase = ({ users }) => (
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

Showcase.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      infoLink: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Showcase;
