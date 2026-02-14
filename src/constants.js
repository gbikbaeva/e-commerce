const COLORS = {
  white: { value: "#fff", label: "White" },
  black: { value: "#000", label: "Black" },
  red: { value: "#DC2626", label: "Red" },
  orange: { value: "#EA580C", label: "Orange" },
  yellow: { value: "#F59E0B", label: "Yellow" },
  green: { value: "#10B981", label: "Green" },
  blue: { value: "#4F46E5", label: "Blue" },
  brown: { value: "#CA8A04", label: "Brown" },
  beige: { value: "#d2b08a", label: "Beige" },
  pink: { value: "#EC4899", label: "Pink" },
};

const FILTER_COLLECTIONS = {
  label: "Collections",
  value: "collections",
  items: [
    { label: "Latest arrivals", value: "latest" },
    {
      label: "Urban Oasis",
      value: "urban",
    },
    {
      label: "Cozy Comfort",
      value: "cozy",
    },
    {
      label: "Fresh Fusion",
      value: "fresh",
    },
  ],
};

const FILTER_CATEGORIES = {
  label: "Categories",
  value: "categories",
  items: [
    {
      label: "Unisex",
      value: "unisex",
    },
    {
      label: "Women",
      value: "women",
    },
    {
      label: "Men",
      value: "men",
    },
  ],
};

const FILTER_COLORS = {
  label: "Colors",
  value: "colors",
  items: [
    {
      color: COLORS.white.value,
      value: "white",
    },
    {
      color: COLORS.black.value,
      value: "black",
    },
    {
      color: COLORS.red.value,
      value: "red",
    },
    {
      color: COLORS.orange.value,
      value: "orange",
    },
    {
      color: COLORS.yellow.value,
      value: "yellow",
    },
    {
      color: COLORS.green.value,
      value: "green",
    },
    {
      color: COLORS.blue.value,
      value: "blue",
    },
    {
      color: COLORS.brown.value,
      value: "brown",
    },
    {
      color: COLORS.beige.value,
      value: "beige",
    },
    {
      color: COLORS.pink.value,
      value: "pink",
    },
  ],
};

const FILTER_RATINGS = {
  label: "Ratings",
  value: "ratings",
  items: [
    {
      value: 5,
      label: "5 star rating",
    },
    {
      value: 4,
      label: "4 star rating",
    },
    {
      value: 3,
      label: "3 star rating",
    },
    {
      value: 2,
      label: "2 star rating",
    },
    {
      value: 1,
      label: "1 star rating",
    },
  ],
};

export {
  COLORS,
  FILTER_COLLECTIONS,
  FILTER_CATEGORIES,
  FILTER_COLORS,
  FILTER_RATINGS,
};
