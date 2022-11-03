import fetchLocation from "@/lib/fetchLocation";
import fetchLocations from "@/lib/fetchLocations";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCross, faMale, faOtter, faQuestion, faStarOfLife, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FC, ReactNode, use } from "react";
import { PageProps } from "types";

const statusIcon = (status: string | null) => {
  if (status === "Dead") {
    return faCross;
  } else if (status === "Alive") {
    return faStarOfLife;
  }
  return faQuestion;
};

const genderIcon = (gender: string | null) => {
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
  characters: Awaited<ReturnType<typeof fetchLocation>>["residents"];
};

const Characters = ({ characters }: CharactersProps) => (
  <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {characters.map((c) => (
      <li key={c.id} className="flex min-w-[18rem] overflow-hidden rounded-lg bg-stone-700">
        <Image
          src={c.image || "https://rickandmortyapi.com/api/character/avatar/249.jpeg"}
          alt={`Image of ${c.name}`}
          width={128}
          height={128}
          className="object-cover"
        />
        <div className="flex flex-grow flex-col p-2">
          <h3 className="mb-2 text-lg">{c.name}</h3>
          <ul className="ml-2 flex-grow text-sm text-stone-300">
            <CharacterDetail icon={statusIcon(c.status)}>{c.status}</CharacterDetail>
            <CharacterDetail icon={genderIcon(c.gender)}>{c.gender}</CharacterDetail>
            <CharacterDetail icon={faOtter}>{c.species}</CharacterDetail>
          </ul>
          {c.created ? (
            <time className="mt-2 block text-right text-xs text-stone-400" dateTime={c.created}>
              {new Date(c.created).toISOString().split("T")[0]}
            </time>
          ) : null}
        </div>
      </li>
    ))}
  </ul>
);

const NoCharacters = () => (
  <div className="flex flex-col justify-center mt-10 items-center gap-5 text-stone-700">
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
    return notFound();
  }
  const location = use(fetchLocation(parseInt(locationId)));
  return (
    <>
      <h1 className="mb-2 text-4xl">{location.name}</h1>
      <p className="mb-5 text-stone-400">
        Characters which resident on <strong className="text-stone-300">{location.name}</strong>
      </p>
      {location.residents.length > 0 ? <Characters characters={location.residents} /> : <NoCharacters />}
    </>
  );
};

export const generateStaticParams = async () => {
  const locations = await fetchLocations();
  return (
    locations.map((location) => ({
      location: String(location.id),
    })) || []
  );
};

export default Location;
