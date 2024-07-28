import { z } from "zod";
 
export const createENTITYSchema = z.object({
  name: z.string(),
  code: z.string(),
});
 
export type CreateENTITYSchema = typeof createENTITYSchema;