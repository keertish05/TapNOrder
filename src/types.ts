export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  isVeg: boolean;
  isJain: boolean;
  isEgg: boolean;
  isGlutenFree: boolean;
  spiceLevel: number; // 1-5
  prepTime: number; // minutes
  isTrending?: boolean;
  moods?: string[];
  portionSize?: string;
  tasteTags?: string[];
  popularityBadge?: string;
  videoUrl?: string;
}

export interface CartItem extends Dish {
  quantity: number;
  addedBy: string; // emoji
  customizations: {
    extraSpicy: boolean;
    noOnion: boolean;
    isJain: boolean;
    lessOil: boolean;
    doubleCheese: boolean;
  };
}

export interface SocialPost {
  id: string;
  image: string;
  likes: number;
  author: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  requested?: boolean;
}
