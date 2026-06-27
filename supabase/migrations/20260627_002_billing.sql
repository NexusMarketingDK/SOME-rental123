-- Step: Billing — subscriptions and AI credits

create type subscription_status as enum ('active','canceled','past_due','trialing');

create table if not exists subscriptions (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid not null references auth.users(id) on delete cascade unique,
  stripe_customer_id   text unique,
  stripe_subscription_id text unique,
  status               subscription_status not null default 'trialing',
  current_period_end   timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

alter table subscriptions enable row level security;
create policy "owner_read" on subscriptions
  for select using (user_id = auth.uid());

-- AI post credits (top-up model: 1 credit = 5 kr = 1 AI post)
create table if not exists ai_credits (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade unique,
  balance     int not null default 0,
  updated_at  timestamptz not null default now()
);

alter table ai_credits enable row level security;
create policy "owner_read" on ai_credits
  for select using (user_id = auth.uid());

-- Credit transactions log
create table if not exists credit_transactions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  amount           int not null, -- positive = topup, negative = usage
  description      text not null,
  stripe_payment_id text,
  created_at       timestamptz not null default now()
);

alter table credit_transactions enable row level security;
create policy "owner_read" on credit_transactions
  for select using (user_id = auth.uid());

-- Video orders
create type video_status as enum ('pending','processing','ready','failed');

create table if not exists video_orders (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  property_id         uuid references properties(id) on delete set null,
  stripe_payment_id   text,
  status              video_status not null default 'pending',
  video_url           text,
  created_at          timestamptz not null default now()
);

alter table video_orders enable row level security;
create policy "owner_all" on video_orders
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create trigger trg_subscriptions_updated_at
  before update on subscriptions for each row execute function set_updated_at();
