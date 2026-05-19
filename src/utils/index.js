// src/pages/ProductListPage.jsx (Version A)
import React from 'react';

export const ProductListPage = ({ products = [], onOpenAddModal }) => {
  return (
    <div className="content-view-panel">
      <div className="panel-header">
        <h2>Active Stocks Records</h2>
        <button onClick={onOpenAddModal}>Create New Stock Entry</button>
      </div>

      <table className="data-table-grid">
        <thead>
          <tr><th>SKU ID</th><th>Product Details Name</th><th>Base Cost</th></tr>
        </thead>
        <tbody>
          {products.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};