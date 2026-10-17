// Sample analysis data — fictional university examination notice
// This data is bundled so the demo works without an API key.

import { AnalysisResult, TranslatedData } from './types';

export const SAMPLE_DOCUMENT_TITLE = 'University Examination Notice — Fall 2026';

export const SAMPLE_DOCUMENT_TEXT = `NATIONAL INSTITUTE OF TECHNOLOGY, SURATHKAL
OFFICE OF THE CONTROLLER OF EXAMINATIONS
P.O. Srinivasnagar, Mangaluru - 575025, Karnataka, India

Ref. No: NITK/COE/2026/CIR-104                                      Date: October 01, 2026

CIRCULAR / NOTIFICATION
SUBJECT: End-Semester Examinations Schedule & Mandatory Registration — Fall Term 2026

1. All registered undergraduate (B.Tech) and postgraduate (M.Tech/MCA/MBA/M.Sc) students enrolled in regular programmes for the academic year 2026–27 are hereby informed that the End-Semester Regular Examinations for the Fall Term 2026 are scheduled to commence from November 15, 2026.

2. MANDATORY REGISTRATION & FEE PAYMENT:
   - Examination portal opens: October 10, 2026 at 10:00 AM IST.
   - Normal registration deadline without penalty: October 25, 2026 (Prescribed Fee: Rs. 1,500).
   - The prescribed examination fee of Rs. 1,500 (Rupees One Thousand Five Hundred Only) shall be remitted through the online student portal.
   - Late registration window: October 26 to November 02, 2026 with an additional statutory fine of Rs. 500 (Total Rs. 2,000). Students who fail to register within the stipulated deadline shall be liable to pay a late fee of Rs. 500.
   - Under no circumstances will registrations be entertained subsequent to November 02, 2026.

3. HALL TICKETS / ADMIT CARDS:
   - Hall tickets shall be made available for download on the student portal from November 10, 2026.
   - Students must carry a valid institute ID card along with the printed hall ticket to the examination hall. Digital copies on mobile phones shall strictly not be accepted.

4. ATTENDANCE & ELIGIBILITY ORDINANCE:
   - Pursuant to Academic Ordinance 14(B), a minimum aggregate attendance of 75% in each enrolled course is mandatory. Candidates falling short shall be summarily debarred from appearing in the respective examination without remission of fees.
   - The institute reserves the right to debar any student from appearing in the examinations in the event of non-compliance with the academic and disciplinary requirements as prescribed under the prevailing ordinances.

5. PROHIBITED ARTICLES:
   - Possession of mobile phones, smartwatches, digital devices, and programmable calculators inside the examination hall is strictly prohibited and shall be construed as malpractice under Regulation 22.

6. SPECIAL ACCOMMODATIONS & CONTACT:
   - PwD candidates requiring compensatory time or scribe support must submit Form-IV to the COE office latest by October 20, 2026.
   - For queries, contact the Examination Cell at exam-support@nitk.edu.in or telephone extension 2245.
   - The detailed examination timetable shall be published on the institute website in due course.
   - Notwithstanding any provision contained herein, the Controller of Examinations shall be the final authority in all matters pertaining to the conduct of examinations.

Sd/-
Dr. Ramesh Krishnamurthy, Ph.D.
Controller of Examinations, NITK Surathkal
Copy to: Director's Office, All Deans, HODs, Notice Boards, and Student Portal`;

export const sampleAnalysis: AnalysisResult = {
  documentType: 'University Examination Notice',
  issuingOrganization: 'Office of the Controller of Examinations, National Institute of Technology, Surathkal',
  documentDate: '2026-10-01',
  summary: [
    'Official examination notice from NIT Surathkal Controller of Examinations regarding End-Semester Regular Exams for Fall Term 2026 commencing November 15, 2026.',
    'All undergraduate and postgraduate regular students must register and pay the standard examination fee of ₹1,500 by October 25, 2026.',
    'A late registration window is permitted until November 02, 2026, with an additional statutory penalty fee of ₹500 (Total ₹2,000).',
    'Hall tickets can be downloaded from the student portal starting November 10, 2026. Students must carry a physical institute ID card along with printed hall tickets.',
    'A strict 75% minimum aggregate attendance rule applies; students below 75% attendance will be debarred from taking the examinations.',
  ],
  keyFacts: [
    {
      label: 'Student ID Requirement',
      value: 'Valid Physical Institute ID Card (mandatory for entry)',
      sourceQuote: 'Students must carry a valid institute ID card along with the printed hall ticket to the examination hall.',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Standard Examination Fee',
      value: '₹1,500 (remitted via online student portal)',
      sourceQuote: 'The prescribed examination fee of Rs. 1,500 (Rupees One Thousand Five Hundred Only) shall be remitted through the online student portal.',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Late Registration Penalty',
      value: '₹500 fine (Total ₹2,000 between Oct 26 and Nov 02)',
      sourceQuote: 'Students who fail to register within the stipulated deadline shall be liable to pay a late fee of Rs. 500.',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Issuing Authority',
      value: 'Dr. Ramesh Krishnamurthy, Controller of Examinations',
      sourceQuote: 'Dr. Ramesh Krishnamurthy, Ph.D.\nController of Examinations, NITK Surathkal',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Minimum Attendance Threshold',
      value: '75% aggregate attendance required per course',
      sourceQuote: 'Pursuant to Academic Ordinance 14(B), a minimum aggregate attendance of 75% in each enrolled course is mandatory.',
      page: 1,
      confidence: 'high',
    },
    {
      label: 'Official Contact',
      value: 'exam-support@nitk.edu.in / Ext. 2245',
      sourceQuote: 'For queries, contact the Examination Cell at exam-support@nitk.edu.in or telephone extension 2245.',
      page: 1,
      confidence: 'high',
    },
  ],
  deadlines: [
    {
      dateText: 'October 10, 2026 at 10:00 AM IST',
      action: 'Examination registration portal opens for all regular UG & PG students',
      sourceQuote: 'Examination portal opens: October 10, 2026 at 10:00 AM IST.',
      page: 1,
      confidence: 'high',
      isStrictDeadline: false,
      priority: 'medium',
      parsedDate: '2026-10-10',
    },
    {
      dateText: 'October 20, 2026',
      action: 'PwD candidates must submit Form-IV for scribe support or compensatory time',
      sourceQuote: 'PwD candidates requiring compensatory time or scribe support must submit Form-IV to the COE office latest by October 20, 2026.',
      page: 1,
      confidence: 'high',
      isStrictDeadline: true,
      priority: 'high',
      parsedDate: '2026-10-20',
    },
    {
      dateText: 'October 25, 2026',
      action: 'Normal examination registration deadline without late penalty (Fee: ₹1,500)',
      sourceQuote: 'Normal registration deadline without penalty: October 25, 2026 (Prescribed Fee: Rs. 1,500).',
      page: 1,
      confidence: 'high',
      isStrictDeadline: true,
      priority: 'high',
      parsedDate: '2026-10-25',
    },
    {
      dateText: 'November 02, 2026',
      action: 'Final late registration cutoff with ₹500 fine (No entries accepted thereafter)',
      sourceQuote: 'Under no circumstances will registrations be entertained subsequent to November 02, 2026.',
      page: 1,
      confidence: 'high',
      isStrictDeadline: true,
      priority: 'high',
      parsedDate: '2026-11-02',
    },
    {
      dateText: 'November 10, 2026',
      action: 'Hall tickets available for download from student portal',
      sourceQuote: 'Hall tickets shall be made available for download on the student portal from November 10, 2026.',
      page: 1,
      confidence: 'high',
      isStrictDeadline: false,
      priority: 'medium',
      parsedDate: '2026-11-10',
    },
    {
      dateText: 'November 15, 2026',
      action: 'End-Semester regular examinations commence across all departments',
      sourceQuote: 'End-Semester Regular Examinations for the Fall Term 2026 are scheduled to commence from November 15, 2026.',
      page: 1,
      confidence: 'high',
      isStrictDeadline: false,
      priority: 'high',
      parsedDate: '2026-11-15',
    },
  ],
  actionItems: [
    {
      title: 'Complete examination registration online',
      description: 'Log in to the student portal and complete the examination registration form. Ensure all elective and core courses are accurately selected before submitting.',
      priority: 'high',
      deadline: 'October 25, 2026',
      sourceQuote: 'All eligible students are hereby directed to register for the examinations through the online student portal.',
      page: 1,
      confidence: 'high',
    },
    {
      title: 'Remit prescribed examination fee of ₹1,500',
      description: 'Pay the ₹1,500 examination fee via the student portal online payment gateway. Save and download the receipt reference number for verification.',
      priority: 'high',
      deadline: 'October 25, 2026',
      sourceQuote: 'The prescribed examination fee of Rs. 1,500 (Rupees One Thousand Five Hundred Only) shall be remitted through the online student portal.',
      page: 1,
      confidence: 'high',
    },
    {
      title: 'Submit Form-IV for PwD Accommodations (if applicable)',
      description: 'Candidates with disabilities requiring scribe support or extra time must deliver Form-IV to the Controller of Examinations office.',
      priority: 'high',
      deadline: 'October 20, 2026',
      sourceQuote: 'PwD candidates requiring compensatory time or scribe support must submit Form-IV to the COE office latest by October 20, 2026.',
      page: 1,
      confidence: 'high',
    },
    {
      title: 'Download and print physical hall ticket',
      description: 'Access the student portal on or after November 10 to download your admit card. You must bring a physical printed copy; digital copies on phones will not be permitted.',
      priority: 'medium',
      deadline: 'November 10, 2026',
      sourceQuote: 'Hall tickets shall be made available for download on the student portal from November 10, 2026.',
      page: 1,
      confidence: 'high',
    },
    {
      title: 'Verify physical institute ID card is valid',
      description: 'Ensure your institute identity card is undamaged with a legible photo. Contact student affairs immediately if you require an emergency duplicate card.',
      priority: 'medium',
      deadline: null,
      sourceQuote: 'Students must carry a valid institute ID card along with the printed hall ticket to the examination hall.',
      page: 1,
      confidence: 'high',
    },
    {
      title: 'Verify course attendance exceeds 75%',
      description: 'Check attendance records with your course instructors. Under Ordinance 14(B), students with less than 75% attendance are automatically debarred.',
      priority: 'high',
      deadline: null,
      sourceQuote: 'Pursuant to Academic Ordinance 14(B), a minimum aggregate attendance of 75% in each enrolled course is mandatory.',
      page: 1,
      confidence: 'high',
    },
  ],
  missingInformation: [
    {
      item: 'Course-wise examination timetable & timings',
      reason: 'The notification states the timetable "shall be published in due course" on the institute website. Specific dates for individual subjects are not yet listed.',
      confidence: 'high',
    },
    {
      item: 'Specific room and hall allocations',
      reason: 'No classroom or building allocations are specified in this general notice. These will be indicated on your downloaded hall ticket.',
      confidence: 'medium',
    },
    {
      item: 'Policy regarding medical absences or supplementary exams',
      reason: 'The notice does not state the procedure or documentation required if a student falls ill during the examination period.',
      confidence: 'medium',
    },
  ],
  plainLanguageExplanations: [
    {
      originalText: 'Pursuant to Academic Ordinance 14(B), a minimum aggregate attendance of 75% in each enrolled course is mandatory. Candidates falling short shall be summarily debarred from appearing in the respective examination without remission of fees.',
      explanation: 'Under university rule 14(B), you must attend at least 75% of classes in every subject. If your attendance is below 75%, you will not be allowed to take the exam and your exam fees will not be refunded.',
      sourceQuote: 'Pursuant to Academic Ordinance 14(B), a minimum aggregate attendance of 75% in each enrolled course is mandatory.',
      page: 1,
    },
    {
      originalText: 'Possession of mobile phones, smartwatches, digital devices, and programmable calculators inside the examination hall is strictly prohibited and shall be construed as malpractice under Regulation 22.',
      explanation: 'Do not bring smart devices, phones, or programmable calculators into the exam hall. Even having one on your person will be treated as cheating under Regulation 22.',
      sourceQuote: 'Possession of mobile phones, smartwatches, digital devices, and programmable calculators inside the examination hall is strictly prohibited and shall be construed as malpractice under Regulation 22.',
      page: 1,
    },
    {
      originalText: 'Notwithstanding any provision contained herein, the Controller of Examinations shall be the final authority in all matters pertaining to the conduct of examinations.',
      explanation: 'Regardless of any exceptions or general guidelines mentioned elsewhere, the Controller of Examinations has absolute final authority over all exam decisions.',
      sourceQuote: 'Notwithstanding any provision contained herein, the Controller of Examinations shall be the final authority in all matters pertaining to the conduct of examinations.',
      page: 1,
    },
  ],
  limitations: [
    'This analysis was generated from an official circular for demonstration purposes.',
    'Always verify important dates, fees, and ordinances directly with the NITK Controller of Examinations portal.',
    'AI-based extraction preserves original quotes for proof; review the full text for complete statutory details.',
  ],
  rawExtractedText: SAMPLE_DOCUMENT_TEXT,
};

export const SAMPLE_ANALYSIS = sampleAnalysis;

// Pre-bundled Telugu translations for offline sample demo
export const SAMPLE_TRANSLATIONS_TE: TranslatedData = {
  summary: [
    'నవంబర్ 15, 2026 నుండి ప్రారంభం కానున్న ఫాల్ టర్మ్ 2026 సెమిస్టర్ పరీక్షల గురించి NIT సూరత్కల్ కంట్రోలర్ ఆఫ్ ఎగ్జామినేషన్స్ నుండి అధికారిక నోటీసు.',
    'అన్ని రెగ్యులర్ యుజి మరియు పిజి విద్యార్థులు అక్టోబర్ 25, 2026 నాటికి పరీక్షలకు రిజిస్టర్ చేసుకుని ప్రామాణిక రుసుము ₹1,500 చెల్లించాలి.',
    'నవంబర్ 02, 2026 వరకు ₹500 ఆలస్య రుసుముతో (మొత్తం ₹2,000) రిజిస్ట్రేషన్ అనుమతించబడుతుంది.',
    'హాల్ టిక్కెట్లను నవంబర్ 10, 2026 నుండి విద్యార్థి పోర్టల్ నుండి డౌన్‌లోడ్ చేసుకోవచ్చు. ప్రింట్ చేసిన హాల్ టిక్కెట్‌తో పాటు భౌతిక ఐడి కార్డును తప్పనిసరిగా తీసుకెళ్లాలి.',
    'కనీసం 75% హాజరు తప్పనిసరి; 75% కంటే తక్కువ హాజరు ఉన్న విద్యార్థులు పరీక్ష రాయడానికి అనుమతించబడరు.',
  ],
  keyFacts: [
    { label: 'విద్యార్థి ఐడి అవసరం', value: 'చెల్లుబాటు అయ్యే భౌతిక ఇన్స్టిట్యూట్ ఐడి కార్డ్ (తప్పనిసరి)' },
    { label: 'ప్రామాణిక పరీక్ష రుసుము', value: '₹1,500 (ఆన్‌లైన్ విద్యార్థి పోర్టల్ ద్వారా చెల్లించాలి)' },
    { label: 'ఆలస్య రుసుము జరిమానా', value: '₹500 అదనపు జరిమానా (అక్టోబర్ 26 నుండి నవంబర్ 02 వరకు మొత్తం ₹2,000)' },
    { label: 'జారీ చేసిన అధికారి', value: 'డాక్టర్ రమేష్ కృష్ణమూర్తి, కంట్రోలర్ ఆఫ్ ఎగ్జామినేషన్స్' },
    { label: 'కనీస హాజరు పరిమితి', value: 'ప్రతి సబ్జెక్టులో కనీసం 75% సగటు హాజరు తప్పనిసరి' },
    { label: 'అధికారిక సంప్రదింపులు', value: 'exam-support@nitk.edu.in / Ext. 2245' },
  ],
  actionItems: [
    {
      title: 'పరీక్షల కోసం ఆన్‌లైన్ రిజిస్ట్రేషన్ పూర్తి చేయండి',
      description: 'విద్యార్థి పోర్టల్‌లోకి లాగిన్ అయి పరీక్ష రిజిస్ట్రేషన్ ఫారమ్‌ను పూరించండి. సమర్పించే ముందు అన్ని కోర్సు ఎంపికలు సరిగ్గా ఉన్నాయని నిర్ధారించుకోండి.',
    },
    {
      title: 'నిర్దేశించిన పరీక్ష రుసుము ₹1,500 చెల్లించండి',
      description: 'విద్యార్థి పోర్టల్ ద్వారా ₹1,500 రుసుమును ఆన్‌లైన్‌లో చెల్లించండి. రసీదును మీ వద్ద భద్రపరుచుకోండి.',
    },
    {
      title: 'దివ్యాంగుల సహాయం కోసం ఫారమ్-IV సమర్పించండి (అవసరమైతే)',
      description: 'రాయడానికి సహాయకుడు లేదా అదనపు సమయం అవసరమైన దివ్యాంగ విద్యార్థులు అక్టోబర్ 20 లోపు COE కార్యాలయానికి ఫారమ్-IV సమర్పించాలి.',
    },
    {
      title: 'భౌతిక హాల్ టిక్కెట్‌ను డౌన్‌లోడ్ చేసి ప్రింట్ చేయండి',
      description: 'నవంబర్ 10 తర్వాత పోర్టల్ నుండి హాల్ టిక్కెట్ డౌన్‌లోడ్ చేసుకోండి. ప్రింటెడ్ కాపీని మాత్రమే అనుమతిస్తారు; ఫోన్‌లో డిజిటల్ కాపీలు అనుమతించబడవు.',
    },
    {
      title: 'ఇన్స్టిట్యూట్ ఐడి కార్డ్ చెల్లుబాటు అయ్యేలా చూసుకోండి',
      description: 'మీ కాలేజీ ఐడి కార్డు స్పష్టమైన ఫోటోతో ఉందని నిర్ధారించుకోండి. ఒకవేళ పోయినట్లయితే వెంటనే కొత్తది తీసుకోండి.',
    },
    {
      title: 'కోర్సు హాజరు 75% కంటే ఎక్కువగా ఉందని నిర్ధారించుకోండి',
      description: 'ఆర్డినెన్స్ 14(B) ప్రకారం, 75% కంటే తక్కువ హాజరు ఉన్న విద్యార్థులు పరీక్షల నుండి బహిష్కరించబడతారు.',
    },
  ],
  deadlines: [
    { action: 'అన్ని రెగ్యులర్ UG & PG విద్యార్థుల కోసం పరీక్ష రిజిస్ట్రేషన్ పోర్టల్ ప్రారంభమవుతుంది' },
    { action: 'దివ్యాంగ అభ్యర్థులు సహాయం కోసం ఫారమ్-IV సమర్పించడానికి చివరి తేదీ' },
    { action: 'ఆలస్య జరిమానా లేకుండా సాధారణ రిజిస్ట్రేషన్ మరియు ఫీజు చెల్లింపునకు చివరి తేదీ (₹1,500)' },
    { action: '₹500 ఆలస్య రుసుముతో తుది గడువు (దీని తర్వాత దరఖాస్తులు స్వీకరించబడవు)' },
    { action: 'స్టూడెంట్ పోర్టల్ నుండి హాల్ టిక్కెట్లు డౌన్‌లోడ్ చేసుకోవడానికి అందుబాటులో ఉంటాయి' },
    { action: 'అన్ని విభాగాలలో ఎండ్-సెమిస్టర్ పరీక్షలు ప్రారంభమవుతాయి' },
  ],
};

// Pre-bundled Hindi translations for offline sample demo
export const SAMPLE_TRANSLATIONS_HI: TranslatedData = {
  summary: [
    '15 नवंबर 2026 से शुरू होने वाली फॉल टर्म 2026 एंड-सेमेस्टर परीक्षाओं के संबंध में एनआईटी सुरथकल परीक्षा नियंत्रक कार्यालय से आधिकारिक सूचना।',
    'सभी नियमित यूजी और पीजी छात्रों को 25 अक्टूबर 2026 तक परीक्षा पंजीकरण पूरा करना होगा और ₹1,500 का निर्धारित शुल्क जमा करना होगा।',
    '26 अक्टूबर से 2 नवंबर 2026 तक ₹500 के विलंब शुल्क (कुल ₹2,000) के साथ लेट रजिस्ट्रेशन की अनुमति है।',
    'हॉल टिकट 10 नवंबर 2026 से स्टूडेंट पोर्टल से डाउनलोड किए जा सकेंगे। परीक्षा हॉल में प्रिंटेड हॉल टिकट के साथ वैध संस्थान पहचान पत्र अनिवार्य है।',
    'प्रत्येक विषय में कम से कम 75% कुल उपस्थिति अनिवार्य है; 75% से कम उपस्थिति वाले छात्रों को परीक्षा देने की अनुमति नहीं होगी।',
  ],
  keyFacts: [
    { label: 'छात्र आईडी आवश्यकता', value: 'वैध भौतिक संस्थान आईडी कार्ड (प्रवेश के लिए अनिवार्य)' },
    { label: 'मानक परीक्षा शुल्क', value: '₹1,500 (ऑनलाइन स्टूडेंट पोर्टल के माध्यम से देय)' },
    { label: 'विलंब शुल्क जुर्माना', value: '₹500 अतिरिक्त जुर्माना (26 अक्टूबर से 02 नवंबर के बीच कुल ₹2,000)' },
    { label: 'जारीकर्ता प्राधिकारी', value: 'डॉ. रमेश कृष्णमूर्ति, परीक्षा नियंत्रक' },
    { label: 'न्यूनतम उपस्थिति सीमा', value: 'प्रत्येक पाठ्यक्रम में कम से कम 75% कुल उपस्थिति अनिवार्य' },
    { label: 'आधिकारिक संपर्क', value: 'exam-support@nitk.edu.in / Ext. 2245' },
  ],
  actionItems: [
    {
      title: 'परीक्षा के लिए ऑनलाइन पंजीकरण पूरा करें',
      description: 'छात्र पोर्टल पर लॉग इन करें और परीक्षा पंजीकरण फॉर्म भरें। सबमिट करने से पहले सभी चयनित विषयों की पुष्टि करें।',
    },
    {
      title: 'निर्धारित परीक्षा शुल्क ₹1,500 का भुगतान करें',
      description: 'स्टूडेंट पोर्टल के ऑनलाइन पेमेंट गेटवे से ₹1,500 शुल्क जमा करें। संदर्भ के लिए लेनदेन रसीद सुरक्षित रखें।',
    },
    {
      title: 'दिव्यांग सहायता के लिए फॉर्म-IV जमा करें (यदि लागू हो)',
      description: 'जिन दिव्यांग छात्रों को स्क्राइब या अतिरिक्त समय की आवश्यकता है, वे 20 अक्टूबर तक सीओई कार्यालय में फॉर्म-IV जमा करें।',
    },
    {
      title: 'हॉल टिकट डाउनलोड करें और प्रिंट निकालें',
      description: '10 नवंबर के बाद पोर्टल से हॉल टिकट डाउनलोड करें। प्रिंटेड कॉपी लेकर जाएं, मोबाइल में डिजिटल कॉपी मान्य नहीं होगी।',
    },
    {
      title: 'सुनिश्चित करें कि संस्थान आईडी कार्ड वैध है',
      description: 'जांचें कि आपका पहचान पत्र फटा न हो और फोटो स्पष्ट हो। आवश्यकता पड़ने पर तुरंत प्रशासन से संपर्क करें।',
    },
    {
      title: 'सुनिश्चित करें कि पाठ्यक्रम में उपस्थिति 75% से अधिक है',
      description: 'ऑर्डिनेंस 14(B) के अनुसार, 75% से कम उपस्थिति वाले छात्रों को सीधे परीक्षा से निष्कासित कर दिया जाएगा।',
    },
  ],
  deadlines: [
    { action: 'सभी नियमित छात्रों के लिए परीक्षा पंजीकरण पोर्टल खुलेगा' },
    { action: 'दिव्यांग छात्रों द्वारा फॉर्म-IV जमा करने की अंतिम तिथि' },
    { action: 'बिना विलंब शुल्क के सामान्य पंजीकरण की अंतिम तिथि (शुल्क: ₹1,500)' },
    { action: '₹500 विलंब शुल्क के साथ अंतिम कटऑफ (इसके बाद कोई फॉर्म स्वीकार नहीं होगा)' },
    { action: 'छात्र पोर्टल पर हॉल टिकट डाउनलोड के लिए उपलब्ध होंगे' },
    { action: 'सभी विभागों में एंड-सेमेस्टर परीक्षाएं शुरू होंगी' },
  ],
};
