import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const { email, password } = await request.json();
  console.log(email, password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return new Response('Credenciales inválidas', { status: 401 });
  }

  const { access_token, refresh_token, expires_at } = data.session;

  cookies.set('sb-access-token', access_token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });

  cookies.set('sb-refresh-token', refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });

  return redirect('/admin/proyectos');
};