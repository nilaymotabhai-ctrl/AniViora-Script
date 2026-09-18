import { LayoutGrid } from "lucide-react";
import { ComingSoon } from "@/components/sections/ComingSoon";

/** Features — the full feature breakdown page ships in Part 3. */
export default function Features() {
  return (
    <ComingSoon
      icon={LayoutGrid}
      eyebrow="Features"
      title="Features — Coming Soon"
      description="A deep dive into everything the generator produces: scene-by-scene structure, dialogue, voiceover cues, hook engineering and runtime control. Six headline features are already live on the Home page."
      partNote="Full page arriving in Part 4"
    />
  );
}
