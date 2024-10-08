// File: src/data/sessionsData.js

const sessions = [
    {
      id: 1,
      deviceName: 'Macbook Pro',
      ipAddress: '192.168.1.2',
      location: 'New York, USA',
      browser: 'Chrome',
      lastActive: '2023-10-09 14:23:00',
      current: true,
    },
    {
      id: 2,
      deviceName: 'iPhone 12',
      ipAddress: '192.168.1.10',
      location: 'New York, USA',
      browser: 'Safari',
      lastActive: '2023-10-08 09:15:00',
      current: false,
    },
    {
      id: 3,
      deviceName: 'Windows Laptop',
      ipAddress: '192.168.1.20',
      location: 'Los Angeles, USA',
      browser: 'Firefox',
      lastActive: '2023-10-07 18:45:00',
      current: false,
    },
    // Add more sessions as needed
  ];
  
  export default sessions;
  