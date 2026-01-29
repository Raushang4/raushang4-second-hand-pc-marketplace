
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import MarqueeBanner from './components/MarqueeBanner';
import CategorySlider from './components/CategorySlider';
import ProductPage from './components/ProductPage';
import ProductCard from './components/ProductCard';
import ReviewMarquee from './components/ReviewMarquee';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingCart from './components/FloatingCart';
import Footer from './components/Footer';
import RequestCard from './components/RequestCard';
import OrderConfirmation from './components/OrderConfirmation';
import { PRODUCTS, MAIN_PRODUCT } from './constants';
import { Product, ConfirmedOrder } from './types';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(MAIN_PRODUCT);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOrderSuccess = (order: ConfirmedOrder) => {
    setConfirmedOrder(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeConfirmation = () => setConfirmedOrder(null);
  const addToCart = () => setCartCount(prev => prev + 1);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return PRODUCTS;
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) || 
      p.chipset.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const gpus = filteredProducts.filter(p => p.category === 'GPU');
  const miniPcs = filteredProducts.filter(p => p.category === 'MINI PC');
  const components = filteredProducts.filter(p => ['SSD', 'RAM', 'CPU'].includes(p.category));

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-emerald-500 selection:text-black">
      <Navbar cartCount={cartCount} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {confirmedOrder ? (
        <main className="pt-32 pb-20">
          <OrderConfirmation order={confirmedOrder} onClose={closeConfirmation} />
        </main>
      ) : (
        <>
          <MarqueeBanner />
          
          <main className="pb-12 max-w-[1440px] mx-auto">
            <CategorySlider onSelect={(cat) => setSearchQuery(cat === 'All' ? '' : cat)} />

            {/* Spotlight View */}
            {!searchQuery && (
              <section id="product-view" className="scroll-mt-24 px-6 lg:px-12 mb-32 pt-10">
                <ProductPage 
                  product={selectedProduct} 
                  onOrderSuccess={handleOrderSuccess} 
                  onAddToCart={addToCart}
                />
              </section>
            )}

            {/* Graphics Card Grid */}
            {gpus.length > 0 && (
              <section className="px-6 lg:px-12 mb-32">
                <div className="flex items-center gap-5 mb-12">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Graphics Cards</h2>
                  <div className="h-[1px] flex-grow bg-white/5"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {gpus.map((p) => (
                    <ProductCard 
                      key={p.id}
                      product={p}
                      isSelected={selectedProduct.id === p.id}
                      onAddToCart={(e) => { e.stopPropagation(); addToCart(); }}
                      onClick={() => {
                        setSelectedProduct(p);
                        setSearchQuery('');
                        document.getElementById('product-view')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {!searchQuery && <ReviewMarquee />}

            {/* Components Grid */}
            {components.length > 0 && (
              <section className="px-6 lg:px-12 mt-32 mb-32">
                <div className="flex items-center gap-5 mb-12">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">PC Parts Marketplace</h2>
                  <div className="h-[1px] flex-grow bg-white/5"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {components.map((p) => (
                    <ProductCard 
                      key={p.id}
                      product={p}
                      isSelected={selectedProduct.id === p.id}
                      onAddToCart={(e) => { e.stopPropagation(); addToCart(); }}
                      onClick={() => {
                        setSelectedProduct(p);
                        setSearchQuery('');
                        document.getElementById('product-view')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Mini PC Grid */}
            {miniPcs.length > 0 && (
              <section className="px-6 lg:px-12 mb-32">
                <div className="flex items-center gap-5 mb-12">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Mini PC Collection</h2>
                  <div className="h-[1px] flex-grow bg-white/5"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {miniPcs.map((p) => (
                    <ProductCard 
                      key={p.id}
                      product={p}
                      isSelected={selectedProduct.id === p.id}
                      onAddToCart={(e) => { e.stopPropagation(); addToCart(); }}
                      onClick={() => {
                        setSelectedProduct(p);
                        setSearchQuery('');
                        document.getElementById('product-view')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            <RequestCard />
          </main>
        </>
      )}

      <WhatsAppButton />
      <FloatingCart count={cartCount} onClick={() => alert('Opening Secure Cart...')} />
      <Footer />
    </div>
  );
};

export default App;
