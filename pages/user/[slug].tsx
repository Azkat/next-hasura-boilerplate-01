import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { fetchUserById } from '../../hooks/useQueryUsers'
import { QueryClient, useQueryClient } from 'react-query'
import { User } from '../../types/types'
import Link from 'next/link'
import { dehydrate } from 'react-query/hydration'
import AvatarName from '../../components/AvatarName'
import UserInfomation from '../../components/UserInfomation'
import { PlusSmIcon } from '@heroicons/react/solid'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<User>('user_by_id')

  return (
    <Layout title={data.name}>
      <>
        <h1>{data.name}</h1>
        {data.posts?.map((post) => (
          <Link href={'/post/' + post.id} key={post.id}>
            {post.title}
          </Link>
        ))}

        <AvatarName />
        <div className="block sm:hidden">
          <UserInfomation />
        </div>

        {/* <PostList postsData={postsData} currentUser={currentUser} /> */}

        <section className="overflow-hidden mt-10 ">
          <div className="container px-4 py-2 mx-auto ">
            <div className="flex flex-wrap -m-1 md:-m-2">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2  aspect-square">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full"
                    src="https://random.imagecdn.app/400/400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2  aspect-square">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full"
                    src="https://random.imagecdn.app/400/400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2  aspect-square">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full"
                    src="https://random.imagecdn.app/400/400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2  aspect-square">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full"
                    src="https://random.imagecdn.app/400/400"
                  />
                </div>
              </div>
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
