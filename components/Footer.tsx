export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center">
          &copy; {currentYear} Smart stratégia. Všetky práva vyhradené.
        </p>
      </div>
    </footer>
  );
}
