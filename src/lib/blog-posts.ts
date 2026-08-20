export interface BlogPost {
  slug: string;
  dateEn: string;
  dateNe: string;
  authorEn: string;
  authorNe: string;
  image: string;
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  contentEn: string[];
  contentNe: string[];
}

export const posts: BlogPost[] = [
  {
    slug: 'safety-protocols-on-multi-story-sites',
    dateEn: 'July 15, 2025',
    dateNe: 'जुलाई १५, २०२५',
    authorEn: 'Sajilo Digital Team',
    authorNe: 'सजिलो डिजिटल टोली',
    image: '/assets/images/services/building-construction.webp',
    titleEn: 'Safety Protocols on Multi-Story Sites',
    titleNe: 'बहुतले साइटहरूमा सुरक्षा प्रोटोकल',
    excerptEn: 'How structured PPE policies and site supervision reduce incidents.',
    excerptNe: 'संरचित PPE नीति र साइट पर्यवेक्षणले दुर्घटना कसरी घटाउँछ।',
    contentEn: [
      'Construction sites with multiple active floors carry higher risk than single-level projects. Without structured safety protocols, the probability of incidents increases significantly.',
      'A dedicated safety officer should be present on every multi-story site. Their role includes daily inspections, PPE compliance checks, and coordination between teams working at different elevations.',
      'PPE policies must be enforced consistently. Hard hats, safety harnesses, reflective vests, and steel-toe boots are non-negotiable on multi-story sites. Regular training reinforces compliance.',
      'Fall protection systems, including guardrails, safety nets, and personal fall arrest systems, must be installed before work begins at any elevation above two meters.',
      'Communication between ground crews and upper-floor teams is critical. Standardized hand signals, radio protocols, and clear signage prevent miscommunication that leads to accidents.',
      'A disciplined safety program does not slow progress. It prevents costly delays, reduces insurance claims, and protects the workforce that drives project delivery.',
    ],
    contentNe: [
      'बहुतले सक्रिय तल्लाहरू भएका निर्माण साइटहरूमा एकतले परियोजनाभन्दा बढी जोखिम हुन्छ। संरचित सुरक्षा प्रोटोकल बिना, दुर्घटनाको सम्भावना उल्लेखनीय रूपमा बढ्छ।',
      'हरेक बहुतले साइटमा एक समर्पित सुरक्षा अधिकारी उपस्थित हुनुपर्छ। उनको भूमिकामा दैनिक निरीक्षण, PPE अनुपालन जाँच, र विभिन्न उचाइमा काम गर्ने टोलीहरू बीच समन्वय समावेश छ।',
      'PPE नीतिहरू लगातार लागू गर्नुपर्छ। बहुतले साइटहरूमा हेलमेट, सेफ्टी हार्नेस, रिफ्लेक्टिभ भेस्ट, र स्टील-ट बुटहरू अपरिहार्य छन्। नियमित तालिमले अनुपालन सुदृढ गर्छ।',
      'फल सुरक्षा प्रणालीहरू, जसमा गार्डरेल, सेफ्टी नेट, र व्यक्तिगत फल अरेस्ट सिस्टम समावेश छन्, दुई मिटरभन्दा माथिको उचाइमा काम सुरु हुनुअघि स्थापना गर्नुपर्छ।',
      'जमिनका क्रुहरू र माथिल्लो तल्लाका टोलीहरू बीच सञ्चार महत्त्वपूर्ण छ। मानकीकृत हात संकेत, रेडियो प्रोटोकल, र स्पष्ट संकेतले दुर्घटना निम्त्याउने गलतफहमी रोक्छ।',
      'अनुशासित सुरक्षा कार्यक्रमले प्रगति ढिलो गर्दैन। यसले महँगो ढिलाइ रोक्छ, बीमा दावी घटाउँछ, र परियोजना वितरण चलाउने जनशक्तिलाई जोगाउँछ।',
    ],
  },
  {
    slug: 'quality-control-in-bridge-construction',
    dateEn: 'June 28, 2025',
    dateNe: 'जुन २८, २०२५',
    authorEn: 'Sajilo Digital Team',
    authorNe: 'सजिलो डिजिटल टोली',
    image: '/assets/images/services/bridges-structures.webp',
    titleEn: 'Quality Control in Bridge Construction',
    titleNe: 'पुल निर्माणमा गुणस्तर नियन्त्रण',
    excerptEn: 'QA/QC practices that ensure long-lasting civil structures.',
    excerptNe: 'दीर्घकालीन सिविल संरचना सुनिश्चित गर्ने QA/QC अभ्यास।',
    contentEn: [
      'Bridge construction demands rigorous quality assurance and quality control at every phase. Unlike standard buildings, bridges must withstand dynamic loads, environmental exposure, and decades of continuous use.',
      'Material testing begins before construction. Concrete mix designs are verified through cube tests, and steel reinforcement is checked for tensile strength, chemical composition, and mill certificates.',
      'During execution, RCC work requires careful rebar placement, proper cover maintenance, and controlled concrete pouring. Vibration and curing protocols prevent honeycombing and structural weaknesses.',
      'Post-construction testing includes load testing, deflection measurement, and non-destructive testing of critical joints and connections. These verify that the structure meets design specifications.',
      'Documentation is a core part of QA/QC. Every batch of concrete, every weld, and every inspection is recorded. This documentation supports handover, maintenance planning, and regulatory compliance.',
      'A bridge built with disciplined quality control serves the community for generations. Cutting corners today creates expensive repairs tomorrow.',
    ],
    contentNe: [
      'पुल निर्माणले हरेक चरणमा कडा गुणस्तर आश्वासन र गुणस्तर नियन्त्रणको माग गर्छ। सामान्य भवनभन्दा फरक, पुलहरूले गतिशील भार, वातावरणीय जोखिम, र दशकौंको निरन्तर प्रयोग सहनुपर्छ।',
      'सामग्री परीक्षण निर्माण अघि सुरु हुन्छ। कंक्रीट मिक्स डिजाइनहरू क्युब टेस्टमा प्रमाणित गरिन्छ, र स्टील रिइन्फोर्समेन्टको तन्य शक्ति, रासायनिक संरचना, र मिल प्रमाणपत्र जाँचिन्छ।',
      'कार्यान्वयनको क्रममा, RCC कार्यले सावधानपूर्वक रिबार राख्ने, उचित कभर कायम राख्ने, र नियन्त्रित कंक्रीट डाल्ने काम गर्छ। भाइब्रेसन र क्युरिङ प्रोटोकलले हनीकम्बिङ र संरचनात्मक कमजोरी रोक्छ।',
      'निर्माण-पछिको परीक्षणमा लोड टेस्ट, डिफ्लेक्सन मापन, र महत्त्वपूर्ण जोइन्ट र कनेक्सनको गैर-विनाशकारी परीक्षण समावेश छ। यीले संरचना डिजाइन विनिर्देशन पूरा गर्छ भनी प्रमाणित गर्छन्।',
      'दस्तावेज QA/QC को मूल भाग हो। हरेक ब्याच कंक्रीट, हरेक वेल्ड, र हरेक निरीक्षण रेकर्ड गरिन्छ। यो दस्तावेजले हस्तान्तरण, मर्मत योजना, र नियामक अनुपालनलाई सहयोग गर्छ।',
      'अनुशासित गुणस्तर नियन्त्रणमा निर्माण गरिएको पुलले समुदायलाई पुस्तौंसम्म सेवा गर्छ। आज छोटकरी गर्नु भोलि महँगो मर्मत सिर्जना गर्छ।',
    ],
  },
  {
    slug: 'modern-equipment-for-efficient-earthwork',
    dateEn: 'June 10, 2025',
    dateNe: 'जुन १०, २०२५',
    authorEn: 'Sajilo Digital Team',
    authorNe: 'सजिलो डिजिटल टोली',
    image: '/assets/images/services/roads-infrastructure.webp',
    titleEn: 'Modern Equipment for Efficient Earthwork',
    titleNe: 'कुशल माटो कार्यका लागि आधुनिक उपकरण',
    excerptEn: 'Choosing the right fleet for terrain and project scope.',
    excerptNe: 'भूभाग र परियोजना कार्यक्षेत्रका लागि सही बेडा छनोट।',
    contentEn: [
      'Earthwork is the foundation of every construction project. The equipment selected for excavation, grading, and compaction directly affects timeline, cost, and final quality.',
      'Modern excavators with GPS-guided grading systems achieve precision that manual methods cannot match. They reduce material waste and speed up cut-and-fill operations.',
      'Roller compactors are essential for achieving specified density in subgrade and base layers. Choosing the right compactor depends on soil type, layer thickness, and project specifications.',
      'Tipper trucks and water tankers support the earthwork chain. Timely material haulage and dust control keep sites productive and compliant with environmental standards.',
      'Equipment matching to terrain is critical. Hilly terrain requires different machinery configurations than flat sites. Understanding slope conditions, access routes, and soil characteristics guides fleet selection.',
      'A well-planned equipment fleet reduces idle time, minimizes fuel consumption, and keeps earthwork operations on schedule.',
    ],
    contentNe: [
      'माटो कार्य हरेक निर्माण परियोजनाको आधार हो। उत्खनन, ग्रेडिङ, र कम्प्याक्सनका लागि छानिएको उपकरणले समयसारणी, लागत, र अन्तिम गुणस्तरला सिधै प्रभाव पार्छ।',
      'GPS-निर्देशित ग्रेडिङ प्रणाली भएका आधुनिक एक्स्काभेटरहरूले म्यानुअल विधिले मिलाउन नसक्ने सटीकता हासिल गर्छन्। यीले सामग्री अपव्य घटाउँछन् र कट-एण्ड-फिल सञ्चालन छिटो बनाउँछन्।',
      'रोलर कम्प्याक्टरहरू सबग्रेड र आधार तहमा निर्धारित घनत्व हासिल गर्न आवश्यक छन्। सही कम्प्याक्टर छनोट माटोको प्रकार, तहको मोटाइ, र परियोजना विनिर्देशनमा निर्भर गर्छ।',
      'टिपर ट्रक र वाटर ट्याङ्करले माटो कार्य श्रृंखलालाई सहयोग गर्छन्। समयमै सामग्री ढुवानी र धुलो नियन्त्रणले साइटहरूलाई उत्पादनशील र वातावरणीय मापदण्डसँग अनुपालन राख्छ।',
      'भूभागसँग उपकरण मिलान महत्त्वपूर्ण छ। पहाडी भूभागलाई सपाट साइटभन्दा फरक मेसिनरी कन्फिगरेसन चाहिन्छ। ढलान अवस्था, पहुँच मार्ग, र माटो विशेषता बुझ्नाले बेडा छनोटमा मार्गदर्शन गर्छ।',
      'राम्रोसँग योजना बनाइएको उपकरण बेडाले निष्क्रिय समय घटाउँछ, इन्धन खपत न्यूनीकरण गर्छ, र माटो कार्य सञ्चालनलाई समयसारणीमा राख्छ।',
    ],
  },
  {
    slug: 'excavation-and-earthwork-planning-for-hilly-terrain',
    dateEn: 'January 22, 2026',
    dateNe: 'जनवरी २२, २०२६',
    authorEn: 'Sajilo Digital Team',
    authorNe: 'सजिलो डिजिटल टोली',
    image: '/assets/images/services/roads-infrastructure.webp',
    titleEn: 'Excavation and Earthwork Planning for Hilly Terrain',
    titleNe: 'पहाडी भूभागका लागि उत्खनन र माटो कार्य योजना',
    excerptEn: 'Pre-planned cut-and-fill strategy, access logistics, and equipment sequencing for hilly sites.',
    excerptNe: 'पहाडी साइटहरूका लागि पूर्व-योजना बनाइएको कट-एण्ड-फिल रणनीति, पहुँच रसद, र उपकरण क्रमबद्धता।',
    contentEn: [
      'Earthwork in hilly terrain requires pre-planned cut-and-fill strategy, access logistics, and equipment sequencing. Without careful planning, slopes become unstable and costs escalate quickly.',
      'Before excavation starts, teams should map slope conditions, identify unstable zones, and define temporary drainage and spoil disposal plans. Geological surveys inform every decision.',
      'During execution, benching, controlled excavation depth, and compaction in thin layers help reduce settlement and slope failures. Retaining and protection works should be integrated early.',
      'Access roads for equipment and material delivery must be designed for the terrain. Steep gradients require switchbacks, proper drainage, and surface treatment to maintain access throughout the project.',
      'A disciplined earthwork plan minimizes rework, controls cost, and keeps downstream activities on schedule.',
      'Working with the terrain rather than against it produces better outcomes. Understanding soil mechanics, water behavior, and slope stability is essential for safe and efficient earthwork in hilly regions.',
    ],
    contentNe: [
      'पहाडी भूभागमा माटो कार्यले पूर्व-योजना बनाइएको कट-एण्ड-फिल रणनीति, पहुँच रसद, र उपकरण क्रमबद्धता चाहिन्छ। सावधानपूर्वक योजना बिना, ढलानहरू अस्थिर हुन्छन् र लागत छिटो बढ्छ।',
      'उत्खनन सुरु हुनुअघि, टोलीहरूले ढलान अवस्था म्याप गर्नुपर्छ, अस्थिर क्षेत्रहरू पहिचान गर्नुपर्छ, र अस्थायी जलनिकास र मलबा निपटान योजना परिभाषित गर्नुपर्छ। भू-वैज्ञानिक सर्वेक्षणले हरेक निर्णयमा मार्गदर्शन गर्छ।',
      'कार्यान्वयनको क्रममा, बेन्चिङ, नियन्त्रित उत्खनन गहिराइ, र पातलो तहमा कम्प्याक्सनले सेटलमेन्ट र ढलान असफलता घटाउन मद्दत गर्छ। रिटेनिङ र सुरक्षा कार्यहरू प्रारम्भमै एकीकृत गर्नुपर्छ।',
      'उपकरण र सामग्री वितरणका लागि पहुँच सडकहरू भूभागका लागि डिजाइन गर्नुपर्छ। खडा ढलानलाई स्विचब्याक, उचित जलनिकास, र सतह उपचार चाहिन्छ ताकि परियोजना भरि पहुँच कायम रहोस्।',
      'अनुशासित माटो कार्य योजनाले पुनर्कार्य घटाउँछ, लागत नियन्त्रण गर्छ, र पछिल्ला गतिविधिहरूलाई समयसारणीमा राख्छ।',
      'भूभागसँग काम गर्नु विपरीतमा काम गर्नुभन्दा राम्रो परिणाम दिन्छ। माटो यान्त्रिकी, पानीको व्यवहार, र ढलान स्थिरता बुझ्नु पहाडी क्षेत्रमा सुरक्षित र कुशल माटो कार्यका लागि आवश्यक छ।',
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
