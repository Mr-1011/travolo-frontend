
import { UserPreferences, Recommendation } from '@/types';

export const generateRecommendations = (preferences: UserPreferences): Recommendation[] => {
  const sampleRecommendations: Recommendation[] = [
    {
      id: 'santorini',
      name: 'Santorini',
      country: 'Greece',
      description: 'Famous for its dramatic views, stunning sunsets, white-washed houses, and blue domes.',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop',
      matchScore: 96,
      features: ['Beach', 'Culture', 'Relaxation', 'Scenic Views'],
      activities: [
        'Watch the sunset in Oia',
        'Visit black sand beaches',
        'Explore ancient ruins',
        'Enjoy local cuisine and wines'
      ]
    },
    {
      id: 'kyoto',
      name: 'Kyoto',
      country: 'Japan',
      description: 'Ancient capital with over 1,600 Buddhist temples, imperial palaces, and traditional gardens.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
      matchScore: 92,
      features: ['Culture', 'History', 'Food', 'Temples'],
      activities: [
        'Visit Fushimi Inari Shrine',
        'Experience a traditional tea ceremony',
        'Explore bamboo forests',
        'Try authentic Japanese cuisine'
      ]
    },
    {
      id: 'barcelona',
      name: 'Barcelona',
      country: 'Spain',
      description: 'A vibrant city known for stunning architecture, Mediterranean beaches, and lively culture.',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070&auto=format&fit=crop',
      matchScore: 88,
      features: ['City', 'Beach', 'Architecture', 'Nightlife'],
      activities: [
        'Explore Gaudí\'s masterpieces',
        'Stroll down Las Ramblas',
        'Relax on Barceloneta Beach',
        'Enjoy tapas and sangria'
      ]
    }
  ];
  
  return sampleRecommendations;
};

export const destinations = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Experience the romance, art, cuisine, and iconic landmarks of the City of Light.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    type: ['Culture', 'Food']
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches, lush rice terraces, and rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop',
    type: ['Relaxation', 'Beaches']
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina/Chile',
    description: 'Dramatic landscapes with towering mountains, pristine lakes, and incredible hiking trails.',
    image: 'https://images.unsplash.com/photo-1619409437363-1b1d6df39f49?q=80&w=1974&auto=format&fit=crop',
    type: ['Adventure', 'Nature']
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Ultra-modern metropolis with cutting-edge technology, incredible food, and ancient traditions.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop',
    type: ['Urban', 'Food']
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    description: 'Pristine white sand beaches, crystal-clear turquoise waters, and overwater bungalows.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop',
    type: ['Seclusion', 'Beaches']
  },
];
