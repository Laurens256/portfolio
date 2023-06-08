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

load_dotenv()
hook_url = os.getenv('HOOK_URL')

if hook_url:
    trigger_deploy_hook(hook_url)
else:
    print("Hook URL not found in the environment variables.")
