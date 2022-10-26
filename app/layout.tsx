import { FC, PropsWithChildren } from "react";
import { Raleway, Merriweather_Sans } from "@next/font/google";
import "tailwindcss/tailwind.css";
import clsx from "clsx";
import Link from "next/link";
import NavLink from "@/components/NavLink";

const raleway = Raleway({
  variable: "--display-font",
});
const merriweather = Merriweather_Sans({
  variable: "--body-font",
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className="h-full">
    <head>
      <title>Rick and Morty</title>
      <meta name="description" content="Rick and Morty NextJS 13 Example App" />
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body
      className={clsx(
        "h-full bg-stone-900 text-stone-100 p-10 flex flex-col gap-5",
        raleway.variable,
        merriweather.variable
      )}
    >
      <header>
        <nav>
          <ul className="text-stone-400 flex gap-5">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/characters" exact={false}>Characters</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="text-stone-400 text-right">© Sebastian Sdorra</footer>
    </body>
  </html>
);

export default RootLayout;
