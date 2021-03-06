import React, { useState } from 'react'

import { IFormProps } from '../interfaces'
import Link from 'next/link'
import Logo from '../components/Logo'
import { auth } from '../firebase/firebase'
import { createUser } from '../firebase/utils'
import { useForm } from '../hooks'
import { useRouter } from 'next/router'

const SignUp: React.FC = () => {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched, valid } = useForm({
    name: '',
    email: '',
    password: '',
  })

  const router = useRouter()

  const [firebaseError, setFirebaseError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Authenticate user
  const signUp = async ({ name, email, password }: IFormProps) => {
    try {
      const userAuth = await auth.createUserWithEmailAndPassword(email, password)
      console.log('User added to Firebase authentication')
      const newUser = await createUser({
        uid: userAuth.user.uid,
        name,
        email,
        profilePicture: null,
        following: null,
        liked: null,
      })

      if (newUser === 'success') {
        console.log('User added to FireStore')
      } else {
        throw newUser
      }

      return userAuth
    } catch (error) {
      throw error
    }
  }

  // Callback for handleSubmit
  const onSubmit = async (data: IFormProps) => {
    setLoading(true)
    try {
      await signUp(data)
      router.push('/posts')
    } catch (error) {
      setFirebaseError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-lg">
        <Logo large />
        <form className="mt-6 space-y-6" action="#" method="POST">
          <div>
            <input
              id="name"
              type="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner rounded-sm "
              required
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="text-sm text-red-600 my-2">
              {errors.email && touched.email && errors.email}
            </div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner rounded-sm "
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="text-sm text-red-600 my-2">
              {errors.email && touched.email && errors.email}
            </div>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              autoComplete="new-password"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner rounded-sm  "
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="text-sm text-red-600 my-2">
              {errors.password && touched.password && errors.password}
            </div>
          </div>

          <div>
            <div className="text-sm text-red-600 mb-4">{firebaseError && firebaseError}</div>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={!valid}
              className="disabled:opacity-50 shadow group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: lock-closed --> */}
                <svg
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {loading ? 'Loading...' : 'Sign up'}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Got an account already?{' '}
              <Link href="/signin">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Click here to sign in
                </a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
