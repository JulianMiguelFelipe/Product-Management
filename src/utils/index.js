// src/pages/DeletedItemsPage.jsx
import React from 'react';

export const DeletedItemsPage = ({ trashCatalogBin = [], onTriggerRestoration }) => {
  return (
    <div className="trash-view-workspace">
      <div className="workspace-callout-header">
        <h3>Soft-Deleted Database Repositories Log</h3>
        <p>Items flagged here are omitted from consumer routes but remain in storage units.</p>
      </div>

      {trashCatalogBin.length === 0 ? (
        <div className="empty-state-box-layout">
          <p>Trash directory index contains zero flagged parameters.</p>
        </div>
      ) : (
        <div className="purged-items-card-grid">
          {trashCatalogBin.map(record => (
            <div key={record.id} className="purged-record-card">
              <div className="record-metadata">
                <span className="item-label-sku">ID Reference: #{record.id}</span>
                <h4>{record.name}</h4>
                <p>Prior Ledger Costing: ${record.price}</p>
              </div>
              <button 
                onClick={() => onTriggerRestoration(record.id)}
                className="btn-recovery-trigger"
              >
                🔄 Recover Item to Stock
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};