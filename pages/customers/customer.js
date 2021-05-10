var databaseRegisteredUsers = [];
var table = $("#requestTable");
var chat = $.connection.chatHub;

var customerdata = JSON.parse(window.localStorage.getItem('user'))[0];

chat.client.broadcastrecords = function(data){
  var dData = JSON.parse(data)
  if (dData.ACTION_TYPE == 'SELECT'){
   //   pageload.generateTable(dData.RESULT);
  }
  else if (dData.ACTION_TYPE == 'INSERT' || dData.ACTION_TYPE == 'DELETE'){
    pageload.fetchData();
  }
 
}


var pageload = function(){
    return {
        init: function(){
         pageload.customerDetails();
         pageload.fetchComplaintCategory();
         pageload.pageEvents();
         pageload.fetchData();
        },

        addUser: function(event){
          event.preventDefault();         
          console.warn(chat);
          // SignalR code that allows communication between VB and JS code together 
          $.connection.hub.start().done(function () {
            console.log('connected !!!')
            var myobj = pageload.getDataFromFormData();
            console.log(myobj);
            databaseRegisteredUsers.push(myobj);
            
            var JSON_STRING = JSON.stringify(databaseRegisteredUsers);
            chat.server.interns_Insert(JSON_STRING, 'INSERT')
            .done(function(data){

            });   

            pageload.clearForm(event.target);
    
          });
        },
        
        compileAndInertHtml: function(template, data, outputelement) {
          console.log(template, data, outputelement);
          const templateStr = $("#" +template ).html();
          console.log(templateStr)
          const compilled = Handlebars.compile(templateStr)(data);
          $("#" +outputelement ).html(compilled);
          
        },
        
        generateTable: function(myDataa){
          console.log(myDataa);
          pageload.compileAndInertHtml('table', {request: myDataa.RESULT, customer_id : customerdata.USER_CUSTOMER_ID}, 'request-area');
          pageload.pageEvents();
        },

        pageEvents: function(){        
          $("#assign-category-btn").off("click").on("click", function(event){
            event.preventDefault()
            var category_id = $("#category").val();
            var compliant = $("#complaintInputName").val();
            $.connection.hub.start().done(function () {
              console.log('connected !!!')
              var myobj = [{COMPLAINT_CATEGORY_ID :category_id, REQUEST: compliant, CUSTOMER_ID :customerdata.CUSTOMER_ID  }]
              var JSON_STRING = JSON.stringify(myobj);
              chat.server.interns_Insert(JSON_STRING, 'INSERT COMPLIANT');
              pageload.fetchData();
              pageload.clearForm();
            });
          });

          $('#customer-logs').click(function () {
            $('.table-responsive').show('slow');
            $('#complaint-create-form').hide();
           
          });

        },
        
        customerDetails: function(){
          $('.loggedname').html(customerdata.USERNAME );
      },

        getDataFromFormData: function() {
          var obj = {};
          $("#add-user-form input, #add-user-form select").filter(function(i,o){
              obj[$(o).attr("name")] = $(o)[0].value;
          });
          return obj;
         
        },

        fetchComplaintCategory: function(){
          $.connection.hub.start().done(function(){
            console.log('Reached this point that fetches complaint category')
           
            chat.server.interns_Insert("", 'SELECT_CATEGORIES').done(complaint_category => {
              complaint_category = JSON.parse(complaint_category);
              pageload.compileAndInertHtml("categorytemplate", { complaint_category: complaint_category.RESULT }, "category-display-part");       
          });
          });
        },

        fetchData: function(){
          $.connection.hub.start().done(function () {
            console.log('connected !!!')
            var JSON_STRING = JSON.stringify([{CUSTOMER_ID : customerdata.CUSTOMER_ID}]);
            chat.server.category_signalR_chatHub(JSON_STRING, 'SELECT').done(request => {
              request = JSON.parse(request);
              pageload.generateTable(request) 
             // $('.table-responsive').show();   
          });
        });
      },

        clearForm: function(form) {
        $("input, textarea, select").val("");
        $("#selected").val("");
      },
    }

}();


pageload.init();
