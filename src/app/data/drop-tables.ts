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

export const zombieDropTable = {
  weapon: [
    { name: 'Rusty Axe', attack: 9, defense: 0, rarity: 'common', probability: 0.6, image: '/reward/rusty-axe.png' },
    { name: 'Zombie Axe', attack: 12, defense: 0, rarity: 'rare', probability: 0.25, image: '/reward/zombie-axe.png' },
    { name: 'Dark Axe', attack: 14, defense: 0, rarity: 'legendary', probability: 0.15, image: '/reward/dark-axe.png' }
  ],
  armor: [
    { name: 'Scraps Armor', defense: 8, attack: 0, rarity: 'common', probability: 0.6, image: '/reward/base-armor.png' },
    { name: 'Rotten Leather', defense: 11, attack: 0, rarity: 'rare', probability: 0.25, image: '/reward/rotten-leather.png' },
    { name: 'Bone Armor', defense: 14, attack: 0, rarity: 'legendary', probability: 0.15, image: '/reward/bone-armor.png' }
  ]
};

export const vampireDropTable = {
  weapon: [
    { name: 'Blood Dagger', attack: 10, defense: 0, rarity: 'common', probability: 0.5, image: '/reward/blood-dagger.png' },
    { name: 'Vampire Blade', attack: 15, defense: 0, rarity: 'rare', probability: 0.35, image: '/reward/vampire-blade.png' },
    { name: 'Crimson Scythe', attack: 16, defense: 0, rarity: 'legendary', probability: 0.15, image: '/reward/crimson-scythe.png' }
  ],
  armor: [
    { name: 'Dark Cloak', defense: 9, attack: 0, rarity: 'common', probability: 0.5, image: '/reward/dark-cloak.png' },
    { name: 'Shadow Armor', defense: 12, attack: 0, rarity: 'rare', probability: 0.35, image: '/reward/shadow-armor.png' },
    { name: 'Crimson Robe', defense: 15, attack: 0, rarity: 'legendary', probability: 0.15, image: '/reward/crimson-robe.png' }
  ]
};

export const specterDropTable = {
  weapon: [
    { name: 'Ghost Blade', attack: 13, defense: 0, rarity: 'common', probability: 0.55, image: '/reward/ghost-blade.png' },
    { name: 'Spectral Sword', attack: 16, defense: 0, rarity: 'rare', probability: 0.3, image: '/reward/spectral-sword.png' },
    { name: 'Soul Reaper', attack: 18, defense: 0, rarity: 'legendary', probability: 0.15, image: '/reward/soul-reaper.png' }
  ],
  armor: [
    { name: 'Ethereal Shroud', defense: 12, attack: 0, rarity: 'common', probability: 0.55, image: '/reward/ethereal-shroud.png' },
    { name: 'Spirit Armor', defense: 14, attack: 0, rarity: 'rare', probability: 0.3, image: '/reward/spirit-armor.png' },
    { name: 'Soul Plate', defense: 16, attack: 0, rarity: 'legendary', probability: 0.15, image: '/reward/soul-plate.png' }
  ]
};

export const dragonDropTable = {
  weapon: [
    { name: 'Dragon Claw', attack: 18, defense: 0, rarity: 'common', probability: 0.5, image: '/reward/dragon-claw.png' },
    { name: 'Dragon Slayer Sword', attack: 22, defense: 0, rarity: 'rare', probability: 0.3, image: '/reward/dragon-slayer.png' },
    { name: 'Elder Dragon Fang', attack: 30, defense: 0, rarity: 'legendary', probability: 0.2, image: '/reward/elder-dragon-fang.png' }
  ],
  armor: [
    { name: 'Dragon Hide', defense: 15, attack: 0, rarity: 'common', probability: 0.5, image: '/reward/dragon-hide.png' },
    { name: 'Dragon Scale Armor', defense: 20, attack: 0, rarity: 'rare', probability: 0.3, image: '/reward/dragon-scale.png' },
    { name: 'Elder Dragon Plate', defense: 25, attack: 0, rarity: 'legendary', probability: 0.2, image: '/reward/elder-dragon-plate.png' }
  ]
};

export interface reward  { 
  name: string;
  attack: number;
  defense: number;
  rarity: string;
  image: string;
};
