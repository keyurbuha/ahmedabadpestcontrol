import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { services } from '../data/services';
import { openWhatsAppInquiry } from '../utils/whatsapp';
import { Button } from './Button';

export const InquiryForm = ({ variant = 'full', glass = false, className = '' }) => {
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

  const labelClass = glass
    ? 'block text-sm font-medium text-white/85 mb-1'
    : 'block text-sm font-medium text-gray-700 mb-1';

  const inputClass = glass
    ? 'w-full px-4 py-2.5 rounded-md border border-white/35 bg-white/25 text-brand-dark placeholder:text-brand-dark/45 outline-none transition-all backdrop-blur-md focus:ring-2 focus:ring-brand-green/40 focus:border-white/60 focus:bg-white/40'
    : 'w-full px-4 py-2.5 border border-brand-dark/15 rounded-md focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all bg-white text-brand-dark';

  const hintClass = glass ? 'text-xs text-center text-white/65' : 'text-xs text-center text-gray-500';

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className={isQuick ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <label htmlFor={`${variant}-name`} className={labelClass}>
            Full Name *
          </label>
          <input
            type="text"
            id={`${variant}-name`}
            name="name"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${variant}-phone`} className={labelClass}>
            Phone Number *
          </label>
          <input
            type="tel"
            id={`${variant}-phone`}
            name="phone"
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10 digit phone number"
            placeholder="10-digit mobile"
            className={inputClass}
          />
        </div>
      </div>

      {!isQuick && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${variant}-email`} className={labelClass}>
              Email Address
            </label>
            <input
              type="email"
              id={`${variant}-email`}
              name="email"
              placeholder="optional"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${variant}-service`} className={labelClass}>
              Service Needed *
            </label>
            <select id={`${variant}-service`} name="service" required className={inputClass}>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="General Inspection">General Inspection</option>
            </select>
          </div>
        </div>
      )}

      {isQuick && (
        <div>
          <label htmlFor={`${variant}-service`} className={labelClass}>
            Service Needed *
          </label>
          <select id={`${variant}-service`} name="service" required className={inputClass}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="General Inspection">General Inspection</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor={`${variant}-address`} className={labelClass}>
          Address/Locality {isQuick ? '' : '*'}
        </label>
        <input
          type="text"
          id={`${variant}-address`}
          name="address"
          required={!isQuick}
          placeholder="e.g. Makarba, Vasna, Satellite"
          className={inputClass}
        />
      </div>

      {!isQuick && (
        <div>
          <label htmlFor={`${variant}-message`} className={labelClass}>
            Message
          </label>
          <textarea
            id={`${variant}-message`}
            name="message"
            rows={4}
            placeholder="Tell us about your pest problem"
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      <Button type="submit" className="w-full gap-2" disabled={submitting}>
        <MessageCircle size={20} />
        {submitting ? 'Opening WhatsApp...' : 'Send on WhatsApp'}
      </Button>

      <p className={hintClass}>Submitting opens WhatsApp with your inquiry ready to send.</p>
    </form>
  );
};
