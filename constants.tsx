
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Club Heavyweight Tee',
    price: 85.00,
    description: 'The foundation of the YOUR BRAND NAME archive. Constructed from 320GSM ultra-premium organic cotton, offering a structured architectural drape that defines the modern silhouette.',
    category: 'Essentials',
    colors: [
      { name: 'Pure Carbon', hex: '#050505' },
      { name: 'Concrete', hex: '#6B7280' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    modelColor: '#050505'
  },
  {
    id: 'p2',
    name: 'Ethereal Silk Blend',
    price: 145.00,
    description: 'A limited edition experiment in textile fluidity. Our unique Silk-Viscose blend provides a cooling touch and an unmistakable luster. Designed for significant presence.',
    category: 'Limited',
    colors: [
      { name: 'Chalk', hex: '#F9FAFB' },
      { name: 'Bone', hex: '#E5E7EB' }
    ],
    sizes: ['M', 'L', 'XL'],
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    modelColor: '#F9FAFB'
  },
  {
    id: 'p3',
    name: 'Architectural Polo',
    price: 110.00,
    description: 'Precision-tailored with a seamless collar and hidden placket. The polo reimagined for the human who values brutalist simplicity and refined execution.',
    category: 'Luxury',
    colors: [
      { name: 'Deep Sea', hex: '#111827' },
      { name: 'Slate', hex: '#1F2937' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    modelColor: '#111827'
  },
  {
    id: 'p4',
    name: 'Standard Human Tee',
    price: 65.00,
    description: 'The essential daily unit. Soft-washed Peruvian pima cotton with a relaxed fit. Meticulously tested for long-term shape retention.',
    category: 'Essentials',
    colors: [
      { name: 'Natural', hex: '#D1D5DB' },
      { name: 'Shadow', hex: '#374151' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800',
    modelColor: '#D1D5DB'
  }
];

export const REVIEWS = [
  { id: 'r1', user: 'Julian M.', rating: 5, comment: 'The structural integrity of this tee is unparalleled. A true club staple.', date: '2024-02-15' },
  { id: 'r2', user: 'Elena S.', rating: 5, comment: 'Exquisite touch. YOUR BRAND NAME has redefined my expectations of a simple garment.', date: '2024-02-10' },
  { id: 'r3', user: 'Marcus T.', rating: 5, comment: 'Architectural perfection. It drapes exactly how premium apparel should.', date: '2024-01-25' }
];
