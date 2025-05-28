import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabaseClient";

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get("q");

  if (!query || query.trim() === "") {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabase
    .from("products")
    .select("product_id, name")
    .ilike("name", `%${query}%`);

  if (error) {
    console.error(error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
