"use client";

import { useForm, FormProvider } from "react-hook-form";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@/components/molecules/tabs";
import type { Gender, MaritalStatus } from "@/generated/client";
import { Button } from "../atoms/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { actionUpdateBasicInfo } from "@/modules/actions/profile.action";
import { SparklesText } from "../atoms/sparkles-text";
import type {
	AllUser,
	UpdateUserInfoPayload,
} from "@/modules/services/user.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BasicContentTab } from "./basic-content-tab";
import { AdditionalContentTab } from "./additional-content-tab";
import { SpouseContentTab } from "./spouse-content-tab";
import { PreferenceContentTab } from "./preference-content-tab";
import { Eye, Pencil } from "lucide-react";

const MIN_AGE = 17;
const currentDate = new Date();
const minDate = new Date(
	currentDate.setFullYear(currentDate.getFullYear() - MIN_AGE),
);

const basicDetailsSchema = z.object({
	salutation: z.string().min(1, "Salutation is required"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z
		.string()
		.email("Please enter a valid email address")
		.min(1, "Email is required"),
	profileImage: z.string().url().optional(),
});

const additionalDetailsSchema = z.object({
	homeAddress: z.string().min(1, "Home address is required"),
	country: z.string().min(1, "Country is required"),
	postalCode: z.string().min(1, "Postal code is required"),
	dateOfBirth: z
		.string()
		.refine((value) => {
			if (!value) return true;
			const birthDate = new Date(value);
			return birthDate <= minDate;
		}, "You must be at least 17 years old")
		.optional(),
	gender: z.string().optional(),
	maritalStatus: z.string().optional(),
});

const spouseDetailsSchema = z.object({
	spouseSalutation: z.string().optional(),
	spouseFirstName: z.string().optional(),
	spouseLastName: z.string().optional(),
});

const preferencesSchema = z.object({
	hobbies: z.string().optional(),
	favoriteSports: z.string().optional(),
	musicPreferences: z.string().optional(),
	moviePreferences: z.string().optional(),
});

export function ProfileTabs({
	data,
	editable,
}: {
	data: AllUser;
	editable?: boolean;
}) {
	const isMarried = data?.maritalStatus === "MARRIED";

	const tabs = useMemo(
		() => [
			"Basic Details",
			"Additional Details",
			...(isMarried ? ["Spouse Details"] : []),
			"Personal Preferences",
		],
		[isMarried],
	);

	const basicDetailsForm = useForm({
		defaultValues: {
			salutation: data.salutation || "",
			firstName: data.firstName || "",
			lastName: data.lastName || "",
			email: data.email || "",
			profileImage: data.profileImage ?? "",
		},
		resolver: zodResolver(basicDetailsSchema),
	});

	const additionalDetailsForm = useForm({
		defaultValues: {
			homeAddress: data.homeAddress || "",
			country: data.country || "",
			postalCode: data.postalCode || "",
			dateOfBirth: data.dateOfBirth?.toString() || "",
			gender: data.gender || "",
			maritalStatus: data.maritalStatus || "",
		},
		resolver: zodResolver(additionalDetailsSchema),
	});

	const spouseDetailsForm = useForm({
		defaultValues: {
			spouseSalutation: data.spouseSalutation || "",
			spouseFirstName: data.spouseFirstName || "",
			spouseLastName: data.spouseLastName || "",
		},
		resolver: zodResolver(spouseDetailsSchema),
	});

	const preferencesForm = useForm({
		defaultValues: {
			hobbies: data.hobbies || "",
			favoriteSports: data.favoriteSports || "",
			musicPreferences: data.musicPreferences || "",
			moviePreferences: data.moviePreferences || "",
		},
		resolver: zodResolver(preferencesSchema),
	});

	const onSubmit = async (data: UpdateUserInfoPayload) => {
		const res = await actionUpdateBasicInfo(data);
		if (res) {
			router.refresh();
		}
	};

	const handleSubmitBasicDetails = () => {
		basicDetailsForm.handleSubmit((data) => onSubmit(data))();
	};

	const handleSubmitAdditionalDetails = () => {
		additionalDetailsForm.handleSubmit((data) =>
			onSubmit({
				...data,
				gender: data.gender as Gender,
				maritalStatus: data.maritalStatus as MaritalStatus,
			}),
		)();
	};

	const handleSubmitSpouseDetails = () => {
		spouseDetailsForm.handleSubmit((data) => onSubmit(data))();
	};

	const handleSubmitPreferences = () => {
		preferencesForm.handleSubmit((data) => onSubmit(data))();
	};

	const router = useRouter();
	const query = useSearchParams();
	const pathname = usePathname();
	const queryTab = query.get("tab");

	const [activeTab, setActiveTab] = useState<string>(
		queryTab || "Basic Details",
	);

	useEffect(() => {
		if (queryTab && tabs.includes(queryTab as string)) {
			setActiveTab(queryTab as string);
		}
	}, [queryTab, tabs]);

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		router.push(`${pathname}?tab=${tab}`);
	};

	return (
		<Tabs
			defaultValue={activeTab}
			className="flex flex-col lg:flex-row gap-6 w-full xl:w-4xl min-h-screen"
		>
			<TabsList className="flex flex-row lg:flex-col lg:w-1/4 w-full justify-start items-start lg:items-stretch overflow-x-auto lg:overflow-visible gap-2">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab}
						value={tab}
						className={`w-full justify-start whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted py-4 cursor-pointer ${
							activeTab === tab ? "bg-primary text-primary-foreground" : ""
						}`}
						onClick={() => handleTabChange(tab)}
					>
						{tab}
					</TabsTrigger>
				))}
			</TabsList>

			<div className="flex-1 space-y-4">
				<div className="flex justify-between items-center">
					<SparklesText>My Profile</SparklesText>

					{!editable ? (
						<Button onClick={() => router.push("/home/edit-profile")}>
							<Pencil />
							Edit
						</Button>
					) : (
						<Button
							onClick={() => router.push("/home/profile")}
							variant="outline"
						>
							<Eye />
							View
						</Button>
					)}
				</div>
				<FormProvider {...basicDetailsForm}>
					<TabsContent value="Basic Details" className="border rounded-xl p-4">
						<BasicContentTab
							editable={editable}
							submit={handleSubmitBasicDetails}
							reset={basicDetailsForm.reset}
						/>
					</TabsContent>
				</FormProvider>

				<FormProvider {...additionalDetailsForm}>
					<TabsContent
						value="Additional Details"
						className="border rounded-xl p-4"
					>
						<AdditionalContentTab
							editable={editable}
							submit={handleSubmitAdditionalDetails}
							reset={additionalDetailsForm.reset}
						/>
					</TabsContent>
				</FormProvider>

				{isMarried && (
					<FormProvider {...spouseDetailsForm}>
						<TabsContent
							value="Spouse Details"
							className="border rounded-xl p-4"
						>
							<SpouseContentTab
								editable={editable}
								submit={handleSubmitSpouseDetails}
								reset={spouseDetailsForm.reset}
							/>
						</TabsContent>
					</FormProvider>
				)}

				<FormProvider {...preferencesForm}>
					<TabsContent
						value="Personal Preferences"
						className="border rounded-xl p-4"
					>
						<PreferenceContentTab
							editable={editable}
							submit={handleSubmitPreferences}
							reset={preferencesForm.reset}
						/>
					</TabsContent>
				</FormProvider>
			</div>
		</Tabs>
	);
}
