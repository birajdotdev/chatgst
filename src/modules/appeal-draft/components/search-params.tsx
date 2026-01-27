import { z } from "zod";

export const appealDraftSearchSchema = z.object({
  step: z.number().int().min(1).max(6).default(1),
  documentId: z.string().optional(),
  appealId: z.string().optional(),
  mode: z.string().optional(),
});

export type AppealDraftSearchParams = z.infer<typeof appealDraftSearchSchema>;

// Re-export from context for backward compatibility
export {
  appealDraftSearchParamsCache,
  SearchParamsProvider,
  useAppealDraftSearchParams,
  useSearchParamsContext,
} from "@/modules/appeal-draft/contexts/search-params-context";

// Compatibility type for nuqs-style components
export type { AppealDraftSearchParams as appealDraftSearchParams };
