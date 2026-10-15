export const products = [
  {
    id: 1,
    name: 'Laptop',
    title: 'Laptop Pro 15',
    price: 12900,
    priceFormatted: '฿12,900',
    category: 'Electronics',
    rating: { rate: 4.5, count: 120 },
    description: 'High performance laptop with high resolution screen and long battery life. Suitable for programming, designing, and everyday multi-tasking.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 2,
    name: 'Headphones',
    title: 'Wireless Headphones',
    price: 1290,
    priceFormatted: '฿1,290',
    category: 'Audio',
    rating: { rate: 4.3, count: 85 },
    description: 'Noise cancelling over-ear wireless headphones with deep bass and ultra-comfortable ear cushions for extended listening sessions.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 3,
    name: 'Backpack',
    title: 'Urban Travel Backpack',
    price: 890,
    priceFormatted: '฿890',
    category: 'Fashion',
    rating: { rate: 4.7, count: 210 },
    description: 'Durable water-resistant backpack suitable for daily commute, laptop carrying, and weekend adventure trips.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 4,
    name: 'Smart Watch',
    title: 'Smart Watch OLED',
    price: 2990,
    priceFormatted: '฿2,990',
    category: 'Gadget',
    rating: { rate: 4.4, count: 95 },
    description: 'Fitness tracking smartwatch with heart rate monitor, sleep tracking, and vivid AMOLED display with multiple sports modes.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    featured: false
  }
]

export function getAllProducts() {
  return products
}

export function getProducts() {
  return products
}

export function getFeaturedProducts() {
  return products.filter(product => product.featured)
}

export function getProductById(id) {
  const numericId = Number(id)
  if (isNaN(numericId)) return undefined
  return products.find(product => product.id === numericId)
}
