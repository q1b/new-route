import { zod } from "sveltekit-superforms/adapters";
import { createENTITYSchema, type CreateENTITYSchema } from "./create-entity-schema";
import { superValidate, type Infer, type SuperValidated } from "sveltekit-superforms";
import type { RequestEvent } from "./$types";

export const getCreateENTITYForm = async (event?:RequestEvent) => {
    const cache = zod(createENTITYSchema)
    if (!event) {
        return await superValidate(cache)
    }
    return await superValidate(event, cache)
};

export type CreateENTITYFormType = SuperValidated<Infer<CreateENTITYSchema>>