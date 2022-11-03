import NavLink from "@/components/NavLink";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Merriweather_Sans, Raleway } from "@next/font/google";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import "./global.css";

config.autoAddCss = false;

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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Rick and Morty NextJS 13 Example App" />
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body
      className={clsx(
        "flex h-full flex-col gap-5 bg-stone-900 p-10 font-body text-stone-200",
        raleway.variable,
        merriweather.variable
      )}
    >
      <header>
        <nav>
          <ul className="flex gap-5 text-stone-400">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/characters" exact={false}>
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink href="/about">About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="pb-4 text-right text-stone-400">© Sebastian Sdorra</footer>
    </body>
  </html>
);

export default RootLayout;
