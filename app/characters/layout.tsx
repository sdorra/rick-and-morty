import NavLink from "@/components/NavLink";
import { FC, PropsWithChildren, use } from "react";
import { getLocations } from "rickmortyapi";

const fetchAllLocations = async () => {
  const initial = await getLocations();
  const locations = initial.data.results || [];

  const pages = initial.data.info?.pages || 1;
    for (let i=2; i<pages; i++) {
      const moreLocations = await getLocations({page: i})
      locations.push(...(moreLocations.data.results || []))
    }
    return locations;
};

const fetchLocations = async () => {
  const response = await getLocations();
  return response.data.results || [];
};

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
