import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogos Mily',
  description: 'Catálogo digital para vendedores con búsqueda, categorías y precios actualizados.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}