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

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<User>('user_by_id')
  const status = 'success'
  const [postImageSrc, setPostImageSrc] = useState(
    `https://vmedia.droptune.net/post_image/`
  )
  const [hasImage, setHasImage] = useState(true)

  return (
    <Layout title={data.name}>
      <>
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
                  <div className="w-full p-1 md:p-2  aspect-square cursor-pointer relative">
                    <Link href={`/post/${post.id}`} className="w-full">
                      <Image
                        src={postImageSrc + post.id + '.jpg'}
                        className="block object-cover object-center w-full h-full relative"
                        layout="fill"
                        objectFit="contain"
                        alt=""
                      />
                    </Link>
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
