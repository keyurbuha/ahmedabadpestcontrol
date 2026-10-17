# VPS deployment

These steps target Ubuntu 22.04 or 24.04 with the domain `ahemdabadpestcontrol.com`.

## 1. Point DNS to the VPS

Create these DNS records at the domain provider:

- `A` record for `@` pointing to the VPS IPv4 address.
- `A` record for `www` pointing to the same IPv4 address.

Wait until both names resolve to the server before requesting HTTPS certificates.

## 2. Install system packages and Node.js 24

```bash
sudo apt update
sudo apt install -y nginx git curl ca-certificates
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
node --version
npm --version
```

## 3. Upload or clone the project

```bash
sudo mkdir -p /var/www/ahmedabadpestcontrol
sudo chown -R "$USER":"$USER" /var/www/ahmedabadpestcontrol
cd /var/www/ahmedabadpestcontrol
git clone YOUR_REPOSITORY_URL .
npm ci
```

If the source is uploaded with SFTP instead, upload it into `/var/www/ahmedabadpestcontrol`, then run `npm ci` there.

## 4. Install the production environment file

`.env.production` is intentionally ignored by Git because it contains secrets. Copy the prepared local `.env.production` to:

```text
/var/www/ahmedabadpestcontrol/.env.production
```

Then protect it and create persistent image storage:

```bash
cd /var/www/ahmedabadpestcontrol
chmod 600 .env.production
sudo mkdir -p /var/lib/ahmedabadpestcontrol/uploads /var/lib/ahmedabadpestcontrol/tmp
sudo chown -R "$USER":"$USER" /var/lib/ahmedabadpestcontrol
chmod 750 /var/lib/ahmedabadpestcontrol
```

In MongoDB Atlas, add the VPS public IP under **Network Access**. Keep database access restricted to the application database user.

## 5. Build and start with PM2

```bash
cd /var/www/ahmedabadpestcontrol
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Run the final command printed by `pm2 startup` with `sudo`, then run `pm2 save` again.

Check the application locally on the VPS:

```bash
curl -I http://127.0.0.1:3000
pm2 status
pm2 logs ahmedabad-pest-control --lines 100
```

## 6. Configure Nginx

```bash
sudo cp /var/www/ahmedabadpestcontrol/deploy/nginx.conf /etc/nginx/sites-available/ahmedabadpestcontrol
sudo ln -sfn /etc/nginx/sites-available/ahmedabadpestcontrol /etc/nginx/sites-enabled/ahmedabadpestcontrol
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

If UFW is enabled:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw status
```

## 7. Enable HTTPS

After DNS resolves correctly:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ahemdabadpestcontrol.com -d www.ahemdabadpestcontrol.com
sudo certbot renew --dry-run
```

Open `https://ahemdabadpestcontrol.com/admin` and sign in with the seeded admin account.

## Updating the site later

```bash
cd /var/www/ahmedabadpestcontrol
git pull
npm ci
npm run build
pm2 restart ahmedabad-pest-control --update-env
```

Do not delete `/var/lib/ahmedabadpestcontrol` during deployments. Back up that directory and the Atlas database. The directory contains images uploaded through the admin panel.
