import { Clock, FileText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHeader } from "@/components/sections/PageHeader";
import { GeneratorWizard } from "@/components/generator/GeneratorWizard";

const REASSURANCES = [
  { icon: Clock, label: "30–60 sec generation" },
  { icon: ShieldCheck, label: "No signup needed" },
  { icon: FileText, label: "PDF · DOCX · TXT export" },
];

/**
 * Generator — 7-step wizard, Gemini connection state and result preview.
 */
export default function Generator() {
  return (
    <>
      <PageHeader
        variant="peach"
        eyebrow="AI Script Generator"
        title="Create Your Viral Script"
        subtitle="7 aasaan steps — apni kahani customize karein, baaki AI sambhal lega."
      />

      <section className="texture-dots relative py-14 lg:py-20">
        <Container size="default" className="max-w-5xl">
          <FadeIn>
            <GeneratorWizard />
          </FadeIn>

          {/* Reassurance strip */}
          <FadeIn delay={0.1}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {REASSURANCES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary"
                >
                  <Icon className="size-4 text-accent-primary" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
