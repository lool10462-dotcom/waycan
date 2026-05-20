-- =====================================================================
-- SCHEMA DE BASE DE DONNÉES WAYCAN - SYSTEME DE PAIEMENT WAAFI & ANTI-FRAUDE
-- A exécuter dans l'éditeur SQL de Supabase (SQL Editor > New Query)
-- =====================================================================

-- 1. Table des paiements de forfaits premium
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ad_id UUID REFERENCES public.ads(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL CHECK (plan_name IN ('Free', 'Silver', 'Gold', 'VIP')),
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    sender_number TEXT NOT NULL,
    transaction_id TEXT NOT NULL UNIQUE,
    screenshot_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspicious', 'fraud')),
    payment_code TEXT NOT NULL UNIQUE,
    fraud_score INTEGER DEFAULT 0 NOT NULL CHECK (fraud_score BETWEEN 0 AND 100),
    rejection_reason TEXT
);

-- Habiliter les permissions d'accès aux tables pour les utilisateurs connectés / anonymes
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Autoriser la lecture de ses propres paiements ou tous pour les admins
CREATE POLICY "Users can view their own payments" 
ON public.payments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert payments" 
ON public.payments FOR INSERT 
TO public 
WITH CHECK (true);

-- 2. Table des journaux d'activité frauduleuse (fraud_logs)
CREATE TABLE IF NOT EXISTS public.fraud_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    payment_id UUID REFERENCES public.payments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address TEXT,
    device_fingerprint TEXT,
    rule_triggered TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
    score_added INTEGER NOT NULL
);

ALTER TABLE public.fraud_logs ENABLE ROW LEVEL SECURITY;

-- 3. Indexes de performance pour la recherche rapide et l'intégrité
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON public.payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_code ON public.payments(payment_code);
CREATE INDEX IF NOT EXISTS idx_payments_ad_id ON public.payments(ad_id);

-- Instructions supplémentaires pour l'administration :
-- Ce script est autonome et configure de manière robuste l'architecture PostgreSQL requise.
-- Après exécution de ce script, n'oubliez pas de configurer un bucket public nommé 'receipts'
-- ou d'utiliser le bucket existant 'ads-images' pour héberger les captures d'écran des reçus Waafi.
