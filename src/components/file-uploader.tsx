"use client";

import {
  AlertCircleIcon,
  FileTextIcon,
  UploadIcon,
  XCircleIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  label?: string;
  isExecuting?: boolean;
  maxSizeMB?: number;
  maxFiles?: number;
  accept?: string[];
  className?: string;
  dropAreaClassName?: string;
  onFileUpload?: (formData: FormData) => void;
  onOpenFileDialog?: () => void;
  fileKey?: string;
  hideSubmitButton?: boolean;
}

export function FileUploader({
  label = "Upload Your Document",
  maxSizeMB = 10,
  maxFiles = 1,
  accept = ["application/pdf", "application/msword"],
  className,
  dropAreaClassName,
  onFileUpload,
  isExecuting,
  onOpenFileDialog,
  fileKey = "pdf_file",
  hideSubmitButton = false,
}: FileUploaderProps) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
    accept: accept.join(","),
  });

  const handelOpenFileDialog = () => {
    if (onOpenFileDialog) {
      onOpenFileDialog();
    }
    openFileDialog();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select a file");
      return;
    }

    // Create FormData and add all files
    const formData = new FormData();
    files.forEach((f) => {
      if (f.file instanceof File) {
        formData.append(fileKey, f.file);
      }
    });

    // Execute the action with FormData
    if (onFileUpload) {
      onFileUpload(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col items-center gap-8", className)}
    >
      {/* Drop area */}
      <div
        className={cn(
          "flex min-h-72 w-full flex-col items-center rounded-xl border border-dashed border-input bg-card p-4 transition-colors not-data-files:justify-center has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50",
          dropAreaClassName
        )}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          {...getInputProps()}
          aria-label="Upload files"
          className="sr-only"
        />

        {files.length > 0 ? (
          <div className="flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6">
            <div className="w-full space-y-2">
              {files.map((file) => (
                <div
                  className="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3"
                  key={file.id}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileTextIcon className="size-6 shrink-0 opacity-60" />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="truncate text-[13px] font-medium">
                        {file.file instanceof File
                          ? file.file.name
                          : file.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(
                          file.file instanceof File
                            ? file.file.size
                            : file.file.size
                        )}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    aria-label="Remove file"
                    className="size-8 rounded-full text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                    onClick={() => removeFile(file.id)}
                    size="icon"
                    variant="ghost"
                    disabled={isExecuting}
                  >
                    <XCircleIcon aria-hidden="true" className="size-6" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mx-auto flex max-w-fit flex-col gap-3">
              {!hideSubmitButton && (
                <Button type="submit" disabled={isExecuting}>
                  {isExecuting ? (
                    <Spinner />
                  ) : (
                    <>
                      <UploadIcon aria-hidden="true" className="-ms-1" />
                      Upload file & Process
                    </>
                  )}
                </Button>
              )}
              <Button
                type="button"
                className="text-primary!"
                variant="ghost"
                disabled={isExecuting}
                onClick={handelOpenFileDialog}
              >
                Choose Different File
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <UploadIcon
              aria-hidden="true"
              className="mb-2 size-10 shrink-0 opacity-60"
            />
            <p className="mb-4 text-[16px] font-medium">{label}</p>
            <p className="mb-2 text-xs text-muted-foreground">
              Supported formats:{" "}
              <span className="text-card-foreground">PDF, DOCS</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Max Size: <span className="text-card-foreground">10 MB</span>
            </p>
            <Button
              type="button"
              className="mt-4"
              onClick={handelOpenFileDialog}
            >
              <FileTextIcon aria-hidden="true" className="-ms-1" />
              Choose File
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </form>
  );
}
