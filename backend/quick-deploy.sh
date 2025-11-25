#!/bin/bash
# Quick Deployment Script - Run on EC2

echo "🚀 Starting Fresh Deployment..."

# 1. Stop services
echo "Stopping services..."
pm2 delete metabyte-api 2>/dev/null || true
sudo systemctl stop nginx

# 2. Backup old files
echo "Backing up old files..."
[ -d "/home/ubuntu/metabyte" ] && mv /home/ubuntu/metabyte /home/ubuntu/metabyte-backup-$(date +%Y%m%d-%H%M%S)
[ -d "/home/ubuntu/build" ] && sudo mv /home/ubuntu/build /home/ubuntu/build-backup-$(date +%Y%m%d-%H%M%S)

# 3. Move new files
echo "Moving new files..."
mv /home/ubuntu/metabyte-fresh /home/ubuntu/metabyte
sudo mv /home/ubuntu/build-fresh /home/ubuntu/build

# 4. Install backend dependencies
echo "Installing backend dependencies..."
cd /home/ubuntu/metabyte/backend
npm install --production

# 5. Build backend
echo "Building backend..."
npm run build

# 6. Start backend
echo "Starting backend..."
pm2 start ecosystem.config.js
pm2 save

# 7. Configure frontend permissions
echo "Setting frontend permissions..."
sudo chown -R www-data:www-data /home/ubuntu/build
sudo chmod -R 755 /home/ubuntu/build

# 8. Start nginx
echo "Starting nginx..."
sudo systemctl daemon-reload
sudo systemctl start nginx

# 9. Verify
echo ""
echo "✅ Deployment Complete!"
echo ""
echo "Checking status..."
pm2 status
echo ""
curl -s http://localhost:5000/api/health
echo ""
sudo systemctl status nginx --no-pager -l
