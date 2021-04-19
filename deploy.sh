echo "Kill all the running PM2 actions"
pm2 kill

echo "Jump to app folder"
cd /home/ec2-user/money-tracker-ml

echo "Update app from Git"
git pull

echo "Install app dependencies"
rm -rf node_modules package-lock.json
npm install

echo "Build your app"
npm run build

echo "Run new PM2 action"
cp /home/ec2-user/ecosystem.json ecosystem.json
pm2 start ecosystem.json

