import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "Head",
            "Title01-B",
            "Title01-M",
            "Title01-SB",
            "Title02-B",
            "Title01-R",
            "Title02-M",
            "Title02-SB",
            "Body01-B",
            "Body01-SB",
            "Body01-M",
            "Body01-R",
            "Body02-SB",
            "Body02-M",
            "Body02-R",
            "Caption",
            "Button",
          ],
        },
      ],
    },
  },
});

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
