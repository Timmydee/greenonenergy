// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/dbConnect";
// import Product from "@/models/Product";

// export async function GET(req: NextRequest) {
//   await connectToDatabase()

//   try {
//     // Parse query params
//     const { searchParams } = new URL(req.url);
//     const totalLoad = Number(searchParams.get("totalLoad")) || 0;
//     const inverterSize = Number(searchParams.get("inverterSize")) || 0;
//     const panelSize = Number(searchParams.get("panelSize")) || 0;
//     const budget = Number(searchParams.get("budget")) || 0;

//     // Fetch all products
//     const products = await Product.find();

//     // Filter products based on needs
//     const recommendedProducts = products.filter((product) => {
//       const matchesLoad = product.loadCapacity >= totalLoad;
//       const matchesInverter = product.inverterSize >= inverterSize;
//       const matchesPanel = product.panelSize >= panelSize;
//       const matchesBudget = budget > 0 ? product.price <= budget : true;

//       return matchesLoad && matchesInverter && matchesPanel && matchesBudget;
//     });

//     // Sort products by best match (smallest difference)
//     recommendedProducts.sort((a, b) => {
//       const scoreA =
//         Math.abs(a.loadCapacity - totalLoad) +
//         Math.abs(a.inverterSize - inverterSize) +
//         Math.abs(a.panelSize - panelSize);
//       const scoreB =
//         Math.abs(b.loadCapacity - totalLoad) +
//         Math.abs(b.inverterSize - inverterSize) +
//         Math.abs(b.panelSize - panelSize);

//       return scoreA - scoreB;
//     });

//     return NextResponse.json({ success: true, data: recommendedProducts });
//   } catch (error) {
//     console.error("Error fetching recommendations:", error);
//     return NextResponse.json({ success: false, message: "Server error" });
//   }
// }


import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";

export async function GET(req: Request) {
  await connectToDatabase()
  const url = new URL(req.url);

  // Extract optional filters
  const capacity = url.searchParams.get("capacity"); // Inverter size
  const wattage = url.searchParams.get("wattage"); // Panel size
  const price = url.searchParams.get("price"); // Budget

  // Build query filter dynamically
  const filter: any = {};
  
  if (capacity) filter.capacity = capacity; // Match exact inverter capacity
  if (wattage) filter.wattage = wattage; // Match exact panel wattage
  if (price) filter.price = { $lte: Number(price) }; // Ensure price is within budget

  // Fetch matching products
  const products = await Product.find(filter).limit(10);

  return NextResponse.json(products);
}
