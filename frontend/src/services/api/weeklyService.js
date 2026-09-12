const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const weeklyService = {
  getWeeklyReport: async () => {
    await delay(800);
    return {
      dateRange: "Sep 7 – Sep 13",
      summary: {
        xpEarned: 2840,
        questsCompleted: 18,
        goldEarned: 850,
        currentStreak: 12
      },
      bossProgress: {
        name: "DSA Interview",
        progress: 72
      },
      attributes: {
        strongest: {
          name: "Intellect",
          gainedXp: 24
        },
        weakest: {
          name: "Endurance",
          gainedXp: 4
        }
      },
      lifeBalance: 84, // out of 100
      personalRecords: [
        { label: "Longest Streak", value: "18 Days" },
        { label: "Highest Daily XP", value: "420 XP" },
        { label: "Most Quests Completed", value: "7" },
        { label: "Fastest Boss Defeat", value: "4 Days" }
      ],
      nextWeekRecommendations: [
        "Focus on Intellect",
        "Complete 3 Endurance quests",
        "Continue DSA Chapter progression"
      ],
      insight: "You made strong progress in Intellect this week. Endurance was your least-trained attribute."
    };
  }
};
