/* global filesArray,upload */

var firebaseConfig = {
    apiKey: "AIzaSyA9J8Siq4EOQ3azPyusoy9E1pacmE4RMgQ",
    authDomain: "minube-698c9.firebaseapp.com",
    projectId: "minube-698c9",
    storageBucket: "minube-698c9.appspot.com",
    messagingSenderId: "995677310862",
    appId: "1:995677310862:web:c7a2cb38f23107d01c9edf",
    measurementId: "G-G7ZZ3WFD08"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
function saveFiles(file, name) {
    const ref = firebase.storage().ref();
    const metadata = {contentType: file.type};
    var dt = new Date();
    const task = ref.child('files/' + (dt.getDate() + '-' + (dt.getMonth() + 1) + '-' +
            dt.getFullYear()) + '-' + dt.getHours() + ':' +
            dt.getMinutes() + ':' + dt.getSeconds() + '-' + name).put(file, metadata);
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
        var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        $("#file-" + filesArray[0].clave + " .bar-progress .barra").css({width: Math.round(percent) + "%"});
        $("#file-" + filesArray[0].clave + " .bar-progress .barra").text(Math.round(percent) + '%');
    });
    task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
        console.log(url);
        $("#file-" + filesArray[0].clave + " .inform-file .icon-action-file i").remove();
        $("#file-" + filesArray[0].clave + " .inform-file .icon-action-file").append('<i class="ok-file fas fa-check"></i>');
        $("#file-" + filesArray[0].clave).remove();
        saveFileBD(JSON.stringify({idFile: 0, name: filesArray[0].file.name, fileURL: url,
            description: 'null', type: filesArray[0].file.type.split('/')[0], idUser: parseInt(window.location.search.split('=')[1])}));
        filesArray.splice(0, 1);
        if (filesArray.length > 0) {
            saveFiles(filesArray[0].file, filesArray[0].file.name);
        } else {
            upload = false;
        }

    }).catch((error) => {
        console.log(error.message);
    });
}