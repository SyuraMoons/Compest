import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      phoneNumber,
      planName,
      mealTypes,
      deliveryDays,
      allergies,
    } = body;

    // Tentukan harga berdasarkan plan
    const planPrices: Record<string, number> = {
      "Diet Plan": 30000,
      "Protein Plan": 40000,
      "Royal Plan": 60000,
    };

    const pricePerMeal = planPrices[planName];
    const totalPrice =
      pricePerMeal * mealTypes.length * deliveryDays.length * 4.3;

    const { data, error } = await supabase
      .from("subscription")
      .insert([
        {
          fullName,
          phoneNumber,
          planName,
          mealTypes,
          deliveryDays,
          allergies,
          totalPrice: Math.round(totalPrice),
        },
      ])
      .select();

    if (error) throw error;

    if (data && data.length > 0) {
      return Response.json(data[0], { status: 201 });
    } else {
      return Response.json({ error: "Insert failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("POST /subscribe error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
