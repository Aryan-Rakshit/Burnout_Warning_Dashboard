import React from 'react';
import { useBurnout } from '../context/BurnoutContext';
import { getRiskZone } from '../logic/burnoutModel';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

const RiskCard = () => {
    const { latestEntry } = useBurnout();

    if (!latestEntry) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <AlertCircle size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">No data yet. Complete your first check-in to see your risk score.</p>
            </div>
        );
    }

    const { riskScore } = latestEntry;
    const { label, color, description } = getRiskZone(riskScore);

    const colors = {
        green: 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
        yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
        red: 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
    };

    const Icon = riskScore < 30 ? CheckCircle2 : riskScore < 60 ? AlertTriangle : AlertCircle;

    return (
        <div className={`p-6 rounded-2xl border ${colors[color]} shadow-sm`}>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider opacity-80">Current Burnout Risk</p>
                    <h2 className="text-4xl font-black mt-1">{riskScore}%</h2>
                </div>
                <Icon size={40} className="mt-1" />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${colors[color]}`}>
                        {label} RISK
                    </span>
                </div>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                    {description}
                </p>
            </div>

            {/* Health Bar Visualization */}
            <div className="mt-6 h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-out ${color === 'green' ? 'bg-green-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                    style={{ width: `${riskScore}%` }}
                />
            </div>
        </div>
    );
};

export default RiskCard;
