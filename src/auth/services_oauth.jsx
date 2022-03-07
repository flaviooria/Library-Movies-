import AppAuth from './auth';

const App = AppAuth.getInstance();
const services = AppAuth.services();
const auth = services.getAuth(App);
const database = services.getDatabase(App);
const googleProvider = new services.GoogleAuthProvider();

const singInUser = async (email, password) => {
  return await services.signInWithEmailAndPassword(auth, email, password);
};

const singUpUser = async (name, email, password) => {
  const userCredential = await services.createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredential) {
    await writeUserData(userCredential.user.uid, name, email, password);
    return userCredential;
  }
};

async function writeUserData(userId, name, email, password) {
  await services.set(services.ref(database, 'users/' + userId), {
    username: name,
    email,
    password,
  });
}

const singInWithGoogleProvider = async () => {
  return (await services.signInWithPopup(auth, googleProvider)).user;
};

const singOutUser = async () => {
  await services.signOut(auth);
};

export { singInUser, singUpUser, singInWithGoogleProvider, singOutUser };
