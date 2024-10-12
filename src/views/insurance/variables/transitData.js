// File: src/views/insurance/variables/transitData.js

const transitData = [
  {
    transitID: 'T001',
    customerName: 'Amit Sharma',
    productID: 'P001',
    productName: 'Gold Transit Insurance',
    productAmount: 1500000, // INR 1,500,000
    amountCover: 1400000,    // INR 1,400,000
    transitAction: 'Approved',
  },
  {
    transitID: 'T002',
    customerName: 'Priya Mehta',
    productID: 'P002',
    productName: 'Diamond Transit Insurance',
    productAmount: 500000,   // INR 500,000
    amountCover: 480000,     // INR 480,000
    transitAction: 'Rejected',
  },
  {
    transitID: 'T003',
    customerName: 'Ravi Kumar',
    productID: 'P003',
    productName: 'Platinum Transit Insurance',
    productAmount: 2000000,  // INR 2,000,000
    amountCover: 2000000,    // INR 2,000,000
    transitAction: 'Approved',
  },
  {
    transitID: 'T004',
    customerName: 'Sonia Gupta',
    productID: 'P004',
    productName: 'Silver Transit Insurance',
    productAmount: 750000,    // INR 750,000
    amountCover: 700000,      // INR 700,000
    transitAction: 'Approved',
  },
  {
    transitID: 'T005',
    customerName: 'Vikram Singh',
    productID: 'P005',
    productName: 'Pearl Transit Insurance',
    productAmount: 300000,    // INR 300,000
    amountCover: 0,            // INR 0 (Rejected)
    transitAction: 'Rejected',
  },
  // Add more dummy entries as needed
];

export default transitData;
