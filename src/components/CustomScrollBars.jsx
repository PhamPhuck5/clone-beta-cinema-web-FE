import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./CustomScrollbars.scss";

const CustomScrollbars = forwardRef(
  (
    {
      quickScroll = false,
      className,
      disableVerticalScroll = false,
      disableHorizontalScroll = false,
      children,
      ...otherProps
    },
    ref
  ) => {
    const scrollRef = useRef(null);

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      getScrollLeft: () => scrollRef.current?.getScrollLeft(),
      getScrollTop: () => scrollRef.current?.getScrollTop(),
      scrollTo: (targetTop) => smoothScroll(targetTop),
      scrollToBottom: () => {
        const scrollbars = scrollRef.current;
        if (!scrollbars) return;
        smoothScroll(scrollbars.getScrollHeight());
      },
    }));

    // Smooth scroll helper
    const smoothScroll = (targetTop) => {
      const scrollbars = scrollRef.current;
      if (!scrollbars) return;

      const originalTop = scrollbars.getScrollTop();
      let iteration = 0;
      const maxIter = 30;
      const step = () => {
        iteration++;
        if (iteration > maxIter) return;

        const nextTop =
          originalTop + ((targetTop - originalTop) / maxIter) * iteration;
        scrollbars.scrollTop(nextTop);

        if (quickScroll) {
          step();
        } else {
          setTimeout(step, 20);
        }
      };
      step();
    };

    const combinedClass = `${className ? className + " " : ""}custom-scrollbar`;

    const renderNone = () => <div />;

    return (
      <Scrollbars
        ref={scrollRef}
        autoHide
        autoHideTimeout={200}
        hideTracksWhenNotNeeded
        className={combinedClass}
        {...otherProps}
        renderTrackHorizontal={disableHorizontalScroll ? renderNone : undefined}
        renderTrackVertical={disableVerticalScroll ? renderNone : undefined}
        renderThumbHorizontal={disableHorizontalScroll ? renderNone : undefined}
        renderThumbVertical={disableVerticalScroll ? renderNone : undefined}
      >
        {children}
      </Scrollbars>
    );
  }
);

export default CustomScrollbars;
