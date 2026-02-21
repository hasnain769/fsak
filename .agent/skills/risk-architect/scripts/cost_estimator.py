#!/usr/bin/env python3
"""
Infrastructure Cost Estimator

Estimates monthly cloud costs based on architecture document.

Usage:
    python3 cost_estimator.py <architecture_path> [--json]
    python3 cost_estimator.py docs/ARCHITECTURE.md
"""

import sys
import os
import json
import re

# Cost estimates per resource type (monthly USD)
COST_ESTIMATES = {
    # Compute
    "serverless": {
        "vercel": {"base": 0, "per_100k_invocations": 0.60},
        "lambda": {"base": 0, "per_million_invocations": 0.20},
        "cloudflare_workers": {"base": 5, "per_million_invocations": 0.50},
    },
    "containers": {
        "fly.io": {"base": 0, "per_shared_cpu": 1.94, "per_gb_ram": 3.00},
        "railway": {"base": 5, "per_gb_ram": 10.00},
        "ecs_fargate": {"base": 0, "per_vcpu_hour": 0.04, "per_gb_hour": 0.004},
    },
    # Database
    "database": {
        "supabase": {"free_tier": True, "pro": 25, "team": 599},
        "neon": {"free_tier": True, "pro": 19, "scale": 69},
        "planetscale": {"free_tier": True, "scaler": 29, "team": 39},
        "rds_postgres": {"db.t4g.micro": 12, "db.t4g.small": 24, "db.t4g.medium": 48},
        "mongodb_atlas": {"free_tier": True, "m10": 57, "m20": 160},
    },
    # Cache
    "cache": {
        "upstash": {"free_tier": True, "pay_per_use": 0.20},  # per 100k commands
        "elasticache": {"cache.t4g.micro": 12, "cache.t4g.small": 24},
    },
    # Storage
    "storage": {
        "s3": {"per_gb": 0.023, "per_10k_requests": 0.005},
        "cloudflare_r2": {"per_gb": 0.015, "egress_free": True},
    },
    # Auth
    "auth": {
        "clerk": {"free_tier": True, "pro_per_mau": 0.02},  # first 10k free
        "auth0": {"free_tier": True, "essentials_per_mau": 0.023},
        "supabase_auth": {"included": True},
    },
    # Monitoring
    "monitoring": {
        "sentry": {"free_tier": True, "team": 26},
        "datadog": {"per_host": 15, "apm_per_host": 31},
        "grafana_cloud": {"free_tier": True, "pro": 29},
    },
}


def detect_resources(content):
    """Detect cloud resources mentioned in architecture document."""
    resources = {
        "compute": [],
        "database": [],
        "cache": [],
        "storage": [],
        "auth": [],
        "monitoring": [],
    }
    
    content_lower = content.lower()
    
    # Compute detection
    if any(x in content_lower for x in ["vercel", "next.js", "serverless"]):
        resources["compute"].append({"type": "serverless", "provider": "vercel"})
    if any(x in content_lower for x in ["lambda", "aws lambda"]):
        resources["compute"].append({"type": "serverless", "provider": "lambda"})
    if any(x in content_lower for x in ["fly.io", "fly "]):
        resources["compute"].append({"type": "containers", "provider": "fly.io"})
    if any(x in content_lower for x in ["railway"]):
        resources["compute"].append({"type": "containers", "provider": "railway"})
    if any(x in content_lower for x in ["ecs", "fargate"]):
        resources["compute"].append({"type": "containers", "provider": "ecs_fargate"})
    
    # Database detection
    if "supabase" in content_lower:
        resources["database"].append({"provider": "supabase", "tier": "pro"})
    elif "neon" in content_lower:
        resources["database"].append({"provider": "neon", "tier": "pro"})
    elif any(x in content_lower for x in ["planetscale", "mysql"]):
        resources["database"].append({"provider": "planetscale", "tier": "scaler"})
    elif any(x in content_lower for x in ["rds", "aws postgres"]):
        resources["database"].append({"provider": "rds_postgres", "tier": "db.t4g.small"})
    elif any(x in content_lower for x in ["mongodb", "mongo"]):
        resources["database"].append({"provider": "mongodb_atlas", "tier": "m10"})
    elif "postgres" in content_lower:
        resources["database"].append({"provider": "supabase", "tier": "pro"})
    
    # Cache detection
    if any(x in content_lower for x in ["upstash", "redis"]):
        resources["cache"].append({"provider": "upstash"})
    elif "elasticache" in content_lower:
        resources["cache"].append({"provider": "elasticache", "tier": "cache.t4g.micro"})
    
    # Storage detection
    if any(x in content_lower for x in ["s3", "aws storage"]):
        resources["storage"].append({"provider": "s3", "gb": 50})
    elif any(x in content_lower for x in ["r2", "cloudflare"]):
        resources["storage"].append({"provider": "cloudflare_r2", "gb": 50})
    
    # Auth detection
    if "clerk" in content_lower:
        resources["auth"].append({"provider": "clerk", "mau": 1000})
    elif "auth0" in content_lower:
        resources["auth"].append({"provider": "auth0", "mau": 1000})
    elif "supabase" in content_lower:
        resources["auth"].append({"provider": "supabase_auth"})
    
    # Monitoring detection
    if "sentry" in content_lower:
        resources["monitoring"].append({"provider": "sentry"})
    if "datadog" in content_lower:
        resources["monitoring"].append({"provider": "datadog", "hosts": 2})
    if "grafana" in content_lower:
        resources["monitoring"].append({"provider": "grafana_cloud"})
    
    return resources


def estimate_costs(resources):
    """Calculate estimated monthly costs for detected resources."""
    estimates = []
    total = 0
    
    # Compute costs
    for resource in resources.get("compute", []):
        provider = resource.get("provider", "")
        if provider == "vercel":
            cost = 20  # Pro plan
            estimates.append({"resource": "Compute (Vercel Pro)", "monthly": cost})
        elif provider == "railway":
            cost = 20  # Starter estimate
            estimates.append({"resource": "Compute (Railway)", "monthly": cost})
        elif provider == "fly.io":
            cost = 15  # 2 shared CPUs + RAM
            estimates.append({"resource": "Compute (Fly.io)", "monthly": cost})
        else:
            cost = 30  # Default estimate
            estimates.append({"resource": f"Compute ({provider})", "monthly": cost})
        total += cost
    
    # Database costs
    for resource in resources.get("database", []):
        provider = resource.get("provider", "")
        tier = resource.get("tier", "pro")
        if provider in COST_ESTIMATES.get("database", {}):
            db_costs = COST_ESTIMATES["database"][provider]
            cost = db_costs.get(tier, 25)
            estimates.append({"resource": f"Database ({provider} {tier})", "monthly": cost})
            total += cost
    
    # Cache costs
    for resource in resources.get("cache", []):
        provider = resource.get("provider", "")
        if provider == "upstash":
            cost = 10  # Estimated usage
            estimates.append({"resource": "Cache (Upstash)", "monthly": cost})
        else:
            cost = 15
            estimates.append({"resource": f"Cache ({provider})", "monthly": cost})
        total += cost
    
    # Storage costs (assuming 50GB)
    for resource in resources.get("storage", []):
        provider = resource.get("provider", "")
        gb = resource.get("gb", 50)
        if provider == "cloudflare_r2":
            cost = round(gb * 0.015, 2)
        else:
            cost = round(gb * 0.023, 2)
        estimates.append({"resource": f"Storage ({provider} {gb}GB)", "monthly": cost})
        total += cost
    
    # Auth costs (mostly free tier)
    for resource in resources.get("auth", []):
        provider = resource.get("provider", "")
        mau = resource.get("mau", 1000)
        if mau > 10000 and provider == "clerk":
            cost = round((mau - 10000) * 0.02, 2)
            estimates.append({"resource": f"Auth ({provider})", "monthly": cost})
            total += cost
        else:
            estimates.append({"resource": f"Auth ({provider})", "monthly": 0, "note": "Within free tier"})
    
    # Monitoring
    for resource in resources.get("monitoring", []):
        provider = resource.get("provider", "")
        if provider == "sentry":
            cost = 26
        elif provider == "datadog":
            hosts = resource.get("hosts", 2)
            cost = hosts * 15
        else:
            cost = 0  # Free tier
        estimates.append({"resource": f"Monitoring ({provider})", "monthly": cost})
        total += cost
    
    return estimates, round(total, 2)


def main(filepath, output_json=False):
    """Main cost estimation function."""
    
    if not os.path.exists(filepath):
        result = {"error": f"File not found: {filepath}"}
        if output_json:
            print(json.dumps(result, indent=2))
        else:
            print(f"Error: {filepath} not found.")
        sys.exit(1)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    resources = detect_resources(content)
    estimates, total = estimate_costs(resources)
    
    result = {
        "filepath": filepath,
        "detected_resources": resources,
        "cost_breakdown": estimates,
        "total_monthly_estimate": total,
        "annual_estimate": round(total * 12, 2),
        "disclaimer": "Estimates are approximate. Actual costs depend on usage."
    }
    
    if output_json:
        print(json.dumps(result, indent=2))
    else:
        print(f"\n{'='*60}")
        print(f"Infrastructure Cost Estimation")
        print(f"{'='*60}")
        print(f"Source: {filepath}")
        print(f"{'='*60}\n")
        
        print("📦 Detected Resources:")
        for category, items in resources.items():
            if items:
                print(f"   {category.capitalize()}: {', '.join([i.get('provider', i.get('type', '?')) for i in items])}")
        print()
        
        print("💰 Cost Breakdown (Monthly):")
        for est in estimates:
            note = f" ({est['note']})" if est.get('note') else ""
            print(f"   • {est['resource']}: ${est['monthly']}{note}")
        print()
        
        print(f"{'='*40}")
        print(f"   TOTAL MONTHLY: ${total}")
        print(f"   TOTAL ANNUAL:  ${round(total * 12, 2)}")
        print(f"{'='*40}\n")
        
        print("⚠️  Disclaimer: Estimates are approximate and depend on actual usage.\n")
    
    sys.exit(0)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 cost_estimator.py <architecture_path> [--json]")
        print("Example: python3 cost_estimator.py docs/ARCHITECTURE.md")
        sys.exit(1)
    
    filepath = sys.argv[1]
    output_json = "--json" in sys.argv
    
    main(filepath, output_json)
