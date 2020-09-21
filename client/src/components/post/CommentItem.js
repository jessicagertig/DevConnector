import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeComment } from '../../actions/post'
import Moment from 'react-moment'

const CommentItem = ({ 
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  removeComment 
  }) => {
  return (
  <div className="post bg-white p-1 my-1">  
    <div>
      <Link to={`/profile/${user}`} >
        <img
          className="round-img"
          src={avatar}
          alt="avatar"
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">
        {text}
      </p>
      <p className="post-date">
        Commented on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
    </div>
  </div>
  )
}

CommentItem.propTypes = {
  removeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { removeComment })(CommentItem)
