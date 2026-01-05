import { NextRequest, NextResponse } from "next/server";

import { env } from "@/env";
import { verifySession } from "@/lib/dal";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ appealId: string }> }
) {
  try {
    // verifySession redirects to login if not authenticated
    const session = await verifySession();

    const { appealId } = await params;

    if (!appealId) {
      return NextResponse.json(
        { error: "Appeal ID is required" },
        { status: 400 }
      );
    }

    // Fetch PDF from the backend API
    const response = await fetch(
      `${env.API_URL}/documents/appeals/${appealId}/pdf/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/pdf",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PDF generation error:", errorText);

      return NextResponse.json(
        { error: "Failed to generate PDF", detail: errorText },
        { status: response.status }
      );
    }

    // Get the PDF blob
    const pdfBlob = await response.blob();

    // Return the PDF with proper headers
    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="appeal-${appealId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error in PDF export API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
