"use client";

import * as React from "react";
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
import { Checkbox } from "@/components/atoms/checkbox";
import { ShineBorder } from "@/components/atoms/shine-border";
import { AuroraText } from "../atoms/aurora-text";
import Link from "next/link";
import { actionLogin } from "@/modules/actions/login.action";
import { Controller } from "react-hook-form";

export function LoginForm() {
	const { handleSubmit, formState, onSubmit, register, control, isLoading } =
		actionLogin();
	const { errors, isValid } = formState;

	return (
		<Card className="relative overflow-hidden max-w-[350px] w-full">
			<ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
			<CardHeader>
				<CardTitle>
					<h1 className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-3xl">
						Welcome to <AuroraText>myApp</AuroraText>
					</h1>
				</CardTitle>
				<CardDescription>
					Enter your credentials to access your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4">
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
								<p className="text-red-500 text-sm">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>
					<div className="flex flex-col w-full">
						<Controller
							name="rememberMe"
							control={control}
							defaultValue={false}
							render={({ field }) => (
								<div className="mt-2 mb-4 flex items-center gap-2">
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										aria-checked={field.value}
									/>
									<label htmlFor="rememberMe">Keep me logged in</label>
								</div>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={!isValid}
							variant="default"
							loading={isLoading}
						>
							Login
						</Button>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<div className="text-center text-sm text-muted-foreground">
					<p>
						No Account?{" "}
						<Link href="/register" className="underline text-primary">
							Register
						</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}
