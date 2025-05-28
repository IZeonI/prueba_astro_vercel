import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabaseClient";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: sessionData, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    console.error("Error setting session:", error);
    return new Response("Unauthorized", { status: 401 });
  }

  const user = sessionData.session?.user;

  const { data: userData, error: fetchError } = await supabase
    .from("user_information")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  if (fetchError || !userData) {
    console.error("Error fetching user data:", fetchError);
    return new Response("User data not found", { status: 404 });
  }

  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const lastName = formData.get("last-name")?.toString();
  const address = formData.get("address")?.toString();

  const { error: updateError } = await supabase
    .from("user_information")
    .update({
      name,
      last_name: lastName,
      address,
    })
    .eq("id", userData.id);

  if (updateError) {
    console.error("Error updating user data:", updateError);
    return new Response("Update failed", { status: 500 });
  }

  return new Response("Datos actualizados correctamente", { status: 200 });
};
