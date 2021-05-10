var userdata = JSON.parse(window.localStorage.getItem('user'));


var load = (function(){
    return{
        setDetails: function(){
            if (userdata == null){
                window.location.href = "../htsproject/login"
            }
            $('.loggedname').html(userdata.USERNAME);
            load.pageEvents();
        },
        pageEvents: function(){
            $('.logout').off("click").on("click", function (event) {
              window.location.href = "../sign-in/signin.aspx"
               window.localStorage.removeItem('user');
          
            });
            $('.logcompliant').off("click").on("click", function (event) {
                window.location.href = "../customerview"
             });
             $('.viewcompliant').off("click").on("click", function (event) {
                window.location.href = "../customerview"
           
             });
        },
    }
}())

console.log("page loaded")
load.setDetails();
