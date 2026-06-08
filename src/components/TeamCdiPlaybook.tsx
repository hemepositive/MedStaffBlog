import { useState } from 'react';

const mccs = [
  {
    name: 'Acute Kidney Injury (AKI)',
    icd: 'N17.9 (MCC)',
    trigger:
      'Creatinine rise ≥ 0.3 mg/dL above preoperative baseline, or ≥ 1.5x baseline within 7 days.',
    instead: 'Creatinine was elevated postoperatively, now improving',
    write: 'Acute kidney injury, likely prerenal, resolving with IV hydration',
  },
  {
    name: 'Acute Systolic Heart Failure',
    icd: 'I50.21 / I50.23 (MCC)',
    trigger:
      'BNP > 500, bilateral crackles, pulmonary edema on chest X-ray, IV diuresis initiated.',
    instead: 'Congestive heart failure, managed with Lasix',
    write: 'Acute systolic heart failure exacerbation, EF 35%, treated with IV furosemide',
  },
  {
    name: 'Metabolic Encephalopathy',
    icd: 'G93.41 (MCC)',
    trigger:
      'CAM-positive assessment, confusion new from baseline, concurrent metabolic abnormality.',
    instead: 'Patient is delirious postoperatively',
    write:
      'Metabolic encephalopathy secondary to hyponatremia (Na 128) — patient disoriented, CAM-positive, not at baseline per family',
  },
  {
    name: 'Severe Protein-Calorie Malnutrition',
    icd: 'E43 (MCC)',
    trigger:
      'Albumin < 2.0, BMI < 18.5, >10% body weight loss, muscle wasting, dietitian consult documenting ASPEN criteria.',
    instead: 'Albumin low, nutrition consult placed',
    write:
      'Severe protein-calorie malnutrition — meets ASPEN criteria: albumin 1.8, 12-lb weight loss over 2 months, temporal muscle wasting on exam',
  },
  {
    name: 'Obesity Hypoventilation Syndrome (OHS)',
    icd: 'E66.2 (MCC)',
    trigger:
      'BMI > 30 + BiPAP use (especially daytime) + ABG showing PaCO2 > 45 mmHg.',
    instead: 'Obstructive sleep apnea, patient on home CPAP',
    write: 'Obesity hypoventilation syndrome — BMI 44, BiPAP-dependent, prior ABG with PaCO2 52',
  },
];

const ccs = [
  ['Morbid obesity', 'E66.01', 'Must document "morbid obesity" — BMI code alone is not enough; also HCC 48'],
  ['Obstructive sleep apnea', 'G47.33', 'Screen for OHS (E66.2, MCC) if patient uses BiPAP'],
  ['Type 2 diabetes with hyperglycemia', 'E11.65', 'Specify type and complication'],
  ['Chronic kidney disease, stage 3', 'N18.3', 'Always stage it — N18.9 is not a CC'],
  ['Longstanding persistent atrial fibrillation', 'I48.11', 'Unspecified Afib (I48.91) is NOT a CC'],
  ['COPD with acute exacerbation', 'J44.1', 'Must document "exacerbation"'],
  ['Acute posthemorrhagic anemia', 'D62', 'Document when Hgb drops > 2 g/dL with transfusion'],
  ['Hyponatremia', 'E87.1', '"Low sodium" is a lab value, not a diagnosis'],
];

const checklist = [
  'Obesity — BMI ≥ 40? Document "morbid obesity" explicitly (HCC 48, raises SOI)',
  'Creatinine — rose ≥ 0.3 mg/dL above baseline? Name it as acute kidney injury',
  'Mental status — confusion with a metabolic cause? Document metabolic encephalopathy, not delirium',
  'Heart failure — BNP elevation or diuresis? Specify systolic vs. diastolic, acute vs. chronic',
  'Respiratory — BiPAP use with hypercapnia? Consider OHS rather than OSA alone',
  'Nutrition — dietitian documented malnutrition? Acknowledge it and specify severity',
  'Diabetes — typed (1 vs 2) with a named complication, not "diabetes mellitus" alone',
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: '#00833d',
        color: '#fff',
        borderRadius: '999px',
        padding: '2px 12px',
        fontSize: '0.8rem',
        fontWeight: 600,
        marginRight: 8,
      }}
    >
      {children}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ borderBottom: '2px solid #00833d', paddingBottom: 6, marginBottom: 16 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function TeamCdiPlaybook() {
  const [tab, setTab] = useState<'module' | 'reference'>('module');

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px', color: '#333' }}>
      <header style={{ marginBottom: 24 }}>
        <Pill>TEAM Surgical Episode</Pill>
        <Pill>MS-DRG 469 / 470</Pill>
        <h1 style={{ marginTop: 16, marginBottom: 8 }}>
          Lower Extremity Joint Replacement (LEJR)
        </h1>
        <p>
          Total and partial hip and knee replacements are the highest-volume TEAM
          procedures. Your documentation on every LEJR case sets the target price the
          hospital is measured against — and determines whether the base payment
          reflects what the patient actually cost to care for.
        </p>
      </header>

      <div style={{ marginBottom: 24, borderBottom: '1px solid #ccc' }}>
        {(['module', 'reference'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              border: 'none',
              background: 'none',
              padding: '10px 20px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: tab === key ? '#00833d' : '#888',
              borderBottom: tab === key ? '3px solid #00833d' : '3px solid transparent',
            }}
          >
            {key === 'module' ? 'Learning Module' : 'Quick Reference Card'}
          </button>
        ))}
      </div>

      {tab === 'module' ? (
        <>
          <div
            style={{
              background: '#fff3cd',
              border: '1px solid #ffe08a',
              borderRadius: 8,
              padding: 16,
              marginBottom: 32,
            }}
          >
            <strong>LEJR is a 2-tier DRG. A CC alone does not change the payment.</strong>
            <p style={{ margin: '8px 0 0' }}>
              Every secondary diagnosis is either an MCC — which moves the case from DRG
              470 to DRG 469 (≈ $9,000 difference) — or it has zero effect on
              reimbursement. Evaluate every CDI query for MCC potential first.
            </p>
          </div>

          <Section title="Top MCCs to Document">
            {mccs.map((m) => (
              <div
                key={m.name}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <h3 style={{ marginBottom: 4 }}>{m.name}</h3>
                <p style={{ margin: '0 0 8px', color: '#666', fontSize: '0.9rem' }}>{m.icd}</p>
                <p>
                  <strong>Clinical trigger:</strong> {m.trigger}
                </p>
                <p style={{ color: '#a33', margin: '8px 0 2px' }}>✗ "{m.instead}"</p>
                <p style={{ color: '#1a7d3a', margin: 0 }}>✓ "{m.write}"</p>
              </div>
            ))}
          </Section>

          <Section title="Before & After: The Discharge Note That Cost $9,000">
            <p>
              74-year-old male, elective right total knee arthroplasty. History of
              hypertension, type 2 diabetes, CKD stage 3 (baseline creatinine 1.4). On
              POD 2, creatinine rises to 2.3, nephrology consulted, improves to 1.8 at
              discharge.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
              <div style={{ flex: '1 1 320px', background: '#fdecec', borderRadius: 8, padding: 16 }}>
                <strong>As written — DRG 470 (~$14,500)</strong>
                <p style={{ marginTop: 8 }}>
                  "Elevated creatinine, improving" — not a billable diagnosis. The coder
                  cannot assign N17.9. No MCC. DRG stays at 470.
                </p>
              </div>
              <div style={{ flex: '1 1 320px', background: '#e8f7ee', borderRadius: 8, padding: 16 }}>
                <strong>Revised — DRG 469 (~$23,500), +$9,000</strong>
                <p style={{ marginTop: 8 }}>
                  "Acute kidney injury (AKI), resolving — baseline creatinine 1.4, peak
                  2.3, treated with IV fluids, improved to 1.8." Codeable as N17.9 (MCC).
                  DRG moves to 469.
                </p>
              </div>
            </div>
          </Section>

          <Section title="Common CCs — Document for SOI/ROM, Not Payment">
            <p>
              CCs do not move the LEJR DRG, but they affect APR-DRG Severity of Illness,
              Risk of Mortality, and the TEAM risk-adjusted target price.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #00833d' }}>
                  <th style={{ padding: 8 }}>Condition</th>
                  <th style={{ padding: 8 }}>ICD-10</th>
                  <th style={{ padding: 8 }}>What to specify</th>
                </tr>
              </thead>
              <tbody>
                {ccs.map(([name, icd, note]) => (
                  <tr key={name} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{name}</td>
                    <td style={{ padding: 8, color: '#666' }}>{icd}</td>
                    <td style={{ padding: 8 }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Before You Sign the Discharge Summary">
            <ul style={{ paddingLeft: 20 }}>
              {checklist.map((item) => (
                <li key={item} style={{ marginBottom: 8 }}>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </>
      ) : (
        <>
          <div
            style={{
              background: '#eef5ff',
              border: '1px solid #cfe0fa',
              borderRadius: 8,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <strong>DRGs:</strong> 469 (with MCC) · 470 (without CC/MCC) · 521 / 522 (hip fracture)
            <br />
            <strong>Tier structure:</strong> 2-tier — only MCCs move payment. CCs affect
            SOI/ROM only.
            <br />
            <strong>Payment delta MCC → base:</strong> ~$4,500–$6,000 per case
          </div>

          <Section title="Top 5 MCCs — Highest Payment Impact">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Acute Kidney Injury (any stage)', 'N17.0–N17.9', 'Creatinine rises documented as lab values, not diagnoses'],
                  ['Acute Systolic or Diastolic Heart Failure', 'I50.21 / I50.23 / I50.31 / I50.33', '"CHF" written instead — not codeable as MCC'],
                  ['Metabolic or Toxic Encephalopathy', 'G93.41 / G92.9', '"Confusion" or "AMS" used instead'],
                  ['Severe Protein-Calorie Malnutrition', 'E43', 'Dietitian documents it; physician never does'],
                  ['Obesity Hypoventilation Syndrome', 'E66.2', '"Morbid obesity" or "OSA" written instead'],
                ].map(([name, icd, miss]) => (
                  <tr key={name} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{name}</td>
                    <td style={{ padding: 8, color: '#666', whiteSpace: 'nowrap' }}>{icd}</td>
                    <td style={{ padding: 8 }}>{miss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Exact Phrasing Examples">
            {[
              ['AKI', 'Creatinine 2.4, slightly elevated, monitoring.', 'Acute kidney injury, stage 2 by KDIGO criteria, likely prerenal. Managed with IV fluid resuscitation, nephrology consulted.'],
              ['Heart failure', 'CHF — continue home diuretics.', 'Acute on chronic systolic heart failure (EF 35%). IV Lasix given with 2L net negative output.'],
              ['Encephalopathy', 'Patient confused postop, likely multifactorial.', 'Metabolic encephalopathy secondary to uremia and electrolyte disturbance. CAM positive.'],
              ['Malnutrition', 'Poor appetite, dietary consult placed.', 'Moderate protein-calorie malnutrition per ASPEN clinical criteria — significant weight loss, reduced intake, muscle wasting.'],
              ['OHS', 'Morbid obesity, on CPAP at home.', 'Obesity hypoventilation syndrome (BMI 44, home BiPAP, baseline pCO2 elevated).'],
            ].map(([label, instead, write]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <strong>{label}</strong>
                <p style={{ color: '#a33', margin: '4px 0 2px' }}>Instead of: "{instead}"</p>
                <p style={{ color: '#1a7d3a', margin: 0 }}>Write: "{write}"</p>
              </div>
            ))}
          </Section>

          <Section title="Discharge Documentation Checklist">
            <ul style={{ paddingLeft: 20 }}>
              {[
                'AKI — creatinine rose ≥0.3 mg/dL or ≥1.5x baseline: document with stage and etiology',
                'Heart failure — IV diuresis or elevated BNP: specify systolic vs. diastolic, acute vs. chronic',
                'Encephalopathy — CAM positive or altered baseline cognition: name type and etiology',
                'Malnutrition — nutrition consult or supplemental nutrition: document severity as physician diagnosis',
                'OHS — home BiPAP or known hypercapnia: document OHS explicitly, not just "morbid obesity"',
                'Diabetes — specify type and complication',
                'Anemia — transfusion given or significant Hgb drop: document acute blood loss anemia (D62)',
                'Atrial fibrillation — document type (paroxysmal, persistent, long-standing persistent)',
                'POA status — confirm all secondary diagnoses reflect present-on-admission status',
              ].map((item) => (
                <li key={item} style={{ marginBottom: 8 }}>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}

      <footer style={{ borderTop: '1px solid #ddd', paddingTop: 16, fontSize: '0.85rem', color: '#777' }}>
        Source: CMS FY2025/FY2026 IPPS Final Rule · MS-DRG V43.0 · ICD-10-CM FY2025. Payment
        figures are national average approximations. CC/MCC designations change annually.
      </footer>
    </div>
  );
}
