const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const difficultyService = {
  submitFeedback: async (questId, feedback) => {
    await delay(500);
    console.log(`[Difficulty Feedback] Quest: ${questId}, Feedback: ${feedback}`);
    return { success: true };
  }
};
