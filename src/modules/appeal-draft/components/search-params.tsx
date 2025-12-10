import {
  createLoader,
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const appealDraftSearchParams = {
  step: parseAsInteger.withDefault(1),
  documentId: parseAsString,
  mode: parseAsString,
};

export const loadAppealDraftSearchParams = createLoader(
  appealDraftSearchParams
);

export const appealDraftSearchParamsCache = createSearchParamsCache(
  appealDraftSearchParams
);
