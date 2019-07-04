import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/post/action';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ posts, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      <h1 className="large text-primary"> Posts </h1>
      <p className="lead">
        <i className="fas fa-user"> Welecome to comunity</i>
      </p>
      <PostForm />
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    posts: state.post.posts,
  }),
  { getPosts },
)(Posts);
