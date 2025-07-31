import React from 'react';
import './styles/Table.css';

const Table = ({ columns, data, title, actions }) => { // <--- agrega actions aquí
  return (
    <div className="table-container">
      <div className="table-title">{title}</div>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((col, colIndex) => {
                let value;
                if (typeof col.accessor === 'function') {
                  value = col.accessor(row, actions); // <--- usa actions aquí
                } else {
                  value = row[col.accessor];
                }
                return <td key={colIndex}>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;