import { vuexfireMutations, firestoreAction } from 'vuexfire';
export const state = () => ({
  posts: [],
});
export const mutations = {
  ...vuexfireMutations
};
export const actions = {
  setPostsRef: firestoreAction(function (context, ref) {
    context.bindFirestoreRef('posts', ref)
  }),
};
export const getters = {
  posts: state => state.posts
}
