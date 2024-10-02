import React from 'react';

export default function TablesProjectRow({ name, age, phoneNumber, email, city, pinCode, shopName }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </td>
      <td className="px-6 py-4">
        {age}
      </td>
      <td className="px-6 py-4">
        {phoneNumber}
      </td>
      <td className="px-6 py-4">
        {email}
      </td>
      <td className="px-6 py-4">
        {city}
      </td>
      <td className="px-6 py-4">
        {pinCode}
      </td>
      <td className="px-6 py-4">
        {shopName}
      </td>
    </tr>
  );
}