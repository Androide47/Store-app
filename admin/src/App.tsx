import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import Products from "./pages/admin/store/Products";
import Orders from "./pages/admin/store/Orders";
import BlogPosts from "./pages/admin/blog/BlogPosts";
import CalendarPage from "./pages/admin/calendar/CalendarPage";
import Campaigns from "./pages/admin/email/Campaigns";
import Templates from "./pages/admin/email/Templates";
import Subscribers from "./pages/admin/email/Subscribers";
import Post from './pages/admin/blog/Post';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="store">
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                  </Route>
                  <Route path="blog">
                    <Route path="posts" element={<BlogPosts />} />
                    <Route path="/admin/blog/post/:id" element={<Post />} />
                  </Route>
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="email">
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="templates" element={<Templates />} />
                    <Route path="subscribers" element={<Subscribers />} />
                  </Route>
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
