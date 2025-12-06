import Global from "/public/feature1.svg"
import withdraw from "/public/feature2.svg"
import Bank from "/public/feature3.svg"
import Payment from "/public/feature4.svg"
import Settlements from "/public/feature5.svg"
import Instant from "/public/feature6.png"

import { type featureType } from "./types"

export const features : featureType[] = [
     {
        id: 0,
        title: "Global US Account",
        info: "Open a free US account in minutes and receive payments from clients, platforms, and businesses worldwide without stress.",
        image: Global,
     },

       {
        id: 1,
        title: "Withdraw to Crypto Wallet",
        info: "Withdraw your funds instantly to wallets and exchanges like Phantom, Solflare or Bybit",
        image: withdraw,
       },
       
       {
        id: 2,
        title: "Withdraw to Bank",
        info: "Send money directly to your local bank account or mobile wallet and access your funds wherever you are.",
        image: Bank,
       },

       
       {
        id: 3,
        title: "Simple Payment Invoices",
        info: "Generate professional invoices that help you get paid faster whether in USD or stablecoins.",
        image: Payment,
       },

        {
        id: 4,
        title: "Same-day Settlements",
        info: "We support same-day settlements. With Bucx, your payments arrives the same day they're sent.",
        image: Settlements,
       },

        {
        id: 5,
        title: "Instant P2P Transfers",
        info: "Send and receive money within Bucx from friends in seconds, at zero cost, from one user to another.",
        image: Instant,
       },
]