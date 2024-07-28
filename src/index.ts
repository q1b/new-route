#!/usr/bin/env node
import path from "path";
import PKG_ROOT from './constants/pkg-root.js';
import fs from "fs/promises";
import { text } from "@clack/prompts"

let structure: Record<string, string> = {};

const main = async () => {
  const srcDir = path.join(PKG_ROOT, "template/create-entity");
  const projectRootDir = path.resolve(process.cwd());
  const relativePath = await text({
    message: "Enter the relative path to the entity: ",
    validate: (value) => {
      if (value.startsWith("/")) {
        return "Path should be relative to the project root";
      }
    }
  })
  const entityPath = path.resolve(projectRootDir, relativePath as string);
  const parentDir = path.dirname(entityPath);
  const entity = await text({
    message: "Enter the name of the entity: ",
  }) as string;
  const title = await text({
    message: "Give the title of entity form: ",
  }) as string;
  const description = await text({
    message: "Give the description of entity form: ",
  }) as string;
  console.log("ENTITY", entity);
  [
    "+page.server.ts",
    "+page.svelte",
    "create-entity-schema.ts",
    "create-entity-dialog.svelte",
    "create-entity-form.svelte",
    "index.ts"
  ].forEach(async (fileName) => {
    let file = await fs.readFile(srcDir + '/' + fileName, "utf-8");
    file = file.replaceAll("entity", entity);
    file = file.replaceAll("ENTITY", entity.charAt(0).toUpperCase() + entity.slice(1));
    file = file.replaceAll("ENTITY_TITLE", title);
    file = file.replaceAll("ENTITY_DESCRIPTION", description);
    file = file.replaceAll("PARENT_DIR", parentDir);
    console.log(file, fileName.replace("entity", entity))
    structure[fileName.replace("entity", entity)] = file;
  })
  
  await fs.mkdir(entityPath + `/create-${entity}`, { recursive: true });
  for (const [fileName, fileContent] of Object.entries(structure)) {
    await fs.writeFile(entityPath + `/create-${entity}/${fileName}`, fileContent, {
      encoding: "utf-8",
    });
  }
}

main().catch((err) => {
  if (err instanceof Error) {
    console.log(err);
  }
  process.exit(1);
});