import { DemoEmailCollectionDialog } from "@/components/dialogs/demo-email-collection";
import HeroBackground from "@/components/landing/hero-bg";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import {
  ChevronRight,
  FolderSymlink,
  HomeIcon,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default async function Home() {
  const cookieStore = await cookies();
  const hasFilledEarlyAccessForm =
    cookieStore.get("early_access")?.value === "0";
  return (
    <>
      <header className="flex w-screen px-5 items-center justify-center">
        <div className="max-w-[1100px] w-[90%] z-10 bg-white/80 backdrop-blur-xl top-10 fixed border rounded-full p-5 mx-auto flex items-center justify-between">
          <div className="flex gap-2">
            <Logo />
          </div>
          <nav className="flex-2 md:max-w-44 hidden md:block">
            <ul className="flex items-center justify-between pr-8">
              {["company", "pricing"].map((item, index) => (
                <li
                  className="cursor-not-allowed border-b-foreground capitalize"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <section className="relative h-[100vh] px-5 snap-start">
          <HeroBackground />
          <div className="relative w-full h-full flex items-center justify-center flex-col gap-8 md:text-center">
            <h1 className="text-[2.2rem] md:text-[5rem] md:leading-[1.2] max-w-250">
              <Balancer>Transaction Reconciliation Minus the Chaos</Balancer>
            </h1>
            <p className="text-xl md:text-[1.5rem] max-w-200">
              <Balancer>
                A fintech reconciliation tool built for high-volume payments. No
                spreadsheets. No guesswork. No late nights.
              </Balancer>
            </p>
            <div className="flex md:flex-row w-full md:w-fit md:items-center mt-4 gap-4 md:gap-12">
              <DemoEmailCollectionDialog>
                <Button className="scale-[1.1] md:scale-[1.3]">
                  Join early access
                </Button>
              </DemoEmailCollectionDialog>
              {hasFilledEarlyAccessForm ? (
                <Link href={ROUTES.overview}>
                  <Button
                    variant="ghost"
                    className="scale-[1.1] md:scale-[1.3]"
                  >
                    Try demo
                    <ChevronRight size={18} />
                  </Button>
                </Link>
              ) : (
                <DemoEmailCollectionDialog isUsingDemo>
                  <Button
                    variant="ghost"
                    className="scale-[1.1] md:scale-[1.3]"
                  >
                    Try demo
                    <ChevronRight size={18} />
                  </Button>
                </DemoEmailCollectionDialog>
              )}
            </div>
          </div>
        </section>

        <section className="h-screen bg-neutral-200/30 snap-start">
          <div className="px-10 py-32 max-w-[1200px] flex-col mx-auto flex justify-center h-full">
            <p className="text-[2rem] md:text-[4.5rem] leading-[1.35]! text-black font-[450]">
              <Balancer>
                Most fintech teams waste hours every day manually checking
                transactions across banks, telcos, and payment providers...
              </Balancer>
            </p>
          </div>
        </section>

        <section className="h-screen bg-primary snap-start">
          <div className="px-10 py-32 max-w-[1200px] flex-col mx-auto flex justify-center h-full">
            <p className="text-[2rem] md:text-[4.5rem] leading-[1.35]! text-primary-foreground font-[450]">
              <Balancer>
                We&apos;re building a reconciliation tool that centralizes your
                data, catches mismatches early, and gives your team control
                back...
              </Balancer>
            </p>
          </div>
        </section>

        <section className="h-screen snap-start">
          <div className="px-10 py-32 max-w-[1200px] flex-col mx-auto flex justify-center h-full">
            <h1 className="text-[2rem] md:text-[4.2rem] mb-10">
              Introducing Reecon
            </h1>
            <ol className="text-black text-[1.4rem] space-y-10 md:space-y-4 md:text-[3rem]">
              <li className="flex md:items-center flex-col md:flex-row gap-4">
                <ShieldCheck className="md:size-[42px] opacity-50" /> Built for
                auditability, security, and privacy
              </li>
              <li className="flex md:items-center flex-col md:flex-row gap-4">
                <ScrollText className="md:size-[42px] opacity-50" /> Safe
                storage of internal &amp; provider transactions
              </li>
              <li className="flex md:items-center flex-col md:flex-row gap-4">
                <FolderSymlink className="md:size-[42px] opacity-50" />{" "}
                Deterministic matching + exception handling
              </li>
            </ol>
          </div>
        </section>

        <section className="bg-primary h-screen snap-start">
          <div className="px-10 py-32 gap-10 max-w-[1200px] flex-col mx-auto flex justify-center h-full">
            <p className="text-[2rem] md:text-[4.5rem] leading-[1.35]! text-primary-foreground font-[450]">
              <Balancer>Ready to get started?</Balancer>
            </p>
            <div className="flex flex-col md:flex-row relative md:left-17.5 gap-4 md:gap-40">
              <DemoEmailCollectionDialog>
                <Button className="md:scale-[2] h-12 md:h-8">
                  Join early access
                </Button>
              </DemoEmailCollectionDialog>
              {hasFilledEarlyAccessForm ? (
                <Link href={ROUTES.overview}>
                  <Button variant="ghost" className="md:scale-[2] h-12 md:h-8">
                    Try demo
                    <ChevronRight size={18} />
                  </Button>
                </Link>
              ) : (
                <DemoEmailCollectionDialog isUsingDemo>
                  <Button
                    variant="ghost"
                    className="md:scale-[2] h-12 md:h-8 text-white"
                  >
                    Try demo
                    <ChevronRight size={18} />
                  </Button>
                </DemoEmailCollectionDialog>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
