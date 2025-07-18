import React, { useState, createContext, useContext, useEffect } from 'react';
import './App.css'; // IMPORTANT: This imports your custom CSS for styling

// --- Context for Global State Management ---
const AppContext = createContext();

// --- Mock Product Data ---
const PRODUCTS = [
  {
    id: 'p1',
    name: 'Classic T-Shirt',
    category: 'men',
    price: 25.00,
    description: 'A comfortable and stylish classic t-shirt, perfect for everyday wear.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Men%27s+Tee',
    details: 'Made from 100% premium cotton. Available in various sizes and colors. Pre-shrunk for a consistent fit.',
  },
  {
    id: 'p2',
    name: 'Elegant Summer Dress',
    category: 'women',
    price: 55.00,
    description: 'Lightweight and flowy summer dress, ideal for any occasion.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Women%27s+Dress',
    details: 'Material: Viscose blend. Features: Floral print, adjustable straps, knee-length. Perfect for casual outings or semi-formal events.',
  },
  {
    id: 'p3',
    name: 'Kids Dino Hoodie',
    category: 'kids',
    price: 35.00,
    description: 'Fun and cozy hoodie for kids with a cute dinosaur design.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Kids+Hoodie',
    details: 'Soft fleece lining, durable stitching, and a playful dinosaur graphic. Machine washable and designed for active kids.',
  },
  {
    id: 'p4',
    name: 'Sporty Sneakers',
    category: 'men',
    price: 80.00,
    description: 'High-performance sneakers for your daily runs or casual outings.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Men%27s+Sneakers',
    details: 'Breathable mesh upper, cushioned sole for comfort, and non-slip rubber outsole. Available in multiple sizes.',
  },
  {
    id: 'p5',
    name: 'Stylish Handbag',
    category: 'women',
    price: 70.00,
    description: 'A versatile handbag to complement any outfit.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Women%27s+Bag',
    details: 'Faux leather material, multiple compartments, and a detachable shoulder strap. Perfect for work or leisure.',
  },
  {
    id: 'p6',
    name: 'Toy Car Set',
    category: 'kids',
    price: 20.00,
    description: 'Exciting set of toy cars for endless hours of fun.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Kids+Toys',
    details: 'Includes 5 different die-cast cars. Made from non-toxic materials, safe for children aged 3 and up.',
  },
  {
    id: 'p7',
    name: 'Formal Shirt',
    category: 'men',
    price: 45.00,
    description: 'Crisp formal shirt for professional and special occasions.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Men%27s+Shirt',
    details: 'Wrinkle-resistant fabric, slim fit design, and classic collar. Ideal for office wear or formal events.',
  },
  {
    id: 'p8',
    name: 'Denim Jeans',
    category: 'women',
    price: 60.00,
    description: 'Comfortable and trendy denim jeans for everyday fashion.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Women%27s+Jeans',
    details: 'High-waisted, stretchable denim fabric, and distressed details. Available in various washes and sizes.',
  },
  {
    id: 'p9',
    name: 'Building Blocks',
    category: 'kids',
    price: 30.00,
    description: 'Colorful building blocks to spark creativity in young minds.',
    imageUrl: 'https://placehold.co/400x400/E0E0E0/333333?text=Kids+Blocks',
    details: 'Set includes 100 pieces of various shapes and colors. Helps develop fine motor skills and spatial reasoning.',
  },
];

// --- Icons (Inline SVGs) ---
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="m7.5 4.27 9 5.15"/><path d="m2.8 7.7 9 5.15 9-5.15"/><path d="m7.5 19.73 9-5.15"/><path d="M12 22.18v-9.94"/><path d="M2.8 12.28v-4.58"/><path d="M21.2 12.28v-4.58"/>
  </svg>
);
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
  </svg>
);
const ShirtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M20.38 3.46 16 2a4 4 0 0 1-4 4V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6.38a2 2 0 0 0-.62-1.42Z"/><path d="m10.5 2h-4A2 2 0 0 0 4 4v16a2 2 0 0 0 2 2h4"/>
  </svg>
);
const DressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M12 2a2 2 0 0 0-2 2v6l-2 4v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2l-2-4V4a2 2 0 0 0-2-2Z"/>
  </svg>
);
const BabyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5 2 2 2 3 2s2.5 0 3-2"/><path d="M2 16.5c0-2.8 2.2-5 5-5h10c2.8 0 5 2.2 5 5v2c0 2.8-2.2 5-5 5H7c-2.8 0-5-2.2-5-5Z"/><path d="M7 11.5V7a5 5 0 0 1 10 0v4.5"/>
  </svg>
);
const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
  </svg>
);


// --- Components ---

// Header Component
const Header = () => {
  const { setCurrentPage, cart } = useContext(AppContext);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-section" onClick={() => setCurrentPage('home')}>
          <span className="logo-text">Pulsecart</span>
          <ShoppingCartIcon className="logo-icon" />
        </div>
        <nav className="nav-menu">
          <NavItem icon={<HomeIcon />} text="Home" onClick={() => setCurrentPage('home')} />
          <NavItem icon={<PackageIcon />} text="Products" onClick={() => setCurrentPage('products')} />
          <NavItem icon={<ShirtIcon />} text="Men" onClick={() => setCurrentPage('men')} />
          <NavItem icon={<DressIcon />} text="Women" onClick={() => setCurrentPage('women')} />
          <NavItem icon={<BabyIcon />} text="Kids" onClick={() => setCurrentPage('kids')} />
        </nav>
        <div className="cart-icon-container" onClick={() => setCurrentPage('cart')}>
          <ShoppingCartIcon className="cart-icon" />
          {totalCartItems > 0 && (
            <span className="cart-item-count">
              {totalCartItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

// NavItem Component for Header
const NavItem = ({ icon, text, onClick }) => (
  <button className="nav-item-button" onClick={onClick}>
    {icon}
    <span className="nav-item-text">{text}</span>
  </button>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="container footer-content">
      <p>&copy; {new Date().getFullYear()} Pulsecart. All rights reserved.</p>
      <p className="footer-tagline">Designed with ❤️ for your shopping needs.</p>
    </div>
  </footer>
);

// Product Card Component
const ProductCard = ({ product }) => {
  const { setCurrentPage, setSelectedProduct, addToCart } = useContext(AppContext);

  const handleViewDetails = () => {
    setSelectedProduct(product);
    setCurrentPage('productDetail');
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-card-image"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/E0E0E0/333333?text=Image+Error`; }}
      />
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-actions">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <div className="product-card-buttons">
            <button onClick={handleViewDetails} className="button button-details">
              Details
            </button>
            <button onClick={handleAddToCart} className="button button-add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  const { setCurrentPage } = useContext(AppContext);

  return (
    <div className="container page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Discover Your Style at <span className="hero-highlight">Pulsecart</span>
        </h1>
        <p className="hero-subtitle">
          Your one-stop shop for fashion, electronics, and more!
        </p>
        <button onClick={() => setCurrentPage('products')} className="button hero-button">
          Shop Now
        </button>
      </section>

      {/* Featured Categories */}
      <section className="category-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-cards-grid">
          <CategoryCard
            title="Men's Fashion"
            description="Explore the latest trends for him."
            imageUrl="https://placehold.co/600x400/A78BFA/FFFFFF?text=Men%27s+Fashion"
            onClick={() => setCurrentPage('men')}
          />
          <CategoryCard
            title="Women's Collection"
            description="Elegance and style for every woman."
            imageUrl="https://placehold.co/600x400/EC4899/FFFFFF?text=Women%27s+Collection"
            onClick={() => setCurrentPage('women')}
          />
          <CategoryCard
            title="Kids' Corner"
            description="Fun and comfortable wear for the little ones."
            imageUrl="https://placehold.co/600x400/3B82F6/FFFFFF?text=Kids%27+Corner"
            onClick={() => setCurrentPage('kids')}
          />
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <h2 className="section-title">About Pulsecart</h2>
        <p className="about-us-text">
          Pulsecart is dedicated to bringing you the best in online shopping. We offer a curated selection of high-quality products, from trendy apparel to essential gadgets, all at competitive prices. Our mission is to provide a seamless and enjoyable shopping experience, ensuring you find exactly what you need with ease and confidence.
        </p>
      </section>
    </div>
  );
};

// Category Card for Home Page
const CategoryCard = ({ title, description, imageUrl, onClick }) => (
  <div className="category-card" onClick={onClick}>
    <img
      src={imageUrl}
      alt={title}
      className="category-card-image"
      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/E0E0E0/333333?text=Image+Error`; }}
    />
    <div className="category-card-content">
      <h3 className="category-card-title">{title}</h3>
      <p className="category-card-description">{description}</p>
    </div>
  </div>
);

// Product Info Page Component (displays list of products)
const ProductInfoPage = ({ category = null }) => {
  const productsToDisplay = category
    ? PRODUCTS.filter(p => p.category === category)
    : PRODUCTS;

  return (
    <div className="container page-content">
      <h1 className="page-title">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection` : 'All Products'}
      </h1>
      {productsToDisplay.length > 0 ? (
        <div className="product-grid">
          {productsToDisplay.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="no-products-message">No products found in this category.</p>
      )}
    </div>
  );
};

// Product Detail Page Component
const ProductDetailPage = () => {
  const { selectedProduct, setCurrentPage, addToCart } = useContext(AppContext);

  // useEffect must be called unconditionally at the top level of the component.
  // This effect handles the redirection if selectedProduct is null.
  useEffect(() => {
    if (!selectedProduct) {
      setCurrentPage('products');
    }
  }, [selectedProduct, setCurrentPage]); // Dependencies ensure it re-runs if selectedProduct or setCurrentPage changes

  // If selectedProduct is null, display a loading message or return early.
  // The useEffect above will handle the actual navigation.
  if (!selectedProduct) {
    return <div className="loading-message">Loading product details...</div>;
  }

  const handleAddToCart = () => {
    addToCart(selectedProduct);
  };

  return (
    <div className="container page-content">
      <div className="product-detail-card">
        <div className="product-detail-image-container">
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="product-detail-image"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x600/E0E0E0/333333?text=Image+Error`; }}
          />
        </div>
        <div className="product-detail-content">
          <h1 className="product-detail-title">{selectedProduct.name}</h1>
          <p className="product-detail-price">${selectedProduct.price.toFixed(2)}</p>
          <p className="product-detail-description">{selectedProduct.description}</p>
          <p className="product-detail-details">
            <span className="product-detail-details-label">Details:</span> {selectedProduct.details}
          </p>
          <div className="product-detail-buttons">
            <button onClick={handleAddToCart} className="button button-add-to-cart-lg">
              <ShoppingCartIcon className="button-icon" />
              <span>Add to Cart</span>
            </button>
            <button onClick={() => setCurrentPage('products')} className="button button-back">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Shopping Cart Page Component
const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, setCurrentPage } = useContext(AppContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container page-content">
      <h1 className="page-title">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p className="empty-cart-text">Your cart is empty. Start shopping now!</p>
          <button onClick={() => setCurrentPage('products')} className="button button-primary">
            Go to Products
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items-list">
            <h2 className="cart-section-title">Items ({totalItems})</h2>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/E0E0E0/333333?text=Image+Error`; }}
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                  <div className="cart-item-quantity-controls">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="quantity-button"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="quantity-button"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2 className="cart-section-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({totalItems} items):</span>
              <span className="summary-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="summary-value">Free</span> {/* Placeholder */}
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setCurrentPage('payment')}
              className="button button-checkout"
            >
              <CreditCardIcon className="button-icon" />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


// Payment Section Component (Placeholder)
const PaymentSection = () => {
  const { setCurrentPage } = useContext(AppContext);

  return (
    <div className="container page-content">
      <div className="payment-section-card">
        <CreditCardIcon className="payment-icon" />
        <h1 className="page-title">Payment Gateway</h1>
        <p className="payment-description">
          This is a placeholder for the payment processing section. In a real application, you would integrate with a secure payment gateway here.
        </p>
        <div className="payment-form">
          <input
            type="text"
            placeholder="Card Number"
            className="input-field"
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="MM/YY"
              className="input-field"
            />
            <input
              type="text"
              placeholder="CVC"
              className="input-field"
            />
          </div>
          <button
            onClick={() => {
              // Simulate payment success
              alert("Payment successful! Thank you for your purchase.");
              setCurrentPage('home'); // Redirect to home or order confirmation
            }}
            className="button button-checkout"
          >
            Complete Payment
          </button>
          <button
            onClick={() => setCurrentPage('cart')}
            className="button button-back"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};


// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]); // { id, name, price, quantity, imageUrl }

  // Function to add item to cart or increase quantity
  const addToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  // Function to update item quantity in cart
  const updateCartQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Render content based on current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductInfoPage />;
      case 'productDetail':
        return <ProductDetailPage />;
      case 'men':
        return <ProductInfoPage category="men" />;
      case 'women':
        return <ProductInfoPage category="women" />;
      case 'kids':
        return <ProductInfoPage category="kids" />;
      case 'cart':
        return <CartPage />;
      case 'payment':
        return <PaymentSection />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedProduct,
      setSelectedProduct,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
    }}>
      <div className="app-container">
        <Header />
        <main className="main-content">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;