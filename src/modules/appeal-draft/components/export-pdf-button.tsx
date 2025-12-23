"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface ExportPdfButtonProps {
  appealId: string;
  appealName?: string;
}

export function ExportPdfButton({
  appealId,
  appealName,
}: ExportPdfButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleExportPdf = async () => {
    try {
      setIsLoading(true);

      // Fetch the PDF from our Next.js API route (which proxies to backend)
      const response = await fetch(`/api/documents/appeals/${appealId}/pdf/`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = appealName
        ? `${appealName}.pdf`
        : `appeal-${appealId}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF exported successfully");

      // Redirect to chat page after download starts
      router.push("/chat");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleExportPdf}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Spinner />
          Exporting...
        </>
      ) : (
        <>
          <DownloadIcon />
          Export as PDF
        </>
      )}
    </Button>
  );
}
