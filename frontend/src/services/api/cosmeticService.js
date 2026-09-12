const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Database
let userGold = 1840;
let ownedItems = ['item-1', 'item-4'];
let equippedItems = {
  Avatar: 'item-1',
  Theme: null,
  Frame: 'item-4',
  Badge: null
};

const catalog = [
  {
    id: 'item-1',
    name: 'Void Runner',
    category: 'Avatars',
    rarity: 'Epic',
    price: 250,
    preview: 'person', // using material symbol for mockup
  },
  {
    id: 'item-2',
    name: 'Crimson Dawn',
    category: 'Themes',
    rarity: 'Rare',
    price: 150,
    preview: 'palette',
  },
  {
    id: 'item-3',
    name: 'Obsidian Plate',
    category: 'Frames',
    rarity: 'Common',
    price: 50,
    preview: 'crop_square',
  },
  {
    id: 'item-4',
    name: 'Founder',
    category: 'Badges',
    rarity: 'Legendary',
    price: 1000,
    preview: 'stars',
  },
  {
    id: 'item-5',
    name: 'Cyber Monk',
    category: 'Avatars',
    rarity: 'Mythic',
    price: 500,
    preview: 'self_improvement',
  }
];

export const cosmeticService = {
  // Shop API
  getShopState: async () => {
    await delay(400);
    return {
      gold: userGold,
      items: catalog.map(item => ({
        ...item,
        owned: ownedItems.includes(item.id),
        equipped: equippedItems[item.category] === item.id
      }))
    };
  },

  purchaseItem: async (id) => {
    await delay(600);
    const item = catalog.find(i => i.id === id);
    if (!item) throw new Error("Item not found");
    if (ownedItems.includes(id)) throw new Error("Already owned");
    if (userGold < item.price) throw new Error("Insufficient Gold");

    userGold -= item.price;
    ownedItems.push(id);
    
    return { success: true, newBalance: userGold };
  },

  // Inventory API
  getInventoryState: async () => {
    await delay(300);
    const items = catalog
      .filter(item => ownedItems.includes(item.id))
      .map(item => ({
        ...item,
        equipped: equippedItems[item.category] === item.id
      }));

    // Resolve loadout objects
    const loadout = {
      Avatar: items.find(i => i.id === equippedItems.Avatar) || null,
      Theme: items.find(i => i.id === equippedItems.Theme) || null,
      Frame: items.find(i => i.id === equippedItems.Frame) || null,
      Badge: items.find(i => i.id === equippedItems.Badge) || null,
    };

    return { items, loadout };
  },

  equipItem: async (id) => {
    await delay(400);
    const item = catalog.find(i => i.id === id);
    if (!item || !ownedItems.includes(id)) throw new Error("Item not owned");
    
    equippedItems[item.category] = id;
    
    return { success: true };
  }
};
