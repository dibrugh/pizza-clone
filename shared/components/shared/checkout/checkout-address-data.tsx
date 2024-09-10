import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../../ui";
import { AdressInput } from "../adress-input";
import { FormTextarea } from "../form";
import { WhiteBlock } from "../white-block";
import { ErrorText } from "../error-text";

type Props = {
	className?: string;
};

export const CheckoutAddressData = ({ className }: Props) => {
	const { control } = useFormContext();
	return (
		<WhiteBlock title="3. Адрес доставки" className={className}>
			<div className="flex flex-col gap-5">
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => (
						<>
							<AdressInput onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					name="comment"
					className="text-base"
					placeholder="Комментарий"
				/>
			</div>
		</WhiteBlock>
	);
};
