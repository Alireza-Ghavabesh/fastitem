#!/bin/sh
# Wait until Nginx master process is running
while [ ! -f /var/run/nginx.pid ]; do
  echo "[nginx-reload] Waiting for Nginx to start..."
  sleep 2
done

# Reload loop (only reload if config is valid)
while true; do
  echo "[nginx-reload] Checking config before reload..."
  if nginx -t; then
    echo "[nginx-reload] Reloading Nginx to pick up renewed certificates..."
    nginx -s reload
  else
    echo "[nginx-reload] Skipping reload: nginx -t failed. Will retry later."
  fi
  sleep 12h
done
