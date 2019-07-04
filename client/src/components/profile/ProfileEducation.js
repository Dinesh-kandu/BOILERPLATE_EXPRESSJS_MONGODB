import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Momnent from 'react-moment';

const ProfileEducation = ({
  education: {
    school,
    degree,
    fieldofstudy,
    to,
    from,
    description,
  },
}) => {
  return (
    <Fragment>
      <h3 className="text-dark">{school}</h3>
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
        <strong>Degree: </strong>
        {' '}
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {' '}
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {' '}
        {description}
      </p>
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
