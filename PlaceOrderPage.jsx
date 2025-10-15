import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';

const PlaceOrderPage = ({ cart, setView }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const BackArrowIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


    const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
    const  DeliveryCharge = 40;
    const total = subtotal +  DeliveryCharge;

    const handlePlaceOrder = () => {
        if (!name || !address || !pincode) {
            alert('Please fill all the fields!');
            return;
        }
        setOrderPlaced(true);
        setTimeout(() => {
            setView({ name: 'products' });
        }, 2000); // Redirect to products after 2s
    };

    if (orderPlaced) {
        return (
            <div className="container mx-auto px-4 py-8 text-center animate-fadeIn">
                <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h2>
                <p className="text-gray-700">Thank you for shopping with Namma Kadai.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            
<button
                onClick={() => setView({ name: 'products' })}
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-4 font-semibold"
            >
                <BackArrowIcon />
                Back to Home
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Place Your Order</h2>
            <div className="lg:flex gap-8">
                {/* Left: User Info */}
                <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md mb-6 lg:mb-0">
                    <h3 className="text-xl font-bold mb-4">Your Details</h3>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            placeholder="Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="divide-y divide-gray-200">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between py-2">
                                <span>{item.name} x {item.quantity}</span>
                                <span>{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>DeliveryCharge</span>
                            <span>{formatCurrency(DeliveryCharge)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl mt-2">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all text-lg transform hover:scale-105"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
