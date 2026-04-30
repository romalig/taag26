"use client";

import Image from "next/image";
import { Phone, Mail, Send, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";

import { getContactMessages } from "@/app/messages/contact";
import type { ContactLocale } from "@/app/messages/contact";
import { ContactApiError, submitContactMessage } from "@/app/lib/contact-api";

export type WhereSupportCopy = {
  localExperts: string;
  supportTeamIn: string;
  hubRole: string;
  distributorRole: string;
  labRole: string;
  hubDesc: string;
  distributorDesc: string;
  labDesc: string;
  needHelpTitle: string;
  needHelpDesc: string;
  whoCanHelp: string;
  selectHelp: string;
  techSupport: string;
  salesLogistics: string;
  labServices: string;
  generalInquiry: string;
  yourName: string;
  workEmail: string;
  tellUsMore: string;
  sendRequest: string;
  routing: string;
  messageSent: string;
  contactShortly: string;
};

type TeamMemberCard = {
  image: string;
  name: string;
  entityName: string;
  phone: string;
  email: string;
};

export type WhereTeamData = {
  hub?: TeamMemberCard;
  distributor?: TeamMemberCard;
  lab?: TeamMemberCard;
};

type SupportTeamSectionProps = {
  teamData?: WhereTeamData | null;
  countryName: string;
  t: WhereSupportCopy;
  /** When true, only the dark contact form block is shown (no expert cards). */
  showOnlyForm?: boolean;
  /** BCP-47 language tag segment for API `locale` (en | es). */
  languageCode: string;
  /** Region/hub id for routing metadata (e.g. USA, global). */
  regionId: string;
};

function labelForHelpType(helpType: string, copy: WhereSupportCopy): string {
  switch (helpType) {
    case "technical":
      return copy.techSupport;
    case "sales":
      return copy.salesLogistics;
    case "lab":
      return copy.labServices;
    case "other":
      return copy.generalInquiry;
    default:
      return helpType;
  }
}

export default function SupportTeamSection({
  teamData,
  countryName,
  t,
  showOnlyForm = false,
  languageCode,
  regionId,
}: SupportTeamSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [helpType, setHelpType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const contactLocale: ContactLocale = languageCode === "es" ? "es" : "en";
  const contactErr = getContactMessages(contactLocale);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    const helpTypeLabel = labelForHelpType(helpType, t);
    const inquiryBody = message.trim();
    const messageForApi = inquiryBody ? `${helpTypeLabel}\n\n${inquiryBody}` : helpTypeLabel;
    const extra: Record<string, string> = {
      help_type: helpType,
      help_type_label: helpTypeLabel,
      country: countryName,
      region: regionId,
    };
    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: messageForApi,
        source: "where_support",
        locale: contactLocale,
        extra,
        website,
      });
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
      setName("");
      setEmail("");
      setMessage("");
      setHelpType("");
    } catch (err) {
      if (err instanceof ContactApiError && err.code === "duplicate_submission") {
        setErrorMessage(contactErr.errorDuplicate);
      } else if (err instanceof ContactApiError) {
        setErrorMessage(err.message || contactErr.errorGeneric);
      } else {
        setErrorMessage(contactErr.errorGeneric);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactClick = (type: string) => {
    setHelpType(type);
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!showOnlyForm && !teamData) return null;

  const teamMembers = [];
  if (teamData) {
    if (teamData.hub) {
      teamMembers.push({
        ...teamData.hub,
        type: "technical",
        role: t.hubRole,
        description: t.hubDesc,
      });
    }
    if (teamData.distributor) {
      teamMembers.push({
        ...teamData.distributor,
        type: "sales",
        role: t.distributorRole,
        description: t.distributorDesc,
      });
    }
    if (teamData.lab) {
      teamMembers.push({
        ...teamData.lab,
        type: "lab",
        role: t.labRole,
        description: t.labDesc,
      });
    }
  }

  return (
    <div className="mt-32 w-full animate-in fade-in slide-in-from-bottom-6 duration-1000 relative z-20">
      {!showOnlyForm && teamMembers.length > 0 && (
        <>
          <div className="text-center md:text-left mb-16">
            <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
              {t.localExperts}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] tracking-tight leading-tight">
              {t.supportTeamIn} {countryName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 w-full">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left group flex-grow h-full bg-white relative z-10"
              >
                <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden mb-6 border-2 border-gray-100 p-1 shadow-sm transition-all duration-500 group-hover:border-[#FF270A]/30 group-hover:shadow-xl shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-50">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                </div>
                <span className="text-[10px] md:text-xs font-bold text-[#FF270A] uppercase tracking-widest mb-2">
                  {member.role}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-[#111111] mb-1 tracking-tight">{member.name}</h3>
                <span className="text-lg md:text-xl font-bold text-gray-800 mb-4 block italic">{member.entityName}</span>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-8 flex-grow">{member.description}</p>
                <div className="flex flex-col gap-4 mt-auto w-full shrink-0">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-[#FF270A] transition-colors group/link w-fit"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 group-hover/link:bg-red-50 group-hover/link:border-red-100 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    {member.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleContactClick(member.type)}
                    className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-[#FF270A] transition-colors group/link w-fit"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 group-hover/link:bg-red-50 group-hover/link:border-red-100 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    {member.email}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div
        ref={formSectionRef}
        className="w-full bg-[#111111] rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center overflow-hidden relative shadow-2xl transition-all duration-700 z-10"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF270A]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="w-full lg:w-5/12 relative z-10 text-center lg:text-left">
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1]">{t.needHelpTitle}</h3>

          <p className="text-lg text-gray-400 font-medium leading-relaxed whitespace-pre-line">
            {t.needHelpDesc} <span className="text-white">{countryName}</span> {t.whoCanHelp}
          </p>
        </div>

        <div className="w-full lg:w-7/12 relative z-10">
          {isSent ? (
            <div className="bg-white/5 border border-emerald-500/30 p-12 rounded-[2.5rem] backdrop-blur-md flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{t.messageSent}</h4>
              <p className="text-gray-400">{t.contactShortly}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-md flex flex-col gap-5"
            >
              <div className="relative">
                <select
                  required
                  value={helpType}
                  onChange={(e) => setHelpType(e.target.value)}
                  className="w-full appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-2xl px-6 py-4 outline-none focus:border-[#FF270A] transition-colors font-medium cursor-pointer"
                >
                  <option value="" disabled className="text-gray-900">
                    {t.selectHelp}
                  </option>
                  <option value="technical" className="text-gray-900">
                    {t.techSupport}
                  </option>
                  <option value="sales" className="text-gray-900">
                    {t.salesLogistics}
                  </option>
                  <option value="lab" className="text-gray-900">
                    {t.labServices}
                  </option>
                  <option value="other" className="text-gray-900">
                    {t.generalInquiry}
                  </option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder={t.yourName}
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm rounded-2xl px-6 py-4 outline-none focus:border-[#FF270A] transition-colors font-medium"
                />
                <input
                  type="email"
                  placeholder={t.workEmail}
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm rounded-2xl px-6 py-4 outline-none focus:border-[#FF270A] transition-colors font-medium"
                />
              </div>
              <textarea
                placeholder={t.tellUsMore}
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm rounded-2xl px-6 py-4 outline-none focus:border-[#FF270A] transition-colors font-medium resize-none"
              />

              <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden>
                <label htmlFor="where-support-website">Website</label>
                <input
                  id="where-support-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {errorMessage ? (
                <p className="text-sm text-red-400 text-center" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-[#111111] hover:bg-[#FF270A] hover:text-white font-bold text-sm uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? t.routing : t.sendRequest}{" "}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
