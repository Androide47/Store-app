import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
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

const Products: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      category: 'Electronics',
      price: '$999.99',
      stock: 45,
      status: 'Active',
      image: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'MacBook Pro M2',
      category: 'Electronics',
      price: '$1,299.99',
      stock: 23,
      status: 'Active',
      image: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'iPad Air',
      category: 'Electronics',
      price: '$599.99',
      stock: 0,
      status: 'Out of Stock',
      image: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'AirPods Pro',
      category: 'Accessories',
      price: '$249.99',
      stock: 78,
      status: 'Active',
      image: '/placeholder.svg',
    },
    {
      id: 5,
      name: 'Apple Watch',
      category: 'Wearables',
      price: '$399.99',
      stock: 12,
      status: 'Low Stock',
      image: '/placeholder.svg',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-admin-success/20 text-admin-success">Active</Badge>;
      case 'Out of Stock':
        return <Badge className="bg-admin-danger/20 text-admin-danger">Out of Stock</Badge>;
      case 'Low Stock':
        return <Badge className="bg-admin-warning/20 text-admin-warning">Low Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{t('products')}</h1>
          <p className="text-text-secondary mt-2">
            Manage your product inventory
          </p>
        </div>
        <Button className="bg-admin-primary hover:bg-admin-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          {t('addProduct')}
        </Button>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="text-text-primary">Product Management</CardTitle>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                placeholder={t('search') + ' products...'}
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
                <TableHead className="text-text-secondary">Image</TableHead>
                <TableHead className="text-text-secondary">{t('productName')}</TableHead>
                <TableHead className="text-text-secondary">Category</TableHead>
                <TableHead className="text-text-secondary">{t('price')}</TableHead>
                <TableHead className="text-text-secondary">{t('stock')}</TableHead>
                <TableHead className="text-text-secondary">{t('status')}</TableHead>
                <TableHead className="text-text-secondary">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-text-primary">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-text-primary font-medium">
                    {product.price}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-admin-danger hover:text-admin-danger"
                      >
                        <Trash2 className="h-4 w-4" />
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

export default Products;