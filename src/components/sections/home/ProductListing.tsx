'use client';

import Image from 'next/image';

const filters = [
  'All needs', 'Protect', 'Regenerates', 'Revitalizes', 'Feeds', 'Regulates', 'Purifies',
  'Makeup Removal', 'Exfoliates', 'Antioxidant', 'Soothes', 'Smoothes skin texture',
  'Tones', 'Anti-waste', 'Hydrate', 'Strengthens', 'Regenerates after UV exposure'
];

const products = [
  {
    name: 'CLASSWING',
    price: '$20',
    rating: 5.0,
    stars: 5,
    image: '/images/product-4.png',
  },
  {
    name: 'HOLOCENA',
    price: '$23',
    rating: 5.0,
    stars: 5,
    image: '/images/product-5.png',
  },
  {
    name: 'INAMORATA',
    price: '$12',
    rating: 4.5,
    stars: 4,
    image: '/images/product-6.png',
  },
  {
    name: 'LIGHTCOOL',
    price: '$22.5',
    rating: 5.0,
    stars: 5,
    image: '/images/product-7.png',
  },
];

export default function ProductListing() {
  return (
    <section className="bg-[#f2f6ef] py-16 px-6 md:px-20 text-[#294231]">
      {/* Header */}
      <div className="flex justify-between items-center mb-12 bg-[#899f87] w-full h-[100px] px-4">
        <h3 className="text-4xl text-white">Let’s see the processing of our products</h3>
        <button className="text-sm text-white flex items-center gap-2 border-b border-[#294231] pb-[1px]">
          →
        </button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* Left sidebar */}
        <div>
          <h4 className="text-sm text-[#a5b0a5] mb-2">All Products</h4>
          <h2 className="text-2xl font-medium mb-6">Mild skincare & facial routine</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, i) => (
              <span
                key={i}
                className={`px-4 py-1 text-sm rounded-full border border-[#c7d7bf] ${i === 0 ? 'bg-[#294231] text-white' : 'text-[#294231]'
                  }`}
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        {/* Right products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="p-6 flex flex-col items-center text-center border border-[#c7d7bf]"
            >
              <div className="h-[240px] flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={220}
                  className="object-contain"
                />
              </div>
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex justify-between items-center mt-2 text-[#294231]">
                  <span className="font-semibold">{product.price}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, j) => (
                      <span key={j}>{j < Math.round(product.stars) ? '★' : '☆'}</span>
                    ))}
                    <span className="ml-2">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA inside grid */}
          <div className="sm:col-span-2 mt-4 text-center">
            <button className="border border-[#294231] px-6 py-2 rounded-full flex items-center justify-center gap-2 text-sm">
              Shop now →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
