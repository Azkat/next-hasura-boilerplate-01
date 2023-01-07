import React, { useEffect, Component, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ModalBase from '../components/ModalBase'
import { useRouter } from 'next/router'
import PlayButton from '../components/PlayButton'
import { useUserAgent } from 'next-useragent'

const UserPostList = (props) => {
  const ua = useUserAgent(window.navigator.userAgent)
  const [isHovering, setIsHovered] = useState(false)
  const [hoveredId, setHoveredId] = useState('')
  const [postImageSrc, setPostImageSrc] = useState(
    `https://vmedia.droptune.net/post_image/`
  )
  const router = useRouter()

  const onMouseEnter = (id) => {
    setHoveredId(id)
    setIsHovered(true)
  }
  const onMouseLeave = (id) => {
    setHoveredId('')
    setIsHovered(false)
  }

  console.log(props)

  return (
    <section className="overflow-hidden mt-2 ">
      <div className="container px-4 py-2 mx-auto ">
        <div className="flex flex-wrap -m-1 md:-m-2">
          {props.data.posts?.map((post) => (
            <div className="flex flex-wrap w-1/3" key={post.id}>
              <div
                className="w-full p-1 md:p-2  aspect-square cursor-pointer relative "
                onMouseEnter={() => onMouseEnter(post.id)}
                onMouseLeave={onMouseLeave}
              >
                {props.path == 'user' && (
                  <Link
                    key={post.id}
                    href={`/user/${props.data.id}?postId=${post.id}`}
                    as={`/user/${props.data.id}?postId=${post.id}`}
                    scroll={false}
                    className="w-full"
                  >
                    <Image
                      src={postImageSrc + post.id + '.jpg'}
                      className="block object-cover object-center w-full h-full relative"
                      layout="fill"
                      objectFit="contain"
                      alt=""
                    />
                  </Link>
                )}

                {props.path == 'account' && (
                  <Link
                    key={post.id}
                    href={`/account?postId=${post.id}`}
                    as={`/account?postId=${post.id}`}
                    scroll={false}
                    className="w-full"
                  >
                    <Image
                      src={postImageSrc + post.id + '.jpg'}
                      className="block object-cover object-center w-full h-full relative"
                      layout="fill"
                      objectFit="contain"
                      alt=""
                    />
                  </Link>
                )}

                {ua.isMobile ? (
                  <div className="absolute h-10 w-10 bottom-2 left-2 sm:bottom-3 sm:left-3">
                    <PlayButton post={post} user={props.data} control={false} />
                  </div>
                ) : (
                  <div className="absolute h-10 w-10 bottom-2 left-2 sm:bottom-3 sm:left-3 ">
                    {isHovering && hoveredId == post.id ? (
                      <PlayButton
                        post={post}
                        user={props.data}
                        control={false}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UserPostList
