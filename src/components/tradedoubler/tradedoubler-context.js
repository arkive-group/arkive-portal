'use client';

import { createContext, useContext } from 'react';

// ----------------------------------------------------------------------

export const TradeDoublerContext = createContext({});

export const useTradeDoublerContext = () => {
    const context = useContext(TradeDoublerContext);
    
    if (!context) throw new Error('useTradeDoublerContext must be use inside TradeDoublerProvider');
    
    return context;
};