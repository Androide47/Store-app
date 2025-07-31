
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Login } from './components/Login.tsx';
import { Register } from './components/Register.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Home } from './pages/Home.tsx';
import { Products } from './pages/Products.tsx';
import { ProductDetail } from './pages/ProductDetail.tsx';
import { Cart } from './pages/Cart.tsx';
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import { Profile } from './pages/Profile.tsx';
import { Orders } from './pages/Orders.tsx';
import { UserDashboard } from './pages/UserDashboard.tsx';
import './index.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/login" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Register />
                  </ProtectedRoute>
                } 
              />
              <Route 
                 path="/profile" 
                 element={
                   <ProtectedRoute requireAuth={true}>
                     <Profile />
                   </ProtectedRoute>
                 } 
               />
               <Route 
                 path="/orders" 
                 element={
                   <ProtectedRoute requireAuth={true}>
                     <Orders />
                   </ProtectedRoute>
                 } 
               />
               <Route 
                 path="/dashboard" 
                 element={
                   <ProtectedRoute requireAuth={true}>
                     <UserDashboard />
                   </ProtectedRoute>
                 } 
               />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
