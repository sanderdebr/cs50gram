import React, { useState } from 'react'

import Link from 'next/link'
import { LoginData } from '../interfaces'
import { auth } from '../firebase/firebase'
import { useForm } from '../hooks'
import { useRouter } from 'next/router'

const SignIn: React.FC = () => {
  const initialValues = {
    email: '',
    password: '',
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, valid } = useForm({
    initialValues,
  })

  const [firebaseError, setFirebaseError] = useState(null)

  const router = useRouter()

  // Authenticate user
  const signIn = async ({ email, password }: LoginData) => {
    try {
      const userAuth = await auth.signInWithEmailAndPassword(email, password)
      return userAuth
    } catch (error) {
      throw error
    }
  }

  // Callback for handleSubmit
  const onSubmit = async (data: LoginData) => {
    try {
      const user = await signIn(data)
      router.push('/posts')
    } catch (error) {
      setFirebaseError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src="./images/logo.svg" alt="Logo" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">CS50Gram</h2>
        </div>
        <form className="mt-6 space-y-6" action="#" method="POST">
          <div>
            <input type="hidden" name="remember" value="true" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="john.doe@company.com"
              autoComplete="email"
              className="block w-full p-3 mt-4 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner rounded-md "
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
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner rounded-md  "
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="text-sm text-red-600 my-2">
              {errors.password && touched.password && errors.password}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <div className="text-sm text-red-600 mb-4">{firebaseError && firebaseError}</div>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={!valid}
              className="disabled:opacity-50 shadow group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              Sign in
            </button>
            <div className="text-center text-sm my-4">Or continue with</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex-grow p-3 text-center bg-white shadow-md  rounded-md hover:bg-gray-300 cursor-pointer">
                Google
              </div>
              <div className="flex-grow p-3 text-center bg-white shadow-md  rounded-md hover:bg-gray-300 cursor-pointer">
                Facebook
              </div>
              <div className="flex-grow p-3 text-center bg-white shadow-md  rounded-md hover:bg-gray-300 cursor-pointer">
                Github
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              No account?{' '}
              <Link href="/signup">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Click here to sign up
                </a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
