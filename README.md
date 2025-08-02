# 🐺 Why LARRY on SEI?

**LARRY** is a deflationary, fully-backed token designed to reward liquidity providers and enable high-yield looping strategies. Built on **SEI Network** by **BTB Finance**, LARRY utilizes the speed and low fees of SEI, incentivizes liquidity provision on **Yaka Swap** and **Dragon Swap**, and enables users to loop and stack their positions over time.

---

## 🔹 What is LARRY?

* A token fully backed by **SEI** inside the smart contract
* Designed for **liquidity providers** — LARRY incentivizes USDC/LARRY pools on Yaka and Dragon
* Built to **increase in price** with every buy/sell/borrow
* Enables **looping strategies**: buy → borrow → buy again (repeat)
* Has a **deflationary supply** through liquidations and burn mechanics
* **Whitelisted addresses** for fee-free arbitrage opportunities
* Helps grow **LP depth** on SEI through strategic incentives

---

## 🔹 LARRY Price Mechanism

LARRY's price is dynamically calculated:

```solidity
price = (SEI in contract + total borrowed SEI) / total LARRY supply
```

So when:

* Users **buy** LARRY → SEI enters the contract → price goes up
* Users **sell** LARRY → LARRY burns → supply goes down → price goes up
* **Borrowing fees**, **interest**, and **liquidation proceeds** stay in the contract → price goes up

---

## 🔁 How Looping Works (with SEI @ $0.50)

Start with 1000 SEI:

| Step | Action           | SEI Used | LARRY Received | Comment                       |
| ---- | ---------------- | -------- | -------------- | ----------------------------- |
| 1    | Buy LARRY        | 1000     | ~996.25        | 0.25% fee, price increases    |
| 2    | Borrow SEI       | ~986     | 996.25 LARRY   | 99% LTV, borrow against LARRY |
| 3    | Buy more LARRY   | 986      | ~982           | More price increase           |
| 4    | Borrow again     | ~972     | 982 LARRY      | Repeat                        |
| ...  | Continue looping | ...      | 🚀             | Watch your LARRY stack grow   |

Every loop:

* More SEI gets locked in the contract
* LARRY price increases
* You accumulate more LARRY
* Treasury strengthens

You can **unwind** anytime by selling LARRY back into SEI. The protocol always honors redemption based on current backing.

---

## 🔥 Fees & Deflation

| Action      | Fee                | Team Share | Protocol Share | Purpose                              |
| ----------- | ------------------ | ---------- | -------------- | ------------------------------------ |
| Buy/Sell    | 0.1%               | ~0.05%     | ~0.05%         | Team incentivizes DEX LPs            |
| Borrow      | ~3.9% APR + fees   | ~30%       | ~70%           | Interest stays in contract           |
| Liquidation | 100% LARRY burned  | 0%         | SEI retained   | Deflationary burn + backing strength |
| Whitelisted | 0%                 | 0%         | 0%             | Fee-free trading for arbitrageurs    |

**BTB Finance** uses collected fees to **incentivize liquidity providers** on **Yaka Swap** and **Dragon Swap** for USDC/LARRY pools. This creates deeper liquidity and better trading conditions for all users.

---

## 🧩 Arbitrage & Volatility Strategy

**BTB Finance** maintains **whitelisted addresses** that trade **fee-free**, allowing for optimal arbitrage execution. This creates:

* **Instant arbitrage** when price opportunities arise
* **Higher volatility** = more trading opportunities = more fees
* **Better liquidity** through strategic market making
* **Enhanced LP rewards** on Yaka and Dragon Swap

As market volatility increases:

* More trading opportunities emerge
* Whitelisted addresses capture arbitrage before others
* More fees flow to liquidity providers
* **Price stability improves** through efficient arbitrage

This is a **profitable flywheel** of volatility → arbitrage → fees → LP rewards → repeat 🔁

---

## 🧠 Who Should Use LARRY?

* 🧑‍🌾 **Liquidity Providers** → Earn boosted APR from YAKA votes
* 💹 **Traders** → Accumulate LARRY early, benefit from price rise
* 🧪 **Loopers** → Use LARRY to safely leverage SEI over time
* 🧰 **Protocols** → Use LARRY as a backed, deflationary, price-positive asset

---

## 🛠️ Built for SEI by BTB Finance

* Ultra-low gas fees on SEI → perfect for looping and arbitrage
* Near-instant finality → safe liquidations and MEV capture
* **Dual DEX incentives** → Yaka Swap + Dragon Swap LPs
* **Whitelisted arbitrage** → fee-free trading for optimal execution
* Easy integration with existing SEI DeFi stack

---

## 🔍 Built-in Liquidation System

* If a user over-loops or if price drops, their LARRY is liquidated
* All LARRY is **burned**, and the SEI is retained in the protocol
* This reduces supply and increases price — even during market stress

---

## 📈 Price Simulation Example

* 1M LARRY supply
* 500K SEI in contract
* Initial price = 0.50 SEI

User buys 1000 SEI worth of LARRY → 0.25% fee → 997.5 SEI goes into contract → new price is slightly higher

More users loop → backing grows → supply inflates slower → **price increases continuously**

---

## 🚀 Summary

| Feature              | LARRY Token                     |
| -------------------- | ------------------------------- |
| Backed By            | SEI                             |
| Loops Supported      | ✅ (Buy → Borrow → Buy)          |
| Deflationary Supply  | ✅ Via daily liquidation burns   |
| Liquidity Incentives | ✅ via YAKA votes                |
| Fee Usage            | Flows to Yaka & Dragon Swap LPs |
| Price Mechanism      | Always increasing with activity |
| Built On             | SEI                             |
| Owned By             | BTB Finance                     |

**LARRY isn't just a token. It's a liquidity machine.**

Backed. Deflationary. Loopable. On SEI.

---

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the LARRY interface.

---

Let us know if you'd like to see:

* Smart contract source code
* Frontend widgets for the loop/unwind UI
* Real-time price chart integrations
* Loop calculators and risk metrics

LARRY is the gateway to loopable, incentive-driven liquidity on SEI.
