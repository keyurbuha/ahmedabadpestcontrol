import { useSiteContent } from "../content/SiteContent";
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X, ExternalLink } from 'lucide-react';
import { getYoutubeId, getYoutubeThumb, getYoutubeEmbedUrl } from '../utils/youtube';
const AUTOPLAY_MS = 3500;
export const YouTubeSlider = () => {
  const {
    contentText,
    youtubeVideos,
    YOUTUBE_CHANNEL_URL
  } = useSiteContent();
  const trackRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [paused, setPaused] = useState(false);
  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);
  const scrollByCard = useCallback((dir, {
    loop = false
  } = {}) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-yt-card]');
    const amount = card ? card.getBoundingClientRect().width + 16 : 280;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 8;
    const atStart = el.scrollLeft <= 8;
    if (dir > 0 && atEnd && loop) {
      el.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      return;
    }
    if (dir < 0 && atStart && loop) {
      el.scrollTo({
        left: el.scrollWidth,
        behavior: 'smooth'
      });
      return;
    }
    el.scrollBy({
      left: dir * amount,
      behavior: 'smooth'
    });
  }, []);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, {
      passive: true
    });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);
  useEffect(() => {
    if (paused || activeId) return;
    const id = window.setInterval(() => {
      scrollByCard(1, {
        loop: true
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, activeId, scrollByCard]);
  useEffect(() => {
    if (!activeId) return;
    const onKey = e => {
      if (e.key === 'Escape') setActiveId(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeId]);
  const activeVideo = youtubeVideos.find(v => v.id === activeId);
  return <>
      <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={e => {
      if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
    }} onTouchStart={() => setPaused(true)}>
        <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label={contentText("YouTubeSlider", "field1")} className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-dark/10 bg-white text-brand-dark shadow-md transition enabled:hover:bg-brand-green enabled:hover:text-white disabled:opacity-30 md:flex">
          <ChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label={contentText("YouTubeSlider", "field2")} className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-dark/10 bg-white text-brand-dark shadow-md transition enabled:hover:bg-brand-green enabled:hover:text-white disabled:opacity-30 md:flex">
          <ChevronRight size={22} />
        </button>

        <div ref={trackRef} className="flex gap-4 overflow-x-auto scroll-smooth px-1 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-8 md:gap-5 [&::-webkit-scrollbar]:hidden">
          {youtubeVideos.map(video => <button key={video.id} type="button" data-yt-card onClick={() => setActiveId(video.id)} className="group relative w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-brand-dark/8 bg-brand-dark text-left shadow-[0_18px_40px_-28px_rgba(12,22,16,0.55)] sm:w-[240px] md:w-[260px]">
              <div className="relative aspect-[9/16] overflow-hidden">
                <img src={getYoutubeThumb(getYoutubeId(video.url))} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/25 to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition group-hover:bg-brand-green">
                  <Play size={22} fill="currentColor" className="ml-0.5" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="line-clamp-3 font-display text-sm font-semibold leading-snug text-white">
                    {video.title}
                  </p>
                </div>
              </div>
            </button>)}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-green">{contentText("YouTubeSlider", "field3")}<ExternalLink size={16} />
        </a>
      </div>

      {activeVideo && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setActiveId(null)} role="dialog" aria-modal="true" aria-label={activeVideo.title}>
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-black shadow-2xl sm:max-w-lg" onClick={e => e.stopPropagation()}>
            <button type="button" onClick={() => setActiveId(null)} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-brand-green" aria-label={contentText("YouTubeSlider", "field4")}>
              <X size={20} />
            </button>
            <div className="aspect-[9/16] w-full">
              <iframe src={getYoutubeEmbedUrl(getYoutubeId(activeVideo.url))} title={activeVideo.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </div>
        </div>}
    </>;
};
