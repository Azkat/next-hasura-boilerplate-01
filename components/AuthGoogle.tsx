import { useFirebaseAuth } from '../hooks/useFirebaseAuth'

export const AuthGoogle = () => {
  const { googleLogin } = useFirebaseAuth()
  return (
    <>
      <button onClick={googleLogin}>Login with Google</button>
    </>
  )
}
