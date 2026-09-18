import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clapperboard, Home } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Catch-all 404 route. */
export default function NotFound() {
  return (
    <section className="texture-dots">
      <Container
        size="narrow"
        className="flex min-h-[62svh] flex-col items-center justify-center py-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex size-20 items-center justify-center rounded-3xl bg-accent-primary/12 text-accent-primary">
            <Clapperboard className="size-9" strokeWidth={1.75} aria-hidden />
          </div>
          <p className="mt-8 font-heading text-h1 font-bold text-accent-primary">
            404
          </p>
          <h1 className="mt-2 text-h3">This scene was cut from the script</h1>
          <p className="mt-4 max-w-md text-text-secondary">
            The page you're looking for doesn't exist or may have moved. Let's
            get you back to the story.
          </p>
          <Link
            to={ROUTES.home}
            className={buttonVariants({ className: "mt-8" })}
          >
            <Home className="size-4" aria-hidden />
            Back to Home
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
