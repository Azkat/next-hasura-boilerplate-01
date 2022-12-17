import { useNavigate } from 'react-router-dom'

export const Modal = () => {
  const navigate = useNavigate()
  const handleClose = () => {
    navigate('/')
  }
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-10 pt-28">
      <div className="absolute top-28 left-1/2 inline-block max-h-full w-11/12 -translate-x-1/2 transform rounded-lg bg-white">
        <div className="relative p-6">
          <p className="mb-4">モーダル</p>
          <img
            src="https://images.unsplash.com/photo-1657266175529-1fd6a225d4a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTA3MjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTk3MDg4NDk&ixlib=rb-1.2.1&q=80&w=1080"
            alt=""
            className="h-52 w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={handleClose}
            className=" absolute top-4 right-4 rounded-lg bg-primary text-center font-semibold text-white shadow-md hover:bg-primary-dark"
          >
            <svg
              className="cursor-pointer h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
