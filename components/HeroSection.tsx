import { CONTENT } from "@/constants/content";

export default function HeroSection() {
  return (
    <section className="flex h-auto min-h-[220px] w-full items-center bg-hero-bg md:h-[310px]">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6 xl:px-20">
        <h1 className="font-inter font-medium text-hero-text text-heading-1 text-center md:text-left">
          {CONTENT.hero.title}
        </h1>
      </div>
    </section>
  );
}
