#!/bin/sh

# source build.sh

gcloud compute ssh --zone "us-west1-b" "instance-1"  --project "automatic-opus-355008" \
-- "sudo docker-compose down && sudo docker rmi us-central1-docker.pkg.dev/automatic-opus-355008/default/chat-webhook:latest && sudo docker-compose up -d"
