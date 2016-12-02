<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Http\ReflectionClass;

class CategoryController extends Controller
{
    function category() {

    	$category = Category::all();
		return $category;
    }

}
