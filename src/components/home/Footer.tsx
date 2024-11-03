export default function Footer() {
  return (
    <footer className="bg-gray-900">
      {/* Gradient divider */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">Enigma Code</span>
            </div>
            <p className="mt-4 text-gray-400">
              AI-powered platform for optimizing your job search process. Land your dream job faster with intelligent automation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Features', href: '#features' },
                { name: 'How it Works', href: '#how-it-works' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'About Us', href: '#about' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'Blog', href: '/blog' },
                { name: 'Career Tips', href: '/tips' },
                { name: 'Success Stories', href: '/stories' },
                { name: 'Help Center', href: '/help' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <a href="mailto:support@enigmacode.com" className="hover:text-white transition-colors">
                  support@enigmacode.com
                </a>
              </li>
              <li className="text-gray-400">
                Follow us on:
              </li>
              <li className="flex space-x-4">
                {[
                  { name: 'Twitter', href: '#' },
                  { name: 'LinkedIn', href: '#' },
                  { name: 'GitHub', href: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Enigma Code. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 