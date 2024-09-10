"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

type Props = {
	onChange?: (value?: string) => void;
};

export const AdressInput = ({ onChange }: Props) => {
	return (
		<AddressSuggestions
			token="d60ee8d46ecb8b371313305613d18513003167be"
			filterLocations={[{ country: "Беларусь" }]}
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
