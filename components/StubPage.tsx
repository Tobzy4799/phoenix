import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StubPage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <Navbar />
      <section className="min-h-[60vh] flex items-center justify-center px-7">
        <div className="text-center max-w-[600px]">
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-ember font-semibold">
            {eyebrow}
          </span>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.04] tracking-tight mt-4">
            {title}
          </h1>
          <p className="mt-5 text-ash text-[1.02rem]">
            This page is coming soon.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}