import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-[#111111]">404</h1>
      <p className="mb-8 max-w-md text-center text-gray-600">
        {t("description")}
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#FF270A] px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#d92008]"
      >
        {t("backHome")}
      </Link>
    </main>
  );
}
