import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import { getPost } from '../../redux/post/action';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      {post && (
        <Fragment>
          <PostItem post={post} showActions={false} />
          {' '}
          <CommentForm postId={post._id} />
          <div className="comments">
            {post.comments.map(comment => (
              <CommentItem
                key={comment._id}
                postId={post._id}
                comment={comment}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object,
};

export default connect(
  state => ({
    post: state.post.post,
  }),
  { getPost },
)(Post);
