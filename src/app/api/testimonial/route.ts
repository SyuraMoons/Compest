import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, rating } = body;

    const { data, error } = await supabase
      .from("testimonial")
      .insert([{ name, email, message, rating }])
      .select();

    if (error) throw error;

    // Check if data exists and has at least one item
    if (data && data.length > 0) {
      return Response.json(data[0], { status: 201 });
    } else {
      return Response.json({ error: "Insert failed" }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
