
// File: src/views/orders/components/ReturnContext.js

import React, { createContext, useState, useEffect, useMemo } from 'react';
import returnData from '../variables/returnData'; // Ensure correct import

export const ReturnContext = createContext({
  returns: [],
  updateReturnStatus: () => {},
  loading: true,
  returnsPerMonth: { chartData: [], chartLabels: [] },
  pendingReturnsCount: 0
});

export const ReturnProvider = ({ children }) => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Removed setTimeout for immediate data loading
    console.log('returnData:', returnData); // Verify returnData
    if (Array.isArray(returnData)) {
      // Normalize data if field names differ
      const normalizedData = returnData.map(item => ({
        ...item,
        status: item.returnStatus || item.status,
        requestDate: item.returnDate || item.requestDate,
        returnId: item.returnId || item.id, // Ensure returnId exists
      }));
      setReturns(normalizedData);
      console.log('Returns set:', normalizedData); // New log to verify returns state
    } else {
      console.error('Invalid returnData format');
      setReturns([]);
    }
    setLoading(false);
  }, []);

  // Function to update return status
  const updateReturnStatus = (returnId, newStatus) => {
    setReturns(prevReturns =>
      prevReturns.map(returnItem =>
        returnItem.returnId === returnId ? { ...returnItem, status: newStatus } : returnItem
      )
    );
  };

  // Compute returns per month
  const returnsPerMonth = useMemo(() => {
    const counts = {};
    returns.forEach(returnItem => {
      const date = new Date(returnItem.requestDate);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      counts[month] = (counts[month] || 0) + 1;
    });

    const sortedMonths = Object.keys(counts).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    return {
      chartData: sortedMonths.map(month => counts[month]),
      chartLabels: sortedMonths
    };
  }, [returns]);

  // Calculate pending returns count
  const pendingReturnsCount = useMemo(() => {
    return returns.filter(returnItem => returnItem.status === 'Pending').length;
  }, [returns]);

  return (
    <ReturnContext.Provider value={{
      returns,
      updateReturnStatus,
      loading,
      returnsPerMonth,
      pendingReturnsCount,
    }}>
      {children}
    </ReturnContext.Provider>
  );
};

export default ReturnProvider;