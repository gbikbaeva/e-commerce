import { useState } from "react";
import { RiFilterLine } from "react-icons/ri";
import clsx from "clsx";

import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import ColorSwatch from "../../../components/ColorSwatch";
import Rating from "../../../components/Rating/Rating";
import SlideOut from "../../../components/SlideOut";
import {
  FILTER_CATEGORIES,
  FILTER_COLLECTIONS,
  FILTER_COLORS,
  FILTER_RATINGS,
} from "../../../constants";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import { useProductFilters } from "./useProductFilters";

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    selectedCollections,
    selectedCategories,
    selectedColors,
    selectedRatings,
    filtersCount,
    resetFilters,
    onSelectCollection,
    onSelectCategory,
    onSelectColor,
    onSelectRating,
  } = useProductFilters();

  const filterContent = (
    <div className="flex flex-col gap-6">
      <Accordion>
        <AccordionItem id={FILTER_COLLECTIONS.value}>
          <AccordionHeader title={FILTER_COLLECTIONS.label}></AccordionHeader>
          <AccordionContent>
            <div className="flex flex-col gap-4 lg:gap-6">
              {FILTER_COLLECTIONS.items.map((collection) => (
                <Checkbox
                  key={collection.value}
                  label={collection.label}
                  value={selectedCollections.has(collection.value)}
                  onChange={() => onSelectCollection(collection.value)}
                ></Checkbox>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id={FILTER_CATEGORIES.value}>
          <AccordionHeader title={FILTER_CATEGORIES.label}></AccordionHeader>
          <AccordionContent>
            {FILTER_CATEGORIES.items.map((category) => (
              <Checkbox
                key={category.value}
                label={category.label}
                value={selectedCategories.has(category.value)}
                onChange={() => onSelectCategory(category.value)}
              ></Checkbox>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id={FILTER_COLORS.value}>
          <AccordionHeader title={FILTER_COLORS.label}></AccordionHeader>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {FILTER_COLORS.items.map((color) => (
                <ColorSwatch
                  key={color.value}
                  color={color.color}
                  size="sm"
                  type="checkbox"
                  selectedColor={
                    selectedColors.has(color.value) ? color.color : null
                  }
                  onClick={() => onSelectColor(color.value)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="rating">
          <AccordionHeader title="Rating"></AccordionHeader>
          <AccordionContent>
            <div className="flex flex-col items-start gap-4 lg:gap-6">
              {FILTER_RATINGS.items.map((rating) => (
                <button
                  type="button"
                  key={rating.value}
                  className={clsx(
                    "group rounded",
                    "focus:outline-none focus:ring-indigo-600/[.12] focus:ring-offset-0 focus-visible:ring-2",
                  )}
                  onClick={() => onSelectRating(rating.value)}
                >
                  <Rating
                    value={rating.value}
                    selected={selectedRatings.has(rating.value)}
                    showHover={true}
                  ></Rating>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {filtersCount > 0 && (
        <Button
          variant="tertiary"
          size="lg"
          label={`Clear All ${filtersCount > 0 ? `(${filtersCount})` : ""}`}
          onClick={() => {
            resetFilters();
            setIsFilterOpen(false);
          }}
        ></Button>
      )}
    </div>
  );

  return (
    <div>
      <div className="sticky hidden lg:block lg:pr-4 lg:pt-4 lg:pb-4">
        {filterContent}
      </div>
      <div className="block lg:hidden">
        <SlideOut
          trigger={
            <Button
              variant="secondary"
              label="Filter"
              startIcon={RiFilterLine}
              onClick={() => setIsFilterOpen(true)}
            />
          }
          title={<h2 className="text-xl text-neutral-900">Filter</h2>}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        >
          {filterContent}
        </SlideOut>
      </div>
    </div>
  );
};

export default Filter;
