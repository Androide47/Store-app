import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  Mail,
  Settings,
  Users,
  BarChart3,
  Package,
  ShoppingCart,
  PenTool,
  Calendar,
  FileText,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminSidebar: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    {
      to: '/admin',
      icon: LayoutDashboard,
      label: t('dashboard'),
      end: true,
    },
    {
      to: '/admin/store',
      icon: Store,
      label: t('store'),
      children: [
        { to: '/admin/store/products', icon: Package, label: t('products') },
        { to: '/admin/store/orders', icon: ShoppingCart, label: t('orders') },
      ],
    },
    {
      to: '/admin/blog',
      icon: PenTool,
      label: 'Blog',
      children: [
        { to: '/admin/blog/posts', icon: FileText, label: 'Posts' },
      ],
    },
    {
      to: '/admin/calendar',
      icon: Calendar,
      label: 'Calendar',
      end: true,
    },
    {
      to: '/admin/email',
      icon: Mail,
      label: t('email'),
      children: [
        { to: '/admin/email/campaigns', icon: BarChart3, label: t('campaigns') },
        { to: '/admin/email/templates', icon: Settings, label: t('templates') },
        { to: '/admin/email/subscribers', icon: Users, label: t('subscribers') },
      ],
    },
  ];

  return (
    <div className="w-64 bg-sidebar-bg h-screen fixed left-0 top-0 z-40 overflow-y-auto">
      <div className="p-6 border-b border-sidebar-hover">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          Admin Panel
        </h1>
      </div>
      
      <nav className="mt-6 px-4">
        {navItems.map((item) => (
          <div key={item.to} className="mb-2">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-hover transition-colors duration-200 ${
                  isActive ? 'bg-sidebar-active text-white' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
            
            {item.children && (
              <div className="ml-8 mt-2 space-y-1">
                {item.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-hover transition-colors duration-200 ${
                        isActive ? 'bg-sidebar-active text-white' : ''
                      }`
                    }
                  >
                    <child.icon className="w-4 h-4 mr-2" />
                    {child.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;