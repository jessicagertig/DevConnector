import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getGitHubRepos } from '../../profile'

const ProfileGithub = ({ username, getGitHubRepos, repos }) => {
  return (
    <div>
      
    </div>
  )
}

ProfileGithub.propTypes = {
  getGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub)
