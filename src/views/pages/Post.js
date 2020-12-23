import Utils from '../../services/Utils';

const getPost = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await window.fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log('Error getting documents', err);
  }

  return null;
};

const Post = {
  render: async () => {
    const request = Utils.parseRequestURL();
    const post = await getPost(request.id);

    return `
            <section class="section">
                <h1> Post Id : ${post.id}</h1>
                <p> Post Title : ${post.title} </p>
                <p> Post Content : ${post.content} </p>
                <p> Post Author : ${post.name} </p>
            </section>
        `;
  },
  after_render: async () => {},
};

export default Post;
