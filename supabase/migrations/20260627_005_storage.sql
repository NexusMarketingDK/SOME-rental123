-- Create public storage bucket for video input images
insert into storage.buckets (id, name, public)
values ('video-images', 'video-images', true)
on conflict (id) do nothing;

create policy "Authenticated users can upload video images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'video-images' AND auth.uid()::text = (storage.foldername(name))[1]);

create policy "Anyone can view video images"
  on storage.objects for select
  using (bucket_id = 'video-images');

create policy "Users can delete their own video images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'video-images' AND auth.uid()::text = (storage.foldername(name))[1]);
