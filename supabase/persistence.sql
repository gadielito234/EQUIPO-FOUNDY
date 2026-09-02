-- Ejecutar una vez en Supabase SQL Editor.
-- Ajusta el tipo de dui si en tu instalación no es numeric.

alter table public.inversion
  add column if not exists id_inversionista numeric;

alter table public.pago
  add column if not exists id_inversion bigint;

create table if not exists public.preferencias_usuario (
  dui numeric primary key,
  alertas_transacciones boolean not null default true,
  sugerencias_marketing boolean not null default false
);

create index if not exists inversion_inversionista_idx
  on public.inversion (id_inversionista);

create index if not exists inversion_proyecto_idx
  on public.inversion (id_proyecto);

create index if not exists pago_inversionista_idx
  on public.pago (id_inversionista);

create index if not exists pago_inversion_idx
  on public.pago (id_inversion);