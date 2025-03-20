import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/data/config';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), robotsTxt(), partytown()],
  site: SITE_URL,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: false
    }
  }
});