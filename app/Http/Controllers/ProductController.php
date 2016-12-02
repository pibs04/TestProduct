<?php

namespace App\Http\Controllers;

use App\Product;
use App\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    function products($id) {

    	$category = Category::find($id);
    	$products = $category->products;

    	return $products;
    }

    function update($id, $productId, $productName, $productDesc) {

    	$product = Category::find($id)->products->find($productId);

    	$product->product_name = $productName;
    	$product->product_description = $productDesc;

    	$product->save(); 

        return Category::find($id)->products;
    }

    function store(Category $category, $productName, $productDesc) {

        $id = $category->category_id;
        $product = new Product;

        $product->category_id = $id;
        $product->product_name = $productName;
        $product->product_description = $productDesc;

        $category->products()->save($product);

        return Category::find($id)->products;
    }

    function delete(Product $product) {
        $categoryId = $product->category_id;

        $product->delete();

        return Category::find($categoryId)->products;
    }



/*    function add($id) {
        return response()->json([
            'name' => 'Abigail',
            'state' => 'CA'
        ]);
    }*/
}
