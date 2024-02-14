"use client";

import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";

// Components
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// Types
import type { UseFormReturn } from "react-hook-form";

interface Moderator {
	name: string;
	image_url: string;
	id: string;
}

const moderators = [
	{
		name: "John Doe",
		image_url: "https://randomuser.me/api/portraits/men/18.jpg",
		id: "1",
	},
	{
		name: "Marcelo Silva",
		image_url: "https://randomuser.me/api/portraits/men/19.jpg",
		id: "2",
	},
	{
		name: "Marcos Melo",
		image_url: "https://randomuser.me/api/portraits/men/20.jpg",
		id: "3",
	},
	{
		name: "Luciano Cesa",
		image_url: "https://github.com/mark.png",
		id: "4",
	},
	{
		name: "Márcio Cavalcante",
		image_url: "https://randomuser.me/api/portraits/men/21.jpg",
		id: "5",
	},
] as Moderator[];

interface Props {
	form: UseFormReturn<any>;
	field: {
		value: string[];
	};
}

export function ResponsiblePicker({ form, field }: Props) {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<SelectorTrigger field={field} />
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
					<ModeratorsList form={form} field={field} />
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<FormControl>
					<SelectorTrigger field={field} />
				</FormControl>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<ModeratorsList form={form} field={field} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function ModeratorPreview({
	moderator,
	isActive,
}: {
	moderator: Moderator;
	isActive: boolean;
}) {
	return (
		<div
			className={cn("flex items-center justify-between w-full", {
				"opacity-50": isActive,
			})}
		>
			<div className="flex items-center gap-3">
				<img
					src={moderator.image_url}
					alt={moderator.name}
					className="w-8 h-8 rounded-full"
				/>
				<span>{moderator.name}</span>
			</div>
			<Check
				className={cn(
					"h-4 w-4",
					isActive ? "opacity-100" : "opacity-0"
				)}
			/>
		</div>
	);
}

function Tag({ moderator }: { moderator: Moderator }) {
	return (
		<li className="flex justify-start items-center pl-1 pr-2 py-1 bg-background-600 border border-primary-200/50 gap-2 rounded-full">
			<div className="flex items-center gap-3">
				<img
					src={moderator.image_url}
					alt={moderator.name}
					className="w-6 h-6 rounded-full"
				/>
				<span className="text-neutral text-xs font-bold">
					{moderator.name}
				</span>
			</div>
		</li>
	);
}

interface SelectorTriggerProps
	extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
	field: Props["field"];
}

const SelectorTrigger = forwardRef<
	React.ElementRef<typeof PopoverTrigger>,
	SelectorTriggerProps
>(({ field, ...props }, ref) => (
	<Button
		ref={ref}
		variant="outline"
		role="combobox"
		type="button"
		className={cn(
			"w-full justify-between h-fit font-normal text-sm lg:text-base min-h-[52px] px-3 lg:px-4",
			!field.value && "text-muted-foreground"
		)}
		{...props}
	>
		<ul className="flex flex-row flex-wrap justify-start gap-1">
			{field.value.length > 0
				? field.value.map((id) => {
						const moderator = moderators.find(
							(mod) => mod.id === id
						);
						if (!moderator) return null;

						return <Tag key={moderator.id} moderator={moderator} />;
				  })
				: "Selecione um moderador..."}
		</ul>
		<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
	</Button>
));

function ModeratorsList({ form, field }: Props) {
	return (
		<Command>
			<CommandInput placeholder="Procurar moderador..." />
			<CommandEmpty>Nenhum moderador encontrado.</CommandEmpty>
			<CommandGroup>
				{
					// Iterate through the moderators array
					// and render a CommandItem for each moderator
					moderators.map((moderator) => (
						<CommandItem
							key={moderator.id}
							className="aria-selected:bg-primary-200/50"
							onSelect={() => {
								if (field.value.includes(moderator.id)) {
									form.setValue(
										"responsible",
										field.value.filter(
											(id) => id !== moderator.id
										)
									);
								} else {
									form.setValue("responsible", [
										...field.value,
										moderator.id,
									]);
								}
							}}
						>
							<ModeratorPreview
								moderator={moderator}
								isActive={field.value.includes(moderator.id)}
							/>
						</CommandItem>
					))
				}
			</CommandGroup>
		</Command>
	);
}
