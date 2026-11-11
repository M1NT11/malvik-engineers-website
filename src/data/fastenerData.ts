export interface ProductItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  overview: string;
  image: string;
  sizeRange: string;
  standards: string[];
  materials: string[];
  grades: string[];
  coatings: string[];
  applications: string[];
  manufacturingProcesses: string[];
  specTable: {
    property: string;
    specification: string;
  }[];
  customizationNotes: string;
}

export interface MaterialGroup {
  id: string;
  title: string;
  subtitle: string;
  grades: {
    grade: string;
    standard: string;
    description: string;
    chemicalComposition: string;
    mechanicalProperties: string;
    applications: string;
  }[];
}

export interface StandardItem {
  code: string;
  title: string;
  category: string;
  coverage: string;
  fastenersApplicable: string[];
}

export interface ManufacturingProcess {
  id: string;
  title: string;
  description: string;
  equipment: string;
  capacity: string;
  tolerance: string;
}

export interface InfrastructureItem {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: string;
  image: string;
}

export const COMPANY_FACTS = {
  name: 'Malvik Engineers',
  tagline: 'Precision Engineered Fasteners. Built for Performance.',
  foundedExperience: 'Approximately 10 Years in Fasteners & Engineering Solutions',
  facilityArea: 'Approximately 6,000 Sq. Ft.',
  portDistance: 'Approx. 130 km from Nava Sheva Port (JNPT), Mumbai',
  location: 'Pune Industrial Zone, Maharashtra, India',
  diameterRange: 'M8 to M100 (5/16" to 4")',
  maxStudLength: 'Up to 5,800 mm Continuous Thread Length',
  compliance: 'ISO Certified & Compliant with API 20E BSL 1',
  businessSummary: 'Manufacturer of industrial fasteners, high-tensile bolting, and customized precision engineering components.',
  email: 'contact@malvikengineers.com',
  phone: '[Pending Official Company Assignment]',
  whatsappText: 'Hello Malvik Engineers, I would like to submit an engineering enquiry for industrial fasteners.',
};

export const PRODUCT_CATEGORIES: ProductItem[] = [
  {
    id: 'stud-bolts',
    name: 'Stud Bolts',
    category: 'Studs & Threaded Rods',
    shortDesc: 'Continuous threaded, tap-end, and double-ended stud bolts engineered for high-pressure valves, pressure vessels, and piping flanges.',
    overview: 'Malvik Engineers manufactures high-tensile stud bolts in continuous thread, double-ended, and tap-end configurations according to ASME B16.5, ASME B18.31.2, and DIN 976 Type A & B. Capable of lengths up to 5,800 mm with precision rolled threads for fatigue resistance.',
    image: '/src/assets/images/product_stud_bolts_collection_1794387736457.jpg',
    sizeRange: 'M8 to M100 (5/16" to 4")',
    standards: ['ASTM A193', 'ASTM A320', 'DIN 976 Type A/B', 'ASME B18.31.2', 'ISO DIN 938', 'DIN 939', 'DIN 940'],
    materials: ['Alloy Steel', 'Low Temperature Carbon Steel', 'Austenitic Stainless Steel', 'Duplex & Super Duplex', 'Inconel / Monel'],
    grades: ['ASTM A193 B7', 'ASTM A193 B7M', 'ASTM A320 L7', 'ASTM A193 B16', 'ASTM A193 B8 (SS304)', 'ASTM A193 B8M (SS316)', 'Duplex 2205', 'Inconel 625'],
    coatings: ['Black Oxide', 'Hot Dip Galvanized (HDG)', 'Zinc Electroplated', 'PTFE / Xylan Coating', 'Cadmium Plated', 'Phosphate'],
    applications: ['Oil & Gas Pipelines', 'Petrochemical Refineries', 'High-Pressure Steam Valves', 'Offshore Platforms', 'Heat Exchangers'],
    manufacturingProcesses: ['Bandsaw Precision Cutting', 'CNC Chamfering', 'Thread Rolling', 'Heat Treatment Verification', 'Thread Gauging (Go/No-Go)'],
    specTable: [
      { property: 'Diameter Capability', specification: 'M8 – M100 (Metric) | 5/16" – 4" (Imperial)' },
      { property: 'Thread Length', specification: 'Up to 5,800 mm Continuous Thread' },
      { property: 'Thread Standards', specification: 'UNC, UNF, Metric Coarse & Fine (8-UN standard on >1")' },
      { property: 'Compliance', specification: 'API 20E BSL 1, ISO 9001, NACE MR0175/ISO 15156' },
      { property: 'Certification', specification: 'EN 10204 Type 3.1 MTC with heat code traceability' },
    ],
    customizationNotes: 'Custom pitch, left-hand threads, non-standard lengths up to 5,800 mm, and engineered step-down tap studs manufactured to client drawing.',
  },
  {
    id: 'hex-bolts',
    name: 'Hex Bolts',
    category: 'Bolts & Screws',
    shortDesc: 'Precision hexagonal head bolts for general and high-stress industrial machinery, structural assemblies, and infrastructure.',
    overview: 'Manufactured with precision forged or CNC machined hex heads, Malvik Engineers produces standard hex bolts meeting ISO 4014, DIN 931 (partially threaded), and DIN 933 (fully threaded). Designed for uniform stress distribution and dimensional accuracy.',
    image: '/src/assets/images/product_hex_bolts_hardware_1794387736905.jpg',
    sizeRange: 'M8 to M64',
    standards: ['ISO 4014', 'DIN 931', 'DIN 933', 'IS 1363', 'ISO 3506-1'],
    materials: ['Carbon Steel', 'Medium Carbon Alloy', 'Stainless Steel 304/316'],
    grades: ['Grade 8.8', 'Grade 10.9', 'Grade 12.9', 'SS304 (A2-70)', 'SS316 (A4-80)', 'EN8'],
    coatings: ['Zinc Trivalent Passivated', 'Hot Dip Galvanized', 'Yellow Zinc', 'Black Oxide', 'Dacromet'],
    applications: ['Heavy Machinery', 'Automotive & Commercial Vehicles', 'Power Generation Plants', 'General Industrial Fabrication'],
    manufacturingProcesses: ['Forging', 'CNC Head Machining', 'Drilling', 'Centerless Grinding', 'Thread Rolling'],
    specTable: [
      { property: 'Diameter Capability', specification: 'M8 – M64' },
      { property: 'Thread Type', specification: 'Full Thread (DIN 933) & Partial Thread (DIN 931)' },
      { property: 'Head Marking', specification: 'Malvik Manufacturer Identification + Property Class / Grade' },
      { property: 'Tensile Strength', specification: '800 MPa to 1220 MPa (Property class dependent)' },
    ],
    customizationNotes: 'Custom shank lengths, safety wire drilled heads, reduced shanks, and special under-head radiuses.',
  },
  {
    id: 'heavy-hex-bolts',
    name: 'Heavy Hex Bolts',
    category: 'Bolts & Screws',
    shortDesc: 'Engineered heavy-duty hex bolts with wider across-flats dimensions for pressure vessels, API flanges, and heavy structural connections.',
    overview: 'Engineered to ASME B18.2.1 and ASTM A193 / A320 standards. Heavy Hex Bolts feature larger head dimensions that provide enhanced bearing area, preventing crushing of mating surfaces under high preloads in refinery and valve flange connections.',
    image: '/src/assets/images/hero_fastener_manufacturing_1794387734224.jpg',
    sizeRange: '1/2" to 3" (M12 to M76)',
    standards: ['ASME B18.2.1', 'ASTM A193', 'ASTM A320', 'ASTM A307 Grade B'],
    materials: ['Alloy Steel', 'High Temperature Cr-Mo Steel', 'Stainless Steel B8/B8M'],
    grades: ['ASTM A193 B7', 'ASTM A193 B7M', 'ASTM A320 L7', 'ASTM A193 B16', 'B8 Class 2', 'B8M Class 2'],
    coatings: ['PTFE / Xylan 1424/1070', 'Zinc-Nickel Plating', 'Hot Dip Galvanized', 'Phosphate & Oil'],
    applications: ['Petroleum Refineries', 'Chemical Processing Flanges', 'Nuclear Power Structures', 'Pipeline Flange Joints'],
    manufacturingProcesses: ['Hot Forging', 'CNC Machining', 'Heat Treatment', 'Precision Thread Rolling'],
    specTable: [
      { property: 'Across-Flats Dimension', specification: 'Heavy Hex standard ASME B18.2.1 (Increased bearing area)' },
      { property: 'Temperature Service', specification: '-101°C (L7) up to +593°C (B16)' },
      { property: 'Non-Destructive Testing', specification: 'MPI, UT, Dye Penetrant Testing available on request' },
      { property: 'API Compliance', specification: 'API 20E BSL 1 capabilities verified' },
    ],
    customizationNotes: 'Flanged heavy hex heads, customer logo or heat code stamping on bolt head crown.',
  },
  {
    id: 'hex-nuts',
    name: 'Hex Nuts',
    category: 'Nuts',
    shortDesc: 'Standard hexagonal nuts manufactured with precision tapped threads for secure mating with bolts and threaded rods.',
    overview: 'Malvik Engineers produces standard hex nuts conforming to ISO 4032, DIN 934, and ASME B18.2.2. Manufactured using high-speed tapping and CNC machining to ensure smooth threading and high proof load resistance.',
    image: '/src/assets/images/product_hex_bolts_hardware_1794387736905.jpg',
    sizeRange: 'M8 to M64',
    standards: ['ISO 4032', 'DIN 934', 'IS 1364', 'ASME B18.2.2'],
    materials: ['Carbon Steel', 'Mild Steel EN8', 'Stainless Steel 304 / 316'],
    grades: ['Class 8', 'Class 10', 'Class 12', 'A2-70', 'A4-80'],
    coatings: ['Zinc Electroplated', 'Hot Dip Galvanized', 'Black Oxide', 'Nickel Plated'],
    applications: ['Structural Steelwork', 'Machinery Assembly', 'Automotive Framing', 'General Mechanical Fastening'],
    manufacturingProcesses: ['Hot Forging', 'Tapping', 'CNC Facing', 'Chamfering'],
    specTable: [
      { property: 'Thread Tolerance', specification: '6H (ISO Metric) / 2B (Unified ASME)' },
      { property: 'Surface Finish', specification: 'Clean deburred, uniform chamfer 15° to 30°' },
      { property: 'Proof Load Verification', specification: 'Tested per ISO 898-2 specification' },
    ],
    customizationNotes: 'Thin hex jam nuts (DIN 439), slotted castellated hex nuts, and high-height nuts.',
  },
  {
    id: 'heavy-hex-nuts',
    name: 'Heavy Hex Nuts',
    category: 'Nuts',
    shortDesc: 'ASTM A194 Grade 2H, 7, 8, 8M heavy hex nuts engineered for petrochemical, high-pressure piping, and boiler applications.',
    overview: 'Critical mating component for stud bolts in refinery and process industry applications. Produced strictly according to ASME B18.2.2 and ASTM A194 standards with full material traceability and proof load certifications.',
    image: '/src/assets/images/product_stud_bolts_collection_1794387736457.jpg',
    sizeRange: '1/2" to 4" (M12 to M100)',
    standards: ['ASTM A194', 'ASME B18.2.2', 'ASME SA194'],
    materials: ['Quenched & Tempered Carbon Steel', 'Alloy Steel', 'Austenitic Stainless Steel'],
    grades: ['ASTM A194 Grade 2H', 'Grade 2HM (NACE)', 'Grade 7', 'Grade 7M', 'Grade 8 (304)', 'Grade 8M (316)'],
    coatings: ['Xylan / PTFE Fluoropolymer', 'Zinc Phosphate', 'Hot Dip Galvanized', 'Cadmium'],
    applications: ['ASME Boiler & Pressure Vessels', 'High Pressure Gas Lines', 'API Flanged Connections', 'Offshore Topside Equipment'],
    manufacturingProcesses: ['Hot Forging', 'CNC Lathe Precision Facing', 'High-Speed Tapping', 'Proof Load Testing'],
    specTable: [
      { property: 'Across Flats', specification: 'ASME B18.2.2 Heavy series for enhanced load distribution' },
      { property: 'Proof Load Stress', specification: 'Up to 175,000 psi (ASTM A194 2H)' },
      { property: 'Hardness Range', specification: '248 to 327 HBW (24 to 35 HRC)' },
    ],
    customizationNotes: 'Oversized tapped nuts for heavy hot-dip galvanized studs (6AZ/6AX tolerances).',
  },
  {
    id: 'washers',
    name: 'Washers',
    category: 'Washers & Gaskets',
    shortDesc: 'Hardened structural washers, spring lock washers, and flat washers engineered to prevent galling and maintain clamp load.',
    overview: 'Manufactured to ASTM F436, DIN 125, DIN 127, and DIN 6916 standards. Designed to distribute clamp loads evenly across flange and structural mating surfaces, protecting base materials and resisting vibration loosening.',
    image: '/src/assets/images/product_hex_bolts_hardware_1794387736905.jpg',
    sizeRange: 'M8 to M100',
    standards: ['ASTM F436', 'DIN 125', 'DIN 127', 'DIN 6916', 'ISO 7089'],
    materials: ['Medium Carbon Steel Quenched & Tempered', 'Stainless Steel 304/316', 'Spring Steel'],
    grades: ['ASTM F436 Type 1', 'Grade 8 Hardened', 'SS304', 'SS316'],
    coatings: ['Hot Dip Galvanized', 'Mechanical Zinc', 'Yellow Zinc', 'Black Oxide'],
    applications: ['Structural Steel Jointing', 'Pressure Vessel Bolting', 'Heavy Equipment Mounting'],
    manufacturingProcesses: ['Stamping', 'Heat Treatment & Tempering', 'Deburring', 'Surface Finishing'],
    specTable: [
      { property: 'Hardness', specification: '38 to 45 HRC (ASTM F436)' },
      { property: 'Dimensional Types', specification: 'Standard flat, heavy bevelled, clipped, and extra-thick' },
    ],
    customizationNotes: 'Custom thickness, spherical washers, and bevelled washers for structural I-beam flanges.',
  },
  {
    id: 'anchor-bolts',
    name: 'Anchor Bolts',
    category: 'Anchor & Structural Bolting',
    shortDesc: 'Heavy-duty anchor bolts in L-shape, J-shape, and straight welded plate configurations for securing steel columns and heavy equipment.',
    overview: 'Engineered anchor bolting systems for cast-in-place concrete foundation anchoring. Manufactured from high tensile carbon and alloy steel rods up to M100 with hot bending or plate welding per structural engineering drawings.',
    image: '/src/assets/images/hero_fastener_manufacturing_1794387734224.jpg',
    sizeRange: 'M12 to M100, lengths up to 4,000 mm',
    standards: ['ASTM F1554 (Grades 36, 55, 105)', 'IS 5624', 'DIN 529'],
    materials: ['Mild Steel', 'High Tensile Carbon Steel', 'Alloy Steel 4140'],
    grades: ['ASTM F1554 Grade 36', 'Grade 55', 'Grade 105', 'EN8', 'IS 2062'],
    coatings: ['Hot Dip Galvanized (HDG)', 'Black Bituminous Painted', 'Zinc Plated'],
    applications: ['Industrial Plant Columns', 'Power Transmission Towers', 'Crane Rails', 'Heavy Storage Tanks'],
    manufacturingProcesses: ['Bandsaw Cutting', 'Hydraulic Hot/Cold Bending', 'Thread Rolling', 'Welding to Plate'],
    specTable: [
      { property: 'Configuration Types', specification: 'Type L (90° hook), Type J, Straight with welded base plate' },
      { property: 'Thread Length', specification: 'Standard 100mm to 300mm or customized to civil drawing' },
    ],
    customizationNotes: 'Anchor cage assemblies with template rings, double nuts, and oversized anchor plate washers.',
  },
  {
    id: 'foundation-bolts',
    name: 'Foundation Bolts',
    category: 'Anchor & Structural Bolting',
    shortDesc: 'High-strength foundation bolts, sleeve anchors, and cage assemblies for heavy rotating machinery and vibrating plant installations.',
    overview: 'Specialized foundation bolts engineered to absorb dynamic and vibratory loads in turbine foundations, rolling mills, cement plants, and heavy manufacturing machinery. Fabricated to strict axial alignment and tensile parameters.',
    image: '/src/assets/images/facility_manufacturing_floor_1794387734940.jpg',
    sizeRange: 'M16 to M100',
    standards: ['IS 5624', 'DIN 529 Form A, B, C, D, E', 'Customer Drawings'],
    materials: ['Carbon Steel', 'Alloy Steel 4140 / 42CrMo4', 'Stainless Steel'],
    grades: ['Grade 4.6', 'Grade 8.8', 'Grade 10.9', 'ASTM A193 B7'],
    coatings: ['Hot Dip Galvanized', 'Epoxy Coated', 'Self Finish / Oiled'],
    applications: ['Turbine & Generator Foundations', 'Forging Press Bases', 'Bridge Piers', 'Wind Turbine Towers'],
    manufacturingProcesses: ['Bandsaw Cutting', 'Forging', 'CNC Turning', 'Thread Rolling', 'Assembly'],
    specTable: [
      { property: 'Embedment Depth', specification: 'Customized up to 3,500 mm' },
      { property: 'Sleeve Types', specification: 'Pipe sleeve, conical box sleeve, grouted cavity' },
    ],
    customizationNotes: 'Fabrication of complete foundation bolt cages with spacer plates and leveling nuts.',
  },
  {
    id: 'lock-nuts',
    name: 'Lock Nuts',
    category: 'Nuts',
    shortDesc: 'Prevailing torque all-metal lock nuts and nylon insert lock nuts designed to resist loosening under severe vibration.',
    overview: 'Designed for dynamic environments where vibration and thermal cycling cause conventional nuts to back off. Malvik Engineers supplies both all-metal prevailing torque nuts (DIN 980 / ISO 7042) for high-temperature service and nylon insert lock nuts (DIN 985 / ISO 7040).',
    image: '/src/assets/images/product_hex_bolts_hardware_1794387736905.jpg',
    sizeRange: 'M8 to M48',
    standards: ['DIN 980 V (All-metal)', 'DIN 985 (Nylon insert)', 'ISO 7040', 'ISO 7042'],
    materials: ['Carbon Steel', 'Alloy Steel', 'Stainless Steel 304/316'],
    grades: ['Class 8', 'Class 10', 'A2-70', 'A4-80'],
    coatings: ['Zinc Electroplated', 'Dacromet / Geomet', 'Phosphate'],
    applications: ['Vibrating Screens & Crushers', 'Pumping Systems', 'Automotive Suspensions', 'Rail Transit'],
    manufacturingProcesses: ['CNC Machining', 'Tapping', 'Crimping / Staking', 'Ring Insertion'],
    specTable: [
      { property: 'Locking Mechanism', specification: 'Prevailing torque elliptical deformation or nylon elastic insert' },
      { property: 'Temperature Limit', specification: 'Up to 300°C for all-metal; up to 120°C for nylon' },
    ],
    customizationNotes: 'Custom prevailing torque levels and high-temperature alloy metal locking nuts.',
  },
  {
    id: 'special-fasteners',
    name: 'Special Fasteners',
    category: 'Engineered & Custom',
    shortDesc: 'Engineered non-standard fasteners manufactured exactly to client engineering drawings, proprietary dimensions, and critical tolerances.',
    overview: 'When off-the-shelf catalog fasteners cannot fulfill specialized geometry, extreme pressure ratings, or unique assembly clearances, Malvik Engineers produces special fasteners. Supported by in-house CNC machining, Traub, and VMC facilities.',
    image: '/src/assets/images/hero_fastener_manufacturing_1794387734224.jpg',
    sizeRange: 'Custom diameters and lengths to drawing',
    standards: ['Manufactured to Customer Engineering Drawings / Specifications'],
    materials: ['Alloy Steels', 'Stainless Steels', 'Super Alloys (Inconel, Monel, Duplex, Titanium)'],
    grades: ['ASTM A193 B7/B16', 'AISI 4140', 'SS316L', 'Inconel 718', 'Monel K500'],
    coatings: ['Custom coating to specification: PTFE, Silver Plated, ENP, Hard Chrome'],
    applications: ['Subsea Valves', 'Turbomachinery', 'Nuclear Research Facilities', 'Defence & Heavy Defense Equipment'],
    manufacturingProcesses: ['VMC Multi-Axis Machining', 'CNC Turning', 'Wire EDM', 'Precision Thread Whirling / Rolling'],
    specTable: [
      { property: 'Tolerance Capability', specification: 'Up to ±0.01 mm on critical ground surfaces' },
      { property: 'Batch Size', specification: 'Prototype batches (10-50 pcs) to bulk production (10,000+ pcs)' },
      { property: 'Drawings Accepted', specification: 'PDF, DWG, DXF, STEP, IGES with GD&T specifications' },
    ],
    customizationNotes: 'Full turnkey manufacturing including raw material procurement with mill test certificates.',
  },
  {
    id: 'cnc-machined-fasteners',
    name: 'CNC-Machined Fasteners',
    category: 'Engineered & Custom',
    shortDesc: 'Ultra-precision turned and milled fasteners with tight dimensional tolerances, controlled micro-finishes, and complex geometry.',
    overview: 'Utilizing modern CNC turning centers and VMC machines in our 6,000 sq. ft. Pune facility, Malvik Engineers machines precision fasteners with tight tolerances, superior concentricity, and smooth micro-inch surface finishes required for precision instrumentation.',
    image: '/src/assets/images/facility_manufacturing_floor_1794387734940.jpg',
    sizeRange: 'M8 to M80, turned lengths up to 1,200 mm',
    standards: ['ISO 2768-mK', 'Customer Drawings', 'ASME Section VIII'],
    materials: ['AISI 4140', 'Stainless Steel 316Ti', '17-4PH', 'Duplex 2205', 'Hastelloy C276'],
    grades: ['4140 Q&T', 'B8M Class 2', 'UNS S31803', 'UNS N10276'],
    coatings: ['Electropolishing', 'Passivation per ASTM A967', 'Zinc-Nickel', 'PTFE'],
    applications: ['Flow Meters & Instrumentation', 'High-Pressure Valve Stems', 'Aerospace Ground Support', 'Pharmaceutical Equipment'],
    manufacturingProcesses: ['CNC Lathe Turning', 'VMC Milling', 'Centerless Grinding', 'Deburring & Ultrasonic Cleaning'],
    specTable: [
      { property: 'Concentricity & Runout', specification: 'Within 0.02 mm TIR' },
      { property: 'Surface Roughness', specification: 'Ra 0.4 µm to 1.6 µm achievable' },
      { property: 'Inspection', specification: '100% optical projector and digital micrometer verification' },
    ],
    customizationNotes: 'Special threads (Acme, Buttress, Square, Trapezoidal Tr threads) and cross-hole drilling.',
  },
  {
    id: 'valve-related-components',
    name: 'Valve-Related Components',
    category: 'Valve & Pressure Components',
    shortDesc: 'Bonnet bolting, body studs, gland bolts, stems, and retaining hardware manufactured for severe-service industrial valves.',
    overview: 'Designed specifically for industrial valve manufacturers in oil & gas, chemical, and power sectors. Malvik Engineers supplies high-integrity bonnet bolting, body studs, packing gland fasteners, and stem nuts meeting API 20E BSL 1 bolting guidelines.',
    image: '/src/assets/images/hero_fastener_manufacturing_1794387734224.jpg',
    sizeRange: 'M10 to M90 / 3/8" to 3-1/2"',
    standards: ['API 20E (BSL 1 Compliant)', 'ASME B16.34', 'ASTM A193', 'ASTM A194', 'NACE MR0175'],
    materials: ['Cr-Mo Alloy Steel', 'Stainless Steel', 'Duplex Stainless Steel', 'Super Alloys'],
    grades: ['ASTM A193 B7 / B7M', 'ASTM A194 2H / 2HM', 'A320 L7 / L7M', 'ASTM A193 B8 / B8M', 'Inconel 625'],
    coatings: ['Fluoropolymer / PTFE Coatings', 'Electroless Nickel Plating (ENP)', 'Phosphate & Oil'],
    applications: ['Ball Valves', 'Gate & Globe Valves', 'Check Valves', 'Triple-Offset Butterfly Valves', 'Control Valves'],
    manufacturingProcesses: ['Bandsaw Cutting', 'CNC Machining', 'Heat Treatment Verification', 'Thread Rolling', 'PMI Testing'],
    specTable: [
      { property: 'Compliance Framework', specification: 'API 20E BSL 1 (Bolting for use in the petroleum and natural gas industries)' },
      { property: 'Impact Testing', specification: 'Charpy V-Notch impact testing at -46°C or -101°C as specified' },
      { property: 'Sour Gas Compliance', specification: 'NACE MR0175 / ISO 15156 hardness verification' },
    ],
    customizationNotes: 'Special gland eye bolts, extended tap studs for insulated valve jackets, and custom bonnet fasteners.',
  },
  {
    id: 'customized-threaded-components',
    name: 'Customized Threaded Components',
    category: 'Engineered & Custom',
    shortDesc: 'Double-ended tie rods, high-lead screw rods, tension rods, and custom threaded shafts engineered to client specifications.',
    overview: 'Comprehensive manufacturing of customized threaded parts including long tie rods for heat exchangers and hydraulic cylinders, high-pitch trapezoidal lead screws, and specialized tension bars. Supported by thread rolling and lathe threading up to 5,800 mm.',
    image: '/src/assets/images/product_stud_bolts_collection_1794387736457.jpg',
    sizeRange: 'M8 to M100, lengths up to 5,800 mm',
    standards: ['DIN 976', 'DIN 103 (Trapezoidal)', 'Customer Engineering Drawings'],
    materials: ['Carbon Steel', 'Alloy Steel', 'Austenitic & Martensitic Stainless', 'High Nickel Alloys'],
    grades: ['EN8 / EN9', 'AISI 4140', 'SS304 / SS316', 'ASTM A193 B7', 'Duplex 2205'],
    coatings: ['Zinc Flake', 'Hot Dip Galvanized', 'PTFE Coating', 'Black Oxide'],
    applications: ['Heat Exchanger Tie Rods', 'Hydraulic Press Columns', 'Structural Tension Systems', 'Custom Machinery Drives'],
    manufacturingProcesses: ['Thread Rolling', 'Centerless Grinding', 'Lathe Single-Point Threading', 'Drilling & Tapping'],
    specTable: [
      { property: 'Thread Types', specification: 'Metric, UNC, UNF, Trapezoidal (Tr), Acme, Left-Hand (LH)' },
      { property: 'Straightness Tolerance', specification: 'Within 0.5 mm per meter on long rolled rods' },
      { property: 'End Finishes', specification: 'Chamfered, rounded point per ISO 4753, drilled cotter pin holes' },
    ],
    customizationNotes: 'Differential thread pitches on opposing ends, stepped diameters, and center unthreaded sections.',
  },
];

export const MATERIAL_GROUPS: MaterialGroup[] = [
  {
    id: 'carbon-steel',
    title: 'Carbon Steel Fasteners',
    subtitle: 'Standard industrial and structural bolting with balanced ductility, machinability, and load capacity.',
    grades: [
      {
        grade: 'EN8 / AISI 1040',
        standard: 'BS 970 / ISO 683',
        description: 'Unalloyed medium carbon engineering steel offering good tensile strength, uniform machinability, and surface wear resistance.',
        chemicalComposition: 'C: 0.36-0.44% | Si: 0.10-0.40% | Mn: 0.60-1.00% | S/P: 0.05% max',
        mechanicalProperties: 'Tensile Strength: 550 - 700 MPa | Yield: 280 MPa min | Hardness: 160 - 210 HB',
        applications: 'Machined shafts, foundation studs, standard anchor bolts, and general mechanical assemblies.',
      },
      {
        grade: 'ASTM A194 2H',
        standard: 'ASTM A194 / ASME SA194',
        description: 'High-strength quenched and tempered carbon steel heavy hex nuts. The industry benchmark companion nut for ASTM A193 B7 high-pressure bolting.',
        chemicalComposition: 'C: 0.40% min | Mn: 1.00% max | Quenched & Tempered at 455°C min',
        mechanicalProperties: 'Proof Load Stress: 175,000 psi (1205 MPa) | Hardness: 248 - 327 HBW (24 - 35 HRC)',
        applications: 'Heavy hex bolting for oil & gas flanges, chemical reactors, steam drums, and structural pipe connections.',
      },
      {
        grade: 'Grade 8.8 High Tensile',
        standard: 'ISO 898-1 / DIN 931',
        description: 'Medium carbon steel quenched and tempered to high tensile grade 8.8 for standard structural bolting and machinery mounting.',
        chemicalComposition: 'Medium carbon steel with controlled boron/manganese, heat treated.',
        mechanicalProperties: 'Tensile Strength: 800 - 830 MPa min | Yield Strength: 640 MPa min | Elongation: 12% min',
        applications: 'Automotive frames, heavy machine structures, crane tracks, and industrial gearboxes.',
      },
    ],
  },
  {
    id: 'alloy-steel',
    title: 'Alloy Steel Fasteners',
    subtitle: 'High tensile strength, elevated temperature resistance, and low-temperature impact toughness for severe process service.',
    grades: [
      {
        grade: 'ASTM A193 B7',
        standard: 'ASTM A193 / ASME SA193',
        description: 'Chromium-molybdenum through-hardening alloy steel (AISI 4140/4142), quenched and tempered. Benchmark bolting for high-pressure and high-temperature service.',
        chemicalComposition: 'C: 0.37-0.49% | Cr: 0.75-1.20% | Mo: 0.15-0.25% | Mn: 0.65-1.10%',
        mechanicalProperties: 'Tensile Strength: 860 MPa min | Yield: 720 MPa min | Hardness: 321 HBW max (35 HRC)',
        applications: 'Pressure vessels, petrochemical flanges, valve bonnet bolting, and refinery pipelines up to 450°C.',
      },
      {
        grade: 'ASTM A193 B7M',
        standard: 'ASTM A193 / NACE MR0175',
        description: 'Modified B7 grade with strict maximum hardness control (235 HBW / 99 HRB) for sulfide stress cracking (SSC) resistance in wet H2S sour gas environments.',
        chemicalComposition: 'Cr-Mo alloy with controlled tempering and 100% individual piece hardness testing.',
        mechanicalProperties: 'Tensile Strength: 690 MPa min | Yield: 550 MPa min | Hardness: 235 HBW max',
        applications: 'Sour oil & gas wells, sour gas processing pipelines, H2S service valve bonnets.',
      },
      {
        grade: 'ASTM A320 L7',
        standard: 'ASTM A320 / ASME SA320',
        description: 'Low-temperature alloy steel with mandatory Charpy V-Notch impact testing at -101°C (-150°F). Prevents brittle fracture in cryogenic service.',
        chemicalComposition: 'AISI 4140 quenched and tempered with verified Charpy notch impact toughness.',
        mechanicalProperties: 'Tensile Strength: 860 MPa min | Yield: 720 MPa min | Impact: 27 Joules min @ -101°C',
        applications: 'LNG terminals, cryogenic gas liquefaction, Arctic refrigeration pipelines, and sub-zero storage tanks.',
      },
      {
        grade: 'ASTM A193 B16',
        standard: 'ASTM A193 / ASME SA193',
        description: 'Chromium-molybdenum-vanadium alloy steel engineered for extended creep-rupture strength at elevated temperatures up to 593°C (1100°F).',
        chemicalComposition: 'Cr: 0.80-1.15% | Mo: 0.50-0.65% | V: 0.25-0.35% | C: 0.36-0.44%',
        mechanicalProperties: 'Tensile: 860 MPa min | Yield: 725 MPa min | High-temperature creep resistance up to 593°C',
        applications: 'Power generation steam turbines, superheater headers, high-pressure boiler flanges, and cracking furnaces.',
      },
      {
        grade: 'AISI 4140',
        standard: 'ASTM A29 / AISI 4140',
        description: 'Versatile Cr-Mo through-hardening alloy steel widely used for forged bolts, high-strength studs, and CNC turned precision fasteners.',
        chemicalComposition: 'C: 0.38-0.43% | Cr: 0.80-1.10% | Mo: 0.15-0.25% | Mn: 0.75-1.00%',
        mechanicalProperties: 'Tensile Strength: 850 - 1000 MPa | Yield: 650 MPa min (Q&T condition)',
        applications: 'High-torque tie rods, automotive studs, hydraulic cylinder bolting, and heavy forged fasteners.',
      },
    ],
  },
  {
    id: 'stainless-steel',
    title: 'Stainless Steel Fasteners',
    subtitle: 'Corrosion resistance across atmospheric, chemical, marine, and sanitary environments.',
    grades: [
      {
        grade: 'SS304 / ASTM A193 B8',
        standard: 'ASTM A193 / ISO 3506-1 (A2-70)',
        description: 'General-purpose 18/8 austenitic stainless steel providing excellent resistance to atmospheric oxidation and mild chemicals.',
        chemicalComposition: 'Cr: 18.0-20.0% | Ni: 8.0-10.5% | C: 0.08% max',
        mechanicalProperties: 'Tensile Strength: 515 MPa min (Class 1) / 700 MPa min (Class 2 strain hardened)',
        applications: 'Food processing, water treatment plants, architectural fasteners, general industrial.',
      },
      {
        grade: 'SS316 / ASTM A193 B8M',
        standard: 'ASTM A193 / ISO 3506-1 (A4-80)',
        description: 'Molybdenum-bearing austenitic stainless steel delivering superior resistance to pitting corrosion in chloride and marine environments.',
        chemicalComposition: 'Cr: 16.0-18.0% | Ni: 10.0-14.0% | Mo: 2.0-3.0%',
        mechanicalProperties: 'Tensile Strength: 585 MPa min (Class 1) / 800 MPa min (Class 2 strain hardened)',
        applications: 'Offshore platforms, chemical processing reactors, coastal infrastructure, marine equipment.',
      },
    ],
  },
  {
    id: 'high-performance',
    title: 'High-Performance & Exotic Alloys',
    subtitle: 'Superior mechanical strength and resistance to extreme sour gas, seawater pitting, and aggressive acids.',
    grades: [
      {
        grade: 'Duplex 2205 (UNS S31803 / S32205)',
        standard: 'ASTM A276 / ASTM A479',
        description: 'Austenitic-ferritic microstructure combining twice the yield strength of 316 stainless with outstanding resistance to stress corrosion cracking.',
        chemicalComposition: 'Cr: 22% | Ni: 5% | Mo: 3% | N: 0.17% (PREN ~34)',
        mechanicalProperties: 'Tensile Strength: 760 - 900 MPa | Yield Strength: 550 MPa min',
        applications: 'Subsea manifolds, desalination plants, petrochemical heat exchangers.',
      },
      {
        grade: 'Super Duplex 2507 (UNS S32750)',
        standard: 'ASTM A276 / ASTM A479',
        description: 'Highly alloyed super duplex with PREN > 42, engineered for critical high-chloride seawater immersion and sour hydrocarbon handling.',
        chemicalComposition: 'Cr: 25% | Ni: 7% | Mo: 4% | N: 0.28%',
        mechanicalProperties: 'Tensile Strength: 800 - 1000 MPa | Yield Strength: 600 MPa min',
        applications: 'Deepwater oil & gas exploration, marine scrubbers, high-pressure brine systems.',
      },
      {
        grade: 'Inconel 625 (UNS N06625)',
        standard: 'ASTM B446 / NACE MR0175',
        description: 'Nickel-chromium-molybdenum superalloy with niobium addition, exhibiting virtually zero pitting in seawater and high fatigue resistance.',
        chemicalComposition: 'Ni: 58% min | Cr: 20-23% | Mo: 8-10% | Nb: 3.15-4.15%',
        mechanicalProperties: 'Tensile Strength: 827 MPa min | Yield Strength: 414 MPa min',
        applications: 'Nuclear reactor bolting, aerospace exhaust systems, subsea riser bolting.',
      },
      {
        grade: 'Monel 400 (UNS N04400)',
        standard: 'ASTM B164',
        description: 'Nickel-copper solid-solution alloy resistant to rapidly flowing seawater, hydrofluoric acid, and sulfuric acid solutions.',
        chemicalComposition: 'Ni: 63% min | Cu: 28-34% | Fe: 2.5% max',
        mechanicalProperties: 'Tensile Strength: 550 MPa min | Yield: 240 MPa min',
        applications: 'Marine propeller shafts, sulfuric acid alkylation units, naval marine hardware.',
      },
      {
        grade: 'Alloy 20 (UNS N08020)',
        standard: 'ASTM B473',
        description: 'Nickel-iron-chromium austenitic alloy stabilized with niobium, specifically formulated to resist sulfuric acid boiling conditions.',
        chemicalComposition: 'Ni: 32-38% | Cr: 19-21% | Mo: 2-3% | Cu: 3-4% | Nb: 1% max',
        mechanicalProperties: 'Tensile Strength: 551 MPa min | Yield: 241 MPa min',
        applications: 'Sulfuric acid pickling equipment, chemical storage tanks, synthetic rubber processing.',
      },
    ],
  },
];

export const TECHNICAL_STANDARDS: StandardItem[] = [
  {
    code: 'ASTM A193',
    title: 'Alloy-Steel and Stainless Steel Bolting for High Temperature or High Pressure Service',
    category: 'ASTM / ASME',
    coverage: 'Specifies material, tensile, yield, and testing for pressure vessels, valves, flanges, and fittings (Grades B7, B7M, B16, B8, B8M).',
    fastenersApplicable: ['Stud Bolts', 'Heavy Hex Bolts', 'Valve-Related Components'],
  },
  {
    code: 'ASTM A194',
    title: 'Carbon and Alloy Steel Nuts for Bolts for High Pressure or High Temperature Service',
    category: 'ASTM / ASME',
    coverage: 'Covers a variety of carbon, alloy, and martensitic/austenitic stainless steel nuts for high-pressure service (Grades 2H, 2HM, 7, 7M, 8, 8M).',
    fastenersApplicable: ['Heavy Hex Nuts', 'Hex Nuts', 'Valve-Related Components'],
  },
  {
    code: 'ASTM A320',
    title: 'Alloy-Steel and Stainless Steel Bolting for Low-Temperature Service',
    category: 'ASTM / ASME',
    coverage: 'Specifies low-temperature impact tested bolting materials for cryogenic and Arctic service (Grades L7, L7M, L43, B8).',
    fastenersApplicable: ['Stud Bolts', 'Heavy Hex Bolts'],
  },
  {
    code: 'ASTM A276',
    title: 'Standard Specification for Stainless Steel Bars and Shapes',
    category: 'ASTM Raw Material',
    coverage: 'Hot-finished or cold-finished bars of stainless and heat-resisting steel, duplex, and super duplex for fastener machining.',
    fastenersApplicable: ['CNC-Machined Fasteners', 'Stud Bolts', 'Special Fasteners'],
  },
  {
    code: 'ASTM A479',
    title: 'Stainless Steel Bars and Shapes for Use in Boilers and Other Pressure Vessels',
    category: 'ASTM Raw Material',
    coverage: 'Mandates strict chemistry, mechanical properties, and corrosion tests for bars used in pressure boundary equipment.',
    fastenersApplicable: ['Stud Bolts', 'Valve Components', 'Special Fasteners'],
  },
  {
    code: 'ASTM A240',
    title: 'Chromium and Chromium-Nickel Stainless Steel Plate, Sheet, and Strip for Pressure Vessels',
    category: 'ASTM Plate',
    coverage: 'Covers stainless steel plate used for custom washers, anchor bolt plates, and pressure flange shims.',
    fastenersApplicable: ['Washers', 'Anchor Bolts'],
  },
  {
    code: 'ASTM A820',
    title: 'Steel Fibers and Specialized Steel Material Standards',
    category: 'ASTM Material',
    coverage: 'Applicable standard for specialty steel compositions and testing referenced in engineering procurement profiles.',
    fastenersApplicable: ['Foundation Bolts', 'Special Fasteners'],
  },
  {
    code: 'ISO 3506-1',
    title: 'Mechanical Properties of Corrosion-Resistant Stainless Steel Fasteners',
    category: 'ISO International',
    coverage: 'Specifies the mechanical properties of bolts, screws, and studs made of austenitic, martensitic, and ferritic stainless steel.',
    fastenersApplicable: ['Hex Bolts', 'Stud Bolts', 'Lock Nuts'],
  },
  {
    code: 'DIN 976 (Type A & B)',
    title: 'Metric Threaded Rods and Stud Bolts',
    category: 'DIN Standard',
    coverage: 'Specifies continuous metric threaded rods with end forms: Type A (without point / flat sheared) and Type B (with chamfered point).',
    fastenersApplicable: ['Stud Bolts', 'Customized Threaded Components'],
  },
  {
    code: 'DIN 938 / DIN 939 / DIN 940',
    title: 'Studs with Tap-End Lengths (1d, 1.25d, 2.5d)',
    category: 'DIN Standard',
    coverage: 'Specifies engineering studs with tap-end thread lengths suited for casting, engine blocks, and valve body tapped holes.',
    fastenersApplicable: ['Stud Bolts', 'Valve-Related Components'],
  },
  {
    code: 'ISO 4753',
    title: 'Fasteners — Ends of Parts with External ISO Metric Thread',
    category: 'ISO Geometry',
    coverage: 'Specifies standard end chamfers, flat points, rounded points, cup points, and dog points for externally threaded fasteners.',
    fastenersApplicable: ['Stud Bolts', 'Customized Threaded Components', 'Hex Bolts'],
  },
];

export const MANUFACTURING_CAPABILITIES: ManufacturingProcess[] = [
  {
    id: 'cnc-machining',
    title: 'CNC Turning & Machining',
    description: 'High-precision computer numerical control turning centers for machining intricate fastener geometries, special heads, stepped shanks, and close-tolerance tapers.',
    equipment: 'Multi-axis CNC Turning Centers with digital tool probing & automatic bar feeding',
    capacity: 'Turning up to Ø80 mm bar capacity and 1,200 mm length',
    tolerance: '±0.01 mm on ground diameters',
  },
  {
    id: 'traub-machining',
    title: 'Traub High-Speed Machining',
    description: 'High-volume automatic single-spindle sliding headstock Traub machines for rapid, repeatable, and cost-effective production of small to medium diameter fasteners.',
    equipment: 'Automated Traub Lathes with bar feeder attachments',
    capacity: 'Diameters from M6 up to M32',
    tolerance: '±0.03 mm',
  },
  {
    id: 'vmc-machining',
    title: 'VMC (Vertical Machining Center)',
    description: 'Multi-axis vertical machining centers performing precision contouring, cross-hole drilling, slotting, and complex geometry on special fasteners and valve hardware.',
    equipment: 'Heavy-duty 3-Axis & 4-Axis Vertical Machining Centers',
    capacity: 'Table size 1,000 x 500 mm',
    tolerance: '±0.01 mm positioning accuracy',
  },
  {
    id: 'lathe-operations',
    title: 'Heavy Engine Lathe Operations',
    description: 'Heavy-duty conventional engine lathes for turning large-diameter forged bar stock, cutting special trapezoidal Acme threads, and machining heavy blanks.',
    equipment: 'Geared Precision Heavy-Duty Engine Lathes',
    capacity: 'Swing over bed up to 600 mm, turning length up to 3,000 mm',
    tolerance: '±0.05 mm',
  },
  {
    id: 'thread-rolling',
    title: 'Thread Rolling',
    description: 'Cold and warm thread rolling providing uninterrupted metallurgical grain flow, superior surface burnishing, and significantly enhanced fatigue strength over cut threads.',
    equipment: 'Two-Roll and Three-Roll Hydraulic Thread Rolling Machines',
    capacity: 'M8 to M100; continuous thread length up to 5,800 mm',
    tolerance: 'Class 6g / 6e / 2A / 3A pitch diameter control',
  },
  {
    id: 'forging',
    title: 'Hot Forging & Heading',
    description: 'Hot forging facilities for producing heavy hex heads, square bolt heads, and custom engineered bolt geometries with optimal structural grain flow.',
    equipment: 'Induction Billet Heating & Forging Mechanical/Hydraulic Presses',
    capacity: 'Bolt heads from M16 up to M64',
    tolerance: 'ASME B18.2.1 / DIN 931 dimensional compliance',
  },
  {
    id: 'milling',
    title: 'Precision Milling',
    description: 'Horizontal and vertical milling machines for machining flats, keyways, hex configurations, split slots, and custom locating faces on fasteners.',
    equipment: 'Universal Milling Machines & Dedicated Fixture Tooling',
    capacity: 'Stroke up to 800 mm x 400 mm',
    tolerance: '±0.02 mm on milled surfaces',
  },
  {
    id: 'drilling',
    title: 'Multi-Spindle & Radial Drilling',
    description: 'Precision radial and multi-spindle drilling operations for cotter pin holes, safety wire lock holes, axial through-holes, and deep foundation holes.',
    equipment: 'Heavy Radial Arm Drilling Machines and Gang Drills',
    capacity: 'Drilling diameters from Ø2 mm up to Ø65 mm',
    tolerance: 'H7 hole tolerance and precise radial location',
  },
  {
    id: 'tapping',
    title: 'Automatic Thread Tapping',
    description: 'Dedicated automatic nut tappers and lead-screw tapping stations producing clean, burr-free internal threads on standard and heavy hex nuts.',
    equipment: 'Automatic Pitch-Controlled High-Speed Nut Tappers',
    capacity: 'Tapping from M8 up to M100 (Metric Coarse/Fine & Imperial UNC/UNF)',
    tolerance: '6H / 2B / 3B thread tolerance verified by Go/No-Go plug gauges',
  },
  {
    id: 'centerless-grinding',
    title: 'Centerless Grinding',
    description: 'High-precision centerless cylindrical grinding ensuring tight diametrical tolerances, high roundness, and mirror-grade micro-finishes prior to thread rolling.',
    equipment: 'Precision Centerless Grinding Machines',
    capacity: 'Diameters from M8 up to M80',
    tolerance: 'h6 / h7 tolerance (down to 0.005 mm)',
  },
  {
    id: 'bandsaw-cutting',
    title: 'Automatic Bandsaw Cutting',
    description: 'High-speed automated horizontal bandsaw machines equipped with carbide-tipped bi-metal blades for square, burr-free cutting of high-alloy round bars.',
    equipment: 'Automated Hydraulic Horizontal Bandsaws with bundle cutting',
    capacity: 'Solid round bars up to Ø350 mm',
    tolerance: 'Length tolerance ±0.5 mm, squareness within 0.2°',
  },
];

export const INFRASTRUCTURE_GALLERY: InfrastructureItem[] = [
  {
    id: 'inf-1',
    title: 'CNC Turning & Machining Bay',
    category: 'CNC Machining',
    description: 'Multi-axis CNC turning bay equipped with digital tool presets and bar feeders for tight-tolerance aerospace and valve fasteners.',
    specs: 'Bar capacity up to Ø80 mm; length up to 1,200 mm',
    image: '/src/assets/images/facility_manufacturing_floor_1794387734940.jpg',
  },
  {
    id: 'inf-2',
    title: 'Heavy Stud Thread Rolling Station',
    category: 'Thread Rolling',
    description: 'High-tonnage hydraulic 3-roll thread rolling machines capable of forming continuous rolled threads up to 5,800 mm in length.',
    specs: 'Rolling pressure up to 40 metric tons; M8 to M100 capacity',
    image: '/src/assets/images/hero_fastener_manufacturing_1794387734224.jpg',
  },
  {
    id: 'inf-3',
    title: 'QA Inspection & Metrology Laboratory',
    category: 'Quality Metrology',
    description: 'Equipped with optical profile projectors, digital vernier calipers, thread pitch micrometers, hardness testers, and calibrated Go/No-Go gauges.',
    specs: 'Temperature-stabilized metrology room; calibrated gauges',
    image: '/src/assets/images/quality_inspection_lab_1794387735769.jpg',
  },
  {
    id: 'inf-4',
    title: 'Finished Fastener & Stock Inventory',
    category: 'Warehouse Logistics',
    description: 'Organized warehouse storage maintaining safety stocks of standard B7 stud bolts, 2H heavy nuts, and raw alloy round bars.',
    specs: '6,000 sq. ft. covered facility in Pune Industrial Zone',
    image: '/src/assets/images/product_stud_bolts_collection_1794387736457.jpg',
  },
  {
    id: 'inf-5',
    title: 'Hex Bolts & High-Tensile Hardware Bay',
    category: 'Bolting & Assembly',
    description: 'Inspection and batch packaging table for heavy hex structural bolts, Grade 8.8 / 10.9 fasteners, and hardened structural washers.',
    specs: 'M8 to M64 hex bolting assembly and visual audit',
    image: '/src/assets/images/product_hex_bolts_hardware_1794387736905.jpg',
  },
  {
    id: 'inf-6',
    title: 'Raw Material Storage & Automated Cutting',
    category: 'Raw Material Prep',
    description: 'High-speed automated horizontal bandsaw section cutting certified alloy and stainless steel bars with full heat-number tagging.',
    specs: 'Round bars up to Ø350 mm with 100% heat code tracking',
    image: '/src/assets/images/facility_manufacturing_floor_1794387734940.jpg',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Engineering Understanding',
    description: 'In-depth comprehension of ASTM/ASME standards, engineering drawings, GD&T tolerances, and severe-service operating environments.',
  },
  {
    title: 'Flexible Supply',
    description: 'Agile manufacturing and specialized raw material sourcing capability for both small-batch custom prototypes and high-volume production.',
  },
  {
    title: 'Traceability',
    description: 'Uncompromising commitment to complete material test certificates (EN 10204 Type 3.1) and heat code stamping for every production run.',
  },
  {
    title: 'Customization',
    description: 'Tailored manufacturing according to client engineering specifications, CAD drawings, unique thread profiles, and exotic superalloys.',
  },
  {
    title: 'Responsive Service',
    description: 'Dedicated technical response to urgent procurement requests, plant shutdown requirements, and fast-track delivery schedules.',
  },
  {
    title: 'Reliable Delivery',
    description: 'Strategic location in Pune Industrial Zone, just ~130 km from Nava Sheva Port (JNPT), Mumbai, ensuring rapid domestic and maritime dispatch.',
  },
];

export const APPLICATION_SECTORS = [
  {
    title: 'Oil & Gas',
    description: 'High pressure flanged piping, offshore platforms, subsea valve connections, and refinery reactors requiring ASTM A193 B7/B7M bolting.',
    icon: 'Flame',
  },
  {
    title: 'Industrial Engineering',
    description: 'Heavy machinery frames, rolling mills, hydraulic presses, gearboxes, and precision manufacturing equipment.',
    icon: 'Cog',
  },
  {
    title: 'Infrastructure',
    description: 'High-tensile structural bolting for steel bridges, highway flyovers, rail systems, and civil construction projects.',
    icon: 'Building2',
  },
  {
    title: 'Power & Energy',
    description: 'Turbine casing bolts, boiler headers, nuclear reactor auxiliary systems, and high-temperature thermal power bolting.',
    icon: 'Zap',
  },
  {
    title: 'Machinery & Equipment',
    description: 'Vibration-resistant fasteners, high-strength tie rods, and precision ground studs for industrial machine builders.',
    icon: 'Wrench',
  },
  {
    title: 'Valve Manufacturing',
    description: 'API 20E BSL 1 compliant bonnet studs, body bolts, packing gland hardware, and stem nuts for ball, gate, and globe valves.',
    icon: 'Sliders',
  },
  {
    title: 'Construction',
    description: 'Cast-in-place anchor bolts, heavy foundation cages, embedment plates, and pre-engineered building (PEB) connection hardware.',
    icon: 'HardHat',
  },
];
