"use client";

import { useBalance } from "@repo/store/balance";

export default function() {
  const balance = useBalance();
  return <div className="bg-red-400">
    hi there {balance}
  </div>
}