// src/views/Payments/components/TransactionContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const TransactionContext = createContext();

// Create the provider component
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Example static data (replace with your actual data fetching logic)
        const mockData = [
          {
            date: '2024-01-15T09:30:00Z',
            referenceId: 'REF-12345',
            type: 'Sale',
            amount: 1500,
            status: 'Completed',
          },
          {
            date: '2024-01-16T10:00:00Z',
            referenceId: 'REF-12346',
            type: 'Refund',
            amount: -200,
            status: 'Pending',
          },
        ];

        // Simulate a small delay
        setTimeout(() => {
          setTransactions(mockData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        // Handle errors as needed
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};
