import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import { Login } from './components/Login.tsx'
import { Register } from './components/Register.tsx'
import Index from './views/index.tsx'
import NotFound from './views/NotFound.tsx'
import OrderDetail from './views/OrderDetail.tsx'
import { Daschboard } from './views/dashboard/Daschboard.tsx'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div>
        <Routes>
          {/* Public routes */}
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
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order/:id" 
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Daschboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
