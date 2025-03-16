# BookNote-LLM Web Application

This is the web application for BookNote-LLM, a tool that helps you organize notes and highlights from books, articles, and web pages.

## Features

- Upload text files containing notes and highlights from Kindle, WeRead, etc.
- Paste text content directly into the application
- Generate structured markdown notes using AI
- Download or copy the generated notes

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/booknote-llm.git
cd booknote-llm/webapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Choose between "Manual Input" or "Upload File" tabs
2. Enter or upload your notes
3. Click "Generate Notes" to process your content
4. View the generated structured notes
5. Copy or download the notes as a Markdown file

## Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm start
# or
yarn start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
