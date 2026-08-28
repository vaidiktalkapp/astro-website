'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Gem,
  Shield,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

type Report = {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  eyebrow: string;
  features: string[];
};

export default function FreeReportsPage() {
  const { t } = useTranslation();

  const reports: Report[] = [
    {
      title: 'Kaal Sarp Yoga',
      description:
        'Determine if your chart has the Kaal Sarp Dosha and identify its type and impact.',
      icon: Shield,
      href: '/free-reports/kaal-sarp',
      eyebrow: 'KARMIC ANALYSIS',
      features: [
        'Automatic Type Detection',
        'House Placement Impact',
        'Practical Remedies',
      ],
    },
    {
      title: 'Gemstone Recommendation',
      description:
        'Find the perfect Life, Lucky, and Fortune stones tailored to your birth chart.',
      icon: Gem,
      href: '/free-reports/gemstone',
      eyebrow: 'PLANETARY GUIDANCE',
      features: [
        'Life & Fortune Stones',
        'Metal & Finger Analysis',
        'Wear & Care Guide',
      ],
    },
    {
      title: 'Sade Sati Analysis',
      description:
        'Detailed analysis of Shani’s influence on your Moon sign and current transit phase.',
      icon: Zap,
      href: '/free-reports/sade-sati',
      eyebrow: 'SATURN TRANSIT',
      features: [
        'Phase Detection (Charan)',
        '120-Year Lifetime Map',
        'Saturn Transit Guide',
      ],
    },
  ];

  return (
    <main className="free-reports-page min-h-screen bg-[#fbf7f0] text-[#2c211a]">

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');

        .free-reports-page {
          font-family: 'DM Sans', sans-serif;
        }

        .free-reports-page .display-font {
          font-family: 'Playfair Display', Georgia, serif;
        }

        .free-reports-page * {
          box-sizing: border-box;
        }

        .free-reports-page ::selection {
          background: #7d250f;
          color: #ffffff;
        }
      `}</style>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-[#eadfce] bg-[#fcf8f1]">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-[180px] -top-[210px] h-[600px] w-[600px] rounded-full border border-[#b9873c]/10" />

        <div className="pointer-events-none absolute -right-[100px] -top-[125px] h-[450px] w-[450px] rounded-full border border-[#b9873c]/10" />

        <div className="mx-auto max-w-[1380px] px-6 lg:px-10">

          <div className="grid items-center gap-8 py-4 lg:grid-cols-[1fr_400px] lg:gap-16 lg:py-4">

            {/* =====================================================
                HERO LEFT
            ===================================================== */}

            <div className="relative z-10 max-w-[720px]">

              <div className="mb-4 flex items-center gap-3">

                <span className="h-px w-10 bg-[#ae762a]" />

                <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8c5719]">
                  {t('free_reports.vedic_knowledge_hub')}
                </span>

                <span className="text-[#b57b2d]">
                  ✦
                </span>

                <span className="h-px w-6 bg-[#ae762a]" />

              </div>

              <h1 className="display-font text-[45px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#671d0b] sm:text-[52px] lg:text-[60px]">

                {t('free_reports.free_astrology')}

                <br />

                <span className="italic font-medium text-[#b37a2c]">
                  {t('free_reports.reports')}
                </span>

              </h1>

              <p className="mt-4 max-w-[650px] text-[18px] font-medium leading-7 text-[#4a3e35]">
                {t(
                  'free_reports.access_our_high_precision_vedi'
                )}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">

                <Link
                  href="/free-reports/history"
                  className="group inline-flex h-11 items-center gap-3 rounded-full border border-[#d9c6ad] bg-white px-6 text-[13px] font-semibold text-[#5e3826] shadow-[0_5px_18px_rgba(78,49,29,0.04)] transition-all duration-300 hover:border-[#a97028] hover:bg-[#fffaf3]"
                >

                  <Clock3
                    size={17}
                    strokeWidth={1.6}
                    className="text-[#a66b22]"
                  />

                  {t('free_reports.my_reports')}

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Link>

                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b7766]">

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ddc8a8] bg-[#fffaf2]">

                    <Check
                      size={13}
                      className="text-[#9c6825]"
                    />

                  </span>

                  Vedic chart based insights

                </div>

              </div>

            </div>

            {/* =====================================================
                HERO RIGHT CARD
            ===================================================== */}

            <div className="relative z-10">

              <div className="relative overflow-hidden rounded-[20px] border border-[#8c2d13] bg-[#78230d] px-6 py-5 shadow-[0_20px_45px_rgba(94,28,10,0.14)] lg:px-8 lg:py-6">

                {/* Decorative rings */}

                <div className="pointer-events-none absolute -right-24 -top-28 h-[260px] w-[260px] rounded-full border border-[#e2b45e]/15" />

                <div className="pointer-events-none absolute -right-12 -top-16 h-[190px] w-[190px] rounded-full border border-[#e2b45e]/10" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9aa54]/40">

                      <Sparkles
                        size={18}
                        strokeWidth={1.4}
                        className="text-[#e2b75f]"
                      />

                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#e0bd78]">
                      FREE ASTROLOGY
                    </span>

                  </div>

                  <div className="mt-7">

                    <div className="display-font text-[28px] font-semibold leading-[1.12] text-white">

                      Understand

                      <br />

                      <span className="text-[#e2b65b]">
                        your cosmic patterns.
                      </span>

                    </div>

                    <div className="my-6 h-px bg-[#e4b967]/20" />

                    {/* Only two stats */}

                    <div className="grid grid-cols-2 gap-6">

                      <div>

                        <div className="text-[25px] font-semibold text-white">
                          100%
                        </div>

                        <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#d9bd86]">
                          ACCURATE
                        </div>

                      </div>

                      <div>

                        <div className="text-[25px] font-semibold text-white">
                          VEDIC
                        </div>

                        <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#d9bd86]">
                          METHOD
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          REPORT COLLECTION
      ========================================================= */}

      <section className="bg-[#fffdf9]">

        <div className="mx-auto max-w-[1380px] px-6 py-14 lg:px-10 lg:py-16">

          <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#a16a25]">
                Explore your chart
              </div>

              <h2 className="display-font text-[34px] font-semibold tracking-[-0.025em] text-[#681d0b] sm:text-[40px]">
                Free astrology reports
              </h2>

            </div>

            <p className="max-w-[430px] text-[14px] leading-6 text-[#837366] md:text-right">
              Start with a focused analysis and uncover the planetary patterns
              influencing your life.
            </p>

          </div>

          {/* =====================================================
              REPORT CARDS
          ===================================================== */}

          <div className="grid gap-5 lg:grid-cols-3">

            {reports.map((report, index) => {

              const Icon = report.icon;

              return (

                <Link
                  key={report.title}
                  href={report.href}
                  className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[18px] border border-[#e9dfd1] bg-white p-7 shadow-[0_6px_24px_rgba(75,52,31,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9c3a2] hover:shadow-[0_18px_40px_rgba(75,52,31,0.09)]"
                >

                  {/* Background number */}

                  <div className="pointer-events-none absolute right-6 top-5 text-[42px] font-semibold leading-none tracking-[-0.05em] text-[#f3ede5] transition-colors duration-300 group-hover:text-[#eee3d5]">
                    0{index + 1}
                  </div>

                  {/* Card top */}

                  <div className="relative flex items-start justify-between gap-4">

                    <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[14px] border border-[#eadbc7] bg-[#fffaf3]">

                      <Icon
                        size={26}
                        strokeWidth={1.45}
                        className="text-[#98601e]"
                      />

                    </div>

                    <span className="rounded-full border border-[#eadfce] bg-[#fffaf4] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#9a6b36]">
                      {report.eyebrow}
                    </span>

                  </div>

                  {/* Card content */}

                  <div className="relative mt-7">

                    <h3 className="display-font text-[27px] font-semibold leading-tight text-[#33251d]">
                      {report.title}
                    </h3>

                    <p className="mt-3 max-w-[350px] text-[14px] leading-6 text-[#77695e]">
                      {report.description}
                    </p>

                  </div>

                  {/* Features */}

                  <div className="mt-6 flex-grow border-t border-[#f0e8de] pt-5">

                    <div className="space-y-3">

                      {report.features.map((feature) => (

                        <div
                          key={feature}
                          className="flex items-center gap-3"
                        >

                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f8f0e5]">

                            <Check
                              size={11}
                              strokeWidth={2}
                              className="text-[#a36a24]"
                            />

                          </span>

                          <span className="text-[13px] font-medium text-[#65574d]">
                            {feature}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* Bottom CTA */}

                  <div className="mt-6 flex items-center justify-between border-t border-[#f0e8de] pt-5">

                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#74230e]">
                      {t('free_reports.get_report')}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4d5c1] text-[#8e5c24] transition-all duration-300 group-hover:border-[#7a230d] group-hover:bg-[#7a230d] group-hover:text-white">

                      <ChevronRight
                        size={15}
                        strokeWidth={1.7}
                      />

                    </span>

                  </div>

                </Link>

              );

            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          KNOWLEDGE SECTION
      ========================================================= */}

      <section className="border-y border-[#ebe2d7] bg-[#faf5ed]">

        <div className="mx-auto max-w-[1380px] px-6 py-14 lg:px-10 lg:py-16">

          <div className="mx-auto max-w-[740px] text-center">

            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#a06a27]">
              The wisdom behind the reports
            </div>

            <h2 className="display-font text-[34px] font-semibold leading-tight tracking-[-0.025em] text-[#681d0b] sm:text-[42px]">
              {t(
                'free_reports.navigating_the_cosmic_tapestry'
              )}
            </h2>

            <p className="mt-5 text-[14px] leading-7 text-[#76685d]">
              {t(
                'free_reports.our_professional_vedic_reports'
              )}
            </p>

          </div>

          {/* Insight cards */}

          <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] border border-[#e7dccd] bg-[#e7dccd] md:grid-cols-3">

            {/* =====================================================
                KAAL SARP
            ===================================================== */}

            <article className="bg-[#fffdf9] p-7 lg:p-9">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eadac5] bg-[#fff9f0]">

                  <Shield
                    size={20}
                    strokeWidth={1.45}
                    className="text-[#96300f]"
                  />

                </div>

                <span className="text-[10px] font-bold tracking-[0.16em] text-[#b08a59]">
                  01
                </span>

              </div>

              <h3 className="display-font mt-7 text-[26px] font-semibold text-[#34261e]">
                {t(
                  'free_reports.understanding_kaal_sarp'
                )}
              </h3>

              <p className="mt-4 text-[15.5px] leading-[1.85] text-[#75675d]">

                <span className="font-semibold text-[#86280e]">
                  {t('free_reports.kaal_sarp_dosha')}
                </span>

                {' '}
                {t(
                  'free_reports.occurs_when_all_seven_planets'
                )}
                {' '}

                <span className="font-semibold text-[#3c2b21]">
                  {t('free_reports.anant')}
                </span>

                {' or '}

                <span className="font-semibold text-[#3c2b21]">
                  {t('free_reports.kulik')}
                </span>

                {' '}
                {t(
                  'free_reports._allows_for_targeted_remedies'
                )}

              </p>

            </article>

            {/* =====================================================
                GEMSTONES
            ===================================================== */}

            <article className="bg-[#fffdf9] p-7 lg:p-9">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eadac5] bg-[#fff9f0]">

                  <Gem
                    size={20}
                    strokeWidth={1.45}
                    className="text-[#a26b20]"
                  />

                </div>

                <span className="text-[10px] font-bold tracking-[0.16em] text-[#b08a59]">
                  02
                </span>

              </div>

              <h3 className="display-font mt-7 text-[26px] font-semibold text-[#34261e]">
                {t(
                  'free_reports.the_science_of_gemstones'
                )}
              </h3>

              <p className="mt-4 text-[15.5px] leading-[1.85] text-[#75675d]">

                {t(
                  'free_reports.every_authentic_gemstone_is_a'
                )}
                {' '}

                <span className="font-semibold text-[#86280e]">
                  {t(
                    'free_reports.storehouse_of_cosmic_energy'
                  )}
                </span>

                {' '}
                {t(
                  'free_reports._when_chosen_correctly_based_o'
                )}
                {' '}

                <span className="font-semibold text-[#3c2b21]">
                  {t('free_reports.maraka')}
                </span>

                {' '}
                {t(
                  'free_reports._killer_house_can_be_detriment'
                )}

              </p>

            </article>

            {/* =====================================================
                SADE SATI
            ===================================================== */}

            <article className="bg-[#fffdf9] p-7 lg:p-9">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eadac5] bg-[#fff9f0]">

                  <Zap
                    size={20}
                    strokeWidth={1.45}
                    className="text-[#9a651f]"
                  />

                </div>

                <span className="text-[10px] font-bold tracking-[0.16em] text-[#b08a59]">
                  03
                </span>

              </div>

              <h3 className="display-font mt-7 text-[26px] font-semibold text-[#34261e]">
                {t(
                  'free_reports.the_mystery_of_sade_sati'
                )}
              </h3>

              <p className="mt-4 text-[15.5px] leading-[1.85] text-[#75675d]">

                {t(
                  'free_reports.shani_saturn_is_the'
                )}
                {' '}

                <span className="font-semibold text-[#86280e]">
                  {t('free_reports.strict_teacher')}
                </span>

                {' '}
                {t(
                  'free_reports.of_the_zodiac_his_7_5_year_tra'
                )}

              </p>

            </article>

          </div>

        </div>

      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="bg-[#fffdf9]">

        <div className="mx-auto max-w-[1380px] px-6 py-14 lg:px-10 lg:py-16">

          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">

            {/* Left */}

            <div>

              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.23em] text-[#a06a27]">
                Simple & insightful
              </div>

              <h2 className="display-font text-[35px] font-semibold leading-[1.08] text-[#681d0b] sm:text-[41px]">

                Begin with your

                <br />

                <span className="italic text-[#b1792c]">
                  cosmic blueprint.
                </span>

              </h2>

              <p className="mt-5 max-w-[450px] text-[14px] leading-7 text-[#77695e]">
                Choose a report, provide your birth details and receive an
                analysis built around traditional Vedic astrology principles.
              </p>

            </div>

            {/* Right steps */}

            <div className="grid gap-4 sm:grid-cols-3">

              {/* Step 1 */}

              <div className="rounded-[16px] border border-[#e9dfd2] bg-[#fffaf4] p-6">

                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a06a27]">
                  01
                </div>

                <BookOpen
                  size={23}
                  strokeWidth={1.4}
                  className="mt-7 text-[#77230d]"
                />

                <h3 className="display-font mt-5 text-[20px] font-semibold text-[#392a20]">
                  Select
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-[#7c6d61]">
                  Choose the astrology report that matches your question.
                </p>

              </div>

              {/* Step 2 */}

              <div className="rounded-[16px] border border-[#e9dfd2] bg-[#fffaf4] p-6">

                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a06a27]">
                  02
                </div>

                <Star
                  size={23}
                  strokeWidth={1.4}
                  className="mt-7 text-[#77230d]"
                />

                <h3 className="display-font mt-5 text-[20px] font-semibold text-[#392a20]">
                  Analyse
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-[#7c6d61]">
                  Your birth details are used to understand planetary
                  patterns.
                </p>

              </div>

              {/* Step 3 */}

              <div className="rounded-[16px] border border-[#e9dfd2] bg-[#fffaf4] p-6">

                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a06a27]">
                  03
                </div>

                <Sparkles
                  size={23}
                  strokeWidth={1.4}
                  className="mt-7 text-[#77230d]"
                />

                <h3 className="display-font mt-5 text-[20px] font-semibold text-[#392a20]">
                  Discover
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-[#7c6d61]">
                  Explore your report and gain a clearer perspective.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="bg-[#fffdf9] px-6 pb-16 lg:px-10">

        <div className="mx-auto max-w-[1380px]">

          <div className="relative overflow-hidden rounded-[22px] bg-[#74220d] px-7 py-10 lg:px-14 lg:py-12">

            {/* Decorative rings */}

            <div className="pointer-events-none absolute -right-28 -top-32 h-[380px] w-[380px] rounded-full border border-[#e1b35b]/15" />

            <div className="pointer-events-none absolute right-10 top-10 opacity-[0.06]">
              <Sparkles size={180} />
            </div>

            <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-[650px]">

                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e3bd72]">

                  <Sparkles size={14} />

                  Personalised guidance

                </div>

                <h2 className="display-font text-[34px] font-semibold leading-tight text-white sm:text-[40px]">
                  {t(
                    'free_reports.need_deeper_personal_guidance'
                  )}
                </h2>

                <p className="mt-4 text-[14px] leading-7 text-white/65">
                  {t(
                    'free_reports.automated_reports_provide_tech'
                  )}
                </p>

              </div>

              <div className="flex shrink-0 flex-wrap gap-3">

                <Link
                  href="/astrologers-chat"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e4bb68] px-7 text-[11px] font-bold uppercase tracking-[0.08em] text-[#641c08] transition-all duration-300 hover:bg-white"
                >

                  {t(
                    'free_reports.chat_with_an_expert'
                  )}

                  <ArrowRight size={15} />

                </Link>

                <Link
                  href="/astrologers-call"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-7 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-white/10"
                >

                  {t(
                    'free_reports.call_astrologer'
                  )}

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}