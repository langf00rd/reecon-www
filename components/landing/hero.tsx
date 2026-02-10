"use client";

import { ROUTES } from "@/lib/routes";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Balancer from "react-wrap-balancer";
import { DemoEmailCollectionDialog } from "../dialogs/demo-email-collection";
import { Button } from "../ui/button";
import HeroBackground from "./hero-bg";

export default function Hero(props: { hasFilledEarlyAccessForm?: boolean }) {
  useEffect(() => {
    const landingMainElement = document.getElementById("landing_main");
    const heroImage = document.getElementById("landing_main_hero_img");

    const initial = {
      perspective: 1200,
      translateY: 80,
      rotateX: 26,
      rotateY: 0,
      scale: 0.95,
    };

    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const handleScroll = () => {
      if (!landingMainElement || !heroImage) return;

      const scrollY = landingMainElement.scrollTop;
      const maxScroll = 400;
      const rawProgress = Math.min(scrollY / maxScroll, 1);
      const progress = easeOutCubic(rawProgress);

      const perspective = initial.perspective - initial.perspective * progress;
      const translateY = initial.translateY - initial.translateY * progress;
      const rotateX = initial.rotateX - initial.rotateX * progress;
      const rotateY = initial.rotateY - initial.rotateY * progress;
      const scale = initial.scale + (1 - initial.scale) * progress;

      heroImage.style.transform = `perspective(${perspective}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    };

    landingMainElement?.addEventListener("scroll", handleScroll);

    return () => {
      landingMainElement?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="pt-52 relative min-h-[100vh] px-5 snap-start">
      <HeroBackground />
      <div className="relative w-full h-full flex items-center justify-center flex-col gap-8 md:text-center">
        <h1 className="text-[2.2rem] md:text-[5rem] md:leading-[1.2] max-w-250">
          <Balancer>An Enterprise Transaction Reconciliation Software</Balancer>
        </h1>
        <p className="text-xl md:text-[1.5rem] max-w-200">
          <Balancer>
            Automatically match internal transactions with bank, telco, and PSP
            statements. Identify and isolate unmatched records, and reconcile
            faster without manual checks leading to errors and oversight
          </Balancer>
        </p>
        <div className="flex md:flex-row w-full md:w-fit md:items-center mt-4 gap-4 md:gap-12">
          <DemoEmailCollectionDialog>
            <Button className="scale-[1.1] md:scale-[1.3]">
              Join early access
            </Button>
          </DemoEmailCollectionDialog>
          {props.hasFilledEarlyAccessForm ? (
            <Link href={ROUTES.overview}>
              <Button variant="ghost" className="scale-[1.1] md:scale-[1.3]">
                Try demo
                <ChevronRight size={18} />
              </Button>
            </Link>
          ) : (
            <DemoEmailCollectionDialog isUsingDemo>
              <Button variant="ghost" className="scale-[1.1] md:scale-[1.3]">
                Try demo
                <ChevronRight size={18} />
              </Button>
            </DemoEmailCollectionDialog>
          )}
        </div>
      </div>
      <Image
        id="landing_main_hero_img"
        className="relative max-w-[1200px] relative -top-20 mx-auto"
        src="/assets/landing/matched-records.png"
        width={1920}
        height={1080}
        alt="screenshot of dashboard matched recon records"
        style={{
          transform: `perspective(1200px) translateY(80px) rotateX(26deg) rotateY(0deg) scale(0.95)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      />
    </section>
  );
}
