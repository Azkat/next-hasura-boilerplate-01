import React from 'react'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'

const PostItem = (props) => {
  const cookie = new Cookies()

  console.log(props.post)

  return (
    <div className="bg-backgroundGray mb-4">
      <p className="font-bold my-3" key={props.post.id}>
        <div className="flex items-center p-4 pt-3 sm:items-start">
          <Link href={'/user/' + props.post.user.id}>
            <img
              className="w-8 h-8 mr-2 rounded-full sm:w-8 sm:h-8"
              src="https://placeimg.com/192/192/people"
              alt=""
            />
          </Link>
          <div className="font-light dark:text-white">
            <Link href={'/user/' + props.post.user.id}>
              {props.post.user.name}
            </Link>
          </div>
          <div className="ml-auto">
            <Link href="/account/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="bg-cover w-full relative h-vw bg-[url('https://vmedia.droptune.net/post_image/canvasImage.jpg')]">
          <div className="playbutton absolute">
            <LikeButton post={props.post} currentUser={props.currentUser} />
          </div>
          <div className="likebutton absolute">
            <LikeButton post={props.post} currentUser={props.currentUser} />
          </div>
        </div>
        <div className="p-4 pt-3">
          <Link href={'/post/' + props.post.id}>{props.post.title}</Link>
        </div>
      </p>
      <style jsx>{`
        .h-vw {
          height: 100vw;
        }
        .likebutton {
          bottom: 24px;
          right: 24px;
        }
        .playbutton {
          bottom: 24px;
          left: 24px;
        }
      `}</style>
    </div>
  )
}

export default PostItem
