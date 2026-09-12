import { Helmet } from 'react-helmet-async';

export const JsonLd = ({ data }) => {
  if (!data) return null;
  const payload = Array.isArray(data) ? data : [data];

  return (
    <Helmet>
      {payload.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};
