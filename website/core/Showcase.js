/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/no-extraneous-dependencies */
const React = require('react');
const PropTypes = require('prop-types');
/* eslint-enable import/no-extraneous-dependencies */

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
    {users.map(user => (
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

module.exports = Showcase;
