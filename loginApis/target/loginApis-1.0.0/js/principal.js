$(document).ready(function () {
    resize();
    $(window).resize(function () {
        resize();
    });
    function resize() {
        $(".body").css('height', ($(window).height()) + "px");
    }
    $('#btnsalir').on('click', function (event) {
        if (typeof tp !== 'undefined') {
            if (tp === 'fc')
                fbLogout(true);
            else if (tp === 'gh')
                logout(true);
            else if (tp === 'gg')
                signOut(true);
            else if (tp === 'tw')
                salirTwitter(true);
        }
    });
});

function verifiuserlogin()
{
    if (window.location.search.substring(1).includes('idU=')) {
        var vars = window.location.search.substring(1).replace("idU=", "").split('&');
        getFileUser({id: vars[0]});
    } else {
        window.location.href = '../index.html';
    }
}
var tp;

let files = [];
var filesArray = [];
var upload = false;

$(document).ready(function () {
    resize();
    $(window).resize(function () {
        resize();
    });

    $(window).on('load', function () {
        $('#mis-doc').click();
    });

    function resize() {
        $(".body").css('height', ($(window).height()) + "px");
        $(".box-documentos").css('max-height', (($(window).height()) - $(".header").css('height').replace('px', '') -
                $(".main-menu").css('height').replace('px', '') - 37) + "px");
        $(".box-subir").css('max-height', (($(window).height()) - $(".header").css('height').replace('px', '') -
                $(".main-menu").css('height').replace('px', '') - 37) + "px");
    }
    const dropArea = document.querySelector(".drag-area"),
            dragText = dropArea.querySelector(".txt-drag-drop");
    $('#btn-upload').on('click', function (event) {
        $('#imput-file').click();
    });
    $('#imput-file').on('change', function (event) {
        files = this.files;
        dropArea.classList.add("active");
        showFile();
    });
    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
    });
    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    });
    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        files = event.dataTransfer.files;
        showFile();
    });
    var num = 1;
    function showFile() {
        console.log(files);
        $.each(files, function (item, val) {
            let fileType = val.type.split('/')[0];
            if (parseInt(files[item].size / 1024) <= 10240) {
                filesArray.push({file: files[item], clave: num});
                $(".archvos-subidos").append('<div class="file-upload" id="file-' + num + '"> \n\
                                <div class="inform-file"> \n\
                                    <div class="icon-file"> \n\
                                        ' + getIcon(fileType) + '</i>\n\
                                    </div>\n\
                                    <div class="name-file">\n\
                                        <p>' + files[item].name + '</p>\n\
                                    </div>\n\
                                    <div class="tamano-file">\n\
                                        <p>' + parseInt(files[item].size / 1024) + ' KB</p>\n\
                                    </div>\n\
                                    <div class="icon-action-file">\n\
                                        <i class="delete-file fas fa-times"></i>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="bar-progress">\n\
                                    <div class="barra"></div> \n\
                                </div> \n\
                            </div>');
                num++;
            }
        });
        if (!upload) {
            if (filesArray.length > 0) {
                saveFiles(filesArray[0].file, filesArray[0].file.name);
                upload = true;
            }
        }
    }
    $('#mis-doc').on('click', function (event) {
        $('.item').css({'border-bottom': ''});
        $('.box-menu i').css({'color': ''});
        $("#mis-doc").css({'border-bottom': 'RGB(20, 146, 113) 2px solid'});
        $(".uno").css({'color': 'RGB(20, 146, 113)'});
        $(".box-subir").css({'display': 'none'});
        $(".box-documentos").css({'display': 'block'});
        getFileUser({id: window.location.search.split('=')[1]});
    });
    $('#subir-doc').on('click', function (event) {
        $('.item').css({'border-bottom': ''});
        $('.box-menu i').css({'color': ''});
        $("#subir-doc").css({'border-bottom': 'RGB(20, 146, 113) 2px solid'});
        $(".dos").css({'color': 'RGB(20, 146, 113)'});
        $(".box-documentos").css({'display': 'none'});
        $(".box-subir").css({'display': 'flex'});
    });

});

function getIcon(type) {
    switch (type) {
        case "image":
            return '<i class="fas fa-image"></i>';
            break;
        default :
            return '<i class="fas fa-file"></i>';
    }
}

function showModalEditar(obj, type) {
    $('#txt-name-file').val($('#' + obj).children()[1].innerHTML)
    $('#txt-descripcion-file').val($('#' + obj).children()[2].innerHTML)
    $('#txt-extension-file').val(type);
    $('#txt-id-file').val(obj);
    $('.modal-update').animate({top: '0%'});
    console.log(obj + type);
}
function closeModalUpdate() {
    $('.modal-update').animate({top: '-100%'});
    $('#txt-name-file').val('');
    $('#txt-descripcion-file').val('');
    $('#txt-extension-file').val('');
}
function showModalDelete(obj) {
    $('.md-main p')[0].innerHTML = '¿ Está seguro que quiere eliminar el archivo: ' + $('#' + obj).children()[1].innerHTML + ' ?';
    $('.modal-delete').animate({top: '0%'});
    $('#idDelete').val(obj);

    console.log(obj);
}
function closeModalDelete() {
    $('.modal-delete').animate({top: '-100%'});
}

function modificar() {
    modificarFiles(JSON.stringify({idFile: parseInt($('#txt-id-file').val()), name: $('#txt-name-file').val(), fileURL: '',
        description: $('#txt-descripcion-file').val(), type: $('#txt-extension-file').val(), idUser: parseInt(window.location.search.split('=')[1])}));
    closeModalUpdate();
}
function eliminar() {
    eliminarFiles(JSON.stringify({idFile: parseInt($('#idDelete').val())}));
    closeModalDelete();
}