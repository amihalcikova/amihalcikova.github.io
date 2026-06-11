import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Andrein chaos",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: null,
    locale: "cs-CZ",
    baseUrl: "amihalcikova.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Playfair Display",
        body: "Newsreader",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fdf6f0", // velmi světlé meruňkové pozadí
          lightgray: "#f0e2d7", // jemné linky, ohraničení
          gray: "#b3a394", // ztlumený text (data, meta)
          darkgray: "#23201d", // hlavní text – inkoustový, skoro černý
          dark: "#1a1714", // nejtmavší (tučné, UI)
          secondary: "#d9622a", // akcent – teplá oranžová (odkazy, nadpisy)
          tertiary: "#e89b5f", // světlejší oranžová (hover, navštívené)
          highlight: "rgba(217, 98, 42, 0.10)", // jemné podbarvení odkazů
          textHighlight: "#f7d49a99", // zvýrazňovač textu
        },
        darkMode: {
          light: "#1b1714",
          lightgray: "#342c26",
          gray: "#6f6354",
          darkgray: "#ece2d6",
          dark: "#f5ede2",
          secondary: "#ef8a4d",
          tertiary: "#f3a774",
          highlight: "rgba(239, 138, 77, 0.12)",
          textHighlight: "#b3870288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
