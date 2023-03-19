import React, { CSSProperties, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./App.module.scss";
import cx from "clsx";

function App() {
  const contentRef = useRef<HTMLDivElement>(null);

  const { isExpanded, toggleExpand, animationProps, animationStyles } =
    useExpandAnimation(contentRef);

  return (
    <div>
      <button type="button" onClick={toggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'} animation
      </button>
      <div
        ref={contentRef}
        className={cx(styles.content)}
        style={{
          ...animationStyles,
        }}
        {...animationProps}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt modi
        quis pariatur sapiente at totam ipsam, saepe cupiditate ut eveniet rem
        obcaecati nesciunt quaerat itaque mollitia? Eligendi, veniam soluta
        voluptas voluptate aut ad nam explicabo eius minima necessitatibus
        assumenda reiciendis perspiciatis nihil provident ab adipisci quae
        doloremque eveniet? Autem aliquid placeat, quia eligendi eum corporis
        totam laborum ducimus doloribus accusantium id nulla facere qui. Autem
        suscipit est modi, rem saepe quas fugiat dignissimos quod voluptatum non
        velit dolorem, expedita, voluptatibus omnis ab obcaecati. Maiores
        ducimus laboriosam vel qui, voluptates tempore neque. Repellat minima
        nostrum nihil ratione voluptates magni tempora asperiores rem! Id
        excepturi eos illo esse necessitatibus sed enim, reprehenderit maxime
        ipsa facilis vitae eveniet ratione, doloremque aperiam modi pariatur
        magni. Excepturi nulla id, facilis nemo fugit doloremque amet eligendi
        beatae sunt voluptatem cupiditate.
      </div>
      <div style={{ backgroundColor: 'darkkhaki'}}>Some other content</div>
    </div>
  );
}

export default App;

function useExpandAnimation(contentRef: React.RefObject<HTMLElement>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (isExpanded && contentHeight === 0 && contentRef.current) {
      setContentHeight(contentRef.current.getBoundingClientRect().height);
      setIsExpanded(false);

      requestAnimationFrame(() => {
        setIsExpanded(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  return useMemo(
    () => ({
      isExpanded,
      toggleExpand: () => {
        if (isExpanded) {
          setContentHeight(contentRef.current!.getBoundingClientRect().height);
        }
        requestAnimationFrame(() => setIsExpanded((x) => !x));
      },
      animationProps: {
        onTransitionEnd: () => setContentHeight(0),
      },
      animationStyles: {
        height:
          isExpanded && contentHeight > 0
            ? contentHeight
            : isExpanded
            ? "auto"
            : 0,
        overflow: "hidden",
        transition: 'height 300ms',
      } as CSSProperties,
    }),
    [contentHeight, contentRef, isExpanded]
  );
}
