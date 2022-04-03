import { auth } from "../services/firebase";


export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
    console.log("Aquii va bien")
    return auth().signInWithEmailAndPassword(email, password); // TODO: aqui es el error
}

// export function signInWithGoogle() {
//     const provider = new auth.GoogleAuthProvider();
//     return auth().signInWithPopup(provider);
// }

// export function signInWithGitHub() {
//     const provider = new auth.GithubAuthProvider();
//     return auth().signInWithPopup(provider);
// }

export function logout() {
    return auth().signOut();
}