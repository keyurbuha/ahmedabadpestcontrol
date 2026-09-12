import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { services } from '../data/services';
const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
export const Footer = () => {
    return (<footer className="bg-brand-dark text-white pt-12 pb-24 sm:pt-16 sm:pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand Col */}
          <div>
            <Link to="/" className="inline-block mb-5 sm:mb-6">
              <img src="/logo.png" alt="Ahmedabad Pest Control" className="h-14 sm:h-16 md:h-20 w-auto max-w-full object-contain"/>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Protecting Homes. Protecting Health. Trusted pest control services in Ahmedabad, ensuring a safe and pest-free environment for your family.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-brand-green"></span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-brand-green transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-green transition-colors">All Services</Link></li>
              <li><Link to="/blog" className="hover:text-brand-green transition-colors">Pest Control Blog</Link></li>
              <li><Link to="/testimonials" className="hover:text-brand-green transition-colors">Testimonials</Link></li>
              <li><Link to="/faq" className="hover:text-brand-green transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-brand-green transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Our Services
              <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-brand-green"></span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {services.slice(0, 6).map((service) => (<li key={service.id}>
                  <Link to={`/services/${service.slug}`} className="hover:text-brand-green transition-colors">
                    {service.title}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Contact Info
              <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-brand-green"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin className="text-brand-green shrink-0" size={20}/>
                <span>123, SG Highway, Satellite, Ahmedabad, Gujarat 380015</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-brand-green shrink-0" size={20}/>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-brand-green shrink-0" size={20}/>
                <a href="mailto:info@ahmedabadpest.com" className="hover:text-white transition-colors">info@ahmedabadpest.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Ahmedabad Pest Control. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>);
};
