
import prisma from "@repo/orm/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getTransactions() {
        const session = await getServerSession(authOptions);
        const txns = await prisma.p2pTransfer.findMany({
          where: {
            OR:[

                {fromUserId: Number(session?.user?.id)},
                {toUserId: Number(session?.user?.id)},
            ],
          },
        });
        
        return txns.map((t) => ({
          from : t.fromUserId,
          to:t.toUserId,
          amount: t.amount,
          time: t.timestamp,
          
          
        }));
      }


export default function (){

    const transactions = getTransactions()



    return  <div className="">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions 

        <div>
            
        </div>
      </div>
    </div>
}
