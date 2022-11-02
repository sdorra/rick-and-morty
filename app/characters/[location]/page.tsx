import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCross,
  faMale,
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

type CharactersProps = {
  characters: Awaited<ReturnType<typeof fetchCharacters>>["characters"];
};

const Characters = ({ characters }: CharactersProps) => (
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
            <CharacterDetail icon={statusIcon(c.status)}>
              {c.status}
            </CharacterDetail>
            <CharacterDetail icon={genderIcon(c.gender)}>
              {c.gender}
            </CharacterDetail>
            <CharacterDetail icon={faOtter}>{c.species}</CharacterDetail>
          </ul>
          <time
            className="text-xs text-stone-400 text-right block mt-2"
            dateTime={c.created}
          >
            {new Date(c.created).toISOString().split("T")[0]}
          </time>
        </div>
      </li>
    ))}
  </ul>
);

const NoCharacters = () => (
  <div className="text-stone-700 flex flex-col gap-5 justify-center items-center h-full w-full">
    {/* Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
    <svg className="w-64" viewBox="0 0 512 512">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="#b5b3b0" />
        </linearGradient>
      </defs>
      <path
        d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256z"
        fill="url(#grad1)"
      />
    </svg>
    <p className="text-stone-300">No characters found</p>
  </div>
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
        Characters which resident on{" "}
        <strong className="text-stone-300">{location.data.name}</strong>
      </p>
      {characters.length > 0 ? (
        <Characters characters={characters} />
      ) : (
        <NoCharacters />
      )}
    </>
  );
};

export default Location;
