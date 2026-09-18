import { Newspaper } from "lucide-react";
import { ComingSoon } from "@/components/sections/ComingSoon";

/** Blog — creator growth guides and animation tips ship in a later part. */
export default function Blog() {
  return (
    <ComingSoon
      icon={Newspaper}
      eyebrow="Blog"
      title="Blog — Coming Soon"
      description="Guides on growing a Hindi animation channel: thumbnail psychology, voiceover tricks, upload schedules and monetization — written for Indian creators."
      partNote="Arriving in a later part"
    />
  );
}
