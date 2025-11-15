import { Header } from '../components/Header';
import { CategoryFilter } from '../components/CategoryFilter';
import { SellerCard } from '../components/SellerCard';
import { sellers } from '../data/mockData';
import { useState } from 'react';
import type { UserRole, CurrentPage } from '../../App';

interface HomePageProps {
  isLoggedIn: boolean;
  userRole: UserRole;
  userName?: string;
  onLogin: (role: UserRole, username?: string) => void;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export default function HomePage({ isLoggedIn, userRole, userName, onLogin, onLogout, onNavigate }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn} 
        userRole={userRole}
        userName={userName}
        onLogin={onLogin}
        onLogout={onLogout}
        onNavigate={onNavigate}
      />
      
      {/* Hero Section */}
      <section className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-white mb-4">
            Achetez tout ce dont vous avez besoin
          </h1>
          <p className="text-gray-300 text-xl">
            Parcourez des milliers de produits de vendeurs de confiance
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Top Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-gray-900 mb-6">Meilleurs vendeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <SellerCard
              key={seller.id}
              name={seller.name}
              rating={seller.rating}
              productCount={seller.productCount}
            />
          ))}
        </div>
      </section>
    </div>
  );
}