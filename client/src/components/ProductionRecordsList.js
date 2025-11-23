import React, { useState, useEffect } from 'react';
import { productionRecordsAPI } from '../services/api';
import ProductionRecordForm from './ProductionRecordForm';

function ProductionRecordsList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [filters, setFilters] = useState({
    tarih: '',
    urunKodu: '',
    operator: ''
  });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const response = await productionRecordsAPI.getAll(filters);
      setRecords(response.data.records);
      setError('');
    } catch (err) {
      setError('Kayıtlar yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await productionRecordsAPI.create(data);
      setSuccess('Kayıt başarıyla oluşturuldu');
      setShowModal(false);
      loadRecords();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Kayıt oluşturulurken hata oluştu');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await productionRecordsAPI.update(editingRecord.id, data);
      setSuccess('Kayıt başarıyla güncellendi');
      setShowModal(false);
      setEditingRecord(null);
      loadRecords();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Kayıt güncellenirken hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
      try {
        await productionRecordsAPI.delete(id);
        setSuccess('Kayıt başarıyla silindi');
        loadRecords();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Kayıt silinirken hata oluştu');
      }
    }
  };

  const openEditModal = (record) => {
    setEditingRecord(record);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingRecord(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRecord(null);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    loadRecords();
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Üretim Kayıtları</h2>
          <button onClick={openCreateModal} className="btn btn-success">
            + Yeni Kayıt
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <div className="form-row" style={{ marginBottom: '20px' }}>
          <div className="form-group">
            <label>Tarih</label>
            <input
              type="date"
              className="form-control"
              name="tarih"
              value={filters.tarih}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label>Ürün Kodu</label>
            <input
              type="text"
              className="form-control"
              name="urunKodu"
              value={filters.urunKodu}
              onChange={handleFilterChange}
              placeholder="Ara..."
            />
          </div>
          <div className="form-group">
            <label>Operatör</label>
            <input
              type="text"
              className="form-control"
              name="operator"
              value={filters.operator}
              onChange={handleFilterChange}
              placeholder="Ara..."
            />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button onClick={applyFilters} className="btn btn-primary">
              Filtrele
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Vardiya</th>
                <th>Hat No</th>
                <th>Tezgah No</th>
                <th>Operatör</th>
                <th>Ürün Kodu</th>
                <th>Üretim Adedi</th>
                <th>İş Saatleri</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>Kayıt bulunamadı</td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.tarih}</td>
                    <td>{record.vardiyaNo}</td>
                    <td>{record.hatNo}</td>
                    <td>{record.tezgahNo}</td>
                    <td>{record.operator?.full_name || record.operatorId}</td>
                    <td>{record.urunKodu}</td>
                    <td>{record.uretimAdedi}</td>
                    <td>
                      {record.isBaslangic && record.isBitis
                        ? `${record.isBaslangic} - ${record.isBitis}`
                        : '-'}
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          onClick={() => openEditModal(record)}
                          className="btn btn-primary"
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="btn btn-danger"
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingRecord ? 'Kayıt Düzenle' : 'Yeni Kayıt Oluştur'}</h2>
              <button onClick={closeModal} className="close-btn">×</button>
            </div>
            <ProductionRecordForm
              record={editingRecord}
              onSubmit={editingRecord ? handleUpdate : handleCreate}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductionRecordsList;
