// https://vike.dev/onRenderClient
export { onRenderClient };

import ReactDOM from "react-dom/client";
import type { OnRenderClientAsync } from "vike/types";
import { PageShell } from "./PageShell";

// This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
// to support SPA
const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined"
    );
  const root = ReactDOM.createRoot(
    document.getElementById("react-root") as HTMLDivElement
  );
  if (!root) throw new Error("DOM element #react-root not found");

  root.render(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
};
