const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const comboService = {
  getComboState: async () => {
    await delay(300);
    // Simulate a 3x combo
    return {
      active: true,
      multiplier: 3,
      bonusXp: 25,
      status: 'active' // 'inactive', 'active', 'broken'
    };
  }
};
