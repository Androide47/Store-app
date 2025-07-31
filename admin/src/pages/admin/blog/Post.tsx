import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Image as ImageIcon, Save } from 'lucide-react';

interface BlogPost {
  id?: number;
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string;
}

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<BlogPost>({
    title: '',
    description: '',
    content: '',
    author: '',
    tags: ''
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: post.content,
    onUpdate: ({ editor }) => {
      setPost(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (id && id !== 'new') {
      // Fetch blog post data
      fetchBlogPost(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    if (editor && post.content) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post.content]);

  const fetchBlogPost = async (blogId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/blogs/${blogId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }

      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setPost(prev => ({ ...prev, tags: value }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:8000/blogs/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      return data.image_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        const imageUrl = await handleImageUpload(file);
        
        if (imageUrl && editor) {
          editor.chain().focus().setImage({ src: imageUrl }).run();
        }
      }
    };
    input.click();
  };

  const saveBlogPost = async () => {
    try {
      setLoading(true);
      const url = id && id !== 'new' 
        ? `http://127.0.0.1:8000/blogs/${id}` 
        : 'http://127.0.0.1:8000/blogs/new_blog';
      
      const method = id && id !== 'new' ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog post');
      }

      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/blog')}
          className="p-0 h-auto"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-text-primary">
          {id && id !== 'new' ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={post.description}
              onChange={handleInputChange}
              placeholder="Enter a short description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={post.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Category</Label>
            <Select value={post.tags} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Content</CardTitle>
          <Button onClick={addImage} variant="outline" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Add Image
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 min-h-[400px]">
            <EditorContent editor={editor} className="prose max-w-none" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={saveBlogPost} 
          disabled={loading}
          className="bg-admin-primary hover:bg-admin-primary-dark flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {loading ? 'Saving...' : 'Save Post'}
        </Button>
      </div>
    </div>
  );
};

export default Post;