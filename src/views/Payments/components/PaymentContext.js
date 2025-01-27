// File: PaymentContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the PaymentContext with default values
export const PaymentContext = createContext({
  payments: [],
  updatePaymentStatus: () => {},
  // Add other functions or state variables as needed
});

export const addAdminComment = createContext({
  payments: [],
  updatePaymentStatus: () => {},
  // Add other functions or state variables as needed
});

// Create the PaymentProvider component
export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);

  // Fetch or initialize your payments data here
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Example static data; replace with actual API call if needed
        const data = [
          {
            id: 1,
            date: '2024-04-10',
            referenceId: 'PAY123456',
            type: 'Settlement',
            amount: 1000.0,
            status: 'Pending',
            description: 'Settlement for March',
          },
          {
            id: 2,
            date: '2024-04-15',
            referenceId: 'PAY123457',
            type: 'Refund',
            amount: -50.0,
            status: 'Completed',
            description: 'Refund for Order #7890',
          },
          // Add more payment records as needed
        ];
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  // Define the updatePaymentStatus function
  const updatePaymentStatus = (referenceId, newStatus) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.referenceId === referenceId
          ? { ...payment, status: newStatus }
          : payment
      )
    );
  };

  return (
    <PaymentContext.Provider value={{ payments, updatePaymentStatus }}>
      {children}
    </PaymentContext.Provider>
  );
};
