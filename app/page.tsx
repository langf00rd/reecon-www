import { DemoEmailCollectionDialog } from "@/components/dialogs/demo-email-collection";
import HeroBackground from "@/components/landing/hero-bg";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import { ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default async function Home() {
  const cookieStore = await cookies();
  const hasFilledEarlyAccessForm =
    cookieStore.get("early_access")?.value === "0";
  return (
    <>
      <HeroBackground />
      <main className="z-10 relative md:max-w-[90vw] h-screen flex flex-col justify-between md:h-screen mx-auto">
        <header className="md:flex items-center hidden justify-between p-5 md:p-10 pb-0">
          <div className="flex gap-2">
            <Logo />
          </div>
          <nav className="flex-2 md:max-w-44">
            <ul className="flex items-center justify-between">
              {["company", "pricing"].map((item, index) => (
                <li
                  className="border-b cursor-not-allowed border-b-foreground capitalize"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="md:max-w-225 py-32 px-5 space-y-4 md:p-10">
          <h1 className="text-2xl md:text-[52px]">
            Reconciliation Minus the Chaos
          </h1>
          <p className="md:text-xl">
            <Balancer>
              Fintech reconciliation built for high-volume payments. No
              spreadsheets. No guesswork. No late nights.
            </Balancer>
          </p>
          <div className="flex items-center mt-4 gap-4">
            <DemoEmailCollectionDialog>
              <Button>Join early access</Button>
            </DemoEmailCollectionDialog>
            {hasFilledEarlyAccessForm ? (
              <Link href={ROUTES.overview}>
                <Button variant="ghost">
                  Try demo
                  <ChevronRight size={18} />
                </Button>
              </Link>
            ) : (
              <DemoEmailCollectionDialog isUsingDemo>
                <Button variant="ghost">
                  Try demo
                  <ChevronRight size={18} />
                </Button>
              </DemoEmailCollectionDialog>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-20 space-evenly mx-auto p-5 md:p-10">
          <div className="flex-1">
            <p className="md:text-xl text-[14px]">
              <Balancer>
                Most fintech teams waste hours every day manually checking
                transactions across banks, telcos, and payment providers. We’re
                building a lean reconciliation platform that centralizes your
                data, catches mismatches early, and gives your team control
                back.
              </Balancer>
            </p>
          </div>
          <div className="flex-1">
            <ol className="list-inside list-disc md:text-xl text-[14px] space-y-1">
              <li>Built for auditability, security, and privacy</li>
              <li>Single of truth for internal and provider transactions</li>
              <li>Fast, deterministic matching with exception handling</li>
              <li>Keep a fully auditable trail for compliance</li>
            </ol>
          </div>
        </div>

        <footer className="flex justify-center items-center border-t py-5">
          <p>
            {APP_NAME} &copy; {new Date().getFullYear()}
          </p>
        </footer>

        {/*<div className="md:border-y p-5 md:p-10">
          <h3 className="md:text-xl font-medium! mb-4">Join the Early Access</h3>
          <form className="flex gap-2 items-center md:max-w-125">
            <Input
              required
              type="email"
              name="business_email"
              placeholder="Your business email"
            />
            <Button>
              Notify me <ChevronRight />
            </Button>
          </form>
          <small>
            We respect your privacy. No spam. Only updates about the launch.
          </small>
        </div>*/}
      </main>
    </>
  );
}
