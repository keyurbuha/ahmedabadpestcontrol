export const Marquee = ({
  children,
  speed = 'normal',
  reverse = false,
  pauseOnHover = true,
  className = '',
  gap = 'gap-8',
}) => {
  const duration = speed === 'slow' ? '70s' : speed === 'fast' ? '40s' : '55s';

  return (
    <div
      className={`marquee group/marquee relative w-full overflow-hidden ${className}`}
      style={{ ['--marquee-duration']: duration }}
    >
      <div
        className={`marquee-track flex w-max items-center ${gap} ${
          reverse ? 'marquee-reverse' : ''
        } ${pauseOnHover ? 'group-hover/marquee:[animation-play-state:paused]' : ''}`}
      >
        <div className={`flex shrink-0 items-center ${gap}`}>{children}</div>
        <div className={`flex shrink-0 items-center ${gap}`} aria-hidden>
          {children}
        </div>
        <div className={`flex shrink-0 items-center ${gap}`} aria-hidden>
          {children}
        </div>
        <div className={`flex shrink-0 items-center ${gap}`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};
