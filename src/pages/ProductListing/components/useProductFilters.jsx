import { useState } from "react";

export const useProductFilters = () => {
  const [selectedCollections, setSelectedCollections] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedColors, setSelectedColors] = useState(new Set());
  const [selectedRatings, setSelectedRatings] = useState(new Set());

  const filtersCount =
    selectedCollections.size +
    selectedCategories.size +
    selectedColors.size +
    selectedRatings.size;

  const resetFilters = () => {
    setSelectedCollections(new Set());
    setSelectedCategories(new Set());
    setSelectedColors(new Set());
    setSelectedRatings(new Set());
  };

  const onSelectCollection = (value) => {
    const newSelectedCollections = new Set(selectedCollections);
    if (newSelectedCollections.has(value)) {
      newSelectedCollections.delete(value);
    } else {
      newSelectedCollections.add(value);
    }
    setSelectedCollections(newSelectedCollections);
  };

  const onSelectCategory = (value) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(value)) {
      newSelectedCategories.delete(value);
    } else {
      newSelectedCategories.add(value);
    }
    setSelectedCategories(newSelectedCategories);
  };

  const onSelectColor = (value) => {
    const newSelectedColors = new Set(selectedColors);
    if (newSelectedColors.has(value)) {
      newSelectedColors.delete(value);
    } else {
      newSelectedColors.add(value);
    }
    setSelectedColors(newSelectedColors);
  };

  const onSelectRating = (value) => {
    const newSelectedRatings = new Set(selectedRatings);
    if (newSelectedRatings.has(value)) {
      newSelectedRatings.delete(value);
    } else {
      newSelectedRatings.add(value);
    }
    setSelectedRatings(newSelectedRatings);
  };

  return {
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
  };
};
