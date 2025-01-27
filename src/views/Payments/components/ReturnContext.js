// File: src/views/orders/components/ReturnContext.js

import React, { createContext, useState, useEffect, useMemo } from 'react';
import returnRequestsData from '../variables/returnRequests'; // Correct import

export const ReturnContext = createContext();

export const ReturnProvider = ({ children }) => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returnRequests, setReturnRequests] = useState([]); // Initialize returnRequests

  useEffect(() => {
    console.log('returnRequestsData:', returnRequestsData);

    if (Array.isArray(returnRequestsData)) {
      const normalizedData = returnRequestsData.map(item => ({
        ...item,
        status: item.returnStatus || item.status,
        requestDate: item.returnDate || item.requestDate || item.orderDate,
        returnId: item.returnId || item.id,
      }));
      setReturns(normalizedData);
      setReturnRequests(returnRequestsData); // Set returnRequests directly
      console.log('Returns set:', normalizedData);
    } else {
      console.error('Invalid data format');
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
      returnRequests,
      setReturnRequests
    }}>
      {children}
    </ReturnContext.Provider>
  );
};

export default ReturnProvider;