import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";
import { getCreateENTITYForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        entityList: db.query.entityTable.findMany(),
        entityForm: await getCreateENTITYForm(),
    }
};

export const actions: Actions = {
    default: async () => {
    }
};