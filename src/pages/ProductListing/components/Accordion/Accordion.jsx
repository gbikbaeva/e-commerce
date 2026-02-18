import { useContext, useRef, useState } from "react";
import clsx from "clsx";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { AccordionItemContext } from "./contexts";

const AccordionHeader = ({ title }) => {
  const [id, isOpen, setIsOpen] = useContext(AccordionItemContext);
  const Icon = isOpen ? RiSubtractLine : RiAddLine;
  return (
    <button
      type="button"
      id={`accordion-header-${id}`}
      className={clsx(
        "w-full",
        "flex items-center justify-between gap-2",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
        "font-medium text-left text-neutral-900",
      )}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${id}`}
    >
      <span>{title}</span>
      <Icon className="size-5 text-neutral-600" aria-hidden="true" />
    </button>
  );
};

const AccordionContent = ({ children }) => {
  const [id, isOpen] = useContext(AccordionItemContext);
  const contentRef = useRef(null);

  return (
    <div
      className={clsx(
        "flex flex-col gap-6",
        "transition-max-height origin-top transform duration-300 ease-in-out",
        isOpen && "mt-6",
        isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
      )}
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
      }}
      id={`accordion-content-${id}`}
      ref={contentRef}
      role="region"
      aria-labelledby={`accordion-header-${id}`}
    >
      {children}
    </div>
  );
};

const AccordionItem = ({ children, id }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AccordionItemContext.Provider value={[id, isOpen, setIsOpen]}>
      {children}
    </AccordionItemContext.Provider>
  );
};

const Accordion = ({ children }) => {
  return (
    <div className="w-full">
      {Array.isArray(children)
        ? children.map((item) => (
            <div key={item.props.id}>
              {item}
              <div className="my-6 h-px bg-neutral-300"></div>
            </div>
          ))
        : children}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionHeader, AccordionContent };
