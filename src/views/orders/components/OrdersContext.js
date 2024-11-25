// File: src/views/orders/components/OrdersContext.js

import React, { createContext, useState, useEffect } from 'react';
import  initialOrdersData  from '../variables/OrderData';

export const OrdersContext = createContext();

export const OrderProvider = ({ children }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    // Replace this with an actual API call if available
    setTimeout(() => {
      setOrdersData(initialOrdersData);
      setLoading(false);
    }, 1000);
  }, []);

  // Function to update order status and add notifications
  const updateOrderStatus = (orderId, newStatus, additionalInfo = '') => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) => {
        if (order.orderId === orderId) {
          // Create notification message based on newStatus
          let message = '';
          const timestamp = new Date().toISOString();

          switch (newStatus) {
            case 'Accepted':
              message = 'Seller has accepted the order.';
              break;
            case 'Rejected':
              message = 'Order has been rejected.';
              break;
            case 'Handed Over':
              message = 'Seller has handed over the product.';
              break;
            case 'Appraised':
              message = `Order has been appraised as ${additionalInfo}.`;
              break;
            case 'Shipped':
              message = 'Order has been shipped to the customer.';
              break;
            case 'Delivered':
              message = 'Order has been delivered to the customer.';
              break;
            default:
              message = `Order status updated to ${newStatus}.`;
          }

          return {
            ...order,
            orderStatus: newStatus,
            notifications: [
              ...order.notifications,
              {
                message,
                timestamp,
              },
            ],
          };
        }
        return order;
      })
    );
  };

  // Function to send feedback (for simplicity, it adds a notification)
  const sendFeedback = (orderId, feedbackMessage, recipient) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) => {
        if (order.orderId === orderId) {
          const timestamp = new Date().toISOString();
          const message = `Feedback to ${recipient}: ${feedbackMessage}`;

          return {
            ...order,
            notifications: [
              ...order.notifications,
              {
                message,
                timestamp,
              },
            ],
          };
        }
        return order;
      })
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        ordersData,
        updateOrderStatus,
        sendFeedback,
        loading,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
