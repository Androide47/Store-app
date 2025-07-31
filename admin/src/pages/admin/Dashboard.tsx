import React from 'react';
import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const statsCards = [
    {
      title: t('totalProducts'),
      value: '1,234',
      change: '+12%',
      icon: Package,
      color: 'text-admin-primary',
    },
    {
      title: t('totalOrders'),
      value: '456',
      change: '+8%',
      icon: ShoppingCart,
      color: 'text-admin-success',
    },
    {
      title: t('totalRevenue'),
      value: '$12,345',
      change: '+15%',
      icon: DollarSign,
      color: 'text-admin-warning',
    },
    {
      title: t('newCustomers'),
      value: '89',
      change: '+5%',
      icon: Users,
      color: 'text-admin-danger',
    },
  ];

  const recentOrders = [
    { id: '#001', customer: 'John Doe', product: 'iPhone 14', amount: '$999', status: 'Completed' },
    { id: '#002', customer: 'Jane Smith', product: 'MacBook Pro', amount: '$1,299', status: 'Processing' },
    { id: '#003', customer: 'Bob Johnson', product: 'iPad Air', amount: '$599', status: 'Shipped' },
    { id: '#004', customer: 'Alice Brown', product: 'AirPods Pro', amount: '$249', status: 'Pending' },
  ];

  const topProducts = [
    { name: 'iPhone 14', sales: 234, revenue: '$233,766' },
    { name: 'MacBook Pro', sales: 123, revenue: '$159,777' },
    { name: 'iPad Air', sales: 98, revenue: '$58,702' },
    { name: 'AirPods Pro', sales: 87, revenue: '$21,663' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t('dashboard')}</h1>
        <p className="text-text-secondary mt-2">
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <p className="text-xs text-admin-success flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="text-text-primary">{t('recentOrders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium text-text-primary">{order.id}</p>
                    <p className="text-sm text-text-secondary">{order.customer}</p>
                    <p className="text-sm text-text-muted">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text-primary">{order.amount}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-admin-success/20 text-admin-success'
                          : order.status === 'Processing'
                          ? 'bg-admin-warning/20 text-admin-warning'
                          : order.status === 'Shipped'
                          ? 'bg-admin-primary/20 text-admin-primary'
                          : 'bg-admin-danger/20 text-admin-danger'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="text-text-primary">{t('topProducts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium text-text-primary">{product.name}</p>
                    <p className="text-sm text-text-secondary">{product.sales} sales</p>
                  </div>
                  <p className="font-medium text-text-primary">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;