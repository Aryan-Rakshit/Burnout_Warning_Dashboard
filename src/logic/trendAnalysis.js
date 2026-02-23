/**
 * Trend Analysis Logic
 * 
 * Includes functions for calculating moving averages and detecting slopes.
 */

/**
 * Calculates a simple moving average.
 * @param {number[]} data - Array of numbers.
 * @param {number} period - Number of days.
 */
export const calculateSMA = (data, period) => {
    if (data.length < period) return null;
    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        sma.push(sum / period);
    }
    return sma;
};

/**
 * Detects if a metric is on a downward or upward slope.
 * @param {number[]} data - Most recent data points.
 * @returns {number} - The slope (rate of change).
 */
export const calculateSlope = (data) => {
    if (data.length < 2) return 0;
    const n = data.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (let i = 0; i < n; i++) {
        sumX += i;
        sumY += data[i];
        sumXY += i * data[i];
        sumXX += i * i;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
};

/**
 * Generates warning insights based on trends.
 * @param {Array} history - Array of daily check-in objects.
 */
export const getInsights = (history) => {
    if (history.length < 3) return ["Keep logging your daily data to see trends!"];

    const insights = [];
    const recentSleep = history.slice(-3).map(d => d.sleepHours);
    const recentMood = history.slice(-3).map(d => d.moodScore);

    const sleepSlope = calculateSlope(recentSleep);
    const moodSlope = calculateSlope(recentMood);

    if (sleepSlope < -0.5) {
        insights.push("Your sleep has been declining rapidly over the last 3 days. Consider prioritizing rest.");
    }

    if (moodSlope < -0.5) {
        insights.push("We've noticed a downward trend in your mood. Take a moment for self-care.");
    }

    if (history[history.length - 1].workloadLevel > 8) {
        insights.push("Your workload is currently very high. Try to break tasks into smaller steps.");
    }

    return insights.length > 0 ? insights : ["You're maintaining a steady balance. Keep it up!"];
};
