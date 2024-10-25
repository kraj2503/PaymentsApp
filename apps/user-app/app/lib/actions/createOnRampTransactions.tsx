"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/orm/client";
import axios from "axios";

export async function createOnRampTransactions(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();
  const userId = session.user?.id;
  if (!userId) {
    return {
      message: "user not logged in",
    };
  }
  console.log("createonRamp");
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: "Processing",
      startTime: new Date(),
      provider,
      token: token,
    },
  });
  const status = await axios.post("http://localhost:3003/hdfcwebhook", {
    user_identifier: userId,
    token: token,
    amount: amount,
  });
  if(status.data.message=='Captured'){
    return "Success"
  }
}
