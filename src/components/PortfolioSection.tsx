export default function PortfolioSection() {
  return (
    <section className="bg-black text-white py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Tidigare projekt</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-800 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`https://source.unsplash.com/featured/?website,design,${i}`}
                alt="Exempel hemsida"
                className="w-full h-64 object-cover filter group-hover:brightness-75"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left">
                <h3 className="text-xl font-semibold">Projekt {i}</h3>
                <p className="text-sm text-gray-400">Skräddarsydd lösning med fokus på UX/UI</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}