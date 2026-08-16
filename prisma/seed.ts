import "dotenv/config"

import { randomUUID } from "node:crypto"

import { auth } from "../lib/auth"
import { db } from "../lib/db"

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME ?? "Admin"

  if (!email || !password) {
    throw new Error(
      "Define ADMIN_EMAIL y ADMIN_PASSWORD en .env para sembrar el admin."
    )
  }

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    console.log(`✓ El admin ${email} ya existe. Nada que hacer.`)
    return
  }

  // Usamos el hasher interno de Better Auth para que el login funcione.
  const ctx = await auth.$context
  const hash = await ctx.password.hash(password)

  const userId = randomUUID()
  await db.user.create({
    data: {
      id: userId,
      name,
      email,
      emailVerified: true,
      role: "admin",
      accounts: {
        create: {
          id: randomUUID(),
          accountId: userId,
          providerId: "credential",
          password: hash,
        },
      },
    },
  })

  console.log(`✓ Admin creado: ${email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
