const getPostsList = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await window.fetch(
      `https://jsonplaceholder.typicode.com/photos`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    const limit10 = data.slice(0, 10);
    return limit10;
  } catch (err) {
    console.log('Error getting documents', err);
  }

  return null;
};

const Home = {
  render: async () => {
    const posts = await getPostsList();
    const view = `
           <section class="section">
               <h1> Home </h1>
               <ul>
                   ${posts
                     .map(
                       (post) =>
                         `<li><a href="#/p/${post.id}">${post.title}</a></li>`
                     )
                     .join('\n ')}
               </ul>
           </section>
       `;
    return view;
  },
  after_render: async () => {},
};

export default Home;
