
    $(document).ready(function () {
        $('.table-responsive').hide();
        $('#customer-logs').click(function () {
          $('.table-responsive').show('slow');
          $('#add-user-form').hide();
          $("#user-log-table").hide();
          $('#category-create-form').hide();
          $('.responsive').hide();
          $('#customers-logs-form').hide();
          $('#log-table').show();
          $('#user-list').hide();
          $('#request-area').show();
        });
      });

  
      $(document).ready(function () {
        $('#add-user-form').hide();
        $('#add-user').click(function () {
          $('#add-user-form').show('slow');
          $('#log-table').hide();
          $("#user-log-table").hide();
          $('#category-create-form').hide();
          $('.responsive').hide();
          $('#customers-logs-form').hide();
          $('#request-area').hide();
          $('#user-list').hide();
        });
      });
  
  
      $(document).ready(function () {
        $('.d-flex').hide();
        $('#dash').click(function () {
          $('.d-flex').show('slow');
          $('.table-responsive').hide();
          $('#category-create-form').hide();
          $('.responsive').hide();
          $('#add-user-form').hide();
          $('#user-list').hide();
        });
      });
  
  
      $(document).ready(function () {
        $('#customers-logs-form').hide();
        $('#customers-logs').click(function () {
          $('#customers-logs-form').hide();
          $('.table-responsive').hide();
          $('#add-user-form').hide();
          $('#category-create-form').hide();
          $('.responsive').hide();
          $('#user-list').hide();
          $('#customers-logs-form').show('slow');
        });
      });
  
      $(document).ready(function () {
        $('#category-create-form').hide();
        $('#category-assign').click(function () {
          $('#category-create-form').show('slow');
          $('#customers-logs-form').hide();
          $('.table-responsive').hide();
          $('#add-user-form').hide();
          $('.responsive').hide();
          $('#user-list').hide();
        });
      });


      $(document).ready(function () {
        $('#user-list').hide();
        $('#user-list-show').click(function () {
          $('#add-user-form').hide();
          $("#user-log-table").hide();
          $('#category-create-form').hide();
          $('.responsive').hide();
          $('#customers-logs-form').hide();
          $('.responsive').hide();
          $('#user-list').show('slow');
        });
      });
  
      $(document).ready(function () {
        $('#success-message').hide();
        $('#assign-user-btn').click(function () {
          $('#success-message').fadeIn('slow');
          setTimeout(function () {
            $('#success-message').fadeOut("slow");
          }, 1000);
          $('.table-responsive').hide();
        });
      });
  
  
  
      // Filtering name on-key press real time
      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#log-table tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
  