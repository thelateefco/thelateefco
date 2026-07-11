"use client";

import Reveal from "./Reveal";

const services = [
  {
    id: "web-design",
    number: "01",
    title: "Web Design",
    description:
      "Your website is the first impression most customers will ever have of your business. We design experiences that are immediately clear, trustworthy, and built around what your audience actually does — not just what looks good in a portfolio.",
  },
  {
    id: "development",
    number: "02",
    title: "Development",
    description:
      "Fast, rock-solid websites built to perform under real-world conditions. No bloated templates, no drag-and-drop shortcuts — every line of code is written with purpose, so your site stays quick, secure, and easy to grow.",
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI Automation",
    description:
      "The repetitive tasks eating your team's hours — lead follow-ups, inquiry routing, content updates — can be automated. We identify where AI tools fit your workflow and integrate them quietly in the background, so your business runs smarter without extra headcount.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#ECE6DF] py-28 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-6 mb-16 md:mb-20 hairline pt-6">
            <span className="label">What we do</span>
          </div>
        </Reveal>

        {/* Services list */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <div
                id={`service-${service.id}`}
                className="grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-10 py-10 md:py-14 hairline group"
              >
                {/* Number */}
                <div className="flex items-start">
                  <span className="label text-[#8A8A8A]">{service.number}</span>
                </div>

                {/* Title */}
                <div>
                  <h3
                    className="font-serif text-[2rem] md:text-[2.5rem] font-medium text-[#1A1A1A] leading-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="flex items-start">
                  <p className="body-text text-[0.9375rem] leading-[1.8] max-w-[44ch]">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          {/* closing hairline */}
          <div className="hairline" />
        </div>
      </div>
    </section>
  );
}
