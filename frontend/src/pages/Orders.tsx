import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Package, Calendar, DollarSign } from 'lucide-react';

export const Orders: React.FC = () => {
  const { user } = useAuth();

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
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {user?.firstName}! Here are your recent orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start shopping to see your orders here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Order #{order.id}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-lg font-medium text-gray-900">
                        <DollarSign className="h-5 w-5 mr-1" />
                        {order.total.toFixed(2)}
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
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

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                        View Details
                      </button>
                      {order.status === 'Delivered' && (
                        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};