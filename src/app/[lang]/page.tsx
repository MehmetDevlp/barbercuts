import { getDictionary, Locale } from "@/utils/i18n";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { Locations } from "@/components/sections/Locations";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang as Locale);

  return (
    <main>
      <Hero />
      {/* <Services /> Removed as per request */}
      <About />
      <Gallery />
      <Testimonials />
      <Locations />
    </main>
  );
}
