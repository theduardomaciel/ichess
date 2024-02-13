import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Icons
import WarningIcon from "@/public/icons/warning.svg";
import CheckCircleIcon from "@/public/icons/check_circle.svg";
import ArrowRightIcon from "@/public/icons/arrow_right.svg";

// Components
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";

// Types
import type { UseFormReturn } from "react-hook-form";

export interface FormProps {
	form: UseFormReturn<any>;
}

interface FormSectionProps {
	title: string;
	canSelect?: boolean;
	form: FormProps["form"];
	fields: {
		name?: string;
		value?: boolean;
	}[];
	section: number;
	isSelected?: boolean;
	children?: React.ReactNode;
}

function FormSection({
	children,
	canSelect,
	form,
	isSelected,
	...rest
}: FormSectionProps) {
	const router = useRouter();

	return (
		<div
			id={`section${rest.section}`}
			className={cn(
				"flex flex-col lg:flex-row items-start justify-start gap-9 lg:gap-16 w-full transition-opacity duration-300 ease-in-out pt-4 -mt-4",
				{
					"opacity-50 select-none": !isSelected,
					"pointer-events-none": !canSelect && !isSelected,
				}
			)}
		>
			<FormProgress {...rest} />
			<div
				className="flex flex-col justify-start items-start gap-6 p-9 w-full rounded-2xl border border-background-100 relative"
				onClick={() => {
					if (!isSelected && canSelect) {
						// Atualizamos o valor do formulário para o valor da seção atual
						form.setValue("formType", `section${rest.section}`);

						// Scrollamos para a seção atual
						router.replace(`?section=${rest.section}`, {
							scroll: false,
						});
						document
							.getElementById(`section${rest.section}`)
							?.scrollIntoView({
								behavior: "smooth",
							});
					}
				}}
			>
				{children}
			</div>
		</div>
	);
}

function FormProgress({
	title,
	section,
	fields,
}: Omit<FormSectionProps, "form">) {
	return (
		<div className="flex flex-col w-full lg:sticky top-4 left-0 lg:w-2/5 bg-background-600 rounded-2xl border border-primary-100">
			<div className="flex flex-row items-center justify-start px-6 py-[18px] bg-primary-100 rounded-tl-2xl rounded-tr-2xl">
				<h6 className="font-extrabold text-base lg:text-lg">
					{section}. {title}
				</h6>
			</div>
			<ul className="flex flex-col items-start justify-start px-9 py-[18px] gap-4">
				{fields.map((field, key) => {
					if (!field.name) return null;

					return (
						<li
							key={key}
							className={cn(
								"flex flex-row items-center justify-start gap-2 text-sm lg:text-base text-neutral select-none",
								{
									"opacity-50 text-primary-200": field.value,
								}
							)}
						>
							{field.value && <CheckCircleIcon />}
							<span className="font-semibold">{field.name}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export interface PanelProps extends React.HTMLAttributes<HTMLParagraphElement> {
	className?: string;
	type?: "error" | "warning" | "info" | "hint";
	children: React.ReactNode;
}

function Panel({ className, type = "info", children, ...rest }: PanelProps) {
	return (
		<div
			className={cn(
				"inline-flex flex-row w-full px-6 py-3 rounded-lg justify-start items-center gap-2.5 text-white",
				{
					"bg-tertiary-200 dark:bg-tertiary-200/50": type === "error",
					"bg-secondary-100 dark:bg-secondary-100/50":
						type === "warning",
					"bg-info-100 dark:bg-info-100/50": type === "info",
					"bg-primary-200 dark:bg-primary-200/50": type === "hint",
				}
			)}
		>
			{/* {
				{
					error: <WarningIcon />,
					warning: <WarningIcon />,
					info: <WarningIcon />,
					hint: <WarningIcon />,
				}[type]
			} */}
			{type === "warning" && <WarningIcon />}
			<p
				className={cn(
					"grow shrink basis-0 text-sm font-medium whitespace-pre-wrap w-full",
					className
				)}
				{...rest}
			>
				{children}
			</p>
		</div>
	);
}

function NextSectionButton({
	isFinalSection = false,
}: {
	isFinalSection?: boolean;
}) {
	return (
		<div className="flex flex-row items-center justify-end w-full">
			<Button
				className="px-9 h-12 text-white font-extrabold bg-primary-200 w-full md:w-fit"
				type="submit"
			>
				{isFinalSection ? (
					"Concluir"
				) : (
					<>
						Continuar
						<ArrowRightIcon />
					</>
				)}
			</Button>
		</div>
	);
}

function ResearchHeader({
	index,
	children,
}: {
	index: number;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-start justify-start gap-2">
			<div className="flex flex-row items-center justify-between w-full">
				<FormLabel>Pergunta {index}</FormLabel>
				<p className="text-xs lg:text-sm text-muted/80">Opcional</p>
			</div>
			<FormLabel className="font-bold">{children}</FormLabel>
		</div>
	);
}

export { FormSection, FormProgress, Panel, NextSectionButton, ResearchHeader };
