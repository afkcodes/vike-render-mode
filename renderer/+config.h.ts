import type { Config, ConfigEnv } from "vike/types";

// https://vike.dev/config
export default {
  /* To enable Client-side Routing:
  clientRouting: true,
  // !! WARNING !! Before doing so, read https://vike.dev/clientRouting */

  // See https://vike.dev/data-fetching
  clientRouting: true,
  hydrationCanBeAborted: true,
  passToClient: ["pageProps", "urlPathname"],
  meta: {
    renderMode: {
      env: { config: true },
      effect({ configDefinedAt, configValue }) {
        let env: ConfigEnv | undefined;
        if (configValue == "HTML") env = { server: true };
        if (configValue == "SPA") env = { client: true };
        if (configValue == "SSR") env = { server: true, client: true };
        if (!env)
          throw new Error(
            `${configDefinedAt} should be 'SSR', 'SPA', or 'HTML'`
          );
        return {
          meta: {
            Page: { env },
          },
        };
      },
    },
    title: {
      // Make the value of `title` available on both the server- and client-side
      env: { server: true, client: true },
    },
    description: {
      // Make the value of `description` available only on the server-side
      env: { server: true, client: true },
    },
  },
} satisfies Config;
