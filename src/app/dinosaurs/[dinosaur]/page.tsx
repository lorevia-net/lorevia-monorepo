"use client";

import { React, useEffect, useState } from "react";
import { Dino } from "../../types.ts";
import Link from "next/link";

type RouteParams = { params: Promise<{ dinosaur: string }> };

export default function Dinosaur({ params }: RouteParams) {
    const selectedDinosaur = params.then((params) => params.dinosaur);
    const [dinosaur, setDino] = useState<Dino>(undefined);

    useEffect(() => {
        (async () => {
            const resp = await fetch(`/api/dinosaurs/${await selectedDinosaur}`);
            const dino = await resp.json() as Dino;
            setDino(dino);
        })();
    }, []);
    return (
        <main>
            {
                typeof dinosaur === 'undefined' ? <p>Loading...</p> :
                    <>
                        <h1>{dinosaur.name}</h1>
                        <p>{dinosaur.description}</p>
                    </>
            }
            <Link href="/dinosaurs">🠠 Back to all dinosaurs</Link>
        </main>
    );
}
