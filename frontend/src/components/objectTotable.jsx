import React from 'react';

const ObjectToTable = ({ data }) => {
  if (!data) return null;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Field</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td className="border border-gray-300 px-4 py-2 font-medium">{key}</td>
              <td className="border border-gray-300 px-4 py-2">
                {Array.isArray(value)
                  ? value.join(', ')
                  : typeof value === 'object' && value !== null
                  ? JSON.stringify(value)
                  : value.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObjectToTable;
