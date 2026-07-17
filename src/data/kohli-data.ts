// ============================================================================
// KING KOHLI: The Journey — Data Constants
// Compiled from Wikipedia, ESPNcricinfo, and official IPL site.
// Current as of July 2026. Do NOT invent or modify numbers beyond this data.
// ============================================================================

export interface Milestone {
  year: number;
  date?: string;
  title: string;
  tone?: "solemn";
  videoId?: string; // YouTube video ID for inline embed in timeline
}

export interface FormatStats {
  matches: number;
  runs: number;
  average?: number;
  centuries: number;
  double_centuries?: number;
  best_score?: string;
  debut?: string;
  last_match?: string;
  status: string;
  note?: string;
  best_season_runs?: string;
  orange_caps?: number[];
  titles_won?: number[];
  team?: string;
}

export interface Award {
  year: string | string[] | number;
  award: string;
}

export interface WorldTitle {
  year: number;
  event: string;
  role: string;
}

export const PROFILE = {
  name: "Virat Kohli",
  born: "November 5, 1988, Delhi, India",
  birthdate: "Nov 5, 1988",
  role: "Right-handed batter, occasional right-arm medium pacer",
  status: "Active in ODIs; retired from Test and T20I cricket",
  ipl_team: "Royal Challengers Bengaluru (only team, since 2008)",
} as const;

export const LIFE_MILESTONES: Milestone[] = [
  { year: 1988, date: "Nov 5, 1988", title: "Born in Delhi, India" },
  {
    year: 1997,
    title:
      "Joined West Delhi Cricket Academy at age 9 under coach Rajkumar Sharma",
  },
  {
    year: 2006,
    date: "December 2006",
    title:
      "Father, Prem Kohli, passed away during Kohli's Ranji Trophy match; Kohli returned to bat the next day",
    tone: "solemn",
  },
  {
    year: 2008,
    title: "Captained India to the ICC U-19 World Cup title",
  },
  {
    year: 2008,
    date: "Aug 18, 2008",
    title: "ODI debut vs Sri Lanka, Dambulla",
  },
  {
    year: 2008,
    title: "Signed by Royal Challengers Bangalore for IPL's inaugural season",
  },
  {
    year: 2010,
    date: "June 12, 2010",
    title: "T20I debut vs Zimbabwe, Harare",
  },
  {
    year: 2011,
    date: "June 20, 2011",
    title: "Test debut vs West Indies, Kingston",
  },
  {
    year: 2011,
    title: "Part of India's 2011 ODI World Cup-winning squad",
  },
  { year: 2013, title: "Won the ICC Champions Trophy with India" },
  { year: 2013, title: "Received the Arjuna Award" },
  {
    year: 2016,
    title:
      "Player of the Tournament, ICC World T20; scored 973 IPL runs in a season (record)",
  },
  {
    year: 2017,
    title:
      "Received the Padma Shri, India's fourth-highest civilian award",
  },
  {
    year: 2018,
    title:
      "Became No.1 ranked Test batsman; first Indian to be No.1 in all three formats",
  },
  {
    year: 2018,
    title:
      "Led India to first-ever Test series win in Australia (2018-19)",
  },
  {
    year: 2018,
    title:
      "Received the Rajiv Gandhi Khel Ratna, India's highest sporting honour",
  },
  {
    year: 2019,
    date: "2019",
    title: "Career-best Test score of 254* vs South Africa, Pune",
  },
  {
    year: 2022,
    title:
      "Maiden T20I century at the Asia Cup, ending a 1,000+ day century drought",
  },
  {
    year: 2023,
    title:
      "Player of the Tournament at the 2023 ODI World Cup (home soil), 765 runs in the tournament",
  },
  {
    year: 2023,
    title:
      "50th ODI century in the 2023 World Cup semi-final, surpassing Sachin Tendulkar's record",
    videoId: "", // Drop YouTube ID for 50th century highlight
  },
  {
    year: 2024,
    title:
      "Won the 2024 T20 World Cup; scored match-winning 76 in the final; retired from T20Is after the win",
    videoId: "", // Drop YouTube ID for T20 WC final highlight
  },
  {
    year: 2025,
    title:
      "Won the ICC Champions Trophy 2025; fastest to 14,000 ODI runs during the tournament",
  },
  { year: 2025, title: "Retired from Test cricket" },
  {
    year: 2025,
    title:
      "Won the IPL title for the first time with RCB, on his 18th attempt (as a senior player, under Rajat Patidar's captaincy)",
    videoId: "", // Drop YouTube ID for 2025 IPL title highlight
  },
  {
    year: 2026,
    date: "May 31, 2026",
    title:
      "Won back-to-back IPL titles with RCB, beating Gujarat Titans by 5 wickets in the final at Ahmedabad; scored 75* off 42 balls (his fastest IPL fifty) and was named Player of the Match. RCB became only the third team ever to defend the IPL title, after CSK and MI.",
    videoId: "", // Drop YouTube ID for 2026 IPL final highlight
  },
];

export const STATS = {
  test: {
    matches: 123,
    runs: 9230,
    centuries: 30,
    double_centuries: 7,
    best_score: "254*",
    debut: "June 20, 2011 vs West Indies, Kingston",
    last_match: "January 3-5, 2025 vs Australia, Sydney",
    status: "Retired",
  },
  odi: {
    matches: 302,
    runs: 14181,
    average: 57.88,
    centuries: 54,
    debut: "Aug 18, 2008 vs Sri Lanka, Dambulla",
    last_match: "Jan 18, 2026 vs New Zealand, Indore (still active)",
    status: "Active",
    note: "First player to score 50 ODI centuries; fastest to 8,000/10,000/11,000/14,000 ODI runs",
  },
  t20i: {
    matches: 125,
    runs: 4188,
    average: 48.7,
    centuries: 1,
    debut: "June 12, 2010 vs Zimbabwe, Harare",
    status: "Retired (after 2024 T20 World Cup win)",
  },
  ipl: {
    team: "Royal Challengers Bengaluru (only team, all seasons since 2008)",
    matches: 267,
    runs: 8661,
    centuries: 8,
    best_score: "113",
    best_season_runs: "973 runs in 2016 (record)",
    orange_caps: [2016, 2024],
    titles_won: [2025, 2026],
    status: "Active",
    note: "All-time leading run-scorer in IPL history; only player to have played for one franchise across all seasons; RCB won back-to-back titles in 2025 and 2026.",
  },
  career_totals: {
    international_centuries: 85,
    note: "Second-most international centuries all-time, behind Sachin Tendulkar's 100",
  },
} as const;

export const WORLD_TITLES: WorldTitle[] = [
  { year: 2008, event: "ICC U-19 World Cup", role: "Captain" },
  { year: 2011, event: "ICC ODI World Cup", role: "Squad member" },
  { year: 2013, event: "ICC Champions Trophy", role: "Squad member" },
  {
    year: 2024,
    event: "ICC T20 World Cup",
    role: "Player of the Match in final (76 runs)",
  },
  { year: 2025, event: "ICC Champions Trophy", role: "Squad member" },
  {
    year: 2025,
    event: "IPL title (RCB)",
    role: "Senior player, first IPL title",
  },
  {
    year: 2026,
    event: "IPL title (RCB)",
    role: "Player of the Match in the final, 75* off 42 balls — back-to-back title",
  },
];

export const AWARDS: Award[] = [
  { year: 2013, award: "Arjuna Award" },
  { year: 2017, award: "Padma Shri" },
  {
    year: 2018,
    award: "Rajiv Gandhi Khel Ratna Award (India's highest sporting honour)",
  },
  {
    year: "2011-2020",
    award: "ICC Men's Cricketer of the Decade (Sir Garfield Sobers Award)",
  },
  { year: "2011-2020", award: "ICC Men's ODI Cricketer of the Decade" },
  {
    year: ["2017", "2018"],
    award: "ICC Cricketer of the Year (Sir Garfield Sobers Trophy)",
  },
  {
    year: ["2012", "2017", "2018", "2023"],
    award: "ICC ODI Cricketer of the Year",
  },
  { year: 2018, award: "ICC Test Cricketer of the Year" },
  { year: 2019, award: "ICC Spirit of Cricket Award" },
  {
    year: ["2012", "2014", "2016", "2017", "2018", "2019", "2023"],
    award: "ICC ODI Team of the Year (captain 2016-2019)",
  },
  {
    year: 2018,
    award: "Named to TIME's 100 Most Influential People list",
  },
];

// HUD display stats that cycle in the hero section
export const HUD_STATS = [
  { label: "ODI CENTURIES", value: "54" },
  { label: "HIGHEST SCORE", value: "254*" },
  { label: "INT'L CENTURIES", value: "85" },
  { label: "ODI RUNS", value: "14,181" },
  { label: "TEST RUNS", value: "9,230" },
  { label: "IPL RUNS", value: "8,661" },
] as const;

// Poll options for "Best Kohli knock ever?"
export const POLL_OPTIONS = [
  "82* vs Australia, T20 WC 2022",
  "183 vs Pakistan, Asia Cup 2012",
  "254* vs South Africa, Pune 2019",
  "76 vs South Africa, T20 WC Final 2024",
  "75* vs Gujarat Titans, IPL Final 2026",
] as const;

export type FormatTab = "test" | "odi" | "t20i" | "ipl";

export const FORMAT_LABELS: Record<FormatTab, string> = {
  test: "Test",
  odi: "ODI",
  t20i: "T20",
  ipl: "IPL",
} as const;
