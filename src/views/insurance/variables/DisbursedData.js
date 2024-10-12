// File: src/data/DisbursedData.js

const disbursedData = [
  {
    id: 'J001',
    customerName: 'Amit Sharma',
    phoneNumber: '+91 98765 43210',
    purchasedProduct: 'Gold Transit Insurance',
    email: 'amit.sharma@example.com',
    incidentDetails: 'Gold necklace lost during shipment from Delhi to Mumbai on 2023-09-10',
    totalValue: 1500000, // INR 1,500,000
    sanctionedValue: 1400000, // INR 1,400,000
    remarks: 'Approved after verifying shipment documents.',
    status: 'Approved', // Possible values: 'Approved', 'Removed', 'Pending'
  },
  {
    id: 'J002',
    customerName: 'Priya Mehta',
    phoneNumber: '+91 91234 56789',
    purchasedProduct: 'Diamond Transit Insurance',
    email: 'priya.mehta@example.com',
    incidentDetails: 'Diamond ring damaged during transit from Bengaluru to Chennai on 2023-08-22',
    totalValue: 500000, // INR 500,000
    sanctionedValue: 480000, // INR 480,000
    remarks: 'Pending appraisal report for damage assessment.',
    status: 'Pending',
  },
  {
    id: 'J003',
    customerName: 'Ravi Kumar',
    phoneNumber: '+91 99876 54321',
    purchasedProduct: 'Platinum Transit Insurance',
    email: 'ravi.kumar@example.com',
    incidentDetails: 'Platinum bracelet stolen from courier service in Kolkata on 2023-07-15',
    totalValue: 2000000, // INR 2,000,000
    sanctionedValue: 2000000, // INR 2,000,000
    remarks: 'Approved due to clear evidence of theft.',
    status: 'Approved',
  },
  {
    id: 'J004',
    customerName: 'Sonia Gupta',
    phoneNumber: '+91 92345 67890',
    purchasedProduct: 'Silver Transit Insurance',
    email: 'sonia.gupta@example.com',
    incidentDetails: 'Silver earrings damaged due to improper packaging during transit from Pune to Ahmedabad on 2023-06-30',
    totalValue: 750000, // INR 750,000
    sanctionedValue: 700000, // INR 700,000
    remarks: 'Approved with deductions for minor damages.',
    status: 'Approved',
  },
  {
    id: 'J005',
    customerName: 'Vikram Singh',
    phoneNumber: '+91 93456 78901',
    purchasedProduct: 'Pearl Transit Insurance',
    email: 'vikram.singh@example.com',
    incidentDetails: 'Pearl necklace delayed for over a week during transit from Jaipur to Surat on 2023-05-18',
    totalValue: 300000, // INR 300,000
    sanctionedValue: 0, // INR 0 (Delay not covered under policy)
    remarks: 'Rejected as delay incidents are not covered.',
    status: 'Removed',
  },
  // Add more dummy entries as needed
];

export default disbursedData;
