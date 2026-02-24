import {
  RiFacebookBoxLine,
  RiGithubLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from "react-icons/ri";

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

const COLLECTIIONS = [
  { label: "Latest arrivals", value: "latest" },
  { label: "Urban Oasis", value: "urban" },
  { label: "Cozy Comfort", value: "cozy" },
  { label: "Fresh Fusion", value: "fresh" },
];

const FILTER_COLLECTIONS = {
  label: "Collections",
  value: "collections",
  items: COLLECTIIONS,
};

const CATEGORIES = [
  { label: "Unisex", value: "unisex" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
];

const SIZE = {
  xs: { short: "XS", long: "Extra Small" },
  sm: { short: "S", long: "Small" },
  md: { short: "M", long: "Medium" },
  lg: { short: "L", long: "Large" },
  xl: { short: "XL", long: "Extra Large" },
};

const FILTER_CATEGORIES = {
  label: "Categories",
  value: "categories",
  items: CATEGORIES,
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

const SORT_OPTIONS = [
  {
    label: "Newest",
    value: "created",
    direction: "desc",
  },
  {
    label: "Best rating",
    value: "rating",
    direction: "desc",
  },
  {
    label: "Most popular",
    value: "popularity",
    direction: "desc",
  },
  {
    label: "Price: Low to high",
    value: "price",
    direction: "asc",
  },
  {
    label: "Price: High to low",
    value: "price",
    direction: "desc",
  },
];

const FOOTER_SOCIALS = [
  {
    icon: RiYoutubeLine,
    url: "https://youtube.com",
    name: "Link to Stylenest's youtube profile",
  },
  {
    icon: RiInstagramLine,
    url: "https://instagram.com",
    name: "Link to Stylenest's instagram profile",
  },
  {
    icon: RiFacebookBoxLine,
    url: "https://facebook.com",
    name: "Link to Stylenest's facebook profile",
  },
  {
    icon: RiGithubLine,
    url: "https://github.com",
    name: "Link to Stylenest's github profile",
  },
  {
    icon: RiTwitterXLine,
    url: "https://twitter.com",
    name: "Link to Stylenest's twitter profile",
  },
];

export {
  COLORS,
  FILTER_COLLECTIONS,
  FILTER_CATEGORIES,
  FILTER_COLORS,
  FILTER_RATINGS,
  SORT_OPTIONS,
  CATEGORIES,
  COLLECTIIONS,
  FOOTER_SOCIALS,
  SIZE,
};
