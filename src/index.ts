#!/usr/bin/env node
import path from "path";
import PKG_ROOT from './constants/pkg-root.js';
import fs from "fs/promises";
import { text } from "@clack/prompts"

const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

let structure1: Record<string, string> = {};
let structure2: Record<string, string> = {};

const main = async () => {
  const srcDir = path.join(PKG_ROOT, "template/entity");
  const projectRootDir = path.resolve(process.cwd());
  const relativePath = await text({
    message: "Enter the relative path: ",
    validate: (value) => {
      if (value.startsWith("/")) {
        return "Path should be relative to the project root";
      }
    }
  })
  const entityPath = path.resolve(projectRootDir, relativePath as string);
  const parentDir = path.dirname(entityPath);
  const parentDirName = path.basename(parentDir);

  const entity = await text({
    message: "Enter the name of the entity: ",
  }) as string;
  const title = await text({
    message: "Give the title of entity form: ",
  }) as string;
  const description = await text({
    message: "Give the description of entity form: ",
  }) as string;

  [
    "+page.server.ts",
    "+page.svelte",
  ].forEach(async (fileName) => {
    let file = await fs.readFile(srcDir + '/' + fileName, "utf-8");
    file = file.replaceAll("ENTITY_TITLE", title);
    file = file.replaceAll("ENTITY_DESCRIPTION", description);
    file = file.replaceAll("PARENT_DIR", parentDirName);
    file = file.replaceAll("entity", entity);
    file = file.replaceAll("ENTITY", entity.charAt(0).toUpperCase() + entity.slice(1));
    console.log(fileName);
    structure1[fileName] = file;
  });

  [
    "+page.server.ts",
    "+page.svelte",
    "create-entity-schema.ts",
    "create-entity-dialog.svelte",
    "create-entity-form.svelte",
    "index.ts"
  ].forEach(async (fileName) => {
    let file = await fs.readFile(srcDir + '/create' + '/' + fileName, "utf-8");
    file = file.replaceAll("ENTITY_TITLE", title);
    file = file.replaceAll("ENTITY_DESCRIPTION", description);
    file = file.replaceAll("PARENT_DIR", parentDirName);
    file = file.replaceAll("entity", entity);
    file = file.replaceAll("ENTITY", entity.charAt(0).toUpperCase() + entity.slice(1));
    structure2[fileName.replace("entity", entity)] = file;
  })
  await sleep(1000);
  // creating directories in one short
  await fs.mkdir(entityPath + '/' + entity + `/create`, { recursive: true });

  for (const [fileName, fileContent] of Object.entries(structure1)) {
    await fs.writeFile(entityPath + `/${entity}/${fileName}`, fileContent, {
      encoding: "utf-8",
    });
  }
  
  for (const [fileName, fileContent] of Object.entries(structure2)) {
    await fs.writeFile(entityPath + '/' + entity + `/create/${fileName}`, fileContent, {
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