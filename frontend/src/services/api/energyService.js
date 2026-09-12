const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const energyService = {
  getEnergyState: async () => {
    await delay(200);
    // Simulating low energy state for UI demonstration
    return {
      current: 25,
      max: 100,
      isLow: true,
      message: 'Consider a lighter quest.'
    };
  }
};
