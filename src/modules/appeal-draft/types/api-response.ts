import { DocumentData } from "@/modules/appeal-draft/types/document";
import { PotentialIssues } from "@/modules/appeal-draft/types/potential-issue";

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

export interface GetIssuesApiResponse extends APIResponse {
  data: PotentialIssues;
}
