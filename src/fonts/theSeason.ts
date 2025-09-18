// src/fonts.ts
import localFont from "next/font/local";

export const theSeasons = localFont({
  src: [
    {
      path: "../../public/font/Fontspring-DEMO-theseasons-reg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Fontspring-DEMO-theseasons-it.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/font/Fontspring-DEMO-theseasons-bd.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/Fontspring-DEMO-theseasons-bdit.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/font/Fontspring-DEMO-theseasons-lt.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/Fontspring-DEMO-theseasons-ltit.otf",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-the-seasons", // gives you a CSS variable
  display: "swap",
});
