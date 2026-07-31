-- Pay-per-video: a generated presentation video is locked until the €50
-- payment is completed. Uploaded videos and already-delivered videos are
-- considered paid so they are never locked.
alter table video_orders add column if not exists paid boolean not null default false;
update video_orders set paid = true where status = 'ready';
