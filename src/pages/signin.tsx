import React, { useState } from 'react'
import { useAuth, useForm } from '../hooks'

import { IFormProps } from '../interfaces'
import Link from 'next/link'
import Logo from '../components/Logo'
import { auth } from '../firebase'

const SignIn: React.FC = () => {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched, valid } = useForm({
    email: '',
    password: '',
    exception: 'name',
  })

  const [firebaseError, setFirebaseError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { authErr, signInWith } = useAuth()

  // Authenticate user
  const signIn = async ({ email, password }: IFormProps) => {
    try {
      const userAuth = await auth.signInWithEmailAndPassword(email, password)
      return userAuth
    } catch (error) {
      throw error
    }
  }

  // Callback for handleSubmit
  const onSubmit = async (data: IFormProps) => {
    setLoading(true)
    try {
      const user = await signIn(data)
    } catch (error) {
      setFirebaseError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 shadow rounded">
        <Logo large />
        <form className="mt-6 space-y-6" action="#" method="POST">
          <div>
            <input type="hidden" name="remember" value="true" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="john.doe@company.com"
              autoComplete="email"
              className="block w-full p-3 mt-4 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner rounded hover:shadow-md"
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
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner rounded  shadow hover:shadow-md"
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
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded shadow"
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
              className="disabled:opacity-50 shadow group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded shadow text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-md"
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
              {loading ? 'Loading...' : 'Sign in'}
            </button>
            <div className="text-sm text-red-600 my-2">{authErr?.message && authErr.message}</div>
            <div className="text-center text-sm my-4">Or continue with</div>
            <div className="flex space-x-4">
              <div
                onClick={() => signInWith('google')}
                className="flex flex-grow p-3 text-center bg-white shadow  rounded hover:shadow-md cursor-pointer"
              >
                <img className="mx-auto h-6 w-auto" src="./icons/search.svg" alt="Google" />
                Google
              </div>
              <div
                onClick={() => signInWith('facebook')}
                className="flex flex-grow p-3 text-center bg-white shadow  rounded hover:shadow-md cursor-pointer"
              >
                <img className="mx-auto h-6 w-auto" src="./icons/facebook.svg" alt="Facebook" />
                Facebook
              </div>
              <div
                onClick={() => signInWith('github')}
                className="flex flex-grow p-3 text-center bg-white shadow  rounded hover:shadow-md cursor-pointer"
              >
                <img className="mx-auto h-6 w-auto" src="./icons/github.svg" alt="Github" />
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
