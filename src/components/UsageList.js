import React from 'react';

const UsageList = ({ usageRecords, onEdit, onDelete, loading }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading usage records...</div>;
  }

  if (!usageRecords || usageRecords.length === 0) {
    return (
      <div className="table-container">
        <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          No usage records found. Create your first record above.
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>kWh Used</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usageRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.customer_id}</td>
              <td>{record.kwh_used}</td>
              <td>{formatDate(record.timestamp)}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-success"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(record.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsageList;