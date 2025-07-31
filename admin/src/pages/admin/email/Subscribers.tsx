import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Download, UserPlus, Mail } from 'lucide-react';
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

const Subscribers: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const subscribers = [
    {
      id: 1,
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      status: 'Active',
      subscribeDate: '2024-01-15',
      tags: ['Customer', 'Premium'],
      totalOpens: 24,
      totalClicks: 8,
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      status: 'Active',
      subscribeDate: '2024-01-14',
      tags: ['Customer'],
      totalOpens: 18,
      totalClicks: 5,
    },
    {
      id: 3,
      email: 'bob.johnson@example.com',
      firstName: 'Bob',
      lastName: 'Johnson',
      status: 'Unsubscribed',
      subscribeDate: '2024-01-13',
      tags: ['Lead'],
      totalOpens: 12,
      totalClicks: 2,
    },
    {
      id: 4,
      email: 'alice.brown@example.com',
      firstName: 'Alice',
      lastName: 'Brown',
      status: 'Active',
      subscribeDate: '2024-01-12',
      tags: ['Customer', 'VIP'],
      totalOpens: 45,
      totalClicks: 18,
    },
    {
      id: 5,
      email: 'charlie.davis@example.com',
      firstName: 'Charlie',
      lastName: 'Davis',
      status: 'Bounced',
      subscribeDate: '2024-01-11',
      tags: ['Lead'],
      totalOpens: 0,
      totalClicks: 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-admin-success/20 text-admin-success">Active</Badge>;
      case 'Unsubscribed':
        return <Badge className="bg-admin-danger/20 text-admin-danger">Unsubscribed</Badge>;
      case 'Bounced':
        return <Badge className="bg-admin-warning/20 text-admin-warning">Bounced</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTagBadge = (tag: string) => {
    const colors = {
      Customer: 'bg-blue-500/20 text-blue-600',
      Premium: 'bg-purple-500/20 text-purple-600',
      VIP: 'bg-yellow-500/20 text-yellow-600',
      Lead: 'bg-green-500/20 text-green-600',
    };
    return (
      <Badge key={tag} className={`mr-1 ${colors[tag as keyof typeof colors] || ''}`}>
        {tag}
      </Badge>
    );
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{t('subscribers')}</h1>
          <p className="text-text-secondary mt-2">
            Manage your email subscriber list
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-card-border">
            <Download className="w-4 h-4 mr-2" />
            {t('export')}
          </Button>
          <Button className="bg-admin-primary hover:bg-admin-primary-dark">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Subscriber
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total Subscribers</p>
                <p className="text-2xl font-bold text-text-primary">18,340</p>
              </div>
              <UserPlus className="h-8 w-8 text-admin-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Active</p>
                <p className="text-2xl font-bold text-text-primary">17,245</p>
              </div>
              <div className="h-8 w-8 bg-admin-success rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Unsubscribed</p>
                <p className="text-2xl font-bold text-text-primary">892</p>
              </div>
              <div className="h-8 w-8 bg-admin-danger rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Bounced</p>
                <p className="text-2xl font-bold text-text-primary">203</p>
              </div>
              <div className="h-8 w-8 bg-admin-warning rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="text-text-primary">Subscriber Management</CardTitle>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                placeholder={t('search') + ' subscribers...'}
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
                <TableHead className="text-text-secondary">Email</TableHead>
                <TableHead className="text-text-secondary">Name</TableHead>
                <TableHead className="text-text-secondary">{t('status')}</TableHead>
                <TableHead className="text-text-secondary">Tags</TableHead>
                <TableHead className="text-text-secondary">Subscribed</TableHead>
                <TableHead className="text-text-secondary">Opens</TableHead>
                <TableHead className="text-text-secondary">Clicks</TableHead>
                <TableHead className="text-text-secondary">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-text-primary">
                    {subscriber.email}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {subscriber.firstName} {subscriber.lastName}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(subscriber.status)}
                  </TableCell>
                  <TableCell>
                    {subscriber.tags.map(tag => getTagBadge(tag))}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {subscriber.subscribeDate}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {subscriber.totalOpens}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {subscriber.totalClicks}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Mail className="h-4 w-4" />
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

export default Subscribers;