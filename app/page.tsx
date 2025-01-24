export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header sekcia */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Smart stratégia</h1>
          <p className="mt-2 text-gray-600">Portál pre moderných starostov a starostky</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Sekcia s iframe */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Podporené projekty</h2>
          <div className="aspect-video w-full">
            <iframe 
              src="https://app.powerbi.com/view?r=eyJrIjoiY2ZhMGQ4YjEtMGY4YS00NzUxLThlNWYtYjU3ZDAzZTVjODIwIiwidCI6IjM2YmM3MDFkLWViZTEtNGU0Zi05NTY4LWYyMTc1OGVmOTRkNyIsImMiOjl9"
              className="w-full h-full border-2 border-gray-200 rounded-lg"
              allowFullScreen
            />
          </div>
        </section>

        {/* Call to Action sekcia */}
        <section className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Máte záujem o spoluprácu?</h2>
          <p className="text-gray-600 mb-6">
            Kontaktujte nás pomocou nášho formulára a my sa vám čoskoro ozveme.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Kontaktovať nás
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center">&copy; 2024 Smart stratégia. Všetky práva vyhradené.</p>
        </div>
      </footer>
    </div>
  );
}
