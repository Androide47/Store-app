import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Send, Eye, BarChart3 } from 'lucide-react';
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

const Campaigns: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const campaigns = [
    {
      id: 1,
      name: 'Black Friday Sale 2024',
      subject: '🔥 50% Off Everything - Limited Time!',
      recipients: 12500,
      sent: '2024-01-15',
      status: 'Sent',
      openRate: '24.5%',
      clickRate: '8.2%',
      type: 'Promotional',
    },
    {
      id: 2,
      name: 'Welcome Series - Part 1',
      subject: 'Welcome to our community!',
      recipients: 890,
      sent: '2024-01-14',
      status: 'Sent',
      openRate: '45.2%',
      clickRate: '12.8%',
      type: 'Welcome',
    },
    {
      id: 3,
      name: 'Product Launch - iPhone 15',
      subject: 'Introducing the new iPhone 15',
      recipients: 8750,
      sent: null,
      status: 'Draft',
      openRate: '-',
      clickRate: '-',
      type: 'Product',
    },
    {
      id: 4,
      name: 'Customer Survey',
      subject: 'Help us improve - 2 min survey',
      recipients: 5200,
      sent: '2024-01-12',
      status: 'Sent',
      openRate: '18.9%',
      clickRate: '5.4%',
      type: 'Survey',
    },
    {
      id: 5,
      name: 'Holiday Newsletter',
      subject: 'Holiday wishes from our team',
      recipients: 15000,
      sent: null,
      status: 'Scheduled',
      openRate: '-',
      clickRate: '-',
      type: 'Newsletter',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Sent':
        return <Badge className="bg-admin-success/20 text-admin-success">Sent</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-500/20 text-gray-500">Draft</Badge>;
      case 'Scheduled':
        return <Badge className="bg-admin-primary/20 text-admin-primary">Scheduled</Badge>;
      case 'Sending':
        return <Badge className="bg-admin-warning/20 text-admin-warning">Sending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      Promotional: 'bg-purple-500/20 text-purple-600',
      Welcome: 'bg-green-500/20 text-green-600',
      Product: 'bg-blue-500/20 text-blue-600',
      Survey: 'bg-orange-500/20 text-orange-600',
      Newsletter: 'bg-pink-500/20 text-pink-600',
    };
    return <Badge className={colors[type as keyof typeof colors] || ''}>{type}</Badge>;
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{t('campaigns')}</h1>
          <p className="text-text-secondary mt-2">
            Create and manage email marketing campaigns
          </p>
        </div>
        <Button className="bg-admin-primary hover:bg-admin-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          {t('createCampaign')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total Campaigns</p>
                <p className="text-2xl font-bold text-text-primary">24</p>
              </div>
              <Send className="h-8 w-8 text-admin-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-text-primary">26.8%</p>
              </div>
              <Eye className="h-8 w-8 text-admin-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Avg. Click Rate</p>
                <p className="text-2xl font-bold text-text-primary">8.9%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-admin-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total Subscribers</p>
                <p className="text-2xl font-bold text-text-primary">18,340</p>
              </div>
              <div className="h-8 w-8 bg-admin-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">@</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="text-text-primary">Campaign Management</CardTitle>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                placeholder={t('search') + ' campaigns...'}
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
                <TableHead className="text-text-secondary">Campaign Name</TableHead>
                <TableHead className="text-text-secondary">Subject</TableHead>
                <TableHead className="text-text-secondary">Type</TableHead>
                <TableHead className="text-text-secondary">Recipients</TableHead>
                <TableHead className="text-text-secondary">{t('status')}</TableHead>
                <TableHead className="text-text-secondary">Open Rate</TableHead>
                <TableHead className="text-text-secondary">Click Rate</TableHead>
                <TableHead className="text-text-secondary">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-text-primary">
                    {campaign.name}
                  </TableCell>
                  <TableCell className="text-text-secondary max-w-xs truncate">
                    {campaign.subject}
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(campaign.type)}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {campaign.recipients.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(campaign.status)}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {campaign.openRate}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {campaign.clickRate}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {campaign.status === 'Draft' && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-admin-primary">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
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

export default Campaigns;