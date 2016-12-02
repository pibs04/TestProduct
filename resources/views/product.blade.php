<!DOCTYPE html>
<html>
<head>
	<meta name="_token" content="{{ csrf_token() }}">
	<title>Products</title>
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<link rel="stylesheet" type="text/css" href="css/product.css">
</head>
<body>
	<div class="main-container">

		<h1 class="title-text">Products Inventory</h1>

		<hr>

		<div class="button-container">
			<div data-bind="visible: isEdited" style="float:right;">
				<button data-bind="click: saveChange" class="button-common">Save</button>
				<button data-bind="click: cancelChange" class="button-common">Cancel</button>
			</div>
			<div data-bind="visible: isEdited() == false" class="add-prod-container">
				<label>Category: </label><select data-bind="options: categoryList, optionsText: 'categoryName', value: selectedCategory" class="select-category"></select>
				<label>Name: </label>
					<input type="text" name="productName" id="productName" class="input-tall add-prod-name">
				<label>Description: </label>
					<input type="text" name="productDescription" id="productDesc" class="input-tall add-prod-desc">
				<button href="#" data-bind="click: addProduct" class="button-common">Add</button>
			</div>

		</div>

		<div class="table-container elem-shadow clear-fix">
			<table data-bind="with: selectedCategory">
				<thead>
					<tr>
						<th>ID</th><th>Product Name</th><th>Description</th><th>Created</th><th>Last Updated</th><th></th>
					</tr>
				</thead>
				<tbody data-bind="foreach: prodList">
					<tr>
						<td data-bind="click: $root.editProduct">
							<span data-bind="text: prodId"></span>
						</td>
						<td data-bind="click: $root.editProduct">
							<span data-bind="text: prodName, visible: isEditable() == false"></span>
							<input data-bind="value: prodName, visible: isEditable">
						</td>
						<td data-bind="click: $root.editProduct">
							<span data-bind="text: prodDesc, visible: isEditable() == false""></span>
							<input data-bind="value: prodDesc, visible: isEditable">
						</td>
						<td data-bind="click: $root.editProduct">
							<span data-bind="text: createdAt"></span>
						</td>
						<td data-bind="click: $root.editProduct">
							<span data-bind="text: updatedAt"></span>
						</td>
						<td >
							<a href="#" data-bind="click: $root.deleteProduct" class="small-font">Remove</a>
						</td>

					</tr>
				</tbody>
			</table>
		<div>
	<div>

	<script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="lib/jquery-ui.js"></script>
	<script type="text/javascript" src="lib/knockout-3.4.1.js" ></script>
	<script type="text/javascript" src="lib/date.js"></script>
	<script type="text/javascript" src="js/product.js"></script>

</body>
</html>