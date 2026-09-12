import { MapPin } from 'lucide-react';
import { Marquee } from './Marquee';
import { serviceAreas } from '../data/services';
export const localities = serviceAreas;
export const AreasMarquee = ({ className = '' }) => (<div className={`bg-brand-green py-3.5 overflow-hidden ${className}`}>
    <Marquee speed="slow" gap="gap-0" pauseOnHover={false}>
      {serviceAreas.map((area) => (<span key={area} className="mx-5 inline-flex items-center gap-3 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
          <MapPin size={14} className="opacity-80"/>
          {area}
          <span className="text-white/40">/</span>
        </span>))}
    </Marquee>
  </div>);
