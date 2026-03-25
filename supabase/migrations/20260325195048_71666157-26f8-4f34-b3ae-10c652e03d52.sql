CREATE TABLE public.download_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  template_id text NOT NULL,
  resume_title text,
  downloaded_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.download_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own downloads"
ON public.download_history FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own downloads"
ON public.download_history FOR SELECT TO authenticated
USING (auth.uid() = user_id);