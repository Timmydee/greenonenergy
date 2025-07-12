"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="relative bg-[var(--greenon-dark)] text-white py-20 overflow-hidden rounded-2xl mx-4 sm:mx-8 my-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/solar1.webp"
          alt="solar background"
          fill
          style={{ objectFit: "cover" }}
          quality={75}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Power Smarter?</h2>
        <p className="text-lg text-white mb-8">
          Calculate your solar needs in just 2 minutes and get matched with trusted vendors. No stress. No guesswork.
        </p>

        <Button
          size="lg"
          className="bg-white text-[var(--greenon-dark)] hover:bg-[var(--greenon-light)] transition font-medium px-8 py-5 text-base"
          onClick={() => router.push("/calculator")}
        >
          <Link href="/calculator">Try the Estimator</Link>
        </Button>
      </div>
    </section>
  );
}
