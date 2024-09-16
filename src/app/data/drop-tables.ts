export const skeletonDropTable = {
  weapon: [
    { name: 'Rusty Sword', attack: 8, defense: 0, rarity: 'common', probability: 0.5, image: '/reward/rusty.png' },
    { name: 'Skeleton Sword', attack: 10, defense: 0, rarity: 'rare', probability: 0.3, image: '/reward/skeleton-sword.png' },
    { name: 'Silver Sword', attack: 13, defense: 0, rarity: 'legendary', probability: 0.2, image: '/reward/silver.png' }
  ],
  armor: [
    { name: 'Rags', defense: 7, attack: 0, rarity: 'common', probability: 0.5, image: '/reward/rags.png' },
    { name: 'Leather Armor', defense: 9, attack: 0, rarity: 'rare', probability: 0.3, image: '/reward/leather.png' },
    { name: 'Chainmail Armor', defense: 12, attack: 0, rarity: 'legendary', probability: 0.2, image: '/reward/chainmail.png' }
  ]
};

export interface reward  { 
  name: string;
  attack: number;
  defense: number;
  rarity: string;
  image: string;
};
