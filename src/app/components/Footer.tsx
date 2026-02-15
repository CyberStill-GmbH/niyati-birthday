import { Heart, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-gradient-to-b from-rose-100 to-pink-200">
      <div className="max-w-4xl mx-auto text-center">
        <Heart className="w-12 h-12 mx-auto mb-4 text-rose-600 fill-rose-600" />
        
        <p 
          className="text-2xl font-medium text-rose-900 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Made with endless love for Niyati Rios
        </p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <a 
            href="#" 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <p 
          className="text-sm text-rose-700"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          © 2026 • Forever and Always • Happy Birthday Niyati 💖
        </p>
      </div>
    </footer>
  );
}
