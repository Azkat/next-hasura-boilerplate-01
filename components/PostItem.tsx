import React from 'react'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'

const PostItem = (props) => {
  const cookie = new Cookies()

  return (
    <p className="font-bold my-3" key={props.post.id}>
      <Link href={'/post/' + props.post.id}>{props.post.title}</Link> /
      <Link href={'/user/' + props.post.user.id}>{props.post.user.name}</Link>
      <LikeButton post={props.post} currentUser={props.currentUser} />
    </p>
  )
}

export default PostItem
