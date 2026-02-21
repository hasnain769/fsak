name: skill-creator
description: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends the Antigravity Agent's capabilities with specialized knowledge, workflows, or tool integrations.

---

# Skill Creator

This skill provides guidance for creating effective skills for the Antigravity Agent ecosystem.

## About Skills

Skills are modular, self-contained packages that extend the agent's capabilities by providing
specialized knowledge, workflows, and tools. They transform a general-purpose agent into a specialized expert.

### Antigravity Agent Standards

To ensure high-quality, predictable, and collaborative agents, all skills must adhere to these standards:

1.  **Strict Triggers**: The `description` must clearly define WHEN the skill should be used (e.g., "Triggers on keyword X").
2.  **Engineering Standards**: Every skill must define what "success" looks like (e.g., "Code must be typed", "No global variables").
3.  **Verification Plan**: Every skill must include a plan to verify its output, preferably with automated tests in `tests/`.
4.  **Artifact Awareness**: Skills should leverage artifacts (plans, tasks, walkthroughs) for complex workflows.

## Core Principles

### Concise is Key

The context window is a public good.
**Default assumption: The agent is already very smart.** Only add context the agent doesn't already have.

### Degrees of Freedom

Match the level of specificity to the task:

-   **High freedom**: For creative tasks.
-   **Low freedom (Preferred for Antigravity)**: For engineering tasks. Use deterministic scripts (`scripts/`) and strict workflows to ensure reliability.

### Anatomy of a Skill

```
skill-name/
├── SKILL.md (required) - Instructions & Standards
├── scripts/            - Deterministic Tools (Python/Bash)
├── references/         - Documentation (API, Schema)
├── assets/             - Output Templates (Boilerplate)
└── tests/              - Automated Verification (pytest)
```

## Skill Creation Process

1.  **Understand**: Identify the trigger and the desired outcome.
2.  **Initialize**: Run `scripts/init_skill.py <name> --path <dir>`.
3.  **Implement**:
    -   Fill out `SKILL.md` (Workflow, Standards, Verification).
    -   Add scripts to `scripts/`.
    -   Add tests to `tests/`.
4.  **Validate**: Run `scripts/package_skill.py <dir>` to check compliance.
5.  **Package**: Distribute the `.skill` file.

### Step 1: Initialize

Always use `init_skill.py`. It generates the Antigravity-compliant template.

```bash
# Example
scripts/init_skill.py my-new-skill --path ./skills
```

### Step 2: Edit SKILL.md

The template includes these critical sections. **Do not remove them.**

#### Core Workflow
Describe the step-by-step process. Use numbered lists.

#### Engineering Standards
Define the constraints. This allows the agent to self-correct.
*   *Example*: "All functions must have docstrings."
*   *Example*: "Use `pathlib` instead of `os.path`."

#### Verification Plan
How will the agent know it succeeded?
*   **Automated**: "Run `pytest tests/verify_output.py`."
*   **Manual**: "Check if file X exists."

### Step 3: Implement Resources

-   **Scripts**: Use `scripts/` for logic that is brittle in LLMs (e.g., complex regex, binary file manipulation).
-   **Tests**: Add a `verify.py` or unit tests in `tests/`. This enables the `e2e-automation-master` and `tdd-enforcer` skills to leverage your skill effectively.

### Step 4: Validate

Run the validator to ensure you met the standards:

```bash
scripts/package_skill.py ./skills/my-new-skill
```

It will check for:
-   Valid YAML frontmatter.
-   Presence of Engineering Standards.
-   Presence of Verification Plan.
-   Valid folder structure.

## Designing for Collaboration

Antigravity agents work together.
-   **Expose Tools**: Make your scripts reusable by other agents.
-   **Clear Outputs**: Your skill should produce clear artifacts (files, logs) that other agents can consume.
-   **State Management**: If your skill changes state, document it.

## Predictability & Efficiency

-   **Prefer Scripts over Prompts**: If a task can be done by a Python script, put it in `scripts/`. It's faster, cheaper, and 100% deterministic.
-   **Fail Fast**: Your verification plan should catch errors immediately.
