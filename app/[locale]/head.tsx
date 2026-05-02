import {siteUrl} from "@/app/seo/site";

export default function Head() {
  return (
    <>
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />
    </>
  );
}
