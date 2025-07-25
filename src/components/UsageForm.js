import React, { useState, useEffect } from 'react';

const UsageForm = ({ onSubmit, editingRecord, onCancel }) => {
  const [formData, setFormData] = useState({
    customer_id: '',
    kwh_used: ''
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        customer_id: editingRecord.customer_id || '',
        kwh_used: editingRecord.kwh_used || ''
      });
    } else {
      setFormData({
        customer_id: '',
        kwh_used: ''
      });
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      customer_id: parseInt(formData.customer_id),
      kwh_used: parseFloat(formData.kwh_used)
    };

    onSubmit(submitData);
  };

  return (
    <div className="form-container">
      <h2>{editingRecord ? 'Edit Usage Record' : 'Add New Usage Record'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer_id">Customer ID:</label>
          <input
            type="number"
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
            placeholder="Enter customer ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="kwh_used">kWh Used:</label>
          <input
            type="number"
            step="0.01"
            id="kwh_used"
            name="kwh_used"
            value={formData.kwh_used}
            onChange={handleChange}
            required
            placeholder="Enter kWh used"
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            {editingRecord ? 'Update Record' : 'Create Record'}
          </button>
          {editingRecord && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UsageForm;