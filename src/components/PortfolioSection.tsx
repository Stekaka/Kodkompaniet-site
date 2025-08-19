export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-black text-white py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Tidigare projekt</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "E-handelsplattform",
              description: "Modern e-handel med betalningslösningar och lagerhantering",
              image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center"
            },
            {
              title: "Företagshemsida",
              description: "Professionell design med fokus på konvertering och användarupplevelse",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center"
            },
            {
              title: "Portfolio-webbplats",
              description: "Kreativ design med interaktiva element och animationer",
              image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center"
            }
          ].map((project, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-800 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover filter group-hover:brightness-75 transition-all duration-300"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}