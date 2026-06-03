import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-14 md:py-20 bg-card/50 border-b border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Legal
                </p>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.05]">
                Terms of Service
              </h1>
              <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
                Last updated: May 2026
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">
                1. Acceptance of terms
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                By accessing and using South Spice, you accept and agree to be
                bound by these Terms of Service. If you do not agree, please
                discontinue use of the site.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">
                2. Use of content
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                All recipes, stories, photographs, and design elements on
                South Spice are provided for personal, non-commercial use. You
                may print recipes for your own kitchen use. You may not
                republish, redistribute, or commercially exploit any content
                without written permission.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">
                3. Recipe accuracy and safety
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                We make every effort to ensure recipes are accurate and safe.
                However, cooking involves heat, sharp tools, and raw
                ingredients. You are responsible for exercising appropriate
                caution, checking for allergies, and following safe food
                handling practices. South Spice is not liable for any injury,
                illness, or damage resulting from the use of our recipes or
                content.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">
                4. User-generated notes
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                Cooking notes, pantry selections, saved recipes, and meal plans
                are stored locally in your browser. You retain full ownership
                of your personal notes. We do not moderate, access, or claim
                rights over your locally stored content.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">
                5. Intellectual property
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                South Spice and its original content are the property of the
                site creators. Recipe instructions and editorial text are
                original works. AI-generated images are created for this
                publication and may not be reused without permission.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">
                6. Modifications to the service
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any
                part of South Spice at any time without notice. We are not
                liable if any feature becomes unavailable.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">
                7. Governing law
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                These Terms shall be governed by the laws applicable in the
                jurisdiction where South Spice operates. Any disputes shall
                be resolved through good-faith negotiation.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">
                8. Contact
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                For questions about these Terms, please use our{" "}
                <a href="/contact" className="text-primary hover:underline underline-offset-4">
                  Contact page
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
