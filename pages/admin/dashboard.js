var databaseRegisteredUsers = [];
var complaintDB = [];
var table = $("#requestTable");
var chat = $.connection.chatHub;

chat.client.broadcastrecords = function (data) {
  var dData = JSON.parse(data)
  if (dData.ACTION_TYPE == 'SELECT' ) {
    pageload.generateTable(dData.RESULT);
  }

  else if (dData.ACTION_TYPE == 'INSERT' || dData.ACTION_TYPE == 'DELETE' ) {
    pageload.fetchData();
  }

  else if (dData.ACTION_TYPE == 'SELECT_USERS'){
    pageload.generateUserTable(dData.RESULT);
  }

  else if (dData.ACTION_TYPE == 'SELECT_ROLES'){
    pageload.generateUserTable(dData.RESULT);
  }
  

}



var pageload = function () {
  return {
    init: function () {
      pageload.pageEvents();
      pageload.fetchData();
      pageload.fetchUserData();
    },

    addUser: function (event) {
      event.preventDefault();
      console.warn(chat);

      // SignalR code that allows communication between VB and JS code together 
      $.connection.hub.start().done(function () {
        console.log('connected !!!')
        var myobj = pageload.getDataFromFormData();
        databaseRegisteredUsers.push(myobj);
        pageload.clearForm();
        var JSON_STRING = JSON.stringify(databaseRegisteredUsers);
        chat.server.interns_Insert(JSON_STRING, 'INSERT')
          .done(function (data) {
            
          });

      });
      pageload.clearForm(event.target);
    },

    addComplaint: function (event) {
      $.connection.hub.start().done(function () {
        console.log('connected !!!')
        $("input, #selected").val("");
        // var JSON_STRING = JSON.stringify(databaseRegisteredUsers);
        chat.server.category_signalR_chatHub($('#complaintInputName').val(), 'INSERT')
          .done(function (data) {

          });

      });
      $("input, #selected").val("");
      
      pageload.clearUserForm();
      
    },

    compileAndInertHtml: function (template, data, outputelement) {
      const templateStr = document.getElementById(template).innerHTML
      const compilled = Handlebars.compile(templateStr)(data)
      document.getElementById(outputelement).innerHTML = compilled

      Handlebars.registerHelper('formatDate', function (date) {
        return new Date(date).toDateString();
      })

    },

    generateTable: function (myDataa) {
      chat.server.interns_Insert("", 'SELECT_USERS').done(function(users){        
        users = JSON.parse(users).RESULT;
        console.log(users)
        pageload.compileAndInertHtml('table', { request: myDataa, users}, 'request-area');
        pageload.pageEvents();
      });
    },

    generateUserTable: function (user_data) {
      chat.server.interns_Insert("", "SELECT_USER_ROLES").done(function(user_roles){
        console.log("Fetching of user records")
        user_roles = JSON.parse(user_roles).RESULT;
        console.log(user_roles)
        pageload.compileAndInertHtml('users-role-table', { user_list: user_roles }, 'user-list');
        pageload.pageEvents();
      });
    },

    fetchUserTypes: function(){
      $.connection.hub.start().done(function(){
        console.log('Reached this point that user type')
       
        chat.server.interns_Insert("", 'SELECT_ROLES').done(user_types => {
          user_types = JSON.parse(complaint_category);
          pageload.compileAndInertHtml("roleTemplate", { user_types: user_types.RESULT }, "user-display-part");       
      });
      });
    },


    pageEvents: function () {
      $(".deleteBtn").off("click").on("click", function (event) {
        event.preventDefault()
        var product_id = $(this).data("id");
        $.connection.hub.start().done(function () {
          console.log('connected !!!')
          var myobj = [{ PRODUCT_ID: product_id }]
          var JSON_STRING = JSON.stringify(myobj);
          chat.server.interns_Insert(JSON_STRING, 'DELETE');

        });

      });

      $("#update-btn").off("change").on("change", function (event) {
        event.preventDefault()
        var user_id = $(this).data("id");
        console.log(user_id)
        $.connection.hub.start().done(function () {
          // console.log(' update function activated connected !!!')
          var myobj = [{ USERID: user_id }]

          var JSON_STRING = JSON.stringify(myobj);
          chat.server.interns_Update(JSON_STRING, 'UPDATE');

        });
      });


      $("#assign-user-btn").off("click").on("click", function (event) {
        event.preventDefault();
        pageload.addUser(event);
        $('#success-message').fadeIn('slow');
        setTimeout(function () {
          $('#success-message').fadeOut("slow");
        }, 1000);
      });


      $("#assign-category-btn").off("click").on("click", function (event){
        event.preventDefault();
        pageload.addComplaint(event);
      })     

    },

    getDataForUpdate: function () {
      var updateObj = {};
      $("#log-table select, #log-table name").filter(function (i, o) {
        updateObj[$(o).attr("name")] = $(o)[0].value;
      });
      console.log(updateObj)
      return updateObj;

    },

    getDataFromFormData: function () {
      var obj = {};
      $("#add-user-form input, #add-user-form select").filter(function (i, o) {
        obj[$(o).attr("name")] = $(o)[0].value;
      });
      return obj;

    },

    getComplaintData: function () { 
      obs = {"CATEGORY": $("#category-create-form textarea").val()}
      return obs;
    },


    fetchData: function () {
      $.connection.hub.start().done(function () {
        // console.log('connected !!!')
        chat.server.interns_Insert("", 'SELECT');
      });
    },

    fetchUserData: function () {
      $.connection.hub.start().done(function () {
        // console.log('connected !!!')
        chat.server.interns_Insert("", 'SELECT_USERS');
      });
    },

    clearForm: function (form) {
      $("#add-user-form input, #selected").val("");
    },

    clearUserForm: function(form){
      $("#category-create-form textarea").val("")
    }

  }

}();


pageload.init();
