"use client";

import Image from "next/image";
import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

export default function BoardTilt() {
	useEffect(() => {
		const board = document.getElementById("board") as HTMLImageElement;
		VanillaTilt.init(board, {
			max: 7.5,
			speed: 400,
			glare: true,
			"max-glare": 0.5,
			gyroscope: true,
		});
	}, []);

	return (
		<div className="order-3 lg:order-1 flex items-center justify-center max-md:w-full lg:h-full select-none -z-10 translate-y-[15vh] lg:translate-y-0 lg:-translate-x-1/3 scale-[1.35]">
			<Image
				id="board"
				src={`/board.svg`}
				width={1024}
				height={1024}
				alt="Chess board for decoration"
			/>
		</div>
	);
}
