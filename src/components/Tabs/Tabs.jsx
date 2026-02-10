import clsx from "clsx";

const Tabs = ({ label, tabs, activeTab, onTabChange }) => {
  return (
    <div className="isolate min-w-0 w-full overflow-x-auto overflow-y-hidden">
      <div className="flex flex-col justify-center border-b border-neutral-300">
        <nav className="flex items-center gap-6" aria-label={label}>
          {tabs.map((tab) => {
            return (
              <button
                type="button"
                key={tab.value}
                className={clsx(
                  "h-9 px-1 pb-3",
                  "flex justify-center items-center gap-2",
                  "border-solid border-neutral-300",
                  "cursor-pointer",
                  "whitespace-nowrap z-10 transition",
                  activeTab === tab.value &&
                    "border border-x-0 border-t-0 border-b-indigo-600",
                )}
                onClick={() => onTabChange(tab.value)}
              >
                <span
                  className={clsx(
                    "transition-all",
                    "font-medium text-base",
                    activeTab === tab.value
                      ? "text-indigo-700"
                      : "text-neutral-600",
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
