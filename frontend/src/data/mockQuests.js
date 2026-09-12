export const MOCK_QUESTS = [
  {
    id: "q_deep_work",
    title: "Deep Work Session",
    category: "Career",
    attribute: "intellect",
    difficulty: "Challenging",
    duration: 45,
    energyCost: 25,
    rewards: {
      xp: 120,
      gold: 25,
      attributeXP: 8
    },
    description: "Complete a focused 45-minute distraction-free deep work session.",
    prerequisite: null,
    status: "available",
    comboId: "focus_chain"
  },
  {
    id: "q_morning_mobility",
    title: "Morning Mobility",
    category: "Health",
    attribute: "endurance",
    difficulty: "Easy",
    duration: 10,
    energyCost: 5,
    rewards: {
      xp: 40,
      gold: 8,
      attributeXP: 3
    },
    description: "10 minutes of dynamic stretching to prime your physical vessel.",
    prerequisite: null,
    status: "available",
    comboId: "morning_routine"
  },
  {
    id: "q_financial_review",
    title: "Weekly Financial Review",
    category: "Finance",
    attribute: "wisdom",
    difficulty: "Moderate",
    duration: 30,
    energyCost: 15,
    rewards: {
      xp: 85,
      gold: 50,
      attributeXP: 5
    },
    description: "Reconcile accounts, review budget variances, and plan next week's allocation.",
    prerequisite: null,
    status: "available"
  },
  {
    id: "q_meditation",
    title: "Void State Meditation",
    category: "Personal Growth",
    attribute: "discipline",
    difficulty: "Moderate",
    duration: 20,
    energyCost: 10,
    rewards: {
      xp: 75,
      gold: 15,
      attributeXP: 6
    },
    description: "Maintain completely still focus for 20 minutes to reset neural pathways.",
    prerequisite: null,
    status: "available",
    comboId: "morning_routine"
  },
  {
    id: "q_algorithm_practice",
    title: "Algorithm Mastery",
    category: "Learning",
    attribute: "intellect",
    difficulty: "Hard",
    duration: 60,
    energyCost: 35,
    rewards: {
      xp: 200,
      gold: 40,
      attributeXP: 12
    },
    description: "Implement and optimize 2 advanced data structure algorithms without looking at reference.",
    prerequisite: "q_deep_work",
    status: "locked"
  },
  {
    id: "q_creative_writing",
    title: "Creative Free-Writing",
    category: "Creativity",
    attribute: "creativity",
    difficulty: "Moderate",
    duration: 30,
    energyCost: 15,
    rewards: {
      xp: 90,
      gold: 20,
      attributeXP: 7
    },
    description: "Write continuously for 30 minutes. Do not edit. Let ideas flow.",
    prerequisite: null,
    status: "available"
  },
  {
    id: "q_heavy_lifting",
    title: "Heavy Resistance Training",
    category: "Health",
    attribute: "strength",
    difficulty: "Epic",
    duration: 90,
    energyCost: 60,
    rewards: {
      xp: 350,
      gold: 80,
      attributeXP: 25
    },
    description: "Complete a full heavy compound lifting session (Squat, Deadlift, Bench).",
    prerequisite: null,
    status: "available"
  }
];

export const CATEGORIES = [
  "All",
  "Career",
  "Health",
  "Learning",
  "Finance",
  "Personal Growth",
  "Creativity"
];

export const DIFFICULTIES = [
  "All",
  "Easy",
  "Moderate",
  "Challenging",
  "Hard",
  "Epic"
];
