import { supabase } from "../../../lib/supabaseClient";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const cartId = Number(formData.get("cart_id"));

  const { error: deleteError } = await supabase
    .from("cart")
    .delete()
    .eq("id", cartId);

  if (deleteError) {
    return new Response("Error removing item from cart", { status: 500 });
  }

  return redirect("/cart");
};
