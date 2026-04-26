#!/bin/bash

echo "🎬 Starting Netflix Login Clone..."
echo ""

# Start backend
echo "▶ Starting backend on http://localhost:5000"
cd "$(dirname "$0")/backend" && node server.js &
BACKEND_PID=$!

sleep 1

# Start frontend
echo "▶ Starting frontend on http://localhost:5173"
cd "$(dirname "$0")/frontend" && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are running!"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""
echo "🔑 Demo Credentials:"
echo "   user@netflix.com / netflix123"
echo "   test@test.com    / test123"
echo "   admin@netflix.com / admin123"
echo ""
echo "Press Ctrl+C to stop both servers"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo 'Servers stopped.'; exit 0" INT
wait
