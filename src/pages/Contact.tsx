import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import {
  contactSchema,
  CONTACT_SUBJECTS,
  type ContactFormValues,
} from "@/lib/schemas";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";

const SOCIAL_ICONS: Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  YouTube: YoutubeIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
};

interface InfoItem {
  icon: LucideIcon;
  title: string;
  lines: string[];
  href?: string;
}

const INFO_ITEMS: InfoItem[] = [
  {
    icon: MapPin,
    title: "Address",
    lines: [
      "AniViora Craft, Baldeogarh, Tikamgarh District,",
      "Madhya Pradesh 472115, India",
    ],
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    lines: [SITE.phone],
    href: SITE.whatsappChatHref,
  },
  {
    icon: Mail,
    title: "Email",
    lines: [SITE.email],
    href: SITE.emailHref,
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon - Sat: 10 AM - 7 PM", "(Sunday Closed)"],
  },
];

const LABEL_STYLES =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary";

/** Contact — info card + validated message form (send via Supabase in Part 8). */
export default function Contact() {
  const [toastVisible, setToastVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "General Inquiry" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Part 8: persist to Supabase. For now, simulate a round-trip.
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.info("[AniViora Craft] Contact message:", values);
    reset({ subject: "General Inquiry" });
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="We'd love to hear from you."
      />

      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            {/* ---------- Left: Contact information ---------- */}
            <FadeIn className="h-full">
              <Card padding="lg" className="flex h-full flex-col">
                <h2 className="font-heading text-h3 font-semibold text-text-primary">
                  Contact Information
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Koi bhi sawaal ho — hum jaldi reply karte hain. Reach out
                  through any channel below.
                </p>

                <ul className="mt-7 flex-1 space-y-5">
                  {INFO_ITEMS.map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                        <item.icon className="size-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                          {item.title}
                        </span>
                        {item.lines.map((line) =>
                          item.href ? (
                            <a
                              key={line}
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                              className="mt-0.5 block text-sm font-medium text-text-primary transition-colors hover:text-accent-primary"
                            >
                              {line}
                            </a>
                          ) : (
                            <span
                              key={line}
                              className="mt-0.5 block text-sm font-medium text-text-primary"
                            >
                              {line}
                            </span>
                          )
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Social */}
                <div className="mt-8 border-t border-border-color pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                    Follow Us
                  </p>
                  <ul className="mt-3.5 flex items-center gap-3">
                    {SOCIAL_LINKS.map(({ label, href }) => {
                      const Icon = SOCIAL_ICONS[label];
                      return (
                        <li key={label}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${SITE.name} on ${label}`}
                            className="flex size-10 items-center justify-center rounded-full border border-border-color bg-bg-card text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary hover:bg-accent-primary hover:text-text-light"
                          >
                            <Icon className="size-4" aria-hidden />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Card>
            </FadeIn>

            {/* ---------- Right: Contact form ---------- */}
            <FadeIn delay={0.1} className="h-full">
              <Card padding="lg" className="h-full shadow-card-hover">
                <h2 className="font-heading text-h3 font-semibold text-text-primary">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Fill the form — we reply within 24 hours.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="mt-6 space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-name" className={LABEL_STYLES}>
                        Name
                      </label>
                      <Input
                        id="ct-name"
                        placeholder="Aapka naam"
                        autoComplete="name"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                    </div>
                    <div>
                      <label htmlFor="ct-email" className={LABEL_STYLES}>
                        Email
                      </label>
                      <Input
                        id="ct-email"
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
                      <label htmlFor="ct-whatsapp" className={LABEL_STYLES}>
                        WhatsApp Number
                      </label>
                      <Input
                        id="ct-whatsapp"
                        type="tel"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        error={errors.whatsapp?.message}
                        {...register("whatsapp")}
                      />
                    </div>
                    <div>
                      <label htmlFor="ct-subject" className={LABEL_STYLES}>
                        Subject
                      </label>
                      <Select
                        id="ct-subject"
                        error={errors.subject?.message}
                        {...register("subject")}
                      >
                        {CONTACT_SUBJECTS.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ct-message" className={LABEL_STYLES}>
                      Message
                    </label>
                    <Textarea
                      id="ct-message"
                      rows={5}
                      placeholder="Apna sawaal ya idea yahan likhein…"
                      error={errors.message?.message}
                      {...register("message")}
                    />
                  </div>

                  <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
                    <Send className="size-4.5" aria-hidden />
                    Send Message
                  </Button>
                </form>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>

      <Toast
        show={toastVisible}
        title="Message bhej diya gaya!"
        message="We'll get back to you within 24 hours. Dhanyavaad!"
      />
    </>
  );
}
