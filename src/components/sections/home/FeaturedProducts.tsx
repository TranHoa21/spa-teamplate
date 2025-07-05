'use client';

import Image from 'next/image';

const products = [
  {
    name: 'CHICORI',
    price: '$20',
    rating: 4.0,
    stars: 4,
    image: '/images/product1.png',
    bgStyle: 'bg-[#e8f0e5]',
  },
  {
    name: 'NOTORIOUS',
    price: '$23',
    rating: 5.0,
    stars: 5,
    image: '/images/product2.png',
    bgStyle: 'bg-[#e8f0e5] rounded-full p-10',
  },
  {
    name: 'HOLOCENA',
    price: '$20',
    rating: 5.0,
    stars: 5,
    image: '/images/product3.png',
    bgStyle: 'bg-[#e8f0e5]',
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#f2f6ef] text-[#294231] py-16 px-6 md:px-20">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm text-[#a5b0a5]">Our featured products</p>
        <h2 className="text-3xl md:text-4xl font-medium mt-2 text-[#314631]">
          Facial and skincare, natural and <br className="hidden md:block" />
          certified organic
        </h2>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-[#c7d7bf]">
        {products.map((product, index) => (
          <div
            key={index}
            className={`p-6 flex flex-col items-center text-center border-b border-[#c7d7bf] md:border-b-0 ${index !== 2 ? 'md:border-r' : ''
              } border-[#c7d7bf]`}
          >
            {/* Image box */}
            <div className={`w-full flex justify-center items-center h-[300px] ${product.bgStyle}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={180}
                height={250}
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div className="mt-6 w-full">
              <h3 className="text-lg font-semibold text-center">{product.name}</h3>
              <div className="flex justify-between items-center text-[#314631] mt-2">
                <span className="font-semibold">{product.price}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < product.stars ? '★' : '☆'}</span>
                  ))}
                  <span className="ml-2">{product.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
