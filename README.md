# 🎟️ Celo TicketX – Cross-Chain Event Ticketing dApp

> **Mint. Pay. Own.**  
> A borderless, stablecoin-powered event ticketing experience — with NFTs as receipts & access passes.

## 💡 Problem

- Platforms like **Klook** act as intermediaries in ticketing, charging service fees and settling payments in the local host's currency.
- What if we solve this using **Mento’s on-chain FX** solution?  
  → A borderless payment flow where no matter the sender’s currency, the receiver always gets **cUSD**.
- 🎟️ **Ticket access is fully on-chain via NFTs**, making it transparent, verifiable, and tradable if needed.
- ⚡ The receiver always gets paid in **cUSD**, which works perfectly with **Celo MiniPay** (also used to pay gas).
- 🌍 The end-user can pay with a list of supported **stablecoins from different countries** (e.g., cEUR, cKES, cREAL, USDT), and **Mento handles the swap** on-chain.
- This eliminates currency friction, empowers local sellers, and gives global users easy access — **no middlemen, no borders, just smart contracts**.

<!-- Celo + Mento = super perfect for mobile-native experiences like MiniPay, pay with cusd as gas token  -->

> [**CeloTicketX** Repo](https://github.com/Nith567/celoTicketXContracts)  

## 🧩 Overview

**Celo TicketX** is a decentralized, cross-chain ticketing platform where:

- 🎤 **Creators** can create events & receive payments in **CUSD**
- 💸 **Users** can pay in **multiple stablecoins** (e.g. `JPY`, `GHS`, `CEUR`, `CUSD`)
- 🖼️ Tickets are minted as **NFTs**, giving real ownership & proof
- 🔁 On-chain **FX conversion** handled by [Mento](https://www.mento.org/)  
- 💥 Built on the **Celo blockchain**, optimized for mobile & low gas fees

---

## 🔗 Features

- ✅ NFT-based ticketing (ERC-721 compliant)
- 🌍 Pay in various local stablecoins
- 🔁 Auto FX conversion to CUSD for creators
- 📲 Works with **Celo MiniPay** wallets
- 🧾 IPFS-backed metadata for tickets
- 🔐 On-chain & verifiable ticket ownership

---

## 🔥 Flow

1. **🎫 Event Creation**  
   Creator launches an event → uploads details, sets amount.
2. **💳 User Purchase**  
   Users buy ticket using any supported stablecoin  
3. **💱 Mento FX kicks in**  
   Converts user stablecoin → CUSD  
4. **📥 Creator receives CUSD**  
   Creator wallet gets payment  
5. **🪪 NFT Ticket minted**  
   NFT sent to buyer wallet → Access granted!

---
