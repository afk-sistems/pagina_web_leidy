import { defineMiddleware } from "astro:middleware";
import { supabase } from "./lib/supabase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const onRequest = defineMiddleware(async (ctx, next) => {

    const { url, cookies, redirect } = ctx;

    const isProtected = url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login');

    if (!isProtected) return next();

    const accessToken = cookies.get('sb-access-token')?.value;
    const refreshToken = cookies.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
        return redirect('/admin/login');
    }

    // Inyectamos la sesión manualmente
    const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    if (error || !data.user) {
        return redirect('/admin/login');
    }

    // Usuario válido ✔
    return next();

});