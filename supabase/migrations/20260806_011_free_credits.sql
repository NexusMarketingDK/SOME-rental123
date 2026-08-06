-- Free "test" account: every new user starts with 2 free AI-post credits.
--
-- Until now no ai_credits row was created at signup, so a brand-new (free)
-- account had no balance and couldn't generate a single post. This trigger
-- creates the row with 2 credits, matching FREE_POST_CREDITS in the app and
-- the "2 free SoMe posts" advertised on the pricing pages.
--
-- Idempotent: safe to re-run (create or replace + drop trigger if exists +
-- on conflict do nothing), so it can coexist with the deploy pipeline.

create or replace function grant_free_credits()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.ai_credits (user_id, balance)
  values (new.id, 2)
  on conflict (user_id) do nothing;

  insert into public.credit_transactions (user_id, amount, description)
  values (new.id, 2, 'Gratis velkomst-credits (2 SoMe-opslag)');

  return new;
end;
$$;

drop trigger if exists trg_grant_free_credits on auth.users;
create trigger trg_grant_free_credits
  after insert on auth.users
  for each row execute function grant_free_credits();

-- Backfill: give existing accounts that never received credits their free 2,
-- so the free posts also apply to users who signed up before this change.
insert into public.ai_credits (user_id, balance)
select id, 2 from auth.users
on conflict (user_id) do nothing;
