#!/bin/sh

gcloud builds submit --config cloudbuild.yaml --project automatic-opus-355008 \
--substitutions=_TIMESTAMP=`date '+%Y%m%d%H%M%S'`,_APP=chat-webhook