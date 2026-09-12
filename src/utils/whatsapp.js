export const WHATSAPP_NUMBER = '919876543210';
export function buildInquiryMessage(data) {
    const lines = [
        'New Pest Control Inquiry',
        '',
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Service: ${data.service}`,
    ];
    if (data.address?.trim()) {
        lines.push(`Address/Locality: ${data.address.trim()}`);
    }
    if (data.email?.trim()) {
        lines.push(`Email: ${data.email.trim()}`);
    }
    if (data.message?.trim()) {
        lines.push(`Message: ${data.message.trim()}`);
    }
    return lines.join('\n');
}
export function openWhatsAppInquiry(data) {
    const text = encodeURIComponent(buildInquiryMessage(data));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
}
