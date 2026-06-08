---
layout: '../layouts/Layout.astro'
title: 'IT Updates'
---

<Layout>

<div class="it-updates-container">

# IT Updates

## System Changes

<h3 id="dragon-toolbar-removal">2026-06 Dragon Medical One: Toolbar Icon Removal</h3>

**Date:** June 1, 2026

### Critical Dragon Toolbar Launch Issue Impacting Clinical Documentation Workflow.

We have identified a significant issue when Dragon Medical One is launched from the Dragon icon within the PowerChart toolbar. When using a handheld microphone, all dictation is directed into the Dragon Dictation Box instead of directly into PowerChart documentation fields.

This causes providers to manually move dictated text into the appropriate note sections, resulting in:

- Major workflow disruptions
- Delays in documentation completion
- Delays in patient care rounds
- Increased provider frustration
- Increased risk of documentation errors or omissions

Exiting and relaunching Dragon from the PowerChart toolbar does not resolve the issue.

### Resolution

Oracle has acknowledged this issue and recommends launching Dragon only from:

- The desktop PowerChart with Dragon icon, or
- The 1Chart storefront login page

**We will be removing the Dragon icon from the PowerChart and First Net toolbars** to prevent use of the unsupported launch method and reduce ongoing provider workflow disruption.

<div style="display: flex; justify-content: center; gap: 2em; margin: 2em 0; flex-wrap: wrap;">
 <div style="text-align: center;">
    <img src="/images/dragon-icon-changes/dragon-toolbar.png" alt="Dragon Icon in Toolbar" style="max-width: 500px; margin-bottom: 1em;" />
  </div>
  </div>

### Recommended Launch Methods

Please use the icons below to launch Dragon along with PowerChart or FirstNet:

<div style="display: flex; justify-content: center; gap: 2em; margin: 2em 0; flex-wrap: wrap;">
  <div style="text-align: center;">
    <img src="/images/dragon-icon-changes/dragon-icon-pc.png" alt="PowerChart With Dragon P714" style="max-width: 150px; margin-bottom: 1em;" />
    <p><strong>PowerChart With Dragon</strong></p>
  </div>
  <div style="text-align: center;">
    <img src="/images/dragon-icon-changes/dragon-icon-fn.png" alt="FirstNet With Dragon P714" style="max-width: 150px; margin-bottom: 1em;" />
    <p><strong>FirstNet With Dragon</strong></p>
  </div>
</div>

## New Tools

<h3 id="medication-reconciliation-status">2026-05 Provider Handoff: Medication Reconciliation Status Column</h3>

**Date:** May 22, 2026

A new **Medication Reconciliation Status** column has been added to the Provider Handoff. This update helps ensure timely and prompt tracking of medication history completion to support efficient admission reconciliation of the patient's home medications and improve patient safety.

<div style="width: 100%; height: 600px; border: 1px solid #ccc; border-radius: 4px; overflow: hidden;">
  <iframe src="/files/MedicationReconciliationStatusColumn.pdf#toolbar=0" width="100%" height="100%" style="border: none;"></iframe>
</div>

---

<h3 id="cell-service-update">2026-05 Cellular Service Update</h3>

**Date:** May 20, 2026

### Our 6-Month Cellular Infrastructure Upgrade

We are all familiar with the frustration of dropped calls and poor cell signals in the hospital. Communication bottlenecks directly affect care efficiency.
To address this, our IT staff and specialized contractors have launched a comprehensive 6-month upgrade to our hospital's Distributed Antenna System (DAS)—the internal network that amplifies and distributes cellular signals throughout our facilities.

### Why Is Our Signal Weak?

Parts of our current cellular infrastructure date back to 2003. This legacy equipment creates massive electronic "noise" and feedback. To protect their wider networks, major cellular carriers (like Verizon and AT&T) are forced to reduce the data bandwidth they send to our building.
The result? Even when your phone shows full "bars," your actual data speeds can be incredibly slow.

### The Upgrade Plan

We are systematically replacing the entire system from the ground up by installing certified PIM-rated cables and antennas, along with stronger 2-Watt remote boosters. This upgrade will eliminate the electronic noise leaks that choke our system, allowing carriers to safely open up full, unrestricted data bandwidth to our devices.

- **Zero-Downtime Migration:** We are building a temporary "extra sector" network parallel to the old one. As each zone is completed, we seamlessly migrate users without disrupting active cellular coverage.
- **Clinical Areas First:** We are prioritizing our highest-acuity zones. **_Work has begun on the entire first floor of Main, including the cafeteria and the entire OR area. Improved signals are expected by mid-June._** The next major phase will tackle the Emergency Department, followed by the patient towers.

This critical infrastructure cure will ensure the fast, reliable 5G connectivity required for a modern clinical workflow. I appreciate your patience as we complete these essential upgrades.

### The Fix at a Glance

<img src="/images/DAS-image.jpeg" alt="DAS System Upgrade" style="max-width: 600px; margin: 1.5em auto; display: block;" />

</div>

</Layout>

<style>
.it-updates-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2em;
}

</style>

<style>
h1, h2, h3, h4 {
    padding: 0.5em 0;
}

h2 {
    margin-top: 2em;
    padding-top: 1em;
    border-top: 2px solid #ddd;
}

h3 {
    color: #333;
    font-size: 1.1em;
}

h4 {
    font-size: 0.95em;
    color: #666;
}

p {
    padding: 0 0 0.5em 0;
    line-height: 1.6;
}

ul {
    padding: 0 0 1em 2em;
}

li {
    margin-bottom: 0.5em;
}

hr {
    margin: 2em 0;
    border: none;
    border-top: 1px solid #ddd;
}
</style>
