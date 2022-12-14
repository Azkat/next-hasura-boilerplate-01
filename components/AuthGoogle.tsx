import { useFirebaseAuth } from '../hooks/useFirebaseAuth'

export const AuthGoogle = () => {
  const { googleLogin } = useFirebaseAuth()
  return (
    <div className="mt-4 flex justify-center items-center flex-col">
      <>
        <div
          className="btn btn-wide px-4 py-1 mt-6 cursor-pointer outline"
          onClick={googleLogin}
        >
          <span>Login with Google</span>
        </div>
      </>
    </div>
  )
}
