import { Search, ShoppingCart, LogOut, Store } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useState } from 'react';
import { UserRole } from '../App';
import { CurrentPage } from '../App';

interface HeaderProps {
  isLoggedIn: boolean;
  userRole: UserRole;
  userName?: string;
  showCart?: boolean;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export function Header({ isLoggedIn, userRole, userName = 'John Buyer', showCart = false, onLogin, onLogout, onNavigate }: HeaderProps) {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    onLogin(role);
    setLoginDialogOpen(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  const navigateToStore = () => {
    if (userRole === 'vendeur') {
      onNavigate('seller-dashboard');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="w-6 h-6 bg-slate-700 transform rotate-45" />
          <span className="text-slate-900">Elbazare</span>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher des produits..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {showCart && isLoggedIn && (
            <button className="text-gray-600 hover:text-gray-900">
              <ShoppingCart className="w-6 h-6" />
            </button>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {userRole === 'vendeur' && (
                <Button 
                  variant="ghost" 
                  className="gap-2"
                  onClick={navigateToStore}
                >
                  <Store className="w-4 h-4" />
                  Ma Boutique
                </Button>
              )}
              <span className="text-gray-700">{userName}</span>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          ) : (
            <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-slate-700 hover:bg-slate-800">
                  Connexion
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Choisissez votre profil</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button 
                    variant="outline" 
                    className="h-16"
                    onClick={() => handleRoleSelect('client')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingCart className="w-6 h-6" />
                      <span>Client</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16"
                    onClick={() => handleRoleSelect('vendeur')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Store className="w-6 h-6" />
                      <span>Vendeur / Commerçant</span>
                    </div>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
}