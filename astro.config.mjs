import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { webcore } from "webcoreui/integration";
import { rehypeBaseImages } from "./src/lib/rehypeBaseImages";

const siteUrl = "https://www.domaine.com";
const siteBase = "";

export default defineConfig({
  site: siteUrl,
  server: {
    host: true,
    allowedHosts: ["domaine.com"],
  },
  scopedStyleStrategy: "where",
  integrations: [tailwind(), mdx(), webcore(), partytown({ config: { forward: ["dataLayer.push"] } })],
  output: "static",
  /* A Activer si petit backend
    adapter: node({
    mode: "standalone", // indispensable pour le déploiement
  }),
  */
  base: siteBase,
  markdown: {
    syntaxHighlight: "prism",
    rehypePlugins: [[rehypeBaseImages, { base: siteBase }]],
  },
  vite: { base: siteBase },
  alias: {
    "@components": "./src/components",
    "@layouts": "./src/layouts",
    "@lib": "./src/lib",
    "@styles": "./src/styles",
    "@content": "./src/content",
  },
});
