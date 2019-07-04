import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Momnent from 'react-moment';

const ProfileExperience = ({
  experience: {
 company, title, to, from, description,
},
}) => {
  return (
    <Fragment>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Momnent format="YYYY/MM/DD">
          {' '}
          {from}
        </Momnent>
        {' '}
-
        {' '}
        {!to ? (
          'Now'
        ) : (
          <Momnent format="YYYY/MM/DD">
            {' '}
            {to}
          </Momnent>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {' '}
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {' '}
        {description}
      </p>
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
