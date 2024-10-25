"use server";
import prisma from "@repo/orm/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const fromUser = session?.user?.id;

  if (!fromUser) {
    return {
      message: "user not logged in",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not Found",
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * from "Balance" WHERE "userId"=${Number(fromUser)} FOR UPDATE`;

    const formBalance = await tx.balance.findUnique({
      where: {
        userId: Number(fromUser),
      },
    });
    if (!formBalance || formBalance.amount < Number(amount)) {
      throw new Error("Insufficient Balance");
    }
    await tx.balance.update({
      where: {
        userId: Number(fromUser),
      },
      data: { amount: { decrement: Number(amount) } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: Number(amount) } },
    });

    await tx.p2pTransfer.create(
      {
        data:{
          fromUserId:Number(fromUser),
          toUserId:toUser.id,
          amount:amount,
          timestamp:new Date()


        }
      }
    )
  });
}
