-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'operator' CHECK (role IN ('admin', 'operator', 'supervisor')),
  amir_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create production_records table
CREATE TABLE IF NOT EXISTS production_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tarih DATE NOT NULL,
  vardiya_no VARCHAR(20),
  hat_no VARCHAR(20),
  tezgah_no VARCHAR(20),
  operator_id UUID REFERENCES users(id),
  bolum_sorumlusu_id UUID REFERENCES users(id),
  urun_kodu VARCHAR(50),
  yapilan_islem VARCHAR(255),
  uretim_adedi INTEGER,
  dokum_hatasi INTEGER DEFAULT 0,
  operator_hatasi INTEGER DEFAULT 0,
  islem_hatasi INTEGER DEFAULT 0,
  tezgah_arizasi INTEGER DEFAULT 0,
  tezgah_ayari INTEGER DEFAULT 0,
  elmas_degisimi INTEGER DEFAULT 0,
  parca_bekleme INTEGER DEFAULT 0,
  temizlik INTEGER DEFAULT 0,
  is_baslangic TIME,
  is_bitis TIME,
  mola_var INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_production_records_tarih ON production_records(tarih);
CREATE INDEX IF NOT EXISTS idx_production_records_urun_kodu ON production_records(urun_kodu);
CREATE INDEX IF NOT EXISTS idx_production_records_operator_id ON production_records(operator_id);
CREATE INDEX IF NOT EXISTS idx_production_records_created_by ON production_records(created_by);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_records ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can insert users" ON users
  FOR INSERT WITH CHECK (true);

-- Create policies for production_records table
CREATE POLICY "Anyone authenticated can read production records" ON production_records
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create production records" ON production_records
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update any production record" ON production_records
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete any production record" ON production_records
  FOR DELETE USING (true);
