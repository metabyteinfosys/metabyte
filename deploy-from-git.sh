#!/bin/bash
# Git-Based Deployment Script for EC2

echo "🚀 Starting Git-Based Deployment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Clone repository
echo -e "\n${YELLOW}[1/8] Cloning repository from GitHub...${NC}"
cd /home/ubuntu
git clone https://github.com/metabyteinfosys/metabyte.git
cd metabyte

echo -e "${GREEN}✓ Repository cloned successfully!${NC}"

# Step 2: Install backend dependencies
echo -e "\n${YELLOW}[2/8] Installing backend dependencies...${NC}"
cd /home/ubuntu/metabyte/backend
npm install

echo -e "${GREEN}✓ Backend dependencies installed!${NC}"

# Step 3: Build backend
echo -e "\n${YELLOW}[3/8] Building backend TypeScript...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Error: TypeScript build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Backend built successfully!${NC}"

# Step 4: Start backend with PM2
echo -e "\n${YELLOW}[4/8] Starting backend with PM2...${NC}"
pm2 delete metabyte-api 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo -e "${GREEN}✓ Backend started!${NC}"

# Step 5: Install frontend dependencies
echo -e "\n${YELLOW}[5/8] Installing frontend dependencies...${NC}"
cd /home/ubuntu/metabyte/frontend
npm install

echo -e "${GREEN}✓ Frontend dependencies installed!${NC}"

# Step 6: Build frontend
echo -e "\n${YELLOW}[6/8] Building frontend...${NC}"
npm run build

if [ ! -d "build" ]; then
    echo -e "${RED}Error: Frontend build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Frontend built successfully!${NC}"

# Step 7: Deploy frontend
echo -e "\n${YELLOW}[7/8] Deploying frontend...${NC}"
sudo systemctl stop nginx
sudo rm -rf /home/ubuntu/build
sudo cp -r /home/ubuntu/metabyte/frontend/build /home/ubuntu/build
sudo chown -R www-data:www-data /home/ubuntu/build
sudo chmod -R 755 /home/ubuntu/build
sudo systemctl start nginx

echo -e "${GREEN}✓ Frontend deployed!${NC}"

# Step 8: Verify deployment
echo -e "\n${YELLOW}[8/8] Verifying deployment...${NC}"
sleep 2

# Check backend
echo "Checking backend..."
HEALTH=$(curl -s http://localhost:5000/api/health | grep -o "ok" || echo "")
if [ "$HEALTH" = "ok" ]; then
    echo -e "${GREEN}✓ Backend is healthy!${NC}"
else
    echo -e "${RED}✗ Backend health check failed!${NC}"
fi

# Check PM2
pm2 status

# Check nginx
if sudo systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx is running!${NC}"
else
    echo -e "${RED}✗ Nginx is not running!${NC}"
fi

echo -e "\n${GREEN}=========================================="
echo "🎉 Deployment Complete!"
echo "==========================================${NC}"
echo "Website: https://metabyte.com.au"
echo "Admin: https://metabyte.com.au/admin/login"
echo ""
echo "Next steps:"
echo "1. Test the website in browser"
echo "2. Setup PM2 auto-start: pm2 startup systemd"
echo "3. Monitor logs: pm2 logs metabyte-api"
