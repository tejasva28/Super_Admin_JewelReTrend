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
    notes: '',
    communicationHistory: [],
  },
  // ... more orders
];

// Function to generate more dummy data
const generateMoreOrders = () => {
  const moreOrders = [];
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Rejected'];
  const paymentStatuses = ['Completed', 'Pending', 'Failed', 'Refunded'];
  const shippingMethods = ['Standard Shipping', 'Express Shipping', 'Overnight Shipping'];
  const productNames = ['Silver Bracelet', 'Pearl Earrings', 'Emerald Brooch', 'Platinum Watch', 'Ruby Pendant'];
  const names = ['Sita Patel', 'Rahul Mehta', 'Anita Desai', 'Ravi Kumar', 'Neha Gupta'];
  const emails = ['sita.patel@example.com', 'rahul.mehta@example.com', 'anita.desai@example.com', 'ravi.kumar@example.com', 'neha.gupta@example.com'];
  const phones = ['+1 555-5678', '+1 555-8765', '+1 555-4321', '+1 555-6789', '+1 555-9876'];
  const addresses = [
    '456 Oak Street, Springfield, USA',
    '789 Pine Street, Springfield, USA',
    '321 Maple Avenue, Springfield, USA',
    '654 Cedar Road, Springfield, USA',
    '987 Birch Boulevard, Springfield, USA',
  ];

  for (let i = 2; i <= 50; i++) { // Generate 49 more orders (total 50)
    const orderId = `ORD${i.toString().padStart(4, '0')}`;
    const name = names[Math.floor(Math.random() * names.length)];
    const email = emails[Math.floor(Math.random() * emails.length)];
    const phone = phones[Math.floor(Math.random() * phones.length)];
    const billingAddress = addresses[Math.floor(Math.random() * addresses.length)];
    const shippingAddress = addresses[Math.floor(Math.random() * addresses.length)];
    const shippingMethod = shippingMethods[Math.floor(Math.random() * shippingMethods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
    const estimatedDeliveryDate = new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 0-9 days from now

    // Generate random items
    const numberOfItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
    const items = [];
    let subtotal = 0;

    for (let j = 0; j < numberOfItems; j++) {
      const productName = productNames[Math.floor(Math.random() * productNames.length)];
      const sku = `SKU-${Math.floor(Math.random() * 900 + 100)}`;
      const quantity = Math.floor(Math.random() * 5) + 1; // 1-5
      const pricePerUnit = parseFloat((Math.random() * 500 + 50).toFixed(2)); // $50 - $550
      const totalPrice = parseFloat((quantity * pricePerUnit).toFixed(2));
      subtotal += totalPrice;

      items.push({
        productName,
        sku,
        quantity,
        pricePerUnit,
        totalPrice,
        imageUrl: `https://example.com/images/${productName.toLowerCase().replace(' ', '-')}.jpg`,
      });
    }

    const shippingCharges = parseFloat((Math.random() * 20 + 5).toFixed(2)); // $5 - $25
    const taxes = parseFloat((subtotal * 0.08).toFixed(2)); // 8% tax
    const discounts = parseFloat((Math.random() > 0.7 ? (subtotal * 0.1).toFixed(2) : '0.00')); // 10% discount 30% of the time
    const grandTotal = parseFloat((subtotal + shippingCharges + taxes - discounts).toFixed(2));

    const transactionId = `TX${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
    const paymentMethodOptions = ['Credit Card (Visa **** **** **** 1234)', 'PayPal (john.doe@example.com)', 'Debit Card (Mastercard **** **** **** 5678)'];
    const paymentMethod = paymentMethodOptions[Math.floor(Math.random() * paymentMethodOptions.length)];

    const statusHistory = [
      {
        status: 'Pending',
        timestamp: new Date().toISOString(),
      },
    ];

    const communicationHistory = [];

    moreOrders.push({
      orderId,
      orderDate: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
      orderStatus: status,
      paymentStatus,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      billingAddress,
      shippingAddress,
      shippingMethod,
      deliveryInstructions: Math.random() > 0.5 ? 'Leave at the back door.' : '',
      estimatedDeliveryDate,
      items,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shippingCharges,
      taxes,
      discounts,
      grandTotal,
      transactionId,
      paymentMethod,
      statusHistory,
      notes: '',
      communicationHistory,
    });
  }

  return moreOrders;
};

// Helper function to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate and add more orders
const additionalOrders = generateMoreOrders();
ordersData.push(...additionalOrders);

export default ordersData;
