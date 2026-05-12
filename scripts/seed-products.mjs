import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const products = [
  { code: '12817', sku: '12817', brand: 'Crystal Rock', category: 'Hogar', name: 'Abrelatas Crystal Rock Uña 10 cm', description: 'Abrelatas Crystal Rock Uña x 10 cm', units_per_box: 360, price: 1683.79 },
  { code: '25', sku: '25', brand: 'Algabo', category: 'Cuidado personal', name: 'Acondicionador Algabo Baby Cab Clar Manz 444 ml', description: 'AC. ALGABO BABY CAB CLAR. MANZ. 444 ML.', units_per_box: 12, price: 3676.36 },
  { code: '26', sku: '26', brand: 'Algabo', category: 'Cuidado personal', name: 'Acondicionador Algabo Baby Extra Suave 444 ml', description: 'AC. ALGABO BABY EXTRA SUAVE 444 ML.', units_per_box: 12, price: 3676.36 },
  { code: '30', sku: '30', brand: 'Algabo', category: 'Cuidado personal', name: 'Acondicionador Algabo Coco y Leche 930 cc', description: 'AC. ALGABO COCO Y LECHE X 930 CC', units_per_box: 12, price: 2379.61 },
  { code: '37', sku: '37', brand: 'Algabo', category: 'Cuidado personal', name: 'Acondicionador Algabo Hidratación Eco Pack 930 ml', description: 'AC. ALGABO HIDRATACION ECO PACK X 930 ML', units_per_box: 12, price: 2272.66 },
  { code: '12632', sku: '12632', brand: 'Dove', category: 'Cuidado personal', name: 'Acondicionador Dove Baby Humectación 200 ml', description: 'AC. DOVE BABY HUMECTACION ENR. X 200 ML.', units_per_box: 12, price: 5369.53 },
  { code: '12643', sku: '12643', brand: 'Dove', category: 'Cuidado personal', name: 'Acondicionador Dove Bond Intense Repair 250 ml', description: 'AC. DOVE BOND INTENSE REPAIR X 250 ML.', units_per_box: 12, price: 5865.18 },
  { code: '170', sku: '170', brand: 'Plusbelle', category: 'Cuidado personal', name: 'Acondicionador Plusbelle Balance 1 lt', description: 'AC. PLUSBELLE BALANCE X 1 LT', units_per_box: 12, price: 2933.56 },
  { code: '208', sku: '208', brand: 'Sedal', category: 'Cuidado personal', name: 'Acondicionador Sedal Ácido Hialurónico 340 ml', description: 'AC. SEDAL ACIDO HIALURONICO X 340 ML', units_per_box: 12, price: 3852.23 },
  { code: '310', sku: '310', brand: 'Alsamar', category: 'Almacén', name: 'Aceite Alsamar 5 lts', description: 'ACEITE ALSAMAR X 5 LTS.', units_per_box: 4, price: 18058.89 },
  { code: '315', sku: '315', brand: 'Cañuelas', category: 'Almacén', name: 'Aceite Cañuelas 900 cc', description: 'ACEITE CAÑUELAS X 900 CC.', units_per_box: 12, price: 3351.93 },
  { code: '398', sku: '398', brand: 'Saiz', category: 'Almacén', name: 'Aceituna Saiz 120 grs', description: 'ACEITUNA SAIZ X 120 GRS.', units_per_box: 24, price: 1105.95 },
  { code: '461', sku: '461', brand: 'Baggio', category: 'Bebidas', name: 'Agua de Mesa Baggio Fresh 1.5 lts', description: 'AGUA DE MESA BAGGIO FRESH X 1.5 LTS', units_per_box: 6, price: 779.66 },
  { code: '481', sku: '481', brand: 'Sierra del Norte', category: 'Bebidas', name: 'Agua Mineral Sierra del Norte 1.5 lts', description: 'AGUA MINERAL SIERRA DEL NORTE X 1.5 LTS.', units_per_box: 6, price: 634.87 },
  { code: '561', sku: '561', brand: 'Porta', category: 'Limpieza', name: 'Alcohol Porta 70 500 cc', description: 'ALCOHOL PORTA 70 X 500 CC.', units_per_box: 12, price: 1518.56 },
  { code: '11377', sku: '11377', brand: 'Danke', category: 'Mascotas', name: 'Alimento para Gato Danke 10 kg', description: 'ALIMENTO PARA GATO DANKE X 10 KG.', units_per_box: 1, price: 15797.04 },
  { code: '12529', sku: '12529', brand: 'Pedigree', category: 'Mascotas', name: 'Alimento Pedigree Adulto Carne Sobre 100 grs', description: 'ALIMENTO PEDIGREE ADULTO CARNE SOBRE X 100 GRS.', units_per_box: 12, price: 1036.22 },
  { code: '12315', sku: '12315', brand: 'Obrero', category: 'Bebidas', name: 'Amargo Obrero 950 ml', description: 'AMARGO OBRERO X 950 ML.', units_per_box: 12, price: 4575.81 },
  { code: '12937', sku: '12937', brand: '53', category: 'Almacén', name: 'Arroz 53 0000 1 kg', description: 'ARROZ 53 0000 X 1 KG.', units_per_box: 10, price: 1016.53 },
  { code: '951', sku: '951', brand: 'Bahía', category: 'Almacén', name: 'Atún Bahía Desmenuzado Aceite 170 grs', description: 'ATUN BAHIA DESM. ACEITE X 170 GRS.', units_per_box: 48, price: 1254.82 }
]

async function run() {
  const now = new Date().toISOString().slice(0, 10)
  for (const p of products) {
    const { data: existing } = await supabase.from('products').select('id').eq('sku', p.sku).maybeSingle()
    let productId = existing?.id
    if (!productId) {
      const { data, error } = await supabase.from('products').insert({
        sku: p.sku,
        code: p.code,
        brand: p.brand,
        category: p.category,
        name: p.name,
        description: p.description,
        units_per_box: p.units_per_box,
        active: true,
      }).select('id').single()
      if (error) throw error
      productId = data.id
    }
    const { error: priceError } = await supabase.from('product_prices').upsert({
      product_id: productId,
      price_list_name: 'lista_lb_sgo_11_05_26',
      unit_price: p.price,
      effective_from: now,
    }, { onConflict: 'product_id,price_list_name,effective_from' })
    if (priceError && !String(priceError.message).includes('there is no unique')) throw priceError
  }
  console.log(`Seeded ${products.length} products`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})