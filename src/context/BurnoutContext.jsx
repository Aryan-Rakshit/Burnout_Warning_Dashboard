import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadData, saveData } from '../utils/storage';
import { calculateDailyRisk } from '../logic/burnoutModel';

const BurnoutContext = createContext();

export const BurnoutProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        const saved = loadData();
        if (saved) {
            setHistory(saved);
        }
        setLoading(false);
    }, []);

    // Save data whenever history changes
    useEffect(() => {
        if (!loading) {
            saveData(history);
        }
    }, [history, loading]);

    const addEntry = (entry) => {
        const riskScore = calculateDailyRisk(entry);
        const newEntry = {
            ...entry,
            id: Date.now(),
            date: new Date().toISOString(),
            riskScore
        };
        setHistory(prev => [...prev, newEntry]);
    };

    const deleteEntry = (id) => {
        setHistory(prev => prev.filter(entry => entry.id !== id));
    };

    const latestEntry = history.length > 0 ? history[history.length - 1] : null;

    return (
        <BurnoutContext.Provider value={{
            history,
            addEntry,
            deleteEntry,
            latestEntry,
            loading
        }}>
            {children}
        </BurnoutContext.Provider>
    );
};

export const useBurnout = () => {
    const context = useContext(BurnoutContext);
    if (!context) {
        throw new Error('useBurnout must be used within a BurnoutProvider');
    }
    return context;
};
