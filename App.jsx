import React, { useState, useEffect, useMemo } from 'react';
import { fullProducts as mockProducts } from './data/products';
import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import PlaceOrderPage from './pages/PlaceOrderPage';



export default function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [view, setView] = useState({ name: 'products', id: null });
    const [isAppLoading, setAppLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setProducts(mockProducts);
        setTimeout(() => setAppLoading(false), 1500); // Simulate loading
    }, []);


    

    const handleAddToCart = (productToAdd) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...productToAdd, quantity: 1 }];
        });
    };

  
    const handleBuyNow = (product) => {
        setCart([{ ...product, quantity: 1 }]); // Only include this product in cart
        setView({ name: 'cart' }); // Go to cart view immediately
    };

    const handleUpdateQuantity = (productId, amount) => {
        setCart(prevCart =>
            prevCart
                .map(item => {
                    if (item.id === productId) {
                        const newQuantity = item.quantity + amount;
                        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    const handleRemoveFromCart = (productId) => setCart(prevCart => prevCart.filter(item => item.id !== productId));
    const handleViewProduct = (productId) => {
        setView({ name: 'productDetail', id: productId });
        window.scrollTo(0, 0);
    };
    const handleLogin = () => setAuthenticated(true);
    const handleLogout = () => setAuthenticated(false);

    const cartItemCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  

    const renderContent = () => {
        switch (view.name) {
            case 'productDetail':
                const selectedProduct = products.find(p => p.id === view.id);
                return selectedProduct ? (
                    <ProductDetailPage
                        products={products} // This prop is ESSENTIAL
                        initialSelectedProduct={selectedProduct} // This prop is ESSENTIAL
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        setView={setView}
                    />
                ) : (
                    <ProductListPage
                        products={products}
                        onViewProduct={handleViewProduct}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow} // Added onBuyNow here too
                        searchTerm={searchTerm}
                    />
                );

            case 'cart':
                return (
                    <CartPage
                        cart={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveFromCart={handleRemoveFromCart}
                        setView={setView}
                    />
                );

                 case 'placeOrder':
            return <PlaceOrderPage cart={cart} setView={setView} />;

            default:
                return (
                    <ProductListPage
                        products={products}
                        onViewProduct={handleViewProduct}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow} // Added onBuyNow here too
                        searchTerm={searchTerm}
                    />
                );
        }
    };

    if (isAppLoading) return <WelcomePage />;
    if (!isAuthenticated) return <LoginPage onLogin={handleLogin} />;

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <GlobalStyles />
            <Header
                setView={setView}
                cartItemCount={cartItemCount}
                onLogout={handleLogout}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <main>{renderContent()}</main>
            <footer className="bg-gray-800 text-white mt-12 py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                    <p>&copy; 2025 Namma Kadai. All rights reserved. Made with ❤️ in Tamilnadu.</p>
                </div>
            </footer>
        </div>
    );
}
