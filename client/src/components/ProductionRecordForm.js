import React, { useState, useEffect } from 'react';

function ProductionRecordForm({ record, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    tarih: '',
    vardiyaNo: '',
    hatNo: '',
    tezgahNo: '',
    operatorId: '',
    bolumSorumlusuId: '',
    urunKodu: '',
    yapilanIslem: '',
    uretimAdedi: '',
    dokumHatasi: 0,
    operatorHatasi: 0,
    islemHatasi: 0,
    tezgahArizasi: 0,
    tezgahAyari: 0,
    elmasDegisimi: 0,
    parcaBekleme: 0,
    temizlik: 0,
    isBaslangic: '',
    isBitis: '',
    molaVar: 0
  });

  useEffect(() => {
    if (record) {
      setFormData({
        tarih: record.tarih || '',
        vardiyaNo: record.vardiyaNo || '',
        hatNo: record.hatNo || '',
        tezgahNo: record.tezgahNo || '',
        operatorId: record.operatorId || '',
        bolumSorumlusuId: record.bolumSorumlusuId || '',
        urunKodu: record.urunKodu || '',
        yapilanIslem: record.yapilanIslem || '',
        uretimAdedi: record.uretimAdedi || '',
        dokumHatasi: record.dokumHatasi || 0,
        operatorHatasi: record.operatorHatasi || 0,
        islemHatasi: record.islemHatasi || 0,
        tezgahArizasi: record.tezgahArizasi || 0,
        tezgahAyari: record.tezgahAyari || 0,
        elmasDegisimi: record.elmasDegisimi || 0,
        parcaBekleme: record.parcaBekleme || 0,
        temizlik: record.temizlik || 0,
        isBaslangic: record.isBaslangic || '',
        isBitis: record.isBitis || '',
        molaVar: record.molaVar || 0
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Tarih *</label>
          <input
            type="date"
            className="form-control"
            name="tarih"
            value={formData.tarih}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Vardiya No</label>
          <input
            type="text"
            className="form-control"
            name="vardiyaNo"
            value={formData.vardiyaNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Hat No</label>
          <input
            type="text"
            className="form-control"
            name="hatNo"
            value={formData.hatNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tezgah No</label>
          <input
            type="text"
            className="form-control"
            name="tezgahNo"
            value={formData.tezgahNo}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Operatör ID</label>
          <input
            type="text"
            className="form-control"
            name="operatorId"
            value={formData.operatorId}
            onChange={handleChange}
            placeholder="UUID"
          />
        </div>

        <div className="form-group">
          <label>Bölüm Sorumlusu ID</label>
          <input
            type="text"
            className="form-control"
            name="bolumSorumlusuId"
            value={formData.bolumSorumlusuId}
            onChange={handleChange}
            placeholder="UUID"
          />
        </div>

        <div className="form-group">
          <label>Ürün Kodu</label>
          <input
            type="text"
            className="form-control"
            name="urunKodu"
            value={formData.urunKodu}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Üretim Adedi</label>
          <input
            type="number"
            className="form-control"
            name="uretimAdedi"
            value={formData.uretimAdedi}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Yapılan İşlem</label>
        <input
          type="text"
          className="form-control"
          name="yapilanIslem"
          value={formData.yapilanIslem}
          onChange={handleChange}
        />
      </div>

      <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>Hatalar ve Duruşlar (Adet/Dakika)</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Döküm Hatası</label>
          <input
            type="number"
            className="form-control"
            name="dokumHatasi"
            value={formData.dokumHatasi}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Operatör Hatası</label>
          <input
            type="number"
            className="form-control"
            name="operatorHatasi"
            value={formData.operatorHatasi}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>İşlem Hatası</label>
          <input
            type="number"
            className="form-control"
            name="islemHatasi"
            value={formData.islemHatasi}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Tezgah Arızası (dk)</label>
          <input
            type="number"
            className="form-control"
            name="tezgahArizasi"
            value={formData.tezgahArizasi}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Tezgah Ayarı (dk)</label>
          <input
            type="number"
            className="form-control"
            name="tezgahAyari"
            value={formData.tezgahAyari}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Elmas Değişimi (dk)</label>
          <input
            type="number"
            className="form-control"
            name="elmasDegisimi"
            value={formData.elmasDegisimi}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Parça Bekleme (dk)</label>
          <input
            type="number"
            className="form-control"
            name="parcaBekleme"
            value={formData.parcaBekleme}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Temizlik (dk)</label>
          <input
            type="number"
            className="form-control"
            name="temizlik"
            value={formData.temizlik}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>Çalışma Saatleri</h3>
      <div className="form-row">
        <div className="form-group">
          <label>İş Başlangıç</label>
          <input
            type="time"
            className="form-control"
            name="isBaslangic"
            value={formData.isBaslangic}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>İş Bitiş</label>
          <input
            type="time"
            className="form-control"
            name="isBitis"
            value={formData.isBitis}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mola (Dakika)</label>
          <input
            type="number"
            className="form-control"
            name="molaVar"
            value={formData.molaVar}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <div className="actions" style={{ marginTop: '20px' }}>
        <button type="submit" className="btn btn-primary">
          {record ? 'Güncelle' : 'Kaydet'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          İptal
        </button>
      </div>
    </form>
  );
}

export default ProductionRecordForm;
