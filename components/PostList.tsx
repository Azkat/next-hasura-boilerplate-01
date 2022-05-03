import React from 'react'
import Cookies from 'universal-cookie'
import PostItem from './PostItem'

const PostList = (props) => {
  const cookie = new Cookies()

  return (
    <div>
      {props.postsData?.map((post) => (
        <PostItem post={post} currentUser={props.currentUser} key={post.id} />
      ))}
    </div>
  )
}

export default PostList
