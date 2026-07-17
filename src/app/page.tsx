// Server Component — no "use client".
// All browser-only sections live in PageContent (a Client Component)
// so ssr:false dynamic imports work correctly in Next.js App Router.

import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import PageContent from "./PageContent";

export default function Home() {
  return (
    <main className="relative bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Nav — server-rendered, always visible even if JS fails */}
      <Header />

      {/* All client-side sections with ssr:false + error boundaries */}
      <PageContent />

      {/* Footer — server-rendered, always visible */}
      <Footer />
    </main>
  );
}
