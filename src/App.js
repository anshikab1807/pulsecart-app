import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Home, Store, LayoutGrid, Phone, HelpCircle, FileText, CheckCircle, Star, Quote, ChevronRight, Plane, Hotel, Tag, Search, XCircle, DollarSign, Briefcase, Users, MessageSquare, Minimize2, Maximize2, Brain, Moon, Sun, Camera } from 'lucide-react'; // Added Camera icon

// Product data for the category page - Added numericPrice for calculation
const productCategories = [
  {
    name: "Electronics",
    subcategories: [
      { name: "Mobiles", items: [{name: "Smartphones", price: "₹15,000", numericPrice: 15000}, {name: "Feature Phones", price: "₹1,500", numericPrice: 1500}, {name: "Accessories", price: "₹500", numericPrice: 500}, {name: "Tablets", price: "₹18,000", numericPrice: 18000}, {name: "Wearables", price: "₹4,000", numericPrice: 4000}] },
      { name: "Audio", items: [{name: "Bluetooth Headphones", price: "₹2,000", numericPrice: 2000}, {name: "Wired Headphones", price: "₹800", numericPrice: 800}, {name: "True Wireless Earbuds", price: "₹3,000", numericPrice: 3000}, {name: "Bluetooth Speakers", price: "₹2,500", numericPrice: 2500}, {name: "Soundbars", price: "₹7,000", numericPrice: 7000}, {name: "Home Theatres", price: "₹25,000", numericPrice: 25000}, {name: "Headphone Cases", price: "₹250", numericPrice: 250}] },
      { name: "Cameras & Accessories", items: [{name: "DSLR Cameras", price: "₹40,000", numericPrice: 40000}, {name: "Mirrorless Cameras", price: "₹55,000", numericPrice: 55000}, {name: "Action Cameras", price: "₹12,000", numericPrice: 12000}, {name: "Lenses", price: "₹10,000", numericPrice: 10000}, {name: "Tripods", price: "₹1,200", numericPrice: 1200}, {name: "Camera Bags", price: "₹800", numericPrice: 800}] },
      { name: "Computer Peripherals", items: [{name: "Keyboards", price: "₹1,000", numericPrice: 1000}, {name: "Mice", price: "₹300", numericPrice: 300}, {name: "Printers", price: "₹8,000", numericPrice: 8000}, {name: "Monitors", price: "₹10,000", numericPrice: 10000}, {name: "Webcams", price: "₹1,500", numericPrice: 1500}, {name: "External Hard Drives", price: "₹4,000", numericPrice: 4000}] },
      { name: "Gaming", items: [{name: "Gaming Consoles", price: "₹30,000", numericPrice: 30000}, {name: "Gaming Laptops", price: "₹60,000", numericPrice: 60000}, {name: "Gaming Accessories", price: "₹1,500", numericPrice: 1500}, {name: "Gaming Headsets", price: "₹2,500", numericPrice: 2500}, {name: "Gaming Chairs", price: "₹10,000", numericPrice: 10000}] },
      { name: "Health & Personal Care", items: [{name: "Trimmers", price: "₹800", numericPrice: 800}, {name: "Shavers", price: "₹1,200", numericPrice: 1200}, {name: "Massagers", price: "₹2,000", numericPrice: 2000}, {name: "Smart Wearables", price: "₹4,000", numericPrice: 4000}, {name: "Blood Pressure Monitors", price: "₹1,500", numericPrice: 1500}] },
      { name: "Laptop & Desktop", items: [{name: "Laptops", price: "₹45,000", numericPrice: 45000}, {name: "Desktops", price: "₹35,000", numericPrice: 35000}, {name: "Tablets", price: "₹18,000", numericPrice: 18000}, {name: "Laptop Bags", price: "₹1,000", numericPrice: 1000}, {name: "Laptop Stands", price: "₹500", numericPrice: 500}] },
      { name: "Mobile Accessories", items: [{name: "Power Banks", price: "₹1,000", numericPrice: 1000}, {name: "Mobile Cases", price: "₹300", numericPrice: 300}, {name: "Screen Protectors", price: "₹200", numericPrice: 200}, {name: "Chargers", price: "₹600", numericPrice: 600}] },
      { name: "Smart Home Automation", items: [{name: "Smart Lights", price: "₹700", numericPrice: 700}, {name: "Smart Plugs", price: "₹600", numericPrice: 600}, {name: "Smart Speakers", price: "₹3,500", numericPrice: 3500}, {name: "Security Cameras", price: "₹2,500", numericPrice: 2500}] },
      { name: "TV Streaming Device", items: [{name: "Smart TVs", price: "₹20,000", numericPrice: 20000}, {name: "Streaming Sticks", price: "₹2,000", numericPrice: 2000}, {name: "Projectors", price: "₹15,000", numericPrice: 15000}] },
      { name: "Remote Control", items: [{name: "Universal Remotes", price: "₹400", numericPrice: 400}, {name: "Smart Remotes", price: "₹800", numericPrice: 800}] },
      { name: "DTH Set top box", items: [{name: "DTH Boxes", price: "₹1,800", numericPrice: 1800}, {name: "Satellite Dishes", price: "₹2,500", numericPrice: 2500}] },
      { name: "Headphones Pouch & Case Covers", items: [{name: "Headphone Cases", price: "₹250", numericPrice: 250}, {name: "Earbud Cases", price: "₹150", numericPrice: 150}] },
    ]
  },
  {
    name: "Fashion",
    subcategories: [
      { name: "Men's Fashion", items: [{name: "Shirts", price: "₹800", numericPrice: 800}, {name: "Jeans", price: "₹1,200", numericPrice: 1200}, {name: "T-Shirts", price: "₹400", numericPrice: 400}, {name: "Shoes", price: "₹2,500", numericPrice: 2500}, {name: "Jackets", price: "₹1,800", numericPrice: 1800}, {name: "Trousers", price: "₹900", numericPrice: 900}] },
      { name: "Women's Fashion", items: [{name: "Dresses", price: "₹1,500", numericPrice: 1500}, {name: "Kurtis", price: "₹700", numericPrice: 700}, {name: "Sarees", price: "₹3,000", numericPrice: 3000}, {name: "Heels", price: "₹1,800", numericPrice: 1800}, {name: "Skirts", price: "₹600", numericPrice: 600}, {name: "Handbags", price: "₹1,200", numericPrice: 1200}] },
      { name: "Kids' Fashion", items: [{name: "Kids Wear", price: "₹600", numericPrice: 600}, {name: "Footwear", price: "₹500", numericPrice: 500}, {name: "School Uniforms", price: "₹1,000", numericPrice: 1000}, {name: "Party Wear", price: "₹1,500", numericPrice: 1500}] },
      { name: "Accessories", items: [{name: "Watches", price: "₹1,500", numericPrice: 1500}, {name: "Belts", price: "₹400", numericPrice: 400}, {name: "Wallets", price: "₹600", numericPrice: 600}, {name: "Jewelry", price: "₹2,000", numericPrice: 2000}] },
    ]
  },
  {
    name: "Home & Furniture",
    subcategories: [
      { name: "Home Decor", items: [{name: "Paintings", price: "₹1,000", numericPrice: 1000}, {name: "Clocks", price: "₹700", numericPrice: 700}, {name: "Vases", price: "₹500", numericPrice: 500}, {name: "Lamps", price: "₹900", numericPrice: 900}, {name: "Mirrors", price: "₹1,200", numericPrice: 1200}] },
      { name: "Furniture", items: [{name: "Sofas", price: "₹20,000", numericPrice: 20000}, {name: "Beds", price: "₹15,000", numericPrice: 15000}, {name: "Chairs", price: "₹2,000", numericPrice: 2000}, {name: "Tables", price: "₹5,000", numericPrice: 5000}, {name: "Wardrobes", price: "₹12,000", numericPrice: 12000}] },
      { name: "Kitchen & Dining", items: [{name: "Cookware Sets", price: "₹3,000", numericPrice: 3000}, {name: "Dinnerware", price: "₹1,500", numericPrice: 1500}, {name: "Water Bottles", price: "₹300", numericPrice: 300}, {name: "Storage Containers", price: "₹500", numericPrice: 500}] },
      { name: "Bedding & Linen", items: [{name: "Bed Sheets", price: "₹800", numericPrice: 800}, {name: "Comforters", price: "₹2,000", numericPrice: 2000}, {name: "Pillows", price: "₹400", numericPrice: 400}] },
    ]
  },
  {
    name: "Appliances",
    subcategories: [
      { name: "Kitchen Appliances", items: [{name: "Mixers", price: "₹2,500", numericPrice: 2500}, {name: "Blenders", price: "₹1,800", numericPrice: 1800}, {name: "Toasters", price: "₹1,000", numericPrice: 1000}, {name: "Microwave Ovens", price: "₹6,000", numericPrice: 6000}, {name: "Coffee Makers", price: "₹2,000", numericPrice: 2000}] },
      { name: "Home Appliances", items: [{name: "Refrigerators", price: "₹25,000", numericPrice: 25000}, {name: "Washing Machines", price: "₹18,000", numericPrice: 18000}, {name: "ACs", price: "₹30,000", numericPrice: 30000}, {name: "Vacuum Cleaners", price: "₹5,000", numericPrice: 5000}, {name: "Water Purifiers", price: "₹8,000", numericPrice: 8000}] },
      { name: "Personal Care Appliances", items: [{name: "Hair Dryers", price: "₹1,200", numericPrice: 1200}, {name: "Straighteners", price: "₹1,500", numericPrice: 1500}, {name: "Electric Toothbrushes", price: "₹800", numericPrice: 800}] },
    ]
  },
  {
    name: "Sports & Fitness",
    subcategories: [
      { name: "Exercise & Fitness", items: [{name: "Treadmills", price: "₹25,000", numericPrice: 25000}, {name: "Dumbbells", price: "₹1,000", numericPrice: 1000}, {name: "Yoga Mats", price: "₹600", numericPrice: 600}] },
      { name: "Outdoor Sports", items: [{name: "Cricket Bats", price: "₹1,500", numericPrice: 1500}, {name: "Football", price: "₹700", numericPrice: 700}, {name: "Badminton Rackets", price: "₹800", numericPrice: 800}] },
    ]
  },
  {
    name: "Books, Media & Gaming",
    subcategories: [
      { name: "Books", items: [{name: "Fiction", price: "₹300", numericPrice: 300}, {name: "Non-Fiction", price: "₹400", numericPrice: 400}, {name: "Children's Books", price: "₹200", numericPrice: 200}] },
      { name: "Movies & TV Shows", items: [{name: "DVDs", price: "₹250", numericPrice: 250}, {name: "Blu-Rays", price: "₹500", numericPrice: 500}] },
      { name: "Video Games", items: [{name: "Console Games", price: "₹2,000", numericPrice: 2000}, {name: "PC Games", price: "₹1,000", numericPrice: 1000}] },
    ]
  },
  {
    name: "Groceries & Pets",
    subcategories: [
      { name: "Staples", items: [{name: "Rice", price: "₹100", numericPrice: 100}, {name: "Wheat Flour", price: "₹80", numericPrice: 80}, {name: "Pulses", price: "₹120", numericPrice: 120}] },
      { name: "Snacks & Beverages", items: [{name: "Chips", price: "₹50", numericPrice: 50}, {name: "Soft Drinks", price: "₹70", numericPrice: 70}, {name: "Biscuits", price: "₹40", numericPrice: 40}] },
      { name: "Pet Supplies", items: [{name: "Dog Food", price: "₹500", numericPrice: 500}, {name: "Cat Food", price: "₹400", numericPrice: 400}, {name: "Pet Toys", price: "₹200", numericPrice: 200}] },
    ]
  },
];

// Example sale products (used for home page sections) - Added numericPrice for calculation
const saleProducts = [
  { name: "Noise Smartwatches", price: "₹1,099", numericPrice: 1099, discount: "Upto 70% Off", imageUrl: "https://placehold.co/150x150/FFD1DC/E91E63?text=Watch" },
  { name: "Fastrack Smartwatches", price: "₹1,399", numericPrice: 1399, discount: "Upto 60% Off", imageUrl: "https://placehold.co/150x150/D1FFD1/4CAF50?text=Fastrack" },
  { name: "Printers", price: "₹10,999", numericPrice: 10999, discount: "Upto 50% Off", imageUrl: "https://placehold.co/150x150/D1E7FF/2196F3?text=Printer" },
  { name: "Top Mirrorless Cameras", price: "₹50,000", numericPrice: 50000, discount: "Best Deals", imageUrl: "https://placehold.co/150x150/FFF3CD/FFC107?text=Camera" },
  { name: "Best Selling Mobiles", price: "From ₹499*", numericPrice: 499, discount: "Great Value", imageUrl: "https://placehold.co/150x150/FFDCDC/F44336?text=Mobile" },
  { name: "Coffee Powder", price: "₹300", numericPrice: 300, discount: "Upto 80% Off", imageUrl: "https://placehold.co/150x150/DCDCDC/607D8B?text=Coffee" },
  { name: "Best of Action Toys", price: "₹700", numericPrice: 700, discount: "Upto 70% Off", imageUrl: "https://placehold.co/150x150/C8E6C9/8BC34A?text=Toys" },
  { name: "Gym Essentials", price: "₹139", numericPrice: 139, imageUrl: "https://placehold.co/150x150/B2EBF2/00BCD4?text=Gym" },
  { name: "Top Selling Stationery", price: "₹49", numericPrice: 49, imageUrl: "https://placehold.co/150x150/FFECB3/FF9800?text=Stationery" },
  { name: "Geared Cycles", price: "₹8,000", numericPrice: 8000, discount: "Upto 70% Off", imageUrl: "https://placehold.co/150x150/E1BEE7/9C27B0?text=Cycle" },
  { name: "Food Spreads", price: "₹200", numericPrice: 200, discount: "Upto 75% Off", imageUrl: "https://placehold.co/150x150/F8BBD0/E91E63?text=Food" },
  { name: "Remote Control Toys", price: "₹500", numericPrice: 500, discount: "Upto 80% Off", imageUrl: "https://placehold.co/150x150/C5CAE9/3F51B5?text=RCToys" },
];

const beautyFoodToysProducts = [
  { name: "Coffee Powder", price: "₹300", numericPrice: 300, discount: "Upto 80% Off", imageUrl: "https://placehold.co/150x150/DCDCDC/607D8B?text=Coffee" },
  { name: "Action Toys", price: "₹700", numericPrice: 700, discount: "Upto 70% Off", imageUrl: "https://placehold.co/150x150/C8E6C9/8BC34A?text=Action+Toys" },
  { name: "Food Spreads", price: "₹200", numericPrice: 200, discount: "Upto 75% Off", imageUrl: "https://placehold.co/150x150/F8BBD0/E91E63?text=Food+Spreads" },
  { name: "Remote Control Toys", price: "₹500", numericPrice: 500, discount: "Upto 80% Off", imageUrl: "https://placehold.co/150x150/C5CAE9/3F51B5?text=RC+Toys" },
  { name: "Makeup Kits", price: "₹299", numericPrice: 299, imageUrl: "https://placehold.co/150x150/FFC0CB/C2185B?text=Makeup" },
  { name: "Organic Snacks", price: "₹150", numericPrice: 150, imageUrl: "https://placehold.co/150x150/D4EDDA/28A745?text=Snacks" },
];

const sportsHealthcareProducts = [
  { name: "Gym Essentials", price: "₹139", numericPrice: 139, imageUrl: "https://placehold.co/150x150/B2EBF2/00BCD4?text=Gym+Essentials" },
  { name: "Geared Cycles", price: "₹8,000", numericPrice: 8000, imageUrl: "https://placehold.co/150x150/E1BEE7/9C27B0?text=Geared+Cycles" },
  { name: "Yoga Mats", price: "₹600", numericPrice: 600, imageUrl: "https://placehold.co/150x150/FFE0B2/FF9800?text=Yoga+Mats" },
  { name: "Protein Supplements", price: "₹1,500", numericPrice: 1500, imageUrl: "https://placehold.co/150x150/DCEDC8/8BC34A?text=Protein" },
  { name: "Running Shoes", price: "₹999", numericPrice: 999, imageUrl: "https://placehold.co/150x150/BBDEFB/2196F3?text=Running+Shoes" },
  { name: "First Aid Kits", price: "₹250", numericPrice: 250, imageUrl: "https://placehold.co/150x150/FFCDD2/F44336?text=First+Aid" },
];

const mobileProducts = [
  { name: "Latest Smartphones", price: "₹7,999", numericPrice: 7999, imageUrl: "https://placehold.co/150x150/D1FFD1/4CAF50?text=Smartphone" },
  { name: "Budget Phones", price: "₹1,200", numericPrice: 1200, imageUrl: "https://placehold.co/150x150/FFDCDC/F44336?text=Budget+Phone" },
  { name: "Mobile Accessories", price: "₹99", numericPrice: 99, imageUrl: "https://placehold.co/150x150/E0E7FF/4F46E5?text=Accessories" },
  { name: "Power Banks", price: "₹1,000", numericPrice: 1000, imageUrl: "https://placehold.co/150x150/FFF3CD/FFC107?text=Power+Bank" },
];

const fashionProducts = [
  { name: "Men's Casual Wear", price: "₹750", numericPrice: 750, imageUrl: "https://placehold.co/150x150/D1E7FF/2196F3?text=Men+Fashion" },
  { name: "Women's Ethnic Wear", price: "₹499", numericPrice: 499, imageUrl: "https://placehold.co/150x150/FFD1DC/E91E63?text=Women+Fashion" },
  { name: "Kids' Collection", price: "₹300", numericPrice: 300, imageUrl: "https://placehold.co/150x150/C8E6C9/8BC34A?text=Kids+Fashion" },
  { name: "Footwear Deals", price: "₹800", numericPrice: 800, imageUrl: "https://placehold.co/150x150/E1BEE7/9C27B0?text=Footwear" },
];

const groceryProducts = [
  { name: "Fresh Fruits & Veggies", price: "₹120", numericPrice: 120, imageUrl: "https://placehold.co/150x150/DCEDC8/8BC34A?text=Groceries" },
  { name: "Dairy & Bakery", price: "₹250", numericPrice: 250, imageUrl: "https://placehold.co/150x150/BBDEFB/2196F3?text=Dairy" },
  { name: "Staples & Pulses", price: "₹500", numericPrice: 500, imageUrl: "https://placehold.co/150x150/FFCDD2/F44336?text=Staples" },
  { name: "Snacks & Beverages", price: "₹80", numericPrice: 80, imageUrl: "https://placehold.co/150x150/FFE0B2/FF9800?text=Snacks" },
];

// Dummy location data for auto-fill
const locationData = [
  { city: "Agra", state: "Uttar Pradesh", pincode: "282001" },
  { city: "Mumbai", state: "Maharashtra", pincode: "400001" },
  { city: "Delhi", state: "Delhi", pincode: "110001" },
  { city: "Bengaluru", state: "Karnataka", pincode: "560001" },
  { city: "Chennai", state: "Tamil Nadu", pincode: "600001" },
  { city: "Kolkata", state: "West Bengal", pincode: "700001" },
  { city: "Hyderabad", state: "Telangana", pincode: "500001" },
];

// AR Products (for demonstration purposes - these should ideally be transparent PNGs)
const arProducts = [
  { id: 'tshirt-1', name: 'Blue T-Shirt', imageUrl: 'https://placehold.co/200x200/ADD8E6/000000?text=Blue+T-Shirt' },
  { id: 'watch-1', name: 'Smart Watch', imageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Smart+Watch' },
  { id: 'glasses-1', name: 'Sunglasses', imageUrl: 'https://placehold.co/150x50/333333/FFFFFF?text=Sunglasses' },
  { id: 'dress-1', name: 'Red Dress', imageUrl: 'https://placehold.co/200x300/FF6347/FFFFFF?text=Red+Dress' },
  { id: 'cap-1', name: 'Baseball Cap', imageUrl: 'https://placehold.co/150x100/4CAF50/FFFFFF?text=Baseball+Cap' },
];


// Component to show when login is required
const LoginRequiredMessage = ({ onNavigateToLogin, theme }) => {
  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-100');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-600');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-lg shadow-xl w-full max-w-md text-center ${borderColor} border`}>
        <User size={60} className="text-red-500 mx-auto mb-6" />
        <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>Please Log In to Access All Features</h2>
        <p className={`mb-6 ${subTextColor}`}>
          You need to be logged in to view product categories, book flights, hotels, and see exclusive deals.
        </p>
        <button
          onClick={onNavigateToLogin}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

// Login Page Component
const LoginPage = ({ onLoginSuccess, onNavigateToHome, theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-100');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const inputBorder = theme === 'dark' ? 'border-gray-600' : (theme === 'eyeFriendly' ? 'border-yellow-300' : 'border-gray-300');
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 text-gray-900' : 'bg-white text-gray-800');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');


  const handleLogin = (e) => {
    e.preventDefault();
    // For demonstration, login always succeeds with hardcoded credentials
    onLoginSuccess();
  };

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-lg shadow-xl w-full max-w-md ${borderColor} border`}>
        <h2 className={`text-3xl font-bold text-center text-indigo-700 mb-8 ${textColor}`}>Login to PulseCart</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${textColor}`}>Email Address</label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${inputBg}`}
              placeholder="user@example.com" // Hint for demonstration
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${textColor}`}>Password</label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${inputBg}`}
              placeholder="password" // Hint for demonstration
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className={`mt-6 text-center ${textColor}`}>
          Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Sign Up</a>
        </p>
        <button
          onClick={onNavigateToHome}
          className={`mt-4 w-full text-indigo-600 border border-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors duration-200 ${theme === 'dark' ? 'hover:text-white' : ''}`}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Product Detail Page Component
const ProductDetailPage = ({ product, addToCart, onNavigateToHome, onNavigateToCategories, theme }) => {
  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-50 text-gray-900' : 'bg-gray-50 text-gray-800')}`}>
        <div className={`p-8 rounded-lg shadow-lg text-center ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-100 border border-yellow-200' : 'bg-white border border-gray-200')}`}>
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you are looking for does not exist or was not selected.</p>
          <button onClick={onNavigateToHome} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Simulated price comparison data
  const generateComparisonPrices = (basePrice) => {
    const prices = [];
    const websites = ['E-Shop.com', 'MegaMart', 'GlobalDeals', 'ValueStore'];

    websites.forEach(website => {
      // Generate prices within +/- 5-15% of the base price
      const variance = (Math.random() * 0.20 - 0.10); // -10% to +10%
      const price = Math.round(basePrice * (1 + variance) / 10) * 10; // Round to nearest 10
      prices.push({ website, price: Math.max(10, price) }); // Ensure price is not too low
    });

    // Sort prices to show the lowest first
    prices.sort((a, b) => a.price - b.price);
    return prices;
  };

  const comparisonPrices = generateComparisonPrices(product.numericPrice);

  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-600');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');
  const tableHeaderBg = theme === 'dark' ? 'bg-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-200' : 'bg-gray-100');
  const tableRowBg = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-white');


  return (
    <div className={`min-h-screen p-4 md:p-8 ${bgColor}`}>
      <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-5xl mx-auto ${borderColor} border`}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center items-center p-4">
            <img
              src={`https://placehold.co/400x400/${theme === 'dark' ? '4F46E5/E0E7FF' : (theme === 'eyeFriendly' ? 'FDE68A/78350F' : 'E0E7FF/4F46E5')}?text=${product.name.replace(/\s/g, '+')}`}
              alt={product.name}
              className="max-w-full h-auto rounded-lg shadow-md"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/cccccc/000000?text=Image+Not+Found"; }}
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-4">
            <h2 className={`text-4xl font-bold text-indigo-700 mb-4 ${textColor}`}>{product.name}</h2>
            <p className={`text-3xl font-extrabold text-green-600 mb-6`}>
              Price: {product.price}
            </p>
            <p className={`text-lg mb-6 ${subTextColor}`}>
              {/* Dummy description */}
              This high-quality {product.name.toLowerCase()} offers exceptional performance and durability. Perfect for daily use, it combines innovative features with a sleek design. Enjoy a premium experience at an unbeatable value.
            </p>
            <ul className={`list-disc list-inside mb-8 ${subTextColor} space-y-2`}>
              <li>Feature 1: High-performance processor</li>
              <li>Feature 2: Long-lasting battery life</li>
              <li>Feature 3: Ergonomic design for comfort</li>
              <li>Feature 4: Eco-friendly materials</li>
            </ul>
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Price Comparison Section */}
        <div className={`mt-12 p-6 rounded-lg border ${borderColor} ${tableRowBg}`}>
          <h3 className={`text-2xl font-bold text-indigo-700 mb-6 text-center ${textColor}`}>Price Comparison</h3>
          <p className={`${subTextColor} text-center mb-6`}>
            Compare prices for {product.name} across various online retailers to ensure you get the best deal!
            <br/><strong className="text-red-500">Note: Prices are simulated and for demonstration purposes only.</strong>
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className={`${tableHeaderBg}`}>
                <tr>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${subTextColor} uppercase tracking-wider`}>
                    Website
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${subTextColor} uppercase tracking-wider`}>
                    Price
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${subTextColor} uppercase tracking-wider`}>
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${borderColor}`}>
                {/* PulseCart's price */}
                <tr className={`${tableRowBg}`}>
                  <td className={`px-6 py-4 whitespace-nowrap text-lg font-semibold ${textColor}`}>
                    PulseCart (Our Price)
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-lg font-bold text-green-600`}>
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className="text-green-600">You're already here!</span>
                  </td>
                </tr>
                {/* Simulated competitor prices */}
                {comparisonPrices.map((comp, index) => (
                  <tr key={index} className={`${tableRowBg}`}>
                    <td className={`px-6 py-4 whitespace-nowrap ${subTextColor}`}>
                      {comp.website}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${comp.price < product.numericPrice ? 'text-red-500 font-semibold' : subTextColor}`}>
                      ₹{comp.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200">Visit Site</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={onNavigateToCategories}
            className={`bg-gray-200 ${textColor} py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 hover:bg-yellow-300 text-gray-900' : '')}`}
          >
            Back to Shop
          </button>
          <button
            onClick={onNavigateToHome}
            className={`bg-gray-200 ${textColor} py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 hover:bg-yellow-300 text-gray-900' : '')}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};


// Product Category Page Component
const ProductCategoryPage = ({ onNavigateToHome, navigateToProductDetail, addToCart, theme }) => { // Added addToCart prop
  const [activeCategory, setActiveCategory] = useState(productCategories[0]);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-600');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');
  const buttonActiveBg = theme === 'dark' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-700';
  const buttonHoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const subButtonActiveBg = theme === 'dark' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700';
  const subButtonHoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';


  const productsToDisplay = activeSubcategory
    ? activeSubcategory.items
    : activeCategory.subcategories.flatMap(sub => sub.items);

  return (
    <div className={`min-h-screen p-4 md:p-8 ${bgColor}`}>
      <div className={`${cardBg} rounded-lg shadow-lg flex flex-col md:flex-row min-h-[70vh]`}>
        {/* Category List */}
        <div className={`w-full md:w-1/4 border-r ${borderColor} p-6`}>
          <h3 className={`text-2xl font-bold text-indigo-700 mb-6 ${textColor}`}>Categories</h3>
          <ul className="space-y-2">
            {productCategories.map((category) => (
              <li key={category.name}>
                <button
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveSubcategory(null); // Reset subcategory when main category changes
                  }}
                  className={`w-full text-left py-3 px-4 rounded-md flex items-center justify-between transition-colors duration-200 ${
                    activeCategory.name === category.name
                      ? buttonActiveBg
                      : `${subTextColor} ${buttonHoverBg}`
                  }`}
                >
                  {category.name} <ChevronRight size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Subcategory List */}
        <div className={`w-full md:w-1/4 border-r ${borderColor} p-6 ${theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50')}`}>
          <h3 className={`text-2xl font-bold text-indigo-700 mb-6 ${textColor}`}>{activeCategory.name}</h3>
          <ul className="space-y-2">
            {activeCategory.subcategories.map((sub) => (
              <li key={sub.name}>
                <button
                  onClick={() => setActiveSubcategory(sub)}
                  className={`w-full text-left py-3 px-4 rounded-md flex items-center justify-between transition-colors duration-200 ${
                    activeSubcategory && activeSubcategory.name === sub.name
                      ? subButtonActiveBg
                      : `${subTextColor} ${subButtonHoverBg}`
                  }`}
                >
                  {sub.name} <ChevronRight size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Items */}
        <div className="flex-1 p-6">
          <h3 className={`text-2xl font-bold text-indigo-700 mb-6 ${textColor}`}>
            {activeSubcategory ? activeSubcategory.name : `All ${activeCategory.name} Products`}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsToDisplay.map((item, index) => (
              <div
                key={index}
                className={`${cardBg} ${borderColor} border rounded-lg shadow-sm p-4 text-center transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between`}
              >
                <div className="cursor-pointer" onClick={() => navigateToProductDetail(item)}>
                  <img
                    src={`https://placehold.co/150x150/${theme === 'dark' ? '4F46E5/E0E7FF' : (theme === 'eyeFriendly' ? 'FDE68A/78350F' : 'E0E7FF/4F46E5')}?text=${item.name.replace(/\s/g, '+')}`}
                    alt={item.name}
                    className="mx-auto mb-4 rounded-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/cccccc/000000?text=Image+Not+Found"; }}
                  />
                  <h4 className={`text-lg font-semibold mb-2 ${textColor}`}>{item.name}</h4>
                  <p className={`${subTextColor}`}>Price: {item.price}</p>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200 self-center"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={onNavigateToHome}
            className={`mt-8 bg-gray-200 ${textColor} py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 hover:bg-yellow-300 text-gray-900' : '')}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// Plane Booking Page Component
const PlaneBookingPage = ({ onNavigateToHome, onBookingSuccess, theme }) => {
  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-100');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
  const inputBorder = theme === 'dark' ? 'border-gray-600' : (theme === 'eyeFriendly' ? 'border-yellow-300' : 'border-gray-300');
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 text-gray-900' : 'bg-white text-gray-800');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');


  const handleSearchFlights = () => {
    // Simulate flight booking
    onBookingSuccess("Flight booked successfully!");
    // onNavigateToHome(); // No longer navigate to home immediately, let the success page handle it
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-lg shadow-xl w-full max-w-2xl text-center ${borderColor} border`}>
        <Plane size={60} className="text-indigo-600 mx-auto mb-6" />
        <h2 className={`text-3xl font-bold text-indigo-700 mb-4 ${textColor}`}>Book Your Flights</h2>
        <p className={`${subTextColor} mb-6`}>
          Search for the best flight deals and book your next adventure with ease.
        </p>
        <div className="space-y-4 mb-6">
          <input type="text" placeholder="Departure City" className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${inputBg}`} />
          <input type="date" placeholder="Departure Date" className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${inputBg}`} />
          <input type="date" placeholder="Return Date (Optional)" className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${inputBg}`} />
        </div>
        <button
          onClick={handleSearchFlights}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Search Flights
        </button>
        <button
          onClick={onNavigateToHome}
          className={`mt-4 w-full text-indigo-600 border border-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors duration-200 ${theme === 'dark' ? 'hover:text-white' : ''}`}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Hotel Booking Page Component
const HotelBookingPage = ({ onNavigateToHome, onBookingSuccess, theme }) => {
  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-100');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
  const inputBorder = theme === 'dark' ? 'border-gray-600' : (theme === 'eyeFriendly' ? 'border-yellow-300' : 'border-gray-300');
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 text-gray-900' : 'bg-white text-gray-800');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');

  const handleSearchHotels = () => {
    // Simulate hotel booking
    onBookingSuccess("Hotel booked successfully!");
    // onNavigateToHome(); // No longer navigate to home immediately, let the success page handle it
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-lg shadow-xl w-full max-w-2xl text-center ${borderColor} border`}>
        <Hotel size={60} className="text-indigo-600 mx-auto mb-6" />
        <h2 className={`text-3xl font-bold text-indigo-700 mb-4 ${textColor}`}>Find Your Perfect Stay</h2>
        <p className={`${subTextColor} mb-6`}>
          Discover hotels, resorts, and accommodations for every budget and preference.
        </p>
        <div className="space-y-4 mb-6">
          <input type="text" placeholder="Destination" className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${inputBg}`} />
          <input type="date" placeholder="Check-in Date" className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${inputBg}`} />
          <input type="date" placeholder="Check-out Date" className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${inputBg}`} />
          <input type="number" placeholder="Number of Guests" min="1" className={`w-full px-4 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${inputBg}`} />
        </div>
        <button
          onClick={handleSearchHotels}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Search Hotels
        </button>
        <button
          onClick={onNavigateToHome}
          className={`mt-4 w-full text-indigo-600 border border-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors duration-200 ${theme === 'dark' ? 'hover:text-white' : ''}`}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Sale Page Component
const SalePage = ({ onNavigateToHome, addToCart, navigateToProductDetail, theme }) => { // Added navigateToProductDetail
  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-600');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');

  return (
    <div className={`min-h-screen p-4 md:p-8 ${bgColor}`}>
      <div className={`${cardBg} rounded-lg shadow-lg p-6`}>
        <h2 className={`text-3xl font-bold text-indigo-700 text-center mb-8 ${textColor}`}>Today's Best Deals!</h2>
        <p className={`text-center mb-8 ${subTextColor}`}>
          Don't miss out on these limited-time offers across various categories.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {saleProducts.map((product, index) => (
            <div
              key={index}
              className={`flex-none w-48 ${cardBg} rounded-lg shadow-sm p-4 text-center border ${borderColor} transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
              onClick={() => navigateToProductDetail(product)} // Navigate to detail page
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mx-auto mb-4 rounded-md"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/cccccc/000000?text=Image+Not+Found"; }}
              />
              <h4 className={`text-lg font-semibold mb-1 ${textColor}`}>{product.name}</h4>
              <p className={`text-sm ${subTextColor} line-through`}>{product.originalPrice}</p>
              <p className="text-xl font-bold text-red-600 mt-1">{product.price}</p>
              <p className="text-green-600 font-medium text-sm mb-2">{product.discount}</p>
              {/* Removed Add to Cart from here, now on product detail page */}
            </div>
          ))}
        </div>
        <button
          onClick={onNavigateToHome}
          className={`mt-8 bg-gray-200 ${textColor} py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 hover:bg-yellow-300 text-gray-900' : '')}`}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Payment Page Component
const PaymentPage = ({ cart, totalPrice, onNavigateToHome, onPlaceOrder, theme }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [fullName, setFullName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [formError, setFormError] = useState('');

  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-600');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');
  const inputBorder = theme === 'dark' ? 'border-gray-600' : (theme === 'eyeFriendly' ? 'border-yellow-300' : 'border-gray-300');
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 text-gray-900' : 'bg-white text-gray-800');
  const disabledInputBg = theme === 'dark' ? 'bg-gray-800 text-gray-400' : (theme === 'eyeFriendly' ? 'bg-yellow-150 text-gray-700' : 'bg-gray-100');


  const handleCityChange = (e) => {
    const enteredCity = e.target.value;
    setCity(enteredCity);
    const foundLocation = locationData.find(loc => loc.city.toLowerCase() === enteredCity.toLowerCase());
    if (foundLocation) {
      setState(foundLocation.state);
      setPincode(foundLocation.pincode);
    } else {
      setState('');
      setPincode('');
    }
  };

  const handlePlaceOrder = () => {
    // Basic validation
    if (!fullName || !addressLine1 || !city || !state || !pincode) {
      setFormError("Please fill in all shipping details.");
      return;
    }
    setFormError(''); // Clear any previous errors
    onPlaceOrder("Your order has been placed successfully! Thank you for trusting us."); // Pass success message
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 flex items-center justify-center ${bgColor}`}>
      <div className={`${cardBg} rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto ${borderColor} border`}>
        <h2 className={`text-4xl font-bold text-indigo-700 mb-10 text-center ${textColor}`}>Checkout</h2>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <XCircle size={80} className="text-gray-400 mx-auto mb-6" />
            <p className={`text-2xl font-semibold mb-6 ${textColor}`}>Your cart is empty.</p>
            <button
              onClick={onNavigateToHome}
              className="bg-indigo-600 text-white py-3 px-8 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className={`mb-10 p-6 rounded-lg border ${borderColor} ${theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50')}`}>
              <h3 className={`text-2xl font-semibold mb-5 ${textColor}`}>Order Summary</h3>
              <ul className="space-y-4 mb-4">
                {cart.map((item, index) => (
                  <li key={index} className={`flex justify-between items-center border-b ${borderColor} pb-2 text-lg`}>
                    <span className={`${subTextColor}`}>{item.name}</span>
                    <span className={`font-medium ${textColor}`}>₹{item.numericPrice.toLocaleString('en-IN')}</span>
                  </li>
                ))}
              </ul>
              <div className={`flex justify-between items-center mt-6 pt-4 border-t-2 border-indigo-300 ${theme === 'dark' ? 'border-indigo-600' : ''}`}>
                <span className={`text-2xl font-bold ${textColor}`}>Total:</span>
                <span className="text-3xl font-extrabold text-indigo-700">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className={`mb-10 p-6 rounded-lg border ${borderColor} ${theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50')}`}>
              <h3 className={`text-2xl font-semibold mb-5 ${textColor}`}>Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className={`flex items-center space-x-3 cursor-pointer p-4 border ${inputBorder} rounded-md hover:bg-indigo-50 transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-indigo-900' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="form-radio text-indigo-600 h-5 w-5"
                  />
                  <span className={`text-lg font-medium ${subTextColor}`}>Credit/Debit Card</span>
                </label>
                <label className={`flex items-center space-x-3 cursor-pointer p-4 border ${inputBorder} rounded-md hover:bg-indigo-50 transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-indigo-900' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="form-radio text-indigo-600 h-5 w-5"
                  />
                  <span className={`text-lg font-medium ${subTextColor}`}>UPI</span>
                </label>
                <label className={`flex items-center space-x-3 cursor-pointer p-4 border ${inputBorder} rounded-md hover:bg-indigo-50 transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-indigo-900' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="form-radio text-indigo-600 h-5 w-5"
                  />
                  <span className={`text-lg font-medium ${subTextColor}`}>Net Banking</span>
                </label>
              </div>
            </div>

            <div className={`mb-10 p-6 rounded-lg border ${borderColor} ${theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50')}`}>
              <h3 className={`text-2xl font-semibold mb-5 ${textColor}`}>Shipping Address</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className={`w-full px-4 py-3 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${inputBg}`} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input type="text" placeholder="Address Line 1" className={`w-full px-4 py-3 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${inputBg}`} value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
                <input type="text" placeholder="City (e.g., Agra, Mumbai)" className={`w-full px-4 py-3 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${inputBg}`} value={city} onChange={handleCityChange} required />
                <input type="text" placeholder="State" className={`w-full px-4 py-3 border ${inputBorder} rounded-md cursor-not-allowed text-lg ${disabledInputBg}`} value={state} readOnly />
                <input type="text" placeholder="Pincode" className={`w-full px-4 py-3 border ${inputBorder} rounded-md cursor-not-allowed text-lg ${disabledInputBg}`} value={pincode} readOnly />
              </div>
              {formError && (
                <p className="text-red-500 text-sm mt-3 text-center">{formError}</p>
              )}
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-md font-semibold text-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Place Order
            </button>
            <button
              onClick={onNavigateToHome}
              className={`mt-4 w-full text-indigo-600 border border-indigo-600 py-3 px-6 rounded-md hover:bg-indigo-50 transition-colors duration-200 text-lg ${theme === 'dark' ? 'hover:text-white' : ''}`}
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};


// Full-screen Order/Booking Success Page
const OrderSuccessPage = ({ message, onNavigateToHome, theme }) => {
  const [feedback, setFeedback] = useState('');

  const bgColor = theme === 'dark' ? 'from-gray-900 to-gray-700' : (theme === 'eyeFriendly' ? 'from-yellow-600 to-yellow-700' : 'from-indigo-600 to-purple-700');
  const cardBg = theme === 'dark' ? 'bg-gray-800 bg-opacity-20' : 'bg-white bg-opacity-10';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 text-gray-900' : 'bg-white text-gray-800');
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-white';
  const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-white border-opacity-20';

  const handleSubmitFeedback = () => {
    console.log("User feedback:", feedback);
    alert("Thank you for your valuable feedback!"); // Simple alert for feedback submission
    setFeedback(''); // Clear feedback after submission
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${bgColor} ${textColor} flex flex-col items-center justify-center p-8 z-[200] text-center`}>
      <CheckCircle size={100} className="text-green-300 mb-8 animate-bounce" />
      <h2 className="text-5xl font-extrabold mb-6 leading-tight">
        {message}
      </h2>
      <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl">
        Thank you for trusting us! We appreciate your business.
      </p>

      <div className={`${cardBg} backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border ${borderColor}`}>
        <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>Give Your Valuable Feedback</h3>
        <textarea
          className={`w-full p-3 rounded-md border border-gray-300 ${inputBg} focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[100px]`}
          placeholder="Share your experience with us..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <button
          onClick={handleSubmitFeedback}
          className="mt-4 w-full bg-indigo-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
        >
          Submit Feedback
        </button>
      </div>

      <button
        onClick={onNavigateToHome}
        className="mt-12 bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105"
      >
        Continue Shopping
      </button>
    </div>
  );
};


// Carousel Component for Home Page Banners
const Carousel = ({ navigateTo, theme }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [
    {
      title: "Roundtrip booking offers!",
      subtitle: "Upto ₹3,500 Off",
      code: "ROUNDTRIP",
      buttonText: "Book now",
      action: () => navigateTo('planeBooking'),
      imageUrl: "https://placehold.co/1200x300/6A0DAD/FFFFFF?text=Roundtrip+booking+offers!+Upto+%E2%82%B93,500+Off",
      bgColor: "from-purple-600 to-indigo-700",
    },
    {
      title: "Today's Hot Deals!",
      subtitle: "Massive Savings Across Categories",
      code: "FLASH25",
      buttonText: "Shop All Deals",
      action: () => navigateTo('sale'),
      imageUrl: "https://placehold.co/1200x300/DC2626/FFFFFF?text=Today's+Hot+Deals!+Massive+Savings",
      bgColor: "from-red-500 to-pink-600",
    },
    {
      title: "Find Your Perfect Stay",
      subtitle: "Exclusive Hotel Deals",
      code: "HOTELBLISS",
      buttonText: "Book Hotels",
      action: () => navigateTo('hotelBooking'),
      imageUrl: "https://placehold.co/1200x300/0D9488/FFFFFF?text=Find+Your+Perfect+Stay+Exclusive+Hotel+Deals",
      bgColor: "from-teal-500 to-cyan-600",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [banners.length]);

  const currentBanner = banners[activeIndex];

  const sectionBgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const sectionTextColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');

  return (
    <section className={`relative bg-gradient-to-r ${currentBanner.bgColor} ${sectionTextColor} py-16 px-6 md:px-12 text-center rounded-lg m-4 shadow-lg overflow-hidden transition-all duration-1000 ease-in-out`}>
      <img
        src={currentBanner.imageUrl}
        alt={currentBanner.title}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x300/6A0DAD/FFFFFF?text=Banner+Image"; }}
      />
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          {currentBanner.title}
        </h2>
        <p className="text-2xl md:text-3xl font-bold mb-6">
          {currentBanner.subtitle}
        </p>
        <button
          onClick={currentBanner.action}
          className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
        >
          {currentBanner.buttonText}
        </button>
        {currentBanner.code && <p className="text-sm mt-4 opacity-80">USE CODE: {currentBanner.code}</p>}
      </div>
    </section>
  );
};


// New LoggedInHomePage component
const LoggedInHomePage = ({ navigateTo, navigateToProductDetail, addToCart, searchTerm, setSearchTerm, suggestions, handleSuggestionClick, handleSearchChange, handleSearchSubmit, theme }) => { // Added addToCart
  const mainCategories = [
    { name: "Grocery", icon: "https://placehold.co/24x24/E0E7FF/4F46E5?text=G" },
    { name: "Mobiles", icon: "https://placehold.co/24x24/D1FFD1/4CAF50?text=M" },
    { name: "Fashion", icon: "https://placehold.co/24x24/FFDCDC/F44336?text=F" },
    { name: "Electronics", icon: "https://placehold.co/24x24/D1E7FF/2196F3?text=E" },
    { name: "Home & Furniture", icon: "https://placehold.co/24x24/FFF3CD/FFC107?text=H" },
    { name: "Appliances", icon: "https://placehold.co/24x24/E1BEE7/9C27B0?text=A" },
    { name: "Flight Bookings", icon: "https://placehold.co/24x24/BBDEFB/2196F3?text=F" },
    { name: "Beauty, Toys & More", icon: "https://placehold.co/24x24/F8BBD0/E91E63?text=B" },
    { name: "Two Wheelers", icon: "https://placehold.co/24x24/C8E6C9/8BC34A?text=T" },
  ];

  const sectionBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const cardBg = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-200' : 'bg-gray-50');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-600');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-300' : 'border-gray-100');


  return (
    <>
      {/* Top Category Navigation */}
      <nav className={`${sectionBg} shadow-sm py-3 px-6 md:px-12 flex items-center justify-around overflow-x-auto whitespace-nowrap rounded-b-lg`}>
        {mainCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => {
              if (category.name === "Flight Bookings") navigateTo('planeBooking');
              else if (category.name === "Electronics" || category.name === "Fashion" || category.name === "Home & Furniture" || category.name === "Appliances") navigateTo('categories');
              else if (category.name === "Mobiles") { /* navigate to mobiles specific page/section */ }
              else if (category.name === "Grocery") { /* navigate to grocery specific page/section */ }
              else if (category.name === "Beauty, Toys & More") { /* navigate to beauty/toys specific page/section */ }
              else if (category.name === "Two Wheelers") { /* navigate to two wheelers specific page/section */ }
              else navigateTo('home'); // Fallback
            }}
            className={`flex flex-col items-center p-2 ${subTextColor} hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200 min-w-[80px] ${theme === 'dark' ? 'hover:bg-gray-700' : (theme === 'eyeFriendly' ? 'hover:bg-yellow-200' : '')}`}
          >
            <img src={category.icon} alt={category.name} className="w-6 h-6 mb-1 rounded-full" />
            <span className="text-xs font-medium">{category.name}</span>
          </button>
        ))}
      </nav>

      {/* Main Banner Carousel */}
      <Carousel navigateTo={navigateTo} theme={theme} />

      {/* Best of Mobiles Section */}
      <section className={`py-12 px-6 md:px-12 ${sectionBg} m-4 rounded-lg shadow-lg`}>
        <h3 className={`text-3xl font-bold text-indigo-700 mb-8 ${textColor}`}>Best of Mobiles</h3>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {mobileProducts.map((product, index) => (
            <div
              key={index}
              className={`flex-none w-48 ${cardBg} rounded-lg shadow-md p-4 text-center border ${borderColor} transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between`}
            >
              <div className="cursor-pointer" onClick={() => navigateToProductDetail(product)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto mb-3 w-32 h-32 object-contain rounded-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/cccccc/000000?text=Item"; }}
                />
                <h4 className={`text-md font-semibold mb-1 truncate ${textColor}`}>{product.name}</h4>
                <p className="text-sm text-red-600 font-medium">{product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200 self-center"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Best of Electronics Section */}
      <section className={`py-12 px-6 md:px-12 ${sectionBg} m-4 rounded-lg shadow-lg`}>
        <h3 className={`text-3xl font-bold text-indigo-700 mb-8 ${textColor}`}>Best of Electronics</h3>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {saleProducts.slice(0, 8).map((product, index) => (
            <div
              key={index}
              className={`flex-none w-48 ${cardBg} rounded-lg shadow-md p-4 text-center border ${borderColor} transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between`}
            >
              <div className="cursor-pointer" onClick={() => navigateToProductDetail(product)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto mb-3 w-32 h-32 object-contain rounded-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/cccccc/000000?text=Item"; }}
                />
                <h4 className={`text-md font-semibold mb-1 truncate ${textColor}`}>{product.name}</h4>
                <p className="text-sm text-red-600 font-medium">{product.discount || product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200 self-center"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Top Fashion Deals Section */}
      <section className={`py-12 px-6 md:px-12 ${sectionBg} m-4 rounded-lg shadow-lg`}>
        <h3 className={`text-3xl font-bold text-indigo-700 mb-8 ${textColor}`}>Top Fashion Deals</h3>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {fashionProducts.map((product, index) => (
            <div
              key={index}
              className={`flex-none w-48 ${cardBg} rounded-lg shadow-md p-4 text-center border ${borderColor} transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between`}
            >
              <div className="cursor-pointer" onClick={() => navigateToProductDetail(product)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto mb-3 w-32 h-32 object-contain rounded-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/cccccc/000000?text=Item"; }}
                />
                <h4 className={`text-md font-semibold mb-1 truncate ${textColor}`}>{product.name}</h4>
                <p className="text-sm text-red-600 font-medium">{product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200 self-center"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Grocery Essentials Section */}
      <section className={`py-12 px-6 md:px-12 ${sectionBg} m-4 rounded-lg shadow-lg`}>
        <h3 className={`text-3xl font-bold text-indigo-700 mb-8 ${textColor}`}>Daily Grocery Essentials</h3>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {groceryProducts.map((product, index) => (
            <div
              key={index}
              className={`flex-none w-48 ${cardBg} rounded-lg shadow-md p-4 text-center border ${borderColor} transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between`}
            >
              <div className="cursor-pointer" onClick={() => navigateToProductDetail(product)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto mb-3 w-32 h-32 object-contain rounded-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/cccccc/000000?text=Item"; }}
                />
                <h4 className={`text-md font-semibold mb-1 truncate ${textColor}`}>{product.name}</h4>
                <p className="text-sm text-red-600 font-medium">{product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200 self-center"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Beauty, Food, Toys & More Section */}
      <section className={`py-12 px-6 md:px-12 ${sectionBg} m-4 rounded-lg shadow-lg`}>
        <h3 className={`text-3xl font-bold text-indigo-700 mb-8 ${textColor}`}>Beauty, Food, Toys & More</h3>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {beautyFoodToysProducts.map((product, index) => (
            <div
              key={index}
              className={`flex-none w-48 ${cardBg} rounded-lg shadow-md p-4 text-center border ${borderColor} transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between`}
            >
              <div className="cursor-pointer" onClick={() => navigateToProductDetail(product)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto mb-3 w-32 h-32 object-contain rounded-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/cccccc/000000?text=Item"; }}
                />
                <h4 className={`text-md font-semibold mb-1 truncate ${textColor}`}>{product.name}</h4>
                <p className="text-sm text-red-600 font-medium">{product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200 self-center"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sports, Healthcare & More Section */}
      <section className={`py-12 px-6 md:px-12 ${sectionBg} m-4 rounded-lg shadow-lg`}>
        <h3 className={`text-3xl font-bold text-indigo-700 mb-8 ${textColor}`}>Sports, Healthcare & More</h3>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {sportsHealthcareProducts.map((product, index) => (
            <div
              key={index}
              className={`flex-none w-48 ${cardBg} rounded-lg shadow-md p-4 text-center border ${borderColor} transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between`}
            >
              <div className="cursor-pointer" onClick={() => navigateToProductDetail(product)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto mb-3 w-32 h-32 object-contain rounded-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/cccccc/000000?text=Item"; }}
                />
                <h4 className={`text-md font-semibold mb-1 truncate ${textColor}`}>{product.name}</h4>
                <p className="text-sm text-red-600 font-medium">{product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200 self-center"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why to use PulseCart Section (retained for consistency) */}
      <section id="why-pulse-cart" className={`py-16 px-6 md:px-12 ${sectionBg} m-4 rounded-lg shadow-lg`}>
        <h3 className={`text-4xl font-bold text-center text-indigo-700 mb-12 ${textColor}`}>Why Choose PulseCart?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10"> {/* Changed to 4 columns for AI feature */}
          <div className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border border-yellow-300' : 'bg-indigo-50')}`}>
            <CheckCircle size={48} className="text-indigo-500 mb-4" />
            <h4 className={`text-2xl font-semibold mb-3 ${textColor}`}>Quality Products</h4>
            <p className={`${subTextColor}`}>
              We handpick every item to ensure you receive only the best quality products from trusted brands.
            </p>
          </div>
          <div className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border border-yellow-300' : 'bg-indigo-50')}`}>
            <ShoppingCart size={48} className="text-indigo-500 mb-4" />
            <h4 className={`text-2xl font-semibold mb-3 ${textColor}`}>Seamless Shopping</h4>
            <p className={`${subTextColor}`}>
              Enjoy an intuitive and easy-to-navigate website, making your shopping experience a breeze.
            </p>
          </div>
          <div className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border and border-yellow-300' : 'bg-indigo-50')}`}>
            <Star size={48} className="text-indigo-500 mb-4" />
            <h4 className={`text-2xl font-semibold mb-3 ${textColor}`}>Excellent Support</h4>
            <p className={`${subTextColor}`}>
              Our dedicated customer support team is always ready to assist you with any queries or issues.
            </p>
          </div>
          {/* New AI Feature Section */}
          <div className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border border-yellow-300' : 'bg-indigo-50')}`}>
            <Brain size={48} className="text-indigo-500 mb-4" /> {/* Using Brain icon for AI */}
            <h4 className={`text-2xl font-semibold mb-3 ${textColor}`}>AI-Powered Assistance</h4>
            <p className={`${subTextColor}`}>
              Experience smart recommendations and quick answers with our integrated AI features, enhancing your shopping journey.
            </p>
          </div>
        </div>
      </section>

      {/* What our users say Section (Testimonials) - retained for consistency */}
      <section id="user-testimonials" className={`${theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-100')} py-16 px-6 md:px-12 m-4 rounded-lg shadow-lg`}>
        <h3 className={`text-4xl font-bold text-center text-indigo-700 mb-12 ${textColor}`}>What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className={`${cardBg} p-8 rounded-xl shadow-md border ${borderColor} flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300`}>
            <Quote size={40} className="text-indigo-400 mb-4" />
            <p className={`${subTextColor} italic mb-4`}>
              "PulseCart has transformed my online shopping! The variety of products is amazing, and the delivery is always fast. Highly recommended!"
            </p>
            <p className={`font-semibold text-indigo-600 ${textColor}`}>- Jane Doe</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className={`${cardBg} p-8 rounded-xl shadow-md border ${borderColor} flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300`}>
            <Quote size={40} className="text-indigo-400 mb-4" />
            <p className={`${subTextColor} italic mb-4`}>
              "I love the user-friendly interface of PulseCart. Finding what I need is super easy, and their customer service is top-notch. A fantastic experience!"
            </p>
            <p className={`font-semibold text-indigo-600 ${textColor}`}>- John Smith</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


// Augmented Reality Try-On Page Component (Simulated)
const AugmentedRealityTryOnPage = ({ onNavigateToHome, theme }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productTransform, setProductTransform] = useState({ x: 0, y: 0, scale: 1, rotation: 0 });

  const tryOnAreaRef = useRef(null);
  const productRef = useRef(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const isRotating = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startScale = useRef(1);
  const startRotation = useRef(0);
  const initialAngle = useRef(0);
  const initialDistance = useRef(0);

  const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
  const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
  const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
  const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-600');
  const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 text-gray-900' : 'bg-white text-gray-800');
  const inputBorder = theme === 'dark' ? 'border-gray-600' : (theme === 'eyeFriendly' ? 'border-yellow-300' : 'border-gray-300');


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setProductTransform({ x: 0, y: 0, scale: 1, rotation: 0 }); // Reset product position on new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setProductTransform({ x: 0, y: 0, scale: 1, rotation: 0 });
    setUploadedImage(null);
    setSelectedProduct(null);
    if (tryOnAreaRef.current) {
      const fileInput = tryOnAreaRef.current.querySelector('input[type="file"]');
      if (fileInput) { // Add null check here
        fileInput.value = '';
      }
    }
  };

  const onMouseDown = (e, type) => {
    e.preventDefault();
    isDragging.current = type === 'drag';
    isResizing.current = type === 'resize';
    isRotating.current = type === 'rotate';

    startX.current = e.clientX;
    startY.current = e.clientY;
    startScale.current = productTransform.scale;
    startRotation.current = productTransform.rotation;

    if (type === 'rotate' && productRef.current) {
      const rect = productRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      initialAngle.current = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    }
  };

  const onMouseMove = (e) => {
    if (!isDragging.current && !isResizing.current && !isRotating.current) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (isDragging.current) {
      setProductTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    } else if (isResizing.current) {
      const newScale = startScale.current * (1 + dy / 200); // Scale based on vertical drag
      setProductTransform(prev => ({ ...prev, scale: Math.max(0.1, newScale) })); // Prevent too small
    } else if (isRotating.current && productRef.current) {
      const rect = productRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      const newRotation = startRotation.current + (currentAngle - initialAngle.current);
      setProductTransform(prev => ({ ...prev, rotation: newRotation }));
    }

    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
    isRotating.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [productTransform]); // Depend on productTransform to ensure latest state is used by event handlers


  return (
    <div className={`min-h-screen p-4 md:p-8 ${bgColor}`}>
      <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-6xl mx-auto ${borderColor} border`}>
        <h2 className={`text-4xl font-bold text-indigo-700 mb-6 text-center ${textColor}`}>Virtual Try-On (Simulated AR)</h2>
        <p className={`${subTextColor} text-center mb-8 max-w-2xl mx-auto`}>
          Upload your image and select a product to virtually try it on. Drag, resize, and rotate the product to fit your image.
          <br/><strong className="text-red-500">Note: This is a simulated feature for demonstration purposes.</strong>
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Selection */}
          <div className="w-full lg:w-1/4 p-4 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center">
            <h3 className={`text-xl font-semibold mb-4 ${textColor}`}>1. Upload Your Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={`block w-full text-sm ${subTextColor} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${inputBg} ${inputBorder}`}
            />
            {uploadedImage && (
              <img src={uploadedImage} alt="Uploaded" className="mt-4 max-h-48 w-auto rounded-md shadow-md" />
            )}
            {!uploadedImage && (
              <div className={`mt-4 text-center ${subTextColor}`}>
                <Camera size={48} className="mx-auto mb-2 text-gray-400" />
                <p>Upload a photo of yourself to begin!</p>
              </div>
            )}

            <h3 className={`text-xl font-semibold mt-8 mb-4 ${textColor}`}>2. Select a Product</h3>
            <div className="grid grid-cols-2 gap-4">
              {arProducts.map(product => (
                <div
                  key={product.id}
                  className={`p-2 border rounded-lg cursor-pointer ${selectedProduct?.id === product.id ? 'border-indigo-500 ring-2 ring-indigo-500' : `${borderColor}`} ${cardBg} hover:shadow-md transition-shadow duration-200`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-24 object-contain mx-auto mb-2 rounded-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/cccccc/000000?text=Product"; }}
                  />
                  <p className={`text-sm text-center font-medium ${textColor}`}>{product.name}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              className={`mt-8 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 ${theme === 'dark' ? 'hover:text-white' : ''}`}
            >
              Reset All
            </button>
          </div>

          {/* Try-On Area */}
          <div ref={tryOnAreaRef} className={`relative w-full lg:w-3/4 min-h-[500px] border-2 border-dashed ${borderColor} rounded-lg overflow-hidden flex items-center justify-center ${uploadedImage ? '' : 'bg-gray-100'}`}>
            {uploadedImage ? (
              <img src={uploadedImage} alt="User" className="absolute inset-0 w-full h-full object-contain" />
            ) : (
              <p className={`${subTextColor} text-lg`}>Upload an image to start trying on!</p>
            )}

            {selectedProduct && uploadedImage && (
              <img
                ref={productRef}
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{
                  left: `calc(50% + ${productTransform.x}px)`,
                  top: `calc(50% + ${productTransform.y}px)`,
                  transform: `translate(-50%, -50%) scale(${productTransform.scale}) rotate(${productTransform.rotation}deg)`,
                  transformOrigin: 'center center',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  pointerEvents: 'auto', // Allow interaction
                }}
                onMouseDown={(e) => onMouseDown(e, 'drag')}
              />
            )}

            {selectedProduct && uploadedImage && (
              <>
                {/* Resize Handle (Bottom Right) */}
                <div
                  className="absolute w-6 h-6 bg-indigo-600 rounded-full cursor-nwse-resize"
                  style={{
                    bottom: `calc(50% - ${productTransform.y}px - ${productRef.current?.offsetHeight * productTransform.scale / 2}px)`,
                    right: `calc(50% - ${productTransform.x}px - ${productRef.current?.offsetWidth * productTransform.scale / 2}px)`,
                    transform: 'translate(50%, 50%)',
                    zIndex: 10,
                  }}
                  onMouseDown={(e) => onMouseDown(e, 'resize')}
                ></div>
                {/* Rotate Handle (Top Right) */}
                <div
                  className="absolute w-6 h-6 bg-purple-600 rounded-full cursor-grab" // Using cursor-grab for rotate visual cue
                  style={{
                    top: `calc(50% - ${productTransform.y}px - ${productRef.current?.offsetHeight * productTransform.scale / 2}px)`,
                    right: `calc(50% - ${productTransform.x}px - ${productRef.current?.offsetWidth * productTransform.scale / 2}px)`,
                    transform: 'translate(50%, -50%)',
                    zIndex: 10,
                  }}
                  onMouseDown={(e) => onMouseDown(e, 'rotate')}
                ></div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={onNavigateToHome}
          className={`mt-8 bg-gray-200 ${textColor} py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 hover:bg-yellow-300 text-gray-900' : '')}`}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};


// Main App component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'categories', 'planeBooking', 'hotelBooking', 'sale', 'payment', 'orderSuccess', 'faq', 'terms', 'privacy', 'seller', 'sellerTerms', 'sellerPricing', 'sellerSupport', 'arTryOn', 'productDetail'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState(''); // Unified state for success messages
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot widget
  const [theme, setTheme] = useState('light'); // 'light', 'dark', 'eyeFriendly'
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for product details page

  // Search state for header search bar
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const allSearchableItems = [
    "Smartphones", "Bluetooth Headphones", "DSLR Cameras", "Keyboards", "Gaming Consoles",
    "Trimmers", "Laptops", "Power Banks", "Smart Lights", "Smart TVs", "Shirts", "Dresses",
    "Sofas", "Mixers", "Refrigerators", "Noise Smartwatches", "Fastrack Smartwatches",
    "Printers", "Coffee Powder", "Action Toys", "Gym Essentials", "Yoga Mats", "Protein Supplements",
    "Running Shoes", "First Aid Kits", "Grocery", "Mobiles", "Fashion", "Electronics",
    "Home & Furniture", "Appliances", "Flight Bookings", "Beauty", "Toys", "Two Wheelers",
    "Hotel Bookings", "Deals", "Headphones", "Cameras", "Computers", "Gaming", "Health", "Kitchen",
    "Home Appliances", "Cycles", "Stationery", "Food Spreads", "Remote Control Toys", "Makeup Kits",
    "Organic Snacks", "Dairy", "Staples", "Snacks", "Beverages", "Men's Fashion", "Women's Fashion",
    "Kids' Fashion", "Home Decor", "Furniture", "Audio", "Accessories", // Existing items
    "Tablets", "Wearables", "Camera Bags", "Webcams", "External Hard Drives", "Gaming Headsets", "Gaming Chairs",
    "Blood Pressure Monitors", "Laptop Bags", "Laptop Stands", "Chargers", "Security Cameras", "Projectors",
    "Smart Remotes", "Satellite Dishes", "Earbud Cases", "Jackets", "Trousers", "Skirts", "Handbags",
    "Watches", "Belts", "Wallets", "Jewelry", "School Uniforms", "Party Wear", "Lamps", "Mirrors",
    "Cookware Sets", "Dinnerware", "Water Bottles", "Storage Containers", "Bed Sheets", "Comforters", "Pillows",
    "Microwave Ovens", "Coffee Makers", "Vacuum Cleaners", "Water Purifiers", "Hair Dryers", "Straighteners",
    "Electric Toothbrushes", "Treadmills", "Dumbbells", "Cricket Bats", "Football", "Badminton Rackets",
    "Fiction", "Non-Fiction", "Children's Books", "DVDs", "Blu-Rays", "Console Games", "PC Games",
    "Rice", "Wheat Flour", "Pulses", "Chips", "Soft Drinks", "Biscuits", "Dog Food", "Cat Food", "Pet Toys" // New items
  ];


  useEffect(() => {
    if (searchTerm.length > 0) { // Show suggestions as soon as user types (length > 0)
      const filteredSuggestions = allSearchableItems.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    setSuggestions([]); // Clear suggestions after search
    // In a real app, this would navigate to a search results page or filter current view
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    console.log("Searching for:", suggestion);
    // Optionally trigger search submit here or navigate to a product/category page
  };


  const calculateTotalPrice = (currentCart) => {
    return currentCart.reduce((sum, item) => sum + item.numericPrice, 0);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const newCart = [...prevCart, product];
      setTotalPrice(calculateTotalPrice(newCart));
      return newCart;
    });
  };

  const handleOrderOrBookingSuccess = (message) => {
    setCart([]); // Clear cart after order/booking
    setTotalPrice(0);
    setSuccessMessage(message);
    setCurrentPage('orderSuccess'); // Navigate to the new success page
  };

  const navigateTo = (page, product = null) => {
    setCurrentPage(page);
    setSelectedProduct(product); // Set selected product when navigating to detail page
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigateTo('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]); // Clear cart on logout
    setTotalPrice(0);
    navigateTo('home');
  };

  const toggleDarkMode = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleEyeFriendlyMode = () => {
    setTheme(prev => prev === 'eyeFriendly' ? 'light' : 'eyeFriendly');
  };

  // New components for FAQ, Terms, Privacy, and Seller pages
  const FAQPage = ({ onNavigateToHome, theme }) => {
    const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
    const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
    const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
    const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
    const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');

    return (
      <div className={`min-h-screen p-8 ${bgColor}`}>
        <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-4xl mx-auto ${borderColor} border`}>
          <h2 className={`text-4xl font-bold text-indigo-700 mb-8 text-center ${textColor}`}>Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className={`border-b pb-4 ${borderColor}`}>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Q: How do I place an order?</h3>
              <p className={`${subTextColor}`}>A: Browse our categories, add items to your cart, and proceed to checkout. Follow the steps to provide shipping details and payment information.</p>
            </div>
            <div className={`border-b pb-4 ${borderColor}`}>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Q: What payment methods do you accept?</h3>
              <p className={`${subTextColor}`}>A: We accept Credit/Debit Cards, UPI, and Net Banking for secure payments.</p>
            </div>
            <div className={`border-b pb-4 ${borderColor}`}>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Q: How can I track my order?</h3>
              <p className={`${subTextColor}`}>A: Once your order is placed, you will receive a confirmation email with tracking details. You can also view your order status in your account section.</p>
            </div>
            <div className={`border-b pb-4 ${borderColor}`}>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Q: What is your return policy?</h3>
              <p className={`${subTextColor}`}>A: We offer a 30-day return policy on most items. Please refer to our full Terms & Conditions for detailed information.</p>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Q: How do I contact customer support?</h3>
              <p className={`${subTextColor}`}>A: You can reach our customer support team via email at support@pulsecart.com or by phone at +1 (123) 456-7890.</p>
            </div>
          </div>
          <button
            onClick={onNavigateToHome}
            className={`mt-10 bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 ${theme === 'dark' ? 'hover:text-white' : ''}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  const TermsAndConditionsPage = ({ onNavigateToHome, theme }) => {
    const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
    const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
    const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
    const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
    const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');

    return (
      <div className={`min-h-screen p-8 ${bgColor}`}>
        <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-4xl mx-auto ${borderColor} border`}>
          <h2 className={`text-4xl font-bold text-indigo-700 mb-8 text-center ${textColor}`}>Terms & Conditions</h2>
          <div className={`prose max-w-none space-y-4 ${subTextColor}`}>
            <p>Welcome to PulseCart! These terms and conditions outline the rules and regulations for the use of PulseCart's Website, located at [Your Website URL].</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use PulseCart if you do not agree to take all of the terms and conditions stated on this page.</p>
            <h3 className={`${textColor}`}>1. Privacy</h3>
            <p>Your use of PulseCart is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.</p>
            <h3 className={`${textColor}`}>2. Electronic Communications</h3>
            <p>Visiting PulseCart or sending emails to PulseCart constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing.</p>
            <h3 className={`${textColor}`}>3. Your Account</h3>
            <p>If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. You may not assign or otherwise transfer your account to any other person or entity.</p>
            <h3 className={`${textColor}`}>4. Products and Services</h3>
            <p>All products and services listed on PulseCart are subject to availability. We reserve the right to discontinue any product at any time. All prices for products are subject to change without notice.</p>
            <h3 className={`${textColor}`}>5. Links to Third Party Sites/Third Party Services</h3>
            <p>PulseCart may contain links to other websites ("Linked Sites"). The Linked Sites are not under the control of PulseCart and PulseCart is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site.</p>
            <h3 className={`${textColor}`}>6. Limitation of Liability</h3>
            <p>In no event shall PulseCart, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. PulseCart, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
            <h3 className={`${textColor}`}>7. Changes to Terms</h3>
            <p>PulseCart reserves the right, in its sole discretion, to change the Terms under which PulseCart.com is offered. The most current version of the Terms will supersede all previous versions.</p>
          </div>
          <button
            onClick={onNavigateToHome}
            className={`mt-10 bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 ${theme === 'dark' ? 'hover:text-white' : ''}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  const PrivacyPolicyPage = ({ onNavigateToHome, theme }) => {
    const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
    const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
    const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
    const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
    const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');

    return (
      <div className={`min-h-screen p-8 ${bgColor}`}>
        <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-4xl mx-auto ${borderColor} border`}>
          <h2 className={`text-4xl font-bold text-indigo-700 mb-8 text-center ${textColor}`}>Privacy Policy</h2>
          <div className={`prose max-w-none space-y-4 ${subTextColor}`}>
            <p>Your privacy is critically important to us. At PulseCart, we have a few fundamental principles:</p>
            <ul>
              <li>We don't ask you for personal information unless we truly need it.</li>
              <li>We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.</li>
              <li>We don't store personal information on our servers unless required for the on-going operation of one of our services.</li>
            </ul>
            <h3 className={`${textColor}`}>Information We Collect</h3>
            <p>We collect information about you in a few different ways:</p>
            <h4 className={`${textColor}`}>1. Information you provide to us directly:</h4>
            <p>When you register for an account, place an order, or interact with our services, you may provide us with personal information such as your name, email address, shipping address, and payment details.</p>
            <h4 className={`${textColor}`}>2. Information we collect automatically:</h4>
            <p>When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
            <h3 className={`${textColor}`}>How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your orders and manage your account.</li>
              <li>Improve and personalize your shopping experience.</li>
              <li>Communicate with you about products, services, and promotions.</li>
              <li>Detect and prevent fraud and other harmful activities.</li>
            </ul>
            <h3 className={`${textColor}`}>Sharing Your Information</h3>
            <p>We may share your information with third parties only in the following circumstances:</p>
            <ul>
              <li>With service providers who assist us in operating our website and conducting our business (e.g., payment processors, shipping companies).</li>
              <li>To comply with legal obligations.</li>
              <li>To protect and defend the rights or property of PulseCart.</li>
            </ul>
            <h3 className={`${textColor}`}>Security</h3>
            <p>The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
            <h3 className={`${textColor}`}>Changes to This Privacy Policy</h3>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          </div>
          <button
            onClick={onNavigateToHome}
            className={`mt-10 bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 ${theme === 'dark' ? 'hover:text-white' : ''}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  const BecomeASellerPage = ({ onNavigateToHome, onSellerSignUp, theme }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [phone, setPhone] = useState('');
    const [signUpError, setSignUpError] = useState('');

    const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
    const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
    const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
    const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
    const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');
    const innerCardBg = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-200' : 'bg-indigo-50');
    const inputBorder = theme === 'dark' ? 'border-gray-600' : (theme === 'eyeFriendly' ? 'border-yellow-300' : 'border-gray-300');
    const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 text-gray-900' : 'bg-white text-gray-800');


    const handleSignUp = (e) => {
      e.preventDefault();
      if (!name || !email || !businessName || !phone) {
        setSignUpError("Please fill in all required fields.");
        return;
      }
      setSignUpError('');
      // Simulate seller sign-up
      console.log("Seller Sign Up Data:", { name, email, businessName, phone });
      onSellerSignUp("Thank you for your interest in becoming a PulseCart Seller! We will review your application shortly.");
    };

    return (
      <div className={`min-h-screen p-4 md:p-8 ${bgColor}`}>
        <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-4xl mx-auto text-center ${borderColor} border`}>
          <Briefcase size={80} className="text-indigo-600 mx-auto mb-6" />
          <h2 className={`text-4xl font-bold text-indigo-700 mb-6 ${textColor}`}>Become a PulseCart Seller</h2>
          <p className={`text-lg mb-10 max-w-2xl mx-auto ${subTextColor}`}>
            Join our growing community of successful sellers and reach millions of customers across India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className={`${innerCardBg} rounded-lg shadow-md flex flex-col items-center p-6 ${borderColor} border`}>
              <Users size={40} className="text-indigo-500 mb-3" />
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Reach Millions</h3>
              <p className={`${subTextColor}`}>Access a vast customer base and expand your business effortlessly.</p>
            </div>
            <div className={`${innerCardBg} rounded-lg shadow-md flex flex-col items-center p-6 ${borderColor} border`}>
              <CheckCircle size={40} className="text-indigo-500 mb-3" />
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Easy Setup</h3>
              <p className={`${subTextColor}`}>Our intuitive platform makes listing products and managing orders simple.</p>
            </div>
            <div className={`${innerCardBg} rounded-lg shadow-md flex flex-col items-center p-6 ${borderColor} border`}>
              <HelpCircle size={40} className="text-indigo-500 mb-3" />
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Dedicated Support</h3>
              <p className={`${subTextColor}`}>Get assistance from our seller support team whenever you need it.</p>
            </div>
          </div>

          <div className={`${theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-200' : 'bg-gray-100')} p-8 rounded-lg shadow-inner mb-12 max-w-2xl mx-auto ${borderColor} border`}>
            <h3 className={`text-2xl font-bold text-indigo-700 mb-6 ${textColor}`}>Start Selling Today!</h3>
            <form onSubmit={handleSignUp} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-4 py-3 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${inputBg}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Business Email"
                className={`w-full px-4 py-3 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${inputBg}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Your Business Name"
                className={`w-full px-4 py-3 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${inputBg}`}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Your Phone Number"
                className={`w-full px-4 py-3 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${inputBg}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {signUpError && <p className="text-red-500 text-sm mt-3">{signUpError}</p>}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-semibold text-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up Now
              </button>
            </form>
          </div>

          <div className="flex justify-center space-x-6 mb-10">
            <button onClick={() => navigateTo('sellerTerms')} className={`text-indigo-600 hover:underline flex items-center gap-2 ${theme === 'dark' ? 'hover:text-white' : ''}`}>
              <FileText size={20} /> Seller Terms
            </button>
            <button onClick={() => navigateTo('sellerPricing')} className={`text-indigo-600 hover:underline flex items-center gap-2 ${theme === 'dark' ? 'hover:text-white' : ''}`}>
              <DollarSign size={20} /> Pricing
            </button>
            <button onClick={() => navigateTo('sellerSupport')} className={`text-indigo-600 hover:underline flex items-center gap-2 ${theme === 'dark' ? 'hover:text-white' : ''}`}>
              <HelpCircle size={20} /> Seller Support
            </button>
          </div>

          <button
            onClick={onNavigateToHome}
            className={`mt-8 bg-gray-200 ${textColor} py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 hover:bg-yellow-300 text-gray-900' : '')}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  const SellerTermsPage = ({ onNavigateToHome, theme }) => {
    const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
    const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
    const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
    const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
    const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');

    return (
      <div className={`min-h-screen p-8 ${bgColor}`}>
        <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-4xl mx-auto ${borderColor} border`}>
          <h2 className={`text-4xl font-bold text-indigo-700 mb-8 text-center ${textColor}`}>Seller Terms & Conditions</h2>
          <div className={`prose max-w-none space-y-4 ${subTextColor}`}>
            <p>These Seller Terms and Conditions ("Agreement") govern your participation as a seller on the PulseCart platform. By registering as a seller, you agree to be bound by these terms.</p>
            <h3 className={`${textColor}`}>1. Seller Account</h3>
            <p>You must create a seller account and provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.</p>
            <h3 className={`${textColor}`}>2. Product Listings</h3>
            <p>You agree to provide accurate and truthful descriptions, images, and pricing for all products you list on PulseCart. All products must comply with applicable laws and PulseCart's product guidelines.</p>
            <h3 className={`${textColor}`}>3. Order Fulfillment</h3>
            <p>You are responsible for timely and accurate fulfillment of all orders placed through PulseCart. This includes packaging, shipping, and delivery within the agreed-upon timelines.</p>
            <h3 className={`${textColor}`}>4. Fees and Payments</h3>
            <p>PulseCart charges certain fees for using its platform, including listing fees, commission on sales, and payment processing fees. Details of these fees are outlined in the "Pricing" section.</p>
            <h3 className={`${textColor}`}>5. Customer Service</h3>
            <p>You are expected to provide excellent customer service to buyers, including promptly responding to inquiries, resolving disputes, and handling returns and refunds in accordance with PulseCart's policies.</p>
            <h3 className={`${textColor}`}>6. Prohibited Activities</h3>
            <p>Sellers are prohibited from engaging in any activity that is illegal, fraudulent, or harmful to PulseCart or its users. This includes, but is not limited to, selling counterfeit goods, engaging in price manipulation, or misrepresenting products.</p>
            <h3 className={`${textColor}`}>7. Termination</h3>
            <p>PulseCart reserves the right to suspend or terminate your seller account at any time, with or without cause, if you violate any terms of this Agreement or engage in conduct detrimental to the platform.</p>
            <h3 className={`${textColor}`}>8. Governing Law</h3>
            <p>This Agreement shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
          </div>
          <button
            onClick={onNavigateToHome}
            className={`mt-10 bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 ${theme === 'dark' ? 'hover:text-white' : ''}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  const SellerPricingPage = ({ onNavigateToHome, theme }) => {
    const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
    const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
    const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
    const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
    const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');
    const innerCardBg = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-200' : 'bg-indigo-50');

    return (
      <div className={`min-h-screen p-8 ${bgColor}`}>
        <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-4xl mx-auto text-center ${borderColor} border`}>
          <h2 className={`text-4xl font-bold text-indigo-700 mb-8 ${textColor}`}>Seller Pricing</h2>
          <p className={`text-lg mb-10 ${subTextColor}`}>
            Understand our transparent pricing model designed to help your business grow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`${innerCardBg} rounded-lg shadow-md border ${borderColor} p-6`}>
              <DollarSign size={50} className="text-indigo-600 mx-auto mb-4" />
              <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>Listing Fee</h3>
              <p className={`text-4xl font-extrabold text-indigo-700 mb-4 ${textColor}`}>₹0</p>
              <p className={`${subTextColor}`}>No upfront costs to list your products.</p>
            </div>

            <div className={`${innerCardBg} rounded-lg shadow-md border ${borderColor} p-6`}>
              <Tag size={50} className="text-indigo-600 mx-auto mb-4" />
              <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>Commission</h3>
              <p className={`text-4xl font-extrabold text-indigo-700 mb-4 ${textColor}`}>5-15%</p>
              <p className={`${subTextColor}`}>Category-based commission on successful sales.</p>
            </div>

            <div className={`${innerCardBg} rounded-lg shadow-md border ${borderColor} p-6`}>
              <CheckCircle size={50} className="text-indigo-600 mx-auto mb-4" />
              <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>Payment Processing</h3>
              <p className={`text-4xl font-extrabold text-indigo-700 mb-4 ${textColor}`}>2%</p>
              <p className={`${subTextColor}`}>Fee for secure payment gateway services.</p>
            </div>
          </div>

          <p className={`${subTextColor} mt-10`}>
            For detailed commission rates per category, please refer to our <button onClick={() => navigateTo('sellerTerms')} className={`text-indigo-600 hover:underline font-semibold ${theme === 'dark' ? 'hover:text-white' : ''}`}>Seller Terms & Conditions</button>.
          </p>

          <button
            onClick={onNavigateToHome}
            className={`mt-10 bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 ${theme === 'dark' ? 'hover:text-white' : ''}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  const SellerSupportPage = ({ onNavigateToHome, theme }) => {
    const bgColor = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-50');
    const cardBg = theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white');
    const textColor = theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800');
    const subTextColor = theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700');
    const borderColor = theme === 'dark' ? 'border-gray-700' : (theme === 'eyeFriendly' ? 'border-yellow-200' : 'border-gray-200');
    const innerCardBg = theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-200' : 'bg-indigo-50');


    return (
      <div className={`min-h-screen p-8 ${bgColor}`}>
        <div className={`${cardBg} rounded-lg shadow-lg p-8 max-w-4xl mx-auto text-center ${borderColor} border`}>
          <h2 className={`text-4xl font-bold text-indigo-700 mb-8 ${textColor}`}>Seller Support</h2>
          <p className={`text-lg mb-10 ${subTextColor}`}>
            Our dedicated support team is here to help you succeed on PulseCart.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`${innerCardBg} rounded-lg shadow-md flex flex-col items-center p-6 ${borderColor} border`}>
              <Phone size={50} className="text-indigo-600 mb-4" />
              <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>Phone Support</h3>
              <p className={`${subTextColor}`}>Call us at: +1 (800) 123-4567</p>
              <p className={`${subTextColor} text-sm`}>(Mon-Fri, 9 AM - 6 PM IST)</p>
            </div>
            <div className={`${innerCardBg} rounded-lg shadow-md flex flex-col items-center p-6 ${borderColor} border`}>
              <HelpCircle size={50} className="text-indigo-600 mb-4" />
              <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>Email Support</h3>
              <p className={`${subTextColor}`}>Email us at: seller-support@pulsecart.com</p>
              <p className={`${subTextColor} text-sm`}>(Response within 24 hours)</p>
            </div>
          </div>

          <p className={`${subTextColor} mt-10`}>
            For common queries, please check our <button onClick={() => navigateTo('faq')} className={`text-indigo-600 hover:underline font-semibold ${theme === 'dark' ? 'hover:text-white' : ''}`}>FAQ section</button>.
          </p>

          <button
            onClick={onNavigateToHome}
            className={`mt-10 bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 ${theme === 'dark' ? 'hover:text-white' : ''}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  // New Chatbot Widget Component
  const ChatbotWidget = ({ isOpen, onClose, theme }) => {
    const [messages, setMessages] = useState([]); // Stores { role: 'user' | 'model', parts: [{ text: '...' }] }
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chatBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const messageBgUser = theme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-500';
    const messageBgModel = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
    const textColorUser = 'text-white';
    const textColorModel = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800';
    const inputBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    const placeholderColor = theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500';

    const handleSendMessage = async (e) => {
      e.preventDefault();
      if (input.trim() === '') return;

      const newMessage = { role: 'user', parts: [{ text: input }] };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      setIsLoading(true);

      try {
        let chatHistory = [...messages, newMessage]; // Include new message in history for API
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas will inject the API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const aiResponseText = result.candidates[0].content.parts[0].text;
          setMessages((prevMessages) => [...prevMessages, { role: 'model', parts: [{ text: aiResponseText }] }]);
        } else {
          setMessages((prevMessages) => [...prevMessages, { role: 'model', parts: [{ text: "Sorry, I couldn't get a response. Please try again." }] }]);
          console.error("Unexpected API response structure:", result);
        }
      } catch (error) {
        console.error("Error calling Gemini API:", error);
        setMessages((prevMessages) => [...prevMessages, { role: 'model', parts: [{ text: "An error occurred while fetching the response. Please try again later." }] }]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isOpen) return null;

    return (
      <div className={`fixed bottom-4 right-4 z-[1000] w-80 h-[400px] ${chatBg} rounded-lg shadow-xl flex flex-col border border-gray-200 animate-slide-in-up ${theme === 'dark' ? 'border-gray-700' : ''}`}>
        <div className="flex justify-between items-center bg-indigo-600 text-white p-3 rounded-t-lg">
          <h3 className="text-lg font-semibold">PulseCart AI Chat</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors duration-200">
            <Minimize2 size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          {messages.length === 0 && (
            <div className={`text-center italic mt-10 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              How can I help you today?
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-2 text-sm rounded-lg shadow-sm ${
                  msg.role === 'user'
                    ? `${messageBgUser} ${textColorUser} rounded-br-none`
                    : `${messageBgModel} ${textColorModel} rounded-bl-none`
                }`}
              >
                {msg.parts[0].text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-3">
              <div className={`max-w-[85%] p-2 text-sm rounded-lg shadow-sm ${messageBgModel} ${textColorModel} rounded-bl-none`}>
                <div className="animate-pulse">Typing...</div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSendMessage} className={`flex p-3 border-t ${inputBorder}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 px-3 py-2 border ${inputBorder} rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm ${inputBg} ${placeholderColor}`}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="ml-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    );
  };


  const renderPage = () => {
    const restrictedPages = ['categories', 'planeBooking', 'hotelBooking', 'sale', 'payment', 'arTryOn', 'productDetail'];

    if (restrictedPages.includes(currentPage) && !isLoggedIn && currentPage !== 'login') {
      return <LoginRequiredMessage onNavigateToLogin={() => navigateTo('login')} theme={theme} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'categories':
        return <ProductCategoryPage onNavigateToHome={() => navigateTo('home')} navigateToProductDetail={navigateTo} addToCart={addToCart} theme={theme} />;
      case 'productDetail':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            addToCart={addToCart}
            onNavigateToHome={() => navigateTo('home')}
            onNavigateToCategories={() => navigateTo('categories')}
            theme={theme}
          />
        ) : (
          <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-50 text-gray-900' : 'bg-gray-50 text-gray-800')}`}>
            <div className={`p-8 rounded-lg shadow-lg text-center ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-100 border border-yellow-200' : 'bg-white border border-gray-200')}`}>
              <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
              <p className="mb-6">The product you are looking for does not exist or was not selected.</p>
              <button onClick={() => navigateTo('home')} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
                Back to Home
              </button>
            </div>
          </div>
        );
      case 'planeBooking':
        return <PlaneBookingPage onNavigateToHome={() => navigateTo('home')} onBookingSuccess={handleOrderOrBookingSuccess} theme={theme} />;
      case 'hotelBooking':
        return <HotelBookingPage onNavigateToHome={() => navigateTo('home')} onBookingSuccess={handleOrderOrBookingSuccess} theme={theme} />;
      case 'sale':
        return <SalePage onNavigateToHome={() => navigateTo('home')} addToCart={addToCart} navigateToProductDetail={navigateTo} theme={theme} />;
      case 'payment':
        return <PaymentPage cart={cart} totalPrice={totalPrice} onNavigateToHome={() => navigateTo('home')} onPlaceOrder={handleOrderOrBookingSuccess} theme={theme} />;
      case 'orderSuccess':
        return <OrderSuccessPage message={successMessage} onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'faq':
        return <FAQPage onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'terms':
        return <TermsAndConditionsPage onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'privacy':
        return <PrivacyPolicyPage onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'seller':
        return <BecomeASellerPage onNavigateToHome={() => navigateTo('home')} onSellerSignUp={handleOrderOrBookingSuccess} theme={theme} />;
      case 'sellerTerms':
        return <SellerTermsPage onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'sellerPricing':
        return <SellerPricingPage onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'sellerSupport':
        return <SellerSupportPage onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'arTryOn':
        return <AugmentedRealityTryOnPage onNavigateToHome={() => navigateTo('home')} theme={theme} />;
      case 'home':
      default:
        return isLoggedIn ? (
          <LoggedInHomePage
            navigateTo={navigateTo}
            navigateToProductDetail={navigateTo} // Pass navigateTo as navigateToProductDetail
            addToCart={addToCart} // Pass addToCart
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            theme={theme}
          />
        ) : (
          <>
            {/* Hero Section (Public Home) */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-6 md:px-12 text-center rounded-lg m-4 shadow-lg">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                Your One-Stop Shop for Everything!
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Discover amazing products, unbeatable deals, and a seamless shopping experience.
              </p>
              <button
                onClick={() => navigateTo('login')}
                className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105"
              >
                Start Shopping Now
              </button>
            </section>

            {/* Why to use PulseCart Section (Public Home) */}
            <section id="why-pulse-cart" className={`${theme === 'dark' ? 'bg-gray-900' : (theme === 'eyeFriendly' ? 'bg-yellow-100' : 'bg-white')} py-16 px-6 md:px-12 m-4 rounded-lg shadow-lg`}>
              <h3 className={`text-4xl font-bold text-center text-indigo-700 mb-12 ${theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800')}`}>Why Choose PulseCart?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10"> {/* Changed to 4 columns for AI feature */}
                <div className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700 text-gray-100' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border border-yellow-300' : 'bg-indigo-50 text-gray-800')}`}>
                  <CheckCircle size={48} className="text-indigo-500 mb-4" />
                  <h4 className={`text-2xl font-semibold mb-3 ${theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-900')}`}>Quality Products</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700')}`}>
                    We handpick every item to ensure you receive only the best quality products from trusted brands.
                  </p>
                </div>
                <div className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border border-yellow-300' : 'bg-indigo-50 text-gray-800')}`}>
                  <ShoppingCart size={48} className="text-indigo-500 mb-4" />
                  <h4 className={`text-2xl font-semibold mb-3 ${theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-900')}`}>Seamless Shopping</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700')}`}>
                    Enjoy an intuitive and easy-to-navigate website, making your shopping experience a breeze.
                  </p>
                </div>
                <div className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border and border-yellow-300' : 'bg-indigo-50')}`}>
                  <Star size={48} className="text-indigo-500 mb-4" />
                  <h4 className={`text-2xl font-semibold mb-3 ${theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-900')}`}>Excellent Support</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700')}`}>
                    Our dedicated customer support team is always ready to assist you with any queries or issues.
                  </p>
                </div>
                {/* New AI Feature Section for public home page */}
                <div className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border border-yellow-300' : 'bg-indigo-50')}`}>
                  <Brain size={48} className="text-indigo-500 mb-4" /> {/* Using Brain icon for AI */}
                  <h4 className={`text-2xl font-semibold mb-3 ${theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-900')}`}>AI-Powered Assistance</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700')}`}>
                    Experience smart recommendations and quick answers with our integrated AI features, enhancing your shopping journey.
                  </p>
                </div>
              </div>
            </section>

            {/* What our users say Section (Testimonials) (Public Home) */}
            <section id="user-testimonials" className={`${theme === 'dark' ? 'bg-gray-800' : (theme === 'eyeFriendly' ? 'bg-yellow-50' : 'bg-gray-100')} py-16 px-6 md:px-12 m-4 rounded-lg shadow-lg`}>
              <h3 className={`text-4xl font-bold text-center text-indigo-700 mb-12 ${theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-gray-800')}`}>What Our Users Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className={`${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-100 border border-yellow-200' : 'bg-white border-gray-200')} p-8 rounded-xl shadow-md flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300`}>
                  <Quote size={40} className="text-indigo-400 mb-4" />
                  <p className={`${theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700')} italic mb-4`}>
                    "PulseCart has transformed my online shopping! The variety of products is amazing, and the delivery is always fast. Highly recommended!"
                  </p>
                  <p className={`font-semibold text-indigo-600 ${theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-indigo-600')}`}>- Jane Doe</p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className={`${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : (theme === 'eyeFriendly' ? 'bg-yellow-100 border border-yellow-200' : 'bg-white border-gray-200')} p-8 rounded-xl shadow-md flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300`}>
                  <Quote size={40} className="text-indigo-400 mb-4" />
                  <p className={`${theme === 'dark' ? 'text-gray-300' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-700')} italic mb-4`}>
                    "I love the user-friendly interface of PulseCart. Finding what I need is super easy, and their customer service is top-notch. A fantastic experience!"
                  </p>
                  <p className={`font-semibold text-indigo-600 ${theme === 'dark' ? 'text-gray-100' : (theme === 'eyeFriendly' ? 'text-gray-900' : 'text-indigo-600')}`}>- John Smith</p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  const getOverallThemeClasses = () => {
    if (theme === 'dark') {
      return 'bg-gray-900 text-gray-100';
    } else if (theme === 'eyeFriendly') {
      return 'bg-yellow-50 text-gray-900';
    }
    return 'bg-gray-50 text-gray-800';
  };

  const getHeaderFooterBg = () => {
    if (theme === 'dark') {
      return 'bg-gray-800';
    } else if (theme === 'eyeFriendly') {
      return 'bg-yellow-100';
    }
    return 'bg-white';
  };

  const getHeaderFooterText = () => {
    if (theme === 'dark') {
      return 'text-gray-100';
    } else if (theme === 'eyeFriendly') {
      return 'text-gray-900';
    }
    return 'text-gray-800';
  };

  const getHeaderLinkHoverClass = () => {
    if (theme === 'dark') {
      return 'hover:text-indigo-400 hover:bg-gray-700';
    } else if (theme === 'eyeFriendly') {
      return 'hover:text-indigo-700 hover:bg-yellow-200';
    }
    return 'hover:text-indigo-600 hover:bg-gray-100';
  };


  return (
    <div className={`min-h-screen font-sans ${getOverallThemeClasses()}`}>
      {/* Header */}
      <header className={`${getHeaderFooterBg()} shadow-sm py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 rounded-b-lg`}>
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-extrabold text-indigo-600">PulseCart</h1>
          {/* Search Bar for Logged-in Header */}
          {isLoggedIn && (
            <div className="relative flex-grow max-w-md mx-4 hidden md:block">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search for Products, Brands and More"
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${theme === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400' : (theme === 'eyeFriendly' ? 'bg-yellow-200 text-gray-900 border-yellow-300 placeholder-gray-600' : 'bg-white text-gray-800')}`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : (theme === 'eyeFriendly' ? 'text-gray-700' : 'text-gray-400')}`} />
              </form>
              {suggestions.length > 0 && (
                <ul className={`absolute z-10 w-full border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : (theme === 'eyeFriendly' ? 'bg-yellow-200 border-yellow-300' : 'bg-white border-gray-300')}`}>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={`px-4 py-2 cursor-pointer ${theme === 'dark' ? 'text-gray-100 hover:bg-gray-600' : (theme === 'eyeFriendly' ? 'text-gray-900 hover:bg-yellow-300' : 'text-gray-800 hover:bg-gray-100')}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <nav className="hidden md:flex space-x-6">
            {isLoggedIn && (
              <>
                <button onClick={() => navigateTo('home')} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <Home size={18} /> Home
                </button>
                <button onClick={() => navigateTo('categories')} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <Store size={18} /> Shop
                </button>
                <button onClick={() => navigateTo('categories')} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <LayoutGrid size={18} /> Categories
                </button>
                <button onClick={() => navigateTo('planeBooking')} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <Plane size={18} /> Flights
                </button>
                <button onClick={() => navigateTo('hotelBooking')} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <Hotel size={18} /> Hotels
                </button>
                <button onClick={() => navigateTo('sale')} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <Tag size={18} /> Deals
                </button>
                <button onClick={() => navigateTo('arTryOn')} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <Camera size={18} /> Try AR
                </button>
                <button onClick={() => navigateTo('seller')} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <Briefcase size={18} /> Become a Seller
                </button>
                <button onClick={() => setIsChatbotOpen(true)} className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <MessageSquare size={18} /> Chat with AI
                </button>
                <a href="#contact-footer" className={`px-3 py-2 rounded-md ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} flex items-center gap-1 transition-colors duration-200`}>
                  <Phone size={18} /> Contact
                </a>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`px-3 py-2 rounded-md flex items-center gap-1 ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} transition-colors duration-200`}
            title="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleEyeFriendlyMode}
            className={`px-3 py-2 rounded-md flex items-center gap-1 ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} transition-colors duration-200`}
            title="Toggle Eye-Friendly Mode"
          >
            <Sun size={20} /> {/* Using Sun for eye-friendly, could be a custom icon */}
          </button>
          {isLoggedIn && (
            <button onClick={() => navigateTo('payment')} className={`px-3 py-2 rounded-md flex items-center gap-1 ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} transition-colors duration-200 relative`}>
              <ShoppingCart size={20} /> Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
              {totalPrice > 0 && (
                <span className="text-sm font-semibold ml-1">₹{totalPrice.toLocaleString('en-IN')}</span>
              )}
            </button>
          )}
          <button onClick={isLoggedIn ? handleLogout : () => navigateTo('login')} className={`px-3 py-2 rounded-md flex items-center gap-1 ${getHeaderFooterText()} ${getHeaderLinkHoverClass()} transition-colors duration-200`}>
            <User size={20} /> {isLoggedIn ? 'Logout' : 'Login/Signup'}
          </button>
        </div>
      </header>

      {renderPage()}

      {/* Chatbot Widget */}
      {isLoggedIn && <ChatbotWidget isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} theme={theme} />}

      {/* Floating Chatbot Toggle Button */}
      {isLoggedIn && (
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-110 z-[1001]"
          aria-label={isChatbotOpen ? "Close Chat" : "Open Chat"}
        >
          {isChatbotOpen ? <Minimize2 size={24} /> : <MessageSquare size={24} />}
        </button>
      )}

      {/* Footer */}
      <footer id="contact-footer" className={`${getHeaderFooterBg()} ${getHeaderFooterText()} py-10 px-6 md:px-12 mt-4 rounded-t-lg`}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About PulseCart */}
          <div>
            <h4 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-400'}`}>About PulseCart</h4>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
              PulseCart is dedicated to providing a superior online shopping experience with a vast selection of high-quality products and exceptional customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-400'}`}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('faq')} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center justify-center md:justify-start gap-2 transition-colors duration-200`}>
                  <HelpCircle size={18} /> FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center justify-center md:justify-start gap-2 transition-colors duration-200`}>
                  <FileText size={18} /> Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center justify-center md:justify-start gap-2 transition-colors duration-200`}>
                  <FileText size={18} /> Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-400'}`}>Contact Us</h4>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Email: support@pulsecart.com</p>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Phone: +1 (123) 456-7890</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              {/* Social Media Icons - Placeholder */}
              <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.002 3.797.048.843.038 1.487.171 2.04.355.62.227 1.055.447 1.504.9.458.458.678.893.9 1.504.184.553.317 1.197.355 2.04.046 1.013.048 1.372.048 3.797s-.002 2.43-.048 3.797c-.038.843-.171 1.487-.355 2.04-.227.62-.447 1.055-.9 1.504-.458.458-.893.678-1.504.9-.553.184-1.197.317-2.04.355-1.013.046-1.372.048-3.797.048s-2.43-.002-3.797-.048c-.843-.038-1.487-.171-2.04-.355-.62-.227-1.055-.447-1.504-.9-.458-.458-.893-.678-.9-1.504-.184-.553-.317-1.197-.355-2.04-.046-1.013-.048-1.372-.048-3.797s.002-2.43.048-3.797c.038-.843.171-1.487.355-2.04.227-.62.447-.1055.9-1.504.458-.458.893-.678 1.504-.9.553-.184 1.197-.317 2.04-.355C9.888 1.998 10.245 2 12.315 2zm0 2.163c-3.154 0-3.538.016-4.814.073-.833.037-1.399.172-1.83.333-.453.166-.798.376-1.166.744-.368.368-.578.713-.744 1.166-.16.431-.296.997-.333 1.83-.057 1.276-.073 1.66-.073 4.814s.016 3.538.073 4.814c.037.833.172 1.399.333 1.83.166.453.376.798.744 1.166.368.368.713.578 1.166.744.431.16.997.296 1.83.333 1.276.057 1.66.073 4.814.073s3.538-.016 4.814-.073c.833-.037 1.399-.172 1.83-.333.453-.166.798-.376 1.166-.744.368-.368.713-.578-.744-1.166-.16-.431-.296-.997-.333-1.83-.057-1.276-.073-1.66-.073-4.814s-.016-3.538-.073-4.814c-.037-.833-.172-1.399-.333-1.83-.166-.453-.376-.798-.744-1.166-.368-.368-.713-.578-.744-1.166-.16-.431-.296-.997-.333-1.83-.057-1.276-.073-1.66-.073-4.814zM12.315 9.182a3.132 3.132 0 100 6.264 3.132 3.132 0 000-6.264zm0 1.907a1.225 1.225 0 110 2.45 1.225 1.225 0 010-2.45z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} mt-8 pt-8 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
          &copy; {new Date().getFullYear()} PulseCart. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
