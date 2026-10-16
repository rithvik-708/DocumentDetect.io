// Sample analysis data — fictional university examination notice
// This data is bundled so the demo works without an API key.

import { AnalysisResult } from './types';

export const SAMPLE_DOCUMENT_TITLE = 'University Examination Notice — Fall 2026';

export const sampleAnalysis: AnalysisResult = {
  documentType: 'University Examination Notice',
  issuingOrganization: 'Office of the Controller of Examinations, National Institute of Technology, Surathkal',
  documentDate: '2026-10-01',
  summary: [
    'This is an official examination notice from the Office of the Controller of Examinations at NIT Surathkal regarding the End-Semester Examinations for the Fall 2026 term.',
    'All undergraduate and postgraduate students enrolled in regular programmes must register for the examinations by October 25, 2026, and pay the prescribed examination fee of ₹1,500.',
    'The examinations are scheduled to commence on November 15, 2026. Students who fail to register by the deadline will be required to pay a late fee of ₹500 in addition to the standard fee.',
    'Hall tickets will be available for download from the student portal starting November 10, 2026. Students must carry a valid institute ID card along with the hall ticket to the examination hall.',
  ],
  keyFacts: [
    {
      label: 'Student ID Requirement',
      value: 'Valid Institute ID Card (mandatory for examination hall entry)',
      sourceQuote: 'Students must carry a valid institute ID card along with the printed hall ticket to the examination hall.',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Examination Fee',
      value: '₹1,500 (standard) / ₹2,000 (with late fee)',
      sourceQuote: 'The prescribed examination fee of ₹1,500 (Rupees One Thousand Five Hundred Only) shall be remitted through the online student portal.',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Late Fee',
      value: '₹500 additional after deadline',
      sourceQuote: 'Students who fail to register within the stipulated deadline shall be liable to pay a late fee of ₹500.',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Issuing Authority',
      value: 'Dr. Ramesh Krishnamurthy, Controller of Examinations',
      sourceQuote: 'Sd/- Dr. Ramesh Krishnamurthy, Controller of Examinations',
      page: 2,
      confidence: 'high',
    },
    {
      label: 'Applicable Students',
      value: 'All UG and PG students in regular programmes',
      sourceQuote: 'All undergraduate and postgraduate students enrolled in regular programmes for the academic year 2026–27',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Contact Information',
      value: 'exam-support@nitk.edu.in / Ext. 2245',
      sourceQuote: 'For queries, contact the Examination Cell at exam-support@nitk.edu.in or telephone extension 2245.',
      page: 2,
      confidence: 'medium',
    },
  ],
  deadlines: [
    {
      dateText: 'October 25, 2026',
      action: 'Complete examination registration and fee payment through the student portal',
      sourceQuote: 'The last date for registration and fee payment is October 25, 2026.',
      page: 1,
      confidence: 'high',
    },
    {
      dateText: 'November 10, 2026',
      action: 'Download hall ticket from the student portal',
      sourceQuote: 'Hall tickets shall be made available for download on the student portal from November 10, 2026.',
      page: 1,
      confidence: 'high',
    },
    {
      dateText: 'November 15, 2026',
      action: 'Examinations commence',
      sourceQuote: 'The End-Semester Examinations for the Fall 2026 term shall commence on November 15, 2026.',
      page: 1,
      confidence: 'high',
    },
  ],
  actionItems: [
    {
      title: 'Register for examinations online',
      description: 'Log in to the student portal and complete the examination registration form. Ensure all course selections are correct before submitting.',
      priority: 'high',
      deadline: 'October 25, 2026',
      sourceQuote: 'All eligible students are hereby directed to register for the examinations through the online student portal.',
      page: 1,
    },
    {
      title: 'Pay examination fee of ₹1,500',
      description: 'Remit the prescribed examination fee through the online payment gateway on the student portal. Keep the transaction receipt for your records.',
      priority: 'high',
      deadline: 'October 25, 2026',
      sourceQuote: 'The prescribed examination fee of ₹1,500 (Rupees One Thousand Five Hundred Only) shall be remitted through the online student portal.',
      page: 1,
    },
    {
      title: 'Download and print hall ticket',
      description: 'Access the student portal after November 10 to download your hall ticket. Print a copy — digital copies may not be accepted.',
      priority: 'high',
      deadline: 'November 10, 2026',
      sourceQuote: 'Hall tickets shall be made available for download on the student portal from November 10, 2026.',
      page: 1,
    },
    {
      title: 'Ensure institute ID card is valid and available',
      description: 'Verify that your institute ID card is not expired and that the photograph is current. Contact the administrative office if you need a replacement.',
      priority: 'medium',
      deadline: null,
      sourceQuote: 'Students must carry a valid institute ID card along with the printed hall ticket to the examination hall.',
      page: 1,
    },
    {
      title: 'Review examination schedule for your courses',
      description: 'Once the detailed timetable is published, cross-check it with your registered courses to avoid scheduling conflicts.',
      priority: 'medium',
      deadline: null,
      sourceQuote: 'The detailed examination timetable shall be published on the institute website in due course.',
      page: 2,
    },
  ],
  missingInformation: [
    {
      item: 'Detailed examination timetable',
      reason: 'The notice states that the timetable "shall be published in due course" but does not include it or specify an exact publication date.',
      confidence: 'high',
    },
    {
      item: 'List of examination venues',
      reason: 'No specific examination halls or room numbers are mentioned in this notice. These are presumably communicated via the hall ticket.',
      confidence: 'medium',
    },
    {
      item: 'Re-examination or supplementary exam provisions',
      reason: 'The notice does not mention policies for students who cannot attend on scheduled dates, such as medical leave provisions or supplementary examinations.',
      confidence: 'low',
    },
  ],
  plainLanguageExplanations: [
    {
      originalText: 'Students who fail to register within the stipulated deadline shall be liable to pay a late fee of ₹500 in addition to the prescribed examination fee, subject to the approval of the competent authority.',
      explanation: 'If you miss the October 25 deadline, you will have to pay an extra ₹500 on top of the ₹1,500 fee — but only if the university administration approves your late registration.',
      sourceQuote: 'Students who fail to register within the stipulated deadline shall be liable to pay a late fee of ₹500 in addition to the prescribed examination fee, subject to the approval of the competent authority.',
      page: 1,
    },
    {
      originalText: 'The institute reserves the right to debar any student from appearing in the examinations in the event of non-compliance with the academic and disciplinary requirements as prescribed under the prevailing ordinances.',
      explanation: 'The university can stop you from taking the exams if you have not met attendance requirements, have unpaid dues, or have faced disciplinary action under existing university rules.',
      sourceQuote: 'The institute reserves the right to debar any student from appearing in the examinations in the event of non-compliance with the academic and disciplinary requirements as prescribed under the prevailing ordinances.',
      page: 2,
    },
    {
      originalText: 'Notwithstanding any provision contained herein, the Controller of Examinations shall be the final authority in all matters pertaining to the conduct of examinations.',
      explanation: 'Regardless of anything else in this notice, the Controller of Examinations has the final say on all exam-related decisions.',
      sourceQuote: 'Notwithstanding any provision contained herein, the Controller of Examinations shall be the final authority in all matters pertaining to the conduct of examinations.',
      page: 2,
    },
  ],
  limitations: [
    'This analysis was generated from a fictional sample document for demonstration purposes.',
    'This tool does not provide legal, financial, or medical advice. Always verify important details with the issuing organization.',
    'AI-based extraction may miss or misinterpret information. Cross-check critical facts against the original document.',
  ],
};

export const SAMPLE_ANALYSIS = sampleAnalysis;
