# back-end

Latch Backend
This is the backend service for the Latch application, built with Node.js, Express, TypeScript, Sequelize (PostgreSQL), and LiveKit Server SDK. It provides APIs for authentication, data storage, and LiveKit integration.

📦 Project Structure
bash
Copy
Edit
latch-backend/
├── src/
│   ├── server.ts       # Entry point for the server
│   └── ...             # Other app source files
├── dist/               # Compiled JavaScript files
├── Dockerfile
├── package.json
├── tsconfig.json
└── .env                # Your environment variables (not committed)
🛠️ Prerequisites
Node.js (v18.x)

PostgreSQL

Docker (optional, for containerized deployment)

🚀 Getting Started
1. Clone the Repository

git clone git@github.com:La-Latch-Club/back-end.git
cd latch-backend
2. Install Dependencies

npm install
3. Set Up Environment Variables
Create a .env file in the root directory:

PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_HOST=https://your-livekit-url
4. Run the App in Development

npm run dev
This uses nodemon and ts-node to run the TypeScript code.

🔨 Build for Production

npm run build
This will compile your TypeScript files into the dist/ directory.

🏁 Start in Production Mode
Make sure you've built the project before starting:

npm start
🐳 Deploy with Docker
1. Build the Docker Image

docker build -t latch-backend .
2. Run the Docker Container

docker run -d -p 4000:4000 --env-file .env latch-backend
App will be available at http://localhost:4000

🔧 Helpful Scripts
Script	Description
npm run dev	Run in development mode with hot reload
npm run build	Compile TypeScript to JavaScript
npm start	Run the built server in production

