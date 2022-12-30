import React, { useEffect, Component, useState } from 'react'
import { Layout } from '../../components/Layout'
import { fetchUserById, fetchUsers } from '../../hooks/useQueryUsers'
import { QueryClient, useQueryClient } from 'react-query'
import { User } from '../../types/types'
import Link from 'next/link'
import { dehydrate } from 'react-query/hydration'
import AvatarName from '../../components/AvatarName'
import UserInfomation from '../../components/UserInfomation'
import { PlusSmIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import ModalBase from '../../components/ModalBase'
import { useRouter } from 'next/router'
import PlayButton from '../../components/PlayButton'
import { useUserAgent } from 'next-useragent'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<User>('user_by_id')
  const status = 'success'
  const [postImageSrc, setPostImageSrc] = useState(
    `https://vmedia.droptune.net/post_image/`
  )
  const [hasImage, setHasImage] = useState(true)
  const router = useRouter()
  const ua = useUserAgent(window.navigator.userAgent)
  const [isHovering, setIsHovered] = useState(false)
  const [hoveredId, setHoveredId] = useState('')

  const onMouseEnter = (id) => {
    setHoveredId(id)
    setIsHovered(true)
  }
  const onMouseLeave = (id) => {
    setHoveredId('')
    setIsHovered(false)
  }

  return (
    <Layout title={data.name}>
      <>
        <ModalBase aspath={router.asPath} />
        <AvatarName data={data} status={status} />
        <div className="block sm:hidden">
          <UserInfomation data={data} status={status} />
        </div>

        {/* <PostList postsData={postsData} currentUser={currentUser} /> */}

        <section className="overflow-hidden mt-10 ">
          <div className="container px-4 py-2 mx-auto ">
            <div className="flex flex-wrap -m-1 md:-m-2">
              {data.posts?.map((post) => (
                <div className="flex flex-wrap w-1/3" key={post.id}>
                  <div
                    className="w-full p-1 md:p-2  aspect-square cursor-pointer relative "
                    onMouseEnter={() => onMouseEnter(post.id)}
                    onMouseLeave={onMouseLeave}
                  >
                    <Link
                      key={post.id}
                      href={`/user/${data.id}?postId=${post.id}`}
                      as={`/user/${data.id}?postId=${post.id}`}
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
                    {ua.isMobile ? (
                      <div className="absolute h-10 w-10 bottom-2 left-2 sm:bottom-3 sm:left-3">
                        <PlayButton post={post} user={data} control={false} />
                      </div>
                    ) : (
                      <div className="absolute h-10 w-10 bottom-2 left-2 sm:bottom-3 sm:left-3 ">
                        {isHovering && hoveredId == post.id ? (
                          <PlayButton post={post} user={data} control={false} />
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
      </>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const user_id = await context.params.slug
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('user_by_id', () => fetchUserById(user_id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
