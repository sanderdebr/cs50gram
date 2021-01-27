import Link from 'next/link'
import React from 'react'

const ProfilePost = ({ post }) => {
  console.log(post)
  return (
    <Link href={`/details/${post.id}`}>
      <article
        className="post cursor-pointer bg-gray-100 text-white relative pb-full"
        style={{ paddingBottom: '100%' }}
      >
        <img
          className="w-full h-full absolute left-0 top-0 object-cover"
          src={post.data.downloadUrl}
          alt="image"
        />

        <i className="fas fa-square absolute right-0 top-0 m-1"></i>
        <div
          className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                      left-0 top-0 hidden"
        >
          <div
            className="flex justify-center items-center 
                          space-x-4 h-full"
          >
            <span className="p-2">{post.data.likes} likes</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProfilePost
