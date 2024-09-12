"use client";

import { useEffect, useState } from "react";
import { Api } from "@/shared/services/api-client";
import { StoryType } from "@/shared/services/stories";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import ReactInstaStories from "react-insta-stories";

type Props = {
	className?: string;
};

export const Stories = ({ className }: Props) => {
	const [stories, setStories] = useState<StoryType[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedStory, setSelectedStory] = useState<StoryType>();

	useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll();
			setStories(data);
		}

		fetchStories();
	}, []);

	const onClickStory = (story: StoryType) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	return (
		<>
			<Container
				className={cn(
					"flex items-center justify-between gap-2 my-10",
					className
				)}
			>
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<div
							key={index}
							className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
						/>
					))}

				{stories.map((story) => (
					<img
						key={story.id}
						onClick={() => onClickStory(story)}
						src={story.previewImageUrl}
						height={250}
						width={200}
						className="rounded-md cursor-pointer"
					/>
				))}

				{open && (
					<div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
						<div className="relative" style={{ width: 520 }}>
							<button
								className="absolute -right-10 -top-5 z-30"
								onClick={() => setOpen(false)}
							>
								<X className="absolute right-0 top-0 w-8 h-8 text-white/50" />
							</button>

							<ReactInstaStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={
									selectedStory?.items.map((i) => ({ url: i.sourceUrl })) || []
								}
								defaultInterval={3000}
								width={520}
								height={800}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	);
};
