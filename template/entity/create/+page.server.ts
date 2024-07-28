import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateENTITYForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from "$lib/server/db/index.js";
import { entityTable } from "$lib/server/db/schema/program/entity/index.js";

export const load: PageServerLoad = async () => {
  return {
    entityForm: await getCreateENTITYForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateENTITYForm(event);
    if (!form.valid) return fail(400, {form});
    await db.insert(entityTable).values({
      name: form.data.name,
      code: form.data.code
    });
    return {
      form
    }
  }
};