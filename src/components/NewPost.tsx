import Link from 'next/link'

const NewPost = ({
  user,
  handleShare,
  comment,
  image,
  selectImage,
  location,
  handleLocation,
  handleComment,
}) => (
  <article className="flex flex-col w-full bg-white border border-gray-200 rounded-sm">
    <header className="flex justify-between items-center space-x-3 p-4">
      <Link href="/posts">
        <img className="cursor-pointer h-3 w-auto" src="/static/icons/close.svg" alt="close" />
      </Link>
      <h2 className="text-lg font-medium">New post</h2>
      <button onClick={handleShare} className="font-medium text-blue-600">
        Share
      </button>
    </header>
    <div className="flex items-start p-4 space-x-4">
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
      <textarea onChange={handleComment} className="flex-grow" placeholder="Add a comment">
        {comment}
      </textarea>
      <div className="w-auto h-12">
        <img
          className="cursor-pointer w-auto h-full rounded"
          onClick={selectImage}
          src={image ? image : 'https://www.tibs.org.tw/images/default.jpg'}
        />
      </div>
    </div>
    <footer className="p-4">
      <input
        type="text"
        placeholder="Add location"
        onChange={handleLocation}
        value={location}
        className="flex justify-center py-2 px-4 border border-gray-200 text-sm font-medium rounded-sm"
      />
    </footer>
  </article>
)

export default NewPost
