import { ITEMS_CATALOG } from '../data/items';

export const getShopCatalog = () => {
  return ITEMS_CATALOG; // We show all items, but they visually indicate "Locked" if source != shop or conditions not met
};

export const getRecommendedItem = (player, inventory, preferences) => {
  // Deterministic mock logic: 
  // 1. Filter out items the player already owns (if unique)
  // 2. Filter out items the player cannot afford (optional, but good for UX)
  // 3. Find an item that matches their reward preference
  
  const unownedShopItems = ITEMS_CATALOG.filter(item => {
    if (item.source !== 'shop') return false;
    const isOwned = inventory.items.some(i => i.itemId === item.id);
    if (isOwned && item.isUnique !== false) return false; // assuming most equipment is unique
    return true;
  });

  if (unownedShopItems.length === 0) return null;

  // Very simple recommendation mapping based on preferred focus
  let preferredCategory = null;
  if (preferences?.primary === 'equipment') preferredCategory = ['head', 'core', 'tool'];
  if (preferences?.primary === 'achievements') preferredCategory = ['badge', 'relic'];
  
  let recommended = null;
  
  if (preferredCategory) {
    recommended = unownedShopItems.find(item => preferredCategory.includes(item.category));
  }
  
  // Fallback to highest rarity they can afford, or just the first item
  if (!recommended) {
    const affordable = unownedShopItems.filter(item => player.gold >= item.price);
    if (affordable.length > 0) {
      // sort by price desc to recommend the best they can afford
      recommended = affordable.sort((a, b) => b.price - a.price)[0];
    } else {
      // Just pick the first unowned
      recommended = unownedShopItems[0];
    }
  }

  return recommended;
};

export const filterAndSortCatalog = (items, filter, sort, searchQuery) => {
  let result = [...items];

  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    result = result.filter(i => 
      i.name.toLowerCase().includes(q) || 
      i.description.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    );
  }

  // Filter
  if (filter !== 'all') {
    result = result.filter(i => i.category === filter);
  }

  // Sort
  switch (sort) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rarity':
      const rarityRank = { 'legendary': 5, 'epic': 4, 'rare': 3, 'uncommon': 2, 'common': 1 };
      result.sort((a, b) => (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0));
      break;
    default:
      break;
  }

  return result;
};
