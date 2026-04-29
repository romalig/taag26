export const generateMockNews = (countryName: string) => [
  {
    id: `news-${countryName.replace(/\s+/g, '-').toLowerCase()}`,
    image: "/foods.png", 
    title: `Innovation & expansion in ${countryName}`,
    desc: `New localized solutions and faster logistics now available for all our partners in ${countryName}.`,
    fullContent: `We are proud to announce new operational improvements tailored specifically for ${countryName}.\n\nOur commitment to delivering ultra-fast results and customized molecular developments is stronger than ever. Contact your local distributor today to learn more.`,
    linkText: "" // Se sobrescribe con t.readArticle dinámicamente
  }
];

export const generateMockTeam = (distName: string, distContact: string, distEmail: string, includeLab: boolean = false) => {
  const baseTeam: any = {
    hub: {
      image: "/face.png", 
      entityName: "TAAG Hub",
      name: "Technical Specialist",
      phone: "+1 (555) 000-0000",
      email: "techsupport@taag.com",
      description: "Scientific guidance, method selection, and technical troubleshooting."
    },
    distributor: {
      image: "/face.png",
      entityName: distName,
      name: distContact,
      phone: "+1 (555) 111-1111",
      email: distEmail,
      description: "Day-to-day commercial assistance, quoting, and fast on-the-ground logistics."
    }
  };

  if (includeLab) {
    baseTeam.lab = {
      image: "/face.png",
      entityName: "East Coast Labs (Example)",
      name: "Dr. Emily Ruiz",
      phone: "+1 (555) 222-2222",
      email: "labservices@example.com",
      description: "Local laboratory services delivering highly reliable and ultra-fast results."
    };
  }

  return baseTeam;
};