// https://vike.dev/onRenderClient
export { onRenderClient };

import ReactDOM from "react-dom/client";
import type { OnRenderClientAsync } from "vike/types";
import { PageShell } from "./PageShell";

// This onRenderClient() hook supports SSR & SPA, see https://vike.dev/render-modes
let root: ReactDOM.Root
const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext;
  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )
  const container = document.getElementById('react-root')!
  if (container.innerHTML !== '' && pageContext.isHydration) {
    // First Rendering SSR
    // Hydration
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    if (!root) {
      // First Rendering SPA Only
      root = ReactDOM.createRoot(container)
    }

    root.render(page);
  }
};
