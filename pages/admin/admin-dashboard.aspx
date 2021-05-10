<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
  <meta name="generator" content="Hugo 0.82.0">
  <title>Admin dashboard</title>

  <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/dashboard/">



  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">

  <script src="Scripts/handlebars-v4.7.7.js"></script>
  <script src="Scripts/jquery.min.js" type="text/javascript"></script>
  <script src="Scripts/jquery-1.7.1.js" type="text/javascript"></script>


  <script src="Scripts/jquery.signalR-2.2.0.js"></script>
  <!--Reference the autogenerated SignalR hub script. -->
  <script src="signalr/hubs"></script>

  <!-- Custom styles for this template -->

  <link href="css/admin/dashboard.css" rel="stylesheet">
</head>

<body>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">High Tech Synegy</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" id="myInput"
      aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link logout" href=""><span data-feather="log-out"></span> Sign out</span></a>
      </li>
    </ul>
  </header>

  <div class="container-fluid" style="margin-top: 50px;">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">

          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" id="dash" >
                <span data-feather="home"></span>
                Dashboard
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link"  id="add-user">
                <span data-feather="user-plus"></span>
                Create user & assign role
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="customer-logs" >
                <span data-feather="activity"></span>
                View request
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="category-assign" >
                <span data-feather="bar-chart-2"></span>
                Create complaint category
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="user-list-show" >
                <span data-feather="layers"></span>
                List of users
              </a>
            </li>
          </ul>

          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a class="link-secondary"  aria-label="Add a new report">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a class="nav-link" >
                <span data-feather="file-text"></span>
                Current month
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" >
                <span data-feather="file-text"></span>
                Last quarter
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" >
                <span data-feather="file-text"></span>
                Social engagement
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text"></span>
                Year-end sale
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="container">
          <div class="table-responsive" id="">
            <div class="card" id="request-area"></div>
            <script id="table" type="text/x-handlebars">
              <table class="table table-striped" >
                <thead>
                  <tr style="background-color:#092756; color:white;">
                    <th>COMPLAINT ID</th>
                    <th>CUSTOMER NAME</th>
                    <th>COMPLAINT MESSAGE</th>
                    <th>REQUEST STATUS</th>
                    <th>LOGGED REQUEST DATE</th>
                  </tr>
                </thead>
              <tbody>
                  {{#each request}}
                    <tr style="margin-top:10px;">
                      <td>{{COMPLAINT_ID}}</td>
                      <td>{{CUSTOMER_NAME}}</td>
                      <td>{{REQUEST}}</td>
                      <td name = "status-name">{{STATUS_NAME}}</td>
                      <td>{{formatDate DATE_CREATED}}</td>
                    </tr>
                  {{/each}}
                </tbody>
            </table>
          </script>
          </div>

          <div class="table-responsiv" id="">
          <div class="card" id="user-list"></div>
            <script id="users-role-table" type="text/x-handlebars">
              <table class="table table-striped" >
                <thead>
                  <tr style="background-color:#092756; color:white;">
                    <th>USER NAME</th>
                    <th>USER TYPE</th>
                    <th>DATE CREATED</th>
                  </tr>
                </thead>
              <tbody>
                  {{#each user_list}}
                    <tr style="margin-top:10px;">
                      <td>{{USERNAME}}</td>
                      <td>{{USER_TYPE}}</td>
                      <td>{{formatDate DATE_CREATED}}</td>
                    </tr>
                  {{/each}}
                </tbody>
            </table>
            </script>
        </div>

          <!-- Form for adding and assigning users to role -->
          <div id="add-user-form">
            <div class="mb-3">
              <label for="exampleInputName" class="form-label">User name</label>
              <input type="text" name="USERNAME" class="form-control" id="exampleInputName"
                aria-describedby="emailHelp">
            </div>

            <div class="mb-3">
              <div class="md-form md-outline">
                <i class="fas fa-key prefix" aria-hidden="true"></i>
                <label data-error="wrong" data-success="right" for="input-pwd\">Password</label>
                <input type="password" name="PASSWORD" id="input-pwd" class="form-control validate" required>
                <span toggle="#input-pwd" class="fa fa-fw fa-eye field-icon toggle-password"></span>
              </div>
            </div>

             <div id="user-display-part"></div>

              <script type="text/x-handlebars" id="roleTemplate">
                  <select class="form-control" id="role">
                    <option value=""></option>
                    {{#each complaint_category}}
                    <option  value="{{CATEGORY_ID}}">{{CATEGORY}}</option>
                    {{/each}}
                  </select>
              </script>

            <button type="button" class="btn btn-success" id="assign-user-btn">Assign</button>

          </div>

          <!-- Display success message whenever admin creates and assigns user -->
          <div id="success-message"
            style="background-color: lightgreen; padding-top: 5px; padding-bottom: 5px; padding-right:5px; padding-left: 5px; width: 50%;">
            Succesfully assigned role to user
          </div>
        </div>

        <!--   Form used to add a complaint category to the back-end -->
        <div id="category-create-form">
          <div class="mb-3">
            <label for="complaintInputName" class="form-label">Create a complaint category</label>
            <textarea name="CATEGORY" class="form-control" id="complaintInputName" style="height:200px;"
              aria-describedby="emailHelp"></textarea>
          </div>

          <button type="button" class="btn btn-danger" id="assign-category-btn">Assign category</button>

        </div>

        <!-- HandleBars table that performs task of creating a table that contains fetched records from database -->
        

     
        
      </main>
      
    </div>
  </div>



<script src="pages/admin/dashboard.js"></script>
<script src="pages/admin/hide-show-functions.js"></script>
<script src="scripts/bootstrap.bundle.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
    integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE"
    crossorigin="anonymous"></script>

<script src="pages/general.js"></script>



<script>
  Handlebars.registerHelper('formatDate', function (date) {
    return new Date(date).toDateString();
  })
</script>

</body>

</html>