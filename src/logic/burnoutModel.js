/**
 * Custom Burnout Risk Score Algorithm
 * 
 * Formula:
 * risk = (lowSleepWeight * sleepDeficit) + 
 *        (workloadWeight * assignmentLoad) + 
 *        (moodWeight * negativeMoodTrend)
 * 
 * Weights are adjustable. Scores are normalized to 0-100.
 */

const WEIGHTS = {
    sleep: 0.4,    // 40% weight to sleep
    workload: 0.35, // 35% weight to workload
    mood: 0.25      // 25% weight to mood
};

const SLEEP_GOAL = 8; // Ideal hours of sleep

/**
 * Calculates a risk score for a single day.
 * @param {Object} data - { sleepHours, workloadLevel (1-10), moodScore (1-10) }
 * @returns {number} - Risk score 0-100
 */
export const calculateDailyRisk = (data) => {
    const { sleepHours, workloadLevel, moodScore } = data;

    // Sleep Deficit (0 to 8 hours deficit)
    const sleepDeficit = Math.max(0, SLEEP_GOAL - sleepHours);
    const sleepRisk = (sleepDeficit / SLEEP_GOAL) * 100;

    // Workload Risk (1-10 scaled to 0-100)
    const workloadRisk = ((workloadLevel - 1) / 9) * 100;

    // Mood Risk (1-10 where 1 is best, but usually 10 is best in apps, so we invert)
    // Let's assume 10 is "Great" and 1 is "Burnt out"
    const moodRisk = ((10 - moodScore) / 9) * 100;

    const totalRisk = (
        (sleepRisk * WEIGHTS.sleep) +
        (workloadRisk * WEIGHTS.workload) +
        (moodRisk * WEIGHTS.mood)
    );

    return Math.min(100, Math.max(0, Math.round(totalRisk)));
};

/**
 * Gets risk zone category and color.
 * @param {number} score 
 */
export const getRiskZone = (score) => {
    if (score < 30) return { label: 'Low', color: 'green', description: 'You are in a good place. Keep it up!' };
    if (score < 60) return { label: 'Moderate', color: 'yellow', description: 'Taking on a bit much? Monitor your energy.' };
    return { label: 'High', color: 'red', description: 'Warning: Significant burnout risk. Time to rest.' };
};
