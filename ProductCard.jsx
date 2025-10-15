import React from 'react';
import Rating from './Rating';
import { formatCurrency } from '../utils/formatters';

const ProductCard = ({ product, onViewProduct, onAddToCart, onBuyNow, style }) => {
    const hasOffer = product.oldPrice && product.oldPrice > product.price;
    const discount = hasOffer ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return (
        <div
            style={style}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col"
        >
            
            <div className="relative cursor-pointer" onClick={() => onViewProduct(product.id)}>
                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                {hasOffer && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {discount}% OFF
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-md font-semibold text-gray-800 flex-grow h-12">{product.name}</h3>
                <div className="my-2">
                    <Rating rate={product.rating.rate} count={product.rating.count} />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</p>
                    {hasOffer && <p className="text-sm text-gray-500 line-through">{formatCurrency(product.oldPrice)}</p>}
                </div>
                <button
                    onClick={() => onAddToCart(product)}
                    className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
                >
                    Add to Cart
                </button>

                {/* ✅ Buy Now Button */}
                {onBuyNow && (
                    <button
                        onClick={() => onBuyNow(product)}
                        className="mt-2 w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-4 rounded-md hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105"
                    >
                        Buy Now
                    </button>
                )}
            </div>
            
        </div>
        
    );
    
};


export default ProductCard;
