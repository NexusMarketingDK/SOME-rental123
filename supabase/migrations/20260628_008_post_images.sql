-- Add free_post_used flag to ai_credits (first AI post is always free)
alter table ai_credits
  add column if not exists free_post_used boolean not null default false;

-- Storage bucket for AI-generated post images
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

create policy "Authenticated users can upload post images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-images' AND auth.uid()::text = (storage.foldername(name))[1]);

create policy "Anyone can view post images"
  on storage.objects for select
  using (bucket_id = 'post-images');

create policy "Users can delete their own post images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-images' AND auth.uid()::text = (storage.foldername(name))[1]);
