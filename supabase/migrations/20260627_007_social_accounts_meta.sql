-- Add meta column to social_accounts for storing extra platform data (e.g. linked page_id for Instagram)
alter table public.social_accounts
  add column if not exists meta jsonb default null;

-- Add unique constraint to prevent duplicate connections per user per account_id
alter table public.social_accounts
  drop constraint if exists social_accounts_user_id_account_id_key;
alter table public.social_accounts
  add constraint social_accounts_user_id_account_id_key unique (user_id, account_id);
