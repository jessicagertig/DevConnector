import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'

const Profile = ({ getProfileById, auth, profile: { profile, loading }, match }) => {

  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById])

  return (
  <Fragment>
    {profile === null || loading ? <Spinner /> : <Fragment></Fragment>}
  </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);
