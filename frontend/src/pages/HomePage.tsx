import { Header } from '../components/Header';
import { CategoryFilter } from '../components/CategoryFilter';
import { SellerCard } from '../components/SellerCard';
import { useState, useEffect } from 'react';
import type { UserRole, CurrentPage } from '../../App';

interface Seller {
  id: number;
  name: string;
  storeName?: string;
  storePhoto?: string;
  phone?: string;
  address?: string;
}

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
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/sellers');
      if (response.ok) {
        const data = await response.json();
        setSellers(data);
      }
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn} 
        userRole={userRole}
        userName={userName}
        onLogin={onLogin}
        onLogout={onLogout}
        onNavigate={onNavigate}
        onRefreshSellers={fetchSellers}
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
        {loading ? (
          <p className="text-center text-gray-500">Chargement des vendeurs...</p>
        ) : sellers.length === 0 ? (
          <p className="text-center text-gray-500">Aucun vendeur disponible pour le moment</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sellers.map((seller) => (
              <SellerCard
                key={seller.id}
                sellerId={seller.id}
                name={seller.storeName || seller.name}
                rating={4.5}
                productCount={0}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}