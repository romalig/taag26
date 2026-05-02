import {siteUrl} from "@/app/seo/site";

export default function Head() {
  return (
    <>
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr`} />
      <link rel="alternate" hrefLang="de" href={`${siteUrl}/de`} />
      <link rel="alternate" hrefLang="nl" href={`${siteUrl}/nl`} />
      <link rel="alternate" hrefLang="it" href={`${siteUrl}/it`} />
      <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt`} />
      <link rel="alternate" hrefLang="ar" href={`${siteUrl}/ar`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />
    </>
  );
}
