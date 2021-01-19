import Link from 'next/link'

const NewPost = ({ handleShare, comment, handleComment }) => (
  <article className="flex flex-col w-full bg-white border border-gray-200 rounded-sm">
    <header className="flex justify-between items-center space-x-3 p-4">
      <Link href="/posts">
        <img className="cursor-pointer h-3 w-auto" src="./icons/close.svg" alt="close" />
      </Link>
      <h2 className="text-lg font-medium">New post</h2>
      <button onClick={handleShare} className="font-medium text-blue-600">
        Share
      </button>
    </header>
    <div className="flex items-start p-4 space-x-4">
      <img
        className="h-9 rounded-full border border-gray-100 shadow-sm"
        src="https://i.pinimg.com/originals/de/64/80/de64801f0275c1ab2ea5a9e2bb3ce7bc.jpg"
      />
      <textarea onChange={handleComment} className="flex-grow" placeholder="Add a comment">
        {comment}
      </textarea>
      <div className="w-auto h-12">
        <img
          className="w-auto h-full rounded"
          src="https://e3.365dm.com/20/06/768x432/skynews-sky-weather-cloud-sun_5004939.jpg?20200603122525"
        />
      </div>
    </div>
    <footer className="p-4">
      <button className="flex justify-center py-2 px-4 border border-gray-200 text-sm font-medium rounded-sm">
        Add location
      </button>
    </footer>
  </article>
)

export default NewPost
