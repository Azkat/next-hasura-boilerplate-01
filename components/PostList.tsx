import React, { useState, useEffect, useContext } from 'react'
import { Store } from '../reducer/reducer'
import Cookies from 'universal-cookie'
import PostItem from './PostItem'

const postItemMap = []

const PostList = (props) => {
  const cookie = new Cookies()
  const { state, dispatch } = useContext(Store)
  const [currentViewCount, setCurrenViewCount] = useState(
    state.listViewLoadCount
  )

  useEffect(() => {
    dispatch({ type: 'setListViewData', value: props.postsData })
    if (postItemMap.length == 0) {
      postItemMap.push(
        <PostItemMap postsData={props.postsData} listViewLoadCount={0} />
      )
    }
  }, [])

  useEffect(() => {
    if (state.listViewLoadCount > currentViewCount) {
      setCurrenViewCount(state.listViewLoadCount)
      postItemMap.push(
        <PostItemMap
          postsData={props.postsData}
          listViewLoadCount={state.listViewLoadCount}
        />
      )
    }
  }, [state.listViewLoadCount])

  return <div id="innerPostList">{postItemMap}</div>
}

const PostItemMap = (props) => {
  const data = props.postsData.slice(
    10 * props.listViewLoadCount,
    10 * props.listViewLoadCount + 10
  )
  return (
    <>
      {data?.map((post, index) => (
        <PostItem
          post={post}
          currentUser={props.currentUser}
          index={index}
          key={props.id}
        />
      ))}
    </>
  )
}

export default PostList
