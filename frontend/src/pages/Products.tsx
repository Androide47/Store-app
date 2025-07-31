import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, Grid, List } from 'lucide-react';

export const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "electronics",
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      category: "electronics",
      description: "Advanced fitness tracking with heart rate monitor"
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      category: "accessories",
      description: "Durable laptop backpack with multiple compartments"
    },
    {
      id: 4,
      name: "Wireless Mouse",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 203,
      category: "electronics",
      description: "Ergonomic wireless mouse with precision tracking"
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 78,
      category: "fashion",
      description: "Comfortable running shoes with advanced cushioning"
    },
    {
      id: 6,
      name: "Coffee Maker",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 92,
      category: "home",
      description: "Programmable coffee maker with thermal carafe"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const filteredProducts = products.filter(product => 
    filterCategory === 'all' || product.category === filterCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">View:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group ${
                viewMode === 'list' ? 'flex gap-6 p-6' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'rounded-t-lg'
              }`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === 'list' ? 'w-full h-full rounded-lg' : 'w-full h-48'
                  }`}
                />
                {product.originalPrice > product.price && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    Sale
                  </div>
                )}
              </div>
              <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                {viewMode === 'list' && (
                  <p className="text-gray-600 mb-4">{product.description}</p>
                )}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {viewMode === 'list' && (
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Results Info */}
        <div className="mt-8 text-center text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
    </div>
  );
};