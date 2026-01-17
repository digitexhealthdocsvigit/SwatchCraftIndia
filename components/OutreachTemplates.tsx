import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const OutreachTemplates: React.FC<Props> = ({ onNavigate }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Template copied to clipboard!');
  };

  const templates = [
    {
      id: "guest-post",
      title: "TEMPLATE 1: GUEST POST / THOUGHT LEADERSHIP",
      target: "FashionUnited, TextileExchange, India Briefing",
      subject: "Fabric Export Expertise: Guest Post on \"MOQ Pricing Strategies\"",
      body: `Dear [Editor/Content Lead Name],

I came across your excellent article on "[Article Title Related to Fabric/Export]" and was impressed by your depth on [specific topic].

I'm Vishal Pendharkar, founder of SwatchCraft India, a fabric swatch manufacturer serving B2B exporters and interior designers globally. We've spent 10+ years perfecting the art of efficient sample production for export markets.

I'd like to contribute a guest post to your platform on one of these topics:
1. "MOQ Pricing Breakdown: How Indian Fabric Manufacturers Compete with China & USA in 2025"
2. "The Complete Export Checklist: Packaging & Documentation for Fabric Samples"
3. "Waterfall Swatch Cards: Why Premium Exporters Are Adopting This Format"

Each would be 1,500-2,000 words, original content, with data-backed insights and 3-4 internal links to relevant resources on our site.

Audience value: Your readers would learn actionable strategies for managing export timelines, MOQ costs, and sample presentation—directly applicable to their business.

Would any of these topics resonate with your editorial calendar? I can provide outlines and samples upon request.

Best regards,

Vishal Pendharkar
Founder, SwatchCraft India
digitex.studio@gmail.com | +91 9004962871`
    },
    {
      id: "directory",
      title: "TEMPLATE 2: INDUSTRY DIRECTORY / LISTING SUBMISSION",
      target: "Exporters.gov.in, IndiaTradeHub, ExportHub",
      subject: "SwatchCraft India - Premium Fabric Swatch Manufacturer Directory Submission",
      body: `Dear [Directory Editor Name],

SwatchCraft India is a premium B2B fabric swatch and sample book manufacturer based in Mumbai, India. We're reaching out to request a featured listing in your [Directory Name] under the "Fabric Manufacturing" or "Export Services" category.

ABOUT US:
- Founded: 1994
- Service: Custom fabric swatch books, sample albums, and waterfall format cards
- Market: B2B exporters, interior designers, wholesale buyers in Europe, USA, and Asia
- Competitive Advantage: 15-20 day delivery (vs China's 45 days), premium quality, competitive MOQ pricing
- Certifications: ISO 9001:2015, Export-Ready Compliance

WHAT WE OFFER:
- 6 product formats with custom branding
- MOQ pricing: ₹70-120/unit at scale
- Export documentation support
- Rush orders available

WHY YOUR DIRECTORY:
Your platform is the go-to resource for B2B manufacturers and buyers in the fabric/export industry. A listing would help buyers find us, and your readers would benefit from knowing about efficient Indian alternatives to China and USA suppliers.

Could we arrange a featured listing? We're happy to provide high-quality product images, detailed descriptions, and link back to your site in our supplier network.

Best regards,

Vishal Pendharkar
SwatchCraft India
digitex.studio@gmail.com | +91 9004962871`
    },
    {
      id: "journalist",
      title: "TEMPLATE 3: INDUSTRY PUBLICATION / JOURNALIST OUTREACH",
      target: "Industry News, LinkedIn Pulse Influencers",
      subject: "Story Idea: \"India's First Waterfall Swatch Format - Innovation in Fabric Export\"",
      body: `Dear [Journalist Name],

I noticed your recent coverage of [relevant industry story/trend]. This demonstrates your interest in innovation and manufacturing excellence in the fabric/textile space.

I'm reaching out with a potential story angle for your publication:

STORY CONCEPT:
"How One Mumbai Manufacturer is Disrupting the $2B Global Fabric Sample Market with a Format No One Else is Offering"

THE ANGLE:
- SwatchCraft India developed the first waterfall swatch format manufactured in India
- This format shows 40% more samples in the same space as traditional books
- Faster production (2-3 weeks vs 3-4 weeks for traditional formats)
- Same price point, but perceived as premium by buyers
- Result: Customers see 50-60% repeat order rates vs industry average 30-40%

WHY IT'S NEWSWORTHY:
Indian manufacturers are often positioned as "budget alternatives" to USA/China. This story flips that narrative—it's innovation, speed, and efficiency that rivals premium global suppliers.

POTENTIAL ANGLES FOR YOUR AUDIENCE:
- "Made in India: Premium vs Commodity" narrative
- "Small Manufacturers Are Solving Big Export Problems"
- "Why Waterfall Format Is the Future of Sample Presentation"

I'm happy to provide:
- Founder interview (Vishal Pendharkar)
- Customer testimonials and data
- Product photography
- Market research on fabric sample trends

Would this story interest your publication? I'm available for a conversation at your convenience.

Best regards,

Vishal Pendharkar
Founder, SwatchCraft India
digitex.studio@gmail.com | +91 9004962871`
    },
    {
      id: "partnership",
      title: "TEMPLATE 4: COMPLEMENTARY B2B PARTNERSHIP",
      target: "Logistics Companies, Fabric Traders, Design CRM Tools",
      subject: "Partnership Opportunity: Co-Marketing \"Export Success Stories\" Content",
      body: `Dear [Business Owner/Marketing Lead Name],

I've been following [Company Name]'s excellent work in [export services/fabric trading/logistics/etc.]. We have complementary services and overlapping audiences.

PARTNERSHIP IDEA:
We'd like to collaborate on a co-authored resource guide or case study that serves both our audiences:

PROPOSED PROJECT:
"The Complete Export Success Playbook: From Sample to First Order"
- Chapters: Your expertise on [their service] + Our expertise on sample presentation
- 5,000-word resource guide + downloadable checklist
- Co-branded on both websites
- Mutual promotion to our respective email lists
- Link exchange (your site to our Pricing/Blog, our site to your services)

AUDIENCE SYNERGY:
Your clients need fabric samples. Our clients need export logistics/trading advice. This resource creates value for both ecosystems.

WHAT YOU BENEFIT:
- SEO boost (co-authored, high-authority resource)
- Lead generation (your services mentioned in our network)
- Thought leadership positioning
- 50-50 backlink swap

Would you be open to exploring this? I can draft the outline and we can collaborate from there.

Best regards,

Vishal Pendharkar
Founder, SwatchCraft India
digitex.studio@gmail.com | +91 9004962871`
    },
    {
      id: "chamber",
      title: "TEMPLATE 5: LOCAL BUSINESS / CHAMBER OF COMMERCE",
      target: "Mumbai Chamber of Commerce, MSME Resource Pages",
      subject: "Featured Business Profile: SwatchCraft India on Your \"Local Manufacturers\" Page",
      body: `Dear [Chamber/Business Association Lead],

SwatchCraft India is a Mumbai-based B2B manufacturer of fabric swatch books and export samples. We're a proud member of [Local Association] and wanted to reach out about a featured business profile on your "Local Manufacturers" or "Export Services" resource page.

A profile would highlight:
- Our 10+ year track record serving global clients
- Innovation (first waterfall format in India)
- Export impact (serving 12+ countries, supporting Indian textile industry)
- Employment (8-12 team members, manufacturing jobs)
- Competitive positioning (how Indian manufacturers can compete globally)

PROFILE DETAILS WE'D PROVIDE:
- 300-word business description
- Photo gallery (production, products, team)
- Link to our website
- Contact information for interested buyers
- Case study (optional)

BACKLINK BENEFIT TO SWATCH CRAFT:
A listing on your authoritative local business page improves our SEO and positioning as a serious, established manufacturer—especially valuable for B2B buyers researching vendors.

Is this something your organization supports? I'm happy to provide all content in your preferred format.

Best regards,

Vishal Pendharkar
Founder, SwatchCraft India
digitex.studio@gmail.com | +91 9004962871`
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 border-b border-gray-100 pb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-navy text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Internal Marketing Suite</span>
            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">B2B Growth 2025</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-navy leading-tight tracking-tighter mb-4">
            Outreach <span className="text-gold">Hub</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">High-conversion B2B outreach templates for fabric, export, and design authority websites.</p>
        </header>

        {/* Strategy Overview */}
        <section className="mb-20 bg-gray-50 p-10 rounded-[3rem] border border-gray-100 grid md:grid-cols-3 gap-12">
           <div>
              <h4 className="text-gold font-black text-[10px] uppercase tracking-widest mb-4">Priority Targets (Tier 1)</h4>
              <ul className="space-y-2 text-xs font-bold text-navy uppercase">
                 <li>• ExportHub.com</li>
                 <li>• FashionUnited.com</li>
                 <li>• IndiaTradeHub.com</li>
              </ul>
           </div>
           <div>
              <h4 className="text-gold font-black text-[10px] uppercase tracking-widest mb-4">Outreach Success Tips</h4>
              <ul className="space-y-2 text-[10px] font-medium text-gray-500 leading-relaxed">
                 <li><span className="text-teal font-black">PERSONALIZATION:</span> Research the contact and mention a recent article.</li>
                 <li><span className="text-teal font-black">TIMING:</span> Send on Tue/Wed between 10am-2pm local time.</li>
              </ul>
           </div>
           <div>
              <h4 className="text-gold font-black text-[10px] uppercase tracking-widest mb-4">KPI Benchmarks</h4>
              <ul className="space-y-2 text-xs font-bold text-navy uppercase">
                 <li>• 10-15% Response Rate</li>
                 <li>• 2-3 High-Auth Links / Month</li>
              </ul>
           </div>
        </section>

        <div className="grid gap-20">
          {templates.map((tpl) => (
            <section key={tpl.id} className="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-sm relative group hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-gray-50 pb-6">
                <div>
                  <h2 className="text-xl font-black text-navy uppercase tracking-widest mb-1">{tpl.title}</h2>
                  <p className="text-teal font-bold text-[10px] uppercase tracking-widest">Target: {tpl.target}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(`Subject: ${tpl.subject}\n\n${tpl.body}`)}
                  className="bg-navy text-white text-[10px] font-black px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-gold transition-colors shadow-lg"
                >
                  Copy Full Template
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Email Subject</label>
                    <button onClick={() => copyToClipboard(tpl.subject)} className="text-gold text-[9px] font-black uppercase tracking-widest hover:underline">Copy Subject</button>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-navy font-bold text-sm">
                    {tpl.subject}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Email Body</label>
                    <button onClick={() => copyToClipboard(tpl.body)} className="text-gold text-[9px] font-black uppercase tracking-widest hover:underline">Copy Body</button>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 text-gray-600 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                    {tpl.body}
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Strategy Tracking Guide */}
          <section className="bg-navy text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-2xl font-black text-gold uppercase tracking-widest mb-12 border-b border-white/10 pb-6">Strategic Campaign Execution</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                  <div>
                    <h5 className="text-gold font-black text-xs uppercase mb-4 tracking-widest">Personalization</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Always name the editor and reference their work. Value-first approach wins 4x more responses.</p>
                  </div>
                  <div>
                    <h5 className="text-gold font-black text-xs uppercase mb-4 tracking-widest">Timing</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Tuesday & Wednesday are peak B2B response days. Avoid Monday blasts and Friday afternoons.</p>
                  </div>
                  <div>
                    <h5 className="text-gold font-black text-xs uppercase mb-4 tracking-widest">Follow-ups</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Send 1 follow-up after 10-14 days. If no response after 2 touches, move to the next target.</p>
                  </div>
                  <div>
                    <h5 className="text-gold font-black text-xs uppercase mb-4 tracking-widest">Tracking</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Use a CRM or spreadsheet. Track: Site, Contact, Template used, Date sent, and Status.</p>
                  </div>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-80 h-80 bg-gold opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          </section>
        </div>

        <footer className="mt-20 text-center">
           <button onClick={() => onNavigate('home')} className="bg-navy text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all">Back to Home Dashboard</button>
        </footer>
      </div>
    </div>
  );
};

export default OutreachTemplates;