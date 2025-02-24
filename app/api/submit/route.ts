import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { name, email, phone, energyUsage, inverterSize, panelSize } = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet2!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, phone, energyUsage, inverterSize, panelSize]],
      },
    });

    return Response.json({ message: "Data saved successfully!", response });
  } catch (error) {
    console.error('submmission error ', error);
    return Response.json({ message: "Failed to save data." }, { status: 500 });
  }
}
