import { prisma } from "@/prisma/prisma-client";
import { UserRole } from "@prisma/client";
import { compare, hashSync } from "bcrypt";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		Github({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: "USER" as UserRole,
				};
			},
		}),
		Credentials({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},

			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const values = {
					email: credentials.email,
				};

				const findUser = await prisma.user.findFirst({
					where: values,
				});

				if (!findUser) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					findUser.password
				);

				if (!isPasswordValid) {
					return null;
				}

				if (!findUser.verified) {
					return null;
				}

				return {
					id: findUser.id,
					email: findUser.email,
					name: findUser.fullName,
					role: findUser.role,
				};
			},
		}),
	],

	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},

	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === "credentials") {
					return true;
				}

				if (!user.email) {
					return false;
				}

				const findUser = await prisma.user.findFirst({
					where: {
						OR: [
							{
								provider: account?.provider,
								providerId: account?.providerAccountId,
							},
							{
								email: user.email,
							},
						],
					},
				});

				if (findUser) {
					await prisma.user.update({
						where: {
							id: findUser.id,
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId,
						},
					});

					return true;
				}

				await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || "User #" + user.id,
						password: hashSync(user.id.toString(), 10),
						verified: new Date(),
						provider: account?.provider,
						providerId: account?.providerAccountId,
					},
				});

				return true;
			} catch (error) {
				console.error("Error [signIn]: ", error);
				return false;
			}
		},
		async jwt({ token }) {
			if (!token.email) {
				return token;
			}
			const findUser = await prisma.user.findFirst({
				where: {
					email: token.email,
				},
			});

			if (findUser) {
				token.id = String(findUser.id);
				token.role = findUser.role;
				token.fullName = findUser.fullName;
				token.email = findUser.email;
			}

			return token;
		},

		session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.role = token.role;
			}
			return session;
		},
	},
};