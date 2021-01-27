import { addComment, likePicture, updateLikesOfUser } from '../firebase/utils'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { format } from 'date-fns'
import { useAuth } from '../hooks'

const Post = ({ user, id, post, detailPage = false, myLikes, setMyLikes }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(
    detailPage ? null : myLikes.filter((like) => like === id) !== -1
  )

  const { user: currentUser } = useAuth()

  useEffect(() => {
    setComments(post.comments instanceof Array ? JSON.parse(post.comments) : [])
  }, [post])

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handlePost = async () => {
    const newComments = [
      ...comments,
      { user: { id: user.uid, name: currentUser.name }, text: comment },
    ]
    await addComment(id, newComments)
    setComments(newComments)
  }

  let postDate = format(new Date(post.dateTime.seconds * 1000), 'MMMM dd, yyyy')

  // Add deze ID aan user liked firestore

  const handleLike = async () => {
    if (detailPage) return
    if (!liked) {
      const like = await likePicture(id, post.likes + 1)
      const userLiked = await updateLikesOfUser(currentUser.id, [...myLikes, id])
      if (like === 'success' && userLiked === 'success') {
        post.likes++
        setLiked(true)
        setMyLikes([...myLikes, id])
      }
    } else {
      const like = await likePicture(id, post.likes - 1)
      const userLiked = await updateLikesOfUser(
        currentUser.id,
        myLikes.filter((item) => item !== id)
      )
      if (like === 'success' && userLiked === 'success') {
        post.likes--
        setLiked(false)
        setMyLikes(myLikes.filter((item) => item !== id))
      }
    }
  }

  return (
    <article className="flex flex-col w-full bg-white border border-gray-200 rounded-sm">
      <header className="flex justify-between items-center space-x-3 p-4">
        <Link href={`/user/${user.uid}`}>
          <div
            className="cursor-pointer font-bold text-white text-sm rounded-full bg-gray-600 flex items-center justify-center font-mono"
            style={{
              backgroundImage: `url(${user.profilePicture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '30px',
              width: '30px',
            }}
          >
            {!user.profilePicture && user.name && user.name.slice(0, 1)}
          </div>
        </Link>
        <div className="flex-grow">
          <Link href={`/user/${user.uid}`}>
            <div className="cursor-pointer text-sm font-medium">{user.name}</div>
          </Link>
          <div className="text-xs font-light">{post.location}</div>
        </div>

        <div>
          <img className="mx-auto h-4 w-auto" src="/static/icons/more.svg" alt="Options" />
        </div>
      </header>
      <div onClick={handleLike} className="cursor-pointer">
        <img
          className="w-full"
          src={post.downloadUrl ? post.downloadUrl : 'https://www.tibs.org.tw/images/default.jpg'}
        />
      </div>
      <div className="p-4 flex flex-col space-y-1">
        <div className="flex items-center space-x-3">
          <img
            onClick={handleLike}
            className="cursor-pointer h-6 w-auto"
            src={`/static/icons/${liked ? 'heart_red' : 'heart'}.svg`}
            alt="Like"
          />
          <div className="text-sm font-medium">{post.likes} likes</div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-sm">{post.comment}</div>
        </div>
        {detailPage ? showAllPosts(comments) : showFewPosts(3, id, comments)}
        <div className="text-xs font-light text-gray-400 uppercase">{postDate}</div>
      </div>
      <footer className="p-4 flex justify-between border border-gray-200 border-l-0 border-r-0 border-b-0">
        <input
          className="flex-grow outline-none"
          placeholder="Add a comment"
          value={comment}
          onChange={handleChange}
        />
        <button onClick={handlePost}>Post</button>
      </footer>
    </article>
  )
}

function showFewPosts(amount, id, comments) {
  return (
    <>
      {comments.length > 0 && (
        <Link href={`/details/${id}`}>
          <div className="cursor-pointer text-sm font-medium text-gray-400">
            View all {comments.length} comments
          </div>
        </Link>
      )}
      {comments &&
        comments.map(
          (comment, i) =>
            i < amount && (
              <div className="flex items-center space-x-1">
                <Link href={`/user/${comment.user.id}`}>
                  <div className="cursor-pointer text-sm font-medium">{comment.user.name}</div>
                </Link>
                <div className="text-sm">{comment.text}</div>
              </div>
            )
        )}
    </>
  )
}

function showAllPosts(comments) {
  return (
    comments &&
    comments.map((comment) => (
      <div className="flex items-center space-x-1">
        <Link href={`/user/${comment.user.id}`}>
          <div className="cursor-pointer text-sm font-medium">{comment.user.name}</div>
        </Link>
        <div className="text-sm">{comment.text}</div>
      </div>
    ))
  )
}

export default Post
