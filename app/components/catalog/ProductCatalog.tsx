"use client";

import { useState, useMemo } from "react";
import { Search, X, Filter, ChevronDown, Square, CheckSquare, Clock, FileText, BarChart2, Target, Zap } from "lucide-react";

// =========================================================
// MOCK DATA: PRODUCTOS DEL CATÁLOGO
// =========================================================
const PRODUCT_TYPES = ["All", "Sampling", "Enrichment", "DNA/RNA extraction", "PCR kits"];
const INDUSTRIES = ["All Industries", "Dairy", "Meat & Poultry", "Beverages", "Ready-to-Eat", "Produce", "Environmental"];

const MOCK_PRODUCTS = [
  { 
    id: "s1", 
    type: "Sampling", 
    name: "TAAG S1 Swab Kit", 
    time: "15 min", 
    technology: "Neutralizing Swab",
    targets: "Environmental surfaces",
    desc: "Neutralizing buffer swab for 10x10 surfaces, optimized for environmental monitoring.", 
    industries: ["Environmental", "Dairy", "Meat & Poultry"] 
  },
  { 
    id: "s2", 
    type: "Sampling", 
    name: "TAAG S2 Sponge", 
    time: "25 min", 
    technology: "Cellulose Sponge",
    targets: "Large equipment, carcasses",
    desc: "High-capacity cellulose sponge for large equipment and carcass sampling.", 
    industries: ["Meat & Poultry", "Environmental"] 
  },
  { 
    id: "e1", 
    type: "Enrichment", 
    name: "TAAG E24 Medium", 
    time: "24h", 
    technology: "Dehydrated Culture Media",
    targets: "Salmonella spp., Listeria spp.",
    desc: "Universal enrichment broth for rapid growth of Salmonella and Listeria.", 
    industries: ["Dairy", "Meat & Poultry", "Beverages", "Ready-to-Eat", "Produce"] 
  },
  { 
    id: "e2", 
    type: "Enrichment", 
    name: "TAAG E-Fast", 
    time: "18h", 
    technology: "Accelerated Culture Media",
    targets: "Salmonella spp.",
    desc: "Accelerated enrichment medium specifically formulated for high-fat samples.", 
    industries: ["Dairy", "Ready-to-Eat"] 
  },
  { 
    id: "x1", 
    type: "DNA/RNA extraction", 
    name: "TAAG X-Extract", 
    time: "30 min", 
    technology: "Magnetic Beads",
    targets: "DNA/RNA from complex matrices",
    desc: "High-yield magnetic bead DNA/RNA isolation kit for complex matrices.", 
    industries: ["Dairy", "Meat & Poultry", "Beverages", "Ready-to-Eat", "Produce", "Environmental"] 
  },
  { 
    id: "x2", 
    type: "DNA/RNA extraction", 
    name: "TAAG X-Quick", 
    time: "12 min", 
    technology: "Thermal Lysis",
    targets: "DNA from environmental swabs",
    desc: "Rapid 12-minute thermal lysis protocol for standard environmental swabs.", 
    industries: ["Environmental", "Beverages"] 
  },
  { 
    id: "p1", 
    type: "PCR kits", 
    name: "TAAG F41 Multiplex", 
    time: "1.5h", 
    technology: "RT-PCR - AiGOR",
    targets: "Salmonella spp., L. monocytogenes",
    desc: "Simultaneous multiplex Real-Time PCR detection of Salmonella and L. monocytogenes.", 
    industries: ["Dairy", "Meat & Poultry", "Ready-to-Eat", "Produce"] 
  },
  { 
    id: "p2", 
    type: "PCR kits", 
    name: "TAAG E. coli O157", 
    time: "1.2h", 
    technology: "Real-time PCR, Melting curve analysis",
    targets: "E. coli O157:H7",
    desc: "Specific Real-Time PCR detection of E. coli O157:H7 in raw meat and produce.", 
    industries: ["Meat & Poultry", "Produce"] 
  },
];

export default function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  
  // Estado para comparación
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Filtrado de productos (Búsqueda Multipalabra Integrada)
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      // 1. Separar la búsqueda en múltiples palabras
      const searchTerms = searchQuery.toLowerCase().split(" ").filter(term => term.length > 0);
      
      // 2. Unificar todos los textos buscables del producto
      const itemText = `
        ${product.name} 
        ${product.desc} 
        ${product.targets} 
        ${product.technology} 
        ${product.type}
      `.toLowerCase();

      // 3. Comprobar que TODAS las palabras clave estén incluidas
      const matchesSearch = searchTerms.every(term => itemText.includes(term));
      
      const matchesType = selectedType === "All" || product.type === selectedType;
      const matchesIndustry = selectedIndustry === "All Industries" || product.industries.includes(selectedIndustry);

      return matchesSearch && matchesType && matchesIndustry;
    });
  }, [searchQuery, selectedType, selectedIndustry]);

  // Manejo de Comparación
  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(pId => pId !== id);
      if (prev.length >= 4) return prev; // Límite de 4 productos para comparar
      return [...prev, id];
    });
  };

  const clearCompare = () => setCompareList([]);

  return (
    <section className="pt-24 pb-32 px-4 md:px-6 w-full max-w-[1400px] mx-auto font-sans relative">
      
      {/* TÍTULO Y BAJADA (Centrados y fuera de la tarjeta principal) */}
      <div className="mb-10 md:mb-12 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-4 tracking-tighter leading-tight">
          Product Explorer
        </h2>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          Browse our complete catalog, filter by application, and select products to compare their technical specifications side-by-side.
        </p>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full bg-white border border-gray-100 rounded-[2rem] md:rounded-[3rem] p-5 sm:p-8 md:p-16 relative min-h-[600px] flex flex-col">
        
        {/* TOOLBAR: Buscador + Selector de Industria */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 relative z-30">
           
           {/* Buscador */}
           <div className="relative w-full md:flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF270A] transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, target, technology or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-transparent rounded-2xl md:rounded-full py-4 pl-12 pr-12 text-sm font-medium text-[#111111] focus:outline-none focus:bg-white focus:border-[#FF270A]/30 transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              )}
           </div>

           {/* Selector de Industria (Custom Dropdown) */}
           <div className="relative w-full md:w-72">
              <button 
                onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                className="w-full bg-gray-50 border border-transparent rounded-2xl md:rounded-full py-4 px-6 flex items-center justify-between text-sm font-bold text-[#111111] hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#FF270A]" />
                  {selectedIndustry}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isIndustryDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isIndustryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-40">
                   {INDUSTRIES.map(ind => (
                     <button
                       key={ind}
                       onClick={() => { setSelectedIndustry(ind); setIsIndustryDropdownOpen(false); }}
                       className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${selectedIndustry === ind ? "bg-gray-50 text-[#FF270A] font-bold" : "text-[#111111] hover:bg-gray-50"}`}
                     >
                       {ind}
                     </button>
                   ))}
                </div>
              )}
           </div>
        </div>

        {/* TABS DE TIPOS DE PRODUCTO */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 border-b border-gray-200/60 pb-4 mb-8">
           {PRODUCT_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-colors ${selectedType === type ? "bg-[#111111] text-white" : "bg-transparent text-gray-400 hover:text-[#111111] hover:bg-gray-50"}`}
              >
                {type}
              </button>
           ))}
        </div>

        {/* LISTADO DE PRODUCTOS */}
        <div className="flex flex-col gap-4">
           {filteredProducts.length > 0 ? (
             filteredProducts.map(product => {
               const isCompared = compareList.includes(product.id);
               
               return (
                 <div key={product.id} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 bg-gray-50 hover:bg-gray-100/60 rounded-3xl transition-colors duration-300 border border-transparent hover:border-gray-200">
                    
                    <div className="flex-1 w-full md:pr-10">
                       <div className="flex items-center gap-3 mb-3">
                         <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white text-gray-500 border border-gray-200">
                           {product.type}
                         </span>
                       </div>
                       
                       <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-3 group-hover:text-[#FF270A] transition-colors">
                         {product.name}
                       </h4>

                       <p className="text-sm text-[#111111] font-medium leading-relaxed max-w-3xl mb-5">
                         {product.desc}
                       </p>

                       {/* Tags: Targets y Technology */}
                       <div className="flex flex-wrap gap-2 mb-6">
                          {product.targets && (
                             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 tracking-wider">
                                <Target className="w-3 h-3 text-[#FF270A]" />
                                {product.targets}
                             </span>
                          )}
                          {product.technology && (
                             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 tracking-wider">
                                <Zap className="w-3 h-3 text-[#FF270A]" />
                                {product.technology}
                             </span>
                          )}
                       </div>

                       {/* Footer del producto: Tiempo y Data Sheet */}
                       <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-gray-200/60">
                         <div className="flex items-center gap-2 text-[#111111] font-bold text-[10px] md:text-xs uppercase tracking-tight">
                           <Clock className="w-4 h-4 text-[#FF270A]" /> 
                           <span>{product.time} <span className="text-gray-400 lowercase font-medium ml-1">(full protocol)</span></span>
                         </div>
                         <a href={product.link} className="flex items-center gap-2 text-[#FF270A] font-bold text-[10px] md:text-xs uppercase tracking-tight hover:underline">
                           <FileText className="w-4 h-4" /> TECHNICAL DATA SHEET
                         </a>
                       </div>
                    </div>

                    {/* Checkbox de Comparación */}
                    <div className="mt-6 md:mt-0 pt-6 md:pt-0 border-t border-gray-200 md:border-none w-full md:w-auto flex justify-start md:justify-end shrink-0">
                       <button 
                         onClick={() => toggleCompare(product.id)}
                         className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isCompared ? "bg-[#111111] text-white" : "bg-white text-gray-500 hover:text-[#111111] border border-gray-200"}`}
                       >
                         {isCompared ? <CheckSquare className="w-4 h-4 text-[#FF270A]" /> : <Square className="w-4 h-4" />}
                         {isCompared ? "Selected" : "Compare"}
                       </button>
                    </div>
                 </div>
               )
             })
           ) : (
             <div className="py-20 text-center flex flex-col items-center">
               <Search className="w-12 h-12 text-gray-200 mb-4" />
               <h4 className="text-xl font-bold text-[#111111] mb-2">No products found</h4>
               <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
             </div>
           )}
        </div>
      </div>

      {/* BARRA FLOTANTE DE COMPARACIÓN */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
           <div className="bg-[#111111] text-white p-2 pl-6 rounded-full shadow-2xl flex items-center gap-6 border border-gray-800">
              <div className="flex items-center gap-3">
                 <BarChart2 className="w-5 h-5 text-[#FF270A]" />
                 <span className="text-sm font-bold">
                   {compareList.length} <span className="font-normal text-gray-400">product{compareList.length > 1 ? 's' : ''} selected</span>
                 </span>
              </div>
              <div className="flex items-center gap-2">
                 <button onClick={clearCompare} className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">
                   Clear
                 </button>
                 <button 
                   onClick={() => setIsCompareModalOpen(true)}
                   disabled={compareList.length < 2}
                   className="px-6 py-2.5 bg-[#FF270A] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors disabled:opacity-50 disabled:hover:bg-[#FF270A] disabled:hover:text-white"
                 >
                   Compare Now
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL DE COMPARACIÓN */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-[2rem] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 border-0">
              
              <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-100">
                 <div>
                   <h3 className="text-2xl font-black text-[#111111] leading-tight">Product Comparison</h3>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Review specifications side-by-side</span>
                 </div>
                 <button onClick={() => setIsCompareModalOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors">
                   <X className="w-5 h-5 text-[#111111]" />
                 </button>
              </div>

              <div className="p-6 md:p-8 overflow-x-auto">
                 <div className="flex gap-4 min-w-max">
                   {/* Columna de Títulos (Specs) */}
                   <div className="w-48 shrink-0 flex flex-col justify-end gap-6 pb-6">
                      <div className="h-16"></div> {/* Espacio para el título del producto */}
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest py-3 border-b border-gray-100">Category</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest py-3 border-b border-gray-100">Targets</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest py-3 border-b border-gray-100">Technology</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest py-3 border-b border-gray-100">Time (Full Protocol)</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest py-3 border-b border-gray-100">Description</div>
                   </div>

                   {/* Columnas de Productos */}
                   {compareList.map(id => {
                     const prod = MOCK_PRODUCTS.find(p => p.id === id);
                     if (!prod) return null;
                     return (
                       <div key={prod.id} className="w-72 shrink-0 bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col gap-6 relative group">
                          <button 
                            onClick={() => toggleCompare(prod.id)}
                            className="absolute top-4 right-4 p-1.5 bg-white rounded-full text-gray-300 hover:text-[#FF270A] hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          <div className="h-16 flex flex-col">
                             <h4 className="text-lg font-bold text-[#111111] leading-tight mb-1 line-clamp-2">{prod.name}</h4>
                          </div>

                          <div className="py-3 border-b border-gray-200">
                             <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-[9px] font-black uppercase tracking-widest text-[#111111]">
                               {prod.type}
                             </span>
                          </div>
                          <div className="py-3 border-b border-gray-200 text-sm font-medium text-[#111111]">
                             {prod.targets}
                          </div>
                          <div className="py-3 border-b border-gray-200 text-sm font-medium text-[#111111]">
                             {prod.technology}
                          </div>
                          <div className="py-3 border-b border-gray-200 text-sm font-bold text-[#FF270A] flex items-center gap-2">
                             <Clock className="w-4 h-4" /> {prod.time}
                          </div>
                          <div className="py-3 border-b border-gray-200 text-sm text-[#111111] leading-relaxed">
                             {prod.desc}
                          </div>
                       </div>
                     )
                   })}
                 </div>
              </div>
           </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}