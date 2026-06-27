-- Support multiple Higgsfield jobs (one per image) and multiple video clip URLs
alter table video_orders
  add column if not exists higgsfield_job_ids text[] default '{}',
  add column if not exists video_urls text[] default '{}';
