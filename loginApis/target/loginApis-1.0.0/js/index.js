

function guardarImg(data, name) {
    $("#btn-cancel").attr('disabled', 'disabled');
    $("#btn-save").attr('disabled', 'disabled');
    if (typeof $('#filephoto').prop("files")[0] !== 'undefined') {
        const ref = firebase.storage().ref();
        const file = document.querySelector("#filephoto").files[0];
        const metadata = {contentType: file.type};
        var dt = new Date();
        const task = ref.child('imgProfiles/apis-' +
                name + '-' + (dt.getDate() + '-' + (dt.getMonth() + 1) + '-' +
                        dt.getFullYear()) + '-' + dt.getHours() + ':' +
                dt.getMinutes() + ':' + dt.getSeconds()).put(file, metadata);
        task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
            console.log(url);
            data.photo = url;
            saveUser(JSON.stringify(data));
        }).catch((error) => {
            console.log(error.message);
            $('#btn-cancel').removeAttr('disabled');
            $('#btn-save').removeAttr('disabled');
        });
    } else {
        data.photo = 'https://firebasestorage.googleapis.com/v0/b/bellchat-c53fa.appspot.com/o/imgProfiles%2Fdefault-7-7-2021-23%3A18%3A52?alt=media&token=d6dc7f60-71ab-41c9-9496-94be0bf07f9d';
        saveUser(JSON.stringify(data));
    }
}

$(document).ready(function () {
    resize();
    $(window).resize(function () {
        resize();
    });
    function resize() {
        if ($(window).width() > 900)
            $(".body").css('height', ($(window).height()) + "px");
        else
        if ($('.container-form').css('display') === 'none')
            $(".body").css({'height': '100%'});
    }

    $('#btnSubmit').on('click', function (event) {
        if ($("#id-input-User").val().replace(/ +/g, " ").trim().length > 0
                && $("#id-input-Password").val().replace(/ +/g, " ").trim().length > 0) {
            verificarUser(JSON.stringify(
                    {userName: $("#id-input-User").val(),
                        password: $("#id-input-Password").val(), firstName: "null", lastName: "null",
                        email: "null", photo: "null", idApis: "null", api: 'none', tp: 0}));
        } else
            toast('Alert', 'Ingrese sus credenciales!.', '<i class="fas fa-exclamation-circle"></i>');
    });

    $('#btn-save').on('click', function (event) {
        if ($("#id-input-firstName").val().replace(/ +/g, " ").trim().length > 0
                && $("#id-input-lastName").val().replace(/ +/g, " ").trim().length > 0
                && $("#id-input-email").val().replace(/ +/g, " ").trim().length > 0
                && $("#id-input-user-register").val().replace(/ +/g, " ").trim().length > 0
                && $("#id-input-password-register").val().replace(/ +/g, " ").trim().length > 0
                && $("#id-input-password1-register").val().replace(/ +/g, " ").trim().length > 0) {
            if ($("#id-input-password-register").val().replace(/ +/g, " ").trim() ===
                    $("#id-input-password1-register").val().replace(/ +/g, " ").trim())
                guardarImg({userName: $("#id-input-user-register").val().replace(/ +/g, " ").trim(),
                    password: $("#id-input-password-register").val().replace(/ +/g, " ").trim(),
                    firstName: $("#id-input-firstName").val().replace(/ +/g, " ").trim(),
                    lastName: $("#id-input-lastName").val().replace(/ +/g, " ").trim(),
                    email: $("#id-input-email").val().replace(/ +/g, " ").trim(),
                    photo: "null", idApis: "null", api: 'none'}, $("#id-input-user-register").val().replace(/ +/g, " ").trim());
            else
                toast('Alert', 'Las contraseñas deben ser iguales!.', '<i class="fas fa-exclamation-circle"></i>');
        } else
            toast('Alert', 'Ingrese todo los datos!.', '<i class="fas fa-exclamation-circle"></i>');
    });
    $('#btn-cancel').on('click', function (event) {
        $('.register-box').css({'position': 'absolute'});
        $('.register-box').css({'opacity': '0'});
        setTimeout("$('.register-box').css({'display':'none'});", 1100);

        $('.container-form').css({'display': 'block'});
        $('.container-form').css({'opacity': '1'});
        setTimeout("$('.register-box').css({'position': ''});", 1100);
        clearAll();
    });
    $("#id-input-Password").on("keydown", function (event) {
        if ((event.keyCode || event.which) === 13)
            $('#btnSubmit').click();
    });
    $("#id-input-User").on("keydown", function (event) {
        if ((event.keyCode || event.which) === 13)
            $('#btnSubmit').click();
    });
});

function clearAll() {
    $("#id-input-firstName").val("");
    $("#id-input-lastName").val("");
    $("#id-input-email").val("");
    $("#id-input-user-register").val("");
    $("#id-input-password-register").val("");
    $("#id-input-password1-register").val("");
}

function openbtnfile() {
    $("#filephoto").click();
}

function onFileSelected() {
    var archivo = $('#filephoto').prop("files");
    var reader = new FileReader();
    if (archivo.length > 0) {
        reader.readAsDataURL(archivo[0]);
        reader.onloadend = function () {
            $("#img-photo").attr("src", reader.result);
        };
    }
}
function cerrarForm() {
    $('.container-form').css({'position': 'absolute'});
    $('.container-form').css({'opacity': '0'});
    setTimeout("$('.container-form').css({'display':'none'});", 1100);

    $('.register-box').css({'display': 'block'});
    $('.register-box').css({'opacity': '1'});
    setTimeout("$('.container-form').css({'position': ''});", 1100);
}

function toast(tipo, txt, icono) {
    $('#containe-toast').prepend('\<div class="toast">\n\
        <div class="toast-color ' + tipo + '">\n\
        </div>\n\
        <div class="toast-icon icon-' + tipo + '">\n\
            ' + icono + '\n\
        </div>\n\
        <div class="toast_info">\n\
            <div class="toast_info-header">\n\
                <p>' + tipo + '</p>\n\
            </div>\n\
            <div class="toast_info-txt">\n\
                <p>' + txt + '</p>\n\
            </div>\n\
        </div>\n\
        <div class="toast-x" >\n\
            <i onclick="clictoast(this)" class="fas fa-times"></i>\n\
        </div>\n\
    </div>').children(':first')
            .delay(5000)
            .fadeOut(1000, function () {
                $(this).remove();
            });
}
function clictoast(e) {
    $(e).parent().parent().remove();
}
function verificarUser(data) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/loingApisWS/ws/login/checkUser",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: data,
        success: function (response) {
            if (response.length > 0) {
                console.log("responde el servicio");
                console.log(response);
                if (typeof $("#img-u")[0] !== 'undefined') {
                } else
                    window.location.href = 'pages/principal.html?idU=' + response[0];
            } else {
                console.log("no hay datos");
                console.log(response);
                toast('Alert', 'Datos incorrectos!.', '<i class="fas fa-exclamation-circle"></i>');
                toast('Error', 'Error al iniciar sesión.', '<i class="fas fa-times-circle"></i>');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}