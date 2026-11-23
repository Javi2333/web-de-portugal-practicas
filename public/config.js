/* =======================================================================
   config.js — Configuración pública del frontend (única fuente).
   Se carga antes que cualquier otro script de la web y del panel admin.

   La anon key de Supabase es pública por diseño: la seguridad de los datos
   depende de las políticas RLS en Supabase, no de ocultar esta clave.
   NUNCA pongas aquí la service_role key ni claves secretas de Stripe/Resend.
   ======================================================================= */

window.APP_CONFIG = Object.freeze({
  SUPABASE_URL:      'https://jnztchhwexxfjlrfgcvy.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuenRjaGh3ZXh4ZmpscmZnY3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDc2MTYsImV4cCI6MjA5MzYyMzYxNn0.6Ihq0BrTmcodWGpegdpcCi3MT3K6MnPj7lgIN6HnSE8'
});
