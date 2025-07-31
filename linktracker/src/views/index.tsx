import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, AlertCircle, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Header } from '../components/Header';

interface Order {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'delayed';
  customerName: string;
  destination: string;
  estimatedDelivery: string;
  lastUpdate: string;
  currentLocation?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    trackingNumber: 'TRK001234567',
    status: 'in_transit',
    customerName: 'John Smith',
    destination: 'New York, NY',
    estimatedDelivery: '2024-01-15',
    lastUpdate: '2 hours ago',
    currentLocation: 'Philadelphia, PA'
  },
  {
    id: '2',
    trackingNumber: 'TRK001234568',
    status: 'delivered',
    customerName: 'Sarah Johnson',
    destination: 'Los Angeles, CA',
    estimatedDelivery: '2024-01-12',
    lastUpdate: '1 day ago',
    currentLocation: 'Los Angeles, CA'
  },
  {
    id: '3',
    trackingNumber: 'TRK001234569',
    status: 'shipped',
    customerName: 'Mike Davis',
    destination: 'Chicago, IL',
    estimatedDelivery: '2024-01-16',
    lastUpdate: '4 hours ago',
    currentLocation: 'Indianapolis, IN'
  },
  {
    id: '4',
    trackingNumber: 'TRK001234570',
    status: 'delayed',
    customerName: 'Emily Wilson',
    destination: 'Miami, FL',
    estimatedDelivery: '2024-01-18',
    lastUpdate: '6 hours ago',
    currentLocation: 'Atlanta, GA'
  },
  {
    id: '5',
    trackingNumber: 'TRK001234571',
    status: 'processing',
    customerName: 'David Brown',
    destination: 'Seattle, WA',
    estimatedDelivery: '2024-01-20',
    lastUpdate: '1 hour ago',
    currentLocation: 'Warehouse'
  }
];

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'processing':
      return <Package className="h-5 w-5 text-blue-500" />;
    case 'shipped':
    case 'in_transit':
      return <Truck className="h-5 w-5 text-orange-500" />;
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'delayed':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Package className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
    case 'in_transit':
      return 'bg-orange-100 text-orange-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'delayed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTheme();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    navigate(`/order/${order.id}`);
  };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('shipmentTracking')}
                    </h1>
                    <p className="text-gray-600">
                        Monitor and track all your shipments in real-time
                    </p>
                </div>

                {/* Orders List */}
                <div className="bg-beige rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">{t('allOrders')}</h2>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                        {mockOrders.map((order) => (
                            <div
                                key={order.id}
                                onClick={() => handleOrderClick(order)}
                                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {getStatusIcon(order.status)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3 mb-1">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {order.trackingNumber}
                                                </p>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">{order.customerName}</span> • {order.destination}
                                            </p>
                                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                                <div className="flex items-center space-x-1">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{order.currentLocation || t('unknown')}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{t('updated')} {order.lastUpdate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-900 font-medium">
                                            {t('estDelivery')}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <div className="bg-beige rounded-lg shadow-sm p-4">
                        <div className="flex items-center">
                            <Package className="h-8 w-8 text-blue-600" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">{t('totalOrders')}</p>
                                <p className="text-2xl font-bold text-gray-900">{mockOrders.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-beige rounded-lg shadow-sm p-4">
                        <div className="flex items-center">
                            <Truck className="h-8 w-8 text-orange-600" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">{t('inTransit')}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {mockOrders.filter(o => o.status === 'in_transit' || o.status === 'shipped').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-beige rounded-lg shadow-sm p-4">
                        <div className="flex items-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">{t('delivered')}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {mockOrders.filter(o => o.status === 'delivered').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-beige rounded-lg shadow-sm p-4">
                        <div className="flex items-center">
                            <AlertCircle className="h-8 w-8 text-red-600" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">{t('delayed')}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {mockOrders.filter(o => o.status === 'delayed').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
