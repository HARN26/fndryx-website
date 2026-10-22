import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | FNDRYx" },
  description:
    "How FNDRYx collects, uses, shares, and protects personal information.",
  alternates: {
    canonical: "https://fndryx.io/privacy",
  },
};

// Legal text below is verbatim from the approved policy (Last Updated
// October 20, 2026). Do not reword, reorder, or correct it in code.
const h2ClassName =
  "mt-16 mb-4 font-display font-bold text-[28px] leading-tight text-steel-100";
const h3ClassName =
  "mt-10 mb-3 font-display font-semibold text-xl leading-snug text-steel-100";
const pClassName = "mt-4 font-body text-base leading-relaxed text-steel-200";
const ulClassName =
  "mt-4 list-disc space-y-3 pl-6 font-body text-base leading-relaxed text-steel-200";
const strongClassName = "font-bold text-steel-100";
const uClassName = "underline underline-offset-4";
const linkClassName =
  "text-fire-400 underline-offset-4 hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900";
const tableClassName =
  "w-full min-w-[520px] border-collapse text-left font-body text-base leading-relaxed";
const thClassName =
  "border border-steel-700 bg-steel-800 px-4 py-3 align-top font-bold text-steel-100";
const tdClassName =
  "border border-steel-700 px-4 py-3 align-top text-steel-200";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="bg-steel-900">
        <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <header className="mb-10">
            <h1 className="font-display font-bold text-4xl leading-tight text-steel-100">
              FNDRY
              <span className="font-serif italic font-normal text-fire-400 -ml-[0.05em] relative top-[0.05em] inline-block">
                x
              </span>{" "}
              Privacy Policy
            </h1>
            <p className="mt-4 font-body text-xs font-medium uppercase tracking-wide text-steel-400">
              <strong>Last Updated:</strong> October 20, 2026
            </p>
          </header>

          <p className={pClassName}>FNDRYx, Inc. (&quot;<strong className={strongClassName}>FNDRYx</strong>,&quot; &quot;<strong className={strongClassName}>we</strong>,&quot; &quot;<strong className={strongClassName}>us</strong>,&quot; or &quot;<strong className={strongClassName}>our</strong>&quot;) provides founder readiness assessments, founder reports, progress check-ins, and a platform that connects founders with startup ecosystem organizations and investors. This Privacy Policy explains how we collect, use, share, and protect personal information when you visit https://fndryx.io (the &quot;<strong className={strongClassName}>Site</strong>&quot;), take a FNDRYx assessment, or otherwise use our services (together, the &quot;<strong className={strongClassName}>Services</strong>&quot;).</p>
          <p className={pClassName}>By using the Services, you acknowledge the practices described in this Privacy Policy. If you do not agree, please do not use the Services.</p>
          <h2 className={h2ClassName}>1. Information We Collect</h2>
          <h3 className={h3ClassName}>Information you provide to us</h3>
          <ul className={ulClassName}>
          <li><strong className={strongClassName}>Contact and account information</strong>, such as your name, email address, phone number (if you provide one), company name, and access and sign-in codes we issue to you.</li>
          <li><strong className={strongClassName}>Assessment information</strong>, including your answers to the FNDRYx readiness assessment, information about your company (for example, its financials, team, market, business model, and funding strategy), and whether you are attending a particular event.</li>
          <li><strong className={strongClassName}>Check-in and milestone information</strong>, such as your responses to periodic check-ins and updates you share about your company&apos;s progress.</li>
          <li><strong className={strongClassName}>Your choices and preferences</strong>, including the sharing options and your communication preferences.</li>
          <li><strong className={strongClassName}>Communications</strong>, such as messages you send us, introduction requests, and feedback.</li>
          </ul>
          <h3 className={h3ClassName}>Information we create</h3>
          <p className={pClassName}>We use the information you provide to generate <strong className={strongClassName}>scores, readiness levels, founder reports, readiness records, and score movement over time</strong> (together, &quot;<strong className={strongClassName}>Readiness Information</strong>&quot;). Readiness Information is personal information when it is associated with you.</p>
          <h3 className={h3ClassName}>Information we receive from partners</h3>
          <p className={pClassName}>If you are invited to the Services by an ecosystem partner (for example, an accelerator, event organizer, or startup community organization), that partner may provide us with limited information, such as your name, email address, and event registration status (which the partner may collect through its own registration or ticketing platform), so we can invite you to take the assessment. We send invitations and access codes to the email address the partner registered for you.</p>
          <h3 className={h3ClassName}>Information collected automatically</h3>
          <p className={pClassName}>When you use the Site, we and our service providers may automatically collect device and usage information, such as IP address, browser type, device identifiers, pages viewed, links clicked, referring URLs, and approximate location derived from IP address. We collect this information using cookies, pixels, and similar technologies. You can control cookies through your browser settings; disabling cookies may affect how the Site functions.</p>
          <h2 className={h2ClassName}>2. How We Use Information</h2>
          <p className={pClassName}>We use personal information to:</p>
          <ul className={ulClassName}>
          <li>Provide the Services, including administering assessments, generating your founder report and Readiness Information (which FNDRYx staff may review before release), and sending check-ins;</li>
          <li>Verify your identity and secure your access, including by issuing single-use or time-limited access and sign-in codes;</li>
          <li>Notify you when your founder report is ready;</li>
          <li>Help ecosystem partners design event programming, such as breakout sessions, using combined cohort results, and suggest sessions to you based on your own results;</li>
          <li>Share information as you direct or permit, as described in Section 3;</li>
          <li>Create combined, de-identified, or aggregated cohort results and ecosystem reports;</li>
          <li>Communicate with you about the Services, including service messages, check-ins, and changes to our policies;</li>
          <li>Operate, maintain, secure, and improve the Services, including developing and testing our assessment methodology;</li>
          <li>Detect, prevent, and respond to fraud, misuse, security incidents, and other harmful activity;</li>
          <li>Comply with legal obligations and enforce our agreements; and</li>
          <li>For any other purpose we describe to you when we collect the information or with your consent.</li>
          </ul>
          <p className={pClassName}>We do not:</p>
          <ul className={ulClassName}>
          <li>Sell your personal information to advertisers or data brokers.</li>
          <li>Share your name with investors unless you turn on &quot;Visible to Capital.&quot;</li>
          <li>Give event service providers a lead list or your assessment answers.</li>
          </ul>
          <h2 className={h2ClassName}>3. How We Share Information</h2>
          <p className={pClassName}>We share personal information only as described below.</p>
          <h3 className={h3ClassName}>Sharing that is part of using the Services</h3>
          <ul className={ulClassName}>
          <li><strong className={strongClassName}>Ecosystem partners and their program partners (combined results only).</strong> When you take an assessment through an ecosystem partner, your answers and scores are combined with those of other founders into cohort results that are provided to that ecosystem partner and the program partners it identifies. Cohort results do not include your name or company name, and we do not report any group smaller than five founders.</li>
          <li><strong className={strongClassName}>Service providers.</strong> We use vendors that perform services on our behalf, such as hosting, technology platform, data storage, email delivery, analytics, and customer support providers. The current service providers include Vercel (hosting), Supabase (database), Google (email through Gmail), Amazon SES (email), and Anthropic (AI processing). Service providers are permitted to use personal information only to provide services to us.</li>
          </ul>
          <h3 className={h3ClassName}>Sharing you choose</h3>
          <ul className={ulClassName}>
          <li><strong className={strongClassName}>Event routing.</strong> If you are attending a partner event, we may share your readiness level with the event organizer so it can place you in investor meetings, office hours, or tailored sessions. Event organizers may pay FNDRYx, in cash or in kind, to offer our Services to event attendees.</li>
          <li><strong className={strongClassName}>Visibility to capital.</strong> If you opt in, investors who are FNDRYx members (including paying members and investors given access to event-specific investor reports) may view your name and readiness record on the FNDRYx platform.</li>
          <li><strong className={strongClassName}>Introductions to capital partners.</strong> If you opt in, an ecosystem partner may introduce you to its capital partners and share your name and readiness record with them for that purpose.</li>
          <li><strong className={strongClassName}>Tracking by ecosystem organizations.</strong> If you opt in, an ecosystem partner and the ecosystem organizations it works with may follow your check-in results, Readiness Information changes, and milestone updates for the period disclosed to you. You will always be able to see who is following you. Ecosystem partners and organizations may pay FNDRYx, in cash or in kind, for access to tracking services.</li>
          <li><strong className={strongClassName}>Introductions you request.</strong> If you ask to be introduced to a service provider partner (for example, a law firm, accounting firm, or other professional services provider affiliated with an ecosystem partner), we will share your name and email address with that partner, and nothing else. Service provider partners never receive lists of founders, your assessment, or your Readiness Information, and they cannot follow or track you.</li>
          </ul>
          <p className={pClassName}>Once we share information with an investor, ecosystem partner, or other third party at your direction, that recipient&apos;s use of the information is governed by its own privacy practices. We encourage you to review them.</p>
          <div className="mt-8 mb-6 overflow-x-auto">
          <table className={tableClassName}>
          <thead>
          <tr><th className={thClassName}>Who</th><th className={thClassName}>What they see</th><th className={thClassName}>When</th></tr>
          </thead>
          <tbody>
          <tr><td className={tdClassName}><strong className={strongClassName}>You</strong></td><td className={tdClassName}>Your founder report, check-ins and choices</td><td className={tdClassName}>Always</td></tr>
          <tr><td className={tdClassName}><strong className={strongClassName}>The ecosystem partner whose link you used, and its program partners</strong></td><td className={tdClassName}>Combined, unnamed cohort results</td><td className={tdClassName}>Always, with no group smaller than five</td></tr>
          <tr><td className={tdClassName}><strong className={strongClassName}>That ecosystem partner</strong></td><td className={tdClassName}>Your readiness level, to place you at its event</td><td className={tdClassName}>Only if you turn on event routing</td></tr>
          <tr><td className={tdClassName}><strong className={strongClassName}>Ecosystem organizations</strong></td><td className={tdClassName}>Your check-in results, score movement and milestones; you can see who is following you</td><td className={tdClassName}>Only if you turn on tracking</td></tr>
          <tr><td className={tdClassName}><strong className={strongClassName}>Investors who are FNDRYx members, investors at partner events, and capital partners an ecosystem partner introduces you to</strong></td><td className={tdClassName}>Your name and readiness record</td><td className={tdClassName}>Only if you turn on &quot;Visible to capital&quot;</td></tr>
          <tr><td className={tdClassName}><strong className={strongClassName}>A service provider partner at an event</strong></td><td className={tdClassName}>Your name and email, and nothing else</td><td className={tdClassName}>Only when you ask for the introduction</td></tr>
          <tr><td className={tdClassName}><strong className={strongClassName}>Companies that run FNDRYx for us</strong></td><td className={tdClassName}>What they need to provide their service</td><td className={tdClassName}>As needed to operate FNDRYx</td></tr>
          </tbody>
          </table>
          </div>
          <h3 className={h3ClassName}>Other sharing</h3>
          <ul className={ulClassName}>
          <li><strong className={strongClassName}>Legal and safety.</strong> We may disclose information if we believe in good faith it is required by law, subpoena, or legal process, or necessary to protect the rights, property, or safety of FNDRYx, our users, or others.</li>
          <li><strong className={strongClassName}>Business transfers.</strong> We may transfer information in connection with a merger, acquisition, financing, reorganization, bankruptcy, or sale of all or part of our business or assets, subject to this Privacy Policy or a successor policy that provides comparable protection.</li>
          <li><strong className={strongClassName}>With your consent.</strong> We may share information for other purposes with your consent or at your direction.</li>
          </ul>
          <h2 className={h2ClassName}>4. De-identified and Aggregated Information</h2>
          <p className={pClassName}>We may create information that is combined, de-identified, or aggregated so that it does not reasonably identify you or your company. We may use, share, publish, and commercially provide this information for any lawful purpose, including cohort results, ecosystem and research reports, benchmarking, and improving our assessment methodology, whether or not you have turned on any optional sharing choice. We do not report groups smaller than five founders, we do not attempt to re-identify de-identified information, and we require recipients to agree not to attempt to re-identify it.</p>
          <h2 className={h2ClassName}>5. Your Choices</h2>
          <ul className={ulClassName}>
          <li><strong className={strongClassName}>Sharing choices.</strong> You can adjust sharing at any time by emailing <a href="mailto:privacy@fndryx.io" className={linkClassName}>privacy@fndryx.io</a>. Once notified of your choice, we will remove you from investor visibility and future investor reports, and we will notify any ecosystem partner or organization following you to stop using your information going forward. The choice update cannot recall information that was already shared.</li>
          <li><strong className={strongClassName}>Check-ins.</strong> You can stop check-ins at any time by following the unsubscribe instructions in any message. We may still send you transactional or service-related messages. If you don&apos;t complete a check-in for 90 days, your record will be set aside and used only in combined, unnamed results. If you complete a check-in or submit a new assessment, your record becomes active again.</li>
          <li><strong className={strongClassName}>Access, correction, and deletion.</strong> You may request access to, correction of, or deletion of your founder report and identifiable information by emailing <a href="mailto:privacy@fndryx.io" className={linkClassName}>privacy@fndryx.io</a> or replying to any FNDRYx email. We will process your request within 30 days. When we delete your personally identifiable information, we may retain combined, de-identified results already reported and information we must keep to comply with law, resolve disputes, or enforce our agreements.</li>
          <li><strong className={strongClassName}>Do Not Track.</strong> Some browsers send &quot;Do Not Track&quot; signals. Because there is no common standard for these signals, the Site does not currently respond to them.</li>
          </ul>
          <h2 className={h2ClassName}>6. Your Privacy Rights (United States)</h2>
          <p className={pClassName}>Depending on your state of residence, you may have certain rights under applicable state privacy laws which may include:</p>
          <ul className={ulClassName}>
          <li><em>Right to Know</em> (Specific Pieces of Personal Information). You have the right to know the specific pieces of your personal information that we have collected about you.</li>
          <li><em>Right to Know</em> (Categories of Personal Information). You have the right to know (i) the categories of personal information we have collected from you; (ii) the categories of sources from which the personal information is collected; (iii) the categories of your personal information we have sold or disclosed for a business purpose; (iv) the categories of third parties to whom your personal information was sold or disclosed for a business purpose; and (v) the business or commercial purpose for collecting or selling your personal information.</li>
          <li><em>Right to Delete</em>. You have the right to request that we delete your personal information that we have collected and retain.</li>
          <li><em>Right to Correct</em>. You have the right to request that we correct inaccurate personal information that we have collected and retain.</li>
          <li><em>Nondiscrimination</em>. You have the right not to be subject to discrimination for asserting your rights.</li>
          </ul>
          <p className={pClassName}><u className={uClassName}>Submit a Privacy Request</u>. To submit a privacy request, you (or your authorized agent) may contact us in accordance with the &quot;Contact Us&quot; section listed below. However, any such authorized agent may have to be registered.</p>
          <p className={pClassName}><u className={uClassName}>Privacy Request Verification Process</u>. If you (or your authorized agent) make any request related to your personal information, we will ascertain your identity (and the identity of the authorized agent, to the extent applicable) to the degree of certainty required or permitted under the law before addressing your request. In particular, we will, to the extent required or permitted by law, require you (or your authorized agent) to verify your request via email, request certain contact information or government identifiers, and we will match at least two pieces of such personal information with data that we have previously collected from you before granting you access to, erasing, or correcting, specific pieces or categories of personal information, or otherwise responding to your request. We may require written documentation that demonstrates that a third party is authorized to serve as your agent for the purposes of submitting the requests set forth herein, unless you have provided the authorized agent with power of attorney pursuant to applicable law. None of the privacy rights are absolute, and such rights are subject to legal and regulatory exceptions and exemptions.</p>
          <h2 className={h2ClassName}>7. Data Retention</h2>
          <p className={pClassName}>We keep personal information for as long as reasonably necessary to provide the Services and for the purposes described in this Privacy Policy, including any tracking period you have opted into, unless a longer period is required or permitted by law. When we no longer need personal information, we delete or de-identify it.</p>
          <h2 className={h2ClassName}>8. Security</h2>
          <p className={pClassName}>We implement and maintain reasonable administrative, technical, and physical safeguards designed to protect personal information collected through the Services against unauthorized access, disclosure, alteration, destruction, and loss. While we strive to protect your personal information, no method of transmission over the Internet or method of electronic storage is completely secure. We cannot guarantee the absolute security of your information.</p>
          <h2 className={h2ClassName}>9. Children&apos;s Privacy</h2>
          <p className={pClassName}>The Services are intended only for individuals who are 18 years of age or older. We do not knowingly collect personal information from anyone under 18. If you believe a minor has provided us with personal information, please contact us and we will delete it.</p>
          <h2 className={h2ClassName}>10. United States Operation</h2>
          <p className={pClassName}>FNDRYx is based in, and the Services are operated from, the United States, and are intended for use by individuals in the United States. Information we collect is stored and processed in the United States.</p>
          <h2 className={h2ClassName}>11. Investor Platform Notice</h2>
          <p className={pClassName}>FNDRYx is not a broker-dealer or investment adviser. Founder reports and Readiness Information are not recommendations to buy or sell any security and are not an offer or solicitation of securities. FNDRYx does not arrange investments and does not take compensation on any financing.</p>
          <h2 className={h2ClassName}>12. Third-Party Sites / Social Media</h2>
          <p className={pClassName}>The Services may contain links to third-party websites or services that we do not control. This Privacy Policy does not apply to them. We may engage with you on various social media platforms (e.g., LinkedIn). If you contact us on a social media platform for customer support or for other reasons, we may contact you via the social media&apos;s direct message tools. Those communications to and from us are governed by this Privacy Policy. However, your use of a social media platform is also subject to the policies and terms of the relevant social media platform. Certain social media platforms may also automatically provide us with your personal information, and the information we receive will depend on the terms that govern your use of the social media platform(s) and any privacy settings you may have set. The Site includes social media widgets and these widgets may collect your IP address and which Site page you are accessing and may set a cookie to enable the feature to function properly. Social media features and widgets are either hosted by a third party or hosted directly on the Site. Your interactions with these features are governed by the privacy statement of the relevant social media platform that provides them.</p>
          <h2 className={h2ClassName}>13. Changes to This Privacy Policy</h2>
          <p className={pClassName}>We may update this Privacy Policy from time to time. We will post the updated version on the Site and change the &quot;Last Updated&quot; date. If we make material changes, including any change that would expand how we share your identifiable information, we may notify you by email or through the Services before the change takes effect and, where appropriate, ask for your consent.</p>
          <h2 className={h2ClassName}>14. Contact Us</h2>
          <p className={pClassName}>If you have questions about this Privacy Policy or our practices, contact us at:</p>
          <p className={pClassName}>FNDRYx, Inc.<br />Attn: Legal<br />727 Madison Ave, Suite 45, Covington, KY 41011<br />Email: <a href="mailto:privacy@fndryx.io" className={linkClassName}>privacy@fndryx.io</a></p>
        </article>
      </main>
      <Footer />
    </>
  );
}
