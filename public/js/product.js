var CANCEL_CHANGE = "cancel";
var SAVE_CHANGE = "save";

var productViewModel = new ProductViewModel();

$(document).ready(function() {
		
	ko.applyBindings(productViewModel);

});

function ProductViewModel() {
	var self = this;

	self.categoryList = ko.observableArray();
	initCategoryList();

	self.selectedCategory = ko.observable();

	self.categoryList.subscribe( function() {
		if( self.categoryList().length > 0) {
			self.selectedCategory(self.categoryList()[0]);	
		}
	});

	self.selectedCategory.subscribe( function() {
		getProductList();
	});
	
	self.isEdited = ko.observable(false);

	self.editList = ko.observableArray([]);

	self.editProduct = function(item) {
		if( !item.isEditable() ) {
			self.editList.push(item);
			self.isEdited(true);
			item.isEditable(true);	
		}
	};

	self.saveChange = function() {
		processChange( SAVE_CHANGE );
		self.isEdited(false);
	};

	self.cancelChange = function() {
		processChange( CANCEL_CHANGE );
		self.isEdited(false);
		self.editList([]);
	};

	self.addProduct = function() {
		addNewProduct();	
	};

	self.deleteProduct = function(item) {
		deleteProduct( item );
	};
}

function Category(data) {
	var self = this;

	self.categoryId = ko.observable(data.category_id);
	self.categoryName = ko.observable(data.category_name);
	self.categoryDesc = ko.observable(data.category_description);
	self.category_createdAt = ko.observable(data.created_at);
	self.category_updatedAt = ko.observable(data.updated_at);
	self.prodList = ko.observableArray([]);
}

function Product(data) {
	var self = this;

	self.backUp = new BackUpItem(data);

	self.categoryId = ko.observable(data.category_id);
	self.prodId = ko.observable(data.product_id);
	self.prodName = ko.observable(data.product_name);
	self.prodDesc = ko.observable(data.product_description);
	self.createdAt = ko.observable(data.created_at);
	self.updatedAt = ko.observable(data.updated_at);

	self.isEditable = ko.observable(false);
}

function BackUpItem(data, transactType ) {
	this.prodId = data.product_id;
	this.prodName = data.product_name; 
	this.prodDesc = data.product_description;
}

function initCategoryList() {
	$.ajax({
		url: 'http://localhost:8000/category',
		type: 'GET',
		dataType: 'json',
		success: function(data, status) {
			var categoryList = $.map(data, function(item) {
								return new Category(item); 
							});
			productViewModel.categoryList(categoryList);
		},
		error: function(msg, status) {
			console.log(msg);
		}
	});
}

function getProductList() {
	var selectedCategory = productViewModel.selectedCategory();
	if(selectedCategory == null) {
		return;
	}

	var categoryId = selectedCategory.categoryId();

	$.ajax({
		url: 'http://localhost:8000/products/' + categoryId,
		type: 'GET',
		dataType: 'json',
		success: function(data, status) {
			var productList = $.map(data, function(item) {
								return new Product(item); 
							});
			selectedCategory.prodList(productList);
		},
		error: function(msg, status) {
			console.log(msg);
		}
	});
}


function saveChange( product ) {
	var selectedCategory = productViewModel.selectedCategory();
	if(selectedCategory == null) {
		return;
	}

	var categoryId = product.categoryId();
	var prodId = product.prodId();
	var prodName = product.prodName();
	var prodDesc = product.prodDesc();
	var csrf_token =  $('meta[name="_token"]').attr('content');
	var saveUrl = encodeURI('http://localhost:8000/product/' + categoryId + '/' + prodId +
							 '/' + prodName + '/' + prodDesc);

	$.ajax({
		url: saveUrl,
		type: 'POST',
		data: { _token: csrf_token },
		dataType: 'json',
		success: function(data, status) {
			return;
		},
		error: function(msg, status) {
			console.log(msg);
		}
	});
}


function addNewProduct() {
	var prodName = $("#productName").val();
	var prodDesc = $("#productDesc").val();
	var selectedCategory = productViewModel.selectedCategory();
	
	if(prodName == "" || prodDesc == "" || selectedCategory == null) {
		return;
	}

	var categoryId = selectedCategory.categoryId();
	var csrf_token =  $('meta[name="_token"]').attr('content');
	var saveUrl = encodeURI('http://localhost:8000/product/' + categoryId + '/' + 
							 prodName + '/' + prodDesc);
	$.ajax({
		url: saveUrl,
		type: 'POST',
		data: { _method: 'PUT', _token: csrf_token },
		dataType: 'json',
		success: function(data, status) {
			var productList = $.map(data, function(item) {
								return new Product(item); 
							});
			selectedCategory.prodList(productList);
			resetInput();
		},
		error: function(msg, status) {
			console.log(msg);
		}
	});
}


function deleteProduct( product ) {

	var selectedCategory = productViewModel.selectedCategory();
	if( selectedCategory == null ) {
		return;
	}
	var productId = product.prodId();
	var csrf_token =  $('meta[name="_token"]').attr('content');
	var saveUrl = encodeURI('http://localhost:8000/product/' + productId);

	$.ajax({
		url: saveUrl,
		type: 'POST',
		data: { _method: 'DELETE', _token: csrf_token },
		dataType: 'json',
		success: function(data, status) {
			var productList = $.map(data, function(item) {
								return new Product(item); 
							});
			selectedCategory.prodList(productList);
			resetInput();
		},
		error: function(msg, status) {
			console.log(msg);
		}
	});
}


function processChange(event) {
	var prodList = productViewModel.editList();

	for(var i = 0; i < prodList.length; i++) {
		var product = prodList[i];
		product.isEditable(false);

		if(event == CANCEL_CHANGE) {
			restoreItem( product );
		} else {
			saveChange( product );
		}
	}

	//Reload all data after saving
	if(SAVE_CHANGE == event) {
		getProductList();
	}
}


function restoreItem( data ) {
	data.prodId(data.backUp.prodId);
	data.prodName(data.backUp.prodName);
	data.prodDesc(data.backUp.prodDesc);
}


function resetInput() {
	$("#productName").val("");
	$("#productDesc").val("")
}
