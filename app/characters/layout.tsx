import NavLink from "@/components/NavLink";
import fetchLocations from "@/lib/fetchLocations";
import { FC, PropsWithChildren, use } from "react";

const NavigationEntries = () => {
  const locations = use(fetchLocations());
  return (
    <>
      {locations.map((location) => (
        <li key={location.id}>
          <NavLink href={`/characters/${location.id}`}>{location.name}</NavLink>
        </li>
      ))}
    </>
  );
};

const CharacterLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col-reverse gap-5 sm:flex-row">
    <aside>
      <h3 className="font-semibold text-stone-400">Locations</h3>
      <nav>
        <ul className="">
          <NavigationEntries />
        </ul>
      </nav>
    </aside>
    <div>{children}</div>
  </div>
);

export default CharacterLayout;
