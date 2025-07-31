import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Orders: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      products: 3,
      total: '$1,249.97',
      status: 'Completed',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      products: 1,
      total: '$1,299.99',
      status: 'Processing',
      date: '2024-01-14',
      paymentMethod: 'PayPal',
    },
    {
      id: '#ORD-003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      products: 2,
      total: '$849.98',
      status: 'Shipped',
      date: '2024-01-13',
      paymentMethod: 'Credit Card',
    },
    {
      id: '#ORD-004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      products: 1,
      total: '$249.99',
      status: 'Pending',
      date: '2024-01-12',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: '#ORD-005',
      customer: 'Charlie Davis',
      email: 'charlie@example.com',
      products: 4,
      total: '$1,899.96',
      status: 'Cancelled',
      date: '2024-01-11',
      paymentMethod: 'Credit Card',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-admin-success/20 text-admin-success">Completed</Badge>;
      case 'Processing':
        return <Badge className="bg-admin-warning/20 text-admin-warning">Processing</Badge>;
      case 'Shipped':
        return <Badge className="bg-admin-primary/20 text-admin-primary">Shipped</Badge>;
      case 'Pending':
        return <Badge className="bg-gray-500/20 text-gray-500">Pending</Badge>;
      case 'Cancelled':
        return <Badge className="bg-admin-danger/20 text-admin-danger">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{t('orders')}</h1>
          <p className="text-text-secondary mt-2">
            Manage customer orders and transactions
          </p>
        </div>
        <Button variant="outline" className="border-card-border">
          <Download className="w-4 h-4 mr-2" />
          {t('export')}
        </Button>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="text-text-primary">Order Management</CardTitle>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                placeholder={t('search') + ' orders...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-input-border focus:border-input-focus"
              />
            </div>
            <Button variant="outline" className="border-card-border">
              <Filter className="w-4 h-4 mr-2" />
              {t('filter')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-text-secondary">Order ID</TableHead>
                <TableHead className="text-text-secondary">Customer</TableHead>
                <TableHead className="text-text-secondary">Products</TableHead>
                <TableHead className="text-text-secondary">Total</TableHead>
                <TableHead className="text-text-secondary">{t('status')}</TableHead>
                <TableHead className="text-text-secondary">Date</TableHead>
                <TableHead className="text-text-secondary">Payment</TableHead>
                <TableHead className="text-text-secondary">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-text-primary">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-text-primary">{order.customer}</p>
                      <p className="text-sm text-text-secondary">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {order.products} items
                  </TableCell>
                  <TableCell className="text-text-primary font-medium">
                    {order.total}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;