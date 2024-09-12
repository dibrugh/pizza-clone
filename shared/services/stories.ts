import { Story, StoryItem } from "@prisma/client";
import { axiosInstance } from "./axios";

export type StoryType = Story & {
	items: StoryItem[];
};

export const getAll = async () => {
	const { data } = await axiosInstance.get<StoryType[]>("/stories");

	return data;
};
