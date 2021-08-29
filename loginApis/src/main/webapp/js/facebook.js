window.fbAsyncInit = function () {
    FB.init({
        appId: '2931219057145483',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
    });

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            getFbUserData();
        }
    });
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse)
            getFbUserData();
        else
            console.log(response);
    }, {scope: 'email'});
}
function getFbUserData() {
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,picture'},
            function (response) {
                console.log(response);
                if (typeof response === 'object')
                {
                    try {
                        if ($("#img-u"))
                            $("#img-u").attr('src', String(response.picture.data.url));
                        
                        verificarUser(JSON.stringify(
                                {userName: "null",
                                    password: "null", firstName: String(response.first_name), lastName: String(response.last_name),
                                    email: String(response.email), photo: String(response.picture.data.url), idApis: String(response.id), api: 'fc', tp: 1}));
                    } catch (error) {
                    }
                }
            });
}
function fbLogout(a) {
    FB.logout(function () {
        if (a)
            window.location.href = '../index.html';
    });
}
$(document).on('click', '#facebook', function (e) {
    e.preventDefault();
    fbLogin();
}
);