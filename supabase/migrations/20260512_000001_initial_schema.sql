create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key,
  email text unique,
  full_name text,
  role text not null default 'seller' check (role in ('admin','seller')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  code text unique,
  name text not null,
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references public.vendors(id) on delete set null,
  name text not null,
  phone text,
  address text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  code text,
  brand text,
  category text,
  name text not null,
  description text,
  units_per_box integer,
  active boolean not null default true,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_prices (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  price_list_name text not null default 'default',
  unit_price numeric(12,2) not null,
  effective_from date not null default current_date,
  effective_to date,
  created_at timestamptz not null default now()
);

create table if not exists public.imports (
  id uuid primary key default gen_random_uuid(),
  source_name text not null,
  source_file text,
  imported_at timestamptz not null default now(),
  imported_by uuid,
  notes text
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references public.vendors(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','submitted','confirmed','cancelled')),
  total_amount numeric(12,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null,
  subtotal numeric(12,2) generated always as (quantity * unit_price) stored
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  source text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.vendors enable row level security;
alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.product_prices enable row level security;
alter table public.imports enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.product_images enable row level security;
