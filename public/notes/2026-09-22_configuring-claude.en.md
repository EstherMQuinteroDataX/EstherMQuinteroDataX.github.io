# Configuring Claude: Guidance for Enterprise Admins

- **Date:** 22 Sep 2026 · 19:00–19:45 (Canary Islands time)
- **Host:** Anthropic (Goldcast) · **Speaker:** Mark Dominguez (Customer Success, Anthropic)

---

## Summary

1. Before giving anyone access, decide **5 things**: identity/access, RBAC, models, data/privacy and capabilities (connectors, skills, plugins).
2. **Connect Claude to your IdP with SCIM** and use **custom roles** for everyone (even just one, "general user"), so you control what reaches each group when new features or models ship.
3. Permissions are **additive**: if you're in one group with everything and another with nothing, you have everything.
4. **It's easier to grant access than to take it away:** start restrictive.
5. What adds the most value after launch: **connectors, skills and plugins**, which you need to keep expanding.
6. The Compliance API can only be enabled by the **primary owner** and it is **not retroactive**.

---

## 1. Context: Claude Opus 5.5 (launched that same day)

- **Price −25%**; cache reads **−60%**.
- About **40% faster** and about **30% fewer tokens** than Opus 5 on the same tasks.

::sketch opus

- **On 29 Sep**, any role with access to Opus 5 gets Opus 5.5; if Opus 5 was the default model, it switches to 5.5.
- There's a separate webinar on **cost control and analytics** (Oct 7 — you're already registered).

## 2. What was left out

- Specific IdP setup (Entra ID, Okta, Google Workspace).
- Cost control and analytics in depth (it has its own webinar).
- The settings UI changes often; Anthropic is trying to announce changes better.

## 3. The 5 decisions before launch

::sketch five

| # | Decision | What it involves |
|---|---|---|
| 1 | **Identity and access** | Verify the domain, set up SSO and choose how users are provisioned |
| 2 | **RBAC** | Members → groups → roles |
| 3 | **Models** | Default model, which models each role sees and effort limits |
| 4 | **Data and privacy** | Retention, ratings, Compliance API, audit logs |
| 5 | **Capabilities** | Connectors, skills, plugins and per-product settings |

After launch, keep an eye on SCIM sync staying active and, above all, keep expanding connectors, skills and plugins: that's what makes people get value from it.

## 4. Identity and access

**Domain verification**
- Done with your DNS team: you add a TXT record and Claude shows the value in the Enterprise settings.
- After that, only your domain can use that instance.

**SSO**
- Set up with IT in the identity provider.

**Three user provisioning modes** (Organization settings → Identity)
- **Invite only:** manual.
- **JIT (just-in-time):** the account is created the first time the user signs in.
- **SCIM:** sync with the IdP directory. **This is the recommended option** for large teams because it's automated, stays up to date and brings in the groups you already have (or you can create new groups designed for Claude).

::sketch provision

**Other settings on that screen**
- Groups and custom roles.
- Welcome email for new members.
- Extra security: retention, shorter session length, etc.

> It looks like RBAC **requires SCIM**. The speaker didn't fully confirm it.

## 5. Role-based access control (RBAC)

**Mental model:** **members** form **groups**, and a **role is applied** to each group. The role carries the permissions; when it's applied, every member of the group gets them.

::sketch rbac

**Speaker's example**
- **Organization level:** chat, web search, memory and some connectors for everyone.
- **"Builders" group with the Builder role:** adds Claude Code, Cowork, connectors like Datadog or Linear, and the most capable models.
- **"Finance leads" group:** no Code or Cowork, but with billing permission as an admin.

**In the demo (Members / Groups / Roles)**
- SCIM groups show up on their own; there's a button to check for directory changes.
- Each role sets access to chat, skills, code, connectors and models, with their effort level.
- **Important detail:** a model has to be **enabled at the organization level** to appear in RBAC (it happened live with Opus 5.5, which didn't show up until it was enabled and the page reloaded).

**Key rules**
- **Permissions add up and the broadest one wins:** if you're in an admin group with everything and another with nothing, you have everything. Check carefully who is in the groups with the most permissions.

::sketch additive

- **Start restrictive.** Taking away something people already used costs much more than giving it.

::sketch grant

- **The base "User" role has everything:** Code, Cowork, chat and whatever is enabled for the organization. Without custom roles, the only way to control anything is to turn it on or off for the whole organization.
- **Recommendation:** give everyone a custom role, even if it's just one called "general user" for 95% of the staff. That way you decide whether a new feature or model reaches everyone. It also gives you a test group.

**Q&A: how do you remove old models (e.g. 4.6/4.7) and keep only 5.5?**
- Models are managed at the **organization level** (Settings → Models).
- When you remove one, the warning "still enabled for some roles" appears: it seems you **have to remove it from each role first**. The speaker said he'd confirm and pass it on to product.

**Models: three levers**
- Default model for the organization.
- Which models each group sees.
- **Effort limits:** e.g. not giving maximum effort (which can spend about 2.5 times more) to users with simple tasks.

## 6. Data and privacy (Settings → Data and privacy)

**Retention**
- You can set a different period for chats, projects and artifacts (e.g. projects with no limit and chats for a few months).
- **Reducing retention also limits memory:** if retention is X days, memory only reaches X days back.
- Chat retention is an organization-wide policy.

::sketch retention

**Chat ratings (thumbs up or down)**
- A specific team can access rated chats if they're linked to a support case.

**Compliance API**
- **Only the primary owner** can create the key.
- **It's not retroactive:** it logs from the moment it's enabled.
- It gives visibility into usage, connectors and data flowing through Claude.
- **For the last 2–3 weeks it has included Cowork activity**, so it now covers code, chat and Cowork.

**Audit logs**
- They overlap a lot with the Compliance API, but they're exported periodically and keep less history.

**Sharing**
- Controls how far chats and artifacts can be shared. Sharing is good, but be careful if a chat uses data others wouldn't have access to.

**OpenTelemetry**
- For Cowork, Office agents and Claude Code you can export events with the OTel schema to your own dashboards (e.g. Power BI).
- For Claude chat there's no confirmed date.

**"App-like" artifacts**
- Shared, collaborative, version-controlled apps that are created and managed from Claude.
- Example: the speaker built a task tracker for his team for the Opus 5.5 launch, connected live to Slack and BigQuery.

## 7. Analytics and organization capabilities

**Analytics**
- It has changed a lot in recent weeks: it includes analytics chat and **Smart Reports**.
- Smart Reports gives qualitative and quantitative data, per user or per RBAC group, so you can compare departments.
- It has to be enabled in Capabilities.
- **Not available yet in Claude for healthcare (HIPAA).**
- If you don't see analytics, check whether you're on the Team or the Enterprise plan.

**Organization capabilities** (review them all; the speaker stressed that they matter a lot)
- **Web search:** he recommends turning it on.
- **Interactive content / inline visualizations:** maps, images, charts and diagrams.
- **Code execution:** **essential** for creating documents, Excel files or tables. If it's off, there are no files.
- **Allowed domains list:** which websites Claude can reach when running code (installing packages, data analysis).
- **Other settings:** remote control with a trusted device (per your MDM policy), routines (recurring tasks in Cowork), memory and Smart Reports.

## 8. Per-product settings

**Claude Code**
- Desktop version, managed settings, remote control, sessions, fast mode, dynamic workflows (keep going until the task is done) and code review connected to GitHub.
- Every new feature means reviewing the configuration.

**Claude Tag (Claude in Slack)**
- Works like another teammate in channels and uses company-wide context.
- It comes with **included free usage**: a good way to let power users try it.

**Cowork**
- It can run in the cloud. **This will be required when chat and Cowork merge into a single product** (Claude desktop/web will decide by itself whether a request goes to chat or to Cowork).
- It has permission modes for Cowork and for artifacts.
- It can create presentations, use Claude Design and the design systems (brand kit) defined by the admin.

**Artifacts published in the organization**
- Shared apps that can be edited in real time.
- The speaker presents them as an alternative to buying a SaaS for a one-off need of a small team.

**Other products**
- Office agents (Excel, PowerPoint) and Design.
- Claude Security, Claude Science and Claude Academy.

## 9. Connectors, skills and plugins

- **If you keep only one idea: turn on connectors.** Company context is what adds the most value.
- **Skills:** he recommends allowing them to be shared across the organization, so use cases reach every department.
- **Plugins:** they bundle connectors, skills and agents, and are assigned to groups. It's the easiest way to manage everything at scale.
  - There are default ones from Anthropic (life sciences, knowledge work, legal, healthcare, financial services) and you can also create your own with Claude.
  - Three modes: available in the library, **installed by default** or **required** (always on; the user can't turn it off).

::sketch plugins

- **Visibility:** a plugin only shows up for people whose role gives access to it.
- **Skill scanning (new):** Organization settings → Skills → Policy. It scans skills and plugins on upload to detect malicious code or instructions and blocks the ones that fail.
- **Internal rules for skills:** enforced with RBAC and skill management (who can create, share and use them).
- **Default skills:** turned on or off in Skills management.

## 10. Q&A

- **Are models trained on connector data?** No. Enterprise never trains on customer data; it's in every contract. Subprocessors and where data goes are listed in the Trust Center.
- **Several organizations with SSO/SCIM?** For now you can't use two different IdPs; the recommendation is to consolidate into one.
- **Moving from email invites to SCIM:** you don't need to delete users. They're matched by email: you create the groups in the IdP, turn on SCIM and warn people there may be interruptions while it syncs. Nobody loses content.
- **Risks of web search?** The speaker doesn't see serious risks. The usual concern is mixing web information with internal information in answers that go outside. The search provider is listed in the Trust Center.
- **Slides:** they'll be sent with the recording.

## 11. Resources and next steps

**Links from the webinar page**
- [Claude Enterprise Administrator Guide](https://claude.com/resources/tutorials/claude-enterprise-administrator-guide)
- [Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso)
- [Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)
- [Role-based permissions on Enterprise plans](https://support.claude.com/en/articles/13930458-set-up-role-based-permissions-on-enterprise-plans)
- [Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- [Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization)
- [Introducing Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)

**Announced**
- A **new, more complete admin guide** "this week" on academy.claude.com (meant to be handed to Claude so you can ask it what needs doing).
- Later on, an **admin section in Claude Academy**.
- A **cost control** webinar in about two weeks (the Oct 7 one).
- anthropic.com/events has recurring training for end users (Claude Code Foundations/Advanced, etc.) that you can recommend to your organization.

**Speaker's tip for admins without an account team:** turn on web search and ask Claude for the 10 things you need to set up as a new Enterprise admin.

## 12. Practical checklist

- [ ] Verify the domain (TXT record with DNS)
- [ ] Set up SSO with IT
- [ ] Turn on SCIM and sync groups
- [ ] Create a "general user" role and specific roles (builders, finance…)
- [ ] Check who is in the groups with the most permissions (they add up)
- [ ] Enable Opus 5.5 at the organization level and assign it per role, with its effort level
- [ ] Remove old models: first from each role, then from the organization
- [ ] Set retention per product (remember it affects memory)
- [ ] Have the primary owner enable the Compliance API as soon as possible
- [ ] Review Capabilities: web search, code execution, allowed domains and Smart Reports
- [ ] Turn on key connectors and review the skills policy (scanning on)
- [ ] Create plugins per department (installed by default or required)
- [ ] Turn on Cowork in the cloud (needed when chat and Cowork merge)
