import { motion } from 'framer-motion';

export const SectionHeading = ({
  title,
  subtitle,
  eyebrow,
  centered = false,
  light = false,
  tone,
}) => {
  const isDark = light || tone === 'dark';

  return (
    <div className={`mb-8 sm:mb-12 md:mb-14 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {eyebrow && (
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.22em] uppercase mb-2.5 sm:mb-3 text-brand-green">
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-3 sm:mb-4 ${
            isDark ? 'text-white' : 'text-brand-dark'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            } ${centered ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </p>
        )}
        <div
          className={`h-1 w-14 sm:w-16 bg-brand-green mt-4 sm:mt-6 rounded-full ${
            centered ? 'mx-auto' : ''
          }`}
        />
      </motion.div>
    </div>
  );
};
