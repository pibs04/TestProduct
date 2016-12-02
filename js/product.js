var CANCEL_CHANGE = "cancel";
var SAVE_CHANGE = "save";
var ORIGINAL_DATA = "original_data";

var productViewModel = new ProductViewModel();

$(document).ready(function() {
		
	ko.applyBindings(productViewModel);
});

function ProductViewModel() {
	var self = this;
	
	self.categoryList = ko.observableArray( initCategoryList() );

	self.selectedCategory = ko.observable(self.categoryList()[2]);

	self.isEdited = ko.observable(false);

	self.editProduct = function(item) {
		item.isEditable(true);
		self.isEdited(true);
	};

	self.saveChange = function() {
		processChange( SAVE_CHANGE );
		self.isEdited(false);
	};

	self.cancelChange = function() {
		processChange( CANCEL_CHANGE );
		self.isEdited(false);
	};

	self.addProduct = function() {
		addNewProduct();
		resetInput();
	};

	self.deleteProduct = function(item) {
		self.selectedCategory().prodList.remove(item);
	};
}

function Category(data) {
	var self = this;

	self.category = ko.observable(data.category);
	self.prodList = ko.observableArray(data.prodList);
}

function Product(data) {
	var self = this;

	self.backUp = new BackUpItem(data, ORIGINAL_DATA);

	self.prodId = ko.observable(data.prodId);
	self.prodName = ko.observable(data.prodName);
	self.prodDesc = ko.observable(data.prodDesc);
	self.createdAt = ko.observable(data.createdAt);
	self.updatedAt = ko.observable(data.updatedAt);

	self.isEditable = ko.observable(false);

	self.restoreProduct = function() {
		restoreItem( self );
	};

	self.newBackUp = function() {
		self.backUp = new BackUpItem(self, SAVE_CHANGE);
	};
}

function BackUpItem(data, transactType ) {
	this.prodId = transactType == ORIGINAL_DATA ? data.prodId : data.prodId();
	this.prodName = transactType == ORIGINAL_DATA ? data.prodName : data.prodName(); 
	this.prodDesc = transactType == ORIGINAL_DATA ? data.prodDesc : data.prodDesc();
}

function initCategoryList() {
	var categoryOptions = ["Gadgets", "Books", "Jewelries", "Clothing"];
	var categoryList = [];


	for(var i = 0; i < categoryOptions.length; i++) {
		var category = categoryOptions[i];
		var prodList = $.map(getProductList(category), function(item) {
							return new Product(item);
						});

		var categoryObj = { category: category,
							prodList: prodList};

		categoryList[i] = new Category( categoryObj );
	}

	return categoryList;


}

function getProductList(category) {
	var prodArr = [];

	for(var i = 0; i < 10; i++) {
		var prodObj = { prodId: i, 
						prodName: "Prod" + i + " - " + category,
						prodDesc: "A test product for category " + category + " - " + i,
						createdAt: new Date.today().toString('d-MMM-yyyy'),
						updatedAt: new Date.today().toString('d-MMM-yyyy'),
					  };

		prodArr[i] = prodObj;
	}

	return prodArr;
}

function processChange(event) {
	var prodList = productViewModel.selectedCategory().prodList();

	for(var i = 0; i < prodList.length; i++) {
		var product = prodList[i];
		product.isEditable(false);

		if(event == CANCEL_CHANGE) {
			product.restoreProduct();
		} else {
			product.newBackUp();
		}
	}
}


function restoreItem( data ) {
	data.prodId(data.backUp.prodId);
	data.prodName(data.backUp.prodName);
	data.prodDesc(data.backUp.prodDesc);
}

function addNewProduct() {
	var prodName = $("#productName").val();
	var prodDesc = $("#productDesc").val();
	var prodList = productViewModel.selectedCategory().prodList;

	if(prodName == "" || prodDesc == "" ) {
		return;
	}

	var lastId = prodList()[prodList().length - 1].prodId();

	var productId = ++lastId;
	var newProduct = { prodId: productId, 
					   prodName: prodName, 
					   prodDesc: prodDesc,
					   createdAt: new Date.today().toString('d-MMM-yyyy'),
					   updatedAt: new Date.today().toString('d-MMM-yyyy'),
					 };

	prodList().push(new Product(newProduct));
	prodList.valueHasMutated();
}

function resetInput() {
	$("#productName").val("");
	$("#productDesc").val("")
}
