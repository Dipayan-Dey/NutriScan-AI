import { Facebook, Instagram, Linkedin, Globe, BadgeCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">NutriScan AI</h3>
            <p className="text-sm leading-relaxed">
              AI-powered nutrition analysis for a healthier life.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400">Features</a></li>
              <li><a href="#" className="hover:text-emerald-400">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-400">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400">About</a></li>
              <li><a href="#" className="hover:text-emerald-400">Blog</a></li>
              <li><a href="#" className="hover:text-emerald-400">Careers</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Me</h4>
            <div className="flex flex-wrap gap-4 text-xl">

              {/* Facebook */}
              <a
                href="https://facebook.com/YOUR_URL"
                target="_blank"
                className="hover:text-blue-500 transition"
              >
                <Facebook size={22} />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/YOUR_URL"
                target="_blank"
                className="hover:text-pink-500 transition"
              >
                <Instagram size={22} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/YOUR_URL"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                <Linkedin size={22} />
              </a>

              {/* Fiverr */}
              <a
                href="https://fiverr.com/YOUR_URL"
                target="_blank"
                className="hover:text-green-400 transition"
              >
                <BadgeCheck size={22} />
              </a>

              {/* Portfolio */}
              <a
                href="https://www.dipayandey.site"
                target="_blank"
                className="hover:text-emerald-400 transition"
              >
                <Globe size={22} />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 NutriScan AI. All rights reserved.</p>

          <p className="mt-2">
            Developed by{" "}
            <a 
              href="https://www.dipayandey.site"
              target="_blank"
              className="text-emerald-400 font-semibold hover:underline"
            >
              Dipayan Dey
            </a>.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
