#!/bin/bash

set -a
source .env
set +a

trigger_deploy_hook() {
	hook_url=$1
	response=$(curl -X GET "$hook_url" 2>/dev/null)
	if [ $? -eq 0 ]; then
		echo "Deploy hook triggered successfully!"
	else
		echo "Failed to trigger deploy hook: $response"
	fi
}

redeploy_service() {
	local service_name=$1
	local hook_url=$2
	read -rp "Redeploy $service_name? (y/n): " value
	if [[ $value =~ ^[Yy]$ ]]; then
		# if [ "$service_name" == "Vercel" ]; then
		# 	redeploy_frontend
		# else
		trigger_deploy_hook "$hook_url"
		# fi
	else
		echo "Skipping $service_name redeploy."
	fi
}

redeploy_frontend() {
	trigger_deploy_hook "$RENDER_URL"
	echo "Waking up backend... This will take 30 seconds"
	sleep 30
	trigger_deploy_hook "$VERCEL_HOOK_URL"
}

if [ -n "$VERCEL_HOOK_URL" ]; then
	redeploy_service "Vercel" "$VERCEL_HOOK_URL"
else
	echo "No Vercel hook URL found. Skipping Vercel redeploy."
fi

if [ -n "$RENDER_HOOK_URL" ]; then
	redeploy_service "Render" "$RENDER_HOOK_URL"
else
	echo "No Render hook URL found. Skipping Render redeploy."
fi
