import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default function Home() {
  return (
    <main className="md:max-w-[90vw] flex flex-col justify-between md:h-screen md:border-x mx-auto">
      <header className="md:flex items-center hidden justify-between p-10 pb-0">
        <h3 className="flex-1">reconn</h3>
        <nav className="flex-2 md:max-w-[500px]">
          <ul className="flex items-center justify-between">
            {["company", "pricing", "terms", "privacy", "contact"].map(
              (item, index) => (
                <li
                  className="border-b border-b-foreground capitalize"
                  key={index}
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </nav>
      </header>

      <div className="md:max-w-[900px] space-y-4 p-10">
        <h1 className="text-2xl md:text-[52px]">
          Reconciliation Minus the Chaos
        </h1>
        <p className="md:text-xl">
          <Balancer>
            Fintech reconciliation built for high-volume payments. No
            spreadsheets. No guesswork. No late nights.
          </Balancer>
        </p>
        <Link
          href="/overview"
          className="flex items-center gap-2 border-b w-fit border-b-black"
        >
          See Demo
          <ChevronRight size={18} />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-20 space-evenly mx-auto p-10">
        <div className="flex-1">
          <p className="md:text-xl">
            Most fintech teams waste hours every day manually checking
            transactions across banks, telcos, and payment providers. We’re
            building a lean reconciliation platform that centralizes your data,
            catches mismatches early, and gives your team control back.
          </p>
        </div>
        <div className="flex-1">
          <h3 className="md:text-xl mb-2 border-b w-fit border-b-black">
            Key Benefits
          </h3>
          <ol className="list-inside list-disc md:text-xl space-y-1">
            <li>Built for auditability, security, and privacy</li>
            <li>Single of truth for internal and provider transactions</li>
            <li>Fast, deterministic matching with exception handling</li>
            <li>Keep a fully auditable trail for compliance</li>
          </ol>
        </div>
      </div>

      <div className="md:border-y p-10">
        <h3 className="md:text-xl font-medium! mb-4">
          Join the Early Access List{" "}
          <span className="block md:inline md:text-xl opacity-50 font-normal">
            (Only limited spots available)
          </span>
        </h3>
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
      </div>
    </main>
  );
}
