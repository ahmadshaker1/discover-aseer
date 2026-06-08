import { Link } from "@/i18n/navigation";

const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

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
    subtitle: "كيف تحمي هيئة تطوير منطقة عسير بياناتك الشخصية",
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

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden bg-[linear-gradient(359.31deg,#280048_43.01%,#3B016B_99.52%)] py-20 text-white md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-amber-500 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-12">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-readex">
            {data.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">
            {data.subtitle}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md text-white/80">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {data.lastUpdated}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-4xl px-6 pt-12 md:px-12">
        {/* Card wrapper with base 18px font size */}
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white p-6 shadow-xl dark:bg-neutral-900 md:p-10 text-[18px] leading-relaxed">
          {/* Section: Introduction */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.intro.title}
              </h2>
            </div>
            <div
              className="space-y-4 text-justify text-neutral-600 dark:text-neutral-300"
              style={{ fontFamily: ibm }}
            >
              {data.sections.intro.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Section: Contact Information */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.contact.title}
              </h2>
            </div>
            <p
              className="mb-4 text-neutral-600 dark:text-neutral-300"
              style={{ fontFamily: ibm }}
            >
              {data.sections.contact.subtitle}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100 dark:bg-neutral-800/50 dark:border-neutral-800"
                style={{ fontFamily: ibm }}
              >
                <span className="text-xs uppercase tracking-wider text-neutral-450 block mb-1">
                  {isArabic ? "اسم القسم/الفريق المختص" : "Relevant Department"}
                </span>
                <span className="font-semibold">
                  {data.sections.contact.dept}
                </span>
              </div>
              <div
                className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100 dark:bg-neutral-800/50 dark:border-neutral-800"
                style={{ fontFamily: ibm }}
              >
                <span className="text-xs uppercase tracking-wider text-neutral-455 block mb-1">
                  {isArabic ? "رقم الهاتف" : "Phone"}
                </span>
                <a
                  href={`tel:${data.sections.contact.phone.replace(/\s+/g, "")}`}
                  className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <span dir="ltr">{data.sections.contact.phone}</span>
                </a>
              </div>
              <div
                className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100 dark:bg-neutral-800/50 dark:border-neutral-800"
                style={{ fontFamily: ibm }}
              >
                <span className="text-xs uppercase tracking-wider text-neutral-455 block mb-1">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </span>
                <a
                  href={`mailto:${data.sections.contact.email}`}
                  className="font-semibold text-purple-600 dark:text-purple-400 hover:underline break-all"
                >
                  {data.sections.contact.email}
                </a>
              </div>
              <div
                className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100 dark:bg-neutral-800/50 dark:border-neutral-800"
                style={{ fontFamily: ibm }}
              >
                <span className="text-xs uppercase tracking-wider text-neutral-450 block mb-1">
                  {isArabic ? "العنوان" : "Address"}
                </span>
                <span className="font-semibold">
                  {data.sections.contact.address}
                </span>
              </div>
            </div>
          </section>

          {/* Section: Data Collected */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.dataCollected.title}
              </h2>
            </div>

            <h3
              className="mb-4 font-bold text-neutral-700 dark:text-neutral-300"
              style={{ fontFamily: ibm }}
            >
              {data.sections.dataCollected.firstPartTitle}
            </h3>

            <div className="space-y-6">
              {data.sections.dataCollected.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 font-bold text-xs mt-1">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800 dark:text-neutral-100 text-[19px]">
                      {item.title}
                    </h4>
                    <p
                      className="mt-1 text-neutral-650 dark:text-neutral-300 text-justify"
                      style={{ fontFamily: ibm }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Purpose of collection */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.purpose.title}
              </h2>
            </div>
            <p
              className="mb-4 text-neutral-600 dark:text-neutral-300 text-justify"
              style={{ fontFamily: ibm }}
            >
              {data.sections.purpose.subtitle}
            </p>

            <ul className="space-y-3">
              {data.sections.purpose.points.map((point, idx) => (
                <li key={idx} className="flex gap-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-amber-500 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span
                    className="text-neutral-600 dark:text-neutral-300 text-justify"
                    style={{ fontFamily: ibm }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Disclosing Personal Data */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 10.742l8.99-4.495m0 0l-8.99-4.499m8.99 4.497L8.684 13.24M6.5 18a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm11.5-6a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0 12a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.disclosure.title}
              </h2>
            </div>
            <div
              className="space-y-4 text-justify text-neutral-600 dark:text-neutral-300"
              style={{ fontFamily: ibm }}
            >
              {data.sections.disclosure.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Section: Regulatory Justification */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.regulatory.title}
              </h2>
            </div>
            <p
              className="mb-4 text-neutral-600 dark:text-neutral-300 text-justify"
              style={{ fontFamily: ibm }}
            >
              {data.sections.regulatory.subtitle}
            </p>

            <ul className="space-y-4">
              {data.sections.regulatory.points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex gap-4 rounded-2xl bg-neutral-50 p-4 border border-neutral-100 dark:bg-neutral-800/30 dark:border-neutral-800/50"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 font-bold text-xs mt-1">
                    {idx + 1}
                  </div>
                  <span
                    className="text-neutral-600 dark:text-neutral-300 text-justify"
                    style={{ fontFamily: ibm }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Storage and Destruction */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.storage.title}
              </h2>
            </div>
            <p
              className="text-neutral-600 dark:text-neutral-300 text-justify"
              style={{ fontFamily: ibm }}
            >
              {data.sections.storage.content}
            </p>
          </section>

          {/* Section: Rights */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.rights.title}
              </h2>
            </div>
            <p
              className="mb-6 text-neutral-600 dark:text-neutral-300 text-justify"
              style={{ fontFamily: ibm }}
            >
              {data.sections.rights.subtitle}
            </p>

            <div className="space-y-6">
              {data.sections.rights.items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 dark:border-neutral-800/80 dark:bg-neutral-850/20"
                >
                  <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2 text-[19px]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[10px] font-bold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                      {idx + 1}
                    </span>
                    {item.title}
                  </h4>
                  <p
                    className="text-neutral-600 dark:text-neutral-300 text-justify"
                    style={{ fontFamily: ibm }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Acceptance */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.acceptance.title}
              </h2>
            </div>
            <p
              className="text-neutral-600 dark:text-neutral-300 text-justify"
              style={{ fontFamily: ibm }}
            >
              {data.sections.acceptance.content}
            </p>
          </section>

          {/* Section: Complaints */}
          <section className="mb-10 border-b border-neutral-100 pb-10 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.complaints.title}
              </h2>
            </div>
            <p
              className="text-neutral-600 dark:text-neutral-300 text-justify mb-4"
              style={{ fontFamily: ibm }}
            >
              {data.sections.complaints.content}
            </p>
            <div
              className="rounded-2xl bg-amber-500/5 p-4 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              style={{ fontFamily: ibm }}
            >
              <span className="font-semibold text-neutral-600 dark:text-neutral-350">
                {data.sections.complaints.emailLabel}:
              </span>
              <a
                href={`mailto:${data.sections.complaints.email}`}
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline break-all"
              >
                {data.sections.complaints.email}
              </a>
            </div>
          </section>

          {/* Section: Authority Address */}
          <section className="mb-2">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-bold md:text-2xl">
                {data.sections.authority.title}
              </h2>
            </div>

            <div className="space-y-4">
              <p
                className="text-neutral-600 dark:text-neutral-300"
                style={{ fontFamily: ibm }}
              >
                {data.sections.authority.country}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={`https://${data.sections.authority.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-neutral-50 p-4 border border-neutral-100 dark:bg-neutral-800/50 dark:border-neutral-800 hover:bg-neutral-100 transition"
                  style={{ fontFamily: ibm }}
                >
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-450 block mb-1">
                      {data.sections.authority.websiteLabel}
                    </span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {data.sections.authority.website}
                    </span>
                  </div>
                  <svg
                    className="h-5 w-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>

                <a
                  href={`https://${data.sections.authority.platform}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-neutral-50 p-4 border border-neutral-100 dark:bg-neutral-800/50 dark:border-neutral-800 hover:bg-neutral-100 transition"
                  style={{ fontFamily: ibm }}
                >
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-455 block mb-1">
                      {data.sections.authority.platformLabel}
                    </span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {data.sections.authority.platform}
                    </span>
                  </div>
                  <svg
                    className="h-5 w-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
