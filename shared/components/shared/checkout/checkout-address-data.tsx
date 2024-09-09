import { Input } from "../../ui";
import { FormTextarea } from "../form";
import { WhiteBlock } from "../white-block";

type Props = {
	className?: string;
};

export const CheckoutAddressData = ({ className }: Props) => {
	return (
		<WhiteBlock title="3. Адрес доставки">
			<div className="flex flex-col gap-5">
				<Input name="address" className="text-base" placeholder="Адрес" />
				<FormTextarea
					name="comment"
					className="text-base"
					placeholder="Комментарий"
				/>
			</div>
		</WhiteBlock>
	);
};
