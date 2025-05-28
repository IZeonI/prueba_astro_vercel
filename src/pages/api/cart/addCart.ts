import { supabase } from "../../../lib/supabaseClient";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: sessionData, error: errorSession } =
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

  if (errorSession) {
    console.error("Error setting session:", errorSession);
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
  const id = Number(formData.get("product_id"));
  const quantity = Number(formData.get("quantity"));

  console.log("Adding product to cart:", id, quantity);

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("product_id", id)
    .single();

  if (error) {
    return new Response("Product not found", { status: 404 });
  }

  const { error: insertCart } = await supabase.from("cart").insert([
    {
      user_id: userData.user_id,
      product_id: product.product_id,
      quantity: quantity,
    },
  ]);

  if (insertCart) {
    return new Response("Error adding product to cart", { status: 500 });
  }

  return redirect(`/product/${encodeURIComponent(product.name)}`);
};
