import { PrismaClient } from "@repo/orm/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async () => {
  console.log("object");
  await client.user.create({
    data: {
      email: "testuser1@mail.com",
      name: "testUser",
    },
  });
  return NextResponse.json({
    msg: "user created",
  });
};
