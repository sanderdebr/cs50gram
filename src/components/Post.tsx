const Post = () => {
  return (
    <article className="flex flex-col w-full bg-white border border-gray-200 rounded-sm">
      <header className="flex justify-between items-center space-x-3 p-4">
        <img
          className="h-9 rounded-full border border-gray-100 shadow-sm"
          src="https://i.pinimg.com/originals/de/64/80/de64801f0275c1ab2ea5a9e2bb3ce7bc.jpg"
        />
        <div className="flex-grow">
          <div className="text-sm font-medium">tomoosterdijk</div>
          <div className="text-xs font-light">Haarlem</div>
        </div>
        <div>
          <img className="mx-auto h-4 w-auto" src="./icons/more.svg" alt="Options" />
        </div>
      </header>
      <div className="">
        <img
          className=""
          src="https://e3.365dm.com/20/06/768x432/skynews-sky-weather-cloud-sun_5004939.jpg?20200603122525"
        />
      </div>
      <div className="p-4 flex flex-col space-y-1">
        <div className="flex items-center space-x-3">
          <img className="h-6 w-auto" src="./icons/heart.svg" alt="Like" />
          <div className="text-sm font-medium">1.297 likes</div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-sm font-medium">tomoosterdijk</div>
          <div className="text-sm">
            Awesome sky! <span className="text-blue-800">#clouds</span>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-400">View all 32 comments</div>
        <div className="flex items-center space-x-1">
          <div className="text-sm font-medium">peter</div>
          <div className="text-sm">Cool picture</div>
        </div>
        <div className="text-xs font-light text-gray-400 uppercase">Yesterday</div>
      </div>
      <footer className="p-4 flex justify-between border border-gray-200 border-l-0 border-r-0 border-b-0">
        <input className="flex-grow outline-none" placeholder="Add a comment" />
        <button>Post</button>
      </footer>
    </article>
  )
}

export default Post
