<?php

namespace App;

use App\Product;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';
    protected $primaryKey = 'category_id';

    public function products() {
    	return $this->hasMany(Product::class, 'category_id');
    }
}
