import React from 'react'
import { useUpdateFirebaseEmail } from '../hooks/useUpdateFirebaseEmail'

export default function UpdateEmail() {
  const {
    uid,
    providerId,
    email,
    emailChange,
    updateEmail,
    password,
    passwordChange,
  } = useUpdateFirebaseEmail()

  return (
    <div className="mt-14 mb-8">
      <h3>Email</h3>
      <form onSubmit={updateEmail}>
        <label>Email: </label>
        <input
          type="text"
          className="my-3 px-3 py-1 border border-gray-300"
          value={email}
          onChange={emailChange}
        />
        <label>Password: </label>
        <input
          type="password"
          placeholder="current password"
          className="my-3 px-3 py-1 border border-gray-300"
          value={password}
          onChange={passwordChange}
        />
        <button
          disabled={!email}
          type="submit"
          className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
        >
          update
        </button>
      </form>
    </div>
  )
}
