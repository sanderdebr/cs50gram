import { getPostFromFirestore, getUserAdditionalData } from '../../firebase/utils'

import Post from '../../components/Post'
import PrivateRoute from '../_private'

const Details = ({ id, post, user }) => {
  console.log(post)
  return (
    <PrivateRoute>
      <main className="container pt-20 space-y-6 py-6 max-w-xl mx-auto h-full">
        <Post id={id} user={user} post={post} myLikes={null} setMyLikes={null} detailPage />
      </main>
    </PrivateRoute>
  )
}

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id

  // Get post
  const post = await getPostFromFirestore(id)
  const parsedPost = post !== 'No post found' ? JSON.parse(post) : null

  // Get user
  const user =
    parsedPost !== null ? await getUserAdditionalData(parsedPost.userId) : 'No user found'
  const parsedUser = user !== 'No user found' ? JSON.parse(user) : null

  return { props: { id, post: parsedPost, user: parsedUser } }
}

export default Details
