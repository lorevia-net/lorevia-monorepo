"use client";

import { React, useEffect, useState } from "react";
import { Dino } from "../types.ts";
import NextLink from "next/link";

const Link = NextLink.default;

export default function Home() {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/dinosaurs`);
      const allDinosaurs = await response.json() as Dino[];
      setDinosaurs(allDinosaurs);
    })();
  }, []);

  console.log({ dinosaurs });

  return (
    <main>
      <h1>Welcome to the Dinosaur app</h1>
      <p>Click on a dinosaur below to learn more.</p>
      {dinosaurs.length <= 0 ? <p>Loading...</p> :
        <ul>
          {dinosaurs.map((dinosaur: Dino) => {
            return (
              <li key={dinosaur.name}>
                <Link href={`/dinosaurs/${dinosaur.name.toLowerCase()}`}>
                  {dinosaur.name}
                </Link>
              </li>
            );
          })}
        </ul>
      }
    </main>
  );
}
