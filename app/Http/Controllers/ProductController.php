<?php

namespace App\Http\Controllers;

use App\Enums\ProductStatus;
use App\Models\Product;
use Illuminate\View\View;
use App\Enums\ProductType;

class ProductController extends Controller
{
    public function index(): View
    {
        return view('shop.index', [
            'products' => Product::whereIn('status', [ProductStatus::Active, ProductStatus::ComingSoon])
                ->latest()
                ->get(),
            'types' => ProductType::cases(),
        ]);
    }

    public function show(Product $product): View
    {
        abort_if($product->status === ProductStatus::Draft, 404);

        return view('shop.show', [
            'product' => $product,
            'related' => Product::whereIn('status', [ProductStatus::Active, ProductStatus::ComingSoon])
                ->whereKeyNot($product->id)
                ->latest()
                ->take(4)
                ->get(),
        ]);
    }
}
