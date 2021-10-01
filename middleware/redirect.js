export default function ({ route, redirect, store }) {
  console.log(route, redirect, store);
  const user = store.getters.currentUser;
  // const article = store.getters.personalComponent;
  if (!(user)) {
    redirect('/auth/login')
  }
}
