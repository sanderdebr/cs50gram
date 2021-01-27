import { getPostsOfUser, getUserAdditionalData, updateFollowing } from '../../firebase/utils'
import { useEffect, useState } from 'react'

import Post from '../../components/Post'
import PrivateRoute from '../_private'
import ProfilePost from '../../components/ProfilePost'
import { useAuth } from '../../hooks'

const User = ({ posts, user }) => {
  const { user: currentUser, setUser } = useAuth()

  const [currentFollowing, setCurrentFollowing] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setCurrentFollowing(currentUser.following instanceof Array ? currentUser.following : [])
    }
  }, [currentUser])

  useEffect(() => {
    if (currentFollowing) {
      setIsFollowing(currentFollowing.indexOf(user.uid) !== -1)
    }
  }, [currentFollowing])

  const handleFollow = async () => {
    const newFollowing = currentFollowing
    newFollowing.push(user.uid)
    await updateFollowing(currentUser.uid, newFollowing)
    setCurrentFollowing(newFollowing)
    setIsFollowing(true)
    setUser({ ...user, following: newFollowing })
  }

  const handleUnfollow = async () => {
    const newFollowing = currentFollowing.filter((item) => item !== user.uid)
    await updateFollowing(currentUser.uid, newFollowing)
    setCurrentFollowing(newFollowing)
    setUser({ ...user, following: newFollowing })
  }

  return (
    <PrivateRoute>
      <main className="container pt-20 space-y-6 py-6 max-w-2xl mx-auto h-full">
        <section className="bg-gray-100 bg-opacity-25">
          <header className="flex flex-wrap items-center">
            <div className="">
              <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                   border-2 border-pink-600 p-1"
                src={
                  user.profilePicture || 'https://britz.mcmaster.ca/images/nouserimage.gif/image'
                }
                alt="profile"
              />
            </div>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  {user.name}
                </h2>

                <span
                  className="inline-block fas fa-certificate fa-lg text-blue-500 
                             relative mr-6 text-xl transform -translate-y-2"
                  aria-hidden="true"
                >
                  <i
                    className="fas fa-check text-white text-xs absolute inset-x-0
                             ml-1 mt-px"
                  ></i>
                </span>

                {isFollowing ? (
                  <div
                    onClick={handleUnfollow}
                    className="cursor-pointer bg-white-500 px-2 py-1 
                      text-blue-500 font-semibold text-sm rounded block text-center 
                      sm:inline-block block border border-blue-500"
                  >
                    Unfollow
                  </div>
                ) : (
                  <div
                    onClick={handleFollow}
                    className="cursor-pointer bg-blue-500 px-2 py-1 
                      text-white font-semibold text-sm rounded block text-center 
                      sm:inline-block block"
                  >
                    Follow
                  </div>
                )}
              </div>
            </div>
          </header>
        </section>
        <section className="grid md:grid-cols-3 gap-6">
          {posts.length < 1
            ? NoPosts()
            : posts.map((post, i) => <ProfilePost post={post} key={i} />)}
        </section>
      </main>
    </PrivateRoute>
  )
}

function NoPosts() {
  return 'This user has no posts'
}

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id

  // Get post
  const user = await getUserAdditionalData(id)
  const posts = await getPostsOfUser(id)

  return { props: { user: JSON.parse(user), posts } }
}

export default User
