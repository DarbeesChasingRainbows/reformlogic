/**
 * Contract definitions for ReformLogic consulting agreements.
 * Each contract is a structured data object with sections containing
 * HTML content and {{variable}} placeholders for client-specific data.
 */

export interface ContractSection {
  title: string;
  content: string;
}

export interface ContractDefinition {
  type: string;
  slug: string;
  title: string;
  version: string;
  effectiveDate: string;
  summary: string;
  sections: ContractSection[];
  variables: string[];
  incorporatesMsa: boolean;
}

export const contracts: ContractDefinition[] = [
  {
    type: "msa",
    slug: "msa",
    title: "Master Services Agreement",
    version: "1.0",
    effectiveDate: "2026-02-14",
    summary:
      "Umbrella agreement governing all consulting engagements — covers IP ownership, liability, payment terms, and dispute resolution.",
    variables: ["clientName", "clientEmail", "clientCompany", "effectiveDate"],
    incorporatesMsa: false,
    sections: [
      {
        title: "1. Parties",
        content:
          `This Master Services Agreement ("Agreement") is entered into as of {{effectiveDate}} by and between:<br><br><strong>Consultant:</strong> ReformLogic, operated by its principal ("Consultant")<br><strong>Client:</strong> {{clientName}}, on behalf of {{clientCompany}} ("Client")<br>Email: {{clientEmail}}`,
      },
      {
        title: "2. Scope of Services",
        content:
          `Consultant agrees to provide software architecture consulting services as described in individual Statements of Work ("SOW"), Diagnostic Agreements, or Artifact Task Orders executed under this Agreement. Each such document is incorporated by reference and governed by the terms herein.`,
      },
      {
        title: "3. Intellectual Property & Work Product",
        content:
          `<strong>3.1 Work Product.</strong> All deliverables, code, documentation, and materials created by Consultant specifically for Client under an executed SOW ("Work Product") shall be assigned to Client upon full payment of all associated fees.<br><br><strong>3.2 Pre-Existing IP.</strong> Consultant retains all rights to pre-existing tools, frameworks, libraries, and methodologies ("Consultant IP"). Where Consultant IP is incorporated into Work Product, Client receives a perpetual, non-exclusive, royalty-free license to use such Consultant IP solely within the delivered Work Product.<br><br><strong>3.3 General Knowledge.</strong> Nothing in this Agreement restricts Consultant from using general knowledge, skills, experience, and techniques acquired during the engagement.`,
      },
      {
        title: "4. Confidentiality",
        content:
          `Each party agrees to hold in confidence all non-public information disclosed by the other party ("Confidential Information"). This obligation survives termination for a period of two (2) years. Confidential Information does not include information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was known to the receiving party prior to disclosure; (c) is independently developed without use of the disclosing party's information; or (d) is required to be disclosed by law.`,
      },
      {
        title: "5. Payment Terms",
        content:
          `<strong>5.1 Invoicing.</strong> Consultant shall invoice Client as specified in each SOW or Task Order. Unless otherwise stated, payment is due within fourteen (14) days of invoice date.<br><br><strong>5.2 Late Payment.</strong> Overdue invoices accrue interest at a rate of 1.5% per month or the maximum rate permitted by law, whichever is less.<br><br><strong>5.3 Expenses.</strong> Client shall reimburse Consultant for pre-approved expenses within fourteen (14) days of submission with receipts.`,
      },
      {
        title: "6. Limitation of Liability",
        content:
          `TO THE MAXIMUM EXTENT PERMITTED BY LAW, CONSULTANT'S TOTAL LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, REGARDLESS OF THE CAUSE OF ACTION OR THEORY OF LIABILITY.`,
      },
      {
        title: "7. Indemnification",
        content:
          `Each party shall indemnify, defend, and hold harmless the other party from and against any third-party claims, damages, losses, and expenses (including reasonable attorneys' fees) arising from: (a) a material breach of this Agreement; or (b) the indemnifying party's gross negligence or willful misconduct.`,
      },
      {
        title: "8. Term & Termination",
        content:
          `<strong>8.1 Term.</strong> This Agreement is effective from the date of execution and continues until terminated by either party.<br><br><strong>8.2 Termination for Convenience.</strong> Either party may terminate this Agreement with thirty (30) days' written notice. Client shall pay for all work completed through the termination date.<br><br><strong>8.3 Termination for Cause.</strong> Either party may terminate immediately upon written notice if the other party materially breaches this Agreement and fails to cure within fifteen (15) days of written notice of such breach.<br><br><strong>8.4 Survival.</strong> Sections 3, 4, 5, 6, 7, and 9 survive termination.`,
      },
      {
        title: "9. Dispute Resolution",
        content:
          `Any dispute arising under this Agreement shall first be addressed through good-faith negotiation. If unresolved within thirty (30) days, the dispute shall be submitted to binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. The arbitration shall take place in the Consultant's jurisdiction. The arbitrator's decision shall be final and binding, and judgment may be entered in any court of competent jurisdiction.`,
      },
      {
        title: "10. Miscellaneous",
        content:
          `<strong>10.1 Independent Contractor.</strong> Consultant is an independent contractor, not an employee, agent, or partner of Client.<br><br><strong>10.2 Entire Agreement.</strong> This Agreement, together with all SOWs, Task Orders, and other documents executed hereunder, constitutes the entire agreement between the parties.<br><br><strong>10.3 Amendments.</strong> This Agreement may only be modified by written agreement signed by both parties.<br><br><strong>10.4 Severability.</strong> If any provision is found unenforceable, the remaining provisions shall continue in full force and effect.<br><br><strong>10.5 Governing Law.</strong> This Agreement shall be governed by the laws of the State in which the Consultant primarily operates, without regard to conflict of law principles.`,
      },
    ],
  },
  {
    type: "nda",
    slug: "nda",
    title: "Non-Disclosure Agreement",
    version: "1.0",
    effectiveDate: "2026-02-14",
    summary:
      "Mutual confidentiality agreement protecting sensitive business and technical information shared during the engagement.",
    variables: ["clientName", "clientEmail", "clientCompany", "effectiveDate"],
    incorporatesMsa: false,
    sections: [
      {
        title: "1. Parties",
        content:
          `This Non-Disclosure Agreement ("NDA") is entered into as of {{effectiveDate}} by and between:<br><br><strong>Party A (Consultant):</strong> ReformLogic, operated by its principal<br><strong>Party B (Client):</strong> {{clientName}}, on behalf of {{clientCompany}}<br>Email: {{clientEmail}}<br><br>Each a "Party" and collectively the "Parties."`,
      },
      {
        title: "2. Definition of Confidential Information",
        content:
          `"Confidential Information" means any non-public information disclosed by one Party to the other, whether orally, in writing, electronically, or by inspection, including but not limited to: business plans, financial data, customer lists, source code, algorithms, architecture designs, database schemas, API specifications, trade secrets, technical documentation, and any information marked or reasonably understood to be confidential.`,
      },
      {
        title: "3. Exclusions",
        content:
          `Confidential Information does not include information that: (a) is or becomes publicly available through no breach of this NDA; (b) was already known to the receiving Party without restriction prior to disclosure; (c) is independently developed by the receiving Party without use of or reference to the disclosing Party's Confidential Information; (d) is rightfully received from a third party without restriction on disclosure; or (e) is required to be disclosed by law, regulation, or court order, provided the receiving Party gives prompt written notice to the disclosing Party.`,
      },
      {
        title: "4. Obligations",
        content:
          `Each Party agrees to: (a) use Confidential Information solely for the purpose of evaluating or performing consulting services; (b) protect Confidential Information with at least the same degree of care used for its own confidential information, but no less than reasonable care; (c) limit access to Confidential Information to those employees, contractors, and advisors who have a need to know and are bound by confidentiality obligations no less restrictive than those in this NDA; and (d) not disclose Confidential Information to any third party without prior written consent.`,
      },
      {
        title: "5. Term",
        content:
          `This NDA is effective from the date of execution and the confidentiality obligations shall remain in effect for a period of two (2) years from the date of disclosure of the Confidential Information. Upon termination or expiration, each Party shall, upon request, return or destroy all Confidential Information in its possession.`,
      },
      {
        title: "6. Remedies",
        content:
          `Both Parties acknowledge that a breach of this NDA may cause irreparable harm for which monetary damages would be an inadequate remedy. Accordingly, the non-breaching Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedies available at law or in equity.`,
      },
      {
        title: "7. Governing Law",
        content:
          `This NDA shall be governed by and construed in accordance with the laws of the State in which the Consultant primarily operates, without regard to conflict of law principles. Any legal action arising under this NDA shall be brought in the courts of that jurisdiction.`,
      },
    ],
  },
  {
    type: "diagnostic",
    slug: "diagnostic",
    title: "Diagnostic Session Agreement",
    version: "1.0",
    effectiveDate: "2026-02-14",
    summary:
      "Terms for the $350/session architecture diagnostic — covers session details, scheduling, deliverables, and scope.",
    variables: [
      "clientName",
      "clientEmail",
      "clientCompany",
      "sessionDate",
      "sessionTopic",
      "effectiveDate",
    ],
    incorporatesMsa: true,
    sections: [
      {
        title: "1. Session Details",
        content:
          `This Diagnostic Session Agreement ("Agreement") is entered into under the Master Services Agreement between ReformLogic and {{clientName}} ({{clientCompany}}).<br><br><strong>Rate:</strong> $350 USD per 60-minute session<br><strong>Requested Date/Time:</strong> {{sessionDate}}<br><strong>Topic/Focus:</strong> {{sessionTopic}}<br><br>Sessions are conducted via video conference unless otherwise agreed upon in writing.`,
      },
      {
        title: "2. Scheduling & Cancellation",
        content:
          `<strong>2.1 Confirmation.</strong> Sessions are confirmed upon receipt of payment. Consultant will send a calendar invitation with the video conference link.<br><br><strong>2.2 Cancellation Policy.</strong> Either party may reschedule with at least 48 hours' notice. Cancellations with less than 48 hours' notice forfeit the session fee. No-shows by Client forfeit the session fee. No-shows by Consultant result in a full refund or rescheduled session at Client's option.<br><br><strong>2.3 Rescheduling.</strong> Each session may be rescheduled once at no additional cost, provided 48 hours' notice is given.`,
      },
      {
        title: "3. Deliverables",
        content:
          `Following the session, Consultant will provide:<br><br>(a) A written summary of findings and recommendations (delivered via email within 3 business days)<br>(b) Architecture diagrams or sketches produced during the session (if applicable)<br><br>The written summary is advisory in nature. Implementation decisions remain solely with the Client.`,
      },
      {
        title: "4. Scope Limitations",
        content:
          `The Diagnostic is a time-boxed advisory session. It does not include: (a) implementation of recommended changes; (b) ongoing support beyond the session; (c) guarantees of specific outcomes or performance improvements; (d) review of more than one primary system or architecture concern per session. Additional sessions may be booked separately.`,
      },
      {
        title: "5. Payment",
        content:
          `Payment of $350 USD is due upon booking and prior to the session. Payment may be made via the method specified by Consultant. All fees are non-refundable except as stated in the Cancellation Policy (Section 2).`,
      },
      {
        title: "6. Incorporation of MSA",
        content:
          `This Agreement is governed by and subject to the Master Services Agreement ("MSA") between the Parties. In the event of conflict between this Agreement and the MSA, the MSA shall prevail except where this Agreement explicitly supersedes specific MSA provisions. Terms not defined herein have the meanings given in the MSA.`,
      },
    ],
  },
  {
    type: "sow",
    slug: "sow",
    title: "Statement of Work",
    version: "1.0",
    effectiveDate: "2026-02-14",
    summary:
      "Project-level agreement defining scope, milestones, timeline, pricing, and change order process for full engagements.",
    variables: [
      "clientName",
      "clientEmail",
      "clientCompany",
      "projectName",
      "projectDescription",
      "startDate",
      "endDate",
      "totalFee",
      "paymentSchedule",
      "effectiveDate",
    ],
    incorporatesMsa: true,
    sections: [
      {
        title: "1. Project Description",
        content:
          `This Statement of Work ("SOW") is entered into under the Master Services Agreement between ReformLogic and {{clientName}} ({{clientCompany}}).<br><br><strong>Project Name:</strong> {{projectName}}<br><strong>Description:</strong> {{projectDescription}}`,
      },
      {
        title: "2. Scope of Work",
        content:
          `Consultant will provide the following services:<br><br>(a) Architecture design and documentation<br>(b) Domain modeling (DDD) and aggregate boundary definition<br>(c) Implementation of agreed-upon components and systems<br>(d) Code review and technical guidance<br>(e) Deployment configuration and documentation<br><br>Any work outside the scope defined in this SOW requires a written Change Order (see Section 5).`,
      },
      {
        title: "3. Milestones & Timeline",
        content:
          `<strong>Start Date:</strong> {{startDate}}<br><strong>Estimated Completion:</strong> {{endDate}}<br><br>Specific milestones and deliverables will be defined collaboratively during the project kickoff and documented as amendments to this SOW. Both parties acknowledge that timeline estimates are good-faith projections and may be adjusted based on scope changes, dependencies, or unforeseen technical complexity.`,
      },
      {
        title: "4. Pricing & Payment Schedule",
        content:
          `<strong>Total Project Fee:</strong> {{totalFee}}<br><strong>Payment Schedule:</strong> {{paymentSchedule}}<br><br>Unless otherwise specified above, the default payment schedule is: 30% upon SOW execution, 40% at project midpoint, and 30% upon final delivery and acceptance. All invoices are payable within 14 days per the MSA.`,
      },
      {
        title: "5. Change Order Process",
        content:
          `<strong>5.1</strong> Any change to the scope, timeline, or budget of this SOW must be documented in a written Change Order signed by both parties.<br><br><strong>5.2</strong> Consultant will provide a written estimate for each Change Order, including impact on timeline and cost, within 3 business days of the request.<br><br><strong>5.3</strong> Work on Change Orders does not begin until the Change Order is executed. Verbal agreements to change scope are not binding.`,
      },
      {
        title: "6. Acceptance Criteria",
        content:
          `<strong>6.1</strong> Client has ten (10) business days after delivery of each milestone to review and accept or request revisions ("Acceptance Period").<br><br><strong>6.2</strong> Revision requests must be specific, written, and within the original scope. One (1) round of revisions is included per milestone.<br><br><strong>6.3</strong> If Client does not respond within the Acceptance Period, the deliverable is deemed accepted.<br><br><strong>6.4</strong> Final project acceptance occurs when all milestones have been individually accepted.`,
      },
      {
        title: "7. Incorporation of MSA",
        content:
          `This SOW is governed by and subject to the Master Services Agreement ("MSA") between the Parties. In the event of conflict between this SOW and the MSA, the MSA shall prevail except where this SOW explicitly supersedes specific MSA provisions. Terms not defined herein have the meanings given in the MSA.`,
      },
    ],
  },
  {
    type: "artifact",
    slug: "artifact",
    title: "Artifact Task Order",
    version: "1.0",
    effectiveDate: "2026-02-14",
    summary:
      "Lightweight agreement for single-task deliverables — component builds, bug fixes, schema designs, and code reviews.",
    variables: [
      "clientName",
      "clientEmail",
      "clientCompany",
      "taskDescription",
      "deliverableSpec",
      "fee",
      "timeline",
      "effectiveDate",
    ],
    incorporatesMsa: true,
    sections: [
      {
        title: "1. Task Description",
        content:
          `This Artifact Task Order ("Task Order") is entered into under the Master Services Agreement between ReformLogic and {{clientName}} ({{clientCompany}}).<br><br><strong>Task:</strong> {{taskDescription}}`,
      },
      {
        title: "2. Deliverable Specification",
        content:
          `Consultant will deliver the following:<br><br>{{deliverableSpec}}<br><br>The deliverable will be provided in the format agreed upon (e.g., Git repository, pull request, documentation, or direct file delivery). Source code deliverables will include reasonable inline documentation.`,
      },
      {
        title: "3. Pricing",
        content:
          `<strong>Fee:</strong> {{fee}}<br><br>The fee is fixed for the scope defined in this Task Order. Payment is due upon delivery and acceptance. If the task requires significantly more effort than estimated (exceeding 20% of original estimate), Consultant will notify Client before proceeding with additional work.`,
      },
      {
        title: "4. Timeline",
        content:
          `<strong>Estimated Delivery:</strong> {{timeline}}<br><br>Consultant will make reasonable efforts to deliver within the estimated timeline. Delays caused by Client (e.g., delayed feedback, changed requirements, or access issues) extend the timeline accordingly.`,
      },
      {
        title: "5. Revision Policy",
        content:
          `One (1) round of revisions is included in the fee, provided revision requests are: (a) submitted within 5 business days of delivery; (b) within the original scope of the Task Order; and (c) specific and documented in writing. Additional revision rounds or scope changes are billable at the Consultant's standard hourly rate.`,
      },
      {
        title: "6. Incorporation of MSA",
        content:
          `This Task Order is governed by and subject to the Master Services Agreement ("MSA") between the Parties. In the event of conflict between this Task Order and the MSA, the MSA shall prevail except where this Task Order explicitly supersedes specific MSA provisions. Terms not defined herein have the meanings given in the MSA.`,
      },
    ],
  },
];

export function getContractByType(
  slug: string,
): ContractDefinition | undefined {
  return contracts.find((c) => c.slug === slug);
}
