import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCross,
  faMale,
  faMars,
  faOtter,
  faQuestion,
  faStarOfLife,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FC, ReactNode, use } from "react";
import { getCharacter, getLocation } from "rickmortyapi";
import { PageProps } from "types";

const fetchCharacters = async (locationId: string) => {
  const location = await getLocation(parseInt(locationId));
  // residents has type character but contains an string array
  const residents = location.data.residents as unknown as string[];
  const ids = residents.map((url) => {
    const parts = url.split("/").filter((p) => p.length > 0);
    return parseInt(parts[parts.length - 1]);
  });

  const characters = await getCharacter(ids);
  let data = characters.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return {
    characters: data,
    location,
  };
};

const statusIcon = (status: string) => {
  if (status === "Dead") {
    return faCross;
  } else if (status === "Alive") {
    return faStarOfLife;
  }
  return faQuestion;
};

const genderIcon = (gender: string) => {
  if (gender === "Female") {
    return faVenus;
  } else if (gender === "Male") {
    return faMale;
  }
  return faQuestion;
};

type CharacterDetailProps = {
  icon: IconProp;
  children: ReactNode;
};

const CharacterDetail = ({ icon, children }: CharacterDetailProps) => (
  <li>
    <FontAwesomeIcon icon={icon} className="w-6" /> {children}
  </li>
);

const Location: FC<PageProps> = ({ params }) => {
  const locationId = params?.location;
  if (!locationId || Array.isArray(locationId)) {
    notFound();
    return null;
  }
  const { characters, location } = use(fetchCharacters(locationId));
  return (
    <>
      <h1 className="text-4xl mb-2">{location.data.name}</h1>
      <p className="mb-5 text-stone-400">
        Characters which resident on <strong className="text-stone-300">{location.data.name}</strong>
      </p>
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {characters.map((c) => (
          <li
            key={c.id}
            className="bg-stone-700 rounded-lg flex overflow-hidden min-w-[18rem]"
          >
            <Image
              src={c.image}
              alt={`Image of ${c.name}`}
              width={128}
              height={128}
              className="object-cover"
            />
            <div className="p-2 flex flex-col flex-grow">
              <h3 className="text-lg mb-2">{c.name}</h3>
              <ul className="text-sm text-stone-300 ml-2 flex-grow">
                <CharacterDetail icon={statusIcon(c.status)}>{c.status}</CharacterDetail>
                <CharacterDetail icon={genderIcon(c.gender)}>{c.gender}</CharacterDetail>
                <CharacterDetail icon={faOtter}>{c.species}</CharacterDetail>
              </ul>
              <time className="text-xs text-stone-400 text-right block mt-2" dateTime={c.created}>
                {new Date(c.created).toISOString().split("T")[0]}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Location;
