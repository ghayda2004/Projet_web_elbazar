// components/RegisterForm.tsx
import { useState } from 'react';
import { UserRole } from '../App.tsx';

interface RegisterFormProps {
  onRegister: (role: UserRole, data: any) => void;
  onNavigate: (page: 'login' | 'home') => void;
}

export default function RegisterForm({ onRegister, onNavigate }: RegisterFormProps) {
  const [role, setRole] = useState<UserRole>('buyer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    storeName: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.includes('@')) newErrors.email = 'Email invalide';
    if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (role === 'seller' && !formData.storeName.trim()) {
      newErrors.storeName = 'Le nom de la boutique est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simuler appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Inscription:', { role, ...formData });

      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        storeName: role === 'seller' ? formData.storeName : undefined,
        address: formData.address,
      };

      onRegister(role, userData);
      onNavigate('home');
    } catch (err) {
      setErrors({ submit: 'Erreur lors de l’inscription.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer un compte</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Je m'inscris en tant que :</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`py-3 px-4 rounded-md font-medium transition ${
              role === 'buyer'
                ? 'bg-slate-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Acheteur
          </button>
          <button
            type="button"
            onClick={() => setRole('seller')}
            className={`py-3 px-4 rounded-md font-medium transition ${
              role === 'seller'
                ? 'bg-slate-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Vendeur
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent"
            placeholder="+216 12 345 678"
          />
        </div>

        {role === 'seller' && (
          <>
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la boutique
              </label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent ${
                  errors.storeName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.storeName && <p className="text-red-500 text-xs mt-1">{errors.storeName}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse de la boutique
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                placeholder="Rue, Ville, Gouvernorat"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        {errors.submit && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-900'
          }`}
        >
          {isSubmitting ? 'Inscription en cours...' : "S'inscrire"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Déjà un compte ?{' '}
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="text-slate-800 font-medium hover:underline"
        >
          Se connecter
        </button>
      </p>
    </div>
  );
}
