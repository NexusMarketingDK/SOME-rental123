-- Add Higgsfield job tracking to video_orders
alter table video_orders
  add column if not exists higgsfield_job_id text,
  add column if not exists image_urls text[] not null default '{}',
  add column if not exists title text;
