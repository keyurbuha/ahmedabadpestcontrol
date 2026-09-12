import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { services } from '../data/services';
import { openWhatsAppInquiry } from '../utils/whatsapp';
import { Button } from './Button';
export const InquiryForm = ({ variant = 'full', className = '' }) => {
    const [submitting, setSubmitting] = useState(false);
    const isQuick = variant === 'quick';
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        const form = e.currentTarget;
        const data = new FormData(form);
        openWhatsAppInquiry({
            name: String(data.get('name') || ''),
            phone: String(data.get('phone') || ''),
            service: String(data.get('service') || ''),
            address: String(data.get('address') || ''),
            email: String(data.get('email') || ''),
            message: String(data.get('message') || ''),
        });
        form.reset();
        setSubmitting(false);
    };
    const inputClass = 'w-full px-4 py-2.5 border border-brand-dark/15 rounded-md focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all bg-white text-brand-dark';
    return (<form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className={isQuick ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <label htmlFor={`${variant}-name`} className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input type="text" id={`${variant}-name`} name="name" required placeholder="Your name" className={inputClass}/>
        </div>
        <div>
          <label htmlFor={`${variant}-phone`} className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input type="tel" id={`${variant}-phone`} name="phone" required pattern="[0-9]{10}" title="Please enter a valid 10 digit phone number" placeholder="10-digit mobile" className={inputClass}/>
        </div>
      </div>

      {!isQuick && (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${variant}-email`} className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input type="email" id={`${variant}-email`} name="email" placeholder="optional" className={inputClass}/>
          </div>
          <div>
            <label htmlFor={`${variant}-service`} className="block text-sm font-medium text-gray-700 mb-1">
              Service Needed *
            </label>
            <select id={`${variant}-service`} name="service" required className={inputClass}>
              <option value="">Select a service</option>
              {services.map((s) => (<option key={s.id} value={s.title}>
                  {s.title}
                </option>))}
              <option value="General Inspection">General Inspection</option>
            </select>
          </div>
        </div>)}

      {isQuick && (<div>
          <label htmlFor={`${variant}-service`} className="block text-sm font-medium text-gray-700 mb-1">
            Service Needed *
          </label>
          <select id={`${variant}-service`} name="service" required className={inputClass}>
            <option value="">Select a service</option>
            {services.map((s) => (<option key={s.id} value={s.title}>
                {s.title}
              </option>))}
            <option value="General Inspection">General Inspection</option>
          </select>
        </div>)}

      <div>
        <label htmlFor={`${variant}-address`} className="block text-sm font-medium text-gray-700 mb-1">
          Address/Locality {isQuick ? '' : '*'}
        </label>
        <input type="text" id={`${variant}-address`} name="address" required={!isQuick} placeholder="e.g. Satellite, Vastrapur" className={inputClass}/>
      </div>

      {!isQuick && (<div>
          <label htmlFor={`${variant}-message`} className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea id={`${variant}-message`} name="message" rows={4} placeholder="Tell us about your pest problem" className={`${inputClass} resize-none`}/>
        </div>)}

      <Button type="submit" className="w-full gap-2" disabled={submitting}>
        <MessageCircle size={20}/>
        {submitting ? 'Opening WhatsApp...' : 'Send on WhatsApp'}
      </Button>

      <p className="text-xs text-center text-gray-500">
        Submitting opens WhatsApp with your inquiry ready to send.
      </p>
    </form>);
};
