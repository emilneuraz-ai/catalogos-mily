import { createClient } from '@supabase/supabase-js'

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

async function getProducts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('products')
    .select(`id, sku, brand, category, name, description, units_per_box, image_url, product_prices(unit_price, price_list_name)`)
    .eq('active', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error(error)
    return [] as ProductRow[]
  }

  return (data ?? []) as ProductRow[]
}

export default async function Home() {
  const products = await getProducts()
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean))) as string[]

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
              Catálogo digital
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Catálogos Mily</h1>
            <p className="mt-4 text-lg text-neutral-600">
              Catálogo público de productos para vendedores. Buscá por nombre, marca o categoría y consultá precios por unidad.
            </p>
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
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm text-neutral-700">
              {category}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const price = product.product_prices?.[0]?.unit_price
            return (
              <article key={product.id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="flex aspect-[4/3] items-center justify-center bg-neutral-100">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="px-4 text-center text-sm text-neutral-400">Imagen pendiente</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-neutral-500">{product.brand || 'Sin marca'}</p>
                      <h2 className="line-clamp-2 text-base font-semibold">{product.name}</h2>
                    </div>
                    <span className="rounded-lg bg-neutral-900 px-2 py-1 text-xs text-white">SKU {product.sku}</span>
                  </div>
                  <p className="line-clamp-2 text-sm text-neutral-600">{product.description || 'Sin descripción'}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">Caja</p>
                      <p className="text-sm font-medium">{product.units_per_box ?? '-'} unidades</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-500">Precio unitario</p>
                      <p className="text-lg font-bold">{price ? `$ ${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : 'Consultar'}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">{product.category || 'Sin categoría'}</span>
                    <button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white">Ver producto</button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}