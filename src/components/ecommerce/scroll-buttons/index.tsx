import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import ButtonScroll, { variationButton } from '../button-scroll';

interface Props {
  variationButton: variationButton;
}

const ScrollButtons: React.FC<Props> = ({ children, variationButton }) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showButtonLeft, setShowButtonLeft] = useState(false);
  const [showButtonRight, setShowButtonRight] = useState(true);

  const onScroll = () => {
    if (tabsRef.current?.scrollLeft && tabsRef.current.scrollLeft > 0) {
      setShowButtonLeft(true);
    } 
     else {
      setShowButtonLeft(false);
    }

    if (
      tabsRef.current?.scrollLeft &&
      tabsRef.current?.scrollLeft ==
        tabsRef.current?.scrollWidth - tabsRef.current?.clientWidth
    ) {
      setShowButtonRight(false);
    } else {
      setShowButtonRight(true);
    }
  };

  const onButtonRightClick = () => {
    if (tabsRef.current?.scrollLeft != undefined) {
      tabsRef.current.scrollLeft = tabsRef.current.scrollLeft + 300;
    }
  };
  const onButtonLeftClick = () => {
    if (tabsRef.current?.scrollLeft != undefined) {
      tabsRef.current.scrollLeft = tabsRef.current.scrollLeft - 300;
    }
  };
  
  return (
    <div className="GridButtoScroll w-full bg-white">
      {showButtonLeft && (
        <ButtonScroll variations={variationButton} onClick={onButtonLeftClick}>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </ButtonScroll>
      )}
      <div
        onScroll={onScroll}
        ref={tabsRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {children}
      </div>

      {showButtonRight && (
        <ButtonScroll variations={variationButton} onClick={onButtonRightClick} right>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </ButtonScroll>
      )}
    </div>
  );
};

export default ScrollButtons;
