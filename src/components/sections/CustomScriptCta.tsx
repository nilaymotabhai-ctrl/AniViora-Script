import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, MessageCircle, Send } from "lucide-react";
import {
  customScriptSchema,
  PROJECT_TYPES,
  type CustomScriptFormValues,
} from "@/lib/schemas";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

const LABEL_STYLES =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-text-light/70";

/**
 * "Need a Custom Script?" — cream 2-column CTA. Left: pitch copy.
 * Right: deep purple request card (RHF + Zod). Supabase persistence
 * arrives in Part 8; for now a success toast confirms submission.
 */
export function CustomScriptCta() {
  const [toastVisible, setToastVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomScriptFormValues>({
    resolver: zodResolver(customScriptSchema),
    defaultValues: { projectType: "Custom Script" },
  });

  const onSubmit = async (values: CustomScriptFormValues) => {
    // Part 8: persist to Supabase. For now, simulate a round-trip.
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.info("[AniViora Craft] Custom script request:", values);
    reset({ projectType: "Custom Script" });
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  return (
    <section id="custom-script" aria-label="Request a custom script" className="relative overflow-hidden py-20 lg:py-24">
      {/* Ambient decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-accent-primary/8 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------- Left: pitch ---------- */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Custom Scripts"
              title="Need a Custom Script?"
              className="max-w-none"
            />
            <FadeIn delay={0.1}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
                Want a completely personalized script for your specific story
                idea? Our team at AniViora Craft can help you craft the perfect
                viral script tailored to your channel.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-text-secondary">
                <span className="inline-flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
                    <Clock className="size-4" aria-hidden />
                  </span>
                  Response within 24 hours
                </span>
                <span
                  aria-hidden
                  className="hidden size-1 rounded-full bg-border-color sm:block"
                />
                <span className="inline-flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
                    <MessageCircle className="size-4" aria-hidden />
                  </span>
                  WhatsApp support available
                </span>
              </div>
            </FadeIn>
          </div>

          {/* ---------- Right: form card ---------- */}
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl border border-text-light/10 bg-bg-dark p-6 shadow-[0_24px_80px_-24px_rgba(45,27,61,0.55)] sm:p-8">
              <div
                aria-hidden
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/70 to-transparent"
              />

              <h3 className="font-heading text-h3 font-semibold text-text-light">
                Get a Custom Script
              </h3>
              <p className="mt-1.5 text-sm text-text-light/55">
                Fill the form — hum aapko 24 hours mein reply karenge.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-6 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cs-name" className={LABEL_STYLES}>
                      Name
                    </label>
                    <Input
                      variant="dark"
                      id="cs-name"
                      placeholder="Aapka naam"
                      autoComplete="name"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                  </div>
                  <div>
                    <label htmlFor="cs-email" className={LABEL_STYLES}>
                      Email
                    </label>
                    <Input
                      variant="dark"
                      id="cs-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cs-whatsapp" className={LABEL_STYLES}>
                      WhatsApp Number
                    </label>
                    <Input
                      variant="dark"
                      id="cs-whatsapp"
                      type="tel"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      error={errors.whatsapp?.message}
                      {...register("whatsapp")}
                    />
                  </div>
                  <div>
                    <label htmlFor="cs-type" className={LABEL_STYLES}>
                      Project Type
                    </label>
                    <Select
                      variant="dark"
                      id="cs-type"
                      error={errors.projectType?.message}
                      {...register("projectType")}
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="cs-message" className={LABEL_STYLES}>
                    Message
                  </label>
                  <Textarea
                    variant="dark"
                    id="cs-message"
                    rows={4}
                    placeholder="Apne story idea ke bare mein thoda batayein — genre, characters, length…"
                    error={errors.message?.message}
                    {...register("message")}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                >
                  <Send className="size-4.5" aria-hidden />
                  Send Request
                </Button>

                <p className="pt-1 text-center text-xs text-text-light/55">
                  Or WhatsApp us directly:{" "}
                  <a
                    href={SITE.whatsappChatHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-accent-primary transition-colors hover:text-text-light"
                  >
                    <WhatsAppIcon className="size-3.5" aria-hidden />
                    {SITE.phone}
                  </a>
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Success toast */}
      <Toast
        show={toastVisible}
        title="Request bhej di gayi!"
        message="We'll reply within 24 hours. Dhanyavaad for choosing AniViora Craft."
      />
    </section>
  );
}
