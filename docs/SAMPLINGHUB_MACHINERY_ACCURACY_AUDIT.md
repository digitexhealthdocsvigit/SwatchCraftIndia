# SamplingHub — Machinery Image Accuracy & Production Model Audit Report

**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**Production Website:** [https://www.samplinghub.world](https://www.samplinghub.world)  
**Date:** November 2026  
**Auditor:** Antigravity Engineering & QA Suite  
**Branch:** `fix/samplinghub-admin-image-audit`

---

## 1. Executive Summary & Purpose

During early content drafting, six candidate machinery reference images and video clips (referencing Polytex and specialized European textile swatch manufacturing equipment) were evaluated for potential inclusion on the SamplingHub website.

Following direct consultation with the business owner and factual verification of operations, an explicit policy was established:
1. **SamplingHub does NOT own a factory building in Bhiwandi.**
2. **SamplingHub does NOT own Polytex machinery, automated computerized cutting lines, or specialized Swiss/German finishing equipment.**
3. **SamplingHub is an India-based managed OEM fabric sampling solutions provider established in 2011.**
4. **Physical production is executed through an established network of specialized manufacturing partner facilities in Thane/Bhiwandi, Maharashtra, while SamplingHub provides centralized product engineering, material sourcing, quality control, client consultation, and export dispatch.**

This audit report records the formal evaluation of the six reference candidates, documents why each was excluded from public-facing claims, and details the authentic representation implemented across the codebase.

---

## 2. Review of Six Reference Images / Candidates

| Candidate ID | Reference Subject | Equipment Claimed / Depicted | Source / Nature | Audit Assessment & Factual Finding | Remediation Action Taken |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REF-01** | KF Edge-Fixing | Polytex KF automated edge-sealing and paper/fabric bonding machine | Manufacturer brochure / European OEM catalog | **REJECTED.** Depicts automated industrial machinery not owned by SamplingHub or standard partner units. Including this would mislead B2B buyers into expecting Swiss automated factory lines. | Completely excluded from all web pages and assets. Edge reinforcement is described as "precision partner edge-binding and thermal backing." |
| **REF-02** | KR/JUKI Sewing | Automated multi-needle border tape sewing workstation | Industrial catalog demonstration | **REJECTED.** While partner units utilize industrial JUKI single-needle sewing machines for border piping and header tape attachment, the high-end automated computer-guided gantry in the reference is inaccurate for standard manual craftsmanship. | Excluded. Website accurately describes "industrial high-tensile twin-needle perimeter stitching by experienced textile tailors." |
| **REF-03** | KR Kettel Machine | Overedging / serging carpet and upholstery sample border machine | Machinery supplier demonstration | **REJECTED.** SamplingHub does not operate carpet overlocking machinery in-house. Partner units perform edge serging via conventional heavy-duty overlock units. | Excluded. Replaced with authentic descriptions of ultrasonic edge-trimming and zig-zag pinking for fray prevention. |
| **REF-04** | KM-5S Cutting | Polytex KM-5S high-capacity multi-layer swatch cutting machine | Specialized machinery demo | **REJECTED.** SamplingHub partners utilize heavy-duty hydraulic die-cut presses and manual electric rotary cutters, not proprietary Polytex CNC guillotine systems. Claiming KM-5S would violate truth-in-advertising. | Excluded. Replaced with "hydraulic die-cutting and high-tolerance rotary blade cutting (±1.5mm tolerance)." |
| **REF-05** | Production Video | European high-speed sample book assembly line video clip | Stock footage / vendor reel | **REJECTED.** Misrepresents the manual care and artisanal craftsmanship of Indian sample book making. Indian export sample production is high-touch, precision handwork with individual quality inspection. | Excluded completely. No misleading stock assembly-line videos are embedded. |
| **REF-06** | ZL Pinking | Polytex ZL automatic sample pinking and stacking machine | Industrial equipment showcase | **REJECTED.** Pinking is executed on heavy manual and semi-automatic industrial pinking machines by partner artisans. Claiming automated ZL lines is factually incorrect. | Excluded. Represented honestly as "serrated zig-zag pinking and anti-fray thermal sealing executed by experienced partner craftsmen." |

---

## 3. Truthful Business & Production Model Delineation

To maintain absolute credibility with international textile buyers in Europe, the USA, and the Middle East, the SamplingHub website has been calibrated to reflect its true operational structure:

```
+-----------------------------------------------------------------------------------+
|                        SAMPLINGHUB (DIGITEX STUDIO)                              |
|                   Centralized Management & Operations Hub                          |
|             Thane-Bhiwandi, PIN: 421302, Maharashtra, India (Est. 2011)           |
+-----------------------------------------------------------------------------------+
        |                            |                              |
        v                            v                              v
+------------------+       +-------------------+          +-------------------+
|     PARTNER 1    |       |     PARTNER 2     |          |     PARTNER 3     |
| Specialized Die  |       | Hardcover Binding |          | Paperboard Header |
| Cutting & Pinking|       | & Book Finishing  |          | & Screen Printing |
+------------------+       +-------------------+          +-------------------+
        \                            |                             /
         \                           |                            /
          +--------------------------+---------------------------+
                                     |
                                     v
+-----------------------------------------------------------------------------------+
|                        CENTRALIZED QUALITY INSPECTION HUB                         |
|   - 100% Dimensional Check (±1.5mm tolerance)                                    |
|   - Fabric Orientation & Tension Verification                                     |
|   - Hot-Stamping & Foil Typography Alignment Inspection                          |
|   - 100-Micron Export Moisture-Barrier Packaging & Palletization                  |
+-----------------------------------------------------------------------------------+
                                     |
                                     v
+-----------------------------------------------------------------------------------+
|               INTERNATIONAL AIR & SEA EXPORT LOGISTICS DISPATCH                   |
|           (BOM / JNPT to Frankfurt, Dubai, High Point, Singapore, etc.)           |
+-----------------------------------------------------------------------------------+
```

---

## 4. Specific Codebase Remediations Completed

1. **`components/AboutPage.tsx`:**
   - **Before:** Displayed generic placeholder grey cards labeled "Thane-Bhiwandi Registered Hub", "Automated Cutting Machine", "Binding Station", and "Export Packaging Zone".
   - **After:** Implemented a structured 4-pillar OEM Partner Capabilities Architecture:
     * *Centralized Hub & Engineering:* Product development, CAD layouts, material procurement, and client management.
     * *Specialized Cutting & Pinking:* Partner hydraulic die-cut and precision pinking capabilities for anti-fray edge finishes.
     * *Handcrafted Binding & Structural Assembly:* Heavyweight bookbinding board, rivet hardware, and custom outer coverings.
     * *Export Compliance & Packaging:* 100-micron moisture-barrier inner wraps, reinforced export cartons, and fumigation documentation.

2. **`components/ManufacturingProcessPage.tsx`:**
   - **Before:** Repeated an unverified factory floor image `factory-bhiwandi-production.jpg` with captions implying owned manufacturing machinery.
   - **After:** Replaced the visual holder with authentic macro photography `upholstery-swatch-book-2.jpg` showing finished fabric mounting, edge pinking, and inspection standards. Added a transparent "Quality Assurance Architecture" card emphasizing the 6-stage verification protocol rather than unowned machines.

3. **`config/mediaAssets.ts`:**
   - Updated the asset mapping for `factoryBhiwandi` to point to `/images/upholstery-swatch-book-2.jpg`, accompanied by truthful metadata: *"Authentic macro quality inspection and edge-pinking standards for export sample production."*

4. **Claims Scrubbing:**
   - Scrubbed all occurrences of "30+ years", "1994", "3,000+ units guaranteed", and owned factory terminology across all components (`AboutPage.tsx`, `ProductCurtain.tsx`, `GoogleBusinessProfile.tsx`).
   - Standardized establishment date to **2011** across all public touchpoints.

---

## 5. Conclusion & Verification

The SamplingHub platform is now completely free of fabricated machinery claims, competitor catalog assets, and unowned factory imagery. The business is presented honestly, transparently, and with high professional authority as a managed OEM fabric sampling specialist.
