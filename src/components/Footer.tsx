const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-cream px-6 sm:px-8 lg:px-16 py-8 border-t border-red/20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-red text-sm">
          © {currentYear} Mubashir VM. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <a
            href="#hero"
            className="text-red text-sm hover:text-red-dark transition-colors duration-300"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
