export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Handmade Bracelet',
    description:
      'Handmade Bracelet crafted with care using traditional techniques.',
    price: 37.74,
    image:
      'https://images.unsplash.com/photo-1602751584581-2e0372975b46?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhbmRtYWRlJTIwYnJhY2VsZXR8ZW58MHx8MHx8fDA%3D',
    inStock: true,
  },
  {
    id: '2',
    name: 'Beaded Necklace',
    description:
      'Beaded Necklace crafted with care using traditional techniques.',
    price: 8.89,
    image:
      'https://images.unsplash.com/photo-1603041730317-b395e9a63a33?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhZCUyMG5lY2tsYWNlfGVufDB8fDB8fHww',
    inStock: false,
  },
  {
    id: '3',
    name: 'Woven Bag',
    description: 'Woven Bag crafted with care using traditional techniques.',
    price: 43.04,
    image:
      'https://plus.unsplash.com/premium_photo-1689247409718-48408527fe97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d292ZW4lMjBiYWd8ZW58MHx8MHx8fDA%3D',
    inStock: false,
  },
  {
    id: '4',
    name: 'Leather Wallet',
    description:
      'Leather Wallet crafted with care using traditional techniques.',
    price: 41.99,
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D',
    inStock: false,
  },
  {
    id: '5',
    name: 'African Print Shirt',
    description:
      'African Print Shirt crafted with care using traditional techniques.',
    price: 38.94,
    image:
      'https://images.unsplash.com/photo-1568353218021-cc260ee68ee9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEFmcmljYW4lMjBQcmludCUyMFNoaXJ0fGVufDB8fDB8fHww',
    inStock: false,
  },
  {
    id: '6',
    name: 'Emerald Earrings',
    description:
      'Wooden Earrings crafted with care using traditional techniques.',
    price: 59.53,
    image:
      'https://plus.unsplash.com/premium_photo-1739548336599-2465b97a1237?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZGVuJTIwZWFycmluZ3N8ZW58MHx8MHx8fDA%3D',
    inStock: true,
  },
  {
    id: '7',
    name: 'Stone Ring',
    description: 'Stone Ring crafted with care using traditional techniques.',
    price: 14.37,
    image:
      'https://images.unsplash.com/photo-1729541176317-a121d245e6de?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RvbmUlMjByaW5nfGVufDB8fDB8fHww',
    inStock: false,
  },
  {
    id: '8',
    name: 'Colorful Scarf',
    description:
      'Colorful Scarf crafted with care using traditional techniques.',
    price: 25.66,
    image:
      'https://images.unsplash.com/photo-1609803384069-19f3e5a70e75?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2NhcmZ8ZW58MHx8MHx8fDA%3D',
    inStock: true,
  },
  {
    id: '9',
    name: 'Ankara Headwrap',
    description:
      'Ankara Headwrap crafted with care using traditional techniques.',
    price: 12.33,
    image:
      'https://plus.unsplash.com/premium_photo-1699953164122-5c44741d07ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QW5rYXJhJTIwSGVhZHdyYXB8ZW58MHx8MHx8fDA%3D',
    inStock: true,
  },
  {
    id: '10',
    name: 'Tie-Dye T-Shirt',
    description:
      'Tie-Dye T-Shirt crafted with care using traditional techniques.',
    price: 39.44,
    image:
      'https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww',
    inStock: false,
  },
  {
    id: '11',
    name: 'Hand-carved Comb',
    description:
      'Hand-carved Comb crafted with care using traditional techniques.',
    price: 45.12,
    image:
      'https://images.unsplash.com/photo-1634082983637-c1382c567945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tYnxlbnwwfHwwfHx8MA%3D%3D',
    inStock: true,
  },
  {
    id: '12',
    name: 'Embroidered Cap',
    description:
      'Embroidered Cap crafted with care using traditional techniques.',
    price: 30.14,
    image:
      'https://images.unsplash.com/photo-1620327489477-ff3c8420eab1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW1icm9pZGVyZWQlMjBjYXB8ZW58MHx8MHx8fDA%3D',
    inStock: true,
  },
  {
    id: '13',
    name: 'Maasai Sandals',
    description:
      'Maasai Sandals crafted with care using traditional techniques.',
    price: 16.59,
    image:
      'https://images.unsplash.com/photo-1515965230482-0b9b46fbee14?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FuZGFsc3xlbnwwfHwwfHx8MA%3D%3D',
    inStock: true,
  },
  {
    id: '14',
    name: 'Coconut Shell Bowl',
    description:
      'Coconut Shell Bowl crafted with care using traditional techniques.',
    price: 23.91,
    image:
      'https://plus.unsplash.com/premium_photo-1667664937850-4a5b9e61e5cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29jb251dCUyMGJvd2x8ZW58MHx8MHx8fDA%3D',
    inStock: false,
  },
  {
    id: '15',
    name: 'Recycled Glass Necklace',
    description:
      'Recycled Glass Necklace crafted with care using traditional techniques.',
    price: 29.75,
    image:
      'https://images.unsplash.com/photo-1663071309248-392e2d757559?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2xhc3MlMjBuZWNrbGFjZXxlbnwwfHwwfHx8MA%3D%3D',
    inStock: true,
  },
  {
    id: '16',
    name: 'Sculpture',
    description:
      'Shona Sculpture crafted with care using traditional techniques.',
    price: 40.61,
    image:
      'https://images.unsplash.com/photo-1741286052110-138d89642761?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VscHR1cmV8ZW58MHx8MHx8fDA%3D',
    inStock: false,
  },
  {
    id: '17',
    name: 'Zulu Beadwork Belt',
    description:
      'Zulu Beadwork Belt crafted with care using traditional techniques.',
    price: 48.98,
    image:
      'https://images.unsplash.com/photo-1711443982852-b3df5c563448?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVsdHxlbnwwfHwwfHx8MA%3D%3D',
    inStock: true,
  },
  {
    id: '18',
    name: 'Batik Fabric',
    description: 'Batik Fabric crafted with care using traditional techniques.',
    price: 22.43,
    image:
      'https://images.unsplash.com/photo-1672716912554-c23ba8fac4ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmF0aWslMjBmYWJyaWN8ZW58MHx8MHx8fDA%3D',
    inStock: true,
  },
  {
    id: '19',
    name: 'Bamboo Phone Stand',
    description:
      'Bamboo Phone Stand crafted with care using traditional techniques.',
    price: 17.68,
    image:
      'https://plus.unsplash.com/premium_photo-1680623397715-131dd7c83115?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvbmUlMjBzdGFuZHxlbnwwfHwwfHx8MA%3D%3D',
    inStock: false,
  },
  {
    id: '20',
    name: 'Hand-painted Mug',
    description:
      'Hand-painted Mug crafted with care using traditional techniques.',
    price: 33.82,
    image:
      'https://plus.unsplash.com/premium_photo-1677533885277-ba59ef29a007?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRlZCUyME11Z3xlbnwwfHwwfHx8MA%3D%3D',
    inStock: false,
  },
];
