import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Pluswrld Portfolio",
  projectId: "a8mywjme",
  dataset: "production",
  basePath: "/",
  plugins: [structureTool()],
  schema: { types: schemaTypes }
});