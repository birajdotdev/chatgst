import { DocumentData } from "@/modules/appeal-draft/types/document";

export interface APIResponse {
  message: string;
  data: unknown;
}

export interface ExtractEntitiesApiResponse extends APIResponse {
  time_taken_seconds: number;
  data: DocumentData;
}

export interface GetDocumentApiResponse extends APIResponse {
  data: DocumentData;
}
