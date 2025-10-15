// src/pages/ProductDetailPage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { formatCurrency } from '../utils/formatters';
import Rating from '../components/Rating'; // Assuming you have a Rating component

// --- Helper Components ---
const BackArrowIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// --- Main Component ---
const ProductDetailPage = ({ products, initialSelectedProduct, onAddToCart, onBuyNow, setView }) => {
    const [selectedProduct, setSelectedProduct] = useState(initialSelectedProduct || products[0]);
    // State to manage the main displayed image in the gallery
    const [activeImage, setActiveImage] = useState(initialSelectedProduct?.images?.[0] || initialSelectedProduct?.imageUrl);
    const [transitionClass, setTransitionClass] = useState('opacity-100 scale-100');

    useEffect(() => {
        const productToSet = initialSelectedProduct || products[0];
        setSelectedProduct(productToSet);
        setActiveImage(productToSet?.images?.[0] || productToSet?.imageUrl);
    }, [initialSelectedProduct, products]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const timer = setTimeout(() => {
            setTransitionClass('opacity-100 scale-100');
        }, 50);
        return () => clearTimeout(timer);
    }, [selectedProduct]);

    const handleSelectProduct = (product) => {
        if (product.id === selectedProduct.id) return;
        setTransitionClass('opacity-0 scale-95');
        setTimeout(() => {
            setSelectedProduct(product);
            setActiveImage(product?.images?.[0] || product?.imageUrl);
        }, 300);
    };

    const otherProducts = useMemo(() => {
        if (!products || !selectedProduct) return [];
        const similar = products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id);
        const others = products.filter(p => p.category !== selectedProduct.category);
        return [...shuffleArray(similar), ...shuffleArray(others)].slice(0, 6);
    }, [products, selectedProduct]);

    if (!selectedProduct) return <div>Product not found.</div>;

    const {
        name, brand, category, rating, price, oldPrice,
        fullDescription, description, images, imageUrl,
        features, specifications, warranty, deliveryInfo, reviews
    } = selectedProduct;

    const productImages = images || [imageUrl];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => setView({ name: 'products' })}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6 font-semibold"
                >
                    <BackArrowIcon />
                    Back to All Products
                </button>

                {/* MAIN PRODUCT SECTION */}
                <div key={selectedProduct.id} className={`bg-pink rounded-lg shadow-xl overflow-hidden mb-12 transition-all duration-300 ease-in-out ${transitionClass}`}>
                    <div className="md:flex">
                        {/* Image Gallery */}
                        <div className="md:w-1/2 p-4 flex flex-col items-center gap-4">
                            <div className="w-full h-80 flex justify-center items-center rounded-lg bg-gray-100 p-4">
                               <img src={activeImage} alt={name} className="max-w-full max-h-full object-contain" />
                            </div>
                            {productImages.length > 1 && (
                                <div className="flex gap-2 justify-center">
                                    {productImages.map((img, index) => (
                                        <button key={index} onMouseEnter={() => setActiveImage(img)} onClick={() => setActiveImage(img)} className={`w-16 h-16 p-1 bg-gray-100 rounded-md border-2 transition ${activeImage === img ? 'border-indigo-500' : 'border-transparent'}`}>
                                            <img src={img} alt={`${name} thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
                            {brand && <p className="text-indigo-600 font-semibold text-md mt-1">{brand}</p>}
                            <div className="my-4">
                                <Rating rate={rating.rate} count={rating.count} />
                            </div>
                            <div className="flex items-baseline gap-3 my-2">
                                <p className="text-3xl font-bold text-gray-800">{formatCurrency(price)}</p>
                                {oldPrice && (
                                    <p className="text-lg text-gray-500 line-through">{formatCurrency(oldPrice)}</p>
                                )}
                            </div>
                            <p className="text-gray-600 leading-relaxed my-4">
                                {fullDescription || description}
                            </p>
                            
                            {deliveryInfo && <p className="text-sm my-2"><span className="font-bold">Delivery:</span> {deliveryInfo}</p>}
                            {warranty && <p className="text-sm"><span className="font-bold">Warranty:</span> {warranty}</p>}

                            <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
                                <button onClick={() => onAddToCart(selectedProduct)} className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">Add to Cart</button>
                                <button onClick={() => onBuyNow(selectedProduct)} className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* DETAILS, FEATURES & REVIEWS SECTION */}
                <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 mb-12">
                    {/* Features */}
                    {features && features.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold border-b pb-2 mb-4">Key Features</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {features.map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                        </div>
                    )}
                    {/* Specifications */}
                    {specifications && specifications.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold border-b pb-2 mb-4">Specifications</h3>
                            <div className="space-y-2">
                                {specifications.map(spec => (
                                    <div key={spec.key} className="flex text-sm">
                                        <p className="w-1/3 text-gray-500">{spec.key}</p>
                                        <p className="w-2/3 text-gray-800 font-medium">{spec.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    {reviews && reviews.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold border-b pb-2 mb-4">Ratings & Reviews</h3>
                            <div className="space-y-6">
                                {reviews.map(review => (
                                    <div key={review.id} className="flex gap-4 border-b last:border-0 pb-4">
                                        <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full"/>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold">{review.user}</p>
                                                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="my-1"><Rating rate={review.rating} /></div>
                                            <p className="font-bold text-gray-800">{review.title}</p>
                                            <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                                            {review.images && review.images.length > 0 && (
                                                <div className="flex gap-2 mt-2">
                                                    {review.images.map((img, i) => <img key={i} src={img} className="w-20 h-20 rounded-md object-cover" alt="review"/>)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER "SIMILAR PRODUCTS" SECTION */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">You Might Be Interested In</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {otherProducts.map((product, index) => (
                            <div key={product.id} onClick={() => handleSelectProduct(product)} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group transition-transform transform hover:-translate-y-2">
                                <div className="w-full h-40 bg-gray-100 flex items-center justify-center p-2"><img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain"/></div>
                                <div className="p-3 text-center">
                                    <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-indigo-600">{product.name}</h3>
                                    <p className="text-md font-bold text-gray-900 mt-1">{formatCurrency(product.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;