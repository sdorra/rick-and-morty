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
  <div className="flex flex-col-reverse sm:flex-row gap-5">
    <aside>
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
