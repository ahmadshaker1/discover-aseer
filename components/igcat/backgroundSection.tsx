export default function IGCatBackgroundSection() {
  return (
    <>
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* قسم النص (يمين الشاشة في الكمبيوتر، وفوق في الجوال) */}
            <div className="flex flex-col items-start text-start">
              {/* التاق (لقب) */}
              <span className="mb-6 inline-block rounded-full border border-primary bg-primary/10 px-5 py-1 text-[14px] font-bold text-primary">
                لقب
              </span>

              <h2 className="mb-6 text-[28px] font-bold text-foreground md:text-[36px]">
                أول منطقة طهي عالمية خارج أوروبا
              </h2>

              <p className="mb-8 text-justify text-[15px] font-bold leading-loose text-muted-foreground">
                في سبتمبر ٢٠٢٢م  تم الإعلان بفوز عسير بلقب "منطقة فنون الطهي
                العالمية 2024م"، وبذلك تكون أول منطقة من خارج قارة أوروبا تفوز
                باللقب الذي يمنحه المعهد الدولي لفن الطهي والثقافة والفنون
                والسياحة (IGCAT) للمناطق التي انضمت إلى المنصة، واستوفت المعايير
                التي طورها المعهد، التي تتضمن العمل عبر قطاعات التنمية
                الاقتصادية، والثقافية، والاجتماعية، والبيئية عن طريق مجال فنون
                الطهي؛ لدعم التنمية الإقليمية المستدامة، وتوّجت بذلك من قِبل
                رئيس المعهد، ديان دود في حفلٍ رسمي أُقيم في مدينة تورينو
                الإيطالية في 24 سبتمبر 2022  ويأتي هذا الفوز بعد أن زارت لجنة
                تحكيم من خبراء المعهد المنطقة خلال الفترة (27 فبراير-1 مارس
                2022) والتقت بأصحاب المصلحة المحليين، لتقييم استعداد منطقة عسير
                لحمل اللقب، وعكست هذه الزيارة جهود المنطقة في دعم التنوع الثقافي
                والغذائي المحلي، وسعيها لضمان التنوع البيولوجي الإقليمي وحماية
                البيئة، والحفاظ على التراث والمعارف التقليدية، إضافةً إلى تمكين
                الأجيال الشابة بإبتكار منتجات وخدمات مميزه لجذب السياحة
                المستدامة.
              </p>

              {/* شعار هيئة فنون الطهي */}
              <div className="mt-2 flex flex-col items-center self-end sm:self-start">
                <img
                  src="/assets/igcat/moc.svg fill.png"
                  alt="هيئة فنون الطهي"
                  className="h-16 object-contain "
                />
                <p className="mb-2 mt-2 text-[16px] font-bold text-foreground">
                  تحت إشراف هيئة فنون الطهي
                </p>
                {/* ضع مسار الشعار هنا */}
              </div>
            </div>

            {/* قسم الصورة (يسار الشاشة) */}
            <div className="w-full rounded-3xl overflow-hidden shadow-lg">
              {/* ضع مسار الصورة هنا */}
              <img
                src="/assets/igcat/image1.jpg"
                alt="تحضير الطعام"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثاني: عسير منطقة طهي (خلفية رمادية) */}
      {/* ========================================== */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* قسم الصورة (يمين الشاشة في الكمبيوتر، وتحت في الجوال) */}
            <div className="w-full rounded-3xl overflow-hidden shadow-lg order-2 lg:order-1">
              {/* ضع مسار الصورة هنا */}
              <img
                src="/assets/igcat/foodimage.png"
                alt="أطباق عسير"
                className="w-full h-full object-cover"
              />
            </div>

            {/* قسم النص (يسار الشاشة في الكمبيوتر، وفوق في الجوال) */}
            <div className="flex flex-col items-start text-start order-1 lg:order-2">
              <h2 className="mb-6 text-[28px] font-bold text-foreground md:text-[36px]">
                عسير منطقة طهي عالمية 2024
              </h2>

              <p className="mb-8 text-justify text-[15px] font-bold leading-loose text-muted-foreground">
                يُمنح لقب "منطقة فنون الطهي العالمية" من قِبل المعهد الدولي لفن
                الطهي والثقافة والفنون (IGCAT)، ويُعدّ اعترافًا بالمناطق التي
                تلتزم بالحفاظ على التراث الثقافي وتطوير السياحة. تُمنح هذه
                الجائزة للمناطق التي تعمل على تعزيز التنوع الثقافي والبيئي، ودعم
                المجتمع المحلي، وتمكين الأجيال الجديدة من خلال الابتكار الطهوي
                وتطوير الخدمات السياحية المتكاملة.
              </p>

              {/* الشعارات (IGCAT وغيرها) */}
              <div className="flex flex-wrap gap-6 mb-8 w-full justify-start items-center">
                {/* ضع مسارات الشعارات هنا */}

                <img
                  src="/assets/igcat/award.svg.png"
                  alt="World Region of Gastronomy"
                  className="h-16 object-contain"
                />
                <img
                  src="/assets/igcat/9e1b9b83056d640d601d3203a4c278eff8285e6b.png"
                  alt="IGCAT"
                  className="h-16 object-contain"
                />
              </div>

              {/* الزر البنفسجي */}
              <button className="rounded-full bg-primary px-12 py-3 text-[16px] font-bold text-primary-foreground shadow-md transition-opacity hover:opacity-90">
                الكتيب
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
