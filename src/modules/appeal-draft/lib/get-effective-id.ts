import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getAppeal } from "@/modules/appeal-draft/queries";

export async function getEffectiveDocumentId() {
  const { documentId, appealId } = appealDraftSearchParamsCache.all();

  // 1. Check URL documentId
  if (documentId) return documentId;

  // 2. Check appealId from URL and derive documentId
  if (appealId) {
    try {
      const appeal = await getAppeal(appealId);
      return appeal.document_id;
    } catch (e) {
      console.error("Failed to derive documentId from appealId", e);
    }
  }

  return null;
}
