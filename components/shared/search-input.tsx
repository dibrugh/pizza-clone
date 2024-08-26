"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

type Props = { className?: string };

export const SearchInput = ({ className }: Props) => {
	const [focused, setFocused] = useState(false);
	const ref = useRef(null);

	useClickAway(ref, () => {
		setFocused(false);
	});

	return (
		<>
			{focused && (
				<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30"></div>
			)}

			<div
				ref={ref}
				className={cn(
					"flex rounded-2xl flex-1 justify-between relative h-11 z-30",
					className
				)}
			>
				<Search className="absolute top-1/2 left-3 translate-y-[-50%] h-5 text-gray-400" />
				<input
					type="text"
					className="w-full rounded-2xl pl-11 outline-none bg-gray-100"
					placeholder="Найти пиццу..."
					onFocus={() => setFocused(true)}
				/>

				<div
					className={cn(
						"absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
						focused && "visible opacity-100 top-12"
					)}
				>
					<Link
						href={"/product/1"}
						className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
					>
						<img className="rounded-sm h-8 w-8" src="" alt="Pizza 1" />
						<span>Пицца</span>
					</Link>
				</div>
			</div>
		</>
	);
};
