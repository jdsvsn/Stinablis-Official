"use client";

const services = [
  {
    title: "Rapid Prototyping",
    image: "/rapid.jpg",
    description: "From ideation to tangible solution in record time. We accelerate the design-to-prototype cycle for complex engineering challenges.",
  },
  {
    title: "Sustainable Composites",
    image: "/sustainability-composite-new.jpg",
    description: "Pioneering material innovation with natural fibers including pineapple, kenaf and bio-composites — strong, lightweight, and ecologically responsible.",
  },
  {
    title: "3D Printing",
    image: "/3d-printing-new.jpg",
    description: "Customized additive manufacturing for functional prototypes, jigs, fixtures, and end-use parts in a wide range of materials and tolerances.",
  },
  {
    title: "Automotive Parts",
    image: "/automotive-parts-new.jpg",
    description: "Custom-specification parts production for automotive applications — from concept and CAD through fabrication to finished component delivery.",
  },
  {
    title: "Reverse Engineering",
    image: "/reverse-engineering-new.jpg",
    description: "Problem-solving through analysis of existing components. We digitize, reconstruct, and improve parts with no original documentation.",
  },
  {
    title: "Software Solutions",
    image: "/web.png",
    description: "Custom development of websites, applications, and databases tailored to engineering and industrial workflows. Built to integrate with your operations.",
  },
];

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, i) => (
        <div
          key={i}
          className="service-card opacity-0 group relative bg-frost/3 border border-frost/10 overflow-hidden hover:border-coral transition-colors duration-300"
        >
          {/* Image Container */}
          <div className="h-64 overflow-hidden relative">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <div className="absolute inset-0 bg-carbon/40 group-hover:bg-carbon/20 transition-colors duration-300" />
            <div className="absolute top-4 left-4 font-anton text-[12px] tracking-[0.2em] text-coral bg-carbon/80 px-3 py-1.5">
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h3 className="font-anton text-[22px] tracking-[0.05em] text-frost mb-4 uppercase">
              {service.title}
            </h3>
            <p className="font-roboto text-[15px] leading-relaxed text-frost/60 mb-8 font-light">
              {service.description}
            </p>
            <div className="flex items-center gap-5">
              <a 
                href={`https://wa.me/601160915670?text=${encodeURIComponent(`I would like to ask about the ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-coral text-white px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-all hover:bg-white hover:text-coral font-bold"
              >
                Ask Us
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
