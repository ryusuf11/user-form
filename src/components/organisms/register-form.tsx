"use client";

import * as React from "react";
import { actionRegister } from "@/modules/actions/register.action";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { PasswordInput } from "@/components/atoms/password-input";
import { Button } from "@/components/atoms/button";
import { Label } from "@/components/atoms/label";
import { ShineBorder } from "@/components/atoms/shine-border";
import { AuroraText } from "../atoms/aurora-text";
import Link from "next/link";

export function RegisterForm() {
	const { handleSubmit, formState, onSubmit, register, isLoading } =
		actionRegister();
	const { errors, isValid } = formState;

	return (
		<Card className="relative overflow-hidden max-w-[350px] w-full">
			<ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
			<CardHeader>
				<CardTitle>
					<h1 className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-3xl">
						Create an <AuroraText>account</AuroraText>
					</h1>
				</CardTitle>
				<CardDescription>Fill the form to register</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="id">User ID</Label>
						<Input
							id="id"
							type="text"
							placeholder="Input your user ID"
							{...register("id")}
							isInvalid={!!errors.id}
						/>
						{errors.id && (
							<p className="text-red-500 text-sm">{errors.id.message}</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<PasswordInput
							placeholder="Input your password"
							{...register("password")}
							isInvalid={!!errors.password}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<PasswordInput
							placeholder="Confirm your password"
							{...register("confirmPassword")}
							isInvalid={!!errors.confirmPassword}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={!isValid}
						loading={isLoading}
					>
						Register
					</Button>
				</form>
			</CardContent>
			<CardFooter>
				<div className="text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link href="/" className="underline text-primary">
						Login
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
