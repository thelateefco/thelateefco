// app/donate/page.tsx
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import Reveal from "../../components/animations/Reveal";
import DonationForm from "../../components/donation/DonationForm"; // Changed from "../../forms/DonationForm"
import { Heart, Users, HandHeart } from "lucide-react";

export default function DonatePage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-[#F5F5F7] min-h-screen">
        <section className="px-6 md:px-10 lg:px-16 pb-28 md:pb-36">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12">
                <span className="label">Support a cause</span>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Left - Content */}
              <div>
                <Reveal>
                  <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-medium text-[#1A1A1A] leading-[1.1] tracking-tight max-w-[14ch] mb-6">
                    Help us
                    <br />
                    <em className="italic">make a difference.</em>
                  </h1>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="text-[0.9375rem] leading-[1.8] text-[#4A4A4A] font-light max-w-[36ch] mb-10">
                    Every contribution, no matter how small, helps us support families in need.
                    Your donation goes directly to providing food, education, and medical support.
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5">
                        <Users className="w-4 h-4 text-[#FFFFFF]" />
                      </div>
                      <div>
                        <h3 className="font-serif text-[1rem] font-medium text-[#1A1A1A]">
                          Help Families in Need
                        </h3>
                        <p className="text-[0.8125rem] text-[#4A4A4A] font-light">
                          Your donation supports basic necessities like food, education, and healthcare.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5">
                        <Heart className="w-4 h-4 text-[#FFFFFF]" />
                      </div>
                      <div>
                        <h3 className="font-serif text-[1rem] font-medium text-[#1A1A1A]">
                          100% Transparent
                        </h3>
                        <p className="text-[0.8125rem] text-[#4A4A4A] font-light">
                          We share regular updates on how your contributions are making an impact.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right - Donation Form */}
              <div>
                <Reveal delay={0.1}>
                  <div className="bg-[#FFFFFF] p-8 md:p-10 rounded-[16px] shadow-lg border border-[#E8E8EC]">
                    <DonationForm />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}