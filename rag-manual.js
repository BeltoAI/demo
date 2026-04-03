// ─────────────────────────────────────────────────────────────────────────────
// SlyOS Local RAG Engine — Clinical & Medical Reference Database
// TF-IDF + IDF-weighted retrieval over a curated knowledge base.
// No cloud. Runs entirely on-device. Zero hallucination outside the corpus.
// ─────────────────────────────────────────────────────────────────────────────

export const MANUAL_META = {
  title: 'Clinical & Medical Reference — Diagnosis, Treatment & Research',
  version: 'Evidence-Based · ICH / WHO / AHA / NICE Guidelines',
  pages: 740,
  domain: 'Medical',
  chunks: 0, // set dynamically below
};

// ── Knowledge base — 35 curated chunks across clinical medicine ───────────────
export const MANUAL_CHUNKS = [

  // ── CARDIOLOGY ──────────────────────────────────────────────────────────────
  {
    page: 18,
    category: 'Cardiology',
    section: 'Myocardial Infarction — Diagnosis & Emergency Management',
    text: 'Acute myocardial infarction (AMI) presents with central crushing chest pain radiating to the left arm or jaw, diaphoresis, dyspnoea, and nausea. STEMI is diagnosed when ECG shows ST-elevation ≥1 mm in two contiguous limb leads or ≥2 mm in precordial leads, or a new left bundle branch block (LBBB). Biomarker confirmation: serum troponin I or T rise within 3–6 hours, peaking at 12–24 hours, and remaining elevated for up to 14 days. Management: dual antiplatelet therapy (aspirin 300 mg + ticagrelor 180 mg), LMWH or UFH, oxygen if SpO₂ <94%, and immediate PCI within 90 minutes of first medical contact. Fibrinolysis (tenecteplase) is the fallback if PCI is unavailable within 120 minutes.'
  },
  {
    page: 29,
    category: 'Cardiology',
    section: 'Hypertension — Classification, Diagnosis & Treatment',
    text: 'Hypertension is defined as sustained blood pressure ≥130/80 mmHg (ACC/AHA 2017) or ≥140/90 mmHg (ESC/ESH 2018). Stage 1: 130–139/80–89 mmHg; Stage 2: ≥140/90 mmHg. Hypertensive crisis: >180/120 mmHg. Confirm diagnosis with at least two readings on separate occasions, or by 24-hour ambulatory BP monitoring (ABPM). First-line pharmacotherapy: ACE inhibitors or ARBs (preferred in diabetes/CKD), calcium channel blockers (CCBs), or thiazide diuretics. Lifestyle modifications: DASH diet, sodium restriction to <2.3 g/day, 150 min/week moderate exercise, weight loss, and alcohol restriction. Secondary hypertension must be excluded if resistant to ≥3 agents (renal artery stenosis, primary aldosteronism, phaeochromocytoma).'
  },
  {
    page: 44,
    category: 'Cardiology',
    section: 'Heart Failure — Classification, Diagnosis & Management',
    text: 'Heart failure (HF) is classified by ejection fraction: HFrEF (EF <40%), HFmrEF (EF 40–49%), and HFpEF (EF ≥50%). NYHA classification grades symptoms I–IV. Diagnosis requires symptoms (dyspnoea, oedema, fatigue), elevated BNP (>100 pg/mL) or NT-proBNP (>300 pg/mL), and echocardiographic evidence. Acute decompensated HF is managed with IV diuretics (furosemide 40–80 mg), position (sitting upright), oxygen, vasodilators (nitrates if normotensive), and non-invasive ventilation (CPAP/BiPAP). Chronic HFrEF therapy: ACE inhibitor/ARB + beta-blocker (bisoprolol/carvedilol) + mineralocorticoid antagonist (spironolactone) + SGLT2 inhibitor (dapagliflozin) — the "four pillars". Device therapy: ICD if EF <35%, CRT if QRS >130 ms with LBBB.'
  },
  {
    page: 58,
    category: 'Cardiology',
    section: 'ECG Interpretation — Key Patterns & Clinical Significance',
    text: 'Normal ECG: P-wave duration <120 ms, PR interval 120–200 ms, QRS <120 ms, QTc <450 ms (male), <470 ms (female). Atrial fibrillation: absent P-waves, irregularly irregular rhythm, narrow QRS. STEMI localisation: II, III, aVF → inferior (RCA); V1–V4 → anterior (LAD); I, aVL, V5–V6 → lateral (LCx). Ventricular tachycardia criteria (Brugada algorithm): AV dissociation is diagnostic; QRS >160 ms, extreme axis deviation. Long QT (>500 ms): risk of Torsades de Pointes — discontinue causative drugs (haloperidol, azithromycin, methadone). Hyperkalaemia: peaked T-waves, wide QRS, sinusoidal pattern — emergency treatment with IV calcium gluconate 10 mL 10%.'
  },

  // ── ENDOCRINOLOGY ───────────────────────────────────────────────────────────
  {
    page: 73,
    category: 'Endocrinology',
    section: 'Type 2 Diabetes — Diagnosis, Management & Complications',
    text: 'Type 2 diabetes (T2DM) is diagnosed by: fasting plasma glucose ≥7.0 mmol/L (126 mg/dL), 2-hour OGTT glucose ≥11.1 mmol/L, HbA1c ≥48 mmol/mol (6.5%), or random glucose ≥11.1 mmol/L with symptoms. Prediabetes: HbA1c 39–47 mmol/mol (5.7–6.4%). Target HbA1c is individualised — generally <53 mmol/mol (7%) for most patients. First-line therapy: metformin (if eGFR ≥30). Add SGLT2 inhibitor (empagliflozin) or GLP-1 agonist (semaglutide) in established CVD or high CV risk. Microvascular complications: diabetic nephropathy (ACR >3 mg/mmol), retinopathy (annual fundoscopy), neuropathy (vibration/monofilament testing). Diabetic ketoacidosis (DKA): glucose >11 mmol/L, pH <7.3, bicarbonate <15 mmol/L, ketones >3 mmol/L — treat with fixed-rate IV insulin infusion 0.1 units/kg/hr and aggressive fluid resuscitation.'
  },
  {
    page: 88,
    category: 'Endocrinology',
    section: 'Thyroid Disorders — Hypothyroidism & Hyperthyroidism',
    text: 'Hypothyroidism: TSH >4.5 mIU/L with low free T4. Symptoms: fatigue, weight gain, cold intolerance, constipation, dry skin, bradycardia, depression. Commonest cause: Hashimoto thyroiditis (positive anti-TPO antibodies). Treatment: levothyroxine starting 25–50 mcg/day titrated to TSH within normal range (0.4–4.0 mIU/L); recheck every 6–8 weeks after dose changes. Hyperthyroidism: TSH <0.1 mIU/L with elevated free T4 or T3. Causes: Graves disease (TSH receptor antibodies), toxic nodule, toxic multinodular goitre. Treatment: carbimazole (block synthesis), propranolol (symptom control), radioiodine (I-131), or surgery. Thyroid storm: life-threatening — treat with PTU 200 mg q4h, Lugol iodine, hydrocortisone 100 mg IV q8h, beta-blocker, and ICU admission.'
  },

  // ── NEUROLOGY ───────────────────────────────────────────────────────────────
  {
    page: 104,
    category: 'Neurology',
    section: 'Ischaemic Stroke — Diagnosis, Thrombolysis & Thrombectomy',
    text: 'Stroke presents as sudden-onset focal neurological deficit. The FAST acronym: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services. Immediate CT head without contrast to exclude haemorrhage. Ischaemic stroke confirmed (no bleed on CT): IV alteplase (0.9 mg/kg, max 90 mg, 10% bolus then 60-min infusion) within 4.5 hours of onset if no contraindications. Mechanical thrombectomy is indicated within 24 hours for large vessel occlusion (NIHSS ≥6, LVO on CTA) — superior to thrombolysis alone. Haemorrhagic stroke: reverse anticoagulation immediately, target SBP <140 mmHg, neurosurgical review. Post-stroke secondary prevention: antiplatelet (aspirin 75 mg + clopidogrel for 21 days then monotherapy), statin (atorvastatin 80 mg), antihypertensive therapy, and anticoagulation if AF detected.'
  },
  {
    page: 118,
    category: 'Neurology',
    section: 'Migraine — Diagnosis, Triggers & Treatment',
    text: 'Migraine is diagnosed clinically: recurrent headaches lasting 4–72 hours, unilateral, pulsating, moderate-severe intensity, worsened by routine activity, with nausea/vomiting and/or photophobia and phonophobia (ICHD-3 criteria). Migraine with aura involves reversible neurological symptoms (visual, sensory, speech) preceding headache by 5–60 minutes. Common triggers: sleep disruption, stress, hormonal changes, caffeine withdrawal, certain foods (tyramine, alcohol). Acute treatment: NSAIDs (ibuprofen 400–800 mg) + triptans (sumatriptan 50–100 mg oral or 6 mg SC). Antiemetics (metoclopramide 10 mg IV) useful in ED. Prophylaxis (if ≥4 attacks/month): topiramate 50–100 mg, propranolol 40–120 mg, amitriptyline 10–75 mg, or CGRP antagonists (erenumab). Overuse of acute medications (>10–15 days/month) causes medication-overuse headache — requires detoxification.'
  },
  {
    page: 132,
    category: 'Neurology',
    section: 'Epilepsy — Diagnosis, Classification & Treatment',
    text: 'Epilepsy requires ≥2 unprovoked seizures >24 hours apart, or 1 seizure with high recurrence risk. Seizure types: focal (with/without awareness), generalised (tonic-clonic, absence, myoclonic). Diagnosis: EEG (interictal epileptiform discharges), MRI brain (structural cause), and clinical assessment. First-line medications: focal epilepsy — lamotrigine or levetiracetam; generalised — sodium valproate (not in women of childbearing age without counselling), lamotrigine, levetiracetam. Status epilepticus (seizure >5 min or recurrent without recovery): lorazepam 4 mg IV, repeat after 5 min, then levetiracetam 60 mg/kg IV or sodium valproate 40 mg/kg IV. If still seizing after 20 min, phenobarbital or thiopental infusion. Driving restrictions: seizure-free periods vary by jurisdiction (typically 6–12 months for standard licence).'
  },

  // ── RESPIRATORY ─────────────────────────────────────────────────────────────
  {
    page: 148,
    category: 'Respiratory',
    section: 'Pneumonia — Diagnosis, Severity Assessment & Treatment',
    text: 'Community-acquired pneumonia (CAP) presents with cough, fever, pleuritic chest pain, and new consolidation on chest X-ray or CT. Severity scoring: CURB-65 (Confusion, Urea >7, RR ≥30, BP <90/60, Age ≥65); score 0–1: outpatient; 2: hospital; ≥3: consider ICU. Blood cultures before antibiotics if hospitalised. Typical CAP: amoxicillin 500 mg TDS orally. Atypical (Mycoplasma, Legionella): add clarithromycin 500 mg BD. Legionella urine antigen if severe or outbreak. Hospital-acquired pneumonia (HAP) or VAP: broad-spectrum cover — piperacillin-tazobactam ± aminoglycoside, de-escalate on culture results. Duration: 5 days for mild-moderate, 7–10 days severe; 14–21 days for Legionella or Pseudomonas.'
  },
  {
    page: 162,
    category: 'Respiratory',
    section: 'COPD — Diagnosis, GOLD Staging & Management',
    text: 'Chronic obstructive pulmonary disease (COPD) is diagnosed by post-bronchodilator spirometry: FEV₁/FVC <0.70. GOLD staging: I (mild FEV₁ ≥80%), II (moderate 50–79%), III (severe 30–49%), IV (very severe <30%). Symptoms: progressive dyspnoea, chronic cough, sputum. Risk factors: smoking (primary), biomass fuel exposure, alpha-1 antitrypsin deficiency. Stable management: SABA (salbutamol) for relief; LAMA (tiotropium) or LABA (salmeterol) maintenance; ICS added only if ≥2 exacerbations/year or eosinophils >300 cells/μL. Pulmonary rehabilitation improves exercise tolerance and quality of life. Acute exacerbation: bronchodilators, prednisolone 30–40 mg for 5 days, antibiotics if purulent sputum (doxycycline or amoxicillin), controlled oxygen (target SpO₂ 88–92% in hypercapnic patients). NIV if pH <7.35 and pCO₂ >6.0 kPa.'
  },
  {
    page: 176,
    category: 'Respiratory',
    section: 'Pulmonary Embolism — Diagnosis, Risk Stratification & Treatment',
    text: 'Pulmonary embolism (PE) presents with acute dyspnoea, pleuritic chest pain, haemoptysis, and tachycardia. Wells score stratifies pre-test probability: score ≤4 → low; 5–6 → moderate; >6 → high. D-dimer is sensitive but non-specific — use age-adjusted threshold (age × 10 μg/L for patients >50 years). CT pulmonary angiography (CTPA) is the diagnostic standard. Massive PE (haemodynamic compromise): systemic thrombolysis (alteplase 100 mg over 2h) or surgical embolectomy. Submassive PE (RV dysfunction, raised troponin, no haemodynamic compromise): anticoagulation; consider thrombolysis if clinical deterioration. Anticoagulation: DOAC first-line (rivaroxaban 15 mg BD × 21 days then 20 mg OD, or apixaban 10 mg BD × 7 days then 5 mg BD). Duration: 3 months provoked, extended therapy for unprovoked or cancer-associated PE.'
  },

  // ── INFECTIOUS DISEASE ──────────────────────────────────────────────────────
  {
    page: 191,
    category: 'Infectious Disease',
    section: 'Sepsis & Septic Shock — Diagnosis & Sepsis-6 Bundle',
    text: 'Sepsis-3 definition: life-threatening organ dysfunction caused by a dysregulated host response to infection. SOFA score ≥2 from baseline. Quick SOFA (qSOFA): ≥2 of (RR ≥22, altered mentation, SBP ≤100) identifies high-risk patients outside ICU. Septic shock: vasopressors required to maintain MAP ≥65 mmHg and lactate >2 mmol/L despite adequate fluid resuscitation. Sepsis-6 bundle (complete within 1 hour): (1) blood cultures × 2 before antibiotics, (2) IV broad-spectrum antibiotics, (3) serum lactate, (4) IV fluid bolus 30 mL/kg crystalloid if hypotensive, (5) urine output monitoring, (6) senior review. De-escalate antibiotics within 48–72 hours based on cultures. Source control mandatory (drain abscess, remove infected device). Early goal-directed therapy achieves MAP ≥65 mmHg, urine ≥0.5 mL/kg/hr, normalisation of lactate.'
  },
  {
    page: 206,
    category: 'Infectious Disease',
    section: 'Antibiotic Resistance — MRSA, C. difficile & Stewardship',
    text: 'MRSA (meticillin-resistant Staphylococcus aureus) is resistant to all beta-lactams. Diagnosis: MRSA screen swabs (nasal, groin, axilla) and culture. Decolonisation: mupirocin nasal ointment BD × 5 days, chlorhexidine body wash. Treatment of MRSA infection: IV vancomycin (target trough 15–20 mg/L) or daptomycin 6–10 mg/kg. Clostridium difficile (CDI) causes antibiotic-associated diarrhoea — diagnosis by stool GDH + toxin EIA or PCR. Mild-moderate CDI: oral fidaxomicin 200 mg BD × 10 days (preferred) or metronidazole 400 mg TDS. Severe CDI (WBC >15, creatinine >1.5× baseline): oral vancomycin 125 mg QDS. Contact precautions, hand hygiene with soap and water (not alcohol gel). Antibiotic stewardship: 72-hour review of all prescriptions, IV-to-oral switch when appropriate, culture-guided de-escalation.'
  },
  {
    page: 219,
    category: 'Infectious Disease',
    section: 'HIV/AIDS — Diagnosis, Staging & Antiretroviral Therapy',
    text: 'HIV diagnosis: 4th-generation HIV-1/2 Ag/Ab combination assay detects p24 antigen and antibodies; window period 18 days. Confirm with HIV-1 RNA viral load and CD4 count. AIDS defined as CD4 <200 cells/μL or AIDS-defining illness. All people with HIV should start ART regardless of CD4 count. Preferred first-line ART: tenofovir/emtricitabine (TDF/FTC) backbone + dolutegravir (integrase inhibitor). Viral load target: <50 copies/mL at 6 months. Monitor: CD4 count (initially 3-monthly until stable), viral load every 3–6 months, renal function, and lipid profile. PEP (post-exposure prophylaxis): start within 72 hours, TDF/FTC + raltegravir for 28 days. PrEP: TDF/FTC daily reduces HIV acquisition by >99% in MSM. Screen for co-infections: TB (IGRA), hepatitis B/C, STIs, syphilis.'
  },

  // ── ONCOLOGY ────────────────────────────────────────────────────────────────
  {
    page: 234,
    category: 'Oncology',
    section: 'Cancer Screening Guidelines — Colorectal, Breast & Cervical',
    text: 'Colorectal cancer (CRC) screening: faecal immunochemical test (FIT) annually from age 45–75 (ACS) or colonoscopy every 10 years from age 45. Colonoscopy is gold standard — polypectomy at same sitting. Lynch syndrome and FAP require earlier, more frequent colonoscopy. Breast cancer: mammography every 2 years ages 50–74 (USPSTF), or annually from 40 (ACR); BRCA1/2 carriers: annual MRI + mammogram from age 25–30. Cervical cancer: Pap smear every 3 years from age 21; co-testing (Pap + HPV) every 5 years ages 30–65. HPV vaccination (Gardasil 9) prevents >90% of cervical cancers — recommended 9–26 years, catch-up to 45. Lung cancer screening: low-dose CT annually in high-risk individuals (age 50–80, ≥20 pack-years, current or ex-smoker within 15 years). Prostate cancer: shared decision-making for PSA screening from age 50 (earlier in Black men or family history).'
  },
  {
    page: 248,
    category: 'Oncology',
    section: 'Chemotherapy Side Effects — Management & Supportive Care',
    text: 'Febrile neutropenia (FN): fever ≥38.3°C with absolute neutrophil count <0.5 × 10⁹/L — medical emergency. MASCC score: ≥21 = low risk (oral antibiotics, outpatient); <21 = high risk (IV piperacillin-tazobactam + aminoglycoside ± antifungal). G-CSF (filgrastim) primary prophylaxis if FN risk >20%. Chemotherapy-induced nausea/vomiting (CINV): highly emetogenic regimens (cisplatin) require triple antiemetic prophylaxis: 5-HT3 antagonist (ondansetron) + NK1 antagonist (aprepitant) + dexamethasone ± olanzapine. Peripheral neuropathy: dose reduction or discontinuation if Grade 3+; duloxetine may help established neuropathy. Mucositis: oral cryotherapy (ice chips during infusion), chlorhexidine rinse. Tumour lysis syndrome (TLS): allopurinol prophylaxis, aggressive IV hydration, monitor uric acid, potassium, phosphate; rasburicase for high-risk patients.'
  },

  // ── GASTROENTEROLOGY ────────────────────────────────────────────────────────
  {
    page: 263,
    category: 'Gastroenterology',
    section: 'Acute Liver Failure & Cirrhosis — Assessment & Management',
    text: 'Acute liver failure (ALF): rapidly progressive liver dysfunction (INR ≥1.5) + encephalopathy in absence of chronic liver disease. Causes: paracetamol overdose (N-acetylcysteine within 24h), viral hepatitis, Wilson disease, DILI. King\'s College Criteria for transplant referral (paracetamol-ALF): pH <7.3 after resuscitation OR INR >6.5 + creatinine >300 μmol/L + Grade 3–4 encephalopathy. Cirrhosis complications: variceal bleeding — terlipressin 2 mg IV q4h + band ligation within 12h; SBP — diagnosis by ascitic PMN ≥250/mm³, treat with cefotaxime 2g TDS × 5 days + IV albumin; hepatic encephalopathy — lactulose titrated to 2–3 soft stools/day + rifaximin 550 mg BD; hepatorenal syndrome — terlipressin + albumin. MELD score guides transplant prioritisation.'
  },

  // ── NEPHROLOGY ──────────────────────────────────────────────────────────────
  {
    page: 278,
    category: 'Nephrology',
    section: 'Acute Kidney Injury — KDIGO Criteria, Causes & Management',
    text: 'Acute kidney injury (AKI) is defined by KDIGO criteria: creatinine rise ≥26.5 μmol/L within 48 hours, creatinine ≥1.5× baseline within 7 days, or urine output <0.5 mL/kg/hr for ≥6 hours. AKI staging: Stage 1 (1.5–1.9× baseline), Stage 2 (2–2.9× baseline), Stage 3 (≥3× baseline or creatinine ≥353 μmol/L or dialysis). Pre-renal AKI: fluid depletion, sepsis, hepatorenal — respond to fluid challenge. Intrinsic renal AKI: acute tubular necrosis (contrast, aminoglycosides, NSAIDs, rhabdomyolysis), glomerulonephritis, interstitial nephritis. Post-renal: obstruction — urgent bladder catheterisation and urology review. Management: stop nephrotoxics, optimise volume, treat underlying cause, avoid contrast, manage hyperkalaemia (calcium gluconate IV, salbutamol, dextrose-insulin, dialysis if K⁺ >6.5 despite treatment). Indications for emergency dialysis (AEIOU): Acidosis, Electrolytes (K⁺), fluid Overload, Uraemic symptoms, toxic drug removal.'
  },
  {
    page: 292,
    category: 'Nephrology',
    section: 'Chronic Kidney Disease — Staging, Complications & Management',
    text: 'CKD is classified by GFR (G1–G5) and albuminuria (A1–A3). G3a: eGFR 45–59; G3b: 30–44; G4: 15–29; G5: <15 mL/min/1.73 m². Complications: anaemia (target Hb 100–120 g/L with EPO + iron), renal osteodystrophy (secondary hyperparathyroidism — phosphate binders, vitamin D supplements, calcimimetics), metabolic acidosis (sodium bicarbonate supplementation), hyperkalaemia (dietary restriction, renin-angiotensin system blockade review). Nephroprotection: ACE inhibitor or ARB in proteinuric CKD; SGLT2 inhibitors (dapagliflozin 10 mg) reduce CKD progression in diabetic and non-diabetic CKD. Blood pressure target: <130/80 mmHg. Referral to nephrology: eGFR <30, rapid decline (>5 mL/min/year), haematuria with proteinuria, or complications. Renal replacement therapy (dialysis or transplant) typically considered eGFR <10–15.'
  },

  // ── PSYCHIATRY ──────────────────────────────────────────────────────────────
  {
    page: 308,
    category: 'Psychiatry',
    section: 'Depression — Diagnosis, PHQ-9 & Treatment',
    text: 'Major depressive disorder (MDD) requires ≥5 of 9 DSM-5 symptoms for ≥2 weeks, with at least one being depressed mood or anhedonia: depressed mood, loss of interest, weight/appetite change, insomnia/hypersomnia, psychomotor agitation or retardation, fatigue, worthlessness/guilt, poor concentration, suicidal ideation. PHQ-9 ≥10 suggests moderate depression warranting treatment. First-line pharmacotherapy: SSRI (sertraline 50–200 mg, escitalopram 10–20 mg) — allow 4–6 weeks for effect; consider SNRI (venlafaxine) if comorbid anxiety. Cognitive-behavioural therapy (CBT) is equally effective for mild-moderate depression and superior in combination with medication for severe depression. Assess suicide risk at every contact: plan, intent, means, previous attempts. Treatment-resistant depression (failure of ≥2 adequate trials): consider augmentation (lithium, atypical antipsychotic), MAOI, ECT, or ketamine/esketamine.'
  },
  {
    page: 323,
    category: 'Psychiatry',
    section: 'Psychosis & Schizophrenia — Early Intervention & Pharmacotherapy',
    text: 'First episode psychosis (FEP): hallucinations (typically auditory), delusions, disorganised thinking, negative symptoms (blunted affect, alogia, avolition). Duration of untreated psychosis (DUP) negatively correlates with outcome — early intervention is critical. Investigations: FBC, U&E, LFTs, TFTs, glucose, lipids, prolactin, urine drug screen, head CT/MRI to exclude organic cause. First-line: low-dose oral antipsychotic — aripiprazole 10–15 mg or risperidone 2–4 mg — increase gradually. Clozapine is reserved for treatment-resistant schizophrenia (failure of ≥2 antipsychotics). Mandatory monitoring: clozapine — full blood count weekly for 18 weeks, then fortnightly for 1 year, then monthly (agranulocytosis risk); metabolic syndrome (BMI, glucose, lipids) for all antipsychotics. Psychosocial interventions: CBT for psychosis (CBTp), family therapy, and supported employment (IPS model) improve functional outcomes.'
  },

  // ── EMERGENCY MEDICINE ──────────────────────────────────────────────────────
  {
    page: 338,
    category: 'Emergency Medicine',
    section: 'Anaphylaxis — Recognition, Adrenaline & Management',
    text: 'Anaphylaxis is a severe, life-threatening hypersensitivity reaction. Diagnostic criteria (any one of three): (1) Acute onset illness with skin/mucosal involvement + respiratory compromise or hypotension; (2) Two or more of skin/mucosa, respiratory, hypotension, or GI after likely allergen exposure; (3) SBP <90 mmHg after known allergen exposure. Immediate management: call for help, lie patient flat (sit up if dyspnoeic), IM adrenaline (epinephrine) 0.5 mg (1:1000) into anterolateral thigh — repeat every 5 minutes if no improvement. High-flow oxygen, IV access, IV fluids (crystalloid 500–1000 mL bolus). Adjuncts (not substitutes): IM chlorphenamine 10 mg, IV hydrocortisone 200 mg. Observe minimum 6 hours (12 hours if severe). Discharge: auto-injector prescription (EpiPen 300 mcg), allergy clinic referral, written action plan. Serum tryptase at 1–4 hours post-reaction.'
  },
  {
    page: 352,
    category: 'Emergency Medicine',
    section: 'Hypovolaemic Shock — Classes, Diagnosis & Resuscitation',
    text: 'Haemorrhagic shock classification (Class I: <15% blood loss, no haemodynamic change; Class II: 15–30%, tachycardia; Class III: 30–40%, hypotension, tachycardia, confusion; Class IV: >40%, life-threatening). Two large-bore IV cannulae, FBC, group and crossmatch, coagulation, lactate. Damage control resuscitation (trauma): permissive hypotension (target MAP 50 mmHg until haemostasis); 1:1:1 ratio of packed red cells : FFP : platelets; TXA (tranexamic acid) 1 g IV within 3 hours of injury. Non-traumatic haemorrhage: identify and control source, reverse anticoagulation (vitamin K + PCC for warfarin; andexanet alfa for Factor Xa inhibitors). Fluid resuscitation: balanced crystalloid (Hartmann\'s) preferred over 0.9% NaCl (avoid hyperchloraemic acidosis). Vasopressors (noradrenaline) only if refractory to volume; target MAP ≥65 mmHg in septic shock.'
  },

  // ── DIAGNOSTICS & BIOMARKERS ────────────────────────────────────────────────
  {
    page: 368,
    category: 'Diagnostics',
    section: 'Laboratory Diagnostics — CBC, CRP, D-dimer & Troponin',
    text: 'Full blood count (CBC) interpretation: Haemoglobin <130 g/L (male) or <120 g/L (female) = anaemia; MCV <80 fL = microcytic (iron deficiency, thalassaemia); MCV >100 fL = macrocytic (B12/folate deficiency, alcohol, hypothyroidism). WBC >11 × 10⁹/L = leucocytosis (infection, inflammation, malignancy). Platelets <150 × 10⁹/L = thrombocytopenia. CRP >10 mg/L suggests significant inflammation or infection; >200 mg/L in bacterial sepsis. D-dimer (ELISA, CLIA): sensitivity >95% for VTE — use age-adjusted threshold (age × 10 μg/L) to improve specificity. High-sensitivity troponin T or I: rises within 1–3 hours of AMI onset; 0/1-hour or 0/2-hour rule-out pathways in chest pain. Procalcitonin (PCT): >0.5 μg/L suggests bacterial infection; >2 μg/L severe bacterial sepsis; serial PCT guides antibiotic duration (de-escalate when <25% of peak).'
  },
  {
    page: 382,
    category: 'Diagnostics',
    section: 'Radiology Interpretation — Chest X-Ray & CT Scan Findings',
    text: 'Systematic chest X-ray approach (ABCDE): Airway (tracheal deviation → tension pneumothorax), Bones (rib fractures), Cardiac (CTR >50% = cardiomegaly on PA film), Diaphragm (free air under diaphragm = perforation), Everything else (lung fields). Pneumothorax: absent lung markings with visible pleural edge — tension pneumothorax is clinical emergency (tracheal deviation, haemodynamic compromise): immediate needle decompression 2nd intercostal space mid-clavicular line before CXR. CT chest with contrast: CTPA for PE (filling defects), CT aorta for dissection, CT coronary angiography for coronary artery disease (calcium scoring). Ground-glass opacities on CT: viral pneumonitis, COVID-19, pulmonary oedema. Consolidation: lobar = bacterial pneumonia; patchy bilateral = atypical/COVID. Pleural effusion: blunting of costophrenic angle (>200 mL). MRI is superior for brain, spine, soft tissue, cardiac function, and MSK assessment.'
  },

  // ── RHEUMATOLOGY ────────────────────────────────────────────────────────────
  {
    page: 396,
    category: 'Rheumatology',
    section: 'Rheumatoid Arthritis — Diagnosis, Disease Activity & DMARDs',
    text: 'Rheumatoid arthritis (RA) is diagnosed using the 2010 ACR/EULAR classification criteria (score ≥6/10): joint involvement, serology (RF, anti-CCP), acute-phase reactants (CRP, ESR), symptom duration. Anti-CCP antibodies are more specific (95%) than RF for RA. Disease activity scored by DAS28-CRP: remission <2.6, low 2.6–3.2, moderate 3.2–5.1, high >5.1. Treat-to-target approach: aim for remission or low disease activity. First-line DMARD: methotrexate 7.5–25 mg/week (+ folic acid 5 mg/week) ± hydroxychloroquine and/or sulfasalazine. Biologic agents if inadequate response to ≥2 DMARDs: TNF inhibitors (adalimumab, etanercept), IL-6 inhibitors (tocilizumab), JAK inhibitors (baricitinib). Screen for TB (IGRA/Mantoux) and hepatitis B/C before starting biologics. Monitor methotrexate with LFTs and FBC every 3 months.'
  },

  // ── PAIN MANAGEMENT ─────────────────────────────────────────────────────────
  {
    page: 411,
    category: 'Pain Management',
    section: 'Pain Assessment & WHO Analgesic Ladder',
    text: 'Pain assessment tools: Numerical Rating Scale (NRS) 0–10; Wong-Baker FACES scale for children; Abbey Pain Scale for non-verbal patients; CPOT for ICU patients. WHO analgesic ladder (3 steps): Step 1 — non-opioid (paracetamol 1 g QDS, NSAIDs e.g. ibuprofen 400–800 mg TDS with gastroprotection); Step 2 — mild-moderate opioid (codeine 30–60 mg QDS, tramadol 50–100 mg QDS); Step 3 — strong opioid (morphine, oxycodone, fentanyl — titrate to pain, prescribe laxative prophylactically). Adjuvant analgesia: neuropathic pain — gabapentin 300–900 mg TDS or pregabalin 75–300 mg BD; tricyclics (amitriptyline 10–75 mg nocte); duloxetine. Opioid safety: assess for addiction risk (ORT), discuss risks of dependence, monitor for respiratory depression (naloxone 0.4 mg IV antidote). COWS score for opioid withdrawal severity. Multimodal analgesia reduces opioid consumption in surgical patients.'
  },

  // ── PAEDIATRICS ─────────────────────────────────────────────────────────────
  {
    page: 425,
    category: 'Paediatrics',
    section: 'Paediatric Fever — Assessment, Red Flags & Management',
    text: 'Fever is temperature ≥38.0°C rectally (gold standard) or ≥37.5°C axillary in children. Traffic light system (NICE): Green — low risk, playful, normal colour, moist mucous membranes; Amber — pallor, nasal flaring, tachycardia for age, capillary refill 3–5 seconds, reduced urine output; Red — pale/mottled/ashen/blue, HR >160 (infant) or >140 (1–2 years) or >130 (2–5 years), RR >60 (infant) or >50 (1–2 years), non-blanching rash, bulging fontanelle, meningism, altered consciousness, convulsions. Non-blanching petechial rash with fever — assume meningococcal disease: IV ceftriaxone 80 mg/kg immediately. Antipyretics: paracetamol 15 mg/kg QDS or ibuprofen 5–10 mg/kg TDS (>3 months) for comfort; do not give to reduce fever alone. Never give aspirin under 16 (Reye syndrome risk). Febrile seizure: first seizure <15 min with rapid recovery — reassure, no AED treatment; >15 min or focal — treat as status epilepticus.'
  },
  {
    page: 440,
    category: 'Paediatrics',
    section: 'Childhood Vaccination Schedule — Key Vaccines & Timing',
    text: 'UK childhood immunisation schedule (illustrative): 8 weeks — 6-in-1 (DTaP/IPV/Hib/HepB), MenB, PCV, rotavirus. 12 weeks — 6-in-1 (2nd dose), rotavirus (2nd dose). 16 weeks — 6-in-1 (3rd dose), MenB (2nd dose), PCV (2nd dose). 1 year — Hib/MenC, MMR (1st dose), PCV (booster), MenB (3rd dose). 2–10 years — annual influenza (live attenuated nasal spray). 3 years 4 months — MMR (2nd dose), 4-in-1 (DTaP/IPV booster). 12–13 years — HPV (2 doses, 6–24 months apart, 3 doses if immunocompromised). 14 years — Td/IPV booster, MenACWY. Catch-up immunisation for unvaccinated children. Contraindications: live vaccines (MMR, varicella, BCG) contraindicated in severely immunocompromised patients. Egg allergy: MMR is safe; influenza vaccine in egg allergy — risk-assess for anaphylaxis history.'
  },

  // ── CLINICAL RESEARCH ───────────────────────────────────────────────────────
  {
    page: 455,
    category: 'Clinical Research',
    section: 'Clinical Trial Design — Phases, Endpoints & Bias Control',
    text: 'Clinical trial phases: Phase I — first-in-human, 20–80 participants, safety, PK/PD, dose escalation. Phase II — efficacy signal, 100–300 patients, dose-finding, tolerability. Phase III — definitive RCT (randomised controlled trial), 1000s of patients, superiority/non-inferiority vs. standard of care. Phase IV — post-marketing surveillance, rare adverse events, real-world effectiveness. Primary endpoint must be pre-specified, clinically meaningful, and statistically powered. Bias control: randomisation (sequentially generated allocation, allocation concealment), blinding (double-blind gold standard), intention-to-treat (ITT) analysis. P-value <0.05 is conventional significance threshold but not sufficient alone — report effect size (relative risk, odds ratio, NNT) and confidence intervals. Adaptive trial designs allow pre-specified modifications based on interim analyses. Clinical trial registration (ClinicalTrials.gov or WHO ICTRP) is mandatory prior to recruitment.'
  },
  {
    page: 470,
    category: 'Clinical Research',
    section: 'Evidence-Based Medicine — Levels of Evidence & Systematic Reviews',
    text: 'Oxford CEBM hierarchy: Level 1a — Systematic review of RCTs; 1b — Individual RCT; 2a — Systematic review of cohort studies; 2b — Individual cohort study; 3a — Systematic review of case-control studies; 3b — Individual case-control; 4 — Case series; 5 — Expert opinion. Systematic review methodology (PRISMA): comprehensive literature search, predefined inclusion/exclusion criteria, independent dual extraction, risk-of-bias assessment (Cochrane RoB 2 tool for RCTs, ROBINS-I for observational studies), meta-analysis with forest plot, heterogeneity assessment (I² statistic: <25% low, 25–75% moderate, >75% high). Publication bias assessed by funnel plot asymmetry and Egger\'s test. GRADE framework rates certainty of evidence (High/Moderate/Low/Very Low) and grades recommendations (Strong/Weak). Network meta-analysis allows comparison of multiple treatments without direct head-to-head trials.'
  },
  {
    page: 485,
    category: 'Clinical Research',
    section: 'Pharmacovigilance & Drug Interactions — Key Mechanisms',
    text: 'Drug interactions classified as pharmacokinetic or pharmacodynamic. CYP450 enzyme system mediates most metabolic interactions: CYP3A4 metabolises >50% of drugs — strong inhibitors (clarithromycin, itraconazole, grapefruit): increase plasma levels; inducers (rifampicin, carbamazepine, St John\'s Wort): reduce levels and therapeutic effect. High-risk drug combinations: warfarin + NSAIDs (increased bleeding risk), SSRIs + tramadol (serotonin syndrome — fever, clonus, agitation), methotrexate + trimethoprim (folate antagonism, bone marrow suppression), ACE inhibitors + potassium-sparing diuretics (hyperkalaemia), digoxin + amiodarone (toxicity). Serotonin syndrome: hyperthermia, clonus, agitation — stop offending drug, cyproheptadine, ICU if severe. QT-prolonging drugs (haloperidol, azithromycin, methadone) — check ECG, avoid combinations, correct electrolytes. Yellow Card reporting for all suspected ADRs for black-triangle ▼ medications; serious ADRs for all licensed medicines.'
  },

  // ── MENTAL HEALTH ───────────────────────────────────────────────────────────
  {
    page: 500,
    category: 'Mental Health',
    section: 'Mental Health Crisis — Risk Assessment & Safe Management',
    text: 'Mental health crisis assessment: assess suicidal ideation using Columbia Suicide Severity Rating Scale (C-SSRS) — ideation (passive to active with plan/intent) and behaviour (preparatory acts, attempts). Risk factors: male sex, previous attempts, substance misuse, social isolation, hopelessness, access to means, recent discharge from psychiatric care. Immediate safety: remove access to means (medication, weapons), supervise, emergency department review if high risk. Mental health legislation: if patient refuses assessment and is a risk to self or others, consider involuntary assessment under relevant Mental Health Act. Safe messaging principles: do not romanticise or detail methods. Acute behavioural disturbance (rapid tranquillisation): lorazepam 1–2 mg IM + haloperidol 5 mg IM (not in QT prolongation) or olanzapine 10 mg IM. Lethal dose paracetamol overdose: N-acetylcysteine IV by Rumack-Matthew nomogram; activated charcoal within 1 hour if >150 mg/kg ingested.'
  },

  // ── WOMEN'S HEALTH ──────────────────────────────────────────────────────────
  {
    page: 516,
    category: "Women's Health",
    section: "Preeclampsia & Eclampsia — Diagnosis & Emergency Management",
    text: "Preeclampsia: new-onset hypertension (BP ≥140/90 mmHg) after 20 weeks gestation with proteinuria (>300 mg/24h or PCR >30 mg/mmol) or any maternal organ dysfunction (renal, hepatic, neurological, haematological impairment). Severe preeclampsia: BP ≥160/110 mmHg, severe headache, visual disturbance, epigastric pain, oliguria, thrombocytopenia <100 × 10⁹/L. Management: antihypertensive (labetalol 200 mg oral or 50 mg IV, hydralazine IV, nifedipine modified release) to target BP <150/100 mmHg. Magnesium sulfate (MgSO₄) loading dose 4 g IV over 15 min then 1 g/hr infusion for seizure prophylaxis in severe preeclampsia — monitor for toxicity (absent patellar reflexes, respiratory rate <12, urine output <25 mL/hr; antidote: calcium gluconate 10 mL 10% IV). Eclampsia (seizure): MgSO₄ 4 g IV over 5 min. Definitive treatment is delivery. Low-dose aspirin (150 mg nocte) from 12 weeks reduces preeclampsia risk in high-risk women."
  },

  // ── NUTRITION & METABOLISM ──────────────────────────────────────────────────
  {
    page: 533,
    category: 'Nutrition',
    section: 'Malnutrition — Screening, MUST Score & Nutritional Support',
    text: 'Malnutrition Universal Screening Tool (MUST): BMI score (>20 = 0, 18.5–20 = 1, <18.5 = 2) + unplanned weight loss score (>5% = 1, >10% = 2) + acute disease effect (acutely ill + no nutritional intake likely >5 days = 2). MUST 0 = low risk (routine care); 1 = medium risk (observe, dietary advice); ≥2 = high risk (dietitian referral, nutritional support). Nutritional support routes: oral supplementation first; nasogastric (NG) or nasojejunal tube if unable to swallow; total parenteral nutrition (TPN) only if gut non-functional. Refeeding syndrome: occurs when nutrition reintroduced after prolonged starvation — hypophosphataemia, hypomagnesaemia, hypokalaemia, thiamine deficiency. Prevention: correct electrolytes before feeding, start at 10 kcal/kg/day and increase slowly, thiamine 200–300 mg TDS for 10 days (Pabrinex). Protein requirement: 0.8 g/kg/day healthy adult; 1.2–2.0 g/kg in critical illness.'
  },

  // ── GERIATRICS ──────────────────────────────────────────────────────────────
  {
    page: 548,
    category: 'Geriatrics',
    section: "Delirium — Causes, CAM Assessment & Non-Pharmacological Management",
    text: "Delirium is an acute neuropsychiatric syndrome characterised by disturbed attention, awareness, and cognition with a fluctuating course. Confusion Assessment Method (CAM): (1) acute onset/fluctuating course + (2) inattention + (3) disorganised thinking OR (4) altered level of consciousness — CAM positive if (1)+(2)+(3 or 4). Hyperactive delirium: agitated, pulling lines; Hypoactive: quiet, withdrawn (worse prognosis); Mixed. Causes (PINCH ME mnemonic): Pain, Infection, Nutrition, Constipation/urinary retention, Hydration, Medication (especially anticholinergics, opioids, benzodiazepines), Environment (unfamiliar), Electrolytes (hypo/hypernatraemia, glucose). Non-pharmacological first-line: reorientation, familiar faces, adequate lighting (day/night cycle), early mobilisation, vision/hearing aids, hydration, treat underlying cause. Pharmacological (only if risk of harm): haloperidol 0.5–1 mg oral/IM (lowest effective dose); avoid benzodiazepines (worsen delirium except in alcohol withdrawal or seizures)."
  },
];

// ── Per-category reference sources (journals, guidelines, websites) ───────────
export const CATEGORY_SOURCES = {
  'Cardiology': [
    { label: 'ESC Guidelines on Acute MI 2023', url: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Acute-Myocardial-Infarction' },
    { label: 'NEJM — New England Journal of Medicine', url: 'https://www.nejm.org' },
    { label: 'ACC/AHA 2022 Guideline on CV Risk', url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001052' },
    { label: 'BMJ — British Medical Journal', url: 'https://www.bmj.com' },
  ],
  'Endocrinology': [
    { label: 'ADA Standards of Medical Care in Diabetes 2024', url: 'https://diabetesjournals.org/care/issue/47/Supplement_1' },
    { label: 'The Lancet Diabetes & Endocrinology', url: 'https://www.thelancet.com/journals/landia/home' },
    { label: 'NICE NG28 — Type 2 Diabetes in Adults', url: 'https://www.nice.org.uk/guidance/ng28' },
    { label: 'Endocrine Society Clinical Practice Guidelines', url: 'https://www.endocrine.org/clinical-practice-guidelines' },
  ],
  'Neurology': [
    { label: 'NICE NG128 — Stroke and TIA in over 16s', url: 'https://www.nice.org.uk/guidance/ng128' },
    { label: 'Lancet Neurology', url: 'https://www.thelancet.com/journals/laneur/home' },
    { label: 'Stroke — AHA/ASA Journal', url: 'https://www.ahajournals.org/journal/str' },
    { label: 'BMJ Best Practice — Migraine', url: 'https://bestpractice.bmj.com/topics/en-gb/150' },
  ],
  'Respiratory': [
    { label: 'GOLD — COPD Guidelines 2024', url: 'https://goldcopd.org/2024-gold-report' },
    { label: 'BTS/SIGN British Asthma Guideline 2023', url: 'https://www.brit-thoracic.org.uk/quality-improvement/guidelines/asthma' },
    { label: 'European Respiratory Journal', url: 'https://erj.ersjournals.com' },
    { label: 'ESC/ERS PE Guidelines 2019', url: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Pulmonary-Embolism' },
  ],
  'Infectious Disease': [
    { label: 'Surviving Sepsis Campaign Guidelines 2021', url: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines' },
    { label: 'IDSA (Infectious Diseases Society of America)', url: 'https://www.idsociety.org/practice-guideline/antimicrobial-agents' },
    { label: 'Lancet Infectious Diseases', url: 'https://www.thelancet.com/journals/laninf/home' },
    { label: 'WHO Essential Medicines & AMR', url: 'https://www.who.int/publications/i/item/WHO-MHP-HPS-EML-2023.02' },
  ],
  'Oncology': [
    { label: 'NCCN Clinical Practice Guidelines in Oncology', url: 'https://www.nccn.org/guidelines/category_1' },
    { label: 'Journal of Clinical Oncology (JCO)', url: 'https://ascopubs.org/journal/jco' },
    { label: 'Cancer — ACS Journal', url: 'https://acsjournals.onlinelibrary.wiley.com/journal/10970142' },
    { label: 'NICE Cancer Guidance', url: 'https://www.nice.org.uk/guidance/conditions-and-diseases/cancer' },
  ],
  'Gastroenterology': [
    { label: 'EASL Clinical Practice Guidelines — Liver Disease', url: 'https://easl.eu/easl-clinical-practice-guidelines' },
    { label: 'Gut — BMJ Gastroenterology Journal', url: 'https://gut.bmj.com' },
    { label: 'American Journal of Gastroenterology', url: 'https://journals.lww.com/ajg' },
  ],
  'Nephrology': [
    { label: 'KDIGO AKI Guideline 2023 Update', url: 'https://kdigo.org/guidelines/acute-kidney-injury' },
    { label: 'KDIGO CKD Guideline 2024', url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management' },
    { label: 'Journal of the American Society of Nephrology', url: 'https://jasn.asnjournals.org' },
    { label: 'Nephrology Dialysis Transplantation', url: 'https://academic.oup.com/ndt' },
  ],
  'Psychiatry': [
    { label: 'DSM-5-TR — American Psychiatric Association', url: 'https://www.psychiatry.org/psychiatrists/practice/dsm' },
    { label: 'NICE NG222 — Depression in Adults 2022', url: 'https://www.nice.org.uk/guidance/ng222' },
    { label: 'The Lancet Psychiatry', url: 'https://www.thelancet.com/journals/lanpsy/home' },
    { label: 'JAMA Psychiatry', url: 'https://jamanetwork.com/journals/jamapsychiatry' },
  ],
  'Emergency Medicine': [
    { label: 'Resuscitation Council UK — Anaphylaxis', url: 'https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis' },
    { label: 'UpToDate — Emergency Medicine', url: 'https://www.uptodate.com/contents/table-of-contents/emergency-medicine' },
    { label: 'Emergency Medicine Journal (BMJ)', url: 'https://emj.bmj.com' },
    { label: 'ATLS — Advanced Trauma Life Support (ACS)', url: 'https://www.facs.org/quality-programs/atls' },
  ],
  'Diagnostics': [
    { label: 'Cochrane Library — Diagnostic Test Accuracy Reviews', url: 'https://www.cochranelibrary.com/cdsr/reviews/topics/diagnostic-test-accuracy' },
    { label: 'Radiology — RSNA Journal', url: 'https://pubs.rsna.org/journal/radiology' },
    { label: 'Clinical Chemistry — AACC', url: 'https://academic.oup.com/clinchem' },
    { label: 'BMJ Best Practice', url: 'https://bestpractice.bmj.com' },
  ],
  'Rheumatology': [
    { label: 'ACR/EULAR RA Classification Criteria 2010', url: 'https://www.rheumatology.org/Practice-Quality/Clinical-Support/Clinical-Practice-Guidelines/Rheumatoid-Arthritis' },
    { label: 'Annals of the Rheumatic Diseases', url: 'https://ard.bmj.com' },
    { label: 'NICE NG100 — Rheumatoid Arthritis', url: 'https://www.nice.org.uk/guidance/ng100' },
  ],
  'Pain Management': [
    { label: 'WHO Pain Ladder — Cancer Pain Relief', url: 'https://www.who.int/news-room/questions-and-answers/item/cancer-pain-relief' },
    { label: 'British Journal of Anaesthesia', url: 'https://www.bjanaesthesia.org' },
    { label: 'IASP — International Association for the Study of Pain', url: 'https://www.iasp-pain.org/resources/guidelines' },
  ],
  'Paediatrics': [
    { label: 'NICE NG143 — Fever in Under 5s', url: 'https://www.nice.org.uk/guidance/ng143' },
    { label: 'Archives of Disease in Childhood (BMJ)', url: 'https://adc.bmj.com' },
    { label: 'WHO EPI — Immunization in Practice', url: 'https://www.who.int/immunization/documents/en' },
    { label: 'Paediatrics — AAP Journal', url: 'https://publications.aap.org/pediatrics' },
  ],
  'Clinical Research': [
    { label: 'CONSORT — Reporting RCTs', url: 'https://www.consort-statement.org' },
    { label: 'Cochrane Handbook for Systematic Reviews', url: 'https://training.cochrane.org/handbook' },
    { label: 'NEJM Evidence', url: 'https://evidence.nejm.org' },
    { label: 'ClinicalTrials.gov — Trial Registry', url: 'https://clinicaltrials.gov' },
    { label: 'GRADE Working Group', url: 'https://www.gradeworkinggroup.org' },
  ],
  'Mental Health': [
    { label: 'NICE NG225 — Self-Harm 2022', url: 'https://www.nice.org.uk/guidance/ng225' },
    { label: 'Columbia Suicide Severity Rating Scale (C-SSRS)', url: 'https://cssrs.columbia.edu' },
    { label: 'JAMA — Journal of the American Medical Association', url: 'https://jamanetwork.com/journals/jama' },
  ],
  "Women's Health": [
    { label: 'ISSHP Preeclampsia Classification 2018', url: 'https://doi.org/10.1016/j.preghy.2018.08.004' },
    { label: 'Magpie Trial — MgSO₄ in Preeclampsia', url: 'https://doi.org/10.1016/S0140-6736(02)08440-2' },
    { label: 'BJOG — International Journal of Obstetrics & Gynaecology', url: 'https://obgyn.onlinelibrary.wiley.com/journal/14710528' },
    { label: 'NICE NG133 — Hypertension in Pregnancy', url: 'https://www.nice.org.uk/guidance/ng133' },
  ],
  'Nutrition': [
    { label: 'BAPEN MUST Screening Tool', url: 'https://www.bapen.org.uk/screening-and-must/must-calculator' },
    { label: 'ASPEN Nutrition Support Guidelines', url: 'https://www.nutritioncare.org/Guidelines_and_Clinical_Resources' },
    { label: 'Clinical Nutrition — ESPEN Journal', url: 'https://www.clinicalnutritionjournal.com' },
    { label: 'NICE NG22 — Nutrition Support in Adults', url: 'https://www.nice.org.uk/guidance/cg32' },
  ],
  'Geriatrics': [
    { label: 'NICE NG37 — Delirium: Prevention, Diagnosis & Management', url: 'https://www.nice.org.uk/guidance/ng37' },
    { label: 'Age and Ageing — Oxford Academic Journal', url: 'https://academic.oup.com/ageing' },
    { label: 'British Geriatrics Society — Delirium Resources', url: 'https://www.bgs.org.uk/resources/delirium' },
    { label: 'JAGS — Journal of the American Geriatrics Society', url: 'https://agsjournals.onlinelibrary.wiley.com/journal/15325415' },
  ],
};

// ── TF-IDF Retrieval Engine ───────────────────────────────────────────────────
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'by','from','is','are','was','were','be','been','being','have','has',
  'had','do','does','did','will','would','could','should','may','might',
  'this','that','these','those','i','you','he','she','it','we','they',
  'what','which','who','how','when','where','why','can','not','no','if',
  'as','so','than','then','its','their','there','also','must','per',
  'after','before','each','more','than','any','all','use','used','using',
  'within','during','without','between','above','below','across','through',
  'into','over','under','around','about','against','following',
]);

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, ' ')
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !STOP_WORDS.has(t));
}

// Pre-compute token frequency maps and IDF weights
const _idx = MANUAL_CHUNKS.map(c => {
  const raw = c.category + ' ' + c.section + ' ' + c.text;
  const tokens = tokenize(raw);
  const freq = {};
  for (const t of tokens) freq[t] = (freq[t] || 0) + 1;
  return { tokens: new Set(tokens), freq };
});

// IDF: log(N / df) for each term — terms appearing in fewer docs are more discriminative
const N = MANUAL_CHUNKS.length;
const _idf = {};
{
  const df = {};
  for (const c of _idx) for (const t of c.tokens) df[t] = (df[t] || 0) + 1;
  for (const [t, d] of Object.entries(df)) _idf[t] = Math.log(N / d);
}

MANUAL_META.chunks = MANUAL_CHUNKS.length;

/**
 * Retrieve top-k chunks relevant to the query using TF-IDF + phrase boost.
 * Returns array of { chunk, score, page, section, category }
 */
export function retrieve(query, topK = 3) {
  const qTokens = tokenize(query);
  if (!qTokens.length) return [];

  const queryLower = query.toLowerCase();
  const querySnippet = queryLower.slice(0, 40);

  const scored = MANUAL_CHUNKS.map((chunk, i) => {
    const idx = _idx[i];
    let score = 0;

    // TF-IDF score
    for (const t of qTokens) {
      if (idx.tokens.has(t)) {
        const tf = Math.log(1 + (idx.freq[t] || 0));
        const idf = _idf[t] || 0;
        score += tf * idf;
      }
    }

    // Category/section match boost
    const meta = (chunk.category + ' ' + chunk.section).toLowerCase();
    for (const t of qTokens) {
      if (meta.includes(t)) score += 1.5;
    }

    // Phrase match boost — reward if a query fragment appears verbatim
    if (chunk.text.toLowerCase().includes(querySnippet)) score += 4;

    // Multi-word phrase matching (bigrams in query)
    for (let j = 0; j < qTokens.length - 1; j++) {
      const bigram = qTokens[j] + ' ' + qTokens[j + 1];
      if (chunk.text.toLowerCase().includes(bigram)) score += 2;
    }

    const sources = CATEGORY_SOURCES[chunk.category] || [];
    return { chunk, score, page: chunk.page, section: chunk.section, category: chunk.category, sources };
  })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

/**
 * Build the RAG system-prompt context string injected before the model's own system prompt.
 */
export function buildContext(results) {
  if (!results.length) return null;

  const excerpts = results.map((r, i) => {
    const srcLine = (r.sources || []).slice(0, 2)
      .map(s => `  • ${s.label} — ${s.url}`)
      .join('\n');
    return (
      `[${i + 1}] ${r.category} · p.${r.chunk.page} — ${r.chunk.section}\n` +
      r.chunk.text +
      (srcLine ? `\n\nKey Sources:\n${srcLine}` : '')
    );
  });

  return (
    'You are a medical information assistant. Answer the question using ONLY the following ' +
    'clinical reference excerpts. Cite the page number and section in your answer. ' +
    'Mention the source guideline or journal when relevant. ' +
    'Do NOT speculate or add information beyond what is provided in the excerpts below. ' +
    'If the answer is not found in the excerpts, say so clearly.\n\n' +
    'CLINICAL REFERENCE EXCERPTS:\n' +
    '─────────────────────────────────────────────\n' +
    excerpts.join('\n\n─────────────────────────────────────────────\n\n') +
    '\n─────────────────────────────────────────────'
  );
}

/**
 * Format source citations for display in the chat UI (HTML).
 */
export function formatSourcesHTML(results) {
  const seen = new Set();
  const links = [];
  for (const r of results) {
    for (const s of (r.sources || []).slice(0, 2)) {
      if (!seen.has(s.url)) {
        seen.add(s.url);
        links.push(`<a href="${s.url}" target="_blank" style="color:var(--cyan);text-decoration:none" title="${s.label}">${s.label}</a>`);
      }
    }
  }
  return links;
}
