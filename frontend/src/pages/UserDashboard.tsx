import React, { useState } from 'react';
import { User, Mail, Calendar, Package, DollarSign, ShoppingBag, Heart, Edit3, Save, X, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { User as UserType } from '../types/auth';

export const UserDashboard: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  // Mock orders data - in a real app, this would come from an API
  const orders = [
    {
      id: '1',
      date: '2024-01-15',
      total: 129.99,
      status: 'Delivered',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
        { name: 'Phone Case', quantity: 2, price: 25.00 }
      ]
    },
    {
      id: '2',
      date: '2024-01-10',
      total: 89.99,
      status: 'Shipped',
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 89.99 }
      ]
    },
    {
      id: '3',
      date: '2024-01-05',
      total: 199.99,
      status: 'Processing',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 199.99 }
      ]
    },
    {
      id: '4',
      date: '2023-12-28',
      total: 45.99,
      status: 'Delivered',
      items: [
        { name: 'USB Cable', quantity: 3, price: 15.33 }
      ]
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'Shipped':
        return 'text-orange-600 bg-orange-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const recentOrders = orders.slice(0, 3);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
          <p className="mt-2 text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {user.firstName}! Here's your account overview.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                    >
                      <Save className="h-3 w-3 mr-1" />
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-2xl">
                      {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || 'N'}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                </div>
              </div>

              {/* Profile Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{user.firstName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{user.lastName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Orders and Statistics Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Spent</p>
                    <p className="text-2xl font-semibold text-gray-900">${totalSpent.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Wishlist Items</p>
                    <p className="text-2xl font-semibold text-gray-900">5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                  <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                    View All Orders
                  </button>
                </div>
              </div>
              <div className="p-6">
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h4 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Start shopping to see your orders here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">
                                Order #{order.id}
                              </h4>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(order.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              ${order.total.toFixed(2)}
                            </div>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-3">
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center text-xs">
                                <div className="flex items-center">
                                  <span className="text-gray-900">{item.name}</span>
                                  <span className="text-gray-500 ml-2">× {item.quantity}</span>
                                </div>
                                <span className="text-gray-900 font-medium">
                                  ${item.price.toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <button className="text-orange-600 hover:text-orange-700 text-xs font-medium">
                              View Details
                            </button>
                            {order.status === 'Delivered' && (
                              <button className="text-orange-600 hover:text-orange-700 text-xs font-medium">
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border border-orange-300 rounded-lg text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Continue Shopping
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 mr-2" />
                  View Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};