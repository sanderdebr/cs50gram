import { getPostFromFirestore, getUserAdditionalData } from '../../firebase/utils'

import Post from '../../components/Post'
import PrivateRoute from '../_private'

const Details = ({ id, post, user }) => {
  return (
    <PrivateRoute>
      <main className="container pt-20 space-y-6 py-6 max-w-xl mx-auto h-full">
        <Post id={id} user={user} post={post} detailPage />
      </main>
    </PrivateRoute>
  )
}

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id

  // Get post
  const postJSON = await getPostFromFirestore(id)
  const post = JSON.parse(postJSON)

  // Get user
  const userData = await getUserAdditionalData(post.userId)
  const user = userData.data()

  return { props: { id, post, user } }
}

export default Details
