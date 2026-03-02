"use client";

import { useState, useEffect } from "react";
import { Globe, X, ChevronDown, Users, Brain, Dna, MapPin, CheckCircle2 } from "lucide-react";

// --- TRADUCCIONES PARA EL EFECTO DEL TÍTULO SUPERIOR ---
const IMPACT_TRANSLATIONS = [
  "Local Impact.",       // English
  "Impacto Local.",      // Spanish / Portuguese
  "Impact Local.",       // French
  "Lokale Wirkung.",     // German
  "Impatto Locale.",     // Italian
  "Lokale Impact.",      // Dutch
  "地域への影響。",         // Japanese
  "本地影响。"             // Chinese (Simplified)
];

// --- DICCIONARIO INTELIGENTE PARA LAS TARJETAS (TODOS LOS IDIOMAS) ---
const TRANSLATIONS: Record<string, any> = {
  "English": {
    hubTitle: "TAAG HUB",
    partnerTitle: "Local Partner",
    labTitle: "Service Lab partner",
    capabilities: "Capabilities",
    keyContacts: "Key Contacts",
    viewMap: "View on Google Maps",
    hubCap1: "Rapid molecular detection of pathogens.",
    hubCap2: "Next Generation Sequencing (NGS) and traceability.",
    hubCap3: "Scientific support for method selection.",
    hubCap4: "Distribution center for fast kit supply.",
    partCap1: "Direct commercial support and local pricing.",
    partCap2: "Fast inventory management and kit replenishment.",
    partCap3: "Initial kit implementation and training.",
    labCap1: "Routine testing executed fully with TAAG Kits.",
    labCap2: "Direct integration with TxA Software.",
    labCap3: "Local sampling logistics and collection.",
    roleReg: "Regional Director",
    roleApp: "App Scientist",
    roleSales: "Sales Executive",
    roleLab: "Lab Director"
  },
  "Español": {
    hubTitle: "TAAG HUB",
    partnerTitle: "Socio Local",
    labTitle: "Laboratorio de Servicio",
    capabilities: "Capacidades",
    keyContacts: "Contactos Clave",
    viewMap: "Ver en Google Maps",
    hubCap1: "Detección molecular rápida de patógenos.",
    hubCap2: "Secuenciación de Próxima Generación (NGS) y trazabilidad.",
    hubCap3: "Soporte científico para la selección de métodos.",
    hubCap4: "Centro de distribución para suministro rápido de kits.",
    partCap1: "Soporte comercial directo y precios locales.",
    partCap2: "Gestión rápida de inventario y reposición de kits.",
    partCap3: "Implementación inicial de kits y capacitación.",
    labCap1: "Pruebas de rutina ejecutadas completamente con Kits TAAG.",
    labCap2: "Integración directa con el software TxA.",
    labCap3: "Logística local de muestreo y recolección.",
    roleReg: "Director Regional",
    roleApp: "Científico de Aplicaciones",
    roleSales: "Ejecutivo de Ventas",
    roleLab: "Director de Laboratorio"
  },
  "Português": {
    hubTitle: "TAAG HUB",
    partnerTitle: "Parceiro Local",
    labTitle: "Laboratório de Serviço",
    capabilities: "Capacidades",
    keyContacts: "Contatos Principais",
    viewMap: "Ver no Google Maps",
    hubCap1: "Detecção molecular rápida de patógenos.",
    hubCap2: "Sequenciamento de Nova Geração (NGS) e rastreabilidade.",
    hubCap3: "Suporte científico para seleção de métodos.",
    hubCap4: "Centro de distribuição para fornecimento rápido de kits.",
    partCap1: "Suporte comercial direto e preços locais.",
    partCap2: "Gestão rápida de estoque e reposição de kits.",
    partCap3: "Implementação inicial de kits e treinamento.",
    labCap1: "Testes de rotina executados totalmente com Kits TAAG.",
    labCap2: "Integração direta com o Software TxA.",
    labCap3: "Logística local de amostragem e coleta.",
    roleReg: "Diretor Regional",
    roleApp: "Cientista de Aplicações",
    roleSales: "Executivo de Vendas",
    roleLab: "Diretor de Laboratório"
  },
  "Français": {
    hubTitle: "TAAG HUB",
    partnerTitle: "Partenaire Local",
    labTitle: "Laboratoire de Service",
    capabilities: "Capacités",
    keyContacts: "Contacts Clés",
    viewMap: "Voir sur Google Maps",
    hubCap1: "Détection moléculaire rapide des agents pathogènes.",
    hubCap2: "Séquençage de Nouvelle Génération (NGS) et traçabilité.",
    hubCap3: "Support scientifique pour la sélection des méthodes.",
    hubCap4: "Centre de distribution pour l'approvisionnement rapide.",
    partCap1: "Support commercial direct et tarification locale.",
    partCap2: "Gestion rapide des stocks et réapprovisionnement.",
    partCap3: "Mise en œuvre initiale des kits et formation.",
    labCap1: "Tests de routine exécutés entièrement avec les kits TAAG.",
    labCap2: "Intégration directe avec le logiciel TxA.",
    labCap3: "Logistique locale d'échantillonnage et de collecte.",
    roleReg: "Directeur Régional",
    roleApp: "Scientifique d'Application",
    roleSales: "Responsable des Ventes",
    roleLab: "Directeur de Laboratoire"
  },
  "Nederlands": {
    hubTitle: "TAAG HUB",
    partnerTitle: "Lokale Partner",
    labTitle: "Service Lab Partner",
    capabilities: "Capaciteiten",
    keyContacts: "Belangrijkste Contacten",
    viewMap: "Bekijk op Google Maps",
    hubCap1: "Snelle moleculaire detectie van pathogenen.",
    hubCap2: "Next Generation Sequencing (NGS) en traceerbaarheid.",
    hubCap3: "Wetenschappelijke ondersteuning bij methodekeuze.",
    hubCap4: "Distributiecentrum voor snelle levering van kits.",
    partCap1: "Directe commerciële ondersteuning en lokale prijzen.",
    partCap2: "Snel voorraadbeheer en aanvulling van kits.",
    partCap3: "Initiële implementatie van kits en training.",
    labCap1: "Routinematige tests volledig uitgevoerd met TAAG Kits.",
    labCap2: "Directe integratie met TxA Software.",
    labCap3: "Lokale monsterlogistiek en -verzameling.",
    roleReg: "Regionaal Directeur",
    roleApp: "Applicatiewetenschapper",
    roleSales: "Sales Executive",
    roleLab: "Lab Directeur"
  },
  "Deutsch": {
    hubTitle: "TAAG HUB",
    partnerTitle: "Lokaler Partner",
    labTitle: "Service-Laborpartner",
    capabilities: "Fähigkeiten",
    keyContacts: "Wichtige Kontakte",
    viewMap: "Auf Google Maps ansehen",
    hubCap1: "Schneller molekularer Nachweis von Krankheitserregern.",
    hubCap2: "Next Generation Sequencing (NGS) und Rückverfolgbarkeit.",
    hubCap3: "Wissenschaftliche Unterstützung bei der Methodenauswahl.",
    hubCap4: "Distributionszentrum für schnelle Kit-Lieferung.",
    partCap1: "Direkter kommerzieller Support und lokale Preisgestaltung.",
    partCap2: "Schnelles Bestandsmanagement und Kit-Nachschub.",
    partCap3: "Initiale Kit-Implementierung und Schulung.",
    labCap1: "Routinetests vollständig mit TAAG Kits durchgeführt.",
    labCap2: "Direkte Integration mit TxA-Software.",
    labCap3: "Lokale Probenlogistik und -sammlung.",
    roleReg: "Regionaldirektor",
    roleApp: "Applikationswissenschaftler",
    roleSales: "Vertriebsmitarbeiter",
    roleLab: "Laborleiter"
  },
  "Italiano": {
    hubTitle: "TAAG HUB",
    partnerTitle: "Partner Locale",
    labTitle: "Partner di Laboratorio",
    capabilities: "Capacità",
    keyContacts: "Contatti Principali",
    viewMap: "Vedi su Google Maps",
    hubCap1: "Rilevamento molecolare rapido dei patogeni.",
    hubCap2: "Next Generation Sequencing (NGS) e tracciabilità.",
    hubCap3: "Supporto scientifico per la selezione dei metodi.",
    hubCap4: "Centro di distribuzione per fornitura rapida di kit.",
    partCap1: "Supporto commerciale diretto e prezzi locali.",
    partCap2: "Gestione rapida dell'inventario e rifornimento di kit.",
    partCap3: "Implementazione iniziale dei kit e formazione.",
    labCap1: "Test di routine eseguiti interamente con Kit TAAG.",
    labCap2: "Integrazione diretta con il software TxA.",
    labCap3: "Logistica e raccolta locale dei campioni.",
    roleReg: "Direttore Regionale",
    roleApp: "Scienziato Applicativo",
    roleSales: "Responsabile Vendite",
    roleLab: "Direttore di Laboratorio"
  },
  "日本語": {
    hubTitle: "TAAG HUB",
    partnerTitle: "ローカルパートナー",
    labTitle: "サービスラボパートナー",
    capabilities: "機能",
    keyContacts: "主な連絡先",
    viewMap: "Googleマップで見る",
    hubCap1: "病原体の迅速な分子検出。",
    hubCap2: "次世代シーケンシング（NGS）とトレーサビリティ。",
    hubCap3: "メソッド選択のための科学的サポート。",
    hubCap4: "迅速なキット供給のための配送センター。",
    partCap1: "直接的な商業サポートと現地価格設定。",
    partCap2: "迅速な在庫管理とキットの補充。",
    partCap3: "初期キットの導入とトレーニング。",
    labCap1: "TAAGキットで完全に実行されるルーチンテスト。",
    labCap2: "TxAソフトウェアとの直接統合。",
    labCap3: "現地のサンプリング物流と収集。",
    roleReg: "地域ディレクター",
    roleApp: "アプリケーションサイエンティスト",
    roleSales: "営業担当者",
    roleLab: "ラボディレクター"
  },
  "한국어": {
    hubTitle: "TAAG HUB",
    partnerTitle: "현지 파트너",
    labTitle: "서비스 랩 파트너",
    capabilities: "기능",
    keyContacts: "주요 연락처",
    viewMap: "Google 지도에서 보기",
    hubCap1: "병원체의 신속한 분자 검출.",
    hubCap2: "차세대 염기서열 분석(NGS) 및 추적성.",
    hubCap3: "검사법 선택을 위한 과학적 지원.",
    hubCap4: "신속한 키트 공급을 위한 물류 센터.",
    partCap1: "직접적인 상업적 지원 및 현지 가격 책정.",
    partCap2: "신속한 재고 관리 및 키트 보충.",
    partCap3: "초기 키트 구현 및 교육.",
    labCap1: "TAAG 키트로 완전히 실행되는 일상적인 테스트.",
    labCap2: "TxA 소프트웨어와의 직접 통합.",
    labCap3: "현지 샘플링 물류 및 수집.",
    roleReg: "지역 디렉터",
    roleApp: "응용 과학자",
    roleSales: "영업 임원",
    roleLab: "랩 디렉터"
  },
  "हिन्दी": {
    hubTitle: "TAAG HUB",
    partnerTitle: "स्थानीय भागीदार",
    labTitle: "सर्विस लैब भागीदार",
    capabilities: "क्षमताएं",
    keyContacts: "मुख्य संपर्क",
    viewMap: "Google मैप्स पर देखें",
    hubCap1: "रोगजनकों की तीव्र आणविक पहचान।",
    hubCap2: "नेक्स्ट जनरेशन सीक्वेंसिंग (NGS) और ट्रैसेबिलिटी।",
    hubCap3: "विधि चयन के लिए वैज्ञानिक सहायता।",
    hubCap4: "तेज़ किट आपूर्ति के लिए वितरण केंद्र।",
    partCap1: "प्रत्यक्ष वाणिज्यिक समर्थन और स्थानीय मूल्य निर्धारण।",
    partCap2: "तेज़ इन्वेंट्री प्रबंधन और किट पुनःपूर्ति।",
    partCap3: "प्रारंभिक किट कार्यान्वयन और प्रशिक्षण।",
    labCap1: "TAAG किट के साथ पूरी तरह से निष्पादित नियमित परीक्षण।",
    labCap2: "TxA सॉफ़्टवेयर के साथ सीधा एकीकरण।",
    labCap3: "स्थानीय नमूना रसद और संग्रह।",
    roleReg: "क्षेत्रीय निदेशक",
    roleApp: "एप्लिकेशन वैज्ञानिक",
    roleSales: "बिक्री कार्यकारी",
    roleLab: "प्रयोगशाला निदेशक"
  },
  "العربية": {
    hubTitle: "TAAG HUB",
    partnerTitle: "الشريك المحلي",
    labTitle: "مختبر الخدمة الشريك",
    capabilities: "القدرات",
    keyContacts: "جهات الاتصال الرئيسية",
    viewMap: "العرض على خرائط جوجل",
    hubCap1: "الكشف الجزيئي السريع عن مسببات الأمراض.",
    hubCap2: "تسلسل الجيل القادم (NGS) وإمكانية التتبع.",
    hubCap3: "الدعم العلمي لاختيار الطريقة.",
    hubCap4: "مركز توزيع لتوريد المعدات السريع.",
    partCap1: "الدعم التجاري المباشر والتسعير المحلي.",
    partCap2: "إدارة المخزون السريعة وتجديد المعدات.",
    partCap3: "التنفيذ الأولي للمعدات والتدريب.",
    labCap1: "الاختبارات الروتينية المنفذة بالكامل باستخدام معدات TAAG.",
    labCap2: "تكامل مباشر مع برنامج TxA.",
    labCap3: "اللوجستيات المحلية لجمع العينات.",
    roleReg: "المدير الإقليمي",
    roleApp: "عالم تطبيقات",
    roleSales: "مسؤول المبيعات",
    roleLab: "مدير المختبر"
  },
  "中文": {
    hubTitle: "TAAG HUB",
    partnerTitle: "本地合作伙伴",
    labTitle: "服务实验室合作伙伴",
    capabilities: "能力",
    keyContacts: "主要联系人",
    viewMap: "在谷歌地图上查看",
    hubCap1: "病原体的快速分子检测。",
    hubCap2: "下一代测序 (NGS) 和可追溯性。",
    hubCap3: "方法选择的科学支持。",
    hubCap4: "快速检测试剂盒供应的配送中心。",
    partCap1: "直接商业支持和本地定价。",
    partCap2: "快速库存管理和试剂盒补充。",
    partCap3: "初始试剂盒实施和培训。",
    labCap1: "完全使用 TAAG 试剂盒执行的常规测试。",
    labCap2: "与 TxA 软件直接集成。",
    labCap3: "本地采样物流和收集。",
    roleReg: "区域总监",
    roleApp: "应用科学家",
    roleSales: "销售主管",
    roleLab: "实验室主任"
  }
};

// --- BASE DE DATOS DE PAÍSES E IDIOMAS ---
const COUNTRY_DATA: Record<string, { name: string; languages: string[]; glowColors: string[]; hasHub: boolean; flagDirection: "horizontal" | "vertical" }> = {
  // HUBS
  USA: { name: "United States", languages: ["English", "Español"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "horizontal" },
  Mexico: { name: "México", languages: ["Español"], glowColors: ["bg-emerald-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "vertical" },
  Chile: { name: "Chile", languages: ["Español"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "horizontal" },
  Belgium: { name: "Belgium", languages: ["English", "Français", "Nederlands"], glowColors: ["bg-black", "bg-yellow-400", "bg-red-600"], hasHub: true, flagDirection: "vertical" },
  
  // AMERICAS
  Brazil: { name: "Brasil", languages: ["Português", "English"], glowColors: ["bg-emerald-500", "bg-yellow-400", "bg-blue-500"], hasHub: false, flagDirection: "horizontal" },
  Argentina: { name: "Argentina", languages: ["Español"], glowColors: ["bg-blue-400", "bg-white", "bg-blue-400"], hasHub: false, flagDirection: "horizontal" },
  Colombia: { name: "Colombia", languages: ["Español"], glowColors: ["bg-yellow-400", "bg-blue-600", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  Peru: { name: "Perú", languages: ["Español"], glowColors: ["bg-red-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  
  // EUROPE
  Spain: { name: "España", languages: ["Español", "English"], glowColors: ["bg-red-600", "bg-yellow-400", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  France: { name: "France", languages: ["Français", "English"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  Germany: { name: "Deutschland", languages: ["Deutsch", "English"], glowColors: ["bg-black", "bg-red-600", "bg-yellow-400"], hasHub: false, flagDirection: "horizontal" },
  Italy: { name: "Italia", languages: ["Italiano", "English"], glowColors: ["bg-emerald-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  
  // ASIA PACIFIC
  China: { name: "China", languages: ["中文", "English"], glowColors: ["bg-red-600", "bg-yellow-400", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  Japan: { name: "Japan", languages: ["日本語", "English"], glowColors: ["bg-gray-100", "bg-red-600", "bg-gray-100"], hasHub: false, flagDirection: "horizontal" },
  Australia: { name: "Australia", languages: ["English"], glowColors: ["bg-blue-800", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  SouthKorea: { name: "South Korea", languages: ["한국어", "English"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  India: { name: "India", languages: ["English", "हिन्दी"], glowColors: ["bg-orange-500", "bg-white", "bg-emerald-600"], hasHub: false, flagDirection: "horizontal" },
  
  // MIDDLE EAST & AFRICA
  UAE: { name: "UAE", languages: ["English", "العربية"], glowColors: ["bg-emerald-600", "bg-white", "bg-black"], hasHub: false, flagDirection: "horizontal" },
  SouthAfrica: { name: "South Africa", languages: ["English"], glowColors: ["bg-emerald-600", "bg-yellow-400", "bg-blue-600"], hasHub: false, flagDirection: "horizontal" },
  SaudiArabia: { name: "Saudi Arabia", languages: ["العربية", "English"], glowColors: ["bg-emerald-600", "bg-emerald-500", "bg-emerald-700"], hasHub: false, flagDirection: "horizontal" },
  Egypt: { name: "Egypt", languages: ["العربية", "English"], glowColors: ["bg-red-600", "bg-white", "bg-black"], hasHub: false, flagDirection: "horizontal" },

  // REST OF WORLD
  Rest: { name: "Rest of the world", languages: ["English", "Español"], glowColors: ["bg-gray-200", "bg-gray-300", "bg-gray-200"], hasHub: false, flagDirection: "horizontal" }
};

const REGIONS = [
  { title: "Americas", keys: ["Brazil", "Argentina", "Colombia", "Peru"] },
  { title: "Europe", keys: ["Spain", "France", "Germany", "Italy"] },
  { title: "Asia Pacific", keys: ["China", "Japan", "Australia", "SouthKorea", "India"] },
  { title: "Middle East & Africa", keys: ["UAE", "SouthAfrica", "SaudiArabia", "Egypt"] }
];

export default function WhereWeAre() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const [impactIndex, setImpactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImpactIndex((prev) => (prev + 1) % IMPACT_TRANSLATIONS.length);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (countryKey: string, lang: string) => {
    setSelectedCountry(countryKey);
    setSelectedLanguage(lang);
    setIsModalOpen(false);
  };

  const currentData = COUNTRY_DATA[selectedCountry];
  
  // Magia de Traducción: Busca el idioma seleccionado. Si no existe, usa Inglés.
  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS["English"];

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative z-20">
        <div className="max-w-[1000px] w-full text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tight mb-10 md:mb-12">
            Global Science. <br />
            <span key={impactIndex} className="block text-gray-400 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2 md:mt-4">
              {IMPACT_TRANSLATIONS[impactIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
            With operational TAAG Hubs and a network of partner labs and distributors, we bring the TAAG ecosystem directly to your facility. Support in your language, in your time zone, right by your side.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. LOCAL SUPPORT INFO                                     */}
      {/* ========================================================= */}
      <section className="w-full pt-16 pb-24 md:pb-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
              LOCAL SUPPORT
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-6">
              How we support your lab locally.
            </h2>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed font-normal">
              Throughout your entire implementation process, you will be fully backed by expert technical and scientific support, working seamlessly alongside dedicated, on-the-ground assistance to ensure your facility succeeds every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 w-full max-w-5xl mx-auto">
            
            <div className="flex flex-col items-center text-center">
              <Brain className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">TAAG Hubs</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Friendly, expert scientific guidance for method selection, custom molecular developments, and seamless technical troubleshooting to keep your lab at peak performance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Local Partners</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dedicated day-to-day commercial assistance, smooth kit implementation, fluid communication, and fast on-the-ground logistics tailored to your facility's unique needs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Dna className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Service Lab partner</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accessible local laboratory services utilizing TAAG's advanced kits and proprietary software to deliver highly reliable and ultra-fast results near you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SELECTOR DE PAÍSES Y TARJETAS DINÁMICAS                */}
      {/* ========================================================= */}
      <section className="w-full pb-32 px-4 md:px-6 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
            
          {/* Botón Selector */}
          <div className="flex flex-col items-center justify-center mb-16 w-full relative z-20">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
              Select your region
            </span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-6 py-3 bg-[#F9FAFB] rounded-full hover:bg-gray-100 transition-colors group"
            >
              <Globe className="w-5 h-5 text-gray-500 group-hover:text-[#111111] transition-colors" />
              <span className="text-base font-semibold text-[#111111]">
                {currentData.name} — {selectedLanguage}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#111111] transition-colors" />
            </button>
          </div>

          {/* ÁREA DE CONTENIDO */}
          <div className="w-full text-left relative mt-4">

            {/* MESH GRADIENT GLOW */}
            <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center overflow-visible">
              {currentData.flagDirection === "vertical" ? (
                <div key={`glow-v-${selectedCountry}`} className="w-full max-w-6xl h-[80%] flex flex-row justify-between items-center px-4 animate-in fade-in duration-1000">
                   <div className={`w-[30%] h-full rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[0]} opacity-20 md:opacity-30`} />
                   <div className={`w-[30%] h-full rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[1]} opacity-10 md:opacity-20`} />
                   <div className={`w-[30%] h-full rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[2]} opacity-20 md:opacity-30`} />
                </div>
              ) : (
                <div key={`glow-h-${selectedCountry}`} className="w-full max-w-6xl h-[90%] flex flex-col justify-between items-center py-4 animate-in fade-in duration-1000">
                   <div className={`w-full h-[30%] rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[0]} opacity-20 md:opacity-30`} />
                   <div className={`w-full h-[30%] rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[1]} opacity-10 md:opacity-20`} />
                   <div className={`w-full h-[30%] rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[2]} opacity-20 md:opacity-30`} />
                </div>
              )}
            </div>

            {/* TARJETAS */}
            <div className="relative z-10 flex flex-col gap-12 w-full animate-in fade-in duration-500" key={`cards-${selectedCountry}-${selectedLanguage}`}>
              
              {/* TARJETA HUB */}
              {currentData.hasHub && (
                  <div className="bg-[#F9FAFB] rounded-[2rem] flex flex-col lg:flex-row overflow-hidden relative w-full">
                    <div className="w-full lg:w-[35%] relative min-h-[250px] lg:min-h-auto bg-gray-200">
                      <img src="/hub_USA.png" alt="TAAG Hub" className="absolute inset-0 w-full h-full object-cover" />
                    </div>

                    <div className="w-full lg:w-[65%] p-8 md:p-12 flex flex-col">
                      <h3 className="text-2xl md:text-4xl font-bold text-[#111111] mb-10 tracking-tight">
                        {t.hubTitle} {currentData.name}
                      </h3>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-8">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-[#111111] font-bold text-sm">TAAG Hub Facility</span>
                                <span className="text-gray-600 text-sm leading-snug">Main Science District<br/>{currentData.name}</span>
                                <a href="#" className="text-[#0066cc] text-sm hover:underline font-medium mt-1">{t.viewMap}</a>
                              </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.capabilities}</h4>
                            <ul className="flex flex-col gap-3">
                              <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.hubCap1}
                              </li>
                              <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.hubCap2}
                              </li>
                              <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.hubCap3}
                              </li>
                              <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.hubCap4}
                              </li>
                            </ul>
                        </div>
                      </div>

                      <div className="mt-10 pt-8 border-t border-gray-200/80">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{t.keyContacts}</h4>
                          <div className="flex flex-col sm:flex-row gap-8">
                            <div className="flex items-center gap-5">
                              <img src="/face.png" alt="Contact" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0" />
                              <div className="flex flex-col">
                                  <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">{t.roleReg}</span>
                                  <span className="text-base md:text-lg font-bold text-[#111111]">John Doe</span>
                                  <a href="mailto:jdoe@taag.com" className="text-sm md:text-base text-gray-500 hover:text-[#111111]">jdoe@taag.com</a>
                                  <span className="text-sm md:text-base text-gray-500 mt-0.5">+1 234 567 8900</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-5">
                              <img src="/face.png" alt="Contact" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0" />
                              <div className="flex flex-col">
                                  <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">{t.roleApp}</span>
                                  <span className="text-base md:text-lg font-bold text-[#111111]">Ana Smith</span>
                                  <a href="mailto:asmith@taag.com" className="text-sm md:text-base text-gray-500 hover:text-[#111111]">asmith@taag.com</a>
                                  <span className="text-sm md:text-base text-gray-500 mt-0.5">+1 234 567 8901</span>
                              </div>
                            </div>
                          </div>
                      </div>

                    </div>
                  </div>
              )}

              {/* TARJETAS VERTICALES */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* TARJETA LOCAL PARTNER */}
                <div className="bg-[#F9FAFB] rounded-[2rem] p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
                    <h3 className="text-2xl font-bold text-[#111111] mb-8 mt-2">{t.partnerTitle}</h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
                        <div className="w-32 h-20 sm:w-40 sm:h-24 bg-white rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                          <img src="/logo_kreglinger.png" alt="Local Partner Logo" className="w-full h-full object-contain p-3 grayscale" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#FF270A] shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="text-[#111111] font-bold text-sm">Distribuidora Local S.A.</span>
                              <span className="text-gray-600 text-sm leading-snug">Av. Comercial 456<br/>{currentData.name}</span>
                            </div>
                          </div>
                          <a href="#" className="text-[#0066cc] text-xs hover:underline font-medium ml-6">{t.viewMap}</a>
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow mb-10">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.capabilities}</h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.partCap1}
                          </li>
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.partCap2}
                          </li>
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.partCap3}
                          </li>
                        </ul>
                    </div>

                    <div className="flex flex-col pt-6 border-t border-gray-200/80 mt-auto">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{t.keyContacts}</h4>
                        <div className="flex items-center gap-5">
                          <img src="/face.png" alt="Contact" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0" />
                          <div className="flex flex-col">
                              <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">{t.roleSales}</span>
                              <span className="text-base md:text-lg font-bold text-[#111111]">Mario Rossi</span>
                              <a href="mailto:mrossi@partner.com" className="text-sm md:text-base text-gray-500 hover:text-[#111111]">mrossi@partner.com</a>
                              <span className="text-sm md:text-base text-gray-500 mt-0.5">+1 987 654 3210</span>
                          </div>
                        </div>
                    </div>
                </div>

                {/* TARJETA SERVICE LAB PARTNER */}
                <div className="bg-[#F9FAFB] rounded-[2rem] p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
                    <h3 className="text-2xl font-bold text-[#111111] mb-8 mt-2">{t.labTitle}</h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
                        <div className="w-32 h-20 sm:w-40 sm:h-24 bg-white rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                          <img src="/cabbage.png" alt="Service Lab Logo" className="w-full h-full object-contain p-3 grayscale opacity-80" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#FF270A] shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="text-[#111111] font-bold text-sm">Laboratorio Avanzado</span>
                              <span className="text-gray-600 text-sm leading-snug">Ruta Científica 789<br/>{currentData.name}</span>
                            </div>
                          </div>
                          <a href="#" className="text-[#0066cc] text-xs hover:underline font-medium ml-6">{t.viewMap}</a>
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow mb-10">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.capabilities}</h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.labCap1}
                          </li>
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.labCap2}
                          </li>
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> {t.labCap3}
                          </li>
                        </ul>
                    </div>

                    <div className="flex flex-col pt-6 border-t border-gray-200/80 mt-auto">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{t.keyContacts}</h4>
                        <div className="flex items-center gap-5">
                          <img src="/face.png" alt="Contact" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0" />
                          <div className="flex flex-col">
                              <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">{t.roleLab}</span>
                              <span className="text-base md:text-lg font-bold text-[#111111]">Laura Davis</span>
                              <a href="mailto:ldavis@lab.com" className="text-sm md:text-base text-gray-500 hover:text-[#111111]">ldavis@lab.com</a>
                              <span className="text-sm md:text-base text-gray-500 mt-0.5">+1 555 444 3333</span>
                          </div>
                        </div>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. MODAL SELECTOR ESTILO TESLA                            */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-8 h-8 text-[#111111]" />
            </button>

            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-16">Select your region</h2>

            {/* SECCIÓN HUBS */}
            <div className="mb-16">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] pb-4 mb-8 border-b border-gray-100">
                TAAG Hubs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {["USA", "Mexico", "Belgium", "Chile"].map((key) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xl font-bold text-[#111111] mb-2">{COUNTRY_DATA[key].name}</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {COUNTRY_DATA[key].languages.map((lang) => (
                        <button 
                          key={lang} 
                          onClick={() => handleSelect(key, lang)}
                          className="text-sm text-gray-500 hover:text-[#FF270A] hover:underline transition-colors"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN PARTNERS POR CONTINENTE */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] pb-4 mb-8 border-b border-gray-100">
                Partner Labs & Distributors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {REGIONS.map((region) => (
                  <div key={region.title} className="flex flex-col gap-6">
                    <h4 className="text-sm font-bold text-[#111111]">{region.title}</h4>
                    {region.keys.map((key) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-base font-semibold text-gray-800 mb-1">{COUNTRY_DATA[key].name}</span>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {COUNTRY_DATA[key].languages.map((lang) => (
                            <button 
                              key={lang} 
                              onClick={() => handleSelect(key, lang)}
                              className="text-sm text-gray-500 hover:text-[#FF270A] hover:underline transition-colors"
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* REST OF THE WORLD */}
              <div className="mt-12 pt-8">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-800 mb-1">{COUNTRY_DATA["Rest"].name}</span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {COUNTRY_DATA["Rest"].languages.map((lang) => (
                      <button 
                        key={lang} 
                        onClick={() => handleSelect("Rest", lang)}
                        className="text-sm text-gray-500 hover:text-[#FF270A] hover:underline transition-colors"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}