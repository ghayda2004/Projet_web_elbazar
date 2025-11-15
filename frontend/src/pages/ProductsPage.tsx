import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import { useState } from 'react';
import { UserRole, CurrentPage } from '../App';

interface ProductsPageProps {
  isLoggedIn: boolean;
  userRole: UserRole;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export default function ProductsPage({ isLoggedIn, userRole, onLogin, onLogout, onNavigate }: ProductsPageProps) {
  const [selectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn} 
        userRole={userRole}
        userName="John Buyer"
        showCart={true}
        onLogin={onLogin}
        onLogout={onLogout}
        onNavigate={onNavigate}
      />
      
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-gray-900 mb-8">Tous les produits</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              category={product.category}
              seller={product.seller}
              discount={product.discount}
              emoji={product.emoji}
            />
          ))}
        </div>
      </section>
    </div>
  );
}