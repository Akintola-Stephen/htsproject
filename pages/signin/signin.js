var chat = $.connection.chatHub;

$('#success-message').hide();

$('.logbtn').off("click").on("click", function (event) {
    $.connection.hub.start().done(() => {
        console.log("Connected")
        chat.server.login_authentication($('#user').val(), $('#pass').val()).done(data => {
            data = JSON.parse(data);
            if (data.STATUS == 'ERROR') {
                alert('Big Error')
            }
            else if (data.RESULT[0].OUTPUT_MESSAGE == "Failed") {
                alert("Invalid Username or Password!")
            } else {
                $('#success-message').fadeIn('slow');
                setTimeout(function () {
                    $('#success-message').fadeOut("slow");
                }, 1000);
                alert("Authentication Successful!");
                console.log(data);
                window.localStorage.setItem('user', JSON.stringify(data.OUTPUT));
                window.location.href = data.OUTPUT[0].USER_TYPE.toLowerCase();
            }
        });

    });
});


// $(document).ready(function () {
//     $('#success-message').hide();
//     $('#assign-user-btn').click(function () {
//         $('#success-message').fadeIn('slow');
//         setTimeout(function () {
//             $('#success-message').fadeOut("slow");
//         }, 1000);
//         $('.table-responsive').hide();
//     });
// });
