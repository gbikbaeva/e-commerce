import { useContext } from "react";
import {
  DropdownButton,
  DropdownItem,
} from "../../../components/DropdownButton";
import { SORT_OPTIONS } from "../../../constants";
import { ProductListingContext } from "./contexts";

const Sort = () => {
  const { selectedSort, setSelectedSort } = useContext(ProductListingContext);

  return (
    <DropdownButton label="Sort by">
      {SORT_OPTIONS.map((option) => (
        <DropdownItem
          key={option.value + option.direction || ""}
          selected={
            selectedSort.value === option.value &&
            selectedSort.direction === option.direction
          }
          onSelect={() => setSelectedSort(option)}
        >
          {option.label}
        </DropdownItem>
      ))}
    </DropdownButton>
  );
};

export default Sort;
