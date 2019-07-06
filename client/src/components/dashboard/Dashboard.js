import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InlineConfirmButton from 'react-inline-confirm';
import { getCurrentProfile, deleteAccount } from '../../redux/profile/action';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const textValues = ['Delete Account', 'Are you sure?', 'Deleting...'];

const Dashboard = ({
 getCurrentProfile, deleteAccount, auth: { user }, profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  const handleDeleteAccount = () => {
    deleteAccount();
  };
  return (
    <Fragment>
      <h1 className="∏"> Dashboard </h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome
        {' '}
        {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <InlineConfirmButton
              className="btn btn-danger"
              textValues={textValues}
              isExecuting
              showTimer
              onClick={handleDeleteAccount}
            >
              <i className="fa fa-$ fa fa-trash" />
            </InlineConfirmButton>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    auth: state.auth,
    profile: state.profile,
  }),
  { getCurrentProfile, deleteAccount },
)(Dashboard);
