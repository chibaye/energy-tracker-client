import React, { useState, useEffect } from 'react';
import UsageForm from './components/UsageForm';
import UsageList from './components/UsageList';
import apiService from './services/api';

function App() {
  const [usageRecords, setUsageRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadUsageRecords();
  }, []);

  const loadUsageRecords = async () => {
    try {
      setLoading(true);
      const records = await apiService.getAllUsage();
      setUsageRecords(records || []);
    } catch (error) {
      showMessage('Failed to load usage records', 'error');
      console.error('Error loading records:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleCreateRecord = async (data) => {
    try {
      await apiService.createUsage(data);
      showMessage('Usage record created successfully!', 'success');
      loadUsageRecords();
    } catch (error) {
      showMessage('Failed to create usage record', 'error');
      console.error('Error creating record:', error);
    }
  };

  const handleUpdateRecord = async (data) => {
    try {
      await apiService.updateUsage(editingRecord.id, data);
      showMessage('Usage record updated successfully!', 'success');
      setEditingRecord(null);
      loadUsageRecords();
    } catch (error) {
      showMessage('Failed to update usage record', 'error');
      console.error('Error updating record:', error);
    }
  };

  const handleDeleteRecord = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await apiService.deleteUsage(id);
        showMessage('Usage record deleted successfully!', 'success');
        loadUsageRecords();
      } catch (error) {
        showMessage('Failed to delete usage record', 'error');
        console.error('Error deleting record:', error);
      }
    }
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  const handleFormSubmit = editingRecord ? handleUpdateRecord : handleCreateRecord;

  return (
    <div className="App">
      <div className="header">
        <div className="container">
          <h1>Energy Usage Management System</h1>
        </div>
      </div>

      <div className="container">
        {message.text && (
          <div className={message.type === 'error' ? 'error' : 'success'}>
            {message.text}
          </div>
        )}

        <UsageForm
          onSubmit={handleFormSubmit}
          editingRecord={editingRecord}
          onCancel={handleCancelEdit}
        />

        <UsageList
          usageRecords={usageRecords}
          onEdit={handleEditRecord}
          onDelete={handleDeleteRecord}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;