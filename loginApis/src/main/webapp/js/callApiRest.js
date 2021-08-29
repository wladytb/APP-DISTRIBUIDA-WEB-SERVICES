

function saveUser(data) {
    $.ajax({
        type: "POST",
        url: "https://wslogin.herokuapp.com/ws/login/save",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: data,
        success: function (response) {
            console.log(response);
            if (response > 0) {
                console.log("responde el servicio");
                console.log(response);
                toast('Sucess', 'Se ha registrado correctamente!.', '<i class="fas fa-check-circle"></i>');
                $("#btn-cancel").click();
            } else {
                console.log("no hay datos");
                console.log(response);
                toast('Alert', 'No se ha podido registrar!.', '<i class="fas fa-exclamation-circle"></i>');
                toast('Error', 'Error al guardar datos!.', '<i class="fas fa-times-circle"></i>');
            }
            $('#btn-cancel').removeAttr('disabled');
            $('#btn-save').removeAttr('disabled');
        },
        error: function (error) {
            $('#btn-cancel').removeAttr('disabled');
            $('#btn-save').removeAttr('disabled');
            console.log(error);
            toast('Error',error, '<i class="fas fa-times-circle"></i>');
        }
    });
}
function saveFileBD(data) {
    $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    console.log((e.loaded / e.total) * 100);
                }
            }, false);
            return xhr;
        },
        type: "POST",
        url: "https://localhost:44378/api/files/register",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: data,
        success: function (response) {
            if (response) {
                console.log("responde el servicio");
            } else {
                console.log("no hay datos");
                console.log(response);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function getFileUser(data) {
    $.ajax({
        type: "GET",
        url: "https://localhost:44378/api/files/getFileUser/" + data.id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: {},
        success: function (response) {
            if (response.length > 0) {
                console.log("responde el servicio");
                console.log(response);
                $("table > tbody").empty();
                $.each(response, function (item, val) {
                    $("tbody").append('<tr id="'+val.idFile+'">\n\
                        <td>' + (item + 1) + '</td>\n\
                        <td class="name-file-td">' + val.name + '</td>\n\
                        <td class="desc-file-td">' + val.description.replace('null', '') + '</td>\n\
                        <td>\n\
                            ' + getIcon(val.type) + '\n\
                        </td>\n\
                        <td><div class="acciones">\n\
                               <a href="' + val.fileURL + '"> <i class="view fas fa-eye"></i><a>\n\
                                <i onclick="showModalEditar(\''+val.idFile+'\',\''+val.type+'\')" class="edit fas fa-edit"></i>\n\
                                <i onclick="showModalDelete(\''+val.idFile+'\')" id=btn-delete class="delete fas fa-trash-alt"></i>\n\
                            </div></td>\n\
                    </tr>');
                });
            } else {
                console.log("no hay datos");
                console.log(response);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function ver(url) {
    window.open(url);
    console.log(url);
}

function modificarFiles(data) {
    $.ajax({
        type: "POST",
        url: "https://localhost:44378/api/files/update",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: data,
        success: function (response) {
            if (response) {
               getFileUser({id:window.location.search.split('=')[1]});
            } else {
                console.log("no hay datos");
                console.log(response);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function eliminarFiles(data) {
    console.log(data);
    $.ajax({
        type: "POST",
        url: "https://localhost:44378/api/files/delete",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: data,
        success: function (response) {
            if (response) {
               getFileUser({id:window.location.search.split('=')[1]});
            } else {
                console.log("no hay datos");
                console.log(response);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}