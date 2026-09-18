import type { LucideIcon } from "lucide-react";
import {
  Ban,
  Bell,
  BookOpen,
  Building,
  Castle,
  Clapperboard,
  Clock,
  CloudFog,
  Coins,
  Crown,
  Droplets,
  Flame,
  Gem,
  Ghost,
  Handshake,
  Heart,
  HeartCrack,
  Hourglass,
  House,
  Landmark,
  Moon,
  Mountain,
  ScrollText,
  SearchCheck,
  Sparkles,
  Sprout,
  Swords,
  Timer,
  TreePine,
  Users,
  Wand2,
} from "lucide-react";

/* ---------- Types ---------- */

export type OptionStepId =
  | "genre"
  | "setting"
  | "timePeriod"
  | "length"
  | "supernatural"
  | "theme";

export interface WizardOption {
  id: string;
  label: string;
  /** Devanagari label for the bilingual flavor. */
  hindi?: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export interface OptionStep {
  id: OptionStepId;
  /** Short label for the progress indicator. */
  navLabel: string;
  title: string;
  subtitle: string;
  /** Optional info pill shown under the options grid. */
  note?: string;
  options: WizardOption[];
}

export interface WizardSelections {
  genre: string | null;
  setting: string | null;
  timePeriod: string | null;
  length: string | null;
  supernatural: string | null;
  theme: string | null;
  customInstructions: string;
}

export const EMPTY_SELECTIONS: WizardSelections = {
  genre: null,
  setting: null,
  timePeriod: null,
  length: null,
  supernatural: null,
  theme: null,
  customInstructions: "",
};

/* ---------- Step 1: Genre ---------- */

const GENRE_OPTIONS: WizardOption[] = [
  {
    id: "horror",
    label: "Horror",
    hindi: "डरावनी",
    description: "Darauni kahaniyan jo viewers ko end tak baandhe rakhein",
    icon: Ghost,
  },
  {
    id: "mystery",
    label: "Mystery",
    hindi: "रहस्य",
    description: "Secrets, twists aur suspense se bhari thril",
    icon: SearchCheck,
  },
  {
    id: "emotional",
    label: "Emotional",
    hindi: "भावुक",
    description: "Dil ko chhoo jaane wale, yaadgar pal",
    icon: Heart,
  },
  {
    id: "fantasy",
    label: "Fantasy",
    hindi: "काल्पनिक",
    description: "Jaadu, alaukik duniya aur anokhe characters",
    icon: Sparkles,
  },
  {
    id: "moral",
    label: "Moral",
    hindi: "शिक्षाप्रद",
    description: "Entertaining kahani ke saath ek achhi seekh",
    icon: BookOpen,
  },
  {
    id: "king",
    label: "King Story",
    hindi: "राजा",
    description: "Rajmahal, takht aur shaahi conspiracies ka drama",
    icon: Crown,
  },
];

/* ---------- Step 2: Setting ---------- */

const SETTING_OPTIONS: WizardOption[] = [
  {
    id: "gaon",
    label: "Gaon",
    hindi: "गाँव",
    description: "Mitti ki khushboo, chauraha aur puraani parampara",
    icon: House,
  },
  {
    id: "jungle",
    label: "Jungle",
    hindi: "जंगल",
    description: "Ghane ped, raaz aur khatron se bhara safar",
    icon: TreePine,
  },
  {
    id: "mahal",
    label: "Mahal",
    hindi: "महल",
    description: "Shahi andaz, bade raaz aur takht ki jung",
    icon: Castle,
  },
  {
    id: "pahaad",
    label: "Pahaad",
    hindi: "पहाड़",
    description: "Unchi chotiyaan, khaki vaadiyaan aur tanhai",
    icon: Mountain,
  },
  {
    id: "haveli",
    label: "Haveli",
    hindi: "हवेली",
    description: "Purani deewaron mein dabi awaazein aur itihaas",
    icon: Landmark,
  },
  {
    id: "mandir",
    label: "Mandir",
    hindi: "मंदिर",
    description: "Astha, chamatkar aur dev shakti ka kendra",
    icon: Bell,
  },
  {
    id: "shahar",
    label: "Shahar",
    hindi: "शहर",
    description: "Modern duniya, bheed aur shehri zindagi ke raaz",
    icon: Building,
  },
  {
    id: "nadi",
    label: "Nadi Kinare",
    hindi: "नदी किनारे",
    description: "Behta paani, kinaare ki shaanti aur gehra rahasya",
    icon: Droplets,
  },
];

/* ---------- Step 3: Time Period ---------- */

const TIME_PERIOD_OPTIONS: WizardOption[] = [
  {
    id: "prachin",
    label: "Prachin Kaal",
    hindi: "प्राचीन काल",
    description: "Devtaon, rishiyon aur pracheen shaktiyon ka yug",
    icon: Hourglass,
  },
  {
    id: "madhya",
    label: "Madhya Kaal",
    hindi: "मध्य काल",
    description: "Rajwaadon, yoddhaon aur talwaron ka daur",
    icon: Swords,
  },
  {
    id: "modern-gaon",
    label: "Modern Village",
    hindi: "आधुनिक गाँव",
    description: "Aaj ka gaon — smartphone bhi, sanskar bhi",
    icon: Sprout,
  },
  {
    id: "present",
    label: "Present Day",
    hindi: "आज का समय",
    description: "Current city life — fresh aur bilkul relatable",
    icon: Building,
  },
];

/* ---------- Step 4: Script Length ---------- */

const LENGTH_OPTIONS: WizardOption[] = [
  {
    id: "10-15",
    label: "10–15 min",
    hindi: "छोटी कहानी",
    description: "Quick episode — fast pacing, tight structure",
    icon: Timer,
  },
  {
    id: "20-30",
    label: "20–30 min",
    hindi: "मध्यम",
    description: "Balanced episode with deeper character moments",
    icon: Clock,
  },
  {
    id: "35-41",
    label: "35–41 min",
    hindi: "फुल एपिसोड",
    description: "Complete episode — best for monetization & retention",
    icon: Clapperboard,
    badge: "Popular",
  },
];

/* ---------- Step 5: Supernatural Element ---------- */

const SUPERNATURAL_OPTIONS: WizardOption[] = [
  {
    id: "bhoot",
    label: "Bhoot",
    hindi: "भूत",
    description: "Ek rooh jo kuch kehna chahti hai — classic horror",
    icon: Ghost,
  },
  {
    id: "aatma",
    label: "Aatma",
    hindi: "आत्मा",
    description: "Bhatakti aatma, adhura kaam aur mukti ki kahani",
    icon: CloudFog,
  },
  {
    id: "shraap",
    label: "Shraap",
    hindi: "श्राप",
    description: "Purana curse jo peedhiyon tak peecha karta hai",
    icon: ScrollText,
  },
  {
    id: "jaadui-vastu",
    label: "Jaadui Vastu",
    hindi: "जादुई वस्तु",
    description: "Ek magical object jo sab kuch badal deta hai",
    icon: Gem,
  },
  {
    id: "jaadu-tona",
    label: "Jaadu-Tona",
    hindi: "जादू-टोना",
    description: "Kala jaadu, tantrik vidya aur dark rituals",
    icon: Moon,
  },
  {
    id: "chamatkari-shakti",
    label: "Chamatkari Shakti",
    hindi: "चमत्कारी शक्ति",
    description: "Divine power jo sabke haalat palat deti hai",
    icon: Wand2,
  },
  {
    id: "none",
    label: "Koi Nahi",
    hindi: "कोई नहीं",
    description: "Pure realistic drama — no supernatural elements",
    icon: Ban,
  },
];

/* ---------- Step 6: Core Theme ---------- */

const THEME_OPTIONS: WizardOption[] = [
  {
    id: "laalach",
    label: "Laalach",
    hindi: "लालच",
    description: "Greed jo rishton aur imaan ko todti hai",
    icon: Coins,
  },
  {
    id: "jalan",
    label: "Jalan",
    hindi: "जलन",
    description: "Jealousy jo doston ko dushman banati hai",
    icon: Flame,
  },
  {
    id: "badla",
    label: "Badla",
    hindi: "बदला",
    description: "Revenge — zakhmon ka hisaab, barabar",
    icon: Swords,
  },
  {
    id: "dhokha",
    label: "Dhokha",
    hindi: "धोखा",
    description: "Betrayal apno ke haathon — sabse gehra zakhm",
    icon: HeartCrack,
  },
  {
    id: "dosti",
    label: "Dosti",
    hindi: "दोस्ती",
    description: "Friendship jo har musibat se jeet leti hai",
    icon: Handshake,
  },
  {
    id: "parivaar",
    label: "Parivaar",
    hindi: "परिवार",
    description: "Family — pyaar, balidan aur tootne-bandhne wale rishte",
    icon: Users,
  },
];

/* ---------- Wizard config ---------- */

export const OPTION_STEPS: OptionStep[] = [
  {
    id: "genre",
    navLabel: "Genre",
    title: "Choose Your Genre",
    subtitle: "Apni kahani ka mood chunein — isse script ka tone set hoga",
    options: GENRE_OPTIONS,
  },
  {
    id: "setting",
    navLabel: "Setting",
    title: "Choose Your Setting",
    subtitle: "Kahani kahan ghattit hogi? Location atmosphere banati hai",
    options: SETTING_OPTIONS,
  },
  {
    id: "timePeriod",
    navLabel: "Era",
    title: "Choose a Time Period",
    subtitle: "Kahani kis daur ki hai? Era se costumes aur world banta hai",
    options: TIME_PERIOD_OPTIONS,
  },
  {
    id: "length",
    navLabel: "Length",
    title: "Choose Script Length",
    subtitle: "Video kitni lambi hogi? Retention ke hisaab se chunein",
    note: "Characters AI khud choose karega — story ke hisaab se perfect cast.",
    options: LENGTH_OPTIONS,
  },
  {
    id: "supernatural",
    navLabel: "Element",
    title: "Choose a Supernatural Element",
    subtitle: "Kahani mein kaunsa alaukik tadka hoga?",
    options: SUPERNATURAL_OPTIONS,
  },
  {
    id: "theme",
    navLabel: "Theme",
    title: "Choose a Core Theme",
    subtitle: "Kahani ka dil — kaunsa emotion center mein hoga?",
    options: THEME_OPTIONS,
  },
];

export const TOTAL_STEPS = OPTION_STEPS.length + 1; // +1 = custom instructions

/** Resolve a selected option id to its full option object. */
export function resolveOption(
  stepId: OptionStepId,
  optionId: string | null
): WizardOption | null {
  if (!optionId) return null;
  const step = OPTION_STEPS.find((s) => s.id === stepId);
  return step?.options.find((o) => o.id === optionId) ?? null;
}
