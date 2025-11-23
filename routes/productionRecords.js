const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const supabase = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Get all production records with filters
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 50, 
      tarih, 
      urunKodu, 
      operator,
      hatNo,
      tezgahNo,
      sortBy = 'tarih',
      sortOrder = 'desc'
    } = req.query;

    const offset = (page - 1) * limit;

    let query = supabase
      .from('production_records')
      .select(`
        *,
        operator:users!operator_id(id, username, full_name),
        bolum_sorumlusu:users!bolum_sorumlusu_id(id, username, full_name),
        creator:users!created_by(id, username, full_name)
      `, { count: 'exact' });

    // Apply filters
    if (tarih) query = query.eq('tarih', tarih);
    if (urunKodu) query = query.ilike('urun_kodu', `%${urunKodu}%`);
    if (operator) query = query.eq('operator_id', operator);
    if (hatNo) query = query.eq('hat_no', hatNo);
    if (tezgahNo) query = query.eq('tezgah_no', tezgahNo);

    const { data, error, count } = await query
      .order(sortBy, { ascending: sortOrder.toLowerCase() === 'asc' })
      .range(offset, offset + parseInt(limit) - 1);

    if (error) throw error;

    res.json({
      records: data.map(record => ({
        id: record.id,
        tarih: record.tarih,
        vardiyaNo: record.vardiya_no,
        hatNo: record.hat_no,
        tezgahNo: record.tezgah_no,
        operatorId: record.operator_id,
        operator: record.operator,
        bolumSorumlusuId: record.bolum_sorumlusu_id,
        bolumSorumlusu: record.bolum_sorumlusu,
        urunKodu: record.urun_kodu,
        yapilanIslem: record.yapilan_islem,
        uretimAdedi: record.uretim_adedi,
        dokumHatasi: record.dokum_hatasi,
        operatorHatasi: record.operator_hatasi,
        islemHatasi: record.islem_hatasi,
        tezgahArizasi: record.tezgah_arizasi,
        tezgahAyari: record.tezgah_ayari,
        elmasDegisimi: record.elmas_degisimi,
        parcaBekleme: record.parca_bekleme,
        temizlik: record.temizlik,
        isBaslangic: record.is_baslangic,
        isBitis: record.is_bitis,
        molaVar: record.mola_var,
        createdBy: record.created_by,
        creator: record.creator,
        createdAt: record.created_at,
        updatedAt: record.updated_at
      })),
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single production record by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('production_records')
      .select(`
        *,
        operator:users!operator_id(id, username, full_name),
        bolum_sorumlusu:users!bolum_sorumlusu_id(id, username, full_name),
        creator:users!created_by(id, username, full_name)
      `)
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Production record not found' });
    }

    res.json({
      id: data.id,
      tarih: data.tarih,
      vardiyaNo: data.vardiya_no,
      hatNo: data.hat_no,
      tezgahNo: data.tezgah_no,
      operatorId: data.operator_id,
      operator: data.operator,
      bolumSorumlusuId: data.bolum_sorumlusu_id,
      bolumSorumlusu: data.bolum_sorumlusu,
      urunKodu: data.urun_kodu,
      yapilanIslem: data.yapilan_islem,
      uretimAdedi: data.uretim_adedi,
      dokumHatasi: data.dokum_hatasi,
      operatorHatasi: data.operator_hatasi,
      islemHatasi: data.islem_hatasi,
      tezgahArizasi: data.tezgah_arizasi,
      tezgahAyari: data.tezgah_ayari,
      elmasDegisimi: data.elmas_degisimi,
      parcaBekleme: data.parca_bekleme,
      temizlik: data.temizlik,
      isBaslangic: data.is_baslangic,
      isBitis: data.is_bitis,
      molaVar: data.mola_var,
      createdBy: data.created_by,
      creator: data.creator,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new production record
router.post('/',
  authMiddleware,
  [
    body('tarih').notEmpty().withMessage('Tarih is required'),
    body('uretimAdedi').optional().isInt({ min: 0 }).withMessage('Üretim adedi must be a positive number')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const recordData = {
        tarih: req.body.tarih,
        vardiya_no: req.body.vardiyaNo,
        hat_no: req.body.hatNo,
        tezgah_no: req.body.tezgahNo,
        operator_id: req.body.operatorId,
        bolum_sorumlusu_id: req.body.bolumSorumlusuId,
        urun_kodu: req.body.urunKodu,
        yapilan_islem: req.body.yapilanIslem,
        uretim_adedi: req.body.uretimAdedi,
        dokum_hatasi: req.body.dokumHatasi || 0,
        operator_hatasi: req.body.operatorHatasi || 0,
        islem_hatasi: req.body.islemHatasi || 0,
        tezgah_arizasi: req.body.tezgahArizasi || 0,
        tezgah_ayari: req.body.tezgahAyari || 0,
        elmas_degisimi: req.body.elmasDegisimi || 0,
        parca_bekleme: req.body.parcaBekleme || 0,
        temizlik: req.body.temizlik || 0,
        is_baslangic: req.body.isBaslangic,
        is_bitis: req.body.isBitis,
        mola_var: req.body.molaVar || 0,
        created_by: req.userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('production_records')
        .insert([recordData])
        .select(`
          *,
          creator:users!created_by(id, username, full_name)
        `)
        .single();

      if (error) throw error;

      res.status(201).json({
        message: 'Production record created successfully',
        record: {
          id: data.id,
          tarih: data.tarih,
          vardiyaNo: data.vardiya_no,
          hatNo: data.hat_no,
          tezgahNo: data.tezgah_no,
          operator: data.operator,
          bolumSorumlusu: data.bolum_sorumlusu,
          urunKodu: data.urun_kodu,
          yapilanIslem: data.yapilan_islem,
          uretimAdedi: data.uretim_adedi,
          dokumHatasi: data.dokum_hatasi,
          operatorHatasi: data.operator_hatasi,
          tezgahArizasi: data.tezgah_arizasi,
          tezgahAyari: data.tezgah_ayari,
          elmasDegisimi: data.elmas_degisimi,
          parcaBekleme: data.parca_bekleme,
          temizlik: data.temizlik,
          isBaslangic: data.is_baslangic,
          isBitis: data.is_bitis,
          molaVarYok: data.mola_var_yok,
          createdBy: data.created_by,
          creator: data.creator,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// Update production record
router.put('/:id',
  authMiddleware,
  [
    body('uretimAdedi').optional().isInt({ min: 0 }).withMessage('Üretim adedi must be a positive number')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updateData = {
        tarih: req.body.tarih,
        vardiya_no: req.body.vardiyaNo,
        hat_no: req.body.hatNo,
        tezgah_no: req.body.tezgahNo,
        operator_id: req.body.operatorId,
        bolum_sorumlusu_id: req.body.bolumSorumlusuId,
        urun_kodu: req.body.urunKodu,
        yapilan_islem: req.body.yapilanIslem,
        uretim_adedi: req.body.uretimAdedi,
        dokum_hatasi: req.body.dokumHatasi,
        operator_hatasi: req.body.operatorHatasi,
        islem_hatasi: req.body.islemHatasi,
        tezgah_arizasi: req.body.tezgahArizasi,
        tezgah_ayari: req.body.tezgahAyari,
        elmas_degisimi: req.body.elmasDegisimi,
        parca_bekleme: req.body.parcaBekleme,
        temizlik: req.body.temizlik,
        is_baslangic: req.body.isBaslangic,
        is_bitis: req.body.isBitis,
        mola_var: req.body.molaVar,
        updated_at: new Date().toISOString()
      };

      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );

      const { data, error } = await supabase
        .from('production_records')
        .update(updateData)
        .eq('id', req.params.id)
        .select(`
          *,
          creator:users!created_by(id, username, full_name)
        `)
        .single();

      if (error || !data) {
        return res.status(404).json({ message: 'Production record not found' });
      }

      res.json({
        message: 'Production record updated successfully',
        record: {
          id: data.id,
          tarih: data.tarih,
          vardiyaNo: data.vardiya_no,
          hatNo: data.hat_no,
          tezgahNo: data.tezgah_no,
          operator: data.operator,
          bolumSorumlusu: data.bolum_sorumlusu,
          urunKodu: data.urun_kodu,
          yapilanIslem: data.yapilan_islem,
          uretimAdedi: data.uretim_adedi,
          dokumHatasi: data.dokum_hatasi,
          operatorHatasi: data.operator_hatasi,
          tezgahArizasi: data.tezgah_arizasi,
          tezgahAyari: data.tezgah_ayari,
          elmasDegisimi: data.elmas_degisimi,
          parcaBekleme: data.parca_bekleme,
          temizlik: data.temizlik,
          isBaslangic: data.is_baslangic,
          isBitis: data.is_bitis,
          molaVarYok: data.mola_var_yok,
          createdBy: data.created_by,
          creator: data.creator,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// Delete production record
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { error } = await supabase
      .from('production_records')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      return res.status(404).json({ message: 'Production record not found' });
    }

    res.json({ message: 'Production record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
