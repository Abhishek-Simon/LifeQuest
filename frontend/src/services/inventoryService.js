import { ITEMS_CATALOG, getItemById } from '../data/items';

export const validatePurchase = (itemId, playerGold, inventory) => {
  const item = getItemById(itemId);
  
  if (!item) return { valid: false, reason: "Item not found." };
  if (item.source !== 'shop') return { valid: false, reason: "Item cannot be purchased." };
  if (playerGold < item.price) return { valid: false, reason: `Insufficient Gold. Need ${item.price - playerGold} more.` };
  if (inventory.items.length >= inventory.capacity) return { valid: false, reason: "Inventory is full." };
  
  // Check for unique ownership
  const alreadyOwned = inventory.items.some(i => i.itemId === itemId);
  if (alreadyOwned) return { valid: false, reason: "You already own this item." };
  
  return { valid: true, item };
};

export const getActiveBonuses = (equipment) => {
  const bonuses = [];
  
  Object.values(equipment).forEach(itemId => {
    if (itemId) {
      const item = getItemById(itemId);
      if (item && item.bonus) {
        bonuses.push(item.bonus.description);
      }
    }
  });
  
  return bonuses;
};

// Calculate abstract power level for UI only based on rarity of equipped items
export const getLoadoutPower = (equipment) => {
  let power = 0;
  const rarityValues = {
    'common': 5,
    'uncommon': 12,
    'rare': 25,
    'epic': 55,
    'legendary': 120
  };

  Object.values(equipment).forEach(itemId => {
    if (itemId) {
      const item = getItemById(itemId);
      if (item) {
        power += (rarityValues[item.rarity] || 0);
      }
    }
  });

  return power;
};
