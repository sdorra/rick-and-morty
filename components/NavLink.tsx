"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  href: string;
  exact?: boolean;
  className?: string;
};

const NavLink: FC<Props> = ({ href, className, children, exact = true }) => {
  const path = usePathname();
  const isActive = exact ? href === path : path.startsWith(href);
  return (
    <Link
      className={clsx(className, {
        "text-stone-100 underline decoration-pink-600 decoration-2 underline-offset-2": isActive,
      })}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
