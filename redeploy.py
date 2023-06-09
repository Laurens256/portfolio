import os
from dotenv import load_dotenv
import requests

def trigger_deploy_hook(hook_url):
    try:
        response = requests.post(hook_url)
        response.raise_for_status()
        print("Deploy hook triggered successfully!")
    except requests.exceptions.RequestException as e:
        print("Failed to trigger deploy hook:", e)


def redeploy_service(service_name, hook_url):
    value = input(f"Redeploy {service_name}? (y/n): ")
    if value.lower() in ["y", "yes"]:
        trigger_deploy_hook(hook_url)
    else:
        print(f"Skipping {service_name} redeploy.")


load_dotenv()
vercel_hook_url = os.getenv('VERCEL_HOOK_URL')
render_hook_url = os.getenv('RENDER_HOOK_URL')

if vercel_hook_url:
    redeploy_service("Vercel", vercel_hook_url)
else:
    print("No Vercel hook URL found. Skipping Vercel redeploy.")

if render_hook_url:
    redeploy_service("Render", render_hook_url)
else:
    print("No Render hook URL found. Skipping Render redeploy.")