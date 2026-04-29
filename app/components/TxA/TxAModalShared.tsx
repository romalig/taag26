"use client";

import Image from "next/image";

// --- DATOS PARA LOS MODALES TxA (misma fuente que /TxA) ---
export const TXA_MODAL_DATA = {
  app: {
    title: "TxA APP",
    intro:
      "Transform your field sampling with our intelligent mobile application. Digitize your entire process for total control and end-to-end traceability from the field directly to the lab.",
    features: [
      {
        title: "Digital Field Sampling",
        text: "Replace paper logs and manual data entry with a streamlined digital workflow. Capture photos, detailed data, and the exact sampling point automatically. Track every sample's journey with immutable digital logs, ensuring 100% compliance and complete visibility over your operations.",
        image: "/TxA_app_1.png",
      },
      {
        title: "All information in one click",
        text: "Once you select the sampling point, you can add important information such as a picture from the site, laboratory analyses, sanitization status, and more.",
        image: "/TxA_app_5.png",
      },
      {
        title: "A flawless tracking system",
        text: "If you use our TAAG S11 NeutroSampling kit to perform environmental swabbing, you can automatically link all digital information with the sample by scanning the QR code printed on TAAG S11 NeutroSampling swabs.",
        image: "/TxA_app_4.png",
      },
    ],
  },
  lab: {
    title: "TxA LAB",
    intro:
      "Streamline your workflows and automate process controls to guarantee error-free, fully confident laboratory results every single time.",
    features: [
      {
        title: "Use it for any test… even your own developed test",
        text: "The TxA Lab allows you to create and edit as many assays as you need, even different specialities such as microbiology testing, chemical testing or any other test you need to add.",
        image: "/your-laboratory-assay.svg",
      },
      {
        title: "Detailed information means better corrective actions",
        text: "Add all the fields you want to your samples in order to get all information you need to apply the best corrective actions.",
        image: "/create-products.svg",
      },
      {
        title: "Meet your new and better laboratory report",
        text: "Add the specific information you want to show in your reports to inform and share your laboratory results.",
        image: "/laboratory-report.svg",
      },
    ],
  },
  qa: {
    title: "TxA QA",
    intro:
      "Leverage predictive microbiology to anticipate risks and ensure comprehensive, proactive quality management across your entire facility.",
    features: [
      {
        title: "In-depth analysis to maximize food quality and safety",
        text: "This platform is all about microbiological food safety management. Here you can easily analyze your laboratory results, statistics, warnings, smart and dynamic corrective action proposals, and much more.",
        image: "/TxA_QA1.svg",
      },
      {
        title: "Real time warnings for fast corrective actions",
        text: "In the notification panel, you will get alerts with detailed information about positive results found in your plant. In case of positive results, TxA will propose an automated, dynamic and smart corrective action.",
        image: "/TxA_QA2.svg",
      },
      {
        title: "A new and better way of “seeing” microbiology",
        text: "You will see all relevant information about your environmental monitoring plan on your food plant layout in a comprehensive and intuitive way.",
        image: "/TxA_QA3.svg",
      },
    ],
  },
} as const;

export type TxaModalKey = keyof typeof TXA_MODAL_DATA;

/** Union of app / lab / qa modal payloads — same shape, distinct literal titles. */
export type TxaModalData = (typeof TXA_MODAL_DATA)[TxaModalKey];

export function TxAModalContent({
  data,
}: {
  data: TxaModalData;
}) {
  return (
    <div className="w-full p-8 md:p-14 pb-12">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
          {data.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
          {data.intro}
        </p>
      </div>

      <div className="space-y-16">
        {data.features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-8 items-start w-full border-b border-gray-100 pb-16 last:border-0 last:pb-0"
          >
            <div className="w-full max-w-4xl">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#111111] text-white font-bold text-sm mb-4">
                {idx + 1}
              </div>
              <h3 className="text-3xl font-bold text-[#111111] mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.text}</p>
            </div>

            <div className="w-full bg-[#F5F5F7] rounded-[2.5rem] h-[350px] md:h-[550px] relative flex items-center justify-center overflow-hidden border border-gray-100 mt-2">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
