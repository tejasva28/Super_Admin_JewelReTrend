// File: src/views/orders/variables/OrdersData.js

const ordersData = [
  {
    orderId: 'ORD1001',
    orderDate: '2023-10-25T14:30:00Z',
    orderStatus: 'Pending',
    paymentStatus: 'Completed',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerPhone: '+1 555-1234',
    billingAddress: '123 Elm Street, Springfield, USA',
    shippingAddress: '123 Elm Street, Springfield, USA',
    shippingMethod: 'Standard Shipping',
    deliveryInstructions: 'Leave at the front door if no one is home.',
    estimatedDeliveryDate: '2023-11-01',
    sellerName: 'Elegant Jewelry Co.', // New Field
    items: [
      {
        productName: 'Gold Necklace',
        sku: 'GN-001',
        quantity: 1,
        pricePerUnit: 499.99,
        totalPrice: 499.99,
        imageUrl: 'https://example.com/images/gold-necklace.jpg',
      },
      {
        productName: 'Diamond Ring',
        sku: 'DR-002',
        quantity: 2,
        pricePerUnit: 799.99,
        totalPrice: 1599.98,
        imageUrl: 'https://example.com/images/diamond-ring.jpg',
      },
    ],
    subtotal: 2099.97,
    shippingCharges: 20.0,
    taxes: 167.99,
    discounts: 0.0,
    grandTotal: 2287.96,
    transactionId: 'TX123456789',
    paymentMethod: 'Credit Card (Visa **** **** **** 1234)',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2023-10-25T14:30:00Z',
      },
    ],
    transitDetails: [
      {
        event: 'Order Placed',
        location: 'Springfield Warehouse',
        timestamp: '2023-10-25T14:30:00Z',
        status: 'completed',
      },
      // ... other transit events
    ],
    shipmentInfo: { // Ensure this field exists
      deliveryPartnerName: 'FastShip Logistics',
      insuranceCover: '$5,000',
      deliveryAddress: '123 Elm Street, Springfield, USA',
      currentLocation: { // Coordinates for Map
        latitude: 37.7749, // Example: San Francisco Latitude
        longitude: -122.4194, // Example: San Francisco Longitude
      },
    },
    notes: '',
    communicationHistory: [],
  },
  // ... more orders
];

// Function to generate more dummy data (ensure `transitDetails`, `shipmentInfo`, and `sellerName` are included)
const generateMoreOrders = () => {
  const moreOrders = [];
  for (let i = 2; i <= 50; i++) { // Generate 49 more orders (total 50)
    const orderId = `ORD100${i}`;
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - i); // Spread dates for variety

    const transitDetails = [
      {
        event: 'Order Placed',
        location: 'Springfield Warehouse',
        timestamp: new Date(orderDate).toISOString(),
        status: 'completed',
      },
      // Add more transit events as needed
    ];

    const shipmentInfo = {
      deliveryPartnerName: `FastShip Logistics ${i}`,
      insuranceCover: '$5,000',
      deliveryAddress: `${i} Elm Street, Springfield, USA`,
      currentLocation: {
        latitude: 37.7749 + i * 0.01, // Example adjustment
        longitude: -122.4194 + i * 0.01,
      },
    };

    moreOrders.push({
      orderId,
      orderDate: orderDate.toISOString(),
      orderStatus: 'Pending',
      paymentStatus: 'Completed',
      customerName: `Customer ${i}`,
      customerEmail: `customer${i}@example.com`,
      customerPhone: `+1 555-12${i}`,
      billingAddress: `${i} Elm Street, Springfield, USA`,
      shippingAddress: `${i} Elm Street, Springfield, USA`,
      shippingMethod: 'Standard Shipping',
      deliveryInstructions: 'Leave at the front door.',
      estimatedDeliveryDate: new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      sellerName: `Elegant Jewelry Co. ${i}`, // Include sellerName
      items: [
        {
          productName: `Product ${i}`,
          sku: `SKU${i}`,
          quantity: 1,
          pricePerUnit: 100 + i,
          totalPrice: 100 + i,
          imageUrl: 'https://example.com/images/product.jpg',
        },
      ],
      subtotal: 100 + i,
      shippingCharges: 20.0,
      taxes: 10.0,
      discounts: 0.0,
      grandTotal: 130 + i,
      transactionId: `TX${100000000 + i}`,
      paymentMethod: 'Credit Card (Visa **** **** **** 1234)',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date(orderDate).toISOString(),
        },
      ],
      transitDetails,
      shipmentInfo,
      notes: '',
      communicationHistory: [],
    });
  }
  return moreOrders;
};

// Generate and add more orders
const additionalOrders = generateMoreOrders();
ordersData.push(...additionalOrders);

export default ordersData;
