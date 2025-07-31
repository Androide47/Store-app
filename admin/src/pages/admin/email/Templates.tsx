import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Templates: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 1,
      name: 'Welcome Email',
      subject: 'Welcome to {{company_name}}!',
      category: 'Welcome',
      lastModified: '2024-01-15',
      usage: 45,
      thumbnail: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Product Launch',
      subject: 'Introducing {{product_name}}',
      category: 'Product',
      lastModified: '2024-01-14',
      usage: 12,
      thumbnail: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Promotional Sale',
      subject: '🔥 {{discount}}% Off - Limited Time!',
      category: 'Promotional',
      lastModified: '2024-01-13',
      usage: 78,
      thumbnail: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'Order Confirmation',
      subject: 'Order #{{order_number}} Confirmed',
      category: 'Transactional',
      lastModified: '2024-01-12',
      usage: 234,
      thumbnail: '/placeholder.svg',
    },
    {
      id: 5,
      name: 'Newsletter Monthly',
      subject: '{{month}} Newsletter - What\'s New',
      category: 'Newsletter',
      lastModified: '2024-01-11',
      usage: 24,
      thumbnail: '/placeholder.svg',
    },
    {
      id: 6,
      name: 'Password Reset',
      subject: 'Reset Your Password',
      category: 'Transactional',
      lastModified: '2024-01-10',
      usage: 67,
      thumbnail: '/placeholder.svg',
    },
  ];

  const getCategoryBadge = (category: string) => {
    const colors = {
      Welcome: 'bg-green-500/20 text-green-600',
      Product: 'bg-blue-500/20 text-blue-600',
      Promotional: 'bg-purple-500/20 text-purple-600',
      Transactional: 'bg-orange-500/20 text-orange-600',
      Newsletter: 'bg-pink-500/20 text-pink-600',
    };
    return <Badge className={colors[category as keyof typeof colors] || ''}>{category}</Badge>;
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{t('templates')}</h1>
          <p className="text-text-secondary mt-2">
            Create and manage email templates
          </p>
        </div>
        <Button className="bg-admin-primary hover:bg-admin-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="text-text-primary">Template Library</CardTitle>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                placeholder={t('search') + ' templates...'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="border-card-border hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted flex items-center justify-center border-b border-card-border">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-text-primary">{template.name}</h3>
                      {getCategoryBadge(template.category)}
                    </div>
                    <p className="text-sm text-text-secondary mb-3 truncate">
                      {template.subject}
                    </p>
                    <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                      <span>Modified: {template.lastModified}</span>
                      <span>Used {template.usage} times</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-admin-danger hover:text-admin-danger">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;