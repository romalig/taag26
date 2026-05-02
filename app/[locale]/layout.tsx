import type {Metadata} from "next";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import Footer from "@/app/components/Footer";
import {CTAProvider} from "@/app/components/CTAProvider";
import BookMeetingModal from "@/app/components/BookMeetingModal";
import {ModalProvider} from "@/app/components/industrial/ModalProvider";
import SolutionModal from "@/app/components/industrial/SolutionModal";
import {siteUrl} from "@/app/seo/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const normalizedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  const t = await getTranslations({
    locale: normalizedLocale,
    namespace: "Metadata",
  });

  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    alternates: {
      canonical: `${siteUrl}/${normalizedLocale}`,
      languages: {
        en: `${siteUrl}/en`,
        es: `${siteUrl}/es`,
        fr: `${siteUrl}/fr`,
        de: `${siteUrl}/de`,
        nl: `${siteUrl}/nl`,
        it: `${siteUrl}/it`,
        pt: `${siteUrl}/pt`,
        ar: `${siteUrl}/ar`,
        "x-default": `${siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />
      <CTAProvider>
        <ModalProvider>
          {children}
          <Footer />
          <BookMeetingModal />
          <SolutionModal />
        </ModalProvider>
      </CTAProvider>
    </NextIntlClientProvider>
  );
}
