#!/usr/bin/env python3
"""
Production Scope & Formal Estimate Generator
Atelier Men's Grooming — Bespoke Editorial Barbershop & Booking Platform
Client: Barbershop Owner (Auburn, Alabama, US) | Freelancer.com Project ID: 40712578
Built to exact BarakahSoft Gold-Standard Architecture:
- Exactly 1 Single Letter Page (8.5 x 11 in)
- 6 Direct Flex Children (Zero Middle Void)
- Phase 0 ($0 Delivered) + 4 Structured Milestones totaling $650.00
- Verified Credentials: Principal Systems Architect (12+ Yrs Exp)
- Inlined Base64 Assets and Headless Chrome Single-Page PDF Audit
"""

import os
import base64
import subprocess
import sys

def build_estimate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.abspath(os.path.join(current_dir, ".."))
    docs_dir = os.path.join(project_dir, "docs")
    html_path = os.path.join(docs_dir, "estimate.html")
    pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

    headshot_file = os.path.join(docs_dir, "headshot.jpeg")
    logo_file = os.path.join(docs_dir, "logo.png")

    headshot_b64 = ""
    if os.path.exists(headshot_file):
        with open(headshot_file, "rb") as f:
            headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

    logo_b64 = ""
    if os.path.exists(logo_file):
        with open(logo_file, "rb") as f:
            logo_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope &amp; Formal Estimate - Atelier Men's Grooming</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 5mm 7mm 5mm 7mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 8.5pt;
      line-height: 1.25;
      color: #0f172a;
      background: #ffffff;
      height: 100%;
      overflow: hidden;
    }}
    .page-container {{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }}

    /* Top Accent Stripe */
    .brand-stripe {{
      height: 3px;
      background: linear-gradient(90deg, #b48608, #d4af37, #0c0d10);
      border-radius: 2px;
      margin-bottom: 4px;
    }}

    /* Child 1: Header */
    .header-card {{
      background: #fcfbf9;
      border: 1px solid #e8e3d9;
      border-radius: 6px;
      padding: 6px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .header-left {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .logo-img {{
      height: 26px;
      width: auto;
      object-fit: contain;
    }}
    .doc-title {{
      font-size: 11pt;
      font-weight: 800;
      color: #0c0d10;
      letter-spacing: -0.2px;
    }}
    .doc-sub {{
      font-size: 7.5pt;
      color: #78716c;
      font-family: monospace;
    }}
    .header-right {{
      text-align: right;
      font-size: 7.5pt;
      color: #44403c;
      line-height: 1.3;
    }}
    .badge-live {{
      display: inline-block;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      border-radius: 4px;
      padding: 1px 5px;
      font-weight: 700;
      font-size: 7pt;
      font-family: monospace;
      margin-bottom: 2px;
    }}

    /* Child 2: Executive Summary / Hook */
    .summary-card {{
      background: #fbf9f5;
      border: 1px solid #e7dfd0;
      border-left: 3px solid #b48608;
      border-radius: 5px;
      padding: 5px 9px;
    }}
    .summary-title {{
      font-size: 8pt;
      font-weight: 800;
      color: #0c0d10;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 2px;
    }}
    .summary-text {{
      font-size: 7.8pt;
      color: #44403c;
      line-height: 1.25;
    }}

    /* Child 3: Scope Table */
    .table-container {{
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 7.6pt;
    }}
    th {{
      background: #0c0d10;
      color: #ffffff;
      font-weight: 700;
      text-align: left;
      padding: 4px 7px;
      font-size: 7pt;
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }}
    td {{
      padding: 4px 7px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
    }}
    tr:nth-child(even) td {{
      background: #fcfbf9;
    }}
    .phase-badge {{
      font-family: monospace;
      font-weight: 700;
      font-size: 6.8pt;
      padding: 1px 4px;
      border-radius: 3px;
    }}
    .badge-done {{
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
    }}
    .badge-pending {{
      background: #f8fafc;
      color: #334155;
      border: 1px solid #cbd5e1;
    }}
    .total-row td {{
      background: #f8fafc !important;
      font-weight: 800;
      border-top: 1.5px solid #0c0d10;
      border-bottom: none;
      font-size: 8pt;
    }}

    /* Child 4: Architecture & Highlights */
    .arch-card {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 5px 8px;
    }}
    .arch-title {{
      font-size: 7.5pt;
      font-weight: 800;
      color: #0c0d10;
      text-transform: uppercase;
      margin-bottom: 3px;
    }}
    .arch-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }}
    .arch-item {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 3px 6px;
      text-align: center;
    }}
    .arch-label {{
      font-size: 6.5pt;
      color: #64748b;
      text-transform: uppercase;
      font-family: monospace;
    }}
    .arch-val {{
      font-size: 7.8pt;
      font-weight: 700;
      color: #0f172a;
    }}

    /* Child 5: Terms & SLA */
    .terms-card {{
      background: #fcfbf9;
      border: 1px solid #e7dfd0;
      border-radius: 5px;
      padding: 4px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #44403c;
    }}
    .terms-item {{
      display: flex;
      align-items: center;
      gap: 4px;
    }}
    .check-icon {{
      color: #059669;
      font-weight: 900;
    }}

    /* Child 6: Dual Signatures & Verification */
    .sig-container {{
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .contractor-side {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .headshot {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1.5px solid #b48608;
      object-fit: cover;
    }}
    .contractor-meta {{
      line-height: 1.25;
    }}
    .contractor-name {{
      font-weight: 800;
      font-size: 8pt;
      color: #0f172a;
    }}
    .contractor-title {{
      font-size: 7pt;
      color: #475569;
    }}
    .contractor-cred {{
      font-size: 6.5pt;
      color: #b48608;
      font-weight: 700;
      font-family: monospace;
    }}
    .client-side {{
      text-align: right;
      line-height: 1.25;
    }}
    .sig-line {{
      border-top: 1px solid #94a3b8;
      width: 140px;
      margin-top: 10px;
      margin-bottom: 2px;
    }}
    .client-label {{
      font-size: 6.8pt;
      color: #64748b;
      font-family: monospace;
    }}
  </style>
</head>
<body>
  <div class="page-container">
    <div>
      <div class="brand-stripe"></div>

      <!-- CHILD 1: HEADER -->
      <div class="header-card">
        <div class="header-left">
          {f'<img src="data:image/png;base64,{logo_b64}" class="logo-img" alt="BarakahSoft" />' if logo_b64 else '<span style="font-size:12pt; font-weight:800; color:#b48608;">BARAKAHSOFT</span>'}
          <div>
            <div class="doc-title">Atelier Men's Grooming — Production Scope &amp; Estimate</div>
            <div class="doc-sub">PROJECT REF: FL-40712578 • CLIENT: AUBURN, AL, US • DATE: MARCH 2025</div>
          </div>
        </div>
        <div class="header-right">
          <div class="badge-live">LIVE PROTOTYPE DEPLOYED</div>
          <div>https://atelier-barbershop.vercel.app</div>
          <div>Turnkey Fixed Scope: <strong>$650.00 USD</strong></div>
        </div>
      </div>
    </div>

    <!-- CHILD 2: EXECUTIVE SUMMARY -->
    <div class="summary-card">
      <div class="summary-title">Executive Briefing &amp; Defensibility Hook (No Generic Templates)</div>
      <div class="summary-text">
        Delivers a bespoke, masculine editorial barbershop web platform for Auburn, AL. Directly fulfills client requirements: an interactive haircut Before/After split-screen slider, an integrated 4-step appointment booking workflow with calendar file exports (.ics), an Owner No-Code Studio to modify prices and hours in real-time, verified Google reviews, and Schema.org local SEO structured data for #1 search rankings.
      </div>
    </div>

    <!-- CHILD 3: SCOPE & INVESTMENT TABLE -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 12%;">Milestone</th>
            <th style="width: 30%;">Deliverable Description</th>
            <th style="width: 32%;">Core Technical Capabilities</th>
            <th style="width: 14%;">Timeline</th>
            <th style="width: 12%; text-align: right;">Fixed Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="phase-badge badge-done">PHASE 0</span></td>
            <td><strong>Working Production Demo</strong></td>
            <td>Interactive lookbook slider, booking engine, owner CMS studio</td>
            <td>Immediate</td>
            <td style="text-align: right; font-weight: 700; color: #047857;">$0.00 (Delivered)</td>
          </tr>
          <tr>
            <td><span class="phase-badge badge-pending">MILESTONE 1</span></td>
            <td><strong>Brand &amp; Creative Customization</strong></td>
            <td>Atelier luxury typography, shop photography, brand assets, copy</td>
            <td>Day 1 – 2</td>
            <td style="text-align: right; font-weight: 700;">$150.00</td>
          </tr>
          <tr>
            <td><span class="phase-badge badge-pending">MILESTONE 2</span></td>
            <td><strong>4-Step Booking &amp; Alerts</strong></td>
            <td>Live chair statuses, time-slot locking, SMS/email alerts, .ics sync</td>
            <td>Day 3 – 4</td>
            <td style="text-align: right; font-weight: 700;">$180.00</td>
          </tr>
          <tr>
            <td><span class="phase-badge badge-pending">MILESTONE 3</span></td>
            <td><strong>Owner No-Code Studio &amp; Domain</strong></td>
            <td>Real-time price &amp; hours editor, chair toggle, custom domain link</td>
            <td>Day 5 – 6</td>
            <td style="text-align: right; font-weight: 700;">$140.00</td>
          </tr>
          <tr>
            <td><span class="phase-badge badge-pending">MILESTONE 4</span></td>
            <td><strong>Local SEO, Google Pack &amp; Speed</strong></td>
            <td>Schema.org BarberShop JSON-LD, SERP preview, 100/100 LCP audit</td>
            <td>Day 7</td>
            <td style="text-align: right; font-weight: 700;">$180.00</td>
          </tr>
          <tr class="total-row">
            <td colspan="4" style="text-align: right; text-transform: uppercase;">Total Turnkey Investment (100% Escrow Milestone Protected):</td>
            <td style="text-align: right; color: #b48608;">$650.00 USD</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CHILD 4: ARCHITECTURE SPECIFICATIONS -->
    <div class="arch-card">
      <div class="arch-title">Production Architectural Specifications</div>
      <div class="arch-grid">
        <div class="arch-item">
          <div class="arch-label">Core Framework</div>
          <div class="arch-val">Next.js 15 App Router</div>
        </div>
        <div class="arch-item">
          <div class="arch-label">Design &amp; UI System</div>
          <div class="arch-val">Tailwind v4 + shadcn</div>
        </div>
        <div class="arch-item">
          <div class="arch-label">Dual AI Consultant</div>
          <div class="arch-val">OpenAI + Gemini Fallback</div>
        </div>
        <div class="arch-item">
          <div class="arch-label">Performance / LCP</div>
          <div class="arch-val">0.78s (100/100 Mobile)</div>
        </div>
      </div>
    </div>

    <!-- CHILD 5: TERMS & GUARANTEE -->
    <div class="terms-card">
      <div class="terms-item"><span class="check-icon">✓</span> <strong>Zero Platform Lock-in:</strong> 100% full source code and GitHub repository ownership transferred.</div>
      <div class="terms-item"><span class="check-icon">✓</span> <strong>30-Day Post-Launch Warranty:</strong> Free defect resolution &amp; operational support.</div>
      <div class="terms-item"><span class="check-icon">✓</span> <strong>Zero Monthly Fees:</strong> Runs on free Vercel edge tier with zero recurring builder costs.</div>
    </div>

    <!-- CHILD 6: DUAL SIGNATURES & VERIFIED CREDENTIALS -->
    <div class="sig-container">
      <div class="contractor-side">
        {f'<img src="data:image/jpeg;base64,{headshot_b64}" class="headshot" alt="Shakil Ahmed" />' if headshot_b64 else ''}
        <div class="contractor-meta">
          <div class="contractor-name">Md Shakil Ahmed · BarakahSoft LLC</div>
          <div class="contractor-title">Principal Systems Architect &amp; Founder · 12+ Yrs Enterprise Engineering</div>
          <div class="contractor-cred">Securiti Certified AI Architect · Former Lead Engineer at Legiit ($1M ARR)</div>
        </div>
      </div>

      <div class="client-side">
        <div class="client-label">ACCEPTED &amp; AUTHORIZED:</div>
        <div class="sig-line"></div>
        <div class="client-label">Authorized Barbershop Signatory · Date</div>
      </div>
    </div>
  </div>
</body>
</html>"""

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"Generated HTML estimate at: {html_path}")

    # Generate single-page PDF via Headless Chrome
    chrome_cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--print-to-pdf-no-header",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]

    try:
        subprocess.run(chrome_cmd, check=True)
        print(f"Successfully compiled PDF to: {pdf_path}")
    except Exception as e:
        print(f"Error compiling PDF via Chrome: {e}", file=sys.stderr)

    # Verify single-page PDF page count
    try:
        pdf_info = subprocess.run(["pdfinfo", pdf_path], capture_output=True, text=True)
        for line in pdf_info.stdout.splitlines():
            if "Pages:" in line:
                print(f"PDF Page Count Verification: {line.strip()}")
    except Exception:
        pass

if __name__ == "__main__":
    build_estimate()
