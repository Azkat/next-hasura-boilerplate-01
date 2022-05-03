import { memo, useEffect } from 'react'
import { useQueryUserPosts } from '../hooks/useQueryUserPosts'
import Cookie from 'universal-cookie'
import { AccountPostItemMemo } from './AccountPostItem'

const cookie = new Cookie()

const AccountPostList = () => {
  const userId = cookie.get('user_id')
  const { status, data } = useQueryUserPosts(userId)
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <ul>
      {data?.map((post) => (
        <AccountPostItemMemo key={post.id} post={post} />
      ))}
    </ul>
  )
}
export const AccountPostListMemo = memo(AccountPostList)
