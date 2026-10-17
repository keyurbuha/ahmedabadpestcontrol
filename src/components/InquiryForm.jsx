import { useSiteContent } from "../content/SiteContent";
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { Button } from './Button';
export const InquiryForm = ({
  variant = 'full',
  glass = false,
  className = ''
}) => {
  const {
    contentText,
    services
  } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const isQuick = variant === 'quick';
  const handleSubmit = async e => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    setWhatsappUrl('');
    const form = e.currentTarget;
    const data = new FormData(form);
    const inquiry = {
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      service: String(data.get('service') || ''),
      address: String(data.get('address') || ''),
      email: String(data.get('email') || ''),
      message: String(data.get('message') || ''),
      website: String(data.get('website') || ''),
      page: window.location.pathname,
      variant
    };
    const popup = window.open('about:blank', '_blank');
    if (popup) popup.opener = null;
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inquiry)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || contentText('InquiryForm', 'saveError'));
      const url = buildWhatsAppUrl(inquiry, result.whatsappNumber);
      setWhatsappUrl(url);
      if (popup && !popup.closed) popup.location.href = url;
      form.reset();
    } catch (error) {
      popup?.close();
      setError(error.message || contentText('InquiryForm', 'saveError'));
    } finally {
      setSubmitting(false);
    }
  };
  const labelClass = glass ? 'block text-sm font-medium text-white/85 mb-1' : 'block text-sm font-medium text-gray-700 mb-1';
  const inputClass = glass ? 'w-full px-4 py-2.5 rounded-md border border-white/35 bg-white/25 text-brand-dark placeholder:text-brand-dark/45 outline-none transition-all backdrop-blur-md focus:ring-2 focus:ring-brand-green/40 focus:border-white/60 focus:bg-white/40' : 'w-full px-4 py-2.5 border border-brand-dark/15 rounded-md focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all bg-white text-brand-dark';
  const hintClass = glass ? 'text-xs text-center text-white/65' : 'text-xs text-center text-gray-500';
  return <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="hidden" aria-hidden="true"><label>{contentText('InquiryForm', 'websiteLabel')}<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className={isQuick ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <label htmlFor={`${variant}-name`} className={labelClass}>{contentText("InquiryForm", "field1")}</label>
          <input type="text" id={`${variant}-name`} name="name" required placeholder={contentText("InquiryForm", "field2")} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${variant}-phone`} className={labelClass}>{contentText("InquiryForm", "field3")}</label>
          <input type="tel" id={`${variant}-phone`} name="phone" required pattern="[0-9]{10}" title={contentText("InquiryForm", "field4")} placeholder={contentText("InquiryForm", "field5")} className={inputClass} />
        </div>
      </div>

      {!isQuick && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${variant}-email`} className={labelClass}>{contentText("InquiryForm", "field6")}</label>
            <input type="email" id={`${variant}-email`} name="email" placeholder={contentText("InquiryForm", "field7")} className={inputClass} />
          </div>
          <div>
            <label htmlFor={`${variant}-service`} className={labelClass}>{contentText("InquiryForm", "field8")}</label>
            <select id={`${variant}-service`} name="service" required className={inputClass}>
              <option value="">{contentText("InquiryForm", "field9")}</option>
              {services.map(s => <option key={s.id} value={s.title}>
                  {s.title}
                </option>)}
              <option value="General Inspection">{contentText("InquiryForm", "field10")}</option>
            </select>
          </div>
        </div>}

      {isQuick && <div>
          <label htmlFor={`${variant}-service`} className={labelClass}>{contentText("InquiryForm", "field11")}</label>
          <select id={`${variant}-service`} name="service" required className={inputClass}>
            <option value="">{contentText("InquiryForm", "field12")}</option>
            {services.map(s => <option key={s.id} value={s.title}>
                {s.title}
              </option>)}
            <option value="General Inspection">{contentText("InquiryForm", "field13")}</option>
          </select>
        </div>}

      <div>
        <label htmlFor={`${variant}-address`} className={labelClass}>{contentText("InquiryForm", "field14")}{isQuick ? '' : '*'}
        </label>
        <input type="text" id={`${variant}-address`} name="address" required={!isQuick} placeholder={contentText("InquiryForm", "field15")} className={inputClass} />
      </div>

      {!isQuick && <div>
          <label htmlFor={`${variant}-message`} className={labelClass}>{contentText("InquiryForm", "field16")}</label>
          <textarea id={`${variant}-message`} name="message" rows={4} placeholder={contentText("InquiryForm", "field17")} className={`${inputClass} resize-none`} />
        </div>}

      <Button type="submit" className="w-full gap-2" disabled={submitting}>
        <MessageCircle size={20} />
        {submitting ? contentText('InquiryForm', 'savingLabel') : contentText('InquiryForm', 'submitLabel')}
      </Button>

      <p className={hintClass}>{contentText("InquiryForm", "field18")}</p>
      {error && <p role="alert" className={glass ? 'text-sm text-white bg-red-900/70 p-3 rounded-md' : 'text-sm text-red-700 bg-red-50 p-3 rounded-md'}>{error}</p>}
      {whatsappUrl && <p role="status" className={glass ? 'text-sm text-white' : 'text-sm text-brand-green'}>{contentText('InquiryForm', 'savedMessage')} <a className="underline font-semibold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{contentText('InquiryForm', 'continueLabel')}</a></p>}
    </form>;
};
