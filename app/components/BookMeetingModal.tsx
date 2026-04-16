"use client";

import { useLocale } from "@/app/contexts/LocaleContext";
import { getContactMessages } from "@/app/messages/contact";
import { ContactApiError, submitContactMessage } from "@/app/lib/contact-api";
import { useCTA } from "./CTAProvider";
import { X, Check, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function BookMeetingModal() {
  const { isMeetingOpen, closeMeeting } = useCTA();
  const { locale } = useLocale();
  const t = getContactMessages(locale);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [challenge, setChallenge] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMeeting();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeMeeting]);

  useEffect(() => {
    if (!isMeetingOpen) {
      setStep(1);
      setName("");
      setCompany("");
      setEmail("");
      setChallenge("");
      setWebsite("");
      setErrorMessage(null);
      setIsSubmitting(false);
    }
  }, [isMeetingOpen]);

  if (!isMeetingOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    const extra: Record<string, string> = {};
    if (company.trim()) {
      extra.company = company.trim();
    }
    try {
      await submitContactMessage({
        name,
        email,
        message: challenge,
        source: "book_meeting_modal",
        locale,
        extra: Object.keys(extra).length ? extra : undefined,
        website,
      });
      setStep(2);
    } catch (err) {
      if (err instanceof ContactApiError && err.code === "duplicate_submission") {
        setErrorMessage(t.errorDuplicate);
      } else if (err instanceof ContactApiError) {
        setErrorMessage(err.message || t.errorGeneric);
      } else {
        setErrorMessage(t.errorGeneric);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={closeMeeting}
        />

        <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 my-8 text-left">
          <button
            onClick={closeMeeting}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="md:w-2/5 bg-[#111111] text-white p-6 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#FF270A] rounded-full blur-[80px] opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                Let&apos;s engineer your solution.
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Speak directly with our technical team. No sales scripts, just science and strategy.
              </p>

              <ul className="space-y-4 mb-8 md:mb-0">
                <li className="flex items-start gap-3 text-sm font-medium text-white/80">
                  <Check className="w-5 h-5 text-[#FF270A] shrink-0" />
                  <span>Expert technical support</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-white/80">
                  <Check className="w-5 h-5 text-[#FF270A] shrink-0" />
                  <span>Kits & advanced laboratory services</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-white/80">
                  <Check className="w-5 h-5 text-[#FF270A] shrink-0" />
                  <span>Custom molecular solutions</span>
                </li>
              </ul>
            </div>

            <div className="relative z-10">
              <a
                href="mailto:support@taag.bio"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden border-2 border-white/10 flex items-center justify-center group-hover:border-[#FF270A] transition-colors shrink-0">
                  <span className="text-xs font-bold text-white">TS</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-[#FF270A] transition-colors truncate">
                    Technical Support
                  </div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider truncate">
                    support@taag.bio
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="md:w-3/5 p-6 md:p-12 bg-white flex flex-col justify-center">
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="relative space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                      {t.nameLabel}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Global Foods Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      autoComplete="organization"
                      className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                    {t.emailLabel}
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                    {t.messageLabel}
                  </label>
                  <textarea
                    required
                    placeholder="Tell us about your detection targets..."
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none min-h-[100px] resize-none"
                  />
                </div>

                <p className="text-[10px] text-black/40 leading-relaxed">{t.disclaimer}</p>

                <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden>
                  <label htmlFor="meeting-website">Website</label>
                  <input
                    id="meeting-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {errorMessage ? (
                  <p className="text-sm text-red-600 text-center" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#111111] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-full hover:bg-[#FF270A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {t.submitting}
                    </>
                  ) : (
                    <>
                      {t.submit} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-black/30 font-medium pt-2">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Encrypted & Confidential.</span>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-2">{t.successTitle}</h3>
                <p className="text-black/60 max-w-xs mx-auto mb-8 text-sm">{t.successBody}</p>
                <button
                  onClick={closeMeeting}
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#F5F5F7] text-[#111111] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
