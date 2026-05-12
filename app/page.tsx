type ProductRow = {
  id: string
  sku: string
  brand: string | null
  category: string | null
  name: string
  description: string | null
  units_per_box: number | null
  image_url: string | null
  product_prices: { unit_price: number; price_list_name: string }[]
}

const fallbackProducts: ProductRow[] = [
  { id: '1', sku: '12817', brand: 'Crystal Rock', category: 'Hogar', name: 'Abrelatas Crystal Rock Uña 10 cm', description: 'ABRELATAS CRYSTAL ROCK UÑA X 10 CM.', units_per_box: 360, image_url: null, product_prices: [{ unit_price: 1683.79, price_list_name: 'lista_lb_sgo_11_05_26' }] },
  { id: '2', sku: '25', brand: 'Algabo', category: 'Cuidado personal', name: 'Acondicionador Algabo Baby Cab Clar Manz 444 ml', description: 'AC. ALGABO BABY CAB CLAR. MANZ. 444 ML.', units_per_box: 12, image_url: null, product_prices: [{ unit_price: 3676.36, price_list_name: 'lista_lb_sgo_11_05_26' }] },
  { id: '3', sku: '12643', brand: 'Dove', category: 'Cuidado personal', name: 'Acondicionador Dove Bond Intense Repair 250 ml', description: 'AC. DOVE BOND INTENSE REPAIR X 250 ML.', units_per_box: 12, image_url: null, product_prices: [{ unit_price: 5865.18, price_list_name: 'lista_lb_sgo_11_05_26' }] },
  { id: '4', sku: '310', brand: 'Alsamar', category: 'Almacén', name: 'Aceite Alsamar 5 lts', description: 'ACEITE ALSAMAR X 5 LTS.', units_per_box: 4, image_url: null, product_prices: [{ unit_price: 18058.89, price_list_name: 'lista_lb_sgo_11_05_26' }] },
  { id: '5', sku: '461', brand: 'Baggio', category: 'Bebidas', name: 'Agua de Mesa Baggio Fresh 1.5 lts', description: 'AGUA DE MESA BAGGIO FRESH X 1.5 LTS', units_per_box: 6, image_url: null, product_prices: [{ unit_price: 779.66, price_list_name: 'lista_lb_sgo_11_05_26' }] },
  { id: '6', sku: '11377', brand: 'Danke', category: 'Mascotas', name: 'Alimento para Gato Danke 10 kg', description: 'ALIMENTO PARA GATO DANKE X 10 KG.', units_per_box: 1, image_url: null, product_prices: [{ unit_price: 15797.04, price_list_name: 'lista_lb_sgo_11_05_26' }] },
]

export default async function Home() {
  const products = fallbackProducts
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean))) as string[]

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">Catálogo digital</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Catálogos Mily</h1>
            <p className="mt-4 text-lg text-neutral-600">Catálogo público de productos para vendedores. Buscá por nombre, marca o categoría y consultá precios por unidad.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-4 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="search" className="mb-2 block text-sm font-medium text-neutral-700">Buscar</label>
            <input id="search" placeholder="Ej: Dove, aceite, arroz..." className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900" />
          </div>
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-neutral-700">Categoría</label>
            <select id="category" className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900">
              <option value="">Todas</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => <span key={category} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm text-neutral-700">{category}</span>)}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const price = product.product_prices?.[0]?.unit_price
            return (
              <article key={product.id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="flex aspect-[4/3] items-center justify-center bg-neutral-100"><div className="px-4 text-center text-sm text-neutral-400">Imagen pendiente</div></div>
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-wide text-neutral-500">{product.brand || 'Sin marca'}</p><h2 className="line-clamp-2 text-base font-semibold">{product.name}</h2></div><span className="rounded-lg bg-neutral-900 px-2 py-1 text-xs text-white">SKU {product.sku}</span></div>
                  <p className="line-clamp-2 text-sm text-neutral-600">{product.description || 'Sin descripción'}</p>
                  <div className="mt-4 flex items-center justify-between"><div><p className="text-xs text-neutral-500">Caja</p><p className="text-sm font-medium">{product.units_per_box ?? '-'} unidades</p></div><div className="text-right"><p className="text-xs text-neutral-500">Precio unitario</p><p className="text-lg font-bold">{price ? `$ ${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : 'Consultar'}</p></div></div>
                  <div className="mt-4 flex items-center justify-between border-t pt-4"><span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">{product.category || 'Sin categoría'}</span><button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white">Ver producto</button></div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}