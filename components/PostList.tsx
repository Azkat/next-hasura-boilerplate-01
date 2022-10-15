import React, { useState, useEffect, useContext } from 'react'
import { Store } from '../reducer/reducer'
import Cookies from 'universal-cookie'
import PostItem from './PostItem'

const PostList = (props) => {
  const cookie = new Cookies()
  const { state, dispatch } = useContext(Store)
  const [currentViewCount, setCurrenViewCount] = useState(
    state.listViewLoadCount
  )

  useEffect(() => {
    if (state.listViewLoadCount > currentViewCount) {
      const newElement = document.createElement('p') // p要素作成
      const newContent = document.createTextNode('グララララ') // テキストノードを作成
      newElement.appendChild(newContent)

      const postList = document.getElementById('innerPostList')
      postList.appendChild(newElement)
    }
  }, [state.listViewLoadCount])

  return (
    <div id="innerPostList">
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
