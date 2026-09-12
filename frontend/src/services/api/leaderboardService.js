// Mock service for Leaderboard API until backend is ready.

const mockLeaderboardWeekly = {
  period: 'weekly',
  entries: [
    { rank: 1, userId: 'u2', name: 'Aryan', avatar: null, xp: 1240, streak: 18 },
    { rank: 2, userId: 'u3', name: 'Riya', avatar: null, xp: 1180, streak: 12 },
    { rank: 3, userId: 'u1', name: 'You', avatar: null, xp: 1120, streak: 9, isCurrentUser: true },
    { rank: 4, userId: 'u4', name: 'Vikram', avatar: null, xp: 950, streak: 5 },
    { rank: 5, userId: 'u5', name: 'Ananya', avatar: null, xp: 820, streak: 3 },
  ],
  currentUser: {
    rank: 3,
    xp: 1120,
    xpToNextRank: 60,
    change: '+2'
  }
};

const mockLeaderboardMonthly = {
  period: 'monthly',
  entries: [
    { rank: 1, userId: 'u2', name: 'Aryan', avatar: null, xp: 5240, streak: 18 },
    { rank: 2, userId: 'u1', name: 'You', avatar: null, xp: 4800, streak: 9, isCurrentUser: true },
    { rank: 3, userId: 'u3', name: 'Riya', avatar: null, xp: 4180, streak: 12 },
    { rank: 4, userId: 'u4', name: 'Vikram', avatar: null, xp: 3950, streak: 5 },
    { rank: 5, userId: 'u5', name: 'Ananya', avatar: null, xp: 3820, streak: 3 },
  ],
  currentUser: {
    rank: 2,
    xp: 4800,
    xpToNextRank: 440,
    change: '+4'
  }
};

const mockLeaderboardAllTime = {
  period: 'all_time',
  entries: [
    { rank: 1, userId: 'u2', name: 'Aryan', avatar: null, xp: 15240, streak: 18 },
    { rank: 2, userId: 'u3', name: 'Riya', avatar: null, xp: 14180, streak: 12 },
    { rank: 3, userId: 'u4', name: 'Vikram', avatar: null, xp: 13950, streak: 5 },
    { rank: 4, userId: 'u5', name: 'Ananya', avatar: null, xp: 13820, streak: 3 },
    { rank: 5, userId: 'u1', name: 'You', avatar: null, xp: 12120, streak: 9, isCurrentUser: true },
    { rank: 6, userId: 'u6', name: 'Karan', avatar: null, xp: 11000, streak: 2 },
    { rank: 7, userId: 'u7', name: 'Sara', avatar: null, xp: 10500, streak: 1 },
  ],
  currentUser: {
    rank: 5,
    xp: 12120,
    xpToNextRank: 1700,
    change: '0'
  }
};

export const leaderboardService = {
  getLeaderboard: async (period = 'weekly') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    switch (period) {
      case 'weekly':
        return mockLeaderboardWeekly;
      case 'monthly':
        return mockLeaderboardMonthly;
      case 'all_time':
        return mockLeaderboardAllTime;
      default:
        return mockLeaderboardWeekly;
    }
  },
  
  // Future method for exact endpoint implementation:
  // getLeaderboardReal: async (period) => {
  //   const response = await api.get(`/api/v1/leaderboard?period=${period}`);
  //   return response.data;
  // }
};
