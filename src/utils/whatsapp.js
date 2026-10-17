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

export function buildWhatsAppUrl(data, number) {
  const text = encodeURIComponent(buildInquiryMessage(data));
  return `https://wa.me/${number}?text=${text}`;
}
