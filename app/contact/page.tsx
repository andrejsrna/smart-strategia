import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header sekcia */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Kontaktujte nás</h1>
          <p className="mt-2 text-gray-600">Vyplňte formulár a my sa vám ozveme</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <ContactForm />
        </div>

        {/* Dodatočné kontaktné informácie */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Máte otázky? Neváhajte nás kontaktovať aj na emaile:{" "}
            <a href="mailto:andrej.trnka@trnava-vuc.sk" className="text-blue-600 hover:underline">
              andrej.trnka@trnava-vuc.sk
            </a>
          </p>
        </div>
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