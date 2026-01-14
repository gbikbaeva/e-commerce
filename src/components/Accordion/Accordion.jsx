import { useContext, useRef, useState } from "react";
import { AccordionItemContext } from "./contexts";
import { RiAddCircleLine, RiIndeterminateCircleLine } from "react-icons/ri";
import clsx from "clsx";

const AccordionItem = ({ children, id }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <AccordionItemContext value={{ id, isOpen, setIsOpen }}>
        {children}
      </AccordionItemContext>
    </div>
  );
};

const AccordionHeader = ({ children }) => {
  const { id, isOpen, setIsOpen } = useContext(AccordionItemContext);
  const Icon = isOpen ? RiIndeterminateCircleLine : RiAddCircleLine;

  return (
    <button
      id={`accordion-header-${id}`}
      className={clsx(
        "w-full",
        "flex items-center justify-between gap-6",
        "rounded",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
        "text-left text-lg font-medium text-neutral-900",
      )}
      aria-controls={`accordion-content-${id}`}
      aria-expanded={isOpen}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{children}</span>
      <Icon className="size-6 text-neutral-400" />
    </button>
  );
};

const AccordionContent = ({ children }) => {
  const contentRef = useRef(null);
  const { id, isOpen } = useContext(AccordionItemContext);

  return (
    <div
      id={`accordion-content-${id}`}
      role="region"
      aria-labelledby={`accordion-header-${id}`}
      className={clsx(
        "transition-max-height duration-300 overflow-hidden",
        "pr-12",
        isOpen && "mt-2",
      )}
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
      }}
      ref={contentRef}
    >
      {children}
    </div>
  );
};

const Accordion = ({ children }) => {
  return (
    <div className="w-full">
      {children.map((item, index) => (
        <div key={item.props.id}>
          {item}
          {index !== children.length - 1 && (
            <div className="mb-6 mt-8 border-t border-solid border-neutral-200"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionHeader, AccordionContent };
