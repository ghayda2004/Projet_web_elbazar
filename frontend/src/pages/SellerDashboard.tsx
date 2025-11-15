import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { BarChart3, Package, Star, DollarSign, Plus, Pencil, Trash2 } from 'lucide-react';
import { sellerStats, sellerProducts } from '../data/mockData';
import { CurrentPage } from '../../App';

interface SellerDashboardProps {
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export default function SellerDashboard({ onLogout, onNavigate }: SellerDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isLoggedIn={true} 
        userRole="vendeur"
        userName="Ma Boutique"
        onLogin={() => {}}
        onLogout={onLogout}
        onNavigate={onNavigate}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-slate-700 transform rotate-45" />
              <h1 className="text-gray-900">Elbazare Seller</h1>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Revenu total"
            value={`$${sellerStats.totalRevenue.toLocaleString()}`}
            icon={BarChart3}
            iconColor="bg-purple-100 text-purple-600"
          />
          <StatCard
            title="Total des commandes"
            value={sellerStats.totalOrders}
            icon={Package}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Produits actifs"
            value={sellerStats.activeProducts}
            icon={Package}
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="Note de la boutique"
            value={`${sellerStats.storeRating}⭐`}
            icon={Star}
            iconColor="bg-yellow-100 text-yellow-600"
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-gray-900">Mes produits</h2>
            <Button className="gap-2 bg-slate-700 hover:bg-slate-800">
              <Plus className="w-4 h-4" />
              Ajouter un produit
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Revenu</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellerProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xl">{product.emoji}</span>
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-100"
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.orders}</TableCell>
                  <TableCell className="text-green-600">
                    ${product.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}