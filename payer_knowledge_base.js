window.RCM_PAYER_KB = {
  lastFullRefresh: '2026-03-24T20:00:00Z',
  refreshSchedule: 'weekly-sunday-midnight',
  version: '2.0.0',
  sources: {
    medicare: 'CMS Coverage Database API (LCDs, NCDs, Transmittals)',
    medicaid: 'State Medicaid Agency Websites & CMS Medicaid.gov',
    commercial: 'Payer Clinical Policy Pages, CPB References, Web Scraping',
    tricare: 'Tricare Policy Manual & TriWest/Humana Military portals',
    workersComp: 'State Workers Compensation Boards',
    lastRefreshDate: '2026-03-24'
  },
  policies: {
    'Medicare': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'CMS Coverage Database',
      clinical: {
        'E/M Services': 'CPT 99213-99215 (office), 99232-99234 (inpatient). MDM complexity drives level. Typical times for reference only. Document NPP/Physician status per CMS guidelines.',
        'Surgical': 'Global period rules: 10-day & 90-day. Post-op visits included. Check CMS Transmittals for bundling rules. NCCI edits apply.',
        'Imaging / Radiology': 'Prior auth requirements vary by service. Check local MAC for imaging policies. Refer to Appropriate Use Criteria (AUC). eviCore handles some Medicare Advantage imaging.',
        'Behavioral Health / Psychiatry': 'Limited to specific codes. Session limits per diagnosis. RTT (Residential Treatment) has separate rules. No concurrent E/M + psychotherapy.',
        'Pain Management / Injections': 'Epidural injections: frequency limits per spine level. Requires conservative care documentation. Joint injections: usually non-covered under Part B (covered under Part D as supplies).',
        'Pharmacy / Rx': 'Part B covers certain biologics/injectables only. Oral drugs covered by Part D. See DMEPOS for administration supplies.',
        'Cardiology': 'Stress testing: requires documented indication, no screening without symptoms. Cardiac cath: prior auth via MAC. LVAD/transplant coordination required.',
        'Orthopedics / Spine': 'Joint replacement: pre-op auth via MAC. Spinal fusion: must meet FDA indications, conservative care documentation required. PT limits per LCD.',
        'Gastroenterology': 'Screening colonoscopy: age 45-75, every 10 years if normal. Therapeutic scopes require medical necessity. GERD meds: limited duration per NCD.',
        'Neurology': 'EMG/NCS: one per limb per 6 months unless medically necessary. EEG: requires documented indication. Botox: frequency limits per body area (12 weeks).',
        'Wound Care': 'Debridement: limited 1x per 30 days unless medically necessary. HBO: pre-auth required. VAC therapy: auth required, limited duration.',
        'Dermatology': 'Mohs micrographic surgery: covered for skin cancer. Biologics for psoriasis: require failed trial of conventional therapy. Laser removal: not covered for cosmetic.',
        'Pulmonology': 'PFT: 1 per year, more if medically necessary. Sleep study: 1 baseline plus 1 titration if CPAP indicated. CPAP/BiPAP coverage: requires documented OSA diagnosis.',
        'Physical Therapy / Rehab': 'PT/OT/SLP: combined 60-visit cap per benefit period (rolling). Functional outcome documentation required every 10 visits. Prior auth not required but medical necessity must be documented.'
      },
      reimbursement: {
        methodology: 'RBRVS (Resource-Based Relative Value Scale) w/ MPFS Conversion Factor',
        conversion_factor: '$33.29 (2026 - subject to annual updates)',
        sequestration: '2% (Permanent Budget Control)',
        mips_adjustment: 'varies -4% to +3% per MIPS performance',
        modifier_rules: '-26 (Professional), -TC (Technical), -50 (bilateral), -59 (distinct procedural service)',
        timely_filing: '1 year from date of service'
      },
      documentation: {
        standards: 'E/M: Time/MDM/History/Exam. Operative: Pre-op diagnosis, procedure performed, post-op diagnosis, complications. Adequacy rules per CMS IOM Pub 100-04.',
        audit_risk: 'High if: missing pre-op diagnosis, unclear procedure description, unsupported complexity level, unbundling of global services.'
      },
      stateSpecific: {
        NV: { mac: 'Noridian Healthcare Solutions', jurisdiction: 'NV, UT, ND, SD, WY, MT', macId: 'A', lcdSearchUrl: 'https://www.noridianmedicare.com' },
        CA: { mac: 'Noridian Healthcare Solutions', jurisdiction: 'CA, HI, Guam', macId: 'B', lcdSearchUrl: 'https://www.noridianmedicare.com' },
        TX: { mac: 'Noridian Healthcare Solutions', jurisdiction: 'TX, OK, NM, AR, LA, MS', macId: 'D', lcdSearchUrl: 'https://www.noridianmedicare.com' },
        FL: { mac: 'Medicare Administrative Services (MAS)', jurisdiction: 'FL, PR, VI', macId: 'J', lcdSearchUrl: 'https://www.fhcrc.org' },
        NY: { mac: 'Noridian Healthcare Solutions', jurisdiction: 'NY, NJ, CT, RI', macId: 'E', lcdSearchUrl: 'https://www.noridianmedicare.com' }
      },
      priorAuth: {
        portal: 'CMS Prior Authorization Portal / MAC-specific',
        phone: 'Varies by MAC jurisdiction',
        vendor: 'MAC-specific (Noridian, MAS, etc.)',
        commonServices: ['Advanced Imaging (CT, MRI, PET)', 'High-Cost Devices', 'Implantable Hardware', 'Certain Behavioral Health Services', 'Cardiac Catheterization', 'Spinal Fusion'],
        turnaroundTime: { standard: '10 business days', urgent: '72 hours', retrospective: 'May deny if not authorized pre-service' }
      },
      edits: {
        'NCCI Column 1/2 Bundles': 'Comprehensive codes bundle component codes. Modifier 59/XE/XS/XP/XU may unbundle per CMS rules.',
        'Frequency Limits': 'Check LCD for per-day/week/month/year limits (e.g., PT 3x/week max)',
        'Global Surgery Bundle': 'Includes pre-op visits, intra-op care, post-op visits during global period. Do not bill separately unless appropriate modifier used.',
        'Diagnostic Workup Bundling': 'Multiple imaging of same body part on same day may bundle under certain circumstances.'
      },
      alerts: [
        { date: '2026-03-24', type: 'live_cms_refresh', title: 'Weekly CMS API Refresh', summary: 'CMS Coverage Database checked via API. 3 national updates found in past 30 days.' },
        { date: '2026-03-10', type: 'nca_update', title: 'NCA CAG-00440R: Colorectal Cancer Screening Biomarkers', summary: 'Proposed decision memo posted for non-invasive biomarker tests for colorectal cancer screening.' },
        { date: '2026-02-26', type: 'nca_update', title: 'NCA CAG-00179R: Anti-Cancer Chemo for Colorectal Cancer', summary: 'Final decision memo posted 02/25/2026. Updates national coverage for anti-cancer chemotherapy agents.' },
        { date: '2026-02-24', type: 'ncd_update', title: 'NCD 210.13: HCV Screening in Adults', summary: 'Updated NCD coding via new Change Request/Transmittal for Hepatitis C Virus screening.' },
        { date: '2026-03-01', type: 'policy_update', title: 'CMS Transmittal CR 13065', summary: 'Effective April 2026: Changes to E/M split-billing rules for physician-owned non-physician practitioner groups.' }
      ]
    },

    'Medicaid': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'State Medicaid Agencies & CMS Medicaid.gov',
      clinical: {
        'E/M Services': 'Varies by state. Some states align with Medicare, others have different level definitions. Check state fee schedule.',
        'Surgical': 'Prior auth requirements vary. Some state programs require auth for all surgical procedures.',
        'Imaging / Radiology': 'Many states require prior auth for imaging. eviCore, Carelon, or state agency controls. State-specific.',
        'Behavioral Health / Psychiatry': 'EPSDT (Early Periodic Screening, Diagnosis, Treatment) applies to beneficiaries under 21. Medically necessary services must be covered.',
        'Pain Management / Injections': 'Opioid prescribing limits per state law. Epidural frequency limits vary by state.',
        'Pharmacy / Rx': 'PDL (Preferred Drug List) varies by state. Step therapy common. Requires prior auth for non-formulary drugs. NDC required.',
        'Cardiology': 'Cardiac cath: prior auth varies by state MCO. Echo/stress testing: usually covered if medically necessary.',
        'Orthopedics / Spine': 'Joint replacement: prior auth required. Spinal fusion: state-specific coverage, some states require conservative care.',
        'Gastroenterology': 'Screening colonoscopy: age 45-75, varies by state. Covered if medically necessary.',
        'Neurology': 'EMG/NCS: covered per state MCO guidelines. EEG: prior auth may be required.',
        'Wound Care': 'Covered services vary by state. HBO, VAC therapy, and debridement coverage state-specific.',
        'Dermatology': 'Psoriasis biologics: step therapy required. Acne treatments: typically non-covered unless medically necessary.',
        'Pulmonology': 'Sleep study: covered if OSA suspected. CPAP: typically covered. Nebulizers, other DME: state-specific.',
        'Physical Therapy / Rehab': 'Visit limits vary by state MCO. EPSDT: unlimited if medically necessary for under-21. Functional outcomes required.'
      },
      reimbursement: {
        methodology: 'Varies: Fee-for-service (FFS) or Managed Care Organization (MCO)',
        timely_filing: 'Varies by state (typically 180-365 days)',
        stateVariations: 'Fee schedule, covered services, authorization requirements differ by state program'
      },
      documentation: {
        standards: 'EPSDT services for under-21: comprehensive documentation required. Establish medical necessity per state rules.',
        audit_risk: 'High if medical necessity not documented, non-covered service billed, EPSDT eligible not screened.'
      },
      stateSpecific: {
        NV: {
          programName: 'Nevada Medicaid (DHCFP)',
          feeBase: 'Nevada Medicaid Fee Schedule (% of Medicare varies by service)',
          mcos: ['SilverSummit (Centene)', 'CareSource', 'Health Plan of Nevada'],
          priorAuthEntity: 'Gainwell Technologies / MCO-specific',
          portal: 'Nevada MMIS/EVS',
          epsdtRules: 'Required for beneficiaries under 21. All medically necessary services must be covered.',
          timely_filing: '12 months (FFS), 6 months (managed care)',
          recentChanges: 'EFFECTIVE 01/01/2026: Statewide managed care expansion to all 17 counties. ~75K members moved from FFS to MCO. SilverSummit and CareSource are contracted MCOs. MCO choice period ends 03/31/2026. NDC required for drugs.'
        },
        CA: {
          programName: 'Medicaid (Medi-Cal)',
          feeBase: 'Medi-Cal Fee Schedule (varies by service)',
          mcos: ['CalOptima', 'SCPIE', 'LA Care', 'Anthem'],
          priorAuthEntity: 'State or MCO',
          epsdtRules: 'EPSDT mandated for under-21. Behavioral health carve-out in some MCOs.',
          timely_filing: '1 year (FFS), 6 months (MCO)'
        },
        TX: {
          programName: 'CHIP/Medicaid (STAR, STAR+PLUS)',
          feeBase: 'Texas Medicaid Fee Schedule',
          mcos: ['BCBS', 'Molina', 'UnitedHealth', 'Aetna', 'Humana'],
          priorAuthEntity: 'MCO-specific',
          epsdtRules: 'Medically necessary EPSDT services covered for under-21.',
          timely_filing: '6 months (MCO)'
        },
        FL: {
          programName: 'Medicaid (Healthy Kids, MediPass)',
          feeBase: 'Florida Medicaid Fee Schedule',
          mcos: ['Molina', 'Humana', 'Aetna', 'Ambetter'],
          priorAuthEntity: 'MCO-specific',
          epsdtRules: 'EPSDT services required for under-21.',
          timely_filing: '1 year (FFS), varies (MCO)'
        },
        NY: {
          programName: 'Medicaid (MLTC, LTSS)',
          feeBase: 'New York Medicaid Fee Schedule',
          mcos: ['Molina', 'Humana', 'UnitedHealth', 'Aetna'],
          priorAuthEntity: 'MCO-specific',
          epsdtRules: 'EPSDT services for under-21.',
          timely_filing: '1 year'
        },
        AZ: {
          programName: 'Arizona Health Care Cost Containment System (AHCCCS)',
          feeBase: 'AHCCCS Fee Schedule',
          mcos: ['Banner', 'Molina', 'Aetna', 'UnitedHealth'],
          priorAuthEntity: 'MCO-specific',
          epsdtRules: 'AHCCCS-funded EPSDT for under-21.',
          timely_filing: 'Varies by MCO'
        }
      },
      priorAuth: {
        portal: 'State MMIS or MCO portal',
        phone: 'Varies by state/MCO',
        vendor: 'Varies by state (Gainwell, eviCore, Carelon)',
        commonServices: ['Imaging', 'Surgical procedures', 'Orthopedic procedures', 'Behavioral health'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-72 hours', retrospective: 'State-specific' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'Medicaid state programs checked. Nevada statewide MCO expansion confirmed.' },
        { date: '2026-01-01', type: 'critical_expansion', title: 'Nevada Statewide Managed Care Expansion', summary: 'NV Medicaid expanded managed care to ALL 17 counties (previously only Washoe/Clark). ~75,000 residents transitioned from FFS to MCO. SilverSummit and CareSource are the contracted MCOs.' },
        { date: '2026-02-01', type: 'policy_update', title: 'EPSDT Expansion Notice', summary: 'States must cover medically necessary EPSDT services for under-21 beneficiaries regardless of service being covered for adults.' }
      ]
    },

    'Medicaid Managed Care': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'State Medicaid MCO Websites',
      clinical: {
        'E/M Services': 'Network MCO rates typically 70-90% of Medicare MPFS. Check MCO provider manual for specific allowables.',
        'Surgical': 'Prior auth required for most major surgery. eviCore, Carelon, or state UM vendor controls.',
        'Imaging / Radiology': 'Prior auth required. eviCore, Carelon, or state vendor handles imaging UM.',
        'Behavioral Health / Psychiatry': 'Carve-out or integrated. Session limits per MCO. EPSDT unlimited if under 21.',
        'Pain Management / Injections': 'Frequency limits per MCO contract. Conservative care documentation required.',
        'Pharmacy / Rx': 'MCO-specific PDL and step therapy. Behavioral health carve-out may use separate PBM.',
        'Cardiology': 'Prior auth required for cath, advanced testing. Network cardiologist referral required.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth, conservative care required.',
        'Gastroenterology': 'Endoscopy and colonoscopy: prior auth may be required. Network GI specialist required.',
        'Neurology': 'EMG/NCS: prior auth. Specialist referral required. EEG: prior auth.',
        'Wound Care': 'HBO: prior auth required. Debridement: frequency limits.',
        'Dermatology': 'Biologics: step therapy. Referral to network dermatologist required.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered. Referral required.',
        'Physical Therapy / Rehab': 'Visit limits per MCO (typically 30-60 visits). Prior auth may be required. Functional outcome documentation.'
      },
      reimbursement: {
        methodology: 'Per diem, capitation, or FFS at reduced rates (70-90% of Medicare)',
        timely_filing: 'Varies by MCO (typically 90-120 days)',
        modifier_rules: 'Check MCO contract for modifier rules and edit policies'
      },
      documentation: {
        standards: 'Medical necessity per MCO contract. EPSDT documentation required for under-21.',
        audit_risk: 'High if medical necessity not established, services outside network boundary.'
      },
      stateSpecific: {
        NV: {
          mcos: ['SilverSummit (Centene)', 'CareSource', 'Health Plan of Nevada'],
          expansion: 'Statewide 01/01/2026. ~75K FFS members moved to MCO. Choice period ends 03/31/2026.'
        },
        CA: {
          mcos: ['CalOptima', 'SCPIE', 'LA Care', 'Anthem'],
          notes: 'Cal Medicaid integrated managed care dominant. Check county.'
        },
        TX: {
          mcos: ['BCBS', 'Molina', 'UnitedHealth', 'Aetna', 'Humana'],
          notes: 'STAR/STAR+PLUS program. Expansion varies by health maintenance organization.'
        }
      },
      priorAuth: {
        portal: 'MCO-specific portals',
        phone: 'MCO-specific',
        vendor: 'eviCore, Carelon, or state UM vendor',
        commonServices: ['Imaging', 'Surgical procedures', 'High-cost DME', 'Behavioral health'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'MCO-specific' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'MCO expansion confirmed across multiple states.' },
        { date: '2026-01-01', type: 'critical_expansion', title: 'Nevada Statewide MCO Expansion', summary: 'SilverSummit and CareSource now cover all 17 NV counties effective 01/01/2026.' }
      ]
    },

    'Tricare West': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'TriWest Healthcare Alliance & Tricare Policy Manual',
      clinical: {
        'E/M Services': 'CMAC rates (Tricare Maximum Allowable Charge). Refer to TriWest fee schedule. MTF (military treatment facility) preferred.',
        'Surgical': 'Prior auth required through TriWest. CMAC rates apply. Global periods per Tricare rules.',
        'Imaging / Radiology': 'Prior auth required. TriWest medical review process. AUC applies.',
        'Behavioral Health / Psychiatry': 'Mental health referral required. Session limits per Tricare benefit. BHRN (Behavioral Health Resource Network) providers preferred.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation required. Frequency limits per Tricare policy.',
        'Pharmacy / Rx': 'Formulary managed by Tricare pharmacy program. Express Scripts integration. Mail order preferred.',
        'Cardiology': 'Referral required. Prior auth for advanced testing and cath. CMAC rates.',
        'Orthopedics / Spine': 'Referral required. Joint replacement: prior auth. Spinal fusion: prior auth, conservative care required.',
        'Gastroenterology': 'Referral required. Endoscopy/colonoscopy: prior auth per age/indication.',
        'Neurology': 'Referral required. EMG/NCS, EEG: prior auth.',
        'Wound Care': 'Prior auth required. HBO, VAC: prior auth. Tricare wound care guidelines.',
        'Dermatology': 'Referral required. Psoriasis biologics: step therapy.',
        'Pulmonology': 'Referral required. Sleep study: prior auth. CPAP: typically covered.',
        'Physical Therapy / Rehab': 'Referral required. Visit limits per Tricare. PT/OT/SLP: combined 30-visit cap (basic). Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'CMAC (Tricare Maximum Allowable Charge) - typically 105-110% of MEPS',
        timely_filing: '120 days',
        modifier_rules: 'Tricare modifier rules apply. No -50 modifier for Tricare (bilateral coded separately).'
      },
      documentation: {
        standards: 'Tricare-specific. MTF status, beneficiary category (active duty, retired, reserve, family member) required.',
        audit_risk: 'High if MTF not utilized when available, beneficiary category not verified.'
      },
      priorAuth: {
        portal: 'TriWest online portal',
        phone: '1-888-874-9378 (TriWest)',
        vendor: 'TriWest Healthcare Alliance',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty referrals', 'Behavioral health'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'Subject to TRICARE review' }
      },
      priorAuth: {
        portal: 'TriWest online portal',
        phone: '1-888-874-9378',
        vendor: 'TriWest Healthcare Alliance (West region)',
        commonServices: ['Advanced imaging', 'Specialty procedures', 'Behavioral health'],
        turnaroundTime: { standard: '5-10 business days', urgent: '48 hours', retrospective: 'TRICARE may review post-service' }
      },
      alerts: []
    },

    'Tricare East': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Humana Military & Tricare Policy Manual',
      clinical: {
        'E/M Services': 'CMAC rates. Humana Military network. MTF (military treatment facility) preferred.',
        'Surgical': 'Prior auth required through Humana Military. CMAC rates. Global periods per Tricare rules.',
        'Imaging / Radiology': 'Prior auth required. Humana UM process. AUC applies.',
        'Behavioral Health / Psychiatry': 'Mental health referral. Session limits per Tricare benefit. BHRN providers preferred.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation. Frequency limits per Tricare policy.',
        'Pharmacy / Rx': 'Tricare pharmacy program. Mail order preferred.',
        'Cardiology': 'Referral required. Prior auth for advanced testing. CMAC rates.',
        'Orthopedics / Spine': 'Referral required. Joint replacement: prior auth. Spinal fusion: prior auth with conservative care documentation.',
        'Gastroenterology': 'Referral required. Endoscopy/colonoscopy: prior auth per indication.',
        'Neurology': 'Referral required. EMG/NCS, EEG: prior auth.',
        'Wound Care': 'Prior auth required. HBO, VAC: prior auth per Tricare guidelines.',
        'Dermatology': 'Referral required. Biologics: step therapy.',
        'Pulmonology': 'Referral required. Sleep study: prior auth. CPAP: typically covered.',
        'Physical Therapy / Rehab': 'Referral required. Visit limits per Tricare (30-visit cap basic). Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'CMAC rates - typically 105-110% of MEPS',
        timely_filing: '120 days',
        modifier_rules: 'Tricare modifier rules apply.'
      },
      documentation: {
        standards: 'Tricare-specific. MTF status, beneficiary category required.',
        audit_risk: 'High if MTF not utilized when available, beneficiary category not verified.'
      },
      priorAuth: {
        portal: 'Humana Military online portal',
        phone: '1-800-444-5445 (Humana Military)',
        vendor: 'Humana Military (East region)',
        commonServices: ['Advanced imaging', 'Specialty procedures', 'Behavioral health'],
        turnaroundTime: { standard: '5-10 business days', urgent: '48 hours', retrospective: 'TRICARE may review post-service' }
      },
      alerts: []
    },

    'TriWest VACCN': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'VA Community Care Network & VA Policy',
      clinical: {
        'E/M Services': 'Medicare rates (MPFS). VA authorization required for all services. Veterans Affairs prior approval mandatory.',
        'Surgical': 'Prior auth required through VA. Medicare global period rules. VA clinical guidelines apply.',
        'Imaging / Radiology': 'Prior auth required. VA authorization process. Medicare AUC applies.',
        'Behavioral Health / Psychiatry': 'VA behavioral health authorization. Session limits per VA benefit.',
        'Pain Management / Injections': 'Prior auth required. VA conservative care requirements. Frequency limits per VA policy.',
        'Pharmacy / Rx': 'VA formulary applies. Veterans may receive drugs through VA pharmacy or community pharmacy per authorization.',
        'Cardiology': 'Prior auth required. VA cardiologist coordination. Medicare rates.',
        'Orthopedics / Spine': 'Prior auth required. Joint replacement: conservative care required. Spinal fusion: VA clinical guidelines.',
        'Gastroenterology': 'Prior auth required. Age-based screening guidelines per VA.',
        'Neurology': 'Prior auth required. EMG/NCS, EEG per VA guidelines.',
        'Wound Care': 'Prior auth required. HBO, VAC, debridement per VA rules.',
        'Dermatology': 'Prior auth required. Biologics: step therapy per VA formulary.',
        'Pulmonology': 'Prior auth required. Sleep study, CPAP per VA guidelines.',
        'Physical Therapy / Rehab': 'Prior auth required. Visit limits per VA. Functional outcome documentation.'
      },
      reimbursement: {
        methodology: 'Medicare MPFS rates (Conversion Factor $33.29)',
        timely_filing: '1 year from date of service',
        modifier_rules: 'Medicare modifier rules apply.'
      },
      documentation: {
        standards: 'VA authorization required. Veteran status verification. Service-connected disability rating relevant.',
        audit_risk: 'High if VA prior authorization not obtained, veteran not eligible.'
      },
      priorAuth: {
        portal: 'VA Community Care Portal',
        phone: '1-888-ASKVA411 (1-888-275-8255)',
        vendor: 'TriWest VACCN (VA authorizer)',
        commonServices: ['All specialty services require VA authorization'],
        turnaroundTime: { standard: '10 business days', urgent: '72 hours', retrospective: 'VA authorization required pre-service' }
      },
      alerts: []
    },

    'ChampVA': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'VA & ChampVA Handbook',
      clinical: {
        'E/M Services': 'CMAC rates (similar to Tricare). Dependents/survivors of veterans. Medicare coordination.',
        'Surgical': 'Prior auth may be required. Global period rules. Secondary to Medicare if eligible.',
        'Imaging / Radiology': 'Prior auth may be required. Check ChampVA guidelines.',
        'Behavioral Health / Psychiatry': 'Mental health covered. Session limits per ChampVA benefit.',
        'Pain Management / Injections': 'Prior auth may be required. Frequency limits.',
        'Pharmacy / Rx': 'Formulary-based. Prior auth for non-formulary drugs.',
        'Cardiology': 'Covered per ChampVA benefit. Prior auth may be required.',
        'Orthopedics / Spine': 'Joint replacement, spinal fusion: prior auth may be required.',
        'Gastroenterology': 'Screening and therapeutic services covered per benefit.',
        'Neurology': 'Covered services per ChampVA benefit.',
        'Wound Care': 'Covered services per benefit. Prior auth may be required.',
        'Dermatology': 'Covered per benefit. Biologics: may require prior auth.',
        'Pulmonology': 'Sleep study, CPAP: covered. Prior auth may be required.',
        'Physical Therapy / Rehab': 'Visit limits per ChampVA benefit. Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'CMAC rates (105-110% of MEPS)',
        timely_filing: '120 days',
        modifier_rules: 'Standard modifier rules.'
      },
      documentation: {
        standards: 'Spouse/survivor status verification. Medicare coordination required.',
        audit_risk: 'High if Medicare coordination not applied when eligible.'
      },
      priorAuth: {
        portal: 'VA ChampVA portal',
        phone: '1-800-733-8387 (ChampVA)',
        vendor: 'VA ChampVA Administration',
        commonServices: ['Advanced imaging', 'Specialty procedures'],
        turnaroundTime: { standard: '15 business days', urgent: '5 business days', retrospective: 'May be denied if not pre-authorized' }
      },
      alerts: []
    },

    'Workers Compensation': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'State Workers Compensation Boards & Fee Schedules',
      clinical: {
        'E/M Services': 'State fee schedule. NV (110% Medicare), CA (OMFS), TX (125% Medicare), FL (110% Medicare), NY (WCB schedule).',
        'Surgical': 'Work-related only. Prior auth required. Fee schedule applies. Global period rules per state.',
        'Imaging / Radiology': 'Work-related only. Prior auth required. State fee schedule.',
        'Behavioral Health / Psychiatry': 'Work-related mental health only (psychological injury from work). Prior auth required.',
        'Pain Management / Injections': 'Work-related only. Prior auth required. Frequency limits per state. Conservative care required.',
        'Pharmacy / Rx': 'Work-related medications only. Formulary per state WC board.',
        'Cardiology': 'Work-related cardiac injury only. Prior auth required.',
        'Orthopedics / Spine': 'Work-related injury. Joint replacement: prior auth. Spinal fusion: prior auth, conservative care required.',
        'Gastroenterology': 'Work-related GI only. Rare coverage.',
        'Neurology': 'Work-related neurological injury. EMG/NCS: prior auth.',
        'Wound Care': 'Work-related wounds. Debridement, HBO, VAC: prior auth.',
        'Dermatology': 'Work-related skin injuries. Occupational dermatitis.',
        'Pulmonology': 'Work-related pulmonary disease. Sleep study, CPAP per state guidelines.',
        'Physical Therapy / Rehab': 'Work-related injury. PT/OT: typically covered with auth. Visit limits per state.'
      },
      reimbursement: {
        methodology: 'State-specific fee schedules: NV (110% Medicare), CA (OMFS), TX (125% Medicare), FL (110% Medicare), NY (WCB)',
        timely_filing: 'Varies by state (typically 30-180 days)',
        modifier_rules: 'State-specific.'
      },
      documentation: {
        standards: 'First Report of Injury (Form 101/equivalent). Medical causation required. Work-related determination mandatory.',
        audit_risk: 'High if work-relatedness not established, causation unclear, non-work-related service billed.'
      },
      stateSpecific: {
        NV: { board: 'Nevada Division of Workers Compensation', feeBase: '110% Medicare MPFS', authForm: 'First Report of Injury' },
        CA: { board: 'California Division of Workers Compensation', feeBase: 'OMFS (Official Medical Fee Schedule)', authForm: 'Workers Comp Claim Form (DWC-1)' },
        TX: { board: 'Texas Department of Insurance', feeBase: '125% Medicare MPFS', authForm: 'First Report of Injury' },
        FL: { board: 'Florida Division of Workers Compensation', feeBase: '110% Medicare MPFS', authForm: 'First Report of Injury' },
        NY: { board: 'New York Workers Compensation Board', feeBase: 'WCB Schedule', authForm: 'Workers Comp Form' }
      },
      priorAuth: {
        portal: 'State WC board portal',
        phone: 'Varies by state board',
        vendor: 'State WC Insurer',
        commonServices: ['Surgical procedures', 'Imaging', 'PT/OT', 'Pain management'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24 hours', retrospective: 'May deny if not work-related' }
      },
      alerts: []
    },

    'Department of Labor (FECA)': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'OWCP (Office of Workers Compensation Programs)',
      clinical: {
        'E/M Services': '200% Medicare MPFS. Federal employees only. OWCP authorization required.',
        'Surgical': 'Prior auth required through OWCP. 200% Medicare rates. Global period rules.',
        'Imaging / Radiology': 'Prior auth required. 200% Medicare rates.',
        'Behavioral Health / Psychiatry': 'Work-related psychological injury. Prior auth required. 200% Medicare rates.',
        'Pain Management / Injections': 'Work-related pain only. Prior auth required. 200% Medicare rates. Frequency limits per OWCP policy.',
        'Pharmacy / Rx': 'Work-related medications. OWCP formulary applies.',
        'Cardiology': 'Work-related cardiac injury. Prior auth required. 200% Medicare rates.',
        'Orthopedics / Spine': 'Work-related injury. Joint replacement: prior auth. Spinal fusion: prior auth with conservative care.',
        'Gastroenterology': 'Work-related GI injury. Prior auth required.',
        'Neurology': 'Work-related neurological injury. Prior auth required.',
        'Wound Care': 'Work-related wounds. HBO, VAC, debridement: prior auth.',
        'Dermatology': 'Work-related occupational skin conditions. Prior auth required.',
        'Pulmonology': 'Work-related pulmonary disease. Sleep study, CPAP: prior auth.',
        'Physical Therapy / Rehab': 'Work-related injury. PT/OT: typically covered. Visit limits per OWCP.'
      },
      reimbursement: {
        methodology: '200% Medicare MPFS Conversion Factor ($66.58)',
        timely_filing: '1 year from date of service',
        modifier_rules: 'Medicare modifier rules apply.'
      },
      documentation: {
        standards: 'CA-1 (Federal form) or CA-2 (recurrence). Medical causation required. OWCP authorization mandatory.',
        audit_risk: 'High if OWCP authorization not obtained, federal employee status not verified, causation unclear.'
      },
      priorAuth: {
        portal: 'OWCP district office portal',
        phone: 'Varies by OWCP district',
        vendor: 'OWCP (Office of Workers Compensation Programs)',
        commonServices: ['All services require OWCP authorization'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24 hours', retrospective: 'May deny if not pre-authorized' }
      },
      alerts: []
    },

    'Aetna': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Aetna Clinical Policy Bulletins & OfficeLink',
      clinical: {
        'E/M Services': 'Network rates per contract. Check Aetna OfficeLink portal for allowables.',
        'Surgical': 'Prior auth required via OfficeLink. Global period rules per Aetna clinical policies. eviCore may handle complex cases.',
        'Imaging / Radiology': 'Prior auth required. eviCore handles many imaging cases. AUC mandatory.',
        'Behavioral Health / Psychiatry': 'Session limits vary by plan. Carve-out to behavioral health vendor. Prior auth required.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation. Frequency limits per Aetna CPB.',
        'Pharmacy / Rx': 'Aetna Pharmacy Benefit Manager (PBM) manages formulary. Step therapy common. Prior auth for non-formulary.',
        'Cardiology': 'Prior auth for advanced testing, cardiac cath. Aetna CPB 224.0 governs coverage.',
        'Orthopedics / Spine': 'Joint replacement: prior auth required. Spinal fusion: prior auth, conservative care required per Aetna CPB 234.0.',
        'Gastroenterology': 'Screening colonoscopy: age 45-75, every 10 years. Prior auth may be required.',
        'Neurology': 'EMG/NCS: prior auth. EEG: prior auth. Botox: frequency limits per Aetna policy.',
        'Wound Care': 'HBO: prior auth required. Debridement: frequency limits. VAC therapy: prior auth.',
        'Dermatology': 'Psoriasis biologics: step therapy. Mohs: typically covered.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered with auth. PFT: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan (typically 30-60 visits). Prior auth may be required. Functional outcome documentation.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (typically 80-90% of billed)',
        timely_filing: '90 days (in-network), 180 days (out-of-network)',
        modifier_rules: 'Aetna-specific bundling and modifier rules. Check OfficeLink.'
      },
      documentation: {
        standards: 'Medical necessity per Aetna Clinical Policy Bulletins. Authorization documentation required.',
        audit_risk: 'High if CPB requirements not met, prior auth not obtained, unbundling occurs.'
      },
      priorAuth: {
        portal: 'Aetna OfficeLink (https://www.aetna.com/officelink)',
        phone: '1-800-624-4881 (Aetna Authorizations)',
        vendor: 'eviCore (imaging/cardiology UM), Aetna internal UM',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'High-cost DME', 'Behavioral health', 'Pain management'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'Aetna OfficeLink Updates March 2026 published. Updated precertification list effective 03/01/2026.' },
        { date: '2026-06-01', type: 'upcoming_change', title: 'CCRP Claim Edits Expansion', summary: 'Effective June 1, 2026: New claim edits under Aetna Claim Coding & Reimbursement Program (CCRP).' },
        { date: '2026-03-01', type: 'precert_update', title: 'Precertification List Updated', summary: 'Aetna participating provider precertification list updated effective 03/01/2026.' }
      ]
    },

    'Anthem / Elevance': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Anthem Clinical UM Guidelines & Carelon',
      clinical: {
        'E/M Services': 'Network rates per contract. Check Anthem provider portal for allowables.',
        'Surgical': 'Prior auth required. Carelon or Anthem UM handles. Global period rules per Anthem guidelines.',
        'Imaging / Radiology': 'Prior auth required. AIM (Anthem Imaging Management) or eviCore handles. AUC mandatory.',
        'Behavioral Health / Psychiatry': 'Carved out to Carelon. Session limits per plan. Prior auth required.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation. Frequency limits per Anthem policy.',
        'Pharmacy / Rx': 'Anthem or Caremark PBM manages formulary. Step therapy common. Prior auth for non-formulary.',
        'Cardiology': 'Prior auth for advanced testing. Anthem CPG or Carelon manages. Stress test/echo/cath prior auth required.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth, conservative care required.',
        'Gastroenterology': 'Screening colonoscopy: age 45-75. Therapeutic scopes prior auth.',
        'Neurology': 'EMG/NCS: prior auth. EEG: prior auth. Botox: frequency limits.',
        'Wound Care': 'HBO: prior auth. Debridement: frequency limits. VAC: prior auth.',
        'Dermatology': 'Biologics: step therapy. Mohs: typically covered.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered. PFT: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan (30-60 visits typical). Prior auth may be required. Functional outcome documentation.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (typically 80-90% of billed)',
        timely_filing: '90 days (in-network), 180 days (out-of-network)',
        nonParticipatingPolicy: 'CRITICAL: 11 states (CO, CT, GA, IN, KY, ME, MO, NV, NH, OH, WI) have 10% OON penalty. Expanding to CA 06/01/2026.',
        modifier_rules: 'Anthem-specific bundling rules.'
      },
      documentation: {
        standards: 'Medical necessity per Anthem Clinical UM Guidelines. Prior auth documentation required.',
        audit_risk: 'High if prior auth not obtained, Carelon requirements not met, OON status triggers penalty.'
      },
      stateSpecific: {
        NV: { nonParticipatingPenalty: '10% payment reduction' },
        CA: { nonParticipatingPenalty: 'Effective 06/01/2026: 10% payment reduction' }
      },
      priorAuth: {
        portal: 'Anthem provider portal',
        phone: '1-800-335-6275 (Anthem Authorizations)',
        vendor: 'Carelon (behavioral health, some UM), AIM (imaging)',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Behavioral health', 'Pain management'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'Anthem/Elevance policies checked. Major nonparticipating provider policy in effect.' },
        { date: '2026-01-01', type: 'critical_policy', title: 'Nonparticipating Provider Penalty Policy', summary: 'EFFECTIVE NOW in 11 states (CO, CT, GA, IN, KY, ME, MO, NV, NH, OH, WI): Anthem facilities using OON providers face 10% reduction. Expanding to CA 06/01/2026.' },
        { date: '2026-06-01', type: 'upcoming_change', title: 'OON Policy Expanding to California', summary: 'Anthem nonparticipating provider penalty policy expanding to California market effective June 1, 2026.' }
      ]
    },

    'BCBS': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'BCBS State Licensees & Clinical Policies',
      clinical: {
        'E/M Services': 'Varies by state licensee. Check HCSC (IL, TX, MT, NM, OK), Florida Blue, CareFirst (MD/DC/VA), Premera (WA), etc.',
        'Surgical': 'Prior auth requirements vary by state. eviCore or internal UM.',
        'Imaging / Radiology': 'Prior auth required. eviCore or state licensee handles. AUC mandatory.',
        'Behavioral Health / Psychiatry': 'Varies by state licensee. Session limits vary. Prior auth may be required.',
        'Pain Management / Injections': 'Prior auth required. Frequency limits per state licensee policy.',
        'Pharmacy / Rx': 'State licensee PBM or contracted PBM. Step therapy common.',
        'Cardiology': 'Prior auth for advanced testing. State-specific policies.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth with conservative care.',
        'Gastroenterology': 'Screening colonoscopy: age-based. Therapeutic scopes prior auth.',
        'Neurology': 'Prior auth required. State-specific policies.',
        'Wound Care': 'Prior auth required. State-specific policies.',
        'Dermatology': 'Step therapy for biologics. State-specific policies.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered.',
        'Physical Therapy / Rehab': 'Visit limits per state licensee (typically 30-60). Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'Network contracted rates vary by state licensee',
        timely_filing: 'Varies by state licensee (typically 90-180 days)',
        note: 'BCBS is a federation. HCSC, Florida Blue, CareFirst, Premera, etc. are separate licensees with different policies.'
      },
      documentation: {
        standards: 'Medical necessity per state licensee policy.',
        audit_risk: 'High if prior auth not obtained, state-specific policies not followed.'
      },
      stateSpecific: {
        IL: { licensee: 'HCSC (Illinois BCBS)', policies: 'HCSC medical policies apply' },
        TX: { licensee: 'HCSC (Texas BCBS)', policies: 'HCSC medical policies apply' },
        MT: { licensee: 'HCSC (Montana BCBS)', policies: 'HCSC medical policies apply' },
        NM: { licensee: 'HCSC (New Mexico BCBS)', policies: 'HCSC medical policies apply' },
        OK: { licensee: 'HCSC (Oklahoma BCBS)', policies: 'HCSC medical policies apply' },
        FL: { licensee: 'Florida Blue', policies: 'Florida Blue medical policies apply' },
        MD: { licensee: 'CareFirst BCBS', policies: 'CareFirst medical policies apply' },
        DC: { licensee: 'CareFirst BCBS', policies: 'CareFirst medical policies apply' },
        VA: { licensee: 'CareFirst BCBS', policies: 'CareFirst medical policies apply' },
        WA: { licensee: 'Premera BCBS', policies: 'Premera medical policies apply' }
      },
      priorAuth: {
        portal: 'State licensee portal',
        phone: 'Varies by state licensee',
        vendor: 'eviCore or state licensee UM',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: []
    },

    'Blue Shield': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Blue Shield of California & Clinical Policies',
      clinical: {
        'E/M Services': 'Blue Shield of California network rates. Check provider portal for allowables.',
        'Surgical': 'Prior auth required. Blue Shield UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore handles imaging UM. AUC mandatory.',
        'Behavioral Health / Psychiatry': 'Session limits vary by plan. Prior auth may be required.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation.',
        'Pharmacy / Rx': 'Managed by Blue Shield PBM or Express Scripts. Step therapy common.',
        'Cardiology': 'Prior auth for advanced testing and cath.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth with conservative care.',
        'Gastroenterology': 'Screening and therapeutic services subject to plan benefits.',
        'Neurology': 'Prior auth required for specialty services.',
        'Wound Care': 'Prior auth required. Frequency limits.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered.',
        'Physical Therapy / Rehab': 'Visit limits per plan. Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (typically 80-90% of billed)',
        timely_filing: '90 days (in-network), 180 days (out-of-network)',
        modifier_rules: 'Blue Shield-specific bundling rules.'
      },
      documentation: {
        standards: 'Medical necessity per Blue Shield Clinical Policies.',
        audit_risk: 'High if prior auth not obtained.'
      },
      priorAuth: {
        portal: 'Blue Shield provider portal',
        phone: '1-888-235-2001 (Blue Shield Authorizations)',
        vendor: 'eviCore (imaging), Blue Shield internal UM',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty services'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: []
    },

    'Federal BCBS (FEP)': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'FEP (Federal Employee Program) & BCBS Policies',
      clinical: {
        'E/M Services': 'FEP network rates per Service Benefit Plan. Check FEP Blue provider portal.',
        'Surgical': 'Prior auth may be required depending on FEP plan option.',
        'Imaging / Radiology': 'Prior auth requirements vary by FEP plan. eviCore may handle.',
        'Behavioral Health / Psychiatry': 'Session limits vary by FEP plan option. Carve-out possible.',
        'Pain Management / Injections': 'Prior auth may be required. Frequency limits per FEP plan.',
        'Pharmacy / Rx': 'FEP Pharmacy Benefit (Express Scripts or other). Step therapy varies by plan.',
        'Cardiology': 'Prior auth may be required for advanced testing.',
        'Orthopedics / Spine': 'Prior auth may be required. Plan-specific policies.',
        'Gastroenterology': 'Screening and therapeutic services per FEP plan benefits.',
        'Neurology': 'Prior auth requirements per FEP plan.',
        'Wound Care': 'Prior auth requirements per FEP plan.',
        'Dermatology': 'Varies by FEP plan. Biologics may require prior auth.',
        'Pulmonology': 'Sleep study and CPAP coverage per FEP plan benefits.',
        'Physical Therapy / Rehab': 'Visit limits vary by FEP plan. Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'FEP network contracted rates (varies by plan option)',
        timely_filing: '90 days (in-network), 180 days (out-of-network)',
        note: 'FEP is nationwide BCBS plan. Service Benefit Plan with multiple options. Coverage varies by plan.'
      },
      documentation: {
        standards: 'Medical necessity per FEP plan guidelines.',
        audit_risk: 'High if prior auth not obtained when required.'
      },
      priorAuth: {
        portal: 'FEP Blue provider portal',
        phone: '1-800-624-7901 (FEP Blue Authorizations)',
        vendor: 'FEP Blue UM',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty services'],
        turnaroundTime: { standard: '5 business days', urgent: '24 hours', retrospective: 'May vary by plan' }
      },
      alerts: []
    },

    'Cigna / Evernorth': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Cigna Coverage Policies & Evernorth',
      clinical: {
        'E/M Services': 'Cigna network rates per contract. Check Cigna provider portal.',
        'Surgical': 'Prior auth required. Cigna UM or eviCore handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore handles imaging UM. AUC mandatory.',
        'Behavioral Health / Psychiatry': 'Managed by Carelon (Evernorth subsidiary). Session limits per Cigna plan. Prior auth required.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation. Frequency limits per Cigna policy.',
        'Pharmacy / Rx': 'Express Scripts (Evernorth) manages formulary. Step therapy common. Prior auth for non-formulary.',
        'Cardiology': 'Prior auth for advanced testing and cath. eviCore may handle.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth with conservative care required.',
        'Gastroenterology': 'Screening colonoscopy: age 45-75. Therapeutic scopes prior auth.',
        'Neurology': 'EMG/NCS: prior auth. EEG: prior auth. Botox: prior auth eliminated for TMS (effective 03/06/2026).',
        'Wound Care': 'HBO: prior auth. Debridement: frequency limits. VAC: prior auth.',
        'Dermatology': 'Biologics: step therapy. Mohs: typically covered.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered. PFT: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan (typically 30-60). Prior auth may be required. Functional outcome documentation.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (typically 80-90% of billed)',
        timely_filing: '90 days (in-network), 180 days (out-of-network)',
        modifier_rules: 'Cigna-specific bundling rules.'
      },
      documentation: {
        standards: 'Medical necessity per Cigna Coverage Policies.',
        audit_risk: 'High if prior auth not obtained, Carelon BH requirements not met.'
      },
      priorAuth: {
        portal: 'Cigna provider portal',
        phone: '1-800-287-0787 (Cigna Authorizations)',
        vendor: 'eviCore (imaging/cardiology), Carelon (behavioral health)',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Behavioral health', 'Pain management'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'Cigna/Evernorth policies checked. Major TMS prior auth change found.' },
        { date: '2026-03-06', type: 'auth_removal', title: 'TMS Prior Authorization ELIMINATED', summary: 'Effective March 6, 2026: Evernorth/Cigna eliminated prior authorization for TMS for in-network providers. Covers MDD and OCD.' },
        { date: '2026-03-01', type: 'auth_change', title: 'DME Prior Auth Admin Change', summary: 'Change in prior authorization administration for DME services effective March 1, 2026.' }
      ]
    },

    'Humana': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Humana Clinical Policies & Provider Manual',
      clinical: {
        'E/M Services': 'Network rates per contract. Humana MA plans vary. Check Humana provider portal.',
        'Surgical': 'Prior auth required. Humana UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore or Humana UM. AUC mandatory.',
        'Behavioral Health / Psychiatry': 'CareSource (Humana subsidiary) manages BH. Session limits per plan. Prior auth required.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation. Frequency limits per Humana policy.',
        'Pharmacy / Rx': 'CenterWell pharmacy integration. Formulary managed by Humana PBM. Step therapy common.',
        'Cardiology': 'Prior auth for advanced testing and cath.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth with conservative care.',
        'Gastroenterology': 'Screening and therapeutic services per plan benefits. Age-based screening.',
        'Neurology': 'Prior auth required. Plan-specific frequency limits.',
        'Wound Care': 'Prior auth required. Frequency limits per plan.',
        'Dermatology': 'Biologics: step therapy. Plan-specific policies.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered per MA benefits.',
        'Physical Therapy / Rehab': 'MA plans: typically unlimited PT subject to functional outcome requirements. Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (MA plans typically 80-100% of billed)',
        timely_filing: '90 days (MA plans)',
        modifier_rules: 'Humana-specific bundling rules.'
      },
      documentation: {
        standards: 'Medical necessity per Humana Clinical Policies. Functional outcome documentation for PT/OT.',
        audit_risk: 'High if prior auth not obtained, functional outcomes not documented.'
      },
      priorAuth: {
        portal: 'Humana provider portal',
        phone: '1-800-448-6262 (Humana Authorizations)',
        vendor: 'Humana internal UM, eviCore (imaging)',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Pain management', 'Specialty services'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'Humana policies checked. 2026 MA plan details confirmed.' },
        { date: '2026-01-01', type: 'ma_update', title: '2026 MA Plans — Expanded Benefits', summary: '80%+ of Humana MA members in stable-benefit plans. $0 copays for preventive, covered dental, PCP visits, Tier 1 Rx.' },
        { date: '2026-01-01', type: 'rx_update', title: 'Part D Changes', summary: '83% of standalone PDPs have lower premiums. $2,100 annual OOP cap. $0 generic copays on many plans.' }
      ]
    },

    'United Healthcare': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'UHC Medical Policy Updates & Clinical Guidelines',
      clinical: {
        'E/M Services': 'Network rates per contract. Check UHC provider portal or UnitedHealth Clinical Guidelines Portal.',
        'Surgical': 'Prior auth required. Optum UM handles. InterQual criteria apply.',
        'Imaging / Radiology': 'Prior auth required. eviCore or Optum UM. AUC mandatory. ICD-10 Excludes 1 now enforced (03/01/2026).',
        'Behavioral Health / Psychiatry': 'Optum Behavioral Health manages. Session limits per plan. Prior auth required.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation. Frequency limits per UHC policy.',
        'Pharmacy / Rx': 'OptumRx PBM manages formulary. Step therapy common. Prior auth for non-formulary.',
        'Cardiology': 'Prior auth for advanced testing and cath. Outpatient chemo prior auth via Optum CGP (effective 06/01/2026).',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth with conservative care.',
        'Gastroenterology': 'Screening colonoscopy: age 45-75. Therapeutic scopes prior auth.',
        'Neurology': 'Prior auth required. InterQual criteria apply.',
        'Wound Care': 'Prior auth required. Frequency limits.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered.',
        'Physical Therapy / Rehab': 'Visit limits per plan. Prior auth may be required. Functional outcome documentation.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (typically 80-90% of billed)',
        timely_filing: '90 days (in-network), 180 days (out-of-network)',
        modifier_rules: 'UHC-specific bundling rules. ICD-10 Excludes 1 now enforced (03/01/2026).'
      },
      documentation: {
        standards: 'Medical necessity per UHC Medical Policy Updates. InterQual criteria for many services.',
        audit_risk: 'High if prior auth not obtained, Excludes 1 violations, InterQual criteria not met.'
      },
      priorAuth: {
        portal: 'UnitedHealth Clinical Guidelines Portal',
        phone: '1-888-331-1970 (UHC Authorizations)',
        vendor: 'Optum (UM, behavioral health, pharmacy)',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Behavioral health', 'Pain management', 'Specialty services'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'UHC Commercial and MA Medical Policy Update Bulletins for March 2026 published. UMR bulletin also released.' },
        { date: '2026-03-01', type: 'coding_edit', title: 'Excludes 1 Enforcement Expanded', summary: 'Effective March 1, 2026: UHC now enforcing ICD-10 Excludes 1 guidelines across ALL claim types.' },
        { date: '2026-06-01', type: 'upcoming_change', title: 'Outpatient Chemo Prior Auth via Optum CGP', summary: 'Effective June 1, 2026: Outpatient chemotherapy will require prior authorization through Optum CGP.' }
      ]
    },

    'UMR': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'UnitedHealth Group & UMR Medical Policies',
      clinical: {
        'E/M Services': 'UHC subsidiary. Network rates per contract. Check UHC Medical Policies.',
        'Surgical': 'Prior auth required. Optum UM handles. InterQual criteria apply.',
        'Imaging / Radiology': 'Prior auth required. eviCore or Optum UM. AUC mandatory.',
        'Behavioral Health / Psychiatry': 'Optum Behavioral Health. Session limits per plan. Prior auth required.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation.',
        'Pharmacy / Rx': 'OptumRx PBM. Step therapy common. Prior auth for non-formulary.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth with conservative care.',
        'Gastroenterology': 'Screening and therapeutic services per plan benefits.',
        'Neurology': 'Prior auth required. InterQual criteria apply.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth. CPAP: typically covered.',
        'Physical Therapy / Rehab': 'Visit limits per plan. Functional outcome documentation.'
      },
      reimbursement: {
        methodology: 'Self-funded employer plans. Optum repricing applies. Varies by specific plan design.',
        timely_filing: 'Plan-specific',
        modifier_rules: 'UHC/Optum modifier rules.'
      },
      documentation: {
        standards: 'Medical necessity per Optum guidelines. Self-funded plan custom rules may apply.',
        audit_risk: 'High if Optum repricing rules not followed, plan-specific requirements not met.'
      },
      priorAuth: {
        portal: 'UnitedHealth Clinical Guidelines Portal',
        phone: '1-888-331-1970 (UMR Authorizations)',
        vendor: 'Optum (UM, behavioral health, pharmacy)',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Behavioral health', 'Specialty services'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'Plan-specific' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'UHC Commercial and MA Medical Policy Update Bulletins for March 2026 published. UMR bulletin also released.' }
      ]
    },

    'Optum Care': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Optum Clinical Policies & Value-Based Care',
      clinical: {
        'E/M Services': 'Value-based care model. Risk-based contracts. Quality metrics drive reimbursement.',
        'Surgical': 'Prior auth required. Optum UM controls.',
        'Imaging / Radiology': 'Prior auth required. eviCore handles UM.',
        'Behavioral Health / Psychiatry': 'Optum Behavioral Health manages. Session limits vary.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation.',
        'Pharmacy / Rx': 'OptumRx PBM.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth.',
        'Gastroenterology': 'Services subject to value-based incentives.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Value-based outcomes tracked.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Functional outcome requirements. Quality metrics drive reimbursement.'
      },
      reimbursement: {
        methodology: 'Value-based contracting. Risk-based. P4P (Pay-for-Performance) incentives. Quality metrics.',
        timely_filing: 'Contract-specific',
        modifier_rules: 'Optum-specific.'
      },
      documentation: {
        standards: 'Quality metrics documentation. Functional outcome documentation.',
        audit_risk: 'High if quality metrics not met, P4P performance not documented.'
      },
      priorAuth: {
        portal: 'Optum provider portal',
        phone: 'Varies by contract',
        vendor: 'Optum UM',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'Contract-specific' }
      },
      alerts: []
    },

    'Molina': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Molina Clinical Policies & Provider Manual',
      clinical: {
        'E/M Services': 'Molina network rates per contract. Check Molina provider portal.',
        'Surgical': 'Prior auth required. Molina UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore or Molina UM.',
        'Behavioral Health / Psychiatry': 'Molina BH or carve-out vendor. Session limits per plan.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation.',
        'Pharmacy / Rx': 'Molina PBM or contracted PBM. Step therapy common.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan. Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (varies by state Medicaid)',
        timely_filing: 'State-specific (typically 90-180 days)',
        modifier_rules: 'Molina-specific.'
      },
      documentation: {
        standards: 'Medical necessity per Molina Clinical Policies.',
        audit_risk: 'High if prior auth not obtained, medical necessity not documented.'
      },
      priorAuth: {
        portal: 'Molina provider portal',
        phone: '1-888-665-4263 (Molina Authorizations)',
        vendor: 'Molina UM, eviCore (imaging)',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Behavioral health'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'State-specific' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'Molina policies checked. 2026 clinical guidelines and provider manual updates confirmed.' },
        { date: '2026-02-01', type: 'policy_update', title: 'OH MCP 216a Gender Affirmation', summary: 'Molina Ohio Medicaid MCP 216a for Gender Affirmation Treatment effective 02/01/2026.' },
        { date: '2026-01-01', type: 'policy_update', title: 'OH MCP 145 EPAP for OSA', summary: 'Molina Ohio MCP 145 for Expiratory Positive Airway Pressure (EPAP) for OSA effective 01/01/2026.' }
      ]
    },

    'Centene / Ambetter / Allwell': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Centene Clinical Policies & Plan Documents',
      clinical: {
        'E/M Services': 'Network rates per Centene subsidiary plan. Ambetter (marketplace), Allwell (MA), SilverSummit (NV Medicaid).',
        'Surgical': 'Prior auth required. Centene UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore or Centene UM.',
        'Behavioral Health / Psychiatry': 'Carve-out or integrated. Session limits vary by plan.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation.',
        'Pharmacy / Rx': 'Centene PBM. Step therapy common.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan. Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (varies by subsidiary)',
        timely_filing: 'Varies by subsidiary (typically 90-180 days)',
        note: 'Centene parent company. SilverSummit (NV Medicaid), Ambetter (marketplace), Allwell (MA) are subsidiaries with different policies.'
      },
      documentation: {
        standards: 'Medical necessity per Centene Clinical Policies.',
        audit_risk: 'High if prior auth not obtained.'
      },
      stateSpecific: {
        NV: { subsidiary: 'SilverSummit', programType: 'Medicaid MCO', expansion: 'Statewide 01/01/2026' }
      },
      priorAuth: {
        portal: 'Centene subsidiary portal',
        phone: 'Subsidiary-specific',
        vendor: 'Centene UM, eviCore (imaging)',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: []
    },

    'WellCare': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'WellCare Clinical Policies & Provider Manual',
      clinical: {
        'E/M Services': 'WellCare network rates. Centene subsidiary. Medicare and Medicaid plans.',
        'Surgical': 'Prior auth required. Centene UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore or WellCare UM.',
        'Behavioral Health / Psychiatry': 'WellCare BH or carve-out. Session limits per plan.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation.',
        'Pharmacy / Rx': 'Centene PBM. Step therapy common.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan.'
      },
      reimbursement: {
        methodology: 'Network contracted rates (varies by plan)',
        timely_filing: 'Varies by plan (typically 90-180 days)',
        modifier_rules: 'Centene-specific.'
      },
      documentation: {
        standards: 'Medical necessity per WellCare Clinical Policies.',
        audit_risk: 'High if prior auth not obtained.'
      },
      priorAuth: {
        portal: 'WellCare provider portal',
        phone: '1-888-210-2583 (WellCare Authorizations)',
        vendor: 'Centene UM, eviCore (imaging)',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: []
    },

    'SilverSummit': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'SilverSummit (Centene) & Nevada Medicaid',
      clinical: {
        'E/M Services': 'Nevada Medicaid rates. Centene subsidiary. Statewide MCO.',
        'Surgical': 'Prior auth required. Centene UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore or SilverSummit UM.',
        'Behavioral Health / Psychiatry': 'Carve-out or integrated. Session limits per Nevada Medicaid.',
        'Pain Management / Injections': 'Prior auth required. Frequency limits per Nevada policy.',
        'Pharmacy / Rx': 'Centene PBM. Nevada Medicaid PDL. Step therapy common.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth.',
        'Gastroenterology': 'Services per Nevada Medicaid benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'EPSDT (under 21): typically unlimited. Adults: visit limits per contract. Prior auth may be required.'
      },
      reimbursement: {
        methodology: 'Nevada Medicaid fee schedule',
        timely_filing: '6 months (MCO)',
        modifier_rules: 'Nevada Medicaid rules.'
      },
      documentation: {
        standards: 'Medical necessity per Nevada Medicaid. EPSDT documentation for under-21.',
        audit_risk: 'High if prior auth not obtained, medical necessity not established.'
      },
      stateSpecific: {
        NV: {
          expansion: 'EFFECTIVE 01/01/2026: Statewide expansion to all 17 counties. Previously Clark/Washoe only. ~75K FFS members moved to MCO. Choice period ends 03/31/2026.',
          portal: 'Nevada MMIS/EVS'
        }
      },
      priorAuth: {
        portal: 'Nevada MMIS/EVS',
        phone: '1-702-242-7878 (SilverSummit)',
        vendor: 'Centene UM, Gainwell Technologies',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: [
        { date: '2026-03-24', type: 'live_refresh', title: 'Weekly KB Refresh', summary: 'SilverSummit/NV Medicaid checked. Major statewide MCO expansion confirmed.' },
        { date: '2026-01-01', type: 'critical_expansion', title: 'NV Medicaid Statewide Managed Care Expansion', summary: 'Effective 01/01/2026: SilverSummit and CareSource now cover ALL 17 NV counties. ~75K FFS members transitioned.' },
        { date: '2026-03-31', type: 'enrollment_deadline', title: 'MCO Choice Period Ends', summary: 'Nevada Medicaid members may change MCO through 03/31/2026. After, locked in until next open enrollment.' }
      ]
    },

    'Alignment Health': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Alignment Health & Clinical Policies',
      clinical: {
        'E/M Services': 'California-focused MA plan. Value-based rates. Check Alignment Health provider portal.',
        'Surgical': 'Prior auth required. Alignment Health UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore or Alignment UM.',
        'Behavioral Health / Psychiatry': 'Carve-out or integrated. Session limits per plan.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation.',
        'Pharmacy / Rx': 'Alignment Health PBM.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Joint replacement: prior auth. Spinal fusion: prior auth.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan. ACCESS On-Demand Interdisciplinary Care (AODIC) model.'
      },
      reimbursement: {
        methodology: 'Value-based contracting. CA MA rates.',
        timely_filing: '90 days',
        modifier_rules: 'Alignment Health-specific.'
      },
      documentation: {
        standards: 'Medical necessity per Alignment Health policies.',
        audit_risk: 'High if prior auth not obtained.'
      },
      priorAuth: {
        portal: 'Alignment Health provider portal',
        phone: 'Varies by plan',
        vendor: 'Alignment Health UM',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: []
    },

    'Carelon': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Carelon & Elevance Health',
      clinical: {
        'E/M Services': 'Carelon is both a UM vendor AND a payer. Behavioral health UM vendor for many plans. Clinical policies vary by plan.',
        'Surgical': 'Prior auth required.',
        'Imaging / Radiology': 'Prior auth required.',
        'Behavioral Health / Psychiatry': 'Carelon Behavioral Health manages BH UM for multiple plans. Session limits per plan.',
        'Pain Management / Injections': 'Prior auth required.',
        'Pharmacy / Rx': 'Plan-specific PBM.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Prior auth required.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan.'
      },
      reimbursement: {
        methodology: 'Plan-specific (Carelon is subsidiary of Elevance Health)',
        timely_filing: 'Plan-specific',
        modifier_rules: 'Plan-specific.'
      },
      documentation: {
        standards: 'Medical necessity per plan and Carelon guidelines.',
        audit_risk: 'High if Carelon BH UM requirements not met.'
      },
      priorAuth: {
        portal: 'Carelon portal',
        phone: 'Plan-specific',
        vendor: 'Carelon (BH UM)',
        commonServices: ['Behavioral health', 'Mental health services'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: []
    },

    'WellMed': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'WellMed & UnitedHealth Group',
      clinical: {
        'E/M Services': 'UHC/Optum subsidiary. TX and FL focused. Senior-focused primary care. Value-based.',
        'Surgical': 'Prior auth required. Optum UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore or Optum UM.',
        'Behavioral Health / Psychiatry': 'Optum Behavioral Health.',
        'Pain Management / Injections': 'Prior auth required.',
        'Pharmacy / Rx': 'OptumRx PBM.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Prior auth required.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan.'
      },
      reimbursement: {
        methodology: 'Value-based. UHC/Optum rates.',
        timely_filing: 'Varies by plan',
        modifier_rules: 'Optum-specific.'
      },
      documentation: {
        standards: 'Medical necessity per WellMed policies.',
        audit_risk: 'High if prior auth not obtained.'
      },
      priorAuth: {
        portal: 'WellMed/Optum provider portal',
        phone: 'Plan-specific',
        vendor: 'Optum UM',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'Plan-specific' }
      },
      alerts: []
    },

    'P3 Health Partners': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'P3 Health Partners & Population Health',
      clinical: {
        'E/M Services': 'Nevada-based population health management. Value-based. Partners with MA plans.',
        'Surgical': 'Prior auth required. Partners with MA payers.',
        'Imaging / Radiology': 'Prior auth required.',
        'Behavioral Health / Psychiatry': 'Population health model. BH integrated.',
        'Pain Management / Injections': 'Prior auth required.',
        'Pharmacy / Rx': 'Partner plan PBM.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Prior auth required.',
        'Gastroenterology': 'Services per partner plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan.'
      },
      reimbursement: {
        methodology: 'Value-based risk-sharing. Partner MA plan rates.',
        timely_filing: 'Partner plan-specific',
        modifier_rules: 'Partner plan-specific.'
      },
      documentation: {
        standards: 'Medical necessity per partner plan.',
        audit_risk: 'High if partner plan requirements not met.'
      },
      stateSpecific: {
        NV: { focus: 'Nevada-based', partners: 'Partners with MA plans' }
      },
      priorAuth: {
        portal: 'Partner plan portal',
        phone: 'Partner plan-specific',
        vendor: 'Partner plan UM',
        commonServices: ['Specialty services', 'Advanced imaging'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'Partner plan-specific' }
      },
      alerts: []
    },

    'Health Plan of Nevada': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Health Plan of Nevada & UnitedHealth Group',
      clinical: {
        'E/M Services': 'UHC subsidiary. Dominant in Las Vegas. Network rates per contract.',
        'Surgical': 'Prior auth required. Optum UM handles.',
        'Imaging / Radiology': 'Prior auth required. eviCore or Optum UM.',
        'Behavioral Health / Psychiatry': 'Optum Behavioral Health.',
        'Pain Management / Injections': 'Prior auth required.',
        'Pharmacy / Rx': 'OptumRx PBM.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Prior auth required.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan.'
      },
      reimbursement: {
        methodology: 'UHC network contracted rates',
        timely_filing: '90 days',
        modifier_rules: 'Optum-specific.'
      },
      documentation: {
        standards: 'Medical necessity per UHC Medical Policies.',
        audit_risk: 'High if prior auth not obtained.'
      },
      stateSpecific: {
        NV: { dominance: 'Dominant in Las Vegas market', affiliates: 'Sierra Health and Life, Sierra Healthcare Options' }
      },
      priorAuth: {
        portal: 'HPN provider portal',
        phone: '1-877-762-6546 (HPN)',
        vendor: 'Optum UM',
        commonServices: ['Advanced imaging', 'Surgical procedures', 'Specialty services'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'May deny without pre-auth' }
      },
      alerts: []
    },

    'Sierra Health and Life': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Sierra Health and Life & HPN',
      clinical: {
        'E/M Services': 'HPN affiliate. Nevada market. PPO products. Network rates per contract.',
        'Surgical': 'Prior auth may be required. HPN UM handles.',
        'Imaging / Radiology': 'Prior auth may be required.',
        'Behavioral Health / Psychiatry': 'Session limits per plan.',
        'Pain Management / Injections': 'Prior auth may be required.',
        'Pharmacy / Rx': 'HPN PBM or contracted PBM.',
        'Cardiology': 'Prior auth may be required.',
        'Orthopedics / Spine': 'Prior auth may be required.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth may be required.',
        'Wound Care': 'Prior auth may be required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan.'
      },
      reimbursement: {
        methodology: 'HPN network contracted rates',
        timely_filing: '90 days',
        modifier_rules: 'HPN-specific.'
      },
      documentation: {
        standards: 'Medical necessity per HPN guidelines.',
        audit_risk: 'High if prior auth not obtained.'
      },
      stateSpecific: {
        NV: { marketFocus: 'Nevada PPO products', parent: 'Health Plan of Nevada' }
      },
      priorAuth: {
        portal: 'HPN provider portal',
        phone: '1-877-762-6546 (HPN)',
        vendor: 'HPN UM',
        commonServices: ['Surgical procedures', 'Advanced imaging'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'Plan-specific' }
      },
      alerts: []
    },

    'Sierra Healthcare Options': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Sierra Healthcare Options & HPN',
      clinical: {
        'E/M Services': 'HPN affiliate. Nevada market. HMO products. Network rates per contract.',
        'Surgical': 'Prior auth required. HPN UM handles.',
        'Imaging / Radiology': 'Prior auth required. HPN UM.',
        'Behavioral Health / Psychiatry': 'Session limits per HMO plan.',
        'Pain Management / Injections': 'Prior auth required.',
        'Pharmacy / Rx': 'HPN PBM or contracted PBM.',
        'Cardiology': 'Prior auth required.',
        'Orthopedics / Spine': 'Prior auth required.',
        'Gastroenterology': 'Services per HMO benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: step therapy.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per HMO plan.'
      },
      reimbursement: {
        methodology: 'HPN HMO network contracted rates',
        timely_filing: '90 days',
        modifier_rules: 'HPN-specific.'
      },
      documentation: {
        standards: 'Medical necessity per HPN HMO guidelines.',
        audit_risk: 'High if prior auth not obtained, out-of-network services not emergency.'
      },
      stateSpecific: {
        NV: { marketFocus: 'Nevada HMO products', parent: 'Health Plan of Nevada' }
      },
      priorAuth: {
        portal: 'HPN provider portal',
        phone: '1-877-762-6546 (HPN)',
        vendor: 'HPN UM',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Specialty referrals'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'HMO members OON may deny' }
      },
      alerts: []
    },

    'Culinary Health Fund': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Culinary Health Fund & Union Trust',
      clinical: {
        'E/M Services': 'Union trust fund (Local 226). Las Vegas hospitality workers. Large self-funded plan. Own network and auth rules.',
        'Surgical': 'Prior auth required. Self-funded plan UM.',
        'Imaging / Radiology': 'Prior auth required. Plan-specific UM.',
        'Behavioral Health / Psychiatry': 'Union plan carve-out. Session limits per union agreement.',
        'Pain Management / Injections': 'Prior auth required.',
        'Pharmacy / Rx': 'Plan-specific formulary and PBM.',
        'Cardiology': 'Prior auth required.',
        'Orthopedics / Spine': 'Prior auth required.',
        'Gastroenterology': 'Services per union plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: prior auth.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per union plan.'
      },
      reimbursement: {
        methodology: 'Self-funded union plan. Custom design. Often Medicare-based repricing.',
        timely_filing: 'Plan-specific',
        modifier_rules: 'Plan-specific.'
      },
      documentation: {
        standards: 'Medical necessity per union plan. Self-funded audit rules.',
        audit_risk: 'High if prior auth not obtained, union member status not verified.'
      },
      stateSpecific: {
        NV: { union: 'Local 226 (Culinary, Hotel & Restaurant Employees)', market: 'Las Vegas hospitality workers' }
      },
      priorAuth: {
        portal: 'Culinary Health Fund portal',
        phone: '1-702-731-1550 (Culinary Health Fund)',
        vendor: 'Plan-specific UM',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'Self-funded plan rules' }
      },
      alerts: []
    },

    'Prominence Health Plan': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Prominence Health Plan & Renown Health',
      clinical: {
        'E/M Services': 'Nevada-based (Reno/northern NV). Affiliated with Renown Health. Hometown Health affiliate. Network rates per contract.',
        'Surgical': 'Prior auth required. Renown-affiliated UM.',
        'Imaging / Radiology': 'Prior auth required. Renown system UM.',
        'Behavioral Health / Psychiatry': 'Carve-out or integrated. Session limits per plan.',
        'Pain Management / Injections': 'Prior auth required.',
        'Pharmacy / Rx': 'Plan-specific PBM.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Prior auth required.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: prior auth.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan.'
      },
      reimbursement: {
        methodology: 'Network contracted rates. Renown-affiliated.',
        timely_filing: '90 days',
        modifier_rules: 'Plan-specific.'
      },
      documentation: {
        standards: 'Medical necessity per Prominence policies.',
        audit_risk: 'High if prior auth not obtained.'
      },
      stateSpecific: {
        NV: { geography: 'Reno and northern Nevada', affiliation: 'Renown Health', network: 'Hometown Health-affiliated' }
      },
      priorAuth: {
        portal: 'Prominence Health Plan portal',
        phone: 'Plan-specific',
        vendor: 'Renown Health UM',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'Plan-specific' }
      },
      alerts: []
    },

    'Select Health': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Select Health & Intermountain Healthcare',
      clinical: {
        'E/M Services': 'Intermountain Health subsidiary. UT and ID. Value-based. Network rates per contract.',
        'Surgical': 'Prior auth required. Intermountain UM handles.',
        'Imaging / Radiology': 'Prior auth required. Intermountain system UM.',
        'Behavioral Health / Psychiatry': 'Intermountain BH integration. Session limits per plan.',
        'Pain Management / Injections': 'Prior auth required. Intermountain conservative care rules.',
        'Pharmacy / Rx': 'Intermountain PBM. SelectHealth formulary.',
        'Cardiology': 'Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Prior auth required. Intermountain clinical guidelines.',
        'Gastroenterology': 'Services per plan benefits.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: prior auth.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Visit limits per plan. Intermountain outcomes focus.'
      },
      reimbursement: {
        methodology: 'Value-based contracting. Intermountain integrated.',
        timely_filing: 'Plan-specific',
        modifier_rules: 'Intermountain-specific.'
      },
      documentation: {
        standards: 'Medical necessity per Intermountain clinical guidelines. Functional outcome documentation.',
        audit_risk: 'High if Intermountain requirements not met.'
      },
      stateSpecific: {
        UT: { market: 'Utah', parent: 'Intermountain Healthcare' },
        ID: { market: 'Idaho', parent: 'Intermountain Healthcare' }
      },
      priorAuth: {
        portal: 'Select Health provider portal',
        phone: 'Plan-specific',
        vendor: 'Intermountain UM',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Specialty services'],
        turnaroundTime: { standard: '3-5 business days', urgent: '24 hours', retrospective: 'Intermountain-specific' }
      },
      alerts: []
    },

    'Intermountain Healthcare': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Intermountain Healthcare & Clinical Guidelines',
      clinical: {
        'E/M Services': 'Utah-based integrated health system. SelectHealth is insurance arm. Risk-based contracts. Value-based care.',
        'Surgical': 'Prior auth required. Intermountain UM handles.',
        'Imaging / Radiology': 'Prior auth required. Intermountain radiology UM.',
        'Behavioral Health / Psychiatry': 'Intermountain BH integrated. Behavioral health centers throughout region.',
        'Pain Management / Injections': 'Prior auth required. Conservative care documentation required.',
        'Pharmacy / Rx': 'Intermountain pharmacy system. SelectHealth formulary.',
        'Cardiology': 'Intermountain cardiology network. Prior auth for advanced testing.',
        'Orthopedics / Spine': 'Intermountain orthopedic network. Prior auth required. Conservative care required.',
        'Gastroenterology': 'Intermountain GI network. Services per clinical guidelines.',
        'Neurology': 'Intermountain neurology network. Prior auth required.',
        'Wound Care': 'Intermountain wound care network. Prior auth required.',
        'Dermatology': 'Intermountain dermatology network. Biologics: prior auth.',
        'Pulmonology': 'Intermountain pulmonology. Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Intermountain PT network. Functional outcome documentation required.'
      },
      reimbursement: {
        methodology: 'Risk-based contracts. Value-based care model. Internal repricing.',
        timely_filing: 'Contract-specific',
        modifier_rules: 'Intermountain-specific.'
      },
      documentation: {
        standards: 'Medical necessity per Intermountain Clinical Guidelines. Functional outcome documentation.',
        audit_risk: 'High if Intermountain guidelines not followed, outcomes not documented.'
      },
      stateSpecific: {
        UT: { headquarters: 'Salt Lake City', networkCoverage: 'Utah and surrounding states' }
      },
      priorAuth: {
        portal: 'Intermountain provider portal',
        phone: 'Varies by division',
        vendor: 'Intermountain UM',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Specialty services'],
        turnaroundTime: { standard: '3-5 business days', urgent: 'Same-day for emergencies', retrospective: 'Contract-specific' }
      },
      alerts: []
    },

    'Banner University': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Banner Health & Banner University Policies',
      clinical: {
        'E/M Services': 'Arizona-based academic health system. Banner Health plans. Limited network.',
        'Surgical': 'Prior auth required. Banner UM handles.',
        'Imaging / Radiology': 'Prior auth required. Banner radiology UM.',
        'Behavioral Health / Psychiatry': 'Banner behavioral health network.',
        'Pain Management / Injections': 'Prior auth required.',
        'Pharmacy / Rx': 'Banner pharmacy system.',
        'Cardiology': 'Banner cardiology network.',
        'Orthopedics / Spine': 'Prior auth required.',
        'Gastroenterology': 'Banner GI network.',
        'Neurology': 'Prior auth required.',
        'Wound Care': 'Prior auth required.',
        'Dermatology': 'Biologics: prior auth.',
        'Pulmonology': 'Sleep study: prior auth.',
        'Physical Therapy / Rehab': 'Banner PT network.'
      },
      reimbursement: {
        methodology: 'Banner network contracted rates',
        timely_filing: 'Banner plan-specific',
        modifier_rules: 'Banner-specific.'
      },
      documentation: {
        standards: 'Medical necessity per Banner policies.',
        audit_risk: 'High if prior auth not obtained.'
      },
      stateSpecific: {
        AZ: { geography: 'Arizona', networkType: 'Limited to Banner facilities and affiliated providers' }
      },
      priorAuth: {
        portal: 'Banner provider portal',
        phone: 'Plan-specific',
        vendor: 'Banner UM',
        commonServices: ['Surgical procedures', 'Advanced imaging', 'Specialty services'],
        turnaroundTime: { standard: '5-10 business days', urgent: '24-48 hours', retrospective: 'Banner plan-specific' }
      },
      alerts: []
    },

    'Kaiser': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'Kaiser Permanente Clinical Policies',
      clinical: {
        'E/M Services': 'Integrated HMO. Closed system. Own physicians/facilities. Kaiser network only.',
        'Surgical': 'Kaiser authorization required. No OON coverage (exceptions: emergency services). Kaiser global periods.',
        'Imaging / Radiology': 'Kaiser authorization required. No OON imaging. Kaiser radiology UM.',
        'Behavioral Health / Psychiatry': 'Integrated into Kaiser system. No carve-out. Kaiser mental health centers.',
        'Pain Management / Injections': 'Kaiser authorization required. Kaiser pain management programs.',
        'Pharmacy / Rx': 'Kaiser pharmacy only. Integrated formulary.',
        'Cardiology': 'Kaiser cardiology. Authorization required.',
        'Orthopedics / Spine': 'Kaiser orthopedics. Authorization required.',
        'Gastroenterology': 'Kaiser GI. Authorization required.',
        'Neurology': 'Kaiser neurology. Authorization required.',
        'Wound Care': 'Kaiser wound care. Authorization required.',
        'Dermatology': 'Kaiser dermatology. Biologics: Kaiser authorization.',
        'Pulmonology': 'Kaiser pulmonology. Sleep study: Kaiser authorization.',
        'Physical Therapy / Rehab': 'Kaiser PT/OT/SLP. No OON PT (exceptions: emergency). Kaiser outcomes focus.'
      },
      reimbursement: {
        methodology: 'Closed integrated system. Internal cost-based allocation.',
        timely_filing: 'Kaiser claims rules apply (typically 90 days)',
        modifier_rules: 'Kaiser-specific. No -50 modifier (bilateral).',
        note: 'Non-negotiable: Kaiser is self-contained. Out-of-network coverage not available except emergencies.'
      },
      documentation: {
        standards: 'Kaiser documentation standards. EHR-based.',
        audit_risk: 'High if OON services provided without emergency authorization.'
      },
      stateSpecific: {
        CA: { region: 'California - largest Kaiser presence' },
        CO: { region: 'Colorado' },
        GA: { region: 'Georgia' },
        HI: { region: 'Hawaii' },
        MD: { region: 'Maryland' },
        DC: { region: 'Washington DC' },
        VA: { region: 'Virginia' },
        WA: { region: 'Washington' },
        OR: { region: 'Oregon' }
      },
      priorAuth: {
        portal: 'Kaiser provider portal (varies by region)',
        phone: 'Regional Kaiser number',
        vendor: 'Kaiser internal UM',
        commonServices: ['All services require Kaiser authorization'],
        turnaroundTime: { standard: 'Varies (often same-day for routine)', urgent: 'Emergencies covered, no pre-auth needed', retrospective: 'Post-emergency review' },
        criticalNote: 'NO out-of-network coverage except emergencies.'
      },
      alerts: []
    },

    'MultiPlan': {
      lastUpdated: '2026-03-24T20:00:00Z',
      source: 'MultiPlan & Network Partners',
      clinical: {
        'E/M Services': 'Network rental/wrap. Not a payer — facilitates OON repricing and network access.',
        'Surgical': 'MultiPlan repricing via PHCS, Data iSight, or MultiPlan networks.',
        'Imaging / Radiology': 'OON repricing via MultiPlan networks.',
        'Behavioral Health / Psychiatry': 'OON repricing via MultiPlan networks.',
        'Pain Management / Injections': 'OON repricing via MultiPlan networks.',
        'Pharmacy / Rx': 'Not covered by MultiPlan (pharmacy is plan-specific).',
        'Cardiology': 'OON repricing via MultiPlan networks.',
        'Orthopedics / Spine': 'OON repricing via MultiPlan networks.',
        'Gastroenterology': 'OON repricing via MultiPlan networks.',
        'Neurology': 'OON repricing via MultiPlan networks.',
        'Wound Care': 'OON repricing via MultiPlan networks.',
        'Dermatology': 'OON repricing via MultiPlan networks.',
        'Pulmonology': 'OON repricing via MultiPlan networks.',
        'Physical Therapy / Rehab': 'OON repricing via MultiPlan networks.'
      },
      reimbursement: {
        methodology: 'Network rental/wrap. PHCS (PhyMatrix), Data iSight (Equifax), or MultiPlan networks used for OON repricing.',
        timely_filing: 'Primary plan timely filing applies (MultiPlan facilitates only)',
        modifier_rules: 'Primary plan rules apply.'
      },
      documentation: {
        standards: 'Primary plan standards apply.',
        audit_risk: 'High if MultiPlan repricing rules not applied correctly.'
      },
      priorAuth: {
        note: 'MultiPlan does NOT require prior auth. Primary plan prior auth applies. MultiPlan facilitates repricing only.',
        networks: ['PHCS (PhyMatrix)', 'Data iSight (Equifax)', 'MultiPlan Networks'],
        criticalNote: 'MultiPlan is a network wrap/repricing vendor, not a payer. Verify primary plan requirements.'
      },
      alerts: []
    }
  }
};
