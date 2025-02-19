
---

# **IoT Device Tracking & Rewards System 🚀**  
**Real-time IoT device tracking on the blockchain with a reward system using smart contracts. Built with Solidity, Hardhat, Next.js, and Ethers.js.**  

![License](https://img.shields.io/badge/License-MIT-blue.svg)  
![Sepolia Deployment](https://img.shields.io/badge/Network-Sepolia-purple)  
![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.19-black)  
![Framework](https://img.shields.io/badge/Framework-Hardhat-yellow)  

---

## **📌 Features**  
✅ **Decentralized IoT Tracking** – Monitor devices on-chain in real time  
✅ **Manual Reward Claiming** – Users claim rewards based on device activity  
✅ **Penalties for False Data** – Oracles slash rewards for invalid data  
✅ **Admin-Controlled Settings** – Adjust reward rates and penalties  
✅ **Multi-Smart Contract Architecture** – Modular, upgradeable system  

---

## **🛠 Tech Stack**  
- **Blockchain:** Solidity, Hardhat, OpenZeppelin  
- **Backend:** Node.js (for API handling)  
- **Frontend:** Next.js, Tailwind CSS  
- **Wallet & Interaction:** Ethers.js, Metamask  
- **Storage:** IPFS / Ceramic (for off-chain data)  
- **Testnet:** Sepolia  
- **Oracles:** Chainlink (for data validation)  

---

## **📁 Smart Contract Architecture**  

| Contract              | Purpose |
|----------------------|---------|
| `DeviceRegistry.sol` | Manages IoT device lifecycle |
| `IoTDataLedger.sol` | Stores validated device data |
| `AccessManager.sol` | Handles roles & access control |
| `TokenRewards.sol` | Manages reward distribution & penalties |
| `OracleIntegration.sol` | Validates IoT data using Chainlink |

---

## **🚀 Setup & Installation**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/yourusername/iot-device-tracking.git
cd iot-device-tracking
```

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **3️⃣ Configure Environment Variables**  
Create a `.env` file and add:  
```bash
PRIVATE_KEY="your-wallet-private-key"
ALCHEMY_API_KEY="your-alchemy-api-key"
ETHERSCAN_API_KEY="your-etherscan-api-key"
```

---

## **📜 Smart Contract Deployment**  
### **1️⃣ Compile Contracts**  
```bash
npx hardhat compile
```

### **2️⃣ Run Tests**  
```bash
npx hardhat test
```

### **3️⃣ Deploy to Sepolia**  
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### **4️⃣ Verify on Etherscan**  
```bash
npx hardhat verify --network sepolia <contract_address>
```

---

## **🎛 Frontend (Next.js) Setup**  

### **1️⃣ Start the Frontend**  
```bash
cd frontend
npm install
npm run dev
```

### **2️⃣ Connect Wallet & Interact**  
- Users can **track their IoT devices**  
- Claim rewards **manually** via **TokenRewards.sol**  
- Admins **adjust penalties & reward rates**  

---

## **✅ Testing with Hardhat & Mocks**  

### **Run Local Hardhat Node**  
```bash
npx hardhat node
```

### **Deploy Contracts to Local Network**  
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### **Mock Oracle for Testing**  
```bash
npx hardhat test --grep "Oracle"
```

---

## **🌍 Live Deployment (Sepolia Testnet)**  
🔗 **Frontend:** [Live URL](https://iot-tracking.vercel.app)  
🔗 **Smart Contract:** [Etherscan Link](https://sepolia.etherscan.io/address/your_contract_address)  

---

## **🛠 Contributing**  
1️⃣ **Fork the repository**  
2️⃣ **Create a feature branch** (`git checkout -b feature-xyz`)  
3️⃣ **Commit your changes** (`git commit -m "Added feature XYZ"`)  
4️⃣ **Push to GitHub** (`git push origin feature-xyz`)  
5️⃣ **Create a Pull Request**  

---

## **📜 License**  
This project is licensed under the **MIT License**.  

---

### **🚀 Future Improvements**  
🔹 Staking Mechanism for IoT Data Validation  
🔹 Improved Data Visualization Dashboard  
🔹 Cross-Chain Support for Layer 2 Scaling  

--