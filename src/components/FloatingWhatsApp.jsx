import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
export const FloatingWhatsApp = () => {
    return (<motion.a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:h-14 sm:w-14 sm:bottom-6 sm:right-6" initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} title="Chat with us on WhatsApp" aria-label="Chat on WhatsApp">
      <MessageCircle size={24} className="sm:hidden"/>
      <MessageCircle size={28} className="hidden sm:block"/>
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30"/>
    </motion.a>);
};
