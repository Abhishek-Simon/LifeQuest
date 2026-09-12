const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let encounterState = 'available'; // available, accepted, completed, unavailable

export const encounterService = {
  getDailyEncounter: async () => {
    await delay(600);
    
    if (encounterState === 'unavailable' || encounterState === 'completed') {
      return null;
    }

    return {
      id: 'enc-001',
      title: 'Daily Adventure',
      objective: 'Complete a 10-minute deep-focus sprint.',
      xpReward: 80,
      goldReward: 25,
      status: encounterState
    };
  },

  acceptEncounter: async () => {
    await delay(500);
    encounterState = 'accepted';
    return encounterService.getDailyEncounter();
  },

  dismissEncounter: async () => {
    await delay(300);
    encounterState = 'unavailable';
    return null;
  }
};
