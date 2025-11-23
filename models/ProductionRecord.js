const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ProductionRecord = sequelize.define('ProductionRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tarih: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'Tarih'
  },
  vardiyaNo: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'vardiya_no',
    comment: 'Vardiya No'
  },
  hatNo: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'hat_no',
    comment: 'Hat No'
  },
  tezgahNo: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'tezgah_no',
    comment: 'Tezgah No'
  },
  operator: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Operatör'
  },
  bolumSorumlusu: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'bolum_sorumlusu',
    comment: 'Bölüm Sorumlusu'
  },
  urunKodu: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'urun_kodu',
    comment: 'Ürün Kodu'
  },
  yapilanIslem: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'yapilan_islem',
    comment: 'Yapılan İşlem'
  },
  uretimAdedi: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'uretim_adedi',
    comment: 'Üretim Adedi'
  },
  dokumHatasi: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'dokum_hatasi',
    comment: 'Döküm Hatası'
  },
  operatorHatasi: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'operator_hatasi',
    comment: 'Operatör Hatası'
  },
  tezgahArizasi: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'tezgah_arizasi',
    comment: 'Tezgah Arızası (dakika)'
  },
  tezgahAyari: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'tezgah_ayari',
    comment: 'Tezgah Ayarı (dakika)'
  },
  elmasDegisimi: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'elmas_degisimi',
    comment: 'Elmas Değişimi (dakika)'
  },
  parcaBekleme: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'parca_bekleme',
    comment: 'Parça Bekleme (dakika)'
  },
  temizlik: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'temizlik',
    comment: 'Temizlik (dakika)'
  },
  isBaslangic: {
    type: DataTypes.TIME,
    allowNull: true,
    field: 'is_baslangic',
    comment: 'İş Başlangıç'
  },
  isBitis: {
    type: DataTypes.TIME,
    allowNull: true,
    field: 'is_bitis',
    comment: 'İş Bitiş'
  },
  molaVarYok: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'mola_var_yok',
    comment: 'Mola Var/Yok'
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'created_by',
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'production_records',
  timestamps: true
});

// Association
ProductionRecord.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

module.exports = ProductionRecord;
