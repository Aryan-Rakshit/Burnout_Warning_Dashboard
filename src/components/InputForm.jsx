import React, { useState } from 'react';
import { useBurnout } from '../context/BurnoutContext';
import { Moon, Briefcase, Smile, Send } from 'lucide-react';

const InputForm = () => {
    const { addEntry } = useBurnout();
    const [formData, setFormData] = useState({
        sleepHours: 7,
        workloadLevel: 5,
        moodScore: 7
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addEntry(formData);
        // Optional: add a success message or reset?
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Daily Check-in</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sleep Hours */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Moon size={18} className="text-indigo-500" />
                        Sleep Hours: <span className="text-indigo-600 font-bold">{formData.sleepHours}h</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="12"
                        step="0.5"
                        value={formData.sleepHours}
                        onChange={(e) => setFormData({ ...formData, sleepHours: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>

                {/* Workload */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Briefcase size={18} className="text-orange-500" />
                        Workload Level: <span className="text-orange-600 font-bold">{formData.workloadLevel}/10</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.workloadLevel}
                        onChange={(e) => setFormData({ ...formData, workloadLevel: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                </div>

                {/* Mood */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Smile size={18} className="text-green-500" />
                        Mood Score: <span className="text-green-600 font-bold">{formData.moodScore}/10</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.moodScore}
                        onChange={(e) => setFormData({ ...formData, moodScore: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                >
                    <Send size={18} />
                    Submit Entry
                </button>
            </form>
        </div>
    );
};

export default InputForm;
