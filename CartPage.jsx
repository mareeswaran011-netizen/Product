import React, { useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';
import { PlusIcon, MinusIcon, TrashIcon } from '../components/Icons';

// ✅ 1. Self-contained icon for the back button
const BackArrowIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const CartPage = ({ cart, onUpdateQuantity, onRemoveFromCart, setView }) => {
    const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
    const DeliveryCharge = 40 ; 
    const total = subtotal + DeliveryCharge;

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center animate-fadeIn">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <button
                    onClick={() => setView({ name: 'products' })}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-6 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-transform transform hover:scale-105"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* ✅ 2. Back to Products button added here */}
            <button
                onClick={() => setView({ name: 'products' })}
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-4 font-semibold"
            >
                <BackArrowIcon />
                Continue Shopping
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h2>
            <div className="lg:flex lg:gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center p-4">
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                <div className="flex-grow ml-4">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">{formatCurrency(item.price)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <PlusIcon />
                                    </button>
                                </div>
                                <div className="ml-4 font-bold w-28 text-right">{formatCurrency(item.price * item.quantity)}</div>
                                <button
                                    onClick={() => onRemoveFromCart(item.id)}
                                    className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                                    aria-label="Remove item"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span> DeliveryCharge</span>
                            <span>{formatCurrency( DeliveryCharge)}</span>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between font-bold text-xl mb-4">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <div className="my-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Pay with UPI:</p>
                            <div className="grid grid-cols-3 gap-4">
                                <img
                                    src="https://placehold.co/120x60/f0f0f0/000?text=GPay"
                                    alt="GPay"
                                    className="h-10 w-full object-contain rounded-md border border-gray-200 p-1 cursor-pointer hover:shadow-md transition-shadow"
                                />
                                <img
                                    src="https://placehold.co/120x60/f0f0f0/000?text=PhonePe"
                                    alt="PhonePe"
                                    className="h-10 w-full object-contain rounded-md border border-gray-200 p-1 cursor-pointer hover:shadow-md transition-shadow"
                                />
                                <img
                                    src="https://placehold.co/120x60/f0f0f0/000?text=Paytm"
                                    alt="Paytm"
                                    className="h-10 w-full object-contain rounded-md border border-gray-200 p-1 cursor-pointer hover:shadow-md transition-shadow"
                                />
                            </div>
                        </div>
                         <button
                            onClick={() => setView({ name: 'placeOrder' })}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all text-lg transform hover:scale-105"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;