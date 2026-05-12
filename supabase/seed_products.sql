insert into public.products (sku, code, brand, category, name, description, units_per_box, active)
values
('12817','12817','Crystal Rock','Hogar','Abrelatas Crystal Rock Uña 10 cm','ABRELATAS CRYSTAL ROCK UÑA X 10 CM.',360,true),
('25','25','Algabo','Cuidado personal','Acondicionador Algabo Baby Cab Clar Manz 444 ml','AC. ALGABO BABY CAB CLAR. MANZ. 444 ML.',12,true),
('26','26','Algabo','Cuidado personal','Acondicionador Algabo Baby Extra Suave 444 ml','AC. ALGABO BABY EXTRA SUAVE 444 ML.',12,true),
('30','30','Algabo','Cuidado personal','Acondicionador Algabo Coco y Leche 930 cc','AC. ALGABO COCO Y LECHE X 930 CC',12,true),
('37','37','Algabo','Cuidado personal','Acondicionador Algabo Hidratación Eco Pack 930 ml','AC. ALGABO HIDRATACION ECO PACK X 930 ML',12,true),
('12632','12632','Dove','Cuidado personal','Acondicionador Dove Baby Humectación 200 ml','AC. DOVE BABY HUMECTACION ENR. X 200 ML.',12,true),
('12643','12643','Dove','Cuidado personal','Acondicionador Dove Bond Intense Repair 250 ml','AC. DOVE BOND INTENSE REPAIR X 250 ML.',12,true),
('170','170','Plusbelle','Cuidado personal','Acondicionador Plusbelle Balance 1 lt','AC. PLUSBELLE BALANCE X 1 LT',12,true),
('208','208','Sedal','Cuidado personal','Acondicionador Sedal Ácido Hialurónico 340 ml','AC. SEDAL ACIDO HIALURONICO X 340 ML',12,true),
('310','310','Alsamar','Almacén','Aceite Alsamar 5 lts','ACEITE ALSAMAR X 5 LTS.',4,true),
('315','315','Cañuelas','Almacén','Aceite Cañuelas 900 cc','ACEITE CAÑUELAS X 900 CC.',12,true),
('398','398','Saiz','Almacén','Aceituna Saiz 120 grs','ACEITUNA SAIZ X 120 GRS.',24,true),
('461','461','Baggio','Bebidas','Agua de Mesa Baggio Fresh 1.5 lts','AGUA DE MESA BAGGIO FRESH X 1.5 LTS',6,true),
('481','481','Sierra del Norte','Bebidas','Agua Mineral Sierra del Norte 1.5 lts','AGUA MINERAL SIERRA DEL NORTE X 1.5 LTS.',6,true),
('561','561','Porta','Limpieza','Alcohol Porta 70 500 cc','ALCOHOL PORTA 70 X 500 CC.',12,true),
('11377','11377','Danke','Mascotas','Alimento para Gato Danke 10 kg','ALIMENTO PARA GATO DANKE X 10 KG.',1,true),
('12529','12529','Pedigree','Mascotas','Alimento Pedigree Adulto Carne Sobre 100 grs','ALIMENTO PEDIGREE ADULTO CARNE SOBRE X 100 GRS.',12,true),
('12315','12315','Obrero','Bebidas','Amargo Obrero 950 ml','AMARGO OBRERO X 950 ML.',12,true),
('12937','12937','53','Almacén','Arroz 53 0000 1 kg','ARROZ 53 0000 X 1 KG.',10,true),
('951','951','Bahía','Almacén','Atún Bahía Desmenuzado Aceite 170 grs','ATUN BAHIA DESM. ACEITE X 170 GRS.',48,true)
on conflict (sku) do update set
  code = excluded.code,
  brand = excluded.brand,
  category = excluded.category,
  name = excluded.name,
  description = excluded.description,
  units_per_box = excluded.units_per_box,
  active = excluded.active;

insert into public.product_prices (product_id, price_list_name, unit_price, effective_from)
select p.id, 'lista_lb_sgo_11_05_26', v.unit_price, current_date
from (values
('12817',1683.79),('25',3676.36),('26',3676.36),('30',2379.61),('37',2272.66),('12632',5369.53),('12643',5865.18),('170',2933.56),('208',3852.23),('310',18058.89),('315',3351.93),('398',1105.95),('461',779.66),('481',634.87),('561',1518.56),('11377',15797.04),('12529',1036.22),('12315',4575.81),('12937',1016.53),('951',1254.82)
) as v(sku, unit_price)
join public.products p on p.sku = v.sku;