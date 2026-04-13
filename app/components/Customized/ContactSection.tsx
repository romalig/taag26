"use client";

import { useLocale } from "@/app/contexts/LocaleContext";
import { getContactMessages } from "@/app/messages/contact";
import { ContactApiError, submitContactMessage } from "@/app/lib/contact-api";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const { locale } = useLocale();
  const t = getContactMessages(locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    try {
      await submitContactMessage({
        name,
        email,
        message,
        source: "customized_contact_section",
        locale,
        website,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      setStatus("error");
      if (err instanceof ContactApiError && err.code === "duplicate_submission") {
        setErrorMessage(t.errorDuplicate);
      } else if (err instanceof ContactApiError) {
        setErrorMessage(err.message || t.errorGeneric);
      } else {
        setErrorMessage(t.errorGeneric);
      }
    }
  }

  return (
    <section className="bg-white py-20 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10 font-sora">
        <div className="relative group">
          <div className="absolute inset-4 md:inset-[1px] bg-aurora-vibrant rounded-[2.5rem] blur-xl opacity-50 md:opacity-40 transition-opacity duration-500 group-hover:opacity-60 -z-10"></div>

          <div className="bg-white rounded-[2.5rem] px-8 py-10 md:px-16 md:py-14 flex flex-col lg:flex-row items-stretch justify-between gap-10">
            <div className="text-center lg:text-left max-w-xl lg:max-w-md shrink-0">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#111111] mb-3 tracking-tight">
                Ready to launch?
              </h2>
              <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
                Start using ready-to-deploy kits developed with the power of MILA.
              </p>
            </div>

            <div className="flex-1 min-w-0 max-w-xl mx-auto lg:mx-0 w-full">
              {status === "success" ? (
                <div className="text-center lg:text-left py-4">
                  <p className="text-lg font-bold text-[#111111] mb-2">{t.successTitle}</p>
                  <p className="text-gray-600 text-sm">{t.successBody}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#111111]">{t.formTitle}</h3>
                    <p className="text-xs text-gray-500">{t.formSubtitle}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                      {t.nameLabel}
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      autoComplete="name"
                      className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                      {t.emailLabel}
                    </label>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none resize-none min-h-[100px]"
                    />
                  </div>

                  <p className="text-[10px] text-gray-500 leading-relaxed">{t.disclaimer}</p>

                  <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden>
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  {status === "error" && errorMessage ? (
                    <p className="text-sm text-red-600" role="alert">
                      {errorMessage}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group/btn w-full sm:w-auto bg-[#111111] text-white text-sm font-bold px-8 py-4 rounded-full inline-flex items-center justify-center gap-3 hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t.submitting}
                      </>
                    ) : (
                      <>
                        {t.submit}
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }

        .bg-aurora-vibrant {
          background: linear-gradient(90deg, #d92408, #7e22ce, #db2777, #f59e0b);
          background-size: 200% 200%;
          animation: auroraMove 6s ease infinite alternate;
        }

        @keyframes auroraMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
