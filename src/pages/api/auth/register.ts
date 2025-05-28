// With `output: 'static'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabaseClient";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmpassword = formData.get("confirmpassword")?.toString();
  const nickname = formData.get("nickname")?.toString();

  if (!email || !password || !nickname || !confirmpassword) {
    return new Response("Todos los campos son requeridos", { status: 400 });
  }

  if (password !== confirmpassword) {
    return new Response("Las contraseñas no coinciden", { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (data.user) {
    const { error: insertError } = await supabase
      .from("user_information")
      .insert({
        user_id: data.user.id,
        email,
        nickname,
      });
    if (insertError) {
      return new Response(insertError.message, { status: 500 });
    }
  }

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/signin");
};
