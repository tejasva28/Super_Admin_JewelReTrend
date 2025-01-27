const returnRequestsData = [
    {
      returnId: "RR-0001",
      status: "Pending",
      orderId: "ORD-1001",
      orderDate: "2024-08-15T09:00:00Z",
      orderTotal: 199.99,
      shippingAddress: "123 Market Street, Springfield, USA",
      paymentMethod: "Credit Card (MasterCard)",
      customerName: "Alice Brown",
      customerId: "CUST-101",
      customerEmail: "alice.brown@example.com",
      customerPhone: "+1 (555) 111-2222",
      customerRating: "Gold Member",
      products: [
        {
          name: "Bluetooth Headphones",
          image: "https://via.placeholder.com/80?text=Headphones",
          sku: "BTH-123",
          quantity: 1,
          price: 99.99,
          condition: "New",
        },
        {
          name: "Portable Charger",
          image: "https://via.placeholder.com/80?text=Charger",
          sku: "CHG-456",
          quantity: 1,
          price: 50.00,
          condition: "New",
        },
      ],
      returnReason: {
        primary: "Defective Item",
        additional: "The headphones have a static noise in the left earcup.",
      },
      returnMethod: {
        chosen: "Carrier Pickup",
        preferredShipping: "UPS Ground",
      },
      supportingDocuments: {
        photos: [
          { url: "https://via.placeholder.com/200?text=Headphone+Issue" },
        ],
        attachments: [
          { name: "Purchase_Receipt.pdf" },
        ],
      },
      communicationLog: [
        {
          sender: "Customer",
          content: "The headphones are making a weird noise.",
          timestamp: "2024-08-16 10:00 AM",
        },
        {
          sender: "Seller",
          content: "Can you upload a photo or video?",
          timestamp: "2024-08-16 10:30 AM",
        },
      ],
      activityLog: [
        {
          timestamp: "2024-08-16 09:50 AM",
          description: "Customer initiated return request.",
        },
        {
          timestamp: "2024-08-16 10:35 AM",
          description: "Seller requested more information.",
        },
      ],
      pendingTasks: [
        "Review the uploaded photo.",
        "Check inventory for a replacement unit.",
      ],
      pickupDetails: {
        date: "2024-08-20",
        location: "123 Market Street, Springfield, USA",
        carrier: "UPS",
      },
    },
    {
      returnId: "RR-0002",
      status: "Approved",
      orderId: "ORD-1002",
      orderDate: "2024-07-10T10:30:00Z",
      orderTotal: 299.00,
      shippingAddress: "456 Elm St, Metropolis, USA",
      paymentMethod: "PayPal",
      customerName: "John Smith",
      customerId: "CUST-202",
      customerEmail: "john.smith@example.com",
      customerPhone: "+1 (555) 333-4444",
      products: [
        {
          name: "Smart Home Speaker",
          image: "https://via.placeholder.com/80?text=Speaker",
          sku: "SMT-SPK-001",
          quantity: 1,
          price: 299.00,
          condition: "New",
        },
      ],
      returnReason: {
        primary: "Not as Described",
        additional: "The speaker's voice assistant does not support the promised languages.",
      },
      returnMethod: {
        chosen: "Ship Back via Prepaid Label",
        preferredShipping: "FedEx Express",
      },
      supportingDocuments: {
        photos: [],
        attachments: [
          { name: "Original_Invoice.pdf" },
        ],
      },
      communicationLog: [
        {
          sender: "Customer",
          content: "The product doesn't have the advertised features.",
          timestamp: "2024-07-11 09:00 AM",
        },
        {
          sender: "Seller",
          content: "We apologize. We'll approve your return and provide a prepaid label.",
          timestamp: "2024-07-11 10:00 AM",
        },
      ],
      activityLog: [
        {
          timestamp: "2024-07-11 08:55 AM",
          description: "Return requested by customer.",
        },
        {
          timestamp: "2024-07-11 10:05 AM",
          description: "Return approved by seller.",
        },
      ],
      pendingTasks: [],
      pickupDetails: {
        date: "2024-07-15",
        location: "456 Elm St, Metropolis, USA",
        carrier: "FedEx",
      },
    },
    {
      returnId: "RR-0003",
      status: "Rejected",
      orderId: "ORD-1003",
      orderDate: "2024-09-05T14:00:00Z",
      orderTotal: 150.00,
      shippingAddress: "789 Maple Ave, Gotham, USA",
      paymentMethod: "Credit Card (Visa)",
      customerName: "Sarah Lee",
      customerId: "CUST-303",
      customerEmail: "sarah.lee@example.com",
      customerPhone: "+1 (555) 555-6666",
      products: [
        {
          name: "Fitness Tracker",
          image: "https://via.placeholder.com/80?text=Fitness+Tracker",
          sku: "FIT-TRK-888",
          quantity: 1,
          price: 150.00,
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
          content: "I decided I don't want this after all.",
          timestamp: "2024-09-06 10:30 AM",
        },
        {
          sender: "Seller",
          content: "Return rejected as per our policy (no refunds for change of mind).",
          timestamp: "2024-09-06 11:00 AM",
        },
      ],
      activityLog: [
        {
          timestamp: "2024-09-06 10:25 AM",
          description: "Customer initiated return request.",
        },
        {
          timestamp: "2024-09-06 11:05 AM",
          description: "Return request rejected.",
        },
      ],
      pendingTasks: [],
      // No pickup details since it's rejected
    },
    {
      returnId: "RR-0004",
      status: "Pending",
      orderId: "ORD-1004",
      orderDate: "2024-10-01T11:45:00Z",
      orderTotal: 499.99,
      shippingAddress: "321 Pine St, Star City, USA",
      paymentMethod: "AMEX",
      customerName: "Peter Parker",
      customerId: "CUST-404",
      customerEmail: "peter.parker@example.com",
      customerPhone: "+1 (555) 777-8888",
      customerRating: "Silver Member",
      products: [
        {
          name: "Noise-Canceling Headphones",
          image: "https://via.placeholder.com/80?text=Noise-Canceling+HP",
          sku: "NCH-777",
          quantity: 1,
          price: 299.99,
          condition: "New",
        },
        {
          name: "Wireless Keyboard",
          image: "https://via.placeholder.com/80?text=Keyboard",
          sku: "KB-123",
          quantity: 1,
          price: 200.00,
          condition: "Used",
        },
      ],
      returnReason: {
        primary: "Multiple Items Defective",
        additional: "Headphones produce static. The keyboard keys are not responsive.",
      },
      returnMethod: {
        chosen: "Carrier Pickup",
        preferredShipping: "DHL Express",
      },
      supportingDocuments: {
        photos: [
          { url: "https://via.placeholder.com/200?text=Headphone+Issue" },
          { url: "https://via.placeholder.com/200?text=Keyboard+Issue" },
        ],
        attachments: [
          { name: "Original_Receipt.pdf" },
          { name: "Extended_Warranty.pdf" },
        ],
      },
      communicationLog: [
        {
          sender: "Customer",
          content: "Both items seem faulty.",
          timestamp: "2024-10-02 09:00 AM",
        },
        {
          sender: "Seller",
          content: "Please provide photos and a copy of your warranty.",
          timestamp: "2024-10-02 09:30 AM",
        },
        {
          sender: "Customer",
          content: "Documents and photos uploaded.",
          timestamp: "2024-10-02 10:00 AM",
        },
      ],
      activityLog: [
        {
          timestamp: "2024-10-02 08:50 AM",
          description: "Customer initiated return request.",
        },
        {
          timestamp: "2024-10-02 09:35 AM",
          description: "Seller requested more details.",
        },
        {
          timestamp: "2024-10-02 10:05 AM",
          description: "Documents under review by QC team.",
        },
      ],
      pendingTasks: [
        "Verify defective claims with QC team.",
        "Check inventory for potential replacements.",
      ],
      pickupDetails: {
        date: "2024-10-06",
        location: "321 Pine St, Star City, USA",
        carrier: "DHL",
      },
    },
  ];

export default returnRequestsData; // Export the returnRequests array
