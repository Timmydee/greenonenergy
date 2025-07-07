// 📁 /app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";
import { connectToDatabase } from "@/lib/dbConnect";
import Recommendation from "@/models/Recommendation";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, phone, summary } = data;

  if (!email || !summary) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const formattedSummary =
    typeof summary === "object"
      ? `🔋 Total Energy Usage: ${Number(summary.totalEnergy).toFixed(
          2
        )} kWh/day
🔋 Total Load: ${Number(summary.totalLoad)} W
🔌 Inverter Size: ${summary.inverterSize} 
☀️ Panel Size: ${Number(summary.panelSize)} kW
🔋 No. of Panels: ${summary.noOfPanels}`
      : summary;

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0f9d58;">Hi ${name || "there"},</h2>
    <p>Thanks for using <strong>GreenOn Energy</strong> to calculate your solar needs.</p>
    <p>Here’s your personalized recommendation based on your inputs:</p>
    <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
      <pre style="white-space: pre-wrap; font-size: 14px;">${formattedSummary}</pre>
    </div>

    <h3 style="margin-top: 24px; color: #0f9d58;">🔍 What does this mean for you?</h3>
    <ul style="padding-left: 20px; font-size: 15px;">
      <li><strong>Total Energy Usage:</strong> You use around <strong>${summary.totalEnergy.toFixed(2)} units</strong> of electricity each day based on the appliances and hours you entered.</li>
      <li><strong>Total Load:</strong> Your devices draw about <strong>${summary.totalLoad} watts</strong> of power when they are all running.</li>
      <li><strong>Inverter Size:</strong> An <strong>${summary.inverterSize}</strong> inverter is ideal to power your setup with some buffer for extra safety.</li>
      <li><strong>Solar Panel Size:</strong> You need at least <strong>${summary.panelSize} kW</strong> of solar panels to meet your daily needs.</li>      
      <li><strong>Panel Count:</strong> We recommend using <strong>${
        summary.noOfPanels
      }</strong> panels of 400W each to ensure efficient charging even on cloudy days.</li>
    </ul>

    <p>We’ll help you connect with <strong>verified solar vendors</strong> who can supply and install your system.</p>
    <p><strong>Send us a message on WhatsApp</strong> to get referred:</p>
    <p><a href="https://wa.me/2349071268591?text=Hi%20GreenOn%20Energy,%20I%20just%20received%20my%20solar%20recommendation%20and%20would%20like%20to%20connect%20with%20vendors." target="_blank" style="color: #0f9d58; font-weight: bold;">Message GreenOn Energy on WhatsApp</a></p>

    <p>Thanks for choosing GreenOn Energy.<br>— The GreenOn Team</p>
  </div>
`;

  try {
    await sendMail({
      to: email,
      subject: "Your GreenOnSolar Solar Recommendation",
      html: htmlContent,
      text: formattedSummary,
    });

    await connectToDatabase();
    await Recommendation.create({
      name,
      email,
      phone,
      summary: {
        totalEnergy: summary.totalEnergy,
        totalLoad: summary.totalLoad,
        inverterSize: summary.inverterSize,
        panelSize: summary.panelSize,
        noOfPanels: summary.noOfPanels,
      },
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
