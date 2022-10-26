import NavLink from "@/components/NavLink";
import { FC, PropsWithChildren, use } from "react";
import { getLocations } from "rickmortyapi";

const NavigationEntries = () => {
  const locations = use(getLocations());
  return (
    <>
      {locations.data.results?.map((location) => (
        <li key={location.id}>
          <NavLink href={`/characters/${location}`}>{location.name}</NavLink>
        </li>
      ))}
    </>
  );
};

const CharacterLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex">
    <aside className="w-72">
      <h3 className="text-stone-400 font-semibold">Locations</h3>
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
