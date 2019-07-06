import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/profile/action';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop" />
        Browse and connect with developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
        ) : (
          <h4> No profiles found ... </h4>
        )}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    profile: state.profile,
  }),
  { getProfiles },
)(Profiles);
