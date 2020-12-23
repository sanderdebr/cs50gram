export default {
  addPost(state, payload) {
    state.posts.push(payload);

    return state;
  },
  clearPost(state, payload) {
    state.posts.splice(payload.index, 1);

    return state;
  },
};
