import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  name: string;
  price: number;
  rating: number;
  category: string;
  seller: string;
  discount?: number;
  emoji: string;
}

export function ProductCard({ name, price, rating, category, seller, discount, emoji }: ProductCardProps) {
  const finalPrice = discount ? price * (1 - discount / 100) : price;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative bg-gray-100 h-48 flex items-center justify-center">
        <span className="text-6xl">{emoji}</span>
        {discount && (
          <Badge className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600">
            {discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-gray-500">{category}</p>
        <p className="text-gray-500">{seller}</p>
        <h3 className="text-gray-900 mt-1 mb-2">{name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-gray-900">${finalPrice}</span>
            {discount && (
              <span className="text-gray-400 line-through text-sm">${price}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-900">{rating}</span>
          </div>
        </div>
        
        <Button className="w-full bg-slate-700 hover:bg-slate-800">
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}
