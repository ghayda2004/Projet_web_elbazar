import { Search, ShoppingCart, LogOut, Store, X, Trash2, User, Lock, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useState, useContext } from 'react';
import type { UserRole, CurrentPage } from '../../App';
import { CartContext } from '../../App';
import { Badge } from './ui/badge';

interface HeaderProps {
  isLoggedIn: boolean;
  userRole: UserRole;
  userName?: string;
  showCart?: boolean;
  onLogin: (role: UserRole, username?: string) => void;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export function Header({ isLoggedIn, userRole, userName = 'John Buyer', showCart = false, onLogin, onLogout, onNavigate }: HeaderProps) {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<'role' | 'credentials'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // useContext hook - access cart data
  const { cart, removeFromCart, clearCart, cartTotal, cartItemsCount } = useContext(CartContext);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setLoginStep('credentials');
    setLoginError('');
  };

  const handleBackToRole = () => {
    setLoginStep('role');
    setEmail('');
    setPassword('');
    setLoginError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Validation
    if (!email || !password) {
      setLoginError('Veuillez remplir tous les champs');
      return;
    }
    
    if (!email.includes('@')) {
      setLoginError('Veuillez entrer une adresse email valide');
      return;
    }
    
    if (password.length < 4) {
      setLoginError('Le mot de passe doit contenir au moins 4 caractères');
      return;
    }
    
    // Simulate login with visual feedback
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin(selectedRole!, email.split('@')[0]);
      setLoginDialogOpen(false);
      setLoginStep('role');
      setEmail('');
      setPassword('');
      setIsLoggingIn(false);
    }, 800);
  };

  const handleDialogClose = (open: boolean) => {
    setLoginDialogOpen(open);
    if (!open) {
      // Reset state when dialog closes
      setTimeout(() => {
        setLoginStep('role');
        setEmail('');
        setPassword('');
        setLoginError('');
        setSelectedRole(null);
      }, 300);
    }
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
            <Dialog open={cartDialogOpen} onOpenChange={setCartDialogOpen}>
              <DialogTrigger asChild>
                <button className="text-gray-600 hover:text-gray-900 relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500">
                      {cartItemsCount}
                    </Badge>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Panier ({cartItemsCount} articles)</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Votre panier est vide</p>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p className="text-sm text-gray-500">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Total:</span>
                          <span className="text-xl font-bold text-green-600">
                            ${cartTotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1 gap-2"
                            onClick={clearCart}
                          >
                            <Trash2 className="w-4 h-4" />
                            Vider
                          </Button>
                          <Button className="flex-1 bg-slate-700 hover:bg-slate-800">
                            Commander
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
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
            <Dialog open={loginDialogOpen} onOpenChange={handleDialogClose}>
              <DialogTrigger asChild>
                <Button className="bg-slate-700 hover:bg-slate-800">
                  Connexion
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                {loginStep === 'role' ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>Choisissez votre profil</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Button 
                        variant="outline" 
                        className="h-20 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105"
                        onClick={() => handleRoleSelect('client')}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <ShoppingCart className="w-8 h-8 text-blue-600" />
                          <span className="font-semibold">Client</span>
                          <span className="text-xs text-gray-500">Acheter des produits</span>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 hover:scale-105"
                        onClick={() => handleRoleSelect('vendeur')}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Store className="w-8 h-8 text-purple-600" />
                          <span className="font-semibold">Vendeur / Commerçant</span>
                          <span className="text-xs text-gray-500">Gérer votre boutique</span>
                        </div>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleBackToRole}
                          className="p-1 h-8 w-8"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <DialogTitle>
                          Connexion - {selectedRole === 'client' ? 'Client' : 'Vendeur'}
                        </DialogTitle>
                      </div>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="exemple@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="transition-all duration-300 focus:ring-2 focus:ring-slate-700"
                          disabled={isLoggingIn}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Mot de passe
                        </label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="transition-all duration-300 focus:ring-2 focus:ring-slate-700"
                          disabled={isLoggingIn}
                        />
                      </div>

                      {loginError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm animate-pulse">
                          {loginError}
                        </div>
                      )}

                      <Button 
                        type="submit"
                        className={`w-full gap-2 transition-all duration-300 ${
                          isLoggingIn 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-slate-700 hover:bg-slate-800'
                        }`}
                        disabled={isLoggingIn}
                      >
                        {isLoggingIn ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Connexion en cours...
                          </>
                        ) : (
                          'Se connecter'
                        )}
                      </Button>

                      <p className="text-xs text-center text-gray-500">
                        Pas encore de compte? <span className="text-blue-600 hover:underline cursor-pointer">S'inscrire</span>
                      </p>
                    </form>
                  </>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
}