# 📘 Technical Documentation

This folder contains the technical documentation for the **SecureAI - Multi-Agent Fraud Detection System**.  

---

## 1. ✅ Approach

- Our solution is a multi-agent on-device fraud detection system designed to ensure data privacy, real-time learning, and anomaly detection.

- **On-device learning**: Sensitive user data (touch, typing, motion, app usage) never leaves the device.

- **Multi-agent design**: Independent agents monitor different behavioural patterns (typing rhythm, movement, app activity, etc.) and collaborate to flag anomalies.

- **Continuous adaptation**: The system dynamically updates behavioural models over time to reduce false positives.

- **Privacy-first**: Unlike centralized systems, our approach avoids transmitting user behaviour to servers, ensuring compliance with privacy regulations.

- **Lightweight deployment**: Fully containerized, optimized for low-latency detection on edge devices.

This makes our system unique: fraud is detected before it reaches servers, reducing risk and improving user trust.

---

## 2. 🛠️ Technical Stack

The system uses a modern tech stack for performance, scalability, and security.

- **Frontend**:  
  - [Next.js](https://nextjs.org/) – React-based framework  
  - [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework  
  - [Recharts](https://recharts.org/) – Data visualization  

- **Backend**:  
  - [Node.js](https://nodejs.org/) – Runtime environment  
  - [Express.js](https://expressjs.com/) – Server-side framework  
  - [PostgreSQL](https://www.postgresql.org/) – Database  

- **Other Tools & Libraries**:  
  - [Docker](https://www.docker.com/) – Containerization  
  - [pnpm](https://pnpm.io/) – Fast package manager  
  - [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript  
  - [PostCSS](https://postcss.org/) - For CSS transformations

---

## 3. 🏗️ Architecture

The architecture follows a **modular, agent-based design**:

- **Behavioral Agents**: Independent monitoring modules (Typing Dynamics, Touch Patterns, App Usage, etc.).  
- **Detection Engine**: Aggregates agent data to detect anomalies.  
- **Privacy Layer**: On-device data processing ensures sensitive data never leaves the device.  
- **Visualization Layer**: Real-time dashboard for monitoring metrics and alerts.  

                         ┌────────────────────────┐
                         │   User Behaviour Data  │
                         │ (touch, typing, usage) │
                         └──────────┬─────────────┘
                                    │
                        ┌───────────▼───────────┐
                        │   Multi-Agent System  │
                        │ (Detection Modules)   │
                        └─────┬─────────┬───────┘
                              │         │
                 ┌────────────▼─┐   ┌───▼──────────┐
                 │   Analytics  │   │   Privacy     │
                 │ (Anomaly Viz)│   │ (On-device)   │
                 └───────┬──────┘   └────┬─────────┘
                         │               │
                  ┌──────▼──────┐  ┌─────▼───────┐
                  │ Fraud Alerts │  │ Local Model │
                  │ (UI/Logs)    │  │ Updates     │
                  └──────────────┘  └─────────────┘


---

## 4. ⚙️ Implementation Details

- **Multi-Agent System**: Each agent runs independently and reports to the detection engine.  
- **Confidence Scoring**: Each behavioral trait is assigned a probability score.  
- **Anomaly Detection**: Uses thresholds and ML models to flag suspicious activity.  
- **Event Handling**: Alerts and security events are displayed in the dashboard.  

- **Directory Structure**

  - /app/agents → Behaviour monitoring agents (page-based logic)
  - /app/analytics → Dashboard + anomaly visualization
  - /app/api → Next.js API routes for local services
  - /app/detection → Fraud detection ML/logic
  - /app/models → Behaviour models & learning
  - /app/privacy → Privacy-preserving utilities
  - /components → UI components
  - /hooks → React hooks for monitoring user events
  - /monitoring → Core monitoring logic (user behaviour tracking)
  - /public → Static assets/screenshots
  - /styles → Tailwind + PostCSS configs

- **Privacy Design**

  - No raw keystrokes or touch data leave device
  - Only anomaly scores are shared internally

- **Learning Models**

  - Lightweight anomaly detection (e.g., Isolation Forest / statistical thresholds)
  - Model updated locally with new behaviour patterns.
---

## 5. 📦 Installation Instructions

### Prerequisites
- Node.js (v18+)  
- pnpm installed globally  
- Docker (optional for containerized setup)  

### Setup
```bash
# Clone repository
git clone <your-fork-url>
cd SamsungPrism

# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Using Docker
docker-compose up --build
```

### User Guide
- Open the dashboard at http://localhost:3000

- Navigate to:

  - Analytics → View fraud/anomaly detection graphs
  - Agents → Configure behaviour agents
  - Privacy → Review what data is stored locally

- Alerts show up in real-time when anomalies are detected

### Salient Features

- On-device continuous learning (real-time fraud detection)

- Multi-agent modular design (typing, motion, app usage monitoring)

- Fully private & compliant (no data leaves device)

- Analytics dashboard for anomaly visualization

- Cross-platform & containerized for easy deployment

- Lightweight & fast (optimized for mobile/edge devices)
