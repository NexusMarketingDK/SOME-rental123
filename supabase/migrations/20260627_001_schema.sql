-- Step 3: Core database schema

-- ─── Properties ───────────────────────────────────────────────────────────────
create table if not exists properties (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  location    text,
  booking_url text,
  cover_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table properties enable row level security;
create policy "owner_all" on properties
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ─── Property images ──────────────────────────────────────────────────────────
create table if not exists property_images (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  storage_path text not null,
  url         text not null,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

alter table property_images enable row level security;
create policy "owner_all" on property_images
  using (
    exists (select 1 from properties p where p.id = property_images.property_id and p.user_id = auth.uid())
  )
  with check (
    exists (select 1 from properties p where p.id = property_images.property_id and p.user_id = auth.uid())
  );

-- ─── Social accounts ──────────────────────────────────────────────────────────
create table if not exists social_accounts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  platform        text not null check (platform in ('facebook','linkedin')),
  account_name    text not null,
  account_id      text not null,
  access_token    text,
  created_at      timestamptz not null default now()
);

alter table social_accounts enable row level security;
create policy "owner_all" on social_accounts
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ─── Posts ────────────────────────────────────────────────────────────────────
create type post_status as enum ('draft','scheduled','published','failed');

create table if not exists posts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  property_id     uuid references properties(id) on delete set null,
  content         text not null,
  image_urls      text[] not null default '{}',
  status          post_status not null default 'draft',
  scheduled_at    timestamptz,
  published_at    timestamptz,
  repeat_interval_days int,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table posts enable row level security;
create policy "owner_all" on posts
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ─── Post distributions ───────────────────────────────────────────────────────
create type distribution_status as enum ('pending','sent','failed');

create table if not exists post_distributions (
  id                uuid primary key default gen_random_uuid(),
  post_id           uuid not null references posts(id) on delete cascade,
  social_account_id uuid not null references social_accounts(id) on delete cascade,
  status            distribution_status not null default 'pending',
  sent_at           timestamptz,
  error_message     text,
  unique (post_id, social_account_id)
);

alter table post_distributions enable row level security;
create policy "owner_all" on post_distributions
  using (
    exists (select 1 from posts p where p.id = post_distributions.post_id and p.user_id = auth.uid())
  );

-- ─── Calendar integrations ────────────────────────────────────────────────────
create table if not exists calendar_integrations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  type        text not null check (type in ('calcom','google','airbnb','ics')),
  url         text not null,
  last_synced_at timestamptz,
  created_at  timestamptz not null default now()
);

alter table calendar_integrations enable row level security;
create policy "owner_all" on calendar_integrations
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ─── Calendar events ──────────────────────────────────────────────────────────
create table if not exists calendar_events (
  id              uuid primary key default gen_random_uuid(),
  property_id     uuid not null references properties(id) on delete cascade,
  integration_id  uuid references calendar_integrations(id) on delete cascade,
  external_uid    text,
  title           text,
  start_date      date not null,
  end_date        date not null,
  status          text not null default 'booked',
  created_at      timestamptz not null default now(),
  unique (integration_id, external_uid)
);

alter table calendar_events enable row level security;
create policy "owner_all" on calendar_events
  using (
    exists (select 1 from properties p where p.id = calendar_events.property_id and p.user_id = auth.uid())
  );

-- ─── updated_at trigger ────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end;
$$;

create trigger trg_properties_updated_at
  before update on properties for each row execute function set_updated_at();

create trigger trg_posts_updated_at
  before update on posts for each row execute function set_updated_at();
