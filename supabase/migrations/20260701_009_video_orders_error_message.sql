-- Surface why video generation failed instead of silently leaving orders
-- stuck in "processing" for up to 6 hours.
alter table video_orders
  add column if not exists error_message text;
