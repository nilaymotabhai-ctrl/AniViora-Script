import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Info, PencilLine, Wand2 } from "lucide-react";
import {
  EMPTY_SELECTIONS,
  OPTION_STEPS,
  TOTAL_STEPS,
  resolveOption,
  type OptionStepId,
  type WizardSelections,
} from "@/lib/generator-options";
import {
  generateStory,
  isGeminiConfigured,
  type StoryRequest,
} from "@/lib/ai/gemini";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { OptionCard } from "@/components/generator/OptionCard";
import { WizardProgress } from "@/components/generator/WizardProgress";
import { GeneratingOverlay, MIN_GENERATION_MS } from "@/components/generator/GeneratingOverlay";
import { ScriptResult } from "@/components/generator/ScriptResult";
import { GenerationError } from "@/components/generator/GenerationError";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Direction-aware slide variants for step transitions. */
const stepVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -56 }),
};

const NAV_LABELS = [...OPTION_STEPS.map((s) => s.navLabel), "Custom"];

const CUSTOM_STEP_SUBTITLE =
  "Koi khaas detail AI ko dena chahte hain? (Optional — khali bhi chhod sakte hain)";

/**
 * Complete 7-step script wizard flow:
 * wizard steps → 10s generating state → Step 1 API response screen.
 * Later prompt parts replace the temporary mock story content.
 */
export function GeneratorWizard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] =
    useState<WizardSelections>(EMPTY_SELECTIONS);
  const resultRef = useRef<HTMLDivElement>(null);

  const isOptionStep = step <= OPTION_STEPS.length;
  const currentStep = isOptionStep ? OPTION_STEPS[step - 1] : null;
  const currentValue = currentStep ? selections[currentStep.id] : null;
  const canProceed = currentStep ? currentValue !== null : true;

  // Bring the result into view (offset for the sticky navbar)
  useEffect(() => {
    if (generationResult !== null && !isGenerating) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [generationResult, isGenerating]);

  const select = (stepId: OptionStepId, optionId: string) =>
    setSelections((s) => ({ ...s, [stepId]: optionId }));

  const goBack = () => {
    if (step === 1) return;
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step < TOTAL_STEPS && canProceed) {
      setDirection(1);
      setStep((s) => s + 1);
      return;
    }
    if (step === TOTAL_STEPS) handleGenerate();
  };

  const handleGenerate = async () => {
    const payload: StoryRequest = {
      genre: resolveOption("genre", selections.genre)?.label,
      setting: resolveOption("setting", selections.setting)?.label,
      timePeriod: resolveOption("timePeriod", selections.timePeriod)?.label,
      length: resolveOption("length", selections.length)?.label,
      supernatural: resolveOption("supernatural", selections.supernatural)
        ?.label,
      theme: resolveOption("theme", selections.theme)?.label,
      customInstructions: selections.customInstructions.trim() || null,
    };

    console.log(
      "[AniViora Craft] Generating with selections:\n" +
        JSON.stringify(payload, null, 2)
    );

    // Missing API key → clear blocking error instead of a crash.
    if (!isGeminiConfigured()) {
      setGenerationResult(null);
      setGenerationError(
        "Gemini API key configure nahi hui hai. .env file (ya deployment environment variables) mein VITE_GEMINI_API_KEY set karke dobara try karein."
      );
      return;
    }

    setGenerationResult(null);
    setGenerationError(null);
    setIsGenerating(true);

    const minimumDelay = new Promise<void>((resolve) =>
      setTimeout(resolve, MIN_GENERATION_MS)
    );

    try {
      const text = await generateStory(payload);
      await minimumDelay;
      setGenerationResult(text);
    } catch (error) {
      await minimumDelay;
      console.error("[AniViora Craft] Gemini generation error:", error);
      setGenerationError(
        error instanceof Error
          ? error.message
          : "Ek unexpected error aa gaya. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const resetWizard = () => {
    setSelections(EMPTY_SELECTIONS);
    setDirection(-1);
    setStep(1);
    setGenerationResult(null);
    setGenerationError(null);
    setIsGenerating(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={resultRef} className="scroll-mt-24">
      {!isGenerating && generationResult === null && generationError === null && (
        <div className="rounded-3xl border border-border-color bg-bg-card p-6 shadow-card-hover md:p-10">
          <WizardProgress
            current={step}
            total={TOTAL_STEPS}
            labels={NAV_LABELS}
          />

          {/* ---------- Animated step content ---------- */}
          <div className="mt-8 min-h-[380px] md:min-h-[420px]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: EASE }}
              >
                {currentStep ? (
                  <>
                    {/* Step heading */}
                    <h2 className="font-heading text-h3 font-semibold text-text-primary">
                      {currentStep.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-text-secondary md:text-base">
                      {currentStep.subtitle}
                    </p>

                    {/* Options grid */}
                    <div
                      role="radiogroup"
                      aria-label={currentStep.title}
                      className={cn(
                        "mt-7 grid grid-cols-2 gap-3.5",
                        currentStep.options.length > 6
                          ? "md:grid-cols-3 lg:grid-cols-4"
                          : "md:grid-cols-3",
                        currentStep.options.length === 4 &&
                          "md:grid-cols-2 lg:grid-cols-4"
                      )}
                    >
                      {currentStep.options.map((option) => (
                        <OptionCard
                          key={option.id}
                          option={option}
                          selected={currentValue === option.id}
                          onSelect={() => select(currentStep.id, option.id)}
                        />
                      ))}
                    </div>

                    {/* Optional note (length step) */}
                    {currentStep.note && (
                      <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-bg-info px-4 py-3">
                        <Info
                          className="mt-0.5 size-4 shrink-0 text-accent-primary"
                          aria-hidden
                        />
                        <p className="text-sm text-text-secondary">
                          {currentStep.note}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Step 7: Custom instructions */}
                    <h2 className="font-heading text-h3 font-semibold text-text-primary">
                      <PencilLine
                        className="mr-2 inline-block size-6 text-accent-primary"
                        aria-hidden
                      />
                      Custom Instructions
                    </h2>
                    <p className="mt-1.5 text-sm text-text-secondary md:text-base">
                      {CUSTOM_STEP_SUBTITLE}
                    </p>

                    <div className="mt-7">
                      <Textarea
                        id="wizard-custom"
                        rows={6}
                        maxLength={500}
                        value={selections.customInstructions}
                        onChange={(e) =>
                          setSelections((s) => ({
                            ...s,
                            customInstructions: e.target.value,
                          }))
                        }
                        placeholder="Jaise: Hero ek 12 saal ka hoshyar ladka ho, jo jungle mein ek purani gufa dhoondhta hai. Climax mein bada twist chahiye…"
                        aria-label="Custom instructions for your script"
                      />
                      <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
                        <span>
                          Jitna specific likhenge, utna behtar script banega.
                        </span>
                        <span className="tabular-nums">
                          {selections.customInstructions.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Selection summary */}
                    <div className="mt-6 rounded-2xl bg-bg-info p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                        Aapki kahani
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {OPTION_STEPS.map((s) => {
                          const opt = resolveOption(s.id, selections[s.id]);
                          return (
                            <span
                              key={s.id}
                              className="rounded-full border border-border-color bg-bg-card px-3 py-1.5 text-xs font-semibold text-text-primary"
                            >
                              <span className="text-text-secondary">
                                {s.navLabel}:
                              </span>{" "}
                              {opt?.label ?? "—"}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ---------- Navigation ---------- */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-border-color pt-6">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={step === 1}
              aria-label="Previous step"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Button>

            <span className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
              {!canProceed && (
                <span className="text-xs font-medium text-text-secondary">
                  Aage badhne ke liye ek option chunein
                </span>
              )}
              {step < TOTAL_STEPS ? (
                <Button
                  onClick={goNext}
                  disabled={!canProceed}
                  aria-label="Next step"
                >
                  Next
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              ) : (
                <Button onClick={goNext} size="lg" aria-label="Generate script">
                  <Wand2 className="size-5" aria-hidden />
                  Generate Script
                </Button>
              )}
            </span>
          </div>
        </div>
      )}

      {/* ---------- Generation error ---------- */}
      {!isGenerating && generationError !== null && (
        <GenerationError
          message={generationError}
          onRetry={() => {
            setGenerationError(null);
            void handleGenerate();
          }}
          onEdit={() => setGenerationError(null)}
        />
      )}

      {/* ---------- Result ---------- */}
      {!isGenerating && generationResult !== null && (
        <ScriptResult scriptText={generationResult} onReset={resetWizard} />
      )}

      {/* ---------- Generating overlay ---------- */}
      <AnimatePresence>
        {isGenerating && <GeneratingOverlay />}
      </AnimatePresence>
    </div>
  );
}
