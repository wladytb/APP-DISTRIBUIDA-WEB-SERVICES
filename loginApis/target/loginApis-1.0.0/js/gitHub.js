var firebaseConfig = {
    apiKey: "AIzaSyB4DR9PYq5d5VMh5_9TuGLjfYgvEUpu6iI",
    authDomain: "bellchat-c53fa.firebaseapp.com",
    projectId: "bellchat-c53fa",
    storageBucket: "bellchat-c53fa.appspot.com",
    messagingSenderId: "1035360140894",
    appId: "1:1035360140894:web:90ea2cbbf61feedebc7ecf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
function loginWithGithub() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                var provider = new firebase.auth.GithubAuthProvider();
                return  firebase.auth().signInWithPopup(provider);
            }).catch((error) => {
        console.log(error.message);
    });
}
var aa;
firebase.auth().onAuthStateChanged((user) => {
    try {
        if (user)
        {
            aa = user;
            if (user.providerData[0].providerId === "github.com") {
                if ($("#img-u"))
                    $("#img-u").attr('src', String(user.photoURL));
                verificarUser(JSON.stringify(
                        {userName: "null",
                            password: "null", firstName: String(user.displayName), lastName: "null",
                            email: String(user.email), photo: String(user.photoURL),
                            idApis: String(user.uid), api: 'gh', tp: 1}));
            }
            console.log(user);
        }
    } catch (error) {

    }
});

function logout(a) {
    firebase.auth().signOut().then(function (response) {
        if (a)
            window.location.href = '../index.html';
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

$(document).on('click', '#github', function (e) {
    e.preventDefault();
    loginWithGithub();
});