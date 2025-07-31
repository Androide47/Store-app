import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Header } from '../components/Header';

interface Order {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'delayed';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  destination: string;
  origin: string;
  estimatedDelivery: string;
  lastUpdate: string;
  currentLocation: {
    name: string;
    lat: number;
    lng: number;
  };
  route: {
    name: string;
    lat: number;
    lng: number;
    timestamp: string;
    status: string;
  }[];
}

const mockOrderDetail: Order = {
  id: '1',
  trackingNumber: 'TRK001234567',
  status: 'in_transit',
  customerName: 'John Smith',
  customerPhone: '+1 (555) 123-4567',
  customerEmail: 'john.smith@email.com',
  destination: 'New York, NY',
  origin: 'Los Angeles, CA',
  estimatedDelivery: '2024-01-15',
  lastUpdate: '2 hours ago',
  currentLocation: {
    name: 'Philadelphia, PA',
    lat: 39.9526,
    lng: -75.1652
  },
  route: [
    {
      name: 'Los Angeles, CA - Origin',
      lat: 34.0522,
      lng: -118.2437,
      timestamp: '2024-01-10 08:00',
      status: 'completed'
    },
    {
      name: 'Phoenix, AZ - Transit Hub',
      lat: 33.4484,
      lng: -112.0740,
      timestamp: '2024-01-11 14:30',
      status: 'completed'
    },
    {
      name: 'Denver, CO - Transit Hub',
      lat: 39.7392,
      lng: -104.9903,
      timestamp: '2024-01-12 09:15',
      status: 'completed'
    },
    {
      name: 'Chicago, IL - Transit Hub',
      lat: 41.8781,
      lng: -87.6298,
      timestamp: '2024-01-13 16:45',
      status: 'completed'
    },
    {
      name: 'Philadelphia, PA - Current',
      lat: 39.9526,
      lng: -75.1652,
      timestamp: '2024-01-14 11:20',
      status: 'current'
    },
    {
      name: 'New York, NY - Destination',
      lat: 40.7128,
      lng: -74.0060,
      timestamp: '2024-01-15 15:00',
      status: 'pending'
    }
  ]
};

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-6 w-6 text-yellow-500" />;
    case 'processing':
      return <Package className="h-6 w-6 text-blue-500" />;
    case 'shipped':
    case 'in_transit':
      return <Truck className="h-6 w-6 text-orange-500" />;
    case 'delivered':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case 'delayed':
      return <AlertCircle className="h-6 w-6 text-red-500" />;
    default:
      return <Package className="h-6 w-6 text-gray-500" />;
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

const LiveMap = ({ order }: { order: Order }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { t } = useTheme();

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-beige rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('liveTrackingMap')}</h3>
      
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        {!mapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('loadingMap')}</p>
            </div>
          </div>
        ) : (
          <div className="relative h-full">
            {/* Simulated map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
              {/* Route visualization */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Route line */}
                <polyline
                  points="50,300 150,250 250,200 350,150 450,100 550,50"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                
                {/* Location markers */}
                {order.route.map((location, index) => {
                  const x = 50 + (index * 100);
                  const y = 300 - (index * 50);
                  
                  return (
                    <g key={index}>
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill={location.status === 'completed' ? '#16a34a' : 
                              location.status === 'current' ? '#ea580c' : '#6b7280'}
                        className={location.status === 'current' ? 'animate-pulse' : ''}
                      />
                      <text
                        x={x}
                        y={y + 25}
                        textAnchor="middle"
                        className="text-xs fill-gray-700 font-medium"
                      >
                        {location.name.split(' - ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {/* Current location indicator */}
            <div className="absolute top-4 right-4 bg-beige rounded-lg shadow-md p-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900">
                  {order.currentLocation.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>🚚 {t('packageCurrentlyIn')} <strong>{order.currentLocation.name}</strong></p>
        <p>📍 {t('nextStop')}: New York, NY ({t('estimatedArrival')}: {new Date(order.estimatedDelivery).toLocaleDateString()})</p>
      </div>
    </div>
  );
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order] = useState<Order>(mockOrderDetail);
  const { t } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToOrders')}
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('orderNumber')} {order.trackingNumber}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('trackingDetailsAndLocation')}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {getStatusIcon(order.status)}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer Information */}
            <div className="bg-beige rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('customerInformation')}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">{t('name')}</p>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('phone')}</p>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="font-medium text-gray-900">{order.customerPhone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('email')}</p>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="font-medium text-gray-900">{order.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-beige rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('shippingInformation')}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">{t('origin')}</p>
                  <p className="font-medium text-gray-900">{order.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('destination')}</p>
                  <p className="font-medium text-gray-900">{order.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('estimatedDelivery')}</p>
                  <p className="font-medium text-gray-900">
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('lastUpdate')}</p>
                  <p className="font-medium text-gray-900">{order.lastUpdate}</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-beige rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('trackingTimeline')}</h3>
              <div className="space-y-4">
                {order.route.map((location, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                      location.status === 'completed' ? 'bg-green-500' :
                      location.status === 'current' ? 'bg-orange-500 animate-pulse' :
                      'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        location.status === 'current' ? 'text-orange-600' : 'text-gray-900'
                      }`}>
                        {location.name}
                      </p>
                      <p className="text-xs text-gray-500">{location.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Map */}
          <div className="lg:col-span-2">
            <LiveMap order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;