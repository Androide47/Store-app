import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar } from 'lucide-react';
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

const BlogPosts: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const posts = [
    {
      id: 1,
      title: 'Getting Started with React and TypeScript',
      slug: 'getting-started-react-typescript',
      author: 'John Doe',
      status: 'Published',
      publishDate: '2024-01-15',
      views: 1250,
      category: 'Technology',
      featured: true,
      excerpt: 'A comprehensive guide to building modern web applications with React and TypeScript.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'The Future of Web Development',
      slug: 'future-web-development',
      author: 'Jane Smith',
      status: 'Published',
      publishDate: '2024-01-14',
      views: 890,
      category: 'Technology',
      featured: false,
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Building Scalable APIs with Node.js',
      slug: 'scalable-apis-nodejs',
      author: 'Bob Johnson',
      status: 'Draft',
      publishDate: null,
      views: 0,
      category: 'Backend',
      featured: false,
      excerpt: 'Learn how to build robust and scalable APIs using Node.js and Express.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      title: 'UI/UX Design Best Practices',
      slug: 'ui-ux-design-best-practices',
      author: 'Alice Brown',
      status: 'Published',
      publishDate: '2024-01-12',
      views: 567,
      category: 'Design',
      featured: true,
      excerpt: 'Essential design principles for creating user-friendly interfaces.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
    },
    {
      id: 5,
      title: 'Mobile App Development Trends',
      slug: 'mobile-app-development-trends',
      author: 'Charlie Davis',
      status: 'Scheduled',
      publishDate: '2024-01-20',
      views: 0,
      category: 'Mobile',
      featured: false,
      excerpt: 'Discover the latest trends in mobile application development.',
      image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=300&h=200&fit=crop',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge className="bg-admin-success/20 text-admin-success">Published</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-500/20 text-gray-500">Draft</Badge>;
      case 'Scheduled':
        return <Badge className="bg-admin-primary/20 text-admin-primary">Scheduled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      Technology: 'bg-blue-500/20 text-blue-600',
      Backend: 'bg-green-500/20 text-green-600',
      Design: 'bg-purple-500/20 text-purple-600',
      Mobile: 'bg-orange-500/20 text-orange-600',
    };
    return <Badge className={colors[category as keyof typeof colors] || ''}>{category}</Badge>;
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Blog Posts</h1>
          <p className="text-text-secondary mt-2">
            Create and manage your blog content
          </p>
        </div>
        <Button 
          className="bg-admin-primary hover:bg-admin-primary-dark"
          onClick={() => window.location.href = '/admin/blog/post/new'}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total Posts</p>
                <p className="text-2xl font-bold text-text-primary">45</p>
              </div>
              <div className="h-8 w-8 bg-admin-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📝</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Published</p>
                <p className="text-2xl font-bold text-text-primary">38</p>
              </div>
              <div className="h-8 w-8 bg-admin-success rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Drafts</p>
                <p className="text-2xl font-bold text-text-primary">5</p>
              </div>
              <div className="h-8 w-8 bg-gray-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total Views</p>
                <p className="text-2xl font-bold text-text-primary">12.5K</p>
              </div>
              <Eye className="h-8 w-8 text-admin-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="text-text-primary">Blog Management</CardTitle>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                placeholder="Search posts..."
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
                <TableHead className="text-text-secondary">Post</TableHead>
                <TableHead className="text-text-secondary">Author</TableHead>
                <TableHead className="text-text-secondary">Category</TableHead>
                <TableHead className="text-text-secondary">{t('status')}</TableHead>
                <TableHead className="text-text-secondary">Published</TableHead>
                <TableHead className="text-text-secondary">Views</TableHead>
                <TableHead className="text-text-secondary">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-text-primary flex items-center">
                          {post.title}
                          {post.featured && (
                            <span className="ml-2 text-admin-warning">⭐</span>
                          )}
                        </p>
                        <p className="text-sm text-text-secondary truncate max-w-xs">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {post.author}
                  </TableCell>
                  <TableCell>
                    {getCategoryBadge(post.category)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(post.status)}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {post.publishDate || '-'}
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {post.views.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => window.location.href = `/admin/blog/post/${post.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {post.status === 'Draft' && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-admin-primary">
                          <Calendar className="h-4 w-4" />
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

export default BlogPosts;