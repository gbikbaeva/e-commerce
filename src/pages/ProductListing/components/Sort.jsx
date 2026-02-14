import { useState } from "react";
import {
  DropdownButton,
  DropdownItem,
} from "../../../components/DropdownButton";
import { SORT_OPTIONS } from "../../../constants";

const Sort = () => {
  const [selectedSort, setSelectedSort] = useState(null);

  return (
    <DropdownButton label="Sort by">
      {SORT_OPTIONS.map((option) => (
        <DropdownItem
          key={option.value + option.direction || ""}
          selected={selectedSort === option.value}
          onSelect={() => setSelectedSort(option.value)}
        >
          {option.label}
        </DropdownItem>
      ))}
    </DropdownButton>
  );
};

export default Sort;
