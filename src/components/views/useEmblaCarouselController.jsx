import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { newMovies } from "../../utils";
import { Navigate } from "react-router-dom";

export default function EmblaCarousel({ slides, slidesNull }) {
  // 1. Khởi tạo hook, truyền options nếu cần
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    speed: 10,
  });

  // 2. State để quản lý dot navigation
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // 3. Khi embla sẵn sàng, lấy danh sách snap positions và đăng ký sự kiện select
  useEffect(() => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
    setSelectedIndex(embla.selectedScrollSnap());
    const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => embla.off("select", onSelect);
  }, [embla]);

  // 4. Handlers cho nút Prev/Next và dot
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback((i) => embla && embla.scrollTo(i), [embla]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slidesNull
            ? Object.entries(newMovies).map(([path, imageUrl]) => (
                <div
                  className="embla__slide"
                  key={path}
                  onClick={() => Navigate(path)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={imageUrl} alt="Banner" />
                </div>
              ))
            : slides.map((src, idx) => (
                <div className="embla__slide" key={idx}>
                  <img src={src} />
                </div>
              ))}
        </div>
        <button
          className="embla__button btn_pre"
          onClick={scrollPrev}
          disabled={!embla}
        >
          ‹
        </button>
        <button
          className="embla__button btn_next"
          onClick={scrollNext}
          disabled={!embla}
        >
          ›
        </button>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            className={`embla__dot ${idx === selectedIndex ? "is-active" : ""}`}
            onClick={() => scrollTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}
