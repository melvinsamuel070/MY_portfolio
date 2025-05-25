# #!/bin/bash

# # Email address for notifications
# EMAIL="melvinsamuel070@gmail.com"

# # Function to install cloudflared if not installed
# install_cloudflared() {
#     if ! command -v cloudflared &> /dev/null
#     then
#         echo "cloudflared is not installed. Installing..."
#         curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
#         sudo dpkg -i cloudflared.deb
#         rm cloudflared.deb
#     fi
# }

# # Function to start the cloudflared tunnel in the background

# start_tunnel() {
#     echo "Starting Cloudflare Tunnel in the background..."
#     cloudflared tunnel --url http://localhost:3500 &  # Adjust port if needed
#     TUNNEL_PID=$!
#     echo "Cloudflare Tunnel started with PID $TUNNEL_PID"

#     # Wait for the tunnel to fully initialize
#     sleep 5
    
#     # Fetch the URL from the Cloudflare Tunnel
#     URL=$(curl -s http://localhost:20241/metrics | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com')

#     if [[ -z "$URL" ]]; then
#         echo "Error: Tunnel URL could not be fetched."
#         exit 1
#     fi

#     echo "Your Cloudflare Tunnel is available at: $URL"
# }

# # Function to stop the cloudflared tunnel
# stop_tunnel() {
#     if [ -z "$TUNNEL_PID" ]; then
#         echo "No running tunnel to stop."
#         return
#     fi
#     echo "Stopping Cloudflare Tunnel with PID $TUNNEL_PID"
#     kill $TUNNEL_PID
#     echo "Tunnel stopped."
# }

# # Function to monitor changes in the repo and restart the app (without downtime)
# monitor_repo_changes() {
#     echo "Monitoring repository for changes..."
#     while inotifywait -e modify,create,delete -r .; do
#         echo "Changes detected in the repository."
#         git_commit_and_push
#         restart_app
#     done
# }

# # Function to commit and push changes to the repo
# git_commit_and_push() {
#     git add .
#     git commit -m "Update code"
#     git push origin main
#     echo "Code changes pushed to the repository."
#     # Send email notification
#     echo "Code changes have been pushed to the repository." | mail -s "Code Update Notification" $EMAIL
# }

# # Function to restart the app (using pm2 or Docker)
# restart_app() {
#     echo "Restarting the app with no downtime..."

#     # If using pm2, restart the app using pm2 (replace 'your-app' with the actual name)
#     if command -v pm2 &> /dev/null; then
#         pm2 restart your-app --update-env
#     # If using Docker, restart the containers
#     elif command -v docker &> /dev/null; then
#         docker-compose down && docker-compose up -d
#     else
#         echo "Neither pm2 nor Docker is available for app restart. Ensure one is installed."
#         exit 1
#     fi
#     echo "App restarted successfully."
# }

# # Install cloudflared if not installed
# install_cloudflared

# # Check if the tunnel is already running in the background
# if pgrep -f "cloudflared tunnel" > /dev/null
# then
#     echo "Cloudflare Tunnel is already running in the background."
# else
#     # Start the tunnel if not already running
#     start_tunnel
# fi

# # Start monitoring the repository for changes
# monitor_repo_changes










#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Step 1: Pull latest code from Git (optional if you sync manually)
echo "🌀 Pulling latest changes from git..."
git pull origin main

# Step 2: Build frontend(adjust if needed)
echo "🧱 Building frontend.."
cd frontend
npm install
npm run build


# Step 3: Restart backend and frontend with PM2 (or docker-compose if used)
echo "🚀 Restarting services with PM2..."

pm2 restart frontend || pm2 start serve --name frontend -- -s frontend/build -l 3000

# Step 4: Restart cloudflared tunnels (make sure they’re configured already)
echo "🌐 Restarting cloudflared tunnels..."
pkill cloudflared || true

# Tunnel to frontend
nohup cloudflared tunnel --url http://localhost:3000 --name frontend-tunnel > cloudflared-frontend.log 2>&1 &


echo "✅ Deployment complete. Frontend and backend are live via cloudflared tunnels."
