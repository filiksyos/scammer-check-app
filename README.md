# Scammer Check App

A smart web application built with Next.js that analyzes if a person or online guru is likely to be a scammer. Uses Exa web search API to research the person and AI analysis to provide a scammer probability score.

## Features

- 🔍 **Smart Research**: Uses Exa API to search the web for information about the person
- 🤖 **AI Analysis**: Azure AI analyzes the findings to determine scammer probability
- 📊 **Scammer Score**: Get a percentage-based probability score
- 🖼️ **Profile Image**: Displays the person's image (when available)
- 📝 **Detailed Verdict**: Shows reasons and evidence for the assessment
- ⚡ **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS 4

## Tech Stack

- **Framework**: Next.js 15.3.1
- **Styling**: Tailwind CSS 4
- **Search**: Exa API
- **AI Analysis**: Azure AI Services
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Exa API Key ([Get one here](https://exa.ai/))
- Azure AI API Key ([Get one here](https://azure.microsoft.com/en-us/solutions/ai/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/filiksyos/scammer-check-app.git
   cd scammer-check-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Exa API
   EXA_API_KEY=your_exa_api_key_here

   # Azure AI
   AZURE_AI_API_KEY=your_azure_ai_api_key_here
   AZURE_AI_ENDPOINT=your_azure_ai_endpoint_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Usage

1. Enter the name of a person or online guru in the search field
2. Click "Check" to initiate the analysis
3. Wait for the AI to research and analyze
4. View the scammer probability score, profile image, and detailed reasoning

## How It Works

1. **Search Phase**: The app uses Exa API to search for information about the person
2. **Data Collection**: Gathers relevant articles, reviews, and mentions
3. **AI Analysis**: Azure AI analyzes the content for red flags, scam indicators, and legitimacy signals
4. **Scoring**: Calculates a scammer probability percentage (0-100%)
5. **Report**: Generates a detailed verdict with supporting evidence

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EXA_API_KEY` | Your Exa API key for web search | Yes |
| `AZURE_AI_API_KEY` | Your Azure AI API key | Yes |
| `AZURE_AI_ENDPOINT` | Your Azure AI endpoint URL | Yes |

## License

MIT

## Disclaimer

This tool provides an AI-based analysis and should not be considered as definitive proof. Always do your own research and exercise critical thinking when evaluating online personalities.