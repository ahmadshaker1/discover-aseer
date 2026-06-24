import PrivacyPageLayout from "@/components/privacy/PrivacyPageLayout";
import { fetchPrivacyPolicyHtml } from "@/components/privacy/data";
import type { LocaleCode } from "@/lib/i18n/localized";
import { getTranslations } from "next-intl/server";

// Define localized content for the Privacy Policy
const privacyContent = {
  en: {
    title: "Privacy Policy",
    subtitle: "How the Aseer Development Authority protects your personal data",
    lastUpdated: "Last updated on 15/01/2025",
    sections: {
      intro: {
        title: "Introduction",
        content: [
          "Aseer Development Authority was established by Royal Decree No. 27719, dated 10/06/1439 AH. The Authority is organizationally linked to the Council of Ministers in accordance with the provisions of Article 3 of the Regulation of Regional and Cities Development Authorities issued by Cabinet Resolution No. 475, dated 07/05/1439 AH.",
          "Aseer Region Development Authority is concerned with achieving integrated regional development and ensuring effective coordination between development agencies to make Aseer a leading global tourist destination throughout the year. The Aseer Region Development Authority website is a website managed by the Authority and you can contact us through the available channels below:",
        ],
      },
      contact: {
        title: "Contact Information",
        subtitle: "You can contact the Authority through:",
        dept: "Data Management Office",
        phone: "+9666 23817966",
        email: "info@asda.gov.sa",
        address: "Abha, Aseer 62512",
      },
      dataCollected: {
        title: "What Personal Data is Collected",
        firstPartTitle: "1. Personal data collected and how it is collected:",
        items: [
          {
            title: "Identity Data",
            desc: "Full name, username or similar identifier, date of birth, gender, identification number (such as passport number, national identification number or residence number), and other specific identity data that might be needed.",
          },
          {
            title: "Contact Data",
            desc: "Spatial addresses, email address, and phone numbers.",
          },
          {
            title: "Geospatial and Geographical Data",
            desc: "This means, but is not limited to, the time zone, such as the country of the data subject and the city in which he lives, and the longitude and latitude of the endowment assets, and any relevant and related data that might be needed.",
          },
          {
            title: "Technical Data",
            desc: "Include, but are not limited to - Internet Protocol (IP) address, beneficiaries' login data, browser type and settings, types and versions of browser add-ons, information collected through cookies when visiting the site (Cookies), operating system, operating platform, crash reports, system activity, request history URL and other related technologies used by beneficiaries to access the site, or through other official channels.",
          },
        ],
      },
      purpose: {
        title: "Purpose of Collecting Personal Data",
        subtitle:
          "The collection of personal data from users/beneficiaries through the Discover Aseer website or any other communication channel is intended for several regulatory purposes, including:",
        points: [
          "Dealing with complaints and inquiries regarding the transactions and services provided.",
          "When submitting any external report to a third party on behalf of Discover Aseer or regarding any services provided to its stakeholders, the concealment of identities is ensured — without compromising the rights and interests of the personal data owner.",
          "Regular and periodic updating of protection procedures and controls that meet or exceed standard criteria.",
          "Strict procedures and measures to protect the security of information and technology it uses to prevent fraud and unauthorized entry into our systems.",
          "Monitoring and detecting potential violations and abuses when using the website or any of the official means and channels affiliated with the Authority.",
        ],
      },
      disclosure: {
        title: "Disclosing Personal Data",
        content: [
          "We will not disclose any personal data to any other party for any purpose.",
          "Or in the event of participation in the disclosure of any personal data with any other party, it will be dealt with in accordance with contractual obligations and the goal is to improve the service provided to beneficiaries, and it will be limited to the minimum.",
        ],
      },
      regulatory: {
        title: "Regulatory Justification",
        subtitle:
          "Your data will be collected and processed in accordance with the Personal Data Protection Law in the Kingdom. The regulatory justification we rely on to process this data is:",
        points: [
          "Your explicit consent, and you can withdraw your consent at any time, provided that it does not affect the processing operations carried out based on other regulatory justifications. To do so, you can contact the data management office at the entity, as shown below.",
          "If the processing is necessary to achieve the interest of the Authority by virtue of the Cabinet's decision to organize authorities and cities.",
          "In the event that the processing achieves a specific interest for you, and it is impossible or difficult to contact you.",
        ],
      },
      storage: {
        title: "Storage and Destruction of Data",
        content:
          "Your personal data is stored securely within the Kingdom at the headquarters or with a cloud computing service provider. These servers are protected with the best technologies in accordance with the policies and controls of the National Cybersecurity Authority and international standards to ensure that there is no unauthorized access and to reduce cyber risks. Personal data is not retained unless it is necessary according to regulatory justifications. Secure destruction of personal data is ensured if the owner of the personal data requests it, and if the purpose for which it was collected no longer exists, or if it was learned that the personal data is being processed in an irregular manner, necessary measures will be taken as a result.",
      },
      rights: {
        title: "Rights of Personal Data Owners",
        subtitle:
          "Under the Personal Data Protection Law, you have the following rights, which depend mainly on the purpose of collecting and processing personal data:",
        items: [
          {
            title: "Right to Know",
            desc: "The owner of the personal data has the right to know the methods of collecting personal data and the legal justification for collecting and processing it, how it is processed, stored and destroyed and to whom it will be disclosed. You can view all the details through the privacy policy or you can contact us on the data shown below.",
          },
          {
            title: "Right to Access Personal Data",
            desc: "The owner of the personal data has the right to access his data by submitting an access request, taking into account that the legal justification is either approval, the legitimate interest of the Authority, or the implementation of an agreement The personal data owner is a party to it, with emphasis on not harming the rights of others from exercising this right, such as intellectual property rights or trade secrets.",
          },
          {
            title: "The Right to Request Access to Personal Data",
            desc: "The personal data owner has the right to submit a request to access their data, taking into account that the legal justification is either approval, the legitimate interest of the Authority, or the implementation of an agreement to which the personal data owner is a party. The personal data is provided to its owner in a commonly used electronic format, provided that it is readable and clear. The personal data owner may be provided with a printed copy whenever possible. With emphasis on not harming the rights of others from exercising this right, such as intellectual property rights or trade secrets.",
          },
          {
            title: "The Right to Request Correction of Personal Data",
            desc: "The personal data owner has the right to request correction of their data that they deem incomplete, inaccurate, or incorrect, via e-mail. They will be notified via the same means within a period not exceeding 30 days from the date of the request. They also have the right to restrict the processing of their data for a period during which the accuracy of the data can be verified, provided that the restriction request does not conflict with the systems and regulations.",
          },
          {
            title: "The Right to Request the Destruction of Personal Data",
            desc: "The owner of personal data has the right to request the destruction of their personal data in specific circumstances, unless there is a regulatory text specifying the period of retention of personal data, or contractual requirements agreed to by the owner of personal data, provided that they do not negatively affect their rights or interests. The Authority automatically activates the right to destruction in the cases stipulated in the systems and regulations, such as its knowledge that personal data is being processed in a manner that violates the system.",
          },
          {
            title:
              "The Right to Withdraw Consent to the Processing of Personal Data",
            desc: "The owner of personal data has the right to withdraw their consent to the processing and withdraw it at any time by notifying the Authority through the specified means of communication, including the Authority taking the necessary measures to stop the processing and request the destruction of personal data from those to whom it has been disclosed in advance.",
          },
        ],
      },
      acceptance: {
        title: "Acceptance of the Privacy Policy",
        content:
          "You acknowledge that you have read this policy and agree to all its terms and conditions. Your use of the site means your acceptance of this policy and the terms and conditions that govern it.",
      },
      complaints: {
        title: "How to File a Complaint or Objection?",
        emailLabel: "Data Privacy Email",
        email: "Data-Privacy@asda.gov.sa",
        content:
          "In case of complaints or inquiries related to the privacy policy or handling of personal data, contact the email above. If you are not satisfied with our handling of the complaint or if we do not respond within seven business days from the date of receipt of the complaint, you can submit a complaint to the competent authority, which is the Saudi Data and Artificial Intelligence Authority.",
      },
      authority: {
        title:
          "Address of the Saudi Data and Artificial Intelligence Authority",
        country: "Kingdom of Saudi Arabia, Riyadh",
        websiteLabel: "Official Website",
        website: "sdaia.gov.sa",
        platformLabel: "National Data Governance Platform",
        platform: "Dgp.sdaia.gov.sa",
      },
    },
  },
  ar: {
    title: "سياسة الخصوصية",
    subtitle: "",
    lastUpdated: "تم تحديث سياسة الخصوصية هذه بتاريخ 15/01/2025",
    sections: {
      intro: {
        title: "مقدمة",
        content: [
          "أنشئت هيئة تطوير عسير بموجب الأمر السامي رقم 27719، وتاريخ 06/10/1439 هـ، وترتبط الهيئة تنظيمياً بموجب قرار مجلس الوزراء رقم 475 وتاريخ 05/07/1439هـ.",
          "تختص هيئة تطوير منطقة عسير عبر تحقيق التنمية الإقليمية المتكاملة وضمان التنسيق الفعال بين الجهات الإنمائية لجعل عسير وجهة سياحية عالمية رائدة طوال العام. ويعد موقع هيئة تطوير منطقة عسير موقعًا إلكترونيًا تتولى الهيئة إدارته ويمكنك التواصل معنا عن طريق القنوات المتاحة ادناه:",
        ],
      },
      contact: {
        title: "بيانات التواصل",
        subtitle: "يمكنكم التواصل مع الهيئة عن طريق:",
        dept: "مكتب إدارة البيانات",
        phone: "+9666 23817966",
        email: "info@asda.gov.sa",
        address: "أبها، عسير 62512",
      },
      dataCollected: {
        title: "البيانات الشخصية التي يتم جمعها وطرق جمعها والغرض منها",
        firstPartTitle: "أولاً: أنواع البيانات التي قد يتم جمعها",
        items: [
          {
            title: "بيانات الهوية",
            desc: "الاسم الرباعي، واسم المستخدم أو محدد الهوية المماثل، وتاريخ الميلاد، والجنس، ورقم تحديد الهوية (مثل رقم جواز السفر، أو رقم الهوية الوطنية أو رقم الإقامة)، وغيرها من البيانات المحددة للهوية التي قد تكون مطلوبة.",
          },
          {
            title: "بيانات الاتصال",
            desc: "العناوين المكانية وعنوان البريد الإلكتروني وأرقام الهواتف.",
          },
          {
            title: "البيانات الجيومكانية والجغرافية",
            desc: "يقصد بها على سبيل المثال لا الحصر - النطاق الزمني كدولة صاحب البيانات والمدينة التي يعيش فيها، وخطوط الطول والعرض للأصول الوقفية، وأي من البيانات ذات الصلة والعلاقة التي قد تكون مطلوبة.",
          },
          {
            title: "البيانات التقنية",
            desc: "تتضمن على سبيل المثال لا الحصر - عنوان بروتوكول الإنترنت (IP)، وبيانات تسجيل الدخول الخاصة بالمستفيدين، ونوع المتصفح وإعداداته، وأنواع وإصدارات المكونات الإضافية للمتصفح، والمعلومات التي تم جمعها من خلال ملفات تعريف الارتباط عند زيارة الموقع (Cookies)، ونظام التشغيل، ومنصة التشغيل، وتقارير الأعطال، ونشاط النظام، وتاريخ الطلب، عنوان (URL)، وغيرها من التقنيات المتعلقة التي يستخدمها المستفيدون للوصول إلى الموقع أو إلى الوسائل والقنوات الرسمية الأخرى.",
          },
        ],
      },
      purpose: {
        title: "ثانياً: الغرض من جمع البيانات",
        subtitle:
          "تهدف عملية جمع بيانات المستخدم / المستفيد الشخصية من خلال موقع اكتشف عسير أو أي وسيلة أخرى يتم التعامل من خلالها لعدة أغراض نظامية، وهي:",
        points: [
          "التعامل مع الشكاوى والاستفسارات فيما يتعلق بالتعاملات والخدمات المقدمة.",
          'في حين تقديم أي تقرير خارجي إلى جهة معينة بصفة "اكتشف عسير" أو عن أي خدمة تقدمها الجهة لمن تتعامل معهم، ومن غير أن يؤثر ذلك على حقوق ومصالح صاحب البيانات الشخصية، يتم ضمان إخفاء الهويات.',
          "التحديث المنتظم والدوري لإجراءات وضوابط الحماية التي تفي أو تزيد عن المعايير القياسية.",
          "الإجراءات والتدابير المشددة لحماية أمن المعلومات والتقنية التي تستخدمها للوقاية من عمليات الاحتيال والدخول غير مصرح به إلى أنظمتنا.",
          "رصد وكشف الانتهاكات والإساءات المحتملة عند استخدام الموقع أو أي من الوسائل والقنوات الرسمية المعتمدة.",
        ],
      },
      disclosure: {
        title: "كيف نفصح عن البيانات الشخصية؟",
        content: [
          "لن نفصح عن أي بيانات شخصية لأي طرف آخر لأي غرض.",
          "او في حال المشاركة في الإفصاح عن أي بيانات شخصية مع أي جهة أخرى، فيتم التعامل معها وفقا لارتباطات تعاقدية والهدف هو تحسين الخدمة المقدمة للمستفيدين، وستقتصر على الحد الأدنى من ذلك.",
        ],
      },
      regulatory: {
        title: "المسوغ النظامي لجمع ومعالجة البيانات الشخصية",
        subtitle:
          "سوف يتم جمع ومعالجة بياناتك وفقاً لنظام حماية البيانات الشخصية في المملكة، فإن المسوغ النظامي الذي نعتمد عليه لمعالجة هذه البيانات:",
        points: [
          "موافقتك الصريحة، ويمكنك العدول عن الموافقة في أي وقت، على ألا يؤثر ذلك على عمليات المعالجة التي تتم بناءً على مسوغات نظامية أخرى. وللقيام بذلك يمكنك التواصل من خلال بيانات التواصل الموضحة أدناه.",
          "إذا كانت المعالجة ضرورية لتحقيق مصلحة للهيئة بقرار مجلس الوزراء بتنظيم الهيئات والمدن.",
          "في حال كانت المعالجة تحقق مصلحة معينة لك ويكون من المستحيل أو الصعب الاتصال بك.",
        ],
      },
      storage: {
        title: "كيف نقوم بتخزين البيانات الشخصية واتلافها؟",
        content:
          "يتم تخزين بياناتك الشخصية داخل المملكة بشكل آمن، سواء في المقر أو لدى مقدم خدمات الحوسبة السحابية، وتكون هذه الخوادم محمية بأفضل التقنيات بما يتوافق مع سياسات وضوابط الهيئة الوطنية للأمن السيبراني والمعايير الدولية، وذلك لضمان عدم الدخول غير المصرح به والحد من المخاطر السيبرانية. ولا يتم الاحتفاظ بالبيانات الشخصية إلا إذا كان ذلك ضرورياً وفقاً لمسوغات نظامية. كما يتم الالتزام بإتلاف البيانات الشخصية في حال طلب صاحب البيانات ذلك، أو في حال انتفاء الغرض الذي جمعت من أجله، أو في حال تبين أن البيانات تتم معالجتها بطريقة غير نظامية، حيث تُتخذ التدابير اللازمة لمعالجة ذلك.",
      },
      rights: {
        title: "حقوق أصحاب البيانات الشخصية",
        subtitle:
          "بموجب نظام حماية البيانات الشخصية، فإن لديك الحقوق الآتية والتي تعتمد بشكل أساسي على الغرض من جمع ومعالجة البيانات الشخصية:",
        items: [
          {
            title: "الحق في العلم",
            desc: "يحق لصاحب البيانات الشخصية معرفة طرق جمع البيانات الشخصية والمسوغ النظامي لجمعها ومعالجتها، وكيفية معالجتها وحفظها وإتلافها ولمن سيتم الإفصاح عنها ويمكنك الاطلاع على كافة التفاصيل من خلال سياسة الخصوصية أو يمكنك التواصل معنا على البيانات الموضحة ادناه.",
          },
          {
            title: "الحق في الوصول إلى البيانات الشخصية",
            desc: "يحق لصاحب البيانات الشخصية الوصول إلى بياناته بتقديم طلب وصول إليها، مع مراعاة أن يكون المسوغ النظامي إما الموافقة، أو المصلحة المشروعة للهيئة، أو تنفيذ اتفاق يكون صاحب البيانات الشخصية طرفا فيه، مع التأكيد على عدم تضرر حقوق الغير من ممارسة هذا الحق مثل حقوق الملكية الفكرية أو الأسرار التجارية.",
          },
          {
            title: "الحق في طلب الحصول على البيانات الشخصية",
            desc: "يحق لصاحب البيانات الشخصية التقدم بطلب الحصول على بياناته، مع مراعاة أن يكون المسوغ النظامي إما الموافقة، أو المصلحة المشروعة للهيئة، أو تنفيذ اتفاق يكون صاحب البيانات الشخصية طرفا فيه. وتقدم البيانات الشخصية لصاحبها بصيغة إلكترونية شائعة الاستخدام على أن تكـون مقروءة وواضحة. وبـالإمكان تزويد صاحب البيانات الشخصية بنسخة مطبوعة متى ما كان ذلك ممكنا. مع التأكيد على عدم تضرر حقوق الغير من ممارسة هذا الحق مثل حقوق الملكية الفكرية، أو الأسرار التجارية.",
          },
          {
            title: "الحق في طلب تصحيح البيانات الشخصية",
            desc: "حق لصاحب البيانات الشخصية أن يطلب تصحيح بياناته التي يرى بأنها غير مكتملة، أو غير دقيقة أو غير صحيحة، وذلك عن طـريق البـريد الإلكتروني. وسيتم إشعـاره عبر الوسيلة ذاتها خلال مدة لا تتجاوز 30 يوما من تاريخ الطلب، كما يحق له تقييد معالجة بياناته لمدة حيث يمكن التحقق من خلالها من صحة البيانات على ألا يتعـارض طلب التقييد مع الأنظمة واللوائح.",
          },
          {
            title: "الحق في طلب إتلاف البيانات الشخصية",
            desc: "يحق لصاحب البيانات الشخصية أن يطلب إتلاف بياناته الشخصية في ظروف محددة نظاما ما لم يكن هناك نص نظامي يحدد مدة الاحتفاظ بالبيانات الشخصية، أو متطلبات تعاقدية وافق عليها صاحب البيانات الشخصية بشرط ألا تؤثر على حقوقه أو مصالحة سلبا، وتفعل الهيئة حق الإتلاف تلقائيا في الأحوال المنصوصة في الأنظمة واللوائح كعلمها بأن البيانات الشخصية تجري معالجتها بطريقة مخالفة للنظام.",
          },
          {
            title: "الحق في الرجوع عن الموافقة على معالجة البيانات الشخصية",
            desc: "يحق لصاحب البيانات الشخصية العدول عن موافقته على المعالجة وسحبها في أي وقت عبر إبلاغ الهيئة بذلك عن طريق وسائل التواصل المحددة، ومنها اتخاذ الهيئة الإجراءات اللازمة من إيقاف للمعالجة وطلب إتلاف البيانات الشخصية ممن تم الإفصاح لهم مسبقا.",
          },
        ],
      },
      acceptance: {
        title: "الموافقة على سياسة الخصوصية",
        content:
          "أنت تقر بأنك قد قرأت هذه السياسة وتوافق على جميع شروطها وأحكامها. استخدامك للموقع يعني موافقتك على هذه السياسة، والشروط والأحكام التي تحكمها.",
      },
      complaints: {
        title: "كيفية تقديم شكوى أو استفسار",
        emailLabel: "البريد الإلكتروني",
        email: "data-privacy@asda.gov.sa",
        content:
          "في حال وجود استفسارات أو شكاوى تتعلق بسياسة الخصوصية أو التعامل مع البيانات الشخصية يتم التواصل عبر البريد الإلكتروني الموضح أدناه. إن لم تكن راضياً عن معالجتنا للشكوى أو في حال عدم ردنا خلال سبعة أيام عمل من تاريخ استلام الشكوى، يمكنك تقديم شكوى إلى الجهة المختصة وهي الهيئة السعودية للبيانات والذكاء الاصطناعي.",
      },
      authority: {
        title: "عنوان الهيئة السعودية للبيانات والذكاء الاصطناعي",
        country: "المملكة العربية السعودية، الرياض",
        websiteLabel: "موقع الهيئة الرسمي",
        website: "sdaia.gov.sa",
        platformLabel: "منصة حوكمة البيانات الوطنية",
        platform: "Dgp.sdaia.gov.sa",
      },
    },
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const data = isArabic ? privacyContent.ar : privacyContent.en;
  const cmsHtml = await fetchPrivacyPolicyHtml(locale as LocaleCode);
  const tCommon = await getTranslations("common");

  return (
    <PrivacyPageLayout
      breadcrumbHome={tCommon("breadcrumbHome")}
      title={data.title}
      subtitle={data.subtitle}
      lastUpdated={data.lastUpdated}
      cmsHtml={cmsHtml}
      staticData={cmsHtml ? undefined : data}
      isArabic={isArabic}
    />
  );
}
