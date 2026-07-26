-- Reconcile video_orders job-tracking columns with the deployed schema.
-- Production renamed the legacy "higgsfield_*" columns to "video_*" and added
-- error_message; earlier migrations still used the old names, so a fresh setup
-- diverged from production and the app (which reads/writes video_job_id[s])
-- could never store or poll job IDs. This migration is idempotent and safe to
-- run against either schema.

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_name = 'video_orders' and column_name = 'higgsfield_job_id'
  ) then
    alter table video_orders rename column higgsfield_job_id to video_job_id;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_name = 'video_orders' and column_name = 'higgsfield_job_ids'
  ) then
    alter table video_orders rename column higgsfield_job_ids to video_job_ids;
  end if;
end $$;

alter table video_orders add column if not exists video_job_id text;
alter table video_orders add column if not exists video_job_ids text[] default '{}';
alter table video_orders add column if not exists error_message text;
