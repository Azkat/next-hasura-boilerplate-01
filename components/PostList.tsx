import React, { useEffect } from 'react'
import Cookies from 'universal-cookie'
import PostItem from './PostItem'

const PostList = (props) => {
  const cookie = new Cookies()

  return (
    <div>
      {props.postsData?.map((post, index) => (
        <PostItem
          post={post}
          currentUser={props.currentUser}
          index={index}
          key={props.id}
        />
      ))}
    </div>
  )
}

export default PostList
