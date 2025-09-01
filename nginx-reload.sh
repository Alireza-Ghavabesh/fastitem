#!/bin/sh
# Wait until Nginx master process is running
while [ ! -f /var/run/nginx.pid ]; do
  echo "[nginx-reload] Waiting for Nginx to start..."
  sleep 2
done

# Reload loop
while true; do
  echo "[nginx-reload] Reloading Nginx to pick up renewed certificates..."
  nginx -s reload
  sleep 12h
done
