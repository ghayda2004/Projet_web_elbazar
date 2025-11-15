import { useState } from 'react';
import HomePage from './src/pages/HomePage';
import ProductsPage from './src/pages/ProductsPage';
import SellerDashboard from './src/pages/SellerDashboard'; 

export type UserRole = 'client' | 'vendeur' | null;
export type CurrentPage = 'home' | 'products' | 'seller-dashboard';

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'vendeur') {
      setCurrentPage('seller-dashboard');
    } else {
      setCurrentPage('products');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const navigate = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'home' && (
        <HomePage 
          isLoggedIn={isLoggedIn} 
          userRole={userRole}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onNavigate={navigate}
        />
      )}
      {currentPage === 'products' && (
        <ProductsPage 
          isLoggedIn={isLoggedIn} 
          userRole={userRole}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onNavigate={navigate}
        />
      )}
      {currentPage === 'seller-dashboard' && userRole === 'vendeur' && (
        <SellerDashboard 
          onLogout={handleLogout}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}

export default App;
