export const COUNTRY_DATA: Record<string, { name: string; languages: string[]; glowColors: string[]; hasHub: boolean; flagDirection: "horizontal" | "vertical" }> = {
  USA: { name: "United States", languages: ["English", "Español"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "horizontal" },
  Mexico: { name: "México", languages: ["Español"], glowColors: ["bg-emerald-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "vertical" },
  Chile: { name: "Chile", languages: ["Español"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "horizontal" },
  Belgium: { name: "Belgium", languages: ["English", "Français", "Nederlands"], glowColors: ["bg-black", "bg-yellow-400", "bg-red-600"], hasHub: true, flagDirection: "vertical" },
  Brazil: { name: "Brasil", languages: ["Português", "English"], glowColors: ["bg-emerald-500", "bg-yellow-400", "bg-blue-500"], hasHub: false, flagDirection: "horizontal" },
  Argentina: { name: "Argentina", languages: ["Español"], glowColors: ["bg-blue-400", "bg-white", "bg-blue-400"], hasHub: false, flagDirection: "horizontal" },
  Colombia: { name: "Colombia", languages: ["Español"], glowColors: ["bg-yellow-400", "bg-blue-600", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  Peru: { name: "Perú", languages: ["Español"], glowColors: ["bg-red-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  Spain: { name: "España", languages: ["Español", "English"], glowColors: ["bg-red-600", "bg-yellow-400", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  France: { name: "France", languages: ["Français", "English"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  Germany: { name: "Deutschland", languages: ["Deutsch", "English"], glowColors: ["bg-black", "bg-red-600", "bg-yellow-400"], hasHub: false, flagDirection: "horizontal" },
  Italy: { name: "Italia", languages: ["Italiano", "English"], glowColors: ["bg-emerald-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  China: { name: "China", languages: ["中文", "English"], glowColors: ["bg-red-600", "bg-yellow-400", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  Japan: { name: "Japan", languages: ["日本語", "English"], glowColors: ["bg-gray-100", "bg-red-600", "bg-gray-100"], hasHub: false, flagDirection: "horizontal" },
  Australia: { name: "Australia", languages: ["English"], glowColors: ["bg-blue-800", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  SouthKorea: { name: "South Korea", languages: ["한국어", "English"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  India: { name: "India", languages: ["English", "हिन्दी"], glowColors: ["bg-orange-500", "bg-white", "bg-emerald-600"], hasHub: false, flagDirection: "horizontal" },
  UAE: { name: "UAE", languages: ["English", "العربية"], glowColors: ["bg-emerald-600", "bg-white", "bg-black"], hasHub: false, flagDirection: "horizontal" },
  SouthAfrica: { name: "South Africa", languages: ["English"], glowColors: ["bg-emerald-600", "bg-yellow-400", "bg-blue-600"], hasHub: false, flagDirection: "horizontal" },
  SaudiArabia: { name: "Saudi Arabia", languages: ["العربية", "English"], glowColors: ["bg-emerald-600", "bg-emerald-500", "bg-emerald-700"], hasHub: false, flagDirection: "horizontal" },
  Egypt: { name: "Egypt", languages: ["العربية", "English"], glowColors: ["bg-red-600", "bg-white", "bg-black"], hasHub: false, flagDirection: "horizontal" },
  Rest: { name: "Rest of the world", languages: ["English", "Español"], glowColors: ["bg-gray-200", "bg-gray-300", "bg-gray-200"], hasHub: false, flagDirection: "horizontal" }
};

export const REGIONS = [
  { title: "Americas", keys: ["Brazil", "Argentina", "Colombia", "Peru"] },
  { title: "Europe", keys: ["Spain", "France", "Germany", "Italy"] },
  { title: "Asia Pacific", keys: ["China", "Japan", "Australia", "SouthKorea", "India"] },
  { title: "Middle East & Africa", keys: ["UAE", "SouthAfrica", "SaudiArabia", "Egypt"] }
];