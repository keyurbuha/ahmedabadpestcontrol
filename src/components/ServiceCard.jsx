import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
export const ServiceCard = ({ service, index }) => {
    const Icon = service.icon;
    return (<motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.06 }} className="group relative h-full border border-brand-dark/8 bg-white p-7 md:p-8 transition-colors duration-300 hover:border-brand-green/40 hover:bg-brand-offwhite">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center bg-brand-dark text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
          <Icon size={24} strokeWidth={1.75}/>
        </div>
        <span className="font-mono text-xs text-gray-400">0{index + 1}</span>
      </div>

      <h3 className="mb-3 text-xl font-bold text-brand-dark tracking-tight">{service.title}</h3>
      <p className="mb-8 text-[15px] leading-relaxed text-gray-600">{service.description}</p>

      <Link to={`/services/${service.slug}`} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors group-hover:text-brand-green">
        View service
        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
      </Link>
    </motion.div>);
};
