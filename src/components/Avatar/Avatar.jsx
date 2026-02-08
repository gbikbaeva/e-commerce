import clsx from "clsx";

const Avatar = ({ src, name }) => {
  const commonClasses = "size-12 shrink-0 rounded-full";
  return (
    <div className="size-12">
      {src ? (
        <img
          src={src}
          alt={`${name}'s avatar`}
          className={clsx(commonClasses, "object-cover")}
          loading="lazy"
        ></img>
      ) : (
        <div
          className={clsx(
            commonClasses,
            "bg-gray-200",
            "flex items-center justify-center",
            "font-medium text-xl text-center text-neutral-600",
          )}
        >
          {name
            ? name
                .split(" ")
                .map((n) => n.charAt(0).toUpperCase())
                .join("")
            : ""}
        </div>
      )}
    </div>
  );
};

export default Avatar;
