"use client";

import { useState } from "react";

import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Appeal } from "@/modules/appeal-draft/types";

interface ExportPdfButtonProps {
  appeal: Promise<Appeal>;
  appealPDF: Promise<Blob>;
}

export function ExportPdfButton({ appeal, appealPDF }: ExportPdfButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
      setIsLoading(true);

      // Get the blob from the response
      const [appealData, blob] = await Promise.all([appeal, appealPDF]);

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = appealData.appeal_name
        ? `${appealData.appeal_name}.pdf`
        : `appeal-${appealData.id}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
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
