const returnData = [
  {
    // A pending return request with updated details
    returnId: "R2001",
    status: "Pending",
    orderId: "OIND-12345",
    // Changed from 2023 to 2024 to maintain consistency with other data
    orderDate: "2024-10-15T09:30:00Z",
    orderTotal: 35999.0, // INR
    shippingAddress: "101, JLN Marg, Jaipur, Rajasthan, 302017, India",
    paymentMethod: "Net Banking (SBI)",
    customerName: "Ankit Sharma",
    customerId: "CIND-150",
    customerEmail: "ankit.sharma@example.in",
    customerPhone: "+91-98765-67890",
    customerRating: "Silver Member",
    products: [
      {
        name: "14K Gold Ring",
        image: "https://via.placeholder.com/80?text=14K+Gold+Ring",
        sku: "GOLD-RING-14K",
        quantity: 1,
        price: 15000.0,
        condition: "New",
      },
      {
        name: "Emerald Pendant",
        image: "https://via.placeholder.com/80?text=Emerald+Pendant",
        sku: "EMER-PEND-001",
        quantity: 1,
        price: 20999.0,
        condition: "New",
      },
    ],
    returnReason: {
      primary: "Damaged Item",
      additional: "The gold ring has visible scratches, and the pendant clasp is faulty.",
    },
    returnMethod: {
      chosen: "Carrier Pickup",
      preferredShipping: "DHL",
    },
    supportingDocuments: {
      photos: [
        { url: "https://via.placeholder.com/200?text=Ring+Scratches" },
        { url: "https://via.placeholder.com/200?text=Pendant+Clasp+Issue" },
      ],
      attachments: [
        { name: "Invoice_Ankit.pdf" },
        { name: "Warranty_Card.pdf" },
      ],
    },
    communicationLog: [
      {
        sender: "Customer",
        // Date updated to 2024 to align with orderDate
        content: "Items received are damaged.",
        timestamp: "2024-10-16 10:00 AM",
      },
      {
        sender: "Seller",
        content: "Please provide photos of the damaged items.",
        timestamp: "2024-10-16 11:15 AM",
      },
      {
        sender: "Customer",
        content: "Uploaded the required photos and documents.",
        timestamp: "2024-10-16 12:30 PM",
      },
    ],
    activityLog: [
      {
        timestamp: "2024-10-16 09:50 AM",
        description: "Customer initiated return request.",
      },
      {
        timestamp: "2024-10-16 10:30 AM",
        description: "Seller requested supporting documents.",
      },
    ],
    pendingTasks: [
      "Inspect the photos of the damaged items.",
      "Coordinate with the shipping provider regarding damage.",
    ],
    // Pickup date updated to align with chronological order after communication and activity
    pickupDetails: {
      date: "2024-10-20",
      location: "101, JLN Marg, Jaipur, Rajasthan, 302017, India",
      carrier: "DHL",
    },
  },
  {
    // A pending return request with comprehensive details
    returnId: "R1001",
    status: "Pending",
    orderId: "OIND-98765",
    orderDate: "2024-11-15T09:30:00Z",
    orderTotal: 45999.0, // INR
    shippingAddress: "23A, MG Road, Bengaluru, Karnataka, 560001, India",
    paymentMethod: "Credit Card (HDFC)",
    customerName: "Rohit Singh",
    customerId: "CIND-100",
    customerEmail: "rohit.singh@example.in",
    customerPhone: "+91-98860-12345",
    customerRating: "Gold Member",
    products: [
      {
        name: "22K Gold Necklace",
        image: "https://via.placeholder.com/80?text=22K+Gold+Necklace",
        sku: "GOLD-NEC-22K",
        quantity: 1,
        price: 35000.0,
        condition: "New",
      },
      {
        name: "Silver Anklet Pair",
        image: "https://via.placeholder.com/80?text=Silver+Anklet",
        sku: "SILV-ANK-925",
        quantity: 1,
        price: 4000.0,
        condition: "New",
      },
      {
        name: "Pearl Earrings",
        image: "https://via.placeholder.com/80?text=Pearl+Earrings",
        sku: "PEARL-EAR-001",
        quantity: 1,
        price: 6999.0,
        condition: "New",
      },
    ],
    returnReason: {
      primary: "Item Not as Described",
      additional: "The gold necklace seems lighter than specified and the pearl earrings are slightly discolored.",
    },
    returnMethod: {
      chosen: "Carrier Pickup",
      preferredShipping: "Blue Dart",
    },
    supportingDocuments: {
      photos: [
        { url: "https://via.placeholder.com/200?text=Necklace+Issue" },
        { url: "https://via.placeholder.com/200?text=Earrings+Color" },
      ],
      attachments: [
        { name: "Original_Invoice.pdf" },
        { name: "Certificate_of_Authenticity.pdf" },
      ],
    },
    communicationLog: [
      {
        sender: "Customer",
        content: "The necklace doesn't match the weight mentioned online.",
        timestamp: "2024-11-16 10:00 AM",
      },
      {
        sender: "Seller",
        content: "Could you provide photos and the authenticity certificate?",
        timestamp: "2024-11-16 11:15 AM",
      },
      {
        sender: "Customer",
        content: "Uploaded the documents and photos now.",
        timestamp: "2024-11-16 12:30 PM",
      },
    ],
    activityLog: [
      {
        timestamp: "2024-11-16 09:50 AM",
        description: "Customer initiated return request.",
      },
      {
        timestamp: "2024-11-16 10:30 AM",
        description: "Seller requested authenticity documents.",
      },
      {
        timestamp: "2024-11-16 13:00 PM",
        description: "Seller reviewing submitted documents.",
      },
    ],
    pendingTasks: [
      "Verify authenticity certificate with QC team.",
      "Check item weight discrepancy in warehouse records.",
    ],
    pickupDetails: {
      date: "2024-11-20",
      location: "23A, MG Road, Bengaluru, Karnataka, 560001, India",
      carrier: "Blue Dart",
    },
  },
  {
    // A return request that has been approved and is ready for pickup
    returnId: "R1002",
    status: "Approved",
    orderId: "OIND-54321",
    orderDate: "2024-10-05T13:00:00Z",
    orderTotal: 25999.0,
    shippingAddress: "Flat 12B, DLF Phase 2, Gurugram, Haryana, 122002, India",
    paymentMethod: "UPI (Paytm)",
    customerName: "Meera Sharma",
    customerId: "CIND-200",
    customerEmail: "meera.sharma@example.in",
    customerPhone: "+91-98100-54321",
    products: [
      {
        name: "Diamond Studded Nose Ring",
        image: "https://via.placeholder.com/80?text=Diamond+Nose+Ring",
        sku: "DIAM-NOSE-001",
        quantity: 1,
        price: 25999.0,
        condition: "New",
      },
    ],
    returnReason: {
      primary: "Defective Item",
      additional: "The diamond seems loose in the setting.",
    },
    returnMethod: {
      chosen: "Carrier Pickup",
      preferredShipping: "Delhivery",
    },
    supportingDocuments: {
      photos: [
        { url: "https://via.placeholder.com/200?text=Loose+Diamond" },
      ],
      attachments: [
        { name: "Original_Bill.pdf" },
      ],
    },
    communicationLog: [
      {
        sender: "Customer",
        content: "The diamond in the nose ring is wiggling.",
        timestamp: "2024-10-06 09:00 AM",
      },
      {
        sender: "Seller",
        content: "We will approve the return and schedule a pickup.",
        timestamp: "2024-10-06 10:00 AM",
      },
    ],
    activityLog: [
      {
        timestamp: "2024-10-06 08:55 AM",
        description: "Customer requested return.",
      },
      {
        timestamp: "2024-10-06 10:05 AM",
        description: "Return approved.",
      },
      {
        timestamp: "2024-10-06 10:30 AM",
        description: "Pickup scheduled with Delhivery.",
      },
    ],
    pendingTasks: [],
    pickupDetails: {
      date: "2024-10-10",
      location: "Flat 12B, DLF Phase 2, Gurugram, Haryana, 122002, India",
      carrier: "Delhivery",
    },
  },
  {
    // A rejected return request
    returnId: "R1003",
    status: "Rejected",
    orderId: "OIND-11111",
    orderDate: "2024-09-25T16:00:00Z",
    orderTotal: 8999.0,
    shippingAddress: "45, Park Street, Kolkata, West Bengal, 700016, India",
    paymentMethod: "Debit Card (SBI)",
    customerName: "Aditi Verma",
    customerId: "CIND-300",
    customerEmail: "aditi.verma@example.in",
    customerPhone: "+91-98765-43210",
    products: [
      {
        name: "Gold-Plated Bangles",
        image: "https://via.placeholder.com/80?text=Gold-Plated+Bangles",
        sku: "GP-BNG-101",
        quantity: 2,
        price: 4499.50,
        condition: "New",
      },
    ],
    returnReason: {
      primary: "Changed Mind",
    },
    returnMethod: {
      chosen: "Customer Drop-off at Store",
    },
    supportingDocuments: {
      photos: [],
      attachments: [],
    },
    communicationLog: [
      {
        sender: "Customer",
        content: "I've changed my mind, no longer need these bangles.",
        timestamp: "2024-09-26 10:45 AM",
      },
      {
        sender: "Seller",
        content: "Return rejected as per policy (no returns for change of mind).",
        timestamp: "2024-09-26 11:00 AM",
      },
    ],
    activityLog: [
      {
        timestamp: "2024-09-26 10:40 AM",
        description: "Customer requested return.",
      },
      {
        timestamp: "2024-09-26 11:05 AM",
        description: "Return request rejected.",
      },
    ],
    pendingTasks: [],
    // No pickup details since it's rejected
  },
  {
    // A pending request with multiple pieces of jewelry and more complex details
    returnId: "R1004",
    status: "Pending",
    orderId: "OIND-22222",
    orderDate: "2024-12-01T10:00:00Z",
    orderTotal: 99999.0,
    shippingAddress: "10, Linking Road, Mumbai, Maharashtra, 400050, India",
    paymentMethod: "UPI (Google Pay)",
    customerName: "Karan Mehta",
    customerId: "CIND-400",
    customerEmail: "karan.mehta@example.in",
    customerPhone: "+91-90909-12345",
    customerRating: "Platinum Member",
    products: [
      {
        name: "Polki Diamond Necklace",
        image: "https://via.placeholder.com/80?text=Polki+Necklace",
        sku: "POLKI-NEC-999",
        quantity: 1,
        price: 70000.0,
        condition: "New",
      },
      {
        name: "Antique Gold Maang Tikka",
        image: "https://via.placeholder.com/80?text=Maang+Tikka",
        sku: "ANTQ-TIKKA-555",
        quantity: 1,
        price: 29999.0,
        condition: "New",
      },
    ],
    returnReason: {
      primary: "Defective Item",
      additional: "The Polki diamond settings seem loose, and the Maang Tikka clasp isn't secure.",
    },
    returnMethod: {
      chosen: "Carrier Pickup",
      preferredShipping: "Ecom Express",
    },
    supportingDocuments: {
      photos: [
        { url: "https://via.placeholder.com/200?text=Loose+Polki+Setting" },
        { url: "https://via.placeholder.com/200?text=Tikka+Clasp+Issue" },
      ],
      attachments: [
        { name: "Original_Invoice.pdf" },
        { name: "Hallmark_Certification.pdf" },
        { name: "QA_Report.txt" },
      ],
    },
    communicationLog: [
      {
        sender: "Customer",
        content: "The Polki necklace stones aren't firmly placed.",
        timestamp: "2024-12-02 10:00 AM",
      },
      {
        sender: "Seller",
        content: "Please share hallmark and QA docs, and a clear photo of the loose stones.",
        timestamp: "2024-12-02 11:30 AM",
      },
      {
        sender: "Customer",
        content: "Uploaded requested documents and photos.",
        timestamp: "2024-12-02 12:45 PM",
      },
    ],
    activityLog: [
      {
        timestamp: "2024-12-02 09:50 AM",
        description: "Return request initiated by customer.",
      },
      {
        timestamp: "2024-12-02 10:30 AM",
        description: "Seller requested more details and certifications.",
      },
      {
        timestamp: "2024-12-02 13:00 PM",
        description: "Documents under review by quality team.",
      },
    ],
    pendingTasks: [
      "Verify hallmark certification with internal database.",
      "Check if replacement can be issued from current inventory.",
      "Prepare return label once approved.",
    ],
    pickupDetails: {
      date: "2024-12-06",
      location: "10, Linking Road, Mumbai, Maharashtra, 400050, India",
      carrier: "Ecom Express",
    },
  },
];

export default returnData;
