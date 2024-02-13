"use client";

import { useSearchParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

// Components
import {
	type FormProps,
	FormSection,
	NextSectionButton,
	Panel,
} from "@/components/forms";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Validation
import { isValid } from "@/validations";
import {
	type JoinFormSection2Schema,
	joinFormSection2Schema,
} from "@/validations/JoinForm/section2";

const section2Keys = Object.keys(
	joinFormSection2Schema.shape
) as (keyof JoinFormSection2Schema)[];

const formTitles = {
	experience: "Experiência",
	username: "Nick no Chess.com",
};

export default function JoinForm2({ form }: FormProps) {
	const currentSection = useSearchParams().get("section");

	const section2 = section2Keys.map((key) => {
		return {
			name: formTitles[key],
			value: isValid(key, 2, form),
		};
	});

	return (
		<FormSection
			form={form}
			canSelect={
				!isNaN(Number(currentSection)) && Number(currentSection) > 1
			}
			section={2}
			isSelected={currentSection === "2"}
			title="Experiência com Xadrez"
			fields={section2}
		>
			<FormField
				control={form.control}
				name="section2.experience"
				render={({ field }) => (
					<FormItem>
						<FormLabel>{formTitles.experience}</FormLabel>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Escolha uma opção" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="inexperienced">
									Nunca joguei nem sei como se mexe as peças
								</SelectItem>
								<SelectItem value="rookie">
									Já joguei algumas vezes, mas não sei muita
									coisa
								</SelectItem>
								<SelectItem value="competitor">
									Jogo frequentemente e já participei de
									torneios
								</SelectItem>
								<SelectItem value="master">
									Sou um mestre do xadrez
								</SelectItem>
							</SelectContent>
						</Select>
						<Panel type="hint">
							Não se acanhe ao escolher uma opção! Estamos aqui
							para garantir que você aprenda e se divirta com o
							xadrez!
						</Panel>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="section2.username"
				render={({ field }) => (
					<FormItem>
						<FormLabel>{formTitles.username}</FormLabel>
						<FormControl>
							<Input placeholder="" {...field} />
						</FormControl>
						<Panel type="info">
							Não tem uma conta no Chess.com? Crie uma em
							<a
								className="underline ml-1 break-all"
								href="https://www.chess.com/pt-BR/register"
								target="_blank"
							>
								https://www.chess.com/pt-BR/register
							</a>
						</Panel>
						<FormMessage />
					</FormItem>
				)}
			/>
			<NextSectionButton />
		</FormSection>
	);
}