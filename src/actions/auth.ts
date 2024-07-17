'use server'

import type Status from '@/lib/Status'
import { mutateSession, deleteSession } from '@/actions/session'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { userRoleRankAdmin, userRoleRankRegularUser } from '@/lib/userRoleRank'


const prisma = new PrismaClient()

export async function signIn(username: string, password: string)
: Promise<Status> {
	const maybeFoundUser = await prisma.user.findUnique({
		where: {
			username,
		}
	})
	if (maybeFoundUser == null) {
		return {
			statusSuccess: false,
			statusMessage: "User with provided name does not exist.",
		}
	}
	if (await bcrypt.compare(password, maybeFoundUser.hashedPassword)) {
		await mutateSession({ username, userRoleRank: maybeFoundUser.userRoleRank })
		return {
			statusSuccess: true,
			statusMessage: "Successfully signed in.",
		}
	}
	return {
		statusSuccess: false,
		statusMessage: "Incorrect password.",
	}
}

export async function signUp(username: string, password: string)
: Promise<Status> {
	const maybeFoundUser = await prisma.user.findUnique({
		where: {
			username,
		}
	})
	if (maybeFoundUser != null) {
		return {
			statusSuccess: false,
			statusMessage: "User with provided name already exists."
		}
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	await prisma.user.create({
		data: {
			username,
			hashedPassword,
			userRoleRank: username === 'admin' ? userRoleRankAdmin : userRoleRankRegularUser,
		}
	})
	return {
		statusSuccess: true,
		statusMessage: "Successfully registered a new user."
	}
}

export async function signOut() {
	await deleteSession()
}

