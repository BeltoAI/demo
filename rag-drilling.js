// ─────────────────────────────────────────────────────────────────────────────
// SlyOS Local RAG Engine — Oil Rig & Drilling Reference
// Source PDFs: NOV e-Wildcat 2.0 ADS Handbook, WellData/RT 18 Manual,
//              DRILCO Drilling Assembly Handbook, API RP 13B-1 (WBM Testing)
// TF-IDF + IDF-weighted retrieval. No cloud. 100% on-device.
// ─────────────────────────────────────────────────────────────────────────────

export const DRILLING_META = {
  title: 'Oil Rig & Drilling Operations Reference',
  version: 'NOV e-Wildcat 2.0 · WellData/RT 18 · DRILCO Handbook · API RP 13B-1',
  pages: 410,
  domain: 'Oil & Gas Drilling',
  chunks: 0,
};

// ── 30 Knowledge chunks drawn from actual PDF text ───────────────────────────
export const DRILLING_CHUNKS = [

  // ── NOV e-WILDCAT 2.0 AUTOMATIC DRILLING SYSTEM ─────────────────────────
  {
    page: 11,
    category: 'e-Wildcat 2.0 ADS',
    source: 'NOV Doc 16654800-MAN Rev 02',
    section: 'System Overview — Parameters & Control Logic',
    text: 'The NOV e-Wildcat 2.0 system (option with RigSense 3.21+) monitors up to four drilling parameters simultaneously: Weight on Bit (WOB), Rate of Penetration (ROP), rotary/top-drive Torque, and Differential Pressure (Diff Press / Delta P). As WOB and/or Diff Press decreases during drilling, e-Wildcat pays out the drill line by lifting the drawworks brake handle via a stepper motor. The parameter currently in control turns cyan on the RigSense screen. If WOB is below target, payoff increases as long as no other parameter (e.g. ROP) exceeds its target. The system provides steady-state weight and/or differential pressure to improve wellbore quality and ROP.'
  },
  {
    page: 13,
    category: 'e-Wildcat 2.0 ADS',
    source: 'NOV Doc 16654800-MAN Rev 02',
    section: 'Auto Drill Mode — Theory of Operations',
    text: 'In Auto Drill mode, e-Wildcat continuously pays out the drill line by controlling the drawworks brakes with computerized feedback control of one or more drilling parameters. The Driller sets the primary parameter target value to optimise performance. When switching between drilling modes (e.g. Auto Drill to Time Drill), e-Wildcat must be turned OFF (disengaged) first. Once started in a mode it should remain in that mode. The system turns OFF automatically when a Drill Stop Point is reached. Zero WOB and Diff Press must be performed after each connection with pumps SPM set BEFORE tagging bottom, to establish the correct reference baseline.'
  },
  {
    page: 15,
    category: 'e-Wildcat 2.0 ADS',
    source: 'NOV Doc 16654800-MAN Rev 02',
    section: 'Time Drill Mode — Controlled Increment Drilling',
    text: 'Time Drill mode can be used to mill an opening into the side of casing and to re-enter the hole after a cement plug has been set. The Driller sets two parameters: (1) WC Incr Distance — the drilling distance for a set time interval; (2) WC Time Interval — time amount in minutes. The controller advances the drill string in small increments at the set rate. Time Drill is displayed in EZView. Selecting Auto Drill or Time Drill toggle disables the system, requiring manual re-enable. Block Height and Ream Speed are fixed EZView channels that cannot be replaced.'
  },
  {
    page: 19,
    category: 'e-Wildcat 2.0 ADS',
    source: 'NOV Doc 16654800-MAN Rev 02',
    section: 'Auto Drill Screen — Status Indicators & Control Response',
    text: 'Auto Drill screen features: Status Indicators at top centre — e-Wildcat button red when disabled, green when enabled; WC Kill Switch and WC Motor buttons also green when engaged. System Messages provide notifications when a profile is added, error detected, or Drill Stop Point reached. Control Response displays values in increments of 5 (snaps to nearest increment — e.g. 10 decreases to 5, increases to 15). Three EZView channels in lower half: Drill Stop Point and Block Height/Ream Speed are fixed; third EZView is Driller-selectable (e.g. WC A/D Status). Profiles allow creation of specific drilling criteria for saving and reloading.'
  },
  {
    page: 22,
    category: 'e-Wildcat 2.0 ADS',
    source: 'NOV Doc 16654800-MAN Rev 02',
    section: 'Profile Guidelines — Canada Rotating, Sliding & Self Adjust',
    text: 'For Canada operations: when Profiles is selected, at least three Profile Names must be present — Rotating, Sliding, and Self Adjust. If Self Adjust is not displayed, rename Profile 6 to Self Adjust. Canada profile settings: Set ROP to 30 m/hr and WOB to 10 KdaN. Do NOT select Diff Press and Torque profiles for Canada. The Active button must be selected for a profile to take effect. Target Diff Press and Target Torque Enable buttons activate those parameters when required. Click Exit to return to the main e-Wildcat drill screen. Contextual help (?) overlays are available for all screens.'
  },

  // ── NOV WELLDATA/RT 18 ────────────────────────────────────────────────────
  {
    page: 3,
    category: 'WellData/RT 18',
    source: 'NOV Doc 42TM67-07-MAN Rev B',
    section: 'System Overview — Real-Time Drilling Data Monitoring',
    text: 'WellData/RT 18 (NOV Document 42TM67-07-MAN) is a website-based real-time drilling information system covering Sustaining Releases 1–4. Key capabilities include: real-time monitoring of drilling parameters, torque and drag modelling, toolface display for directional drilling, 3D wellbore plot with Well Plan overlay, time-depth recorder with colour coding for on-bottom sliding, configurable calculated channels, improved note font size options, RPM filtering for toolface settings, and digital signature for executing the WellData/RT client application. Data is acquired from rig sensors and displayed in configurable EZView panels on the driller\'s console.'
  },
  {
    page: 6,
    category: 'WellData/RT 18',
    source: 'NOV Doc 42TM67-07-MAN Rev B',
    section: 'Torque & Drag — Modelling & Monitoring',
    text: 'WellData/RT 18 Revision A introduced full torque and drag functionality. The system models friction forces on the drill string during tripping (drag) and rotation (torque) using wellbore trajectory, drill string components, and mud weight data. On-bottom sliding is colour-coded on the Time-Depth Recorder to differentiate rotating and sliding drilling modes. Calculated channels allow derived parameters (e.g. MSE — Mechanical Specific Energy, ECD — Equivalent Circulating Density) to be displayed alongside raw sensor data. Torque and drag analysis identifies over-pull and set-down weight anomalies indicative of stuck pipe or wellbore geometry issues.'
  },
  {
    page: 8,
    category: 'WellData/RT 18',
    source: 'NOV Doc 42TM67-07-MAN Rev B',
    section: 'Toolface & Directional Drilling Screens',
    text: 'WellData/RT 18 includes a dedicated Toolface display option in EZView for monitoring directional drilling in sliding mode. The 3D plot screen shows the actual wellbore trajectory against the planned well path (Well Plan) and persists configuration between sessions. RPM filtering is available in Toolface settings to reduce noise in rotation speed measurement during low-RPM sliding. Tooltip transparency, background colours, and control colours are all configurable. The system supports MWD/LWD real-time survey data integration for live wellbore position updates.'
  },

  // ── DRILCO DRILLING ASSEMBLY HANDBOOK ────────────────────────────────────
  {
    page: 1,
    category: 'DRILCO BHA',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'BHA Overview — Purpose & Design Objectives',
    text: 'The bottomhole assembly (BHA) consists of tools between the bit and the drillpipe. Modern BHAs are typically 500–1,000 ft (150–300 m) long and include drill collars, stabilisers, MWD/LWD tools, jars, and shock subs. A correctly designed BHA: (1) prevents doglegs and keyseats; (2) produces a smooth, full-gauge borehole; (3) improves drill bit performance; (4) minimises differential pressure sticking; (5) minimises harmful shock and vibration; (6) reduces post-drilling production problems. The BHA is the primary tool for controlling wellbore trajectory and rate of penetration. Beyond providing weight-on-bit from drill collar mass, it must guide the bit in the desired direction.'
  },
  {
    page: 4,
    category: 'DRILCO BHA',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Packed Hole Theory — Stabiliser Placement Principles',
    text: 'The packed hole assembly uses a series of stabilisers to guide the bit straight ahead by forcing it to follow the existing hole direction. Single stabiliser just above the bit acts as a fulcrum, building angle. Adding a second point 30 ft (10 m) above the bit reduces this fulcrum effect but is still not ideal — two points follow a curved line. Three or more stabilising contact points are required for a true packed hole assembly; three points cannot follow a sharp curve, forcing the assembly to drill straight. Three stabiliser zones are defined: Zone 1 (near-bit), Zone 2 (~30–60 ft above bit), Zone 3 (upper BHA). All three zones must be populated for maximum effectiveness in crooked hole country.'
  },
  {
    page: 6,
    category: 'DRILCO BHA',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Crooked Hole Country — Mild, Medium & Severe Assemblies',
    text: 'Mild crooked hole country: Zone 1 near-bit stabiliser + Zone 2 stabiliser + Zone 3 string stabiliser — limits angle change due to lateral forces. Medium crooked hole country: two stabilising tools in tandem in Zone 1 (increased stiffness and wall contact) plus Zone 2 and Zone 3. Severe crooked hole country: three tools in tandem in Zone 1 for maximum stiffness; in 8¾-in. and smaller hole sizes, a large-diameter short collar between Zone 2 and Zone 3 is also recommended to reduce assembly deflection. For hard-to-medium-hard formations, a rolling cutter reamer is used in Zone 1-A (directly above the bit) when bit gauge is a problem; a six-point reamer is required for extreme conditions.'
  },
  {
    page: 7,
    category: 'DRILCO BHA',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Stabilising Tool Types — Rotating Blade, Non-Rotating Sleeve & Reamer',
    text: 'Three basic types of stabilising tools: (1) Rotating Blade — straight or spiral blade, short or long; available as shop-repairable (integral blade, welded blade, or shrunk-on sleeve) or rig-repairable (replaceable metal sleeve, e.g. Ezy-Change). Welded blade not recommended in hard formations due to fatigue damage in the weld zone. Hardfacing materials include granular tungsten carbide and Bordalloy. (2) Non-rotating sleeve — minimal formation damage, best for soft formations or when avoiding wall contact damage. (3) Rolling cutter reamer — used when bit gauge is a problem in hard and abrasive formations; six-point preferred for extreme conditions. Rotating blade tools are effective in Zone 2 for all crooked hole severities.'
  },
  {
    page: 10,
    category: 'DRILCO BHA',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Differential Pressure Sticking — Causes & Prevention',
    text: 'Differential wall sticking (differential pressure sticking) occurs when drillpipe or drill collars block fluid flow from the borehole into a permeable formation where hydrostatic head exceeds formation pressure. Filter cake builds up on the borehole wall; the smooth tool surface seals against the cake, creating very high contact forces that prevent pipe movement. Prevention methods: (1) Use a packed hole assembly to hold the string off the borehole wall; (2) Use spiral drill collars — the spiral groove equalises pressure in the stuck area and reduces contact area; (3) Space stabilisers throughout the drillstring to keep collars centred. If stuck, apply torque first, then pull to slack-off weight. Diesel oil or spotting fluid pumped to the stuck zone reduces filter cake adhesion.'
  },
  {
    page: 9,
    category: 'DRILCO BHA',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Downhole Vibration — Shock Subs & Vibration Dampeners',
    text: 'Downhole vibrations are a major cause of drill collar failures, reduced bit life, and reduced ROP. DRILCO introduced the first Shock Sub vibration dampener in 1959 after fields experienced 10–15 drill collar failures per well in 12¼-in. holes to 6,000 ft depth. Benefits of vibration dampeners: (1) eliminates drill collar fatigue failures; (2) increases bit life by reducing shock loading to cones and bearings; (3) allows higher WOB and RPM for increased daily footage. MWD and LWD data now confirm that vertical, lateral, and torsional vibrations all occur simultaneously at the bit. BHA instrumentation measures bit weight, RPM, and vibration downhole to allow surface optimisation. Rough-running formations (hard broken rock) cause bit bounce and tooth/insert breakage — dampeners allow desired WOB and speed to be maintained.'
  },
  {
    page: 15,
    category: 'DRILCO BHA',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Dogleg Severity — Drillpipe Fatigue & Keyseat Risk',
    text: 'Rate of hole angle change (dogleg severity) is expressed in degrees per 100 ft. Lubinski (1961) showed that dogleg severity, not total hole angle, is the critical factor. API published tabular limits for maximum permissible doglegs for rotary drilling and completions. Rotating drillpipe through a dogleg causes cyclic bending stress — if the endurance limit is exceeded (e.g. 4½-in. 16.60 lb/ft Grade E pipe in 10 lb/gal mud), fatigue failure occurs leading to a fishing job or junked hole. Keyseats form when the bit drills a straight hole but the drill collars cut a groove at a dogleg, creating a ledge that traps wireline logging tools and casing. Reducing bit weight to straighten hole must be done very gradually to avoid creating new sharp bends.'
  },
  {
    page: 11,
    category: 'DRILCO Bit',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Bit Stabilisation — Misalignment Effects & Performance',
    text: 'Bit stabilisation directly controls bit performance and life. Angular misalignment occurs when the drill collar above the bit leans against the hole wall. In an 8¾-in. hole, 7-in. collars reduce but do not eliminate misalignment. Two harmful consequences: (1) full WOB shifts between cones, causing rapid breakdown of tooth structure and bearings; (2) gauge cutting surfaces at the tops of outer tooth rows break down (apple-shape cones), severely reducing bit life. Gauge bits (PDC, journal bearing, sealed bearing) show dramatic improvement with properly stabilised BHAs. Rule: the higher the degree of stabilisation, the greater the improvement in bit performance. Never run large-diameter bits (17½-in.+) with unstabilised small-diameter drill collars.'
  },
  {
    page: 12,
    category: 'DRILCO Drill String',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Drill Collar Care — Handling, Lubrication & Connection Makeup',
    text: 'Drill collars can be ruined on the first trip if not properly handled: (1) Use cast-steel thread protectors with lifting bail for transport; protect the pin also. (2) Clean connections with solvent and inspect for burrs or shoulder damage. (3) Apply API RP 7A1-grade thread compound (minimum 40–60% by weight metallic zinc or similar) to both threads AND shoulders on pin and box. (4) Measure makeup torque accurately with a calibrated load cell — never estimate. (5) Apply a long steady cathead pull, not a jerk; verify line is at 90° to the tong handle. (6) Immediately repair minor damage — torque-induced damage (swelled boxes, stretched pins, galling) is the primary cause of connection failure. Balanced pin-to-box bending strength ratio per API RP 7G is essential for connection selection.'
  },
  {
    page: 13,
    category: 'DRILCO Drill String',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Drill Collar Makeup Torque — Procedure & Typical Values',
    text: 'Makeup torque for drill collars must be measured with a line pull device (hydraulic load cell) at 90° to the tong handle. Example for a 6½-in. OD × 2-13/16-in. ID drill collar with NC 50 connection: minimum torque = 29,679 lbf·ft (43,657 N·m). Calculation: torque (lbf·ft) ÷ effective tong arm length (ft) = required cathead pull (lbf). For 50-in. tongs (4.2 ft): 29,679 ÷ 4.2 = 7,066 lbf of cathead pull required. Torque values in tables are minimum requirements — use the Automatic Torque Control System (ATCS) where available for consistent, accurate makeup and to free the driller from watching gauges. Multiple line hookups multiply the available line pull — ensure no crossed/twisted lines, and clear the area before maximum pull is applied.'
  },
  {
    page: 14,
    category: 'DRILCO Drill String',
    source: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions',
    section: 'Hevi-Wate Drillpipe (HWDP) — Role & Placement',
    text: 'Hevi-Wate drillpipe (HWDP) is a transition element between drill collars and standard drillpipe. It provides a gradual stiffness change, reducing stress concentration at the top of the drill collar string. Key uses: (1) adds weight in directional wells where heavy drill collars cannot be run in compression without risk of buckling; (2) reduces differential pressure sticking risk compared to smooth drill collars (HWDP has a central upset adding wall standoff); (3) used as a jar bumper above hydraulic jars to provide impact mass. HWDP is typically run in 15-joint (1,500 ft / 450 m) strings above the drill collar string. Placement of jars: hydraulic jar placed in the transition zone between drill collars and HWDP, above the neutral point, with at least 3–5 drill collars below and HWDP bumper jars above.'
  },

  // ── API RP 13B-1 — WATER-BASED MUD FIELD TESTING ────────────────────────
  {
    page: 1,
    category: 'API RP 13B-1 WBM',
    source: 'ANSI/API RP 13B-1, 4th Edition 2009 (ISO 10414-1:2008)',
    section: 'Scope — Water-Based Mud Field Testing Overview',
    text: 'API RP 13B-1 (4th Ed., 2009) establishes standardised field procedures for testing water-based drilling fluids. Required tests: (a) drilling fluid density (mud weight); (b) viscosity and gel strength; (c) filtration; (d) water, oil and solids contents; (e) sand content; (f) methylene blue capacity (MBT); (g) pH; (h) alkalinity and lime content; (i) chloride content; (j) total hardness as calcium. Annexes cover chemical analysis (Ca, Mg, CaSO₄, sulphide, carbonate, K), shear strength, resistivity, air removal, drill-pipe corrosion monitoring, rig-site sampling, calibration of glassware/thermometers/viscometers/retort kit, and HTHP permeability-plugging testing. All testing performed at rig site without laboratory equipment.'
  },
  {
    page: 5,
    category: 'API RP 13B-1 WBM',
    source: 'ANSI/API RP 13B-1, 4th Edition 2009 (ISO 10414-1:2008)',
    section: 'Mud Density — Measurement with Drilling Fluid Balance',
    text: 'Mud weight (drilling fluid density) is measured using a calibrated mud balance (drilling fluid balance). Procedure: (1) fill the cup completely, ensuring no air bubbles; (2) place the cap on, rinse excess fluid from exterior; (3) place on the stand and move the rider until the beam balances; (4) read density at the graduated scale. Units: pounds per gallon (ppg), pounds per cubic foot (lb/ft³), kg/m³, or specific gravity. Verify calibration with fresh water (8.33 ppg / 1.0 SG). High-pressure mud balance is used for heavyweight muds. Mud weight must be controlled within ±0.1 ppg of the design window to maintain primary well control (overbalance against formation pore pressure without exceeding fracture gradient).'
  },
  {
    page: 6,
    category: 'API RP 13B-1 WBM',
    source: 'ANSI/API RP 13B-1, 4th Edition 2009 (ISO 10414-1:2008)',
    section: 'Viscosity — Marsh Funnel & Direct-Indicating Viscometer',
    text: 'Viscosity testing uses two methods: (1) Marsh Funnel — measures the time in seconds for 1 quart (946 mL) of mud to flow through the funnel; fresh water should read 26 ± 0.5 s. Provides a quick field indication of gross viscosity changes but is not a true rheological measurement. (2) Direct-indicating viscometer (rotational viscometer, e.g. Fann VG meter) — measures at 600 RPM and 300 RPM dial readings. Plastic Viscosity (PV) = R600 − R300 (millipascal seconds, mPa·s). Yield Point (YP) = R300 − PV (lb/100 ft²). Gel strength (10-sec and 10-min) measured at 3 RPM after static periods. These parameters characterise mud rheology for hydraulics calculations and cutting transport efficiency.'
  },
  {
    page: 7,
    category: 'API RP 13B-1 WBM',
    source: 'ANSI/API RP 13B-1, 4th Edition 2009 (ISO 10414-1:2008)',
    section: 'Filtration Testing — API LTLP & HTHP Fluid Loss',
    text: 'Filtration (fluid loss) testing has two methods: (1) API Low-Temperature/Low-Pressure (LTLP) test — 100 psi differential, 30-minute collection, room temperature, 7.5-cm diameter filter paper. Report filtrate volume (mL/30 min) and describe filter cake thickness (mm) and characteristics (soft, firm, tough, rubbery). Typical WBM API filtrate target: <15 mL/30 min. (2) HTHP test — elevated temperature and pressure (simulate downhole conditions); typically run at 150°C (300°F) and 500 psi differential for 30 minutes; report HTHP filtrate as 2× the collected volume. Thick, tough filter cakes indicate high filtrate, increasing risk of differential sticking. Filtrate reducers (CMC, PAC, starch, barite) are added to control fluid loss.'
  },
  {
    page: 8,
    category: 'API RP 13B-1 WBM',
    source: 'ANSI/API RP 13B-1, 4th Edition 2009 (ISO 10414-1:2008)',
    section: 'Solids Content — Retort Analysis & Calculations',
    text: 'Retort analysis measures water, oil, and solids content by distillation. Procedure: fill retort cup with a known volume of mud, heat to drive off liquids (water and oil), collect distillate, and calculate volumes. Solids % by volume = 100 − %water − %oil. Low-gravity solids (LGS) and high-gravity solids (barite/HGS) are calculated from density and total solids. Key symbols: ρdf = drilling fluid density (g/mL); ρlg = density of low-gravity solids (2.6 g/mL if unknown); ρo = oil density (0.8 g/mL if unknown). High LGS concentration reduces ROP, increases ECD, and causes bit balling. Target: LGS <6% by volume in unweighted muds; <3% in weighted muds. Solids control equipment (shakers, desander, desilter, centrifuge) sized to maintain LGS within targets.'
  },
  {
    page: 9,
    category: 'API RP 13B-1 WBM',
    source: 'ANSI/API RP 13B-1, 4th Edition 2009 (ISO 10414-1:2008)',
    section: 'pH & Alkalinity — Measurement & Significance',
    text: 'pH is measured with a calibrated pH electrode (glass membrane electrode + reference electrode). Rinse electrodes with distilled water, blot dry, immerse in mud sample, and read after stabilisation. Care of electrode: store in pH 4 buffer or electrode storage solution; never let dry; recalibrate every 8 hours or after temperature change. WBM pH typically maintained at 9.5–11.5 for inhibition and corrosion control. Alkalinity tests: Pf (phenolphthalein filtrate alkalinity) and Pm (phenolphthalein mud alkalinity) use phenolphthalein indicator; Mf (methyl orange filtrate alkalinity) uses methyl orange. Lime content (lb/bbl) = 0.26 × (Pm − Fw × Pf) where Fw = water fraction. High alkalinity required for effective lime/gypsum mud systems and for H₂S scavenging with iron compounds.'
  },
  {
    page: 10,
    category: 'API RP 13B-1 WBM',
    source: 'ANSI/API RP 13B-1, 4th Edition 2009 (ISO 10414-1:2008)',
    section: 'Chloride Content & Total Hardness — Field Titration',
    text: 'Chloride content is determined by silver nitrate (AgNO₃) titration: add potassium chromate indicator to the filtrate sample; titrate with 0.282 N AgNO₃ until colour changes from yellow to brick-red (chromate endpoint). Cl⁻ (mg/L) = mL of AgNO₃ × 1,000 / sample volume. High chloride indicates saltwater influx or formation salinisation — a well control and mud design concern. Total hardness as calcium: EDTA titration method — add Eriochrome Black T indicator; titrate with 0.02 M EDTA until colour changes from red to blue. Total hardness (mg/L as Ca²⁺) = mL EDTA × 400 / sample volume. Calcium >200 mg/L reduces effectiveness of polymer mud systems and signals need for calcium-treating agents. Sand content measured with sand screen and gauge: >0.5% v/v is excessive and indicates screen shaker problems.'
  },
  {
    page: 11,
    category: 'API RP 13B-1 WBM',
    source: 'ANSI/API RP 13B-1, 4th Edition 2009 (ISO 10414-1:2008)',
    section: 'Methylene Blue Test (MBT) — Clay & Shale Content',
    text: 'The Methylene Blue Test (MBT) quantifies reactive clays (montmorillonite/bentonite) in the mud. Procedure: add methylene blue dye solution in measured increments to an acid-treated mud sample; after each addition, spot a drop on filter paper and check for a blue halo (teal ring) around the spot — teal halo = end point. MBT value (lb/bbl bentonite equivalent) = mL methylene blue × 5. High MBT (>25 lb/bbl) indicates high reactive clay content, leading to viscosity buildup and potential balling. Low MBT in a fresh WBM indicates insufficient bentonite for adequate filtration control. The MBT correlates with cation exchange capacity (CEC) of the mud. Shale inhibition efficiency of potassium chloride (KCl) and other inhibitors is assessed by comparing MBT before and after circulation through reactive shale sections.'
  },

  // ── GENERAL DRILLING OPERATIONS ──────────────────────────────────────────
  {
    page: 20,
    category: 'Drilling Operations',
    source: 'DRILCO Handbook + API RP 13B-1',
    section: 'Stuck Pipe — Recognition, Types & Freeing Techniques',
    text: 'Types of stuck pipe: (1) Differential pressure sticking — string becomes motionless while circulation continues; occurs in permeable zones where hydrostatic exceeds pore pressure; (2) Mechanical sticking — caused by hole collapse, keyseats, undergauge hole, packoff (cuttings accumulation), or BHA balling; (3) Cement sticking — pipe set in cement before displacement complete. Warning signs: sudden increase in drag or torque, inability to rotate while circulating, pit gain or loss. Freeing differential stuck pipe: immediately apply torque to prevent filter cake hardening; pump spotting fluid (diesel oil + emulsifier or purpose-made spotting fluid); allow 4–8 hours soak time; work pipe (jar up and down) to break cake. Jarring: always jar up first in differential sticking (downward jars have no effect on filter cake). String should never be set down weight while differentially stuck — this increases contact area and makes freeing harder.'
  },
  {
    page: 22,
    category: 'Drilling Operations',
    source: 'DRILCO Handbook',
    section: 'Jar Placement & Operation — Hydraulic & Mechanical Jars',
    text: 'Jar placement rules: (1) jars must be placed above the neutral point (transition from compression to tension in the drill string); (2) HWDP bumper jars (typically 4–6 joints) must be run above the jar to provide impact mass; (3) do not place the jar in the transition zone between drill collars and HWDP without adequate bumper jars above. Hydraulic jars: delay mechanism allows energy to build before release — setting time adjustable (typically 10–30 seconds). Mechanical jars: immediate release when overpull force is achieved. Jarring procedure: set down or pick up to cock the jar, then apply overpull or set-down weight sharply. Maximum overpull for jarring = drill string tensile rating minus hook load minus safety margin. Never apply more than 80% of the drill string maximum tensile rating as overpull.'
  },
  {
    page: 25,
    category: 'Drilling Operations',
    source: 'DRILCO Handbook + NOV WellData/RT',
    section: 'Equivalent Circulating Density (ECD) — Calculation & Management',
    text: 'Equivalent Circulating Density (ECD) is the effective mud density at a given depth while circulating, including the annular pressure losses due to fluid movement. Formula: ECD (ppg) = Static mud weight (ppg) + Annular pressure loss (psi) / (0.052 × True Vertical Depth, ft). ECD must remain below the formation fracture gradient to prevent lost circulation. ECD increases with: higher pump rate, higher mud viscosity, narrower annulus, greater depth, and higher cuttings loading. Reducing ECD: reduce pump rate, reduce mud PV/YP, increase hole size, or use managed pressure drilling (MPD). ECD is calculated and displayed in WellData/RT as a derived channel. During connections (pumps off), ECD drops to static mud weight — this swabbing effect can cause wellbore instability in narrow mud weight windows.'
  },
  {
    page: 28,
    category: 'Drilling Operations',
    source: 'API RP 13B-1 + DRILCO Handbook',
    section: 'Hole Cleaning — Cutting Transport & Annular Velocity',
    text: 'Cutting transport efficiency depends on: (1) Annular velocity (AV) — minimum 100–150 ft/min (0.5–0.75 m/s) in vertical holes; higher in deviated wells. (2) Yield point (YP) — higher YP improves cutting suspension in low-flow conditions; target YP >15 lb/100 ft² in deviated wells. (3) Rotation — rotating the drill string (top drive or rotary) greatly improves cutting transport by disrupting the cutting bed. (4) Mud density — heavier mud provides more buoyancy. Poor hole cleaning signs: increasing torque and drag, erratic weight indicator during tripping, cuttings lag behind predicted value, high cuttings volume on shaker screens returning after a connection. Recommended practice: circulate to clean the hole (observe shaker returns) before making connections in deviated wells. Pump rate should be maximised within ECD and surface equipment limits during horizontal drilling.'
  },
  {
    page: 30,
    category: 'Drilling Operations',
    source: 'DRILCO Handbook',
    section: 'Well Control — Kick Indicators & BOP Response',
    text: 'Primary kick indicators during drilling: (1) pit gain — increase in active pit volume while pumping (confirm by stopping pumps; if gain continues, formation fluid is entering); (2) flow-check — shut-in and observe for flow; (3) drilling break — sudden increase in ROP without parameter change; (4) change in pump pressure/stroke; (5) connection gas — elevated gas reading after a connection, suggesting the hydrostatic dropped during the connection. Upon kick detection: pick up off bottom, shut in annular BOP, read Shut-In Drill Pipe Pressure (SIDPP) and Shut-In Casing Pressure (SICP). SIDPP = formation pressure minus hydrostatic at bit. Kill weight mud = SIDPP / (0.052 × TVD) + static mud weight. Circulate kill mud using Driller\'s Method (two circulations) or Wait-and-Weight method (one circulation with kill weight mud).'
  },
];

// ── Sources per category ──────────────────────────────────────────────────────
export const DRILLING_SOURCES = {
  'e-Wildcat 2.0 ADS': [
    { label: 'NOV e-Wildcat 2.0 Operator Manual (Doc 16654800-MAN Rev 02)', url: 'https://assets.nov.com/NCP4N68N/at/r8rrrmtg2vqp3hg9vbs93grx/e_Wildcat_2_0_Automatic_Drilling_System_Handbook.pdf' },
    { label: 'NOV RigSense Integration Guide', url: 'https://www.nov.com/segments/rig-technologies/control-systems' },
  ],
  'WellData/RT 18': [
    { label: 'WellData/RT 18 Operator Manual (Doc 42TM67-07-MAN Rev B)', url: 'https://www.welldata.net/Help/RTHelp.pdf' },
    { label: 'NOV Wellsite Information Systems', url: 'https://www.nov.com/segments/rig-technologies/welldata' },
  ],
  'DRILCO BHA': [
    { label: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions', url: 'https://www.wellboreintegrity.com/wp-content/uploads/2023/01/DRILCO_Drilling-Assembly-Hndbk_WIS-BR-MKT-021_r2_ELEC.pdf' },
    { label: 'API RP 7G — Drill Stem Design & Operating Limits', url: 'https://www.api.org/products-and-services/standards/important-standards-documents/api-rp-7g' },
    { label: 'SPE — Drilling Engineering Resources', url: 'https://www.spe.org/en/industry/drilling' },
  ],
  'DRILCO Bit': [
    { label: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions', url: 'https://www.wellboreintegrity.com/wp-content/uploads/2023/01/DRILCO_Drilling-Assembly-Hndbk_WIS-BR-MKT-021_r2_ELEC.pdf' },
    { label: 'IADC Drilling Manual', url: 'https://www.iadc.org/publications' },
  ],
  'DRILCO Drill String': [
    { label: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions', url: 'https://www.wellboreintegrity.com/wp-content/uploads/2023/01/DRILCO_Drilling-Assembly-Hndbk_WIS-BR-MKT-021_r2_ELEC.pdf' },
    { label: 'API RP 7A1 — Testing Thread Compound for Rotary Shouldered Connections', url: 'https://www.api.org' },
  ],
  'API RP 13B-1 WBM': [
    { label: 'API RP 13B-1, 4th Ed. (ANSI/ISO 10414-1:2008) — WBM Field Testing', url: 'https://www.drillingmanual.com/api-rp-13b-1-download-pdf-best-practice-for-field-testing-wbm/' },
    { label: 'API Technical Reports — Drilling Fluids', url: 'https://www.api.org/products-and-services/standards/key-industry-standards/drilling-fluids' },
    { label: 'IADC Drilling Fluids Manual', url: 'https://www.iadc.org' },
  ],
  'Drilling Operations': [
    { label: 'DRILCO Drilling Assembly Handbook — Wellbore Integrity Solutions', url: 'https://www.wellboreintegrity.com/wp-content/uploads/2023/01/DRILCO_Drilling-Assembly-Hndbk_WIS-BR-MKT-021_r2_ELEC.pdf' },
    { label: 'IADC Well Control Manual', url: 'https://www.iadc.org/publications/well-control' },
    { label: 'SPE Drilling & Completion Journal', url: 'https://www.spe.org/en/jpt/jptdiscipline/?disc=Drilling' },
    { label: 'Practical Well Planning and Drilling Manual — Devereux', url: 'http://182.72.188.194:8080/jspui/bitstream/123456789/1560/1/Practical%20Well%20Planning%20and%20Drilling%20Manual%20by%20Steve%20Devereux.pdf' },
  ],
};

// ── TF-IDF Retrieval Engine ───────────────────────────────────────────────────
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'by','from','is','are','was','were','be','been','being','have','has',
  'had','do','does','did','will','would','could','should','may','might',
  'this','that','these','those','you','he','she','we','they',
  'what','which','who','how','when','where','why','can','not','no','if',
  'as','so','than','then','its','their','there','also','per',
  'after','before','each','more','any','all','use','used','using','within',
  'during','without','between','above','below','through','into','over',
  'under','around','about','against','following',
]);

// Drilling synonym/alias expansion
const DRILLING_SYNONYMS = {
  'auto drill':         ['autodrill','wob','rop','drawworks','brake','payoff','ewildcat'],
  'e-wildcat':          ['ewildcat','autodrill','auto drill','nov','rigse','drawworks'],
  'wildcat':            ['ewildcat','auto drill','nov','rigse','rop','wob'],
  'wob':                ['weight on bit','auto drill','ewildcat','payoff'],
  'rop':                ['rate of penetration','auto drill','ewildcat','wob'],
  'time drill':         ['timedrill','increment','wc incr','wc time','casing milling'],
  'bha':                ['bottom hole assembly','drill collar','stabiliser','hwdp','drilling assembly'],
  'stabiliser':         ['bha','stabilizer','packed hole','formation','gauge'],
  'stabilizer':         ['bha','stabiliser','packed hole','formation','gauge'],
  'stuck pipe':         ['differential','sticking','jar','freeing','over pull'],
  'differential pressure': ['diff press','delta p','filter cake','sticking','stuck pipe'],
  'mud weight':         ['mud balance','ppg','mud density','api 13b','drilling fluid'],
  'mud':                ['drilling fluid','mud weight','pv','yp','viscosity','filtration'],
  'viscosity':          ['pv','plastic viscosity','yield point','yp','fann','rheology'],
  'pv':                 ['plastic viscosity','fann','rheology','yp','yield point'],
  'filtration':         ['filter press','fluid loss','filter cake','api filtration','spurt'],
  'ecd':                ['equivalent circulating density','hydraulics','pore pressure','fracture'],
  'well control':       ['kick','shut in','sidpp','sicp','blowout','bop'],
  'kick':               ['well control','shut in','sidpp','flow check','blowout'],
  'torque':             ['torque drag','friction','drill string','wellbore','nc50'],
  'drill collar':       ['nc50','hwdp','bha','torque','make up'],
  'hwdp':               ['heavy wall','drill pipe','bha','transition zone','fatigue'],
  'shock sub':          ['vibration','bit bounce','jar','bha','shock tool'],
  'api':                ['api 13b','mud testing','api rp','standard','procedure'],
  'ph':                 ['acidity','alkalinity','lime','caustic','mud chemistry'],
};

function expandQuery(query) {
  const lower = query.toLowerCase();
  const extras = [];
  for (const [term, syns] of Object.entries(DRILLING_SYNONYMS)) {
    if (lower.includes(term)) extras.push(...syns);
  }
  return extras.length ? query + ' ' + extras.join(' ') : query;
}

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s\-\/]/g, ' ')
    .replace(/[-\/]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 2 && !STOP_WORDS.has(t)); // allow 2-char tokens (WOB, ROP, BHA, pH)
}

const _idx = DRILLING_CHUNKS.map(c => {
  const raw = c.category + ' ' + c.section + ' ' + c.text + ' ' + (c.source || '');
  const tokens = tokenize(raw);
  const freq = {};
  for (const t of tokens) freq[t] = (freq[t] || 0) + 1;
  return { tokens: new Set(tokens), freq };
});

const N = DRILLING_CHUNKS.length;
const _idf = {};
{
  const df = {};
  for (const c of _idx) for (const t of c.tokens) df[t] = (df[t] || 0) + 1;
  for (const [t, d] of Object.entries(df)) _idf[t] = Math.log(N / d);
}

DRILLING_META.chunks = DRILLING_CHUNKS.length;

export function retrieveDrilling(query, topK = 3) {
  const expanded = expandQuery(query);
  const qTokens = tokenize(expanded);
  if (!qTokens.length) return [];

  const queryLower = query.toLowerCase();

  const scored = DRILLING_CHUNKS.map((chunk, i) => {
    const idx = _idx[i];
    let score = 0;

    // TF-IDF over expanded token set
    for (const t of qTokens) {
      if (idx.tokens.has(t)) {
        const tf = Math.log(1 + (idx.freq[t] || 0));
        score += tf * (_idf[t] || 0);
      }
    }

    // Category / section match boost
    const meta = (chunk.category + ' ' + chunk.section + ' ' + (chunk.source || '')).toLowerCase();
    for (const t of qTokens) {
      if (meta.includes(t)) score += 2.5;
    }

    // Bigram phrase matching
    for (let j = 0; j < qTokens.length - 1; j++) {
      const bigram = qTokens[j] + ' ' + qTokens[j + 1];
      if (chunk.text.toLowerCase().includes(bigram)) score += 3;
    }

    // Trigram matching
    for (let j = 0; j < qTokens.length - 2; j++) {
      const trigram = qTokens[j] + ' ' + qTokens[j+1] + ' ' + qTokens[j+2];
      if (chunk.text.toLowerCase().includes(trigram)) score += 5;
    }

    // Original query term direct hit
    for (const t of tokenize(queryLower)) {
      if (chunk.text.toLowerCase().includes(t)) score += 0.5;
    }

    const sources = DRILLING_SOURCES[chunk.category] || [];
    return { chunk, score, page: chunk.page, section: chunk.section, category: chunk.category, sources };
  })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

export function buildDrillingContext(results) {
  if (!results.length) return null;

  const excerpts = results.map((r, i) => {
    const src = r.chunk.source || 'NOV / DRILCO / API';
    return `[REF ${i + 1}] ${r.category} — ${r.chunk.section} (p.${r.chunk.page} | ${src}):\n${r.chunk.text}`;
  });

  return (
    'You are a drilling operations engineer with access to technical manuals. ' +
    'Using the references below, give a thorough, detailed answer. Include specific values, ' +
    'procedures, settings, and operational steps. Cite the REF number and source document.\n\n' +
    excerpts.join('\n\n')
  );
}

export function formatDrillingSourcesHTML(results) {
  const seen = new Set();
  const links = [];
  for (const r of results) {
    for (const s of (r.sources || []).slice(0, 2)) {
      if (!seen.has(s.url)) {
        seen.add(s.url);
        links.push(`<a href="${s.url}" target="_blank" style="color:var(--yellow);text-decoration:none" title="${s.label}">${s.label}</a>`);
      }
    }
  }
  return links;
}
