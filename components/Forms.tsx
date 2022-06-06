import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  firstName: String
  lastName: string
  age: number
}

export const Forms = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  console.log('watch:', watch('firstName'))

  const lastNameRules = {
    required: '入力してください',
    minLength: { value: 3, message: `3文字以上で入力してください。` },
    maxLength: { value: 10, message: `10文字以内で入力してください。` },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: '半角英数字で入力してください。',
    },
  }

  return (
    <div className="mb-32 mt-20">
      TRY REACT-HOOK-FORM
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            firstName
            <input
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              {...register('firstName', { required: true, maxLength: 20 })}
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            lastName
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              {...register('lastName', lastNameRules)}
            />
            <div className="text-red-500">
              {errors.lastName && errors.lastName.message}
            </div>
          </label>
        </div>
        <label>
          age
          <input
            className="block my-3 px-3 py-1 border border-gray-300"
            type="number"
            {...register('age', { min: 18, max: 99 })}
          />
        </label>
        <input
          className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
          type="submit"
        />
      </form>
    </div>
  )
}
