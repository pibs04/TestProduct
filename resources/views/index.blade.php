<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
	<div class="login-main-container">
		<div class="login-container elem-shadow">
			<h1 class="title-text">Login</h1>
			<div class="username-div">
				<label>Username: </label>
				<input data-bind="value: username" class="input-medium">
			</div>
			<div class="password-div">
				<label>Password: </label>
				<input data-bind="value: password" class="input-medium">
			</div>
			<div class="login-button-container">
				<button data-bind="click: login" class="button-common">OK</button>
				<a href="#" class="small-font">Forgot&nbsp;Password</a>
			</div>
		</div>
	</div>

	<script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="lib/jquery-ui.js"></script>
	<script src="https://ajax.aspnetcdn.com/ajax/knockout/knockout-3.1.0.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/index.js"></script>

</body>
</html>