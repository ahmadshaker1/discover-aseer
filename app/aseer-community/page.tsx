import PageBanner from "@/components/PageBanner/PageBanner";

const AseerCommunityPage = () => {
  return (
    <div className="flex w-full flex-col">
      <PageBanner
        breadcrumbs={[
          { label: "مجتمع عسير" },
          { label: "الصفحة الرئيسية", href: "/" },
        ]}
        title="مجتمع عسير"
        subtitle="قصص وعادات وتقاليد المجتمع العسيري."
        backgroundImage="/assets/experiences/experiences.png"
      />

      <section className="bg-[#f6f6f6] px-4 py-14 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1120px] space-y-10" dir="rtl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#2A0A44]">شكلان عسير</h2>
            <p className="mx-auto mt-3 max-w-[760px] text-sm leading-7 text-[#666]">
              لكل قرية ومجتمع في عسير طابعه الخاص، لكن يجمعهم تراث غني وروح الضيافة
              الأصيلة.
            </p>
          </div>

          <article className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="relative h-[280px] w-full sm:h-[420px]">
              <img
                src="/assets/experiences/experiences.png"
                alt="حياة مزدهرة"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 right-0 p-6 text-right text-white sm:max-w-[55%]">
                <h3 className="text-2xl font-bold">حياة مزدهرة</h3>
                <p className="mt-2 text-sm leading-7 text-white/90">
                  تتجسد حياة المجتمع العسيري في الفعاليات التراثية واللقاءات الاجتماعية
                  التي تنقل تاريخ المنطقة للأجيال الجديدة.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default AseerCommunityPage;
