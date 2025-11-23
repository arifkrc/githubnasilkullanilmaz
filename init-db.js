const db = require('./models');
const bcrypt = require('bcryptjs');

async function initDatabase() {
  try {
    // Sync database
    await db.sequelize.sync({ force: true }); // WARNING: This will drop all tables
    console.log('Database synced successfully');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await db.User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      fullName: 'System Administrator',
      role: 'admin'
    });

    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');

    // Create sample production record
    const user = await db.User.findOne({ where: { username: 'admin' } });
    await db.ProductionRecord.create({
      tarih: new Date(),
      vardiyaNo: '1',
      hatNo: 'HAT-01',
      tezgahNo: 'TZ-001',
      operator: 'Ahmet Yılmaz',
      bolumSorumlusu: 'Mehmet Kaya',
      urunKodu: 'URN-001',
      yapilanIslem: 'Kesme İşlemi',
      uretimAdedi: 100,
      dokumHatasi: 2,
      operatorHatasi: 1,
      tezgahArizasi: 15,
      tezgahAyari: 10,
      elmasDegisimi: 5,
      parcaBekleme: 20,
      temizlik: 10,
      isBaslangic: '08:00',
      isBitis: '16:00',
      molaVarYok: true,
      createdBy: user.id
    });

    console.log('Sample production record created successfully');
    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();
