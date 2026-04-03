// ─────────────────────────────────────────────────────────────────────────────
// SlyOS Local RAG Engine — Baker Hughes Equipment Manual (Sample)
// TF-IDF retrieval over a pre-loaded knowledge base.
// No cloud. Runs entirely on-device. No hallucination outside the corpus.
// ─────────────────────────────────────────────────────────────────────────────

export const MANUAL_META = {
  title: 'Baker Hughes — Field Equipment Operations & Diagnostics Manual',
  version: 'Rev 4.2 — Upstream O&G Division',
  pages: 1000,
  chunks: 0, // set after load
};

// ── Knowledge base — representative chunks from across the manual ─────────────
export const MANUAL_CHUNKS = [
  {
    page: 14,
    section: '2.1 — Centrifugal Pump Overview',
    text: 'Centrifugal pumps are the primary artificial lift mechanism in upstream O&G operations. A pump failure is indicated when surface pressure drops below 80 PSI on the discharge line. Immediate shutdown is required if vibration exceeds 0.5 in/s RMS at the bearing housing. Always isolate the pump from the wellhead before any maintenance activity.'
  },
  {
    page: 22,
    section: '2.4 — Pump Seal Failure Diagnosis',
    text: 'Mechanical seal failure is the leading cause of unplanned pump downtime. Signs include: visible fluid leakage at the seal gland, elevated temperature reading (>180°F) at the stuffing box, and abnormal noise from the seal cavity. Replace mechanical seals using Part No. BH-MS-4470. Torque the gland bolts to 45 ft-lbs in a cross pattern. After replacement, pressure test to 1.5x operating pressure before restart.'
  },
  {
    page: 31,
    section: '3.1 — ESP (Electrical Submersible Pump) Operations',
    text: 'The Baker Hughes CENTRILIFT™ ESP system requires motor temperature to remain below 250°F for standard elastomers. If motor temperature exceeds 300°F, shut down immediately and allow 30 minutes of cool-down before restart. Current imbalance greater than 10% between phases indicates a potential motor winding fault. Minimum insulation resistance must be 5 MΩ at 500 VDC megger test. Intake pressure below 200 PSI causes cavitation and accelerates wear.'
  },
  {
    page: 45,
    section: '3.5 — ESP Cable & Power System',
    text: 'ESP power cables must be rated for the specific bottomhole temperature. For wells exceeding 300°F, use EPDM-insulated flat cable (BH Part No. EC-300-EPDM). Cable resistance measured at surface must not exceed 0.5 Ω/1000 ft. A ground fault to casing indicates breached cable insulation — do not restart without full cable replacement. Motor lead extensions must use crimped connectors rated for 3,000 PSI. Keep cable splices above the perforations to prevent gas ingestion damage.'
  },
  {
    page: 58,
    section: '4.2 — Gate Valve Maintenance',
    text: 'Gate valves on high-pressure wellheads (Class 3000 and above) require annual inspection. Torque the stem packing gland to 80 ft-lbs using a calibrated torque wrench. Never use a cheater bar on gate valve hand wheels — this will damage the stem. If the valve fails to hold pressure after packing replacement, the gate and seat may be eroded. Replace using BH Gate Assembly Kit BH-GVK-3000. All valve work on live wells requires a valid JSA and secondary well control in place.'
  },
  {
    page: 67,
    section: '4.5 — Choke Valve Diagnostics',
    text: 'Wellhead choke valves regulate production flow and are subject to severe erosion in sandy formations. A 15% drop in choke coefficient (Cv) from baseline indicates internal erosion requiring replacement of the trim. Use tungsten carbide trim in wells with sand cut above 0.5%. Operating pressure differential across a choke must not exceed 80% of the upstream absolute pressure to avoid critical flow instability. Replace choke beans every 90 days in high-sand wells or when pressure differential deviates more than ±5% from the calibrated curve.'
  },
  {
    page: 79,
    section: '5.1 — Pressure Safety Valve (PSV) Operations',
    text: 'Pressure Safety Valves (PSVs) are the last line of defense against vessel overpressure. Per API 520/521, PSVs must be tested every 5 years or after any actuation event. A PSV that has lifted must be taken out of service for re-certification — it must not be manually re-seated without inspection. Set pressure must be at or below the Maximum Allowable Working Pressure (MAWP) of the vessel. Never install a block valve between a PSV and its protected vessel. PSV discharge must be routed to a safe location, never to atmosphere near an ignition source.'
  },
  {
    page: 88,
    section: '5.3 — High Integrity Pressure Protection System (HIPPS)',
    text: 'HIPPS provides overpressure protection where PSVs alone cannot respond fast enough. The system consists of pressure transmitters (minimum 2oo3 voting), a logic solver (SIL-2 rated), and fast-acting SDVs. Response time from trip setpoint to full valve closure must be under 2 seconds. Proof test the HIPPS every 12 months — partial valve stroke testing every 6 months. The HIPPS trip setpoint is typically set at 110% of MAWP.'
  },
  {
    page: 102,
    section: '6.1 — Gas Compressor Operations',
    text: 'Baker Hughes reciprocating compressors (GEMINI series) must maintain suction temperature above the hydrocarbon dew point to prevent liquid carryover. Liquid carryover will cause valve failure within hours. Interstage coolers must be drained every 8 hours of operation in high-humidity environments. Compressor rod load must not exceed 90% of the frame rating. Check valve lift on suction and discharge valves must be measured annually — replace if less than 0.060 inches. Compressor vibration exceeding API 618 limits triggers automatic shutdown.'
  },
  {
    page: 115,
    section: '6.4 — Compressor Valve Failures',
    text: 'The most common failure mode in reciprocating compressors is broken valve components. Indicators include: elevated discharge temperature (>50°F above normal), reduced throughput, knocking sounds in the cylinder, and high rod load. A broken valve plate causes the cylinder to act as a dead volume, reducing efficiency. To diagnose, monitor individual cylinder discharge temperatures — a low-temperature reading on a cylinder indicates a failed discharge valve (gas bypassing back to suction). Replace valve assemblies with BH Part No. GEMINI-VA-2200.'
  },
  {
    page: 127,
    section: '7.1 — Heat Exchanger Maintenance',
    text: 'Shell-and-tube heat exchangers in gas processing must maintain a minimum approach temperature of 10°F. A fouling factor above 0.002 hr·ft²·°F/BTU indicates cleaning is required. Tube bundles must be hydrotested at 1.5x shell-side design pressure annually. Fin-fan air coolers must be inspected for fin damage and tube corrosion every 6 months. Motor current draw on fan motors exceeding 105% of nameplate indicates blade damage or bearing failure. All heat exchanger work requires hot work permits if near hydrocarbon service.'
  },
  {
    page: 139,
    section: '7.4 — LACT Unit Calibration',
    text: 'Lease Automatic Custody Transfer (LACT) units must be calibrated per API MPMS Chapter 6. Pulse interpolation error must be less than ±0.02% of the full-scale reading. The prover loop must be swept a minimum of 5 times, with a maximum repeatability of 0.02% between runs. Meter factor must be recorded and the LACT sealed after each calibration. Temperature compensation must reference API 60°F base temperature. A meter factor outside the range 0.990–1.010 requires investigation before custody transfer resumes.'
  },
  {
    page: 151,
    section: '8.2 — H2S Safety Procedures',
    text: 'Hydrogen sulfide (H2S) is immediately dangerous to life above 100 ppm. Field personnel must wear SCBA when entering areas with known H2S concentrations above 10 ppm. Fixed H2S detectors must be calibrated monthly and must alarm at 5 ppm (low) and 10 ppm (high). Bump test detector sensors before every shift. In the event of an H2S alarm, evacuate upwind immediately — do not attempt to rescue unconscious workers without SCBA. All field staff must hold a valid H2S Alive or HSEQ equivalent certificate. Wind socks must be visible from all work areas in H2S-rated zones.'
  },
  {
    page: 163,
    section: '8.5 — Hot Work Permits',
    text: 'A Hot Work Permit (HWP) is mandatory for any work involving open flame, grinding, or welding in a potentially hazardous area. The permit is valid for a single shift only and must be renewed each day. A gas test (LEL reading) must be performed within 30 minutes of starting work and every 30 minutes thereafter. Work must cease immediately if LEL reading exceeds 10%. A designated fire watch must remain on-site for 30 minutes after work completion. The HWP must be signed by the Facility OIM and the performing authority before work begins.'
  },
  {
    page: 178,
    section: '9.1 — BOP (Blowout Preventer) Testing',
    text: 'Blowout preventers must be tested per API Standard 53. Ram BOPs must function test every 14 days and pressure test every 21 days. Annular BOPs must function test every 14 days. Test pressure for low-pressure test is 200–300 PSI; high-pressure test must reach MAWP. A test is successful only when pressure hold for 5 minutes with less than 100 PSI drop. Blind/shear rams must be function tested with a test sub installed. BOP maintenance records must be retained for the life of the well. Any BOP test failure requires halt of all drilling operations until remediated.'
  },
  {
    page: 192,
    section: '9.4 — Well Control Kick Indicators',
    text: 'A well kick occurs when formation fluid enters the wellbore. Primary kick indicators are: pit gain (increase in mud return volume), increased flow rate while pumps are off, pump pressure decrease, and string weight change on the weight indicator. Upon observing kick indicators, immediately close the annular BOP and record SIDPP (Shut-In Drill Pipe Pressure) and SICP (Shut-In Casing Pressure). Circulate kill-weight mud using the Driller\'s Method or Wait-and-Weight Method per the Well Control Plan. Never open the choke to bleed pressure without a trained well control person present.'
  },
  {
    page: 207,
    section: '10.2 — VSD (Variable Speed Drive) Troubleshooting',
    text: 'Variable Speed Drives controlling ESPs and surface pumps display fault codes on the HMI. Fault code F-01 indicates overcurrent — check for motor winding fault or mechanical binding. F-02 is undervoltage — verify input power supply. F-03 is overvoltage — check for regenerative energy from a high-GOR well. F-07 is ground fault — isolate and megger the motor. F-11 is overtemperature — check VSD cooling fans and heat sink fins. All VSD faults must be logged in the CMMS before reset. Three successive faults within one hour requires engineering review before restart.'
  },
  {
    page: 219,
    section: '10.5 — SCADA and Remote Monitoring',
    text: 'The SCADA system polls field RTUs every 5 seconds for real-time data. Alarm deadband must be set to 5% of the alarm setpoint to prevent chattering. All analog inputs must be range-checked — a raw ADC value of 0 or 4095 (for 0–10 VDC or 4–20 mA) indicates a sensor or wiring fault, not a process reading. Critical alarms (HIPPS, BOP, H2S) must have a response time SLA of under 15 minutes. SCADA historian data must be retained for a minimum of 3 years per regulatory requirement. Cybersecurity patch cycles for field controllers must not exceed 90 days.'
  },
  {
    page: 234,
    section: '11.1 — Produced Water Management',
    text: 'Produced water disposal must comply with EPA Underground Injection Control (UIC) Class II permits. Oil content in produced water discharged overboard (offshore) must not exceed 29 mg/L per 30-day average per MARPOL Annex I. Measurement using the EPA 1664 solvent extraction method is required for regulatory reporting. Produced water injection pumps must maintain wellhead injection pressure below the fracture gradient of the disposal zone. Failure of the disposal well to accept design injection rates within ±15% requires a workover or regulatory notification within 24 hours.'
  },
  {
    page: 248,
    section: '11.4 — Chemical Injection Systems',
    text: 'Corrosion inhibitor injection rates must be calculated based on the corrosion monitoring coupon weight loss data from the previous inspection cycle. A loss rate above 5 mils per year (mpy) requires doubling the inhibitor concentration. Scale inhibitor squeeze treatment frequency is determined by the Langelier Saturation Index (LSI) of the produced water — LSI above +1.5 requires treatment. Biocide injection (glutaraldehyde or THPS) targets SRB counts below 100 CFU/mL. Chemical injection quills must be inspected for clogging every 30 days. All chemical handling requires SDS review and PPE consistent with the hazard assessment.'
  },
  {
    page: 261,
    section: '12.1 — Turbine Meter Diagnostics',
    text: 'Turbine meters in gas metering must spin freely with no audible roughness. Bearing failure is indicated when the K-factor (pulses per unit volume) deviates more than ±1% from the calibrated baseline. Upstream straight pipe run must be a minimum of 10D; downstream must be 5D. Do not install upstream of a regulator — pressure pulsations will destroy the rotor. In wet-gas service, use a separating scrubber upstream. Turbine meter calibration must be traceable to NIST standards; calibration certificate must show 10 or more test points across the operating flow range.'
  },
  {
    page: 275,
    section: '12.4 — Ultrasonic Flow Meter Operation',
    text: 'Multipath ultrasonic meters (USM) must achieve a velocity of sound (VOS) agreement within 0.1% between individual paths and the mixture value. A VOS deviation above 0.5% indicates contamination on the transducer face or gas composition change. AGA Report No. 9 governs fiscal USM installations. Meter factor from last calibration must be within 0.2% of unity for custody transfer use. Zero-flow verification (with a valved-off section) must show less than 0.1% of full-scale reading. Data logging must capture at least 10 samples per second for all diagnostic parameters.'
  },
  {
    page: 288,
    section: '13.1 — Fire & Gas Detection System',
    text: 'Optical flame detectors must be tested monthly using a UV/IR test lamp. Catalytic bead combustible gas detectors must be bump-tested daily. Point-type gas detectors must be placed within 18 inches of the ground in areas where gas is heavier than air (hydrocarbons). Multi-point gas sampling systems must achieve a sample cycle time under 120 seconds per point. All F&G panel inputs must be tested annually per IEC 61511. The F&G system must achieve SIL-1 minimum for process areas and SIL-2 for wellhead/drilling areas. A voting logic of 2oo3 is required for gas-suppression actuation to prevent spurious activation.'
  },
  {
    page: 301,
    section: '13.5 — Emergency Shutdown System (ESD)',
    text: 'The Emergency Shutdown System (ESD) must achieve SIL-2 per IEC 61511. ESD valves must be tested for full stroke annually and partial stroke every 6 months. Valve closing time must be verified to be within 10% of the design specification. ESD logic must use 1oo2 or 2oo3 voting for critical trips. A common cause failure (CCF) analysis must be included in the SIL verification. The ESD panel must be in a non-hazardous area or ATEX rated for Zone 1. All ESD trips must be logged in the CMMS with timestamp, cause, and reset authority. Post-trip investigation report must be completed within 72 hours for any unplanned ESD.'
  },
  {
    page: 317,
    section: '14.2 — Pig Launcher and Receiver Operations',
    text: 'Before launching a pig, verify pipeline pressure is within the pig\'s operating pressure rating. The pig trap closure door must be fully open and locked before pressurizing the trap. Never stand in front of a pig trap door during pressurization or depressurization. Pig passage is confirmed by the pig signaller (pig detector) on the receiver. Track pig time in transit — if the expected arrival window is exceeded by 100%, the pipeline must be isolated and the pig location determined by magnetic flux leakage (MFL) survey before restarting flow. Smart pig inspection intervals are typically 5 years per ASME B31.8S.'
  },
  {
    page: 332,
    section: '14.5 — Corrosion Monitoring Program',
    text: 'Corrosion monitoring uses a combination of UT thickness measurements, corrosion coupons, and online probes. UT measurements at risk-based inspection (RBI) locations must be trended quarterly. A corrosion rate above 10 mpy at any monitoring point triggers a Level 2 inspection within 30 days. Magnetic flux leakage (MFL) inline inspection is required for all pipelines operating above 30% SMYS when accessible. Corrosion under insulation (CUI) is a significant risk for pipelines operating between -4°F and 300°F — visual inspection under insulation at pipe supports every 3 years is mandatory. All corrosion data must be entered into the integrity management system within 5 business days of inspection.'
  },
];

// ── TF-IDF Style Retrieval ────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'by','from','is','are','was','were','be','been','being','have','has',
  'had','do','does','did','will','would','could','should','may','might',
  'this','that','these','those','i','you','he','she','it','we','they',
  'what','which','who','how','when','where','why','can','not','no','if',
  'as','so','than','then','its','their','there','also','must','must','per',
]);

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
    .filter(t => t.length > 2 && !STOP_WORDS.has(t));
}

// Pre-compute token sets for each chunk
const _idx = MANUAL_CHUNKS.map(c => ({
  tokens: new Set(tokenize(c.section + ' ' + c.text)),
  freq: tokenize(c.section + ' ' + c.text).reduce((m, t) => { m[t] = (m[t] || 0) + 1; return m; }, {}),
}));

MANUAL_META.chunks = MANUAL_CHUNKS.length;

/**
 * Retrieve top-k chunks relevant to the query.
 * Returns array of { chunk, score, page, section }
 */
export function retrieve(query, topK = 3) {
  const qTokens = tokenize(query);
  if (!qTokens.length) return [];

  const scored = MANUAL_CHUNKS.map((chunk, i) => {
    const idx = _idx[i];
    let score = 0;
    for (const t of qTokens) {
      if (idx.tokens.has(t)) score += 1 + (idx.freq[t] || 0) * 0.1;
    }
    // Boost exact phrase matches
    if (chunk.text.toLowerCase().includes(query.toLowerCase().slice(0, 20))) score += 3;
    return { chunk, score };
  }).filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

/**
 * Build the RAG context string to inject into the prompt.
 */
export function buildContext(results) {
  if (!results.length) return null;
  const lines = results.map(r =>
    `[Page ${r.chunk.page} — ${r.chunk.section}]\n${r.chunk.text}`
  );
  return (
    'You are a technical assistant. Answer using ONLY the following excerpts from the Baker Hughes Equipment Manual. ' +
    'Cite the page number in your answer. Do not add information not present in the excerpts.\n\n' +
    'MANUAL EXCERPTS:\n' +
    lines.join('\n\n---\n\n')
  );
}
