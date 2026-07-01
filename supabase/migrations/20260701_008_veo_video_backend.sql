-- Switch video generation provider from Higgsfield to Google Veo (AI Studio).
alter table video_orders
  rename column higgsfield_job_id to video_job_id;
alter table video_orders
  rename column higgsfield_job_ids to video_job_ids;

-- Public bucket for generated video output files. Veo's own hosted file
-- URIs expire ~2 days after generation, so completed videos are downloaded
-- and re-hosted here for stable long-term links.
insert into storage.buckets (id, name, public)
values ('video-outputs', 'video-outputs', true)
on conflict (id) do nothing;

create policy "Anyone can view video outputs"
  on storage.objects for select
  using (bucket_id = 'video-outputs');
