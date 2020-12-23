export default {
  addPost(context, payload) {
    context.commit('addPost', payload);
  },
  clearPost(context, payload) {
    context.commit('clearPost', payload);
  },
};
