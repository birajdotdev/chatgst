import { Appeal } from "@/modules/appeal-draft/types/appeal";
import { AppealHistory } from "@/modules/appeal-draft/types/appeal-history";
import { DocumentData } from "@/modules/appeal-draft/types/document";
import { LegalReference } from "@/modules/appeal-draft/types/legal-reference";
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

export interface GetLegalReferencesApiResponse extends APIResponse {
  data: LegalReference[];
}

export interface GenerateAppealApiResponse extends APIResponse {
  data: Appeal;
}

export interface GetAllAppealsApiResponse extends APIResponse {
  data: AppealHistory[];
}
