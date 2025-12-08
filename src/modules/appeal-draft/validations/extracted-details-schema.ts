import { z } from "zod";

import { requiredString } from "@/modules/auth/validations/helpers";

export const assesseeDetailsSchema = z.object({
  assessee_name: requiredString(),
  assessee_address: requiredString(),
});

export const orderDetailsSchema = z.object({
  order_number: requiredString(),
  order_date: z.iso.date("Order date must be a valid date"),
  tax_period: requiredString(),
  demand_amount: requiredString(),
});

export const jurisdictionDetailsSchema = z.object({
  jurisdiction_officer: requiredString(),
  jurisdiction_office: requiredString(),
});

export const extractedDetailsSchema = z.object({
  assessee_details: assesseeDetailsSchema,
  order_details: z.array(orderDetailsSchema).default([]),
  jurisdiction_details: jurisdictionDetailsSchema,
});

export const updateDocumentSchema = extractedDetailsSchema.extend({
  id: z.string().min(1, "Document ID is required"),
});
