// ─────────────────────────────────────────────────────────────
//  sprint-content.js — Rich task details, daily context, and
//  assistant messages for the 98-day sprint dashboard
// ─────────────────────────────────────────────────────────────

// === SPRINT TASK DETAILS ===
// Key format: w{weekNum}-{dayKey}-{taskIndex}
// e.g. w1-mon-0, w1-mon-1, w2-tue-2

export const SPRINT_TASK_DETAILS = {

  // ════════════════════════════════════════════════════════════
  //  WEEK 1 — D8 Configuration
  // ════════════════════════════════════════════════════════════

  // ── Monday (Day 1) ──
  'w1-mon-0': {
    why: 'Every file, skill, agent, and decision for the next 98 days needs a home. Without a clean folder structure from day one, you will waste hours searching for assets, lose context between sessions, and confuse Claude about where things live. This is the skeleton the entire system hangs on.',
    buildsToward: ['D8 Configuration'],
    unlocks: ['Consistent file paths for all future tasks', 'Claude can reference files reliably', 'Team members can find anything in seconds'],
    steps: [
      'Create the root EA_Workspace/ directory',
      'Create subdirectories: context/, decisions/, projects/, references/, templates/, .claude/',
      'Inside .claude/, create commands/ and settings/ subdirectories',
      'Add a README.md in EA_Workspace/ explaining what each folder holds',
      'Verify the full tree with ls -R and confirm no typos',
    ],
    result: 'A clean, empty folder tree at EA_Workspace/ with 6 top-level directories and .claude/ subfolders. You know it is done when ls -R shows the full tree with no missing directories.',
    resources: [
      { label: 'BLAST Master Prompt (folder conventions)', type: 'doc' },
      { label: 'Claude Code project structure docs', type: 'link' },
    ],
    estimate: '20min',
    framework: 'BLAST',
  },
  'w1-mon-1': {
    why: 'updates.md and current-priorities.md are the two files Claude reads at the start of every session. Without them, each conversation starts cold — no memory of what happened yesterday, no sense of what matters today. These files are the bridge between sessions.',
    buildsToward: ['D8 Configuration'],
    unlocks: ['Session continuity across Claude conversations', 'Priority-driven task execution', 'Morning Briefing Agent can read current state'],
    steps: [
      'Create context/updates.md with a dated entry format (## YYYY-MM-DD)',
      'Add today\'s first entry: "Day 1 — Sprint started. Folder structure created."',
      'Create context/current-priorities.md with sections: This Week, Today, Blocked, Next Up',
      'Fill in Week 1 priorities from the sprint plan',
      'Verify both files render correctly in markdown preview',
    ],
    result: 'Two markdown files in context/ that Claude can read on session start. updates.md has at least one dated entry. current-priorities.md has the Week 1 priorities listed.',
    resources: [
      { label: 'BLAST context management pattern', type: 'doc' },
    ],
    estimate: '25min',
    framework: 'BLAST',
  },
  'w1-mon-2': {
    why: 'The sprint brief is the north star document — it defines the 98-day arc, deliverables, and success metrics. The BLAST master prompt tells Claude how to behave across every session. Without these in context/, Claude cannot align its work to the bigger picture.',
    buildsToward: ['D8 Configuration'],
    unlocks: ['Claude understands the full sprint scope', 'Consistent behavior across all sessions', 'Every task connects back to a deliverable'],
    steps: [
      'Copy sprint_brief.md into context/ (the full 98-day plan with phases, deliverables, milestones)',
      'Copy the BLAST master prompt into context/blast_master_prompt.md',
      'Read both files end-to-end to confirm they are complete and not truncated',
      'Add a reference in current-priorities.md pointing to these files',
    ],
    result: 'Both sprint_brief.md and blast_master_prompt.md live in context/ and are complete. Claude can reference them in any session.',
    resources: [
      { label: 'Sprint Brief document', type: 'doc' },
      { label: 'BLAST Master Prompt', type: 'doc' },
    ],
    estimate: '15min',
    framework: 'BLAST',
  },

  // ── Tuesday (Day 2) ──
  'w1-tue-0': {
    why: 'Jack Hopkins\' Skool community contains 28+ battle-tested prompts for content creation, segmentation, tone of voice extraction, and brand building. These are not generic templates — they are the specific tools you will use in Weeks 2-5 to build Emi\'s brand voice and content pipeline.',
    buildsToward: ['D8 Configuration', 'D1 Brand Identity'],
    unlocks: ['Segmentation Prompt for Week 2', 'TOV Prompt for voice extraction', 'Content creation prompts for Phase B'],
    steps: [
      'Log into Jack Hopkins\' Skool community',
      'Navigate to the resources/prompts section',
      'Download all 28+ prompts from the Google Docs links',
      'Save each prompt as a separate .md file in references/jack-skool/',
      'Create an index file listing all prompts with one-line descriptions',
      'Verify no prompts are missing by cross-referencing the Skool post list',
    ],
    result: '28+ prompt files saved in references/jack-skool/ with an index. You can find any prompt by name. The Segmentation Prompt and TOV Prompt are clearly labeled for Week 2 use.',
    resources: [
      { label: 'Jack Hopkins Skool community', type: 'link' },
      { label: 'Google Docs prompt collection', type: 'link' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w1-tue-1': {
    why: 'CLAUDE.md is the identity file — it tells Claude who it is, what it prioritizes, which tools it can use, and what skills it has. A well-written CLAUDE.md is the difference between a generic AI assistant and a sharp, opinionated executive assistant that knows Emi\'s world. This is arguably the single most important file in the entire workspace.',
    buildsToward: ['D8 Configuration'],
    unlocks: ['Consistent Claude behavior across all sessions', 'Tool and skill awareness', 'Brand-aware content generation'],
    steps: [
      'Create .claude/CLAUDE.md',
      'Write the Identity section (who Claude is in this project, relationship to Emi)',
      'Write the Priorities section (ordered list of what matters most)',
      'Write the Tools section (list every MCP and tool available)',
      'Write the Skills section (reference each SKILL.md that will be installed)',
      'Write the Constraints section (what Claude should never do)',
      'Write the Communication Style section (how Claude should write and speak)',
      'Review for length (target 150-200 lines) and remove any fluff',
    ],
    result: 'A 150-200 line CLAUDE.md that defines Claude\'s identity, priorities, tools, skills, constraints, and communication style. Reading it should make Claude immediately useful and aligned.',
    resources: [
      { label: 'Nate\'s CLAUDE.md examples (3 files)', type: 'doc' },
      { label: 'BLAST identity pattern', type: 'doc' },
    ],
    estimate: '2hrs',
    framework: 'BLAST',
  },
  'w1-tue-2': {
    why: 'The YouTube Transcript MCP lets Claude pull transcripts from any YouTube video. This is critical for the Andrew Lane mood board method (Day 6), for analyzing competitor content, and for the YouTube Scout Agent in Week 2. Without it, you would have to manually copy transcripts — a bottleneck that kills momentum.',
    buildsToward: ['D8 Configuration', 'D7 Agents'],
    unlocks: ['Andrew Lane mood board study on Day 6', 'YouTube Scout Agent in Week 2', 'Competitor analysis from video content'],
    steps: [
      'Install the YouTube Transcript MCP package via Claude Code',
      'Configure the MCP in .claude/settings/ with the correct endpoint',
      'Test with a known YouTube video URL',
      'Verify the transcript output is clean and complete',
      'Document the MCP in CLAUDE.md under the Tools section',
    ],
    result: 'YouTube Transcript MCP installed and verified. Running it on a test video returns a clean, readable transcript. The tool is documented in CLAUDE.md.',
    resources: [
      { label: 'YouTube Transcript MCP repository', type: 'link', url: 'https://github.com/kimtaeyoon83/mcp-server-youtube-transcript' },
      { label: 'Claude Code MCP installation guide', type: 'doc' },
    ],
    estimate: '30min',
    framework: null,
  },

  // ── Wednesday (Day 3) ──
  'w1-wed-0': {
    why: 'Nate\'s Skool community provides production-grade SKILL.md files and CLAUDE.md examples that have been refined through real projects. These are not theoretical — they are the same files professional Claude Code users rely on. Having these references saves weeks of trial and error in skill design.',
    buildsToward: ['D8 Configuration'],
    unlocks: ['Frontend Design skill for website work', 'Skill Builder for creating custom skills', 'Reference CLAUDE.md patterns for your own file'],
    steps: [
      'Log into Nate\'s Skool community',
      'Download all 6 SKILL.md files',
      'Download all 3 CLAUDE.md reference files',
      'Save SKILL.md files to references/nate-skool/skills/',
      'Save CLAUDE.md files to references/nate-skool/claude-configs/',
      'Read each file to understand the structure and patterns used',
    ],
    result: '9 files saved in references/nate-skool/ (6 skills + 3 CLAUDE configs). You have read each one and understand the naming conventions, section headers, and instruction patterns used.',
    resources: [
      { label: 'Nate\'s Skool community', type: 'link' },
    ],
    estimate: '45min',
    framework: null,
  },
  'w1-wed-1': {
    why: 'The Frontend Design SKILL.md gives Claude expertise in HTML, CSS, and responsive design. You need this installed before Week 3 when you start applying brand guidelines to the website. Installing it now means Claude is ready to build production-quality web pages when the time comes.',
    buildsToward: ['D8 Configuration', 'D3 Website'],
    unlocks: ['Brand-aware website design in Week 3', 'Responsive layout capability', 'CSS architecture decisions'],
    steps: [
      'Copy the Frontend Design SKILL.md from references/nate-skool/skills/',
      'Install it to .claude/commands/ or the designated skills directory',
      'Read through the skill to understand what capabilities it gives Claude',
      'Test by asking Claude to generate a simple responsive component',
      'Update CLAUDE.md to reference this skill',
    ],
    result: 'Frontend Design SKILL.md is installed and referenced in CLAUDE.md. Claude can generate clean, responsive HTML/CSS when asked.',
    resources: [
      { label: 'Frontend Design SKILL.md', type: 'file' },
    ],
    estimate: '20min',
    framework: null,
  },
  'w1-wed-2': {
    why: 'The Skill Builder SKILL.md is a meta-skill — it teaches Claude how to create new SKILL.md files. Combined with the reference.md, this means you can build custom skills for any new capability Emi needs (content writing, research synthesis, etc.) without starting from scratch every time.',
    buildsToward: ['D8 Configuration', 'D7 Agents'],
    unlocks: ['Custom skill creation for any future need', 'Standardized skill format across the workspace', 'Agent building in Weeks 6-7'],
    steps: [
      'Copy the Skill Builder SKILL.md + reference.md from references/nate-skool/skills/',
      'Install both files to the skills directory',
      'Read the reference.md to understand the skill template structure',
      'Test by asking Claude to draft a simple skill outline',
      'Update CLAUDE.md to reference the Skill Builder',
    ],
    result: 'Skill Builder SKILL.md and reference.md installed. Claude can create new skills on demand following the standardized format.',
    resources: [
      { label: 'Skill Builder SKILL.md', type: 'file' },
      { label: 'Skill Builder reference.md', type: 'file' },
    ],
    estimate: '20min',
    framework: null,
  },

  // ── Thursday (Day 4) ──
  'w1-thu-0': {
    why: 'Nano Banana 2 is a multi-model orchestration system — it lets Claude coordinate with Gemini for tasks that benefit from a second perspective. The 5-file package includes prompts and Python scripts that enable this workflow. This becomes critical when you need diverse creative output (mood boards, content variations) and for quality-checking agent outputs.',
    buildsToward: ['D8 Configuration', 'D7 Agents'],
    unlocks: ['Multi-model content generation', 'Gemini as a creative sparring partner', 'Quality checking through model comparison'],
    steps: [
      'Download the Nano Banana 2 package (5 files)',
      'Install SKILL.md to the skills directory',
      'Save GEMINI.md as a reference for Gemini-specific instructions',
      'Install the Master Prompt to context/',
      'Install both Python scripts and verify they run (check dependencies)',
      'Test the orchestration flow end-to-end with a simple prompt',
    ],
    result: 'All 5 Nano Banana 2 files are installed. Python scripts run without errors. A test orchestration produces output from both Claude and Gemini.',
    resources: [
      { label: 'Nano Banana 2 package', type: 'file' },
      { label: 'Python 3.x runtime', type: 'link' },
    ],
    estimate: '45min',
    framework: 'Nano Banana',
  },
  'w1-thu-1': {
    why: 'brand_config.json is the single source of truth for every visual and verbal brand decision. When agents generate content, they read this file to get colors, fonts, tone rules, and platform-specific settings. Creating the empty structure now means you have a clear checklist of what brand decisions still need to be made.',
    buildsToward: ['D8 Configuration', 'D1 Brand Identity'],
    unlocks: ['Clear checklist of brand decisions needed', 'Agents can read brand values programmatically', 'Consistent cross-platform branding'],
    steps: [
      'Create brand_config.json in context/',
      'Define the top-level structure: identity, colors, fonts, tone, platforms, imagery',
      'Under each section, create empty token placeholders (e.g., "primary": "", "secondary": "")',
      'Add a platforms section with keys for Twitter, LinkedIn, Substack, YouTube',
      'Validate the JSON syntax',
      'Add a comment block (or adjacent README) explaining what each token controls',
    ],
    result: 'A valid brand_config.json with empty token structure covering identity, colors, fonts, tone, platforms, and imagery. Every field that will be populated in Week 2 is accounted for.',
    resources: [
      { label: 'Brand config schema reference', type: 'doc' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w1-thu-2': {
    why: 'Each platform (Twitter, LinkedIn, Substack, YouTube) has different content formats, character limits, and audience expectations. Creating template shells now forces you to think about these differences early. In Phase B, these templates become the starting point for every piece of content — no more staring at a blank page.',
    buildsToward: ['D8 Configuration', 'D2 Social Guidelines'],
    unlocks: ['Faster content creation in Phase B', 'Platform-specific formatting from day one', 'Content agents can use templates as starting points'],
    steps: [
      'Create templates/twitter/ with shell files: thread.md, insight.md, question.md, reply.md',
      'Create templates/linkedin/ with shell files: article.md, post.md, comment.md',
      'Create templates/substack/ with shell files: article.md, welcome-email.md',
      'Create templates/youtube/ with shell files: script-oncamera.md, script-avatar.md, script-screencap.md, description.md',
      'Each shell should have section headers but no content (placeholders only)',
      'Verify the full template tree',
    ],
    result: 'Template directories for all 4 platforms with properly named shell files. Each file has section headers showing the expected structure. Total: ~13 template files.',
    resources: [
      { label: 'Platform content format guides', type: 'doc' },
    ],
    estimate: '45min',
    framework: null,
  },

  // ── Friday (Day 5) ──
  'w1-fri-0': {
    why: 'Firecrawl gives Claude the ability to scrape and parse any webpage into clean markdown. This is essential for competitor analysis, research gathering, and the Overnight Research Agent you will build in Week 7. Without web scraping, Claude is limited to what you manually paste in.',
    buildsToward: ['D8 Configuration', 'D7 Agents'],
    unlocks: ['Web scraping for research agents', 'Competitor content analysis', 'Automated source gathering for Substack articles'],
    steps: [
      'Sign up for Firecrawl API and obtain your API key',
      'Install the Firecrawl MCP package',
      'Configure the MCP with your API key in .claude/settings/',
      'Test scrape a known webpage (e.g., a blog post)',
      'Verify the output is clean, structured markdown',
      'Update CLAUDE.md to reference Firecrawl as an available tool',
    ],
    result: 'Firecrawl MCP installed, configured, and tested. A test scrape returns clean markdown. The tool is documented in CLAUDE.md.',
    resources: [
      { label: 'Firecrawl API documentation', type: 'link', url: 'https://github.com/firecrawl/firecrawl-mcp-server' },
      { label: 'Firecrawl MCP setup guide', type: 'doc' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w1-fri-1': {
    why: 'Perplexity gives Claude real-time web search with cited sources. This is the research backbone for finding trending topics, verifying claims in articles, and keeping content current. The YouTube Scout Agent and Morning Briefing Agent both depend on search capability.',
    buildsToward: ['D8 Configuration', 'D7 Agents'],
    unlocks: ['Real-time research for content creation', 'Fact-checking capability', 'YouTube Scout and Morning Briefing agents'],
    steps: [
      'Sign up for Perplexity API and obtain your API key',
      'Install the Perplexity MCP package',
      'Configure the MCP with your API key',
      'Test a search query relevant to Emi\'s domain',
      'Verify results include citations and are factually grounded',
      'Update CLAUDE.md to reference Perplexity as an available tool',
    ],
    result: 'Perplexity MCP installed, configured, and tested. A test search returns cited, relevant results. The tool is documented in CLAUDE.md.',
    resources: [
      { label: 'Perplexity API documentation', type: 'link', url: 'https://github.com/perplexityai/modelcontextprotocol' },
      { label: 'Perplexity MCP setup guide', type: 'doc' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w1-fri-2': {
    why: 'Skills built without evals are guesswork — you ship a prompt, hope it works, and discover failures in production. Skill Creator 2.0 includes built-in evals that let you define test criteria, run variations, and score outputs before deployment. Installing it now means every agent and skill you build from Week 2 onwards can be tested systematically, catching bad outputs before they reach Emi.',
    buildsToward: ['D8 Configuration', 'D7 Agents'],
    unlocks: ['Eval-driven skill development workflow', 'Quality assurance for Morning Briefing and YouTube Scout agents', 'A/B testing of prompt approaches before committing'],
    steps: [
      'Install the Skill Creator 2.0 skill via Claude Code',
      'Read through the skill documentation to understand the eval workflow: criteria \u2192 test cases \u2192 scoring',
      'Create a simple test skill (e.g., a skill that summarizes a paragraph)',
      'Define 2-3 eval criteria for the test skill (accuracy, tone, length)',
      'Write 3 test cases with different input variations',
      'Run the eval and review the scoring output',
      'Update CLAUDE.md to reference Skill Creator 2.0 as an available skill',
    ],
    result: 'Skill Creator 2.0 installed and tested end-to-end. You have run a complete eval cycle on a test skill: defined criteria, created test cases, scored outputs, and reviewed results. The eval workflow is documented in CLAUDE.md.',
    resources: [
      { label: 'Skill Creator 2.0 documentation', type: 'doc' },
      { label: 'Claude Code skills and evals guide', type: 'link' },
    ],
    estimate: '45min',
    framework: null,
  },
  'w1-fri-3': {
    why: 'This is the capstone task of D8 Configuration. Brand enforcement rules ensure Claude never generates off-brand content — wrong tone, wrong colors, wrong formatting. The final verification is your quality gate: if anything is missing or broken, you catch it now instead of discovering gaps in Week 3 when you are trying to build.',
    buildsToward: ['D8 Configuration'],
    unlocks: ['Milestone: D8 Configuration Complete', 'Confident start to Phase A brand work', 'All tools and skills verified working'],
    steps: [
      'Add brand enforcement rules to CLAUDE.md (tone constraints, visual rules, content guidelines)',
      'Run a full D8 verification checklist: folder structure, all files present, all MCPs working',
      'Test each MCP one more time (YouTube Transcript, Firecrawl, Perplexity)',
      'Verify all SKILL.md files are installed and referenceable',
      'Verify brand_config.json is valid JSON with complete token structure',
      'Update updates.md with Day 5 completion entry',
      'Mark D8 Configuration as complete in sprint tracking',
    ],
    result: 'D8 Configuration milestone achieved. Every folder, file, MCP, and skill is in place and verified. CLAUDE.md includes brand enforcement rules. updates.md reflects completion.',
    resources: [
      { label: 'D8 Verification checklist', type: 'doc' },
      { label: 'BLAST brand enforcement pattern', type: 'doc' },
    ],
    estimate: '1hr',
    framework: 'BLAST',
  },

  // ── Saturday (Day 6) ──
  'w1-sat-0': {
    why: 'Emi\'s authentic voice lives in her spoken words, not her written ones. Lecture transcripts capture how she actually explains concepts — her rhythm, her metaphors, her tangents. The Segmentation Prompt in Week 2 will extract 9 categories of voice patterns from these transcripts. Without raw material, there is nothing to extract.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Segmentation analysis in Week 2', 'TOV document creation', 'Authentic voice replication in all content'],
    steps: [
      'Identify 3-5 of Emi\'s best lectures or talks (prefer spoken, not read from notes)',
      'Use YouTube Transcript MCP if they are on YouTube',
      'For non-YouTube recordings, transcribe using a transcription service or tool',
      'Save each transcript as a separate file in references/emi-transcripts/',
      'Label each with topic, date, and length',
    ],
    result: '3-5 lecture transcripts saved in references/emi-transcripts/. Each is a raw, spoken transcript (not polished writing). Together they represent Emi\'s natural speaking voice across different topics.',
    resources: [
      { label: 'YouTube Transcript MCP', type: 'link', url: 'https://github.com/kimtaeyoon83/mcp-server-youtube-transcript' },
      { label: 'Emi\'s lecture/talk recordings', type: 'video' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },
  'w1-sat-1': {
    why: 'The Segmentation Prompt and TOV Prompt are the two most important tools for building Emi\'s brand voice. The Segmentation Prompt breaks a transcript into 9 categories (beliefs, stories, metaphors, objections, etc.). The TOV Prompt converts those categories into a Do\'s/Don\'ts voice guide. You need both ready before Monday.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Voice segmentation in Week 2', 'TOV document compilation', 'Brand voice consistency'],
    steps: [
      'Navigate to Jack Skool community',
      'Locate the Segmentation Prompt (should be in your downloaded assets from Day 2)',
      'If not already saved, download and save to references/jack-skool/segmentation-prompt.md',
      'Locate the TOV (Tone of Voice) Prompt',
      'Save to references/jack-skool/tov-prompt.md',
      'Read both prompts carefully to understand the input format and expected output',
    ],
    result: 'Both prompts saved and understood. You know exactly what input format the Segmentation Prompt expects and what the 9 output categories are. You know what the TOV Prompt needs and what it produces.',
    resources: [
      { label: 'Jack Skool — Segmentation Prompt', type: 'doc' },
      { label: 'Jack Skool — TOV Prompt', type: 'doc' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w1-sat-2': {
    why: 'Andrew Lane\'s mood board method is a 3-step process for generating brand-aligned visual direction using ChatGPT. You will use this method on Day 9 and Day 11 to create mood boards for Emi\'s brand. Watching the 17-minute video now means you execute confidently next week instead of fumbling through the process.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Mood board generation in Week 2', 'Visual brand direction', 'Color palette extraction'],
    steps: [
      'Find the Andrew Lane mood board video on YouTube (17 min)',
      'Watch the full video, taking notes on the 3-step method',
      'Note the specific ChatGPT prompts he uses at each step',
      'Save your notes to references/andrew-lane-moodboard-method.md',
      'Identify how to adapt the method for Emi\'s academic/educational brand',
    ],
    result: 'Notes saved with the full 3-step method documented. You have the specific ChatGPT prompts written down and a plan for adapting them to Emi\'s brand context.',
    resources: [
      { label: 'Andrew Lane mood board video (YouTube, 17 min)', type: 'video', url: 'https://www.youtube.com/watch?v=vJxRug50KhE' },
    ],
    estimate: '30min',
    framework: null,
  },

  // ════════════════════════════════════════════════════════════
  //  WEEK 2 — D1 Brand Identity + D7 Seedlings
  // ════════════════════════════════════════════════════════════

  // ── Monday (Day 8) ──
  'w2-mon-0': {
    why: 'The Segmentation Prompt breaks a transcript into 9 categories: beliefs, values, stories, metaphors, phrases, objections, frameworks, emotions, and humor. Running it on the first transcript gives you the raw material for Emi\'s voice profile. Two transcripts give you patterns — what shows up in both is core to who she is.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Voice pattern identification', 'TOV document input', 'Authentic content generation'],
    steps: [
      'Open the Segmentation Prompt from references/jack-skool/',
      'Select the strongest Emi transcript (most natural, most passionate)',
      'Feed the transcript into the Segmentation Prompt (via Claude or ChatGPT)',
      'Review all 9 category outputs for accuracy and completeness',
      'Save the full output to decisions/segmentation-transcript-1.md',
      'Flag the most distinctive patterns (things only Emi would say)',
    ],
    result: 'A complete 9-category segmentation of transcript #1 saved in decisions/. You have flagged 5-10 distinctively Emi patterns across the categories.',
    resources: [
      { label: 'Segmentation Prompt', type: 'doc' },
      { label: 'Emi transcript #1', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w2-mon-1': {
    why: 'Running the same prompt on a second transcript reveals which voice patterns are consistent (core identity) versus situational (topic-dependent). Patterns that appear in both transcripts are the foundation of Emi\'s brand voice. Patterns that appear in only one are contextual and can be used selectively.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Cross-transcript pattern validation', 'Core vs. contextual voice separation', 'Stronger TOV document'],
    steps: [
      'Select the second-strongest Emi transcript',
      'Run the Segmentation Prompt on it',
      'Save output to decisions/segmentation-transcript-2.md',
      'Compare results with transcript #1 — highlight patterns that appear in both',
      'Create a brief comparison notes file: decisions/segmentation-comparison.md',
    ],
    result: 'Second segmentation complete. A comparison document highlights consistent patterns across both transcripts, giving you confidence in which voice elements are truly core to Emi.',
    resources: [
      { label: 'Segmentation Prompt', type: 'doc' },
      { label: 'Emi transcript #2', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w2-mon-2': {
    why: 'LinkedIn is the first platform where Emi\'s professional identity lives publicly. An optimized profile acts as a credibility anchor — when people discover her through Twitter, Substack, or YouTube, they will check LinkedIn. Getting headline, about, and banner right now creates a professional foundation that supports everything else.',
    buildsToward: ['D1 Brand Identity', 'D2 Social Guidelines'],
    unlocks: ['Professional credibility for cross-platform discovery', 'LinkedIn content posting in Week 4', 'Consistent brand presence'],
    steps: [
      'Draft a compelling headline (120 chars max) — positioning + value prop',
      'Write the About section — story arc, expertise, what she publishes, CTA',
      'Design or commission a banner image aligned with emerging brand direction',
      'Update profile photo if needed (consistent with other platforms)',
      'Review the profile as a stranger would — does it clearly communicate who Emi is?',
    ],
    result: 'LinkedIn profile updated with new headline, about section, and banner. A stranger visiting the profile understands who Emi is, what she does, and why they should follow her within 10 seconds.',
    resources: [
      { label: 'LinkedIn profile optimization guide', type: 'link' },
      { label: 'Emerging brand direction notes', type: 'doc' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },

  // ── Tuesday (Day 9) ──
  'w2-tue-0': {
    why: 'The TOV (Tone of Voice) document translates raw segmentation data into actionable writing rules. Do\'s and Don\'ts give Claude (and Emi) clear guardrails: "Use metaphors from everyday life" (do), "Never use corporate jargon" (don\'t). Without this document, every piece of content is a guess about what sounds like Emi.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Consistent voice across all content', 'Claude can self-check tone', 'Content review becomes faster'],
    steps: [
      'Open the TOV Prompt from references/jack-skool/',
      'Feed in the segmentation results from both transcripts',
      'Run the prompt to generate the initial TOV document',
      'Organize into clear Do\'s and Don\'ts sections by category (vocabulary, sentence structure, emotion, humor, etc.)',
      'Add specific examples from Emi\'s transcripts for each rule',
      'Save to decisions/tone-of-voice.md',
    ],
    result: 'A TOV document in decisions/ with categorized Do\'s and Don\'ts, each supported by real examples from Emi\'s transcripts. This becomes the voice reference for all content creation.',
    resources: [
      { label: 'TOV Prompt', type: 'doc' },
      { label: 'Segmentation results (transcripts 1 & 2)', type: 'file' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },
  'w2-tue-1': {
    why: 'A TOV document is theory until you test it. Generating a sample LinkedIn post and checking it against the Do\'s/Don\'ts reveals whether the voice rules actually produce content that sounds like Emi. If it sounds wrong, you refine the TOV now — not after publishing 10 off-brand posts.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Validated voice rules', 'Confidence in content generation', 'Refinement loop for TOV document'],
    steps: [
      'Pick a topic Emi has spoken about passionately',
      'Generate a LinkedIn post using Claude with the TOV document as context',
      'Read the post out loud — does it sound like Emi?',
      'Check every sentence against the Do\'s/Don\'ts list',
      'Note any rules that produced wrong output or are missing',
      'Refine the TOV document with corrections',
    ],
    result: 'A sample LinkedIn post that sounds authentically like Emi, validated against the TOV document. Any gaps in the TOV have been identified and patched.',
    resources: [
      { label: 'TOV document (decisions/tone-of-voice.md)', type: 'file' },
    ],
    estimate: '45min',
    framework: null,
  },
  'w2-tue-2': {
    why: 'A mood board translates abstract brand feelings into concrete visual direction — colors, textures, imagery style, composition. Andrew Lane\'s 3-step ChatGPT method produces a mood board that captures the emotional and aesthetic essence of Emi\'s brand. This is the visual starting point that Emi will react to and refine.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Emi review session on Day 10', 'Color palette extraction', 'Visual brand direction'],
    steps: [
      'Open your Andrew Lane method notes from Day 6',
      'Adapt the 3-step prompts for Emi\'s brand context (academic, educational, warm but rigorous)',
      'Run Step 1 in ChatGPT: describe the brand personality and audience',
      'Run Step 2: generate the mood board image',
      'Run Step 3: refine based on initial output',
      'Save the mood board image and prompts used to decisions/mood-board-v1/',
    ],
    result: 'Mood board v1 generated and saved. The image captures a visual direction for Emi\'s brand. Prompts used are documented for iteration.',
    resources: [
      { label: 'Andrew Lane method notes', type: 'doc' },
      { label: 'ChatGPT (for image generation)', type: 'link' },
    ],
    estimate: '1hr',
    framework: null,
  },

  // ── Wednesday (Day 10) ──
  'w2-wed-0': {
    why: 'Emi is the brand. No amount of AI analysis replaces her gut reaction to "does this sound like me?" and "does this look like me?" This session is the first reality check — her feedback on the TOV document and mood board will either validate the direction or redirect it. Both outcomes are valuable.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Validated or redirected TOV', 'Validated or redirected visual direction', 'Emi buy-in on brand approach'],
    steps: [
      'Prepare a clear presentation: TOV document summary + mood board v1',
      'Walk Emi through the segmentation findings — what her voice patterns are',
      'Present the Do\'s/Don\'ts with examples',
      'Show the mood board and ask for gut reactions (not analytical feedback)',
      'Capture all feedback: what resonates, what feels wrong, what is missing',
      'Save session notes to decisions/emi-session-day10.md',
    ],
    result: 'Session notes captured with clear direction on TOV refinements and mood board adjustments. You know what Emi loves, what she wants changed, and what is missing.',
    resources: [
      { label: 'TOV document', type: 'file' },
      { label: 'Mood board v1', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w2-wed-1': {
    why: 'Hex codes extracted from the mood board become the actual color palette for the brand. Coolors.co lets you pull colors directly from an image and organize them into a usable palette. These hex codes will populate brand_config.json and drive every visual decision — website, social media, presentations.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Concrete color palette for brand_config.json', 'Website color scheme', 'Social media visual consistency'],
    steps: [
      'Upload mood board v1 to Coolors.co image palette extractor',
      'Extract 5-8 candidate colors',
      'Organize into primary, secondary, accent, background, and text colors',
      'Test contrast ratios for accessibility (WCAG AA minimum)',
      'Save the palette to decisions/color-palette-v1.md with hex codes and roles',
    ],
    result: 'A color palette with 5-8 hex codes, each assigned a role (primary, secondary, etc.), with accessibility verified. Saved and ready for brand_config.json.',
    resources: [
      { label: 'Coolors.co', type: 'link', url: 'https://coolors.co' },
      { label: 'WCAG contrast checker', type: 'link' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w2-wed-2': {
    why: 'The Morning Briefing Agent is the first real agent you build — it reads project status files and generates a daily agenda. This is a seedling: a simple v1 that proves the concept. Building it now gives you early experience with agent design patterns that you will use heavily in Weeks 6-7 for more complex agents.',
    buildsToward: ['D7 Agents'],
    unlocks: ['Daily automated agenda', 'Agent design experience', 'Foundation for complex agents in Phase C'],
    steps: [
      'Define the agent\'s input sources (updates.md, current-priorities.md, sprint plan)',
      'Define the output format (daily briefing markdown)',
      'Write the agent prompt — instructions for reading inputs and generating the briefing',
      'Test with current project state',
      'Iterate on output quality — is it actionable? Does it miss anything?',
      'Save the agent to projects/agents/morning-briefing/',
    ],
    result: 'Morning Briefing Agent v1 that reads project files and outputs a structured daily agenda. Tested with real data. Produces an actionable briefing in under 30 seconds.',
    resources: [
      { label: 'Agent design patterns (Nate\'s skills)', type: 'doc' },
      { label: 'BLAST agent framework', type: 'doc' },
    ],
    estimate: '2hrs',
    framework: 'BLAST',
  },
  'w2-wed-3': {
    why: 'The Morning Briefing Agent looks good in one test, but will it hold up when project state changes? An eval with 3 variations \u2014 early sprint (few updates), mid-sprint (heavy load), and blocked state (tasks stalled) \u2014 exposes edge cases: does it handle empty files, prioritize correctly under load, surface blockers prominently? Without this, you deploy an agent that works for today but breaks next week.',
    buildsToward: ['D7 Agents'],
    unlocks: ['Confidence that the briefing agent handles real-world variation', 'Eval pattern you will reuse for every future agent', 'Identified prompt weaknesses to fix before daily use'],
    steps: [
      'Open Skill Creator 2.0 and start a new eval for the Morning Briefing Agent',
      'Define eval criteria: completeness (all priorities covered), actionability (clear next steps), accuracy (no hallucinated tasks), tone (matches CLAUDE.md style)',
      'Create test case 1: early sprint state \u2014 sparse updates.md, few priorities, no blockers',
      'Create test case 2: mid-sprint state \u2014 dense updates.md, 8+ active priorities, multiple projects in flight',
      'Create test case 3: blocked state \u2014 2 tasks blocked, dependencies unresolved, priorities needing re-order',
      'Run the eval across all 3 test cases and review scores',
      'Identify the lowest-scoring areas and refine the agent prompt to address them',
      'Re-run the eval to confirm improvements',
    ],
    result: 'Morning Briefing Agent scores consistently across 3 project-state variations. You have identified and fixed at least one prompt weakness. The eval results are saved alongside the agent.',
    resources: [
      { label: 'Skill Creator 2.0 eval workflow', type: 'doc' },
      { label: 'Morning Briefing Agent v1', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },

  // ── Thursday (Day 11) ──
  'w2-thu-0': {
    why: 'Mood board v2 incorporates Emi\'s feedback from Day 10. This is not just a revision — it is a demonstration that her input drives the brand direction. The refined mood board should feel closer to her gut sense of the brand while maintaining visual coherence and professionalism.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Final brand direction approval on Day 12', 'Refined color palette', 'Visual identity confidence'],
    steps: [
      'Review Emi\'s feedback from Day 10 session notes',
      'Adjust the ChatGPT prompts based on her feedback',
      'Generate mood board v2 with the refined direction',
      'Compare v1 and v2 side by side — does v2 address all feedback points?',
      'Save to decisions/mood-board-v2/',
    ],
    result: 'Mood board v2 that reflects Emi\'s feedback. Side-by-side comparison shows clear improvement. Ready for final approval on Day 12.',
    resources: [
      { label: 'Emi session notes (Day 10)', type: 'file' },
      { label: 'Mood board v1', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w2-thu-1': {
    why: 'Fonts carry as much brand personality as colors. A display/serif font for headlines conveys authority and sophistication. A clean sans-serif for body text ensures readability. The pairing must feel cohesive and align with the mood board direction. Wrong fonts undermine every other brand decision.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Typography for brand_config.json', 'Website font implementation', 'Content template styling'],
    steps: [
      'Study the mood board v2 for typographic mood (modern, classic, warm, sharp)',
      'Browse Google Fonts for display/serif options that match the mood',
      'Browse for complementary sans-serif body fonts',
      'Test 3-5 pairings using a font pairing tool (Fontjoy, Typ.io, or manual)',
      'Check each pairing at different sizes: headline, subhead, body, caption',
      'Select the winning pair and save to decisions/typography.md',
    ],
    result: 'A font pairing selected: one display/serif for headlines, one sans-serif for body text. Documented with rationale, Google Fonts links, and size recommendations.',
    resources: [
      { label: 'Google Fonts', type: 'link', url: 'https://fonts.google.com' },
      { label: 'Fontjoy font pairing tool', type: 'link', url: 'https://fontjoy.com' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w2-thu-2': {
    why: 'The YouTube Scout Agent monitors 4 channels weekly for trending topics, formats, and ideas relevant to Emi\'s domain. This is the second seedling agent — it uses Perplexity and YouTube Transcript MCPs together. Building it now tests multi-tool agent orchestration before the complex builds in Phase C.',
    buildsToward: ['D7 Agents'],
    unlocks: ['Automated trend monitoring', 'Content topic suggestions', 'Multi-tool agent experience'],
    steps: [
      'Identify 4 YouTube channels relevant to Emi\'s field',
      'Write the scout prompt — instructions for checking each channel, extracting topics, summarizing trends',
      'Wire up Perplexity MCP for supplementary research on identified topics',
      'Wire up YouTube Transcript MCP for pulling transcripts of interesting videos',
      'Test the full scout workflow end-to-end',
      'Save the agent to projects/agents/youtube-scout/',
    ],
    result: 'YouTube Scout Agent v1 that checks 4 channels, identifies trending topics, and provides summaries with transcript excerpts. Tested end-to-end with real channels.',
    resources: [
      { label: 'YouTube Transcript MCP', type: 'link', url: 'https://github.com/kimtaeyoon83/mcp-server-youtube-transcript' },
      { label: 'Perplexity MCP', type: 'link', url: 'https://github.com/perplexityai/modelcontextprotocol' },
    ],
    estimate: '2hrs',
    framework: 'BLAST',
  },
  'w2-thu-3': {
    why: 'The YouTube Scout Agent deals with unpredictable external data \u2014 channels vary in upload frequency, content focus, and format. Testing with 3 different channel sets reveals whether the agent degrades gracefully or produces garbage when conditions change. This eval prevents you from trusting an agent that only works on the 4 channels you hand-picked.',
    buildsToward: ['D7 Agents'],
    unlocks: ['Robust scout agent that handles channel diversity', 'Proven multi-tool orchestration pattern (Perplexity + YouTube Transcript)', 'Reusable eval template for all future research agents'],
    steps: [
      'Open Skill Creator 2.0 and start a new eval for the YouTube Scout Agent',
      'Define eval criteria: topic relevance (findings match Emi\'s domain), source quality (links valid, transcripts pulled), summary clarity (actionable insights), coverage (all channels checked)',
      'Create test case 1: 4 active, high-volume channels in Emi\'s core field',
      'Create test case 2: mix of 2 active + 2 dormant/infrequent channels',
      'Create test case 3: 4 channels adjacent to Emi\'s field (tests relevance filtering)',
      'Run the eval across all 3 channel sets and review scores',
      'Fix any prompt issues \u2014 especially around handling missing data or irrelevant content',
      'Re-run the eval to verify fixes hold across all 3 sets',
    ],
    result: 'YouTube Scout Agent scores well across 3 diverse channel sets. The agent handles dormant channels without errors and filters irrelevant content correctly. Eval results saved alongside the agent.',
    resources: [
      { label: 'Skill Creator 2.0 eval workflow', type: 'doc' },
      { label: 'YouTube Scout Agent v1', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },

  // ── Friday (Day 12) ──
  'w2-fri-0': {
    why: 'This is the brand approval gate. Emi reviews mood board v2, the refined TOV, color palette, and font pairing — and either approves the direction or requests final changes. Getting sign-off here means every piece of content from Week 3 onwards has a clear, Emi-approved brand foundation.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Brand guidelines creation', 'brand_config.json population', 'Content creation with confidence'],
    steps: [
      'Prepare the final presentation: mood board v2, color palette, font pairing, TOV summary',
      'Present each element and connect them to Emi\'s voice patterns',
      'Ask for explicit approval or specific change requests for each element',
      'If approved: note the approval in decisions/brand-approval.md',
      'If changes needed: note exactly what changes and plan to address in Day 13',
    ],
    result: 'Emi has explicitly approved the brand direction (visual + verbal), or you have a clear, bounded list of final changes. Documented in decisions/brand-approval.md.',
    resources: [
      { label: 'Mood board v2', type: 'file' },
      { label: 'Color palette', type: 'file' },
      { label: 'Typography decisions', type: 'file' },
      { label: 'TOV document', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w2-fri-1': {
    why: 'The brand guidelines document consolidates every brand decision into a single reference file. It covers colors (with hex codes), fonts (with sizes), spacing rules, tone of voice summary, and imagery guidelines. This is the file that agents, templates, and content creators reference to stay on-brand.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Single source of truth for brand', 'Agent brand-awareness', 'Content template population'],
    steps: [
      'Create decisions/brand_guidelines.md',
      'Write the Colors section with all hex codes and their roles',
      'Write the Typography section with font names, sizes, and weight rules',
      'Write the Spacing section with layout principles',
      'Write the Tone section summarizing the TOV Do\'s/Don\'ts',
      'Write the Imagery section with mood board references and photo/illustration rules',
      'Cross-reference every decision with Emi\'s approval from today\'s session',
    ],
    result: 'A comprehensive brand_guidelines.md that anyone (human or AI) can read to produce on-brand content. Every value is specific (hex codes, font names, pixel values) not vague.',
    resources: [
      { label: 'Brand approval notes', type: 'file' },
      { label: 'All brand decision files from Week 2', type: 'file' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },
  'w2-fri-2': {
    why: 'brand_config.json has been sitting empty since Day 4. Now that brand decisions are approved, you populate every token with real values. This transforms the config from a placeholder into a machine-readable brand file that agents and templates can consume programmatically.',
    buildsToward: ['D1 Brand Identity', 'D8 Configuration'],
    unlocks: ['Programmatic brand access for agents', 'Template auto-population', 'Cross-platform consistency enforcement'],
    steps: [
      'Open brand_config.json from context/',
      'Populate the colors section with approved hex codes',
      'Populate the fonts section with approved font names and sizes',
      'Populate the tone section with key voice rules from the TOV',
      'Populate the platforms section with platform-specific adaptations',
      'Validate the JSON is syntactically correct',
      'Test by having Claude read the config and generate a brand-compliant snippet',
    ],
    result: 'brand_config.json fully populated with real brand values. JSON is valid. Claude can read it and produce on-brand output. No empty tokens remain.',
    resources: [
      { label: 'brand_guidelines.md', type: 'file' },
      { label: 'brand_config.json (empty structure)', type: 'file' },
    ],
    estimate: '45min',
    framework: null,
  },

  // ── Saturday (Day 13) ──
  'w2-sat-0': {
    why: 'Anti-Generic Guardrails are specific rules that prevent the brand from looking like every other personal brand online. They target common AI traps: generic stock photo aesthetics, overused color schemes, cliche layouts. Applying them to your visual specs ensures Emi\'s brand is distinctive, not just professional.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Distinctive visual identity', 'Protection against generic AI output', 'Brand differentiation'],
    steps: [
      'Review the Anti-Generic Guardrails framework (from Jack Skool or BLAST resources)',
      'Audit the current brand guidelines against each guardrail',
      'Identify any elements that feel generic or overused',
      'Add specific guardrail rules to brand_guidelines.md (e.g., "Never use gradient backgrounds", "Avoid stock photo people")',
      'Update brand_config.json with any visual constraint tokens',
    ],
    result: 'Brand guidelines updated with Anti-Generic Guardrails. The visual specs now include explicit rules about what to avoid. The brand is distinctive, not just polished.',
    resources: [
      { label: 'Anti-Generic Guardrails framework', type: 'doc' },
      { label: 'brand_guidelines.md', type: 'file' },
    ],
    estimate: '1hr',
    framework: 'BLAST',
  },
  'w2-sat-1': {
    why: 'The final test before the brand milestone: generate one piece of content for each platform and have Emi approve. If the tweet, LinkedIn post, and Substack paragraph all sound and look like her brand, the system works. If any feels off, you have one day to fix it before the Phase B content engine starts.',
    buildsToward: ['D1 Brand Identity'],
    unlocks: ['Milestone: Brand Guidelines Finalized', 'Confident start to Phase B content creation', 'Validated content generation pipeline'],
    steps: [
      'Generate a sample tweet using brand guidelines + TOV as context',
      'Generate a sample LinkedIn post on a topic Emi cares about',
      'Generate a sample Substack opening paragraph',
      'Present all three to Emi for approval',
      'If approved: mark D1 Brand Identity as complete',
      'If changes needed: note specific adjustments and update guidelines',
      'Update updates.md with brand completion status',
    ],
    result: 'Three sample content pieces (tweet, LinkedIn, Substack) approved by Emi as on-brand. D1 Brand Identity milestone achieved. The content engine can start with confidence.',
    resources: [
      { label: 'brand_guidelines.md', type: 'file' },
      { label: 'TOV document', type: 'file' },
      { label: 'Platform templates', type: 'file' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },

  // ════════════════════════════════════════════════════════════
  //  WEEKS 3-14 — Placeholder entries
  // ════════════════════════════════════════════════════════════

  // ── Week 3 (Days 15-21) — Phase B: Content Engine — Website Polish ──

  // ── Monday (Day 15) ──
  'w3-mon-0': {
    why: 'The website is Emi\'s digital home base — the one URL that appears in every bio, email signature, and social profile. Applying the brand guidelines approved in Week 2 transforms a functional site into a cohesive visual experience that immediately communicates who Emi is. Every visitor should feel the same brand personality they encounter on Twitter, Substack, and LinkedIn.',
    buildsToward: ['D3 Website', 'D1 Brand Identity'],
    unlocks: ['Brand-consistent web presence for all link-in-bio references', 'Visual credibility when Substack and Twitter launch', 'Foundation for newsletter signup integration'],
    steps: [
      'Open brand_guidelines.md and brand_config.json — extract all hex codes, font families, and spacing tokens',
      'Audit every page of the current website: homepage, about, contact, any existing content pages',
      'Update CSS variables or style tokens to match brand colors (primary, secondary, accent, background, text)',
      'Swap fonts to the approved pairing — display/serif for headings, sans-serif for body',
      'Apply spacing, padding, and layout rules from the brand guidelines consistently across all pages',
      'Do a final visual sweep: check every page against the mood board v2 for tonal alignment',
    ],
    result: 'Every page of the website uses the approved color palette, font pairing, and spacing rules from brand_guidelines.md. A side-by-side comparison with the mood board shows clear visual alignment. No rogue fonts, colors, or spacing remain.',
    resources: [
      { label: 'brand_guidelines.md', type: 'file' },
      { label: 'brand_config.json', type: 'file' },
      { label: 'Mood board v2', type: 'file' },
      { label: 'Frontend Design SKILL.md', type: 'doc' },
    ],
    estimate: '2hrs',
    framework: null,
  },
  'w3-mon-1': {
    why: 'Emi is an academic — her publications and research are proof of expertise. A publications section on the website does what no social media bio can: it provides concrete, verifiable evidence of her intellectual authority. Visitors coming from Twitter or Substack who want to go deeper will look for this. Without it, the site feels like a personal brand without substance.',
    buildsToward: ['D3 Website'],
    unlocks: ['Academic credibility anchor for cross-platform visitors', 'SEO value from publication titles and keywords', 'Ready-made content for future Substack articles referencing her own work'],
    steps: [
      'Gather Emi\'s publication list — titles, co-authors, journals, dates, DOI links or PDFs',
      'Decide on the section layout: chronological list, categorized by topic, or featured highlights',
      'Build the publications page using the approved brand typography and layout rules',
      'Add working links to each publication (DOI, journal page, or PDF download)',
      'Include a brief introductory paragraph written in Emi\'s voice explaining her research focus',
      'Cross-check that every entry is accurate — no broken links, no missing co-authors',
    ],
    result: 'A publications/research section is live on the website with all of Emi\'s key works listed. Every entry has a working link. The section uses brand typography and a visitor can find any publication within 10 seconds.',
    resources: [
      { label: 'Emi\'s CV or publication list', type: 'doc' },
      { label: 'Google Scholar profile', type: 'link' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },
  'w3-mon-2': {
    why: 'Over half of web traffic is mobile. If the site breaks on a phone — text overflowing, buttons too small, images misaligned — visitors bounce instantly. Emi\'s audience will discover her site from Twitter and LinkedIn links, which are overwhelmingly opened on mobile. A desktop-only site is effectively invisible to half the audience.',
    buildsToward: ['D3 Website'],
    unlocks: ['Reliable mobile experience for social media traffic', 'Confidence to share the site link publicly', 'No embarrassing layout issues when Emi shows the site to colleagues'],
    steps: [
      'Test the site on at least 3 screen sizes: iPhone (375px), tablet (768px), and desktop (1280px)',
      'Check every page for layout breaks: overflowing text, overlapping elements, hidden content',
      'Verify all touch targets are at least 44x44px (Apple HIG minimum)',
      'Test navigation menu behavior on mobile — hamburger menu, drawer, or collapsible',
      'Fix all identified issues with responsive CSS (media queries, flexbox/grid adjustments)',
      'Re-test all 3 screen sizes after fixes to confirm nothing new broke',
    ],
    result: 'The website renders correctly on mobile (375px), tablet (768px), and desktop (1280px). All touch targets meet minimum size requirements. Navigation works on all screen sizes. Zero layout breaks remain.',
    resources: [
      { label: 'Chrome DevTools responsive mode', type: 'link' },
      { label: 'Apple HIG touch target guidelines', type: 'doc' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },

  // ── Tuesday (Day 16) ──
  'w3-tue-0': {
    why: 'The website gets visitors, but without a newsletter signup, they leave and may never return. A Substack embed turns passive visitors into subscribers — people who will receive Emi\'s content directly in their inbox every week. This is the bridge between the website (D3) and the Substack newsletter (D4). Every day without a signup form is lost subscriber growth.',
    buildsToward: ['D3 Website', 'D4 Substack'],
    unlocks: ['Website-to-subscriber conversion pipeline', 'Growing email list before first Substack publishes', 'Audience building across platforms'],
    steps: [
      'Get the Substack embed code from the Substack publication settings',
      'Choose placement on the website: homepage hero, footer, dedicated signup page, or all three',
      'Embed the Substack signup form into the website HTML',
      'Style the embed to match brand guidelines — colors, fonts, button styling, spacing',
      'Test the full signup flow: enter email, confirm subscription, receive welcome email',
      'Verify the embed works on mobile and desktop',
    ],
    result: 'A newsletter signup form is live on the website, visually consistent with the brand, and connected to the Substack publication. A test signup flows through successfully from the website to the Substack subscriber list.',
    resources: [
      { label: 'Substack embed documentation', type: 'link' },
      { label: 'brand_guidelines.md', type: 'file' },
    ],
    estimate: '45min',
    framework: null,
  },
  'w3-tue-1': {
    why: 'Substack is where Emi\'s long-form thought leadership lives — weekly articles that go deeper than a tweet or LinkedIn post. Setting up the account with proper branding ensures that from day one, every subscriber sees a cohesive, professional publication that matches the website and social profiles. A generic or unbranded Substack signals "side project" instead of "serious thinker."',
    buildsToward: ['D4 Substack', 'D1 Brand Identity'],
    unlocks: ['Ready to embed signup on website', 'Welcome email can be configured', 'Publication is subscriber-ready before first article'],
    steps: [
      'Create the Substack account at substack.com using Emi\'s email',
      'Set the publication name, URL slug, and tagline aligned with brand positioning',
      'Upload the brand logo as the publication icon',
      'Configure the color scheme to match brand_config.json hex codes',
      'Write the "About" page using Emi\'s voice (reference TOV document)',
      'Test that the publication page looks correct on both desktop and mobile',
    ],
    result: 'Substack account is live with branded name, logo, colors, and About page. The publication visually matches the website and brand guidelines. URL slug is clean and memorable.',
    resources: [
      { label: 'Substack publisher setup guide', type: 'link' },
      { label: 'brand_config.json', type: 'file' },
      { label: 'TOV document (decisions/tone-of-voice.md)', type: 'file' },
    ],
    estimate: '45min',
    framework: null,
  },
  'w3-tue-2': {
    why: 'The welcome email is the first thing a new subscriber reads after signing up. It sets the tone for the entire relationship — what they can expect, how often, and why it matters. A generic "thanks for subscribing" wastes the moment of highest engagement. A well-crafted welcome email in Emi\'s voice creates an immediate connection and reduces early unsubscribes.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Automated first-touch for every new subscriber', 'Sets expectations for content cadence and topics', 'Starts building relationship before first article publishes'],
    steps: [
      'Open the TOV document and the Substack welcome email template from templates/substack/',
      'Draft the subject line — warm, personal, not clickbait (aim for open rate over 60%)',
      'Write the body: personal greeting, what the newsletter covers, what to expect (frequency, topics), a small personal touch or story',
      'Apply Emi\'s voice — check every sentence against the TOV Do\'s/Don\'ts',
      'Keep it under 200 words — welcome emails that are too long get skimmed',
      'Save the draft for Emi review on Day 17',
    ],
    result: 'A welcome email draft under 200 words that sounds like Emi, sets clear expectations, and creates an immediate personal connection. Ready for Emi review in the Wednesday session.',
    resources: [
      { label: 'TOV document', type: 'file' },
      { label: 'templates/substack/welcome-email.md', type: 'file' },
    ],
    estimate: '30min',
    framework: null,
  },

  // ── Wednesday (Day 17) ──
  'w3-wed-0': {
    why: 'Emi has not seen the website since brand guidelines were applied, and this is her first look at the Substack publication. Her feedback at this stage catches issues before the site goes live publicly and before the first article is written. This session is a quality gate — if Emi is not happy with the website or Substack setup, better to fix it now than after launch.',
    buildsToward: ['D3 Website', 'D4 Substack'],
    unlocks: ['Confidence to deploy website v2 on Friday', 'Validated Substack branding before first publish', 'Clear feedback loop that prevents off-brand content'],
    steps: [
      'Prepare a walkthrough: website v2 (every page), Substack publication page, and welcome email draft',
      'Walk Emi through the website — let her click around, do not just show screenshots',
      'Show the Substack publication page and About section',
      'Present the welcome email draft — read it aloud in her voice',
      'Capture all feedback: what she loves, what feels wrong, what is missing',
      'Prioritize feedback into must-fix (before Friday deploy) and nice-to-have (later)',
    ],
    result: 'Session notes saved with prioritized feedback for both website and Substack. Must-fix items are clearly identified for the afternoon fix session. Emi has seen and reacted to everything.',
    resources: [
      { label: 'Website v2 (local/staging)', type: 'link' },
      { label: 'Substack publication page', type: 'link' },
      { label: 'Welcome email draft', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w3-wed-1': {
    why: 'Open feedback loops kill momentum. Every piece of Emi feedback left unaddressed chips away at her trust in the process and creates compound work later. Fixing issues the same day they are identified keeps the sprint on track and demonstrates that her input is taken seriously and acted on immediately.',
    buildsToward: ['D3 Website', 'D4 Substack'],
    unlocks: ['Website ready for Friday deployment', 'Substack branding finalized', 'Emi trust in the feedback-response cycle'],
    steps: [
      'Review the session notes from the morning — pull out every must-fix item',
      'Address website fixes first (highest priority since deploy is Friday)',
      'Address Substack branding fixes',
      'Update the welcome email based on any voice or tone feedback',
      'Test every fix on mobile and desktop',
      'Send Emi a brief summary of what was fixed (builds trust in the process)',
    ],
    result: 'All must-fix items from the morning session are resolved and verified. Emi has received a summary of changes. The website and Substack are ready for the next milestone.',
    resources: [
      { label: 'Emi session notes (Day 17)', type: 'file' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },
  'w3-wed-2': {
    why: 'The first Substack article is not just content — it is the publication\'s debut. The outline needs to be strategic: a topic that showcases Emi\'s expertise, is relevant to her target audience, and is strong enough to make a first impression worth remembering. A weak first article undermines every future issue. The outline ensures the draft (Day 18) starts from a strong structural foundation rather than a blank page.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Efficient drafting on Day 18', 'Strategic first impression for the publication', 'Topic validation before writing investment'],
    steps: [
      'Review Emi\'s research topics, recent lectures, and hot topics in her field',
      'Choose a topic that sits at the intersection of her expertise and audience interest',
      'Write the article outline: hook/opening, 3-5 key sections, conclusion with CTA',
      'Define the core argument or thesis — what should the reader believe or do after reading?',
      'Identify any research, data, or references needed for the draft',
      'Validate the outline against Emi\'s TOV — does this topic let her voice shine?',
    ],
    result: 'A detailed outline for Substack #1 with a clear thesis, 3-5 section headers, and identified research needs. The topic is strategically chosen for maximum first-impression impact.',
    resources: [
      { label: 'TOV document', type: 'file' },
      { label: 'templates/substack/article.md', type: 'file' },
      { label: 'Emi\'s research areas and lecture topics', type: 'doc' },
    ],
    estimate: '45min',
    framework: null,
  },

  // ── Thursday (Day 18) ──
  'w3-thu-0': {
    why: 'This is the flagship article — the first thing subscribers will read, and the piece Emi will share across all platforms to announce the newsletter. It needs to be excellent, not just good. A strong first article sets subscriber expectations high and gives Emi a concrete piece of content to be proud of. The TOV document is the quality guardrail that ensures it sounds authentically like her.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Content for cross-platform launch in Week 4', 'Material to repurpose for LinkedIn article', 'Proof of concept that the content pipeline works'],
    steps: [
      'Open the outline from Day 17 and the TOV document side by side',
      'Write the opening hook — aim for the first 2 sentences to stop the scroll',
      'Draft each section following the outline structure, staying in Emi\'s voice throughout',
      'Add specific examples, data points, or stories that only Emi would tell',
      'Write a strong closing with a clear call to action (reply, share, or reflect)',
      'Self-edit: read aloud, cut filler words, check every sentence against TOV Do\'s/Don\'ts',
    ],
    result: 'A complete first draft of Substack #1, written in Emi\'s voice, with a compelling hook, clear structure, and strong closing CTA. Ready for Emi review on Day 19.',
    resources: [
      { label: 'Substack #1 outline', type: 'file' },
      { label: 'TOV document', type: 'file' },
      { label: 'templates/substack/article.md', type: 'file' },
    ],
    estimate: '2hrs',
    framework: null,
  },
  'w3-thu-1': {
    why: 'Twitter/X is the discovery engine — it is where new people find Emi before they visit the website or subscribe to Substack. The profile (bio, banner, pinned post) is the storefront. A visitor decides within 3 seconds whether to follow. A sloppy or generic profile means zero conversions from impressions to followers. Every element must communicate expertise, personality, and value in minimal space.',
    buildsToward: ['D5 Twitter/X', 'D1 Brand Identity'],
    unlocks: ['Twitter/X ready for first thread posting in Week 4', 'Pinned post drives traffic to Substack/website', 'Brand-consistent profile across all platforms'],
    steps: [
      'Write the bio (160 chars max): positioning + expertise + personality + optional CTA',
      'Design or adapt the banner image from the brand mood board (1500x500px)',
      'Upload the same profile photo used on LinkedIn and the website',
      'Write a pinned post that introduces Emi and links to the website and Substack',
      'Set the profile link to the website URL',
      'Review the profile as a stranger would — does it pass the 3-second test?',
    ],
    result: 'Twitter/X profile is complete with brand-consistent bio, banner, profile photo, and a pinned post that drives traffic to the website and Substack. The profile passes the 3-second credibility test.',
    resources: [
      { label: 'brand_guidelines.md', type: 'file' },
      { label: 'Mood board v2', type: 'file' },
      { label: 'Twitter/X profile dimensions guide', type: 'doc' },
    ],
    estimate: '1hr',
    framework: null,
  },

  // ── Friday (Day 19) ──
  'w3-fri-0': {
    why: 'Before anything goes public, Emi must approve the Substack draft and the Twitter/X profile. These are her first public-facing content pieces — they set the tone for everything that follows. The Substack draft needs to sound unmistakably like her, and the Twitter bio needs to represent her accurately. Getting sign-off now avoids the pain of retroactive corrections after publishing.',
    buildsToward: ['D4 Substack', 'D5 Twitter/X'],
    unlocks: ['Green light to deploy website on Friday afternoon', 'Confidence to publish Substack #1 in Week 4', 'Twitter/X ready for first thread'],
    steps: [
      'Present the Substack #1 draft — walk Emi through the structure and key points',
      'Ask Emi to read it silently and note anything that does not sound like her',
      'Present the Twitter/X profile: bio, banner, pinned post',
      'Ask for explicit approval or specific changes for each element',
      'Document all feedback with clear action items and deadlines',
      'If approved, confirm the publication schedule for Week 4 launch',
    ],
    result: 'Emi has reviewed and approved (or provided bounded feedback on) the Substack #1 draft and Twitter/X profile. Publication timeline for Week 4 is confirmed.',
    resources: [
      { label: 'Substack #1 draft', type: 'file' },
      { label: 'Twitter/X profile (live preview)', type: 'link' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w3-fri-1': {
    why: 'Content templates eliminate the blank-page problem. Every Twitter thread, insight post, and question post will follow a proven structure, so the EA can produce content faster and more consistently. Three distinct templates cover the core content types: threads for depth, insights for single ideas, and questions for engagement. These templates become the backbone of the batch-writing workflow.',
    buildsToward: ['D5 Twitter/X', 'D2 Social Guidelines'],
    unlocks: ['Faster batch writing on Day 20', 'Consistent format across all Twitter/X content', 'EA can create content independently using templates'],
    steps: [
      'Create the Thread template: hook tweet, 4-6 body tweets, closing CTA — with placeholder prompts for each section',
      'Create the Insight template: single-tweet format with a framework for distilling one idea into 280 characters',
      'Create the Question template: engagement-focused format designed to spark replies and discussion',
      'Apply Emi\'s TOV guidelines to each template — add voice reminders and don\'ts within the template',
      'Save all three to templates/twitter/ as thread.md, insight.md, question.md',
      'Test each template by drafting a quick example to verify they produce on-brand output',
    ],
    result: 'Three Twitter/X content templates saved in templates/twitter/. Each has clear structure, placeholder prompts, and embedded TOV reminders. A test draft from each template sounds like Emi.',
    resources: [
      { label: 'TOV document', type: 'file' },
      { label: 'Twitter/X best practices for academic thought leaders', type: 'doc' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w3-fri-2': {
    why: 'This is the moment the website goes from staging to production. Every brand guideline, responsive fix, publication section, and newsletter embed from this week culminates in a live, public website. Deploying on Friday gives the weekend to catch any production issues before the content launch in Week 4. A broken deploy with no buffer is a crisis; a Friday deploy with a weekend buffer is strategic.',
    buildsToward: ['D3 Website'],
    unlocks: ['Milestone: D3 Website live', 'Public URL for Twitter bio and Substack profile', 'Foundation for all cross-platform content linking'],
    steps: [
      'Run a final pre-deploy checklist: all brand styles applied, responsive on all devices, newsletter form working, publications section complete',
      'Check all links — internal navigation, external publications links, social media links',
      'Deploy to production hosting (Vercel, Netlify, or whichever platform is configured)',
      'Verify the live site matches the local/staging version exactly',
      'Test the newsletter signup form on the live URL',
      'Update updates.md with D3 Website deployment entry',
    ],
    result: 'Website v2 is live at the public URL. All pages are brand-consistent, responsive, and functional. Newsletter signup works on the live site. D3 Website milestone achieved.',
    resources: [
      { label: 'Hosting platform dashboard', type: 'link' },
      { label: 'Pre-deploy checklist', type: 'doc' },
    ],
    estimate: '45min',
    framework: null,
  },

  // ── Saturday (Day 20) ──
  'w3-sat-0': {
    why: 'Batch writing is the key to consistent posting without daily creative pressure. Writing 3 threads in one sitting is more efficient than writing one thread on 3 separate days because you stay in the creative zone and maintain voice consistency. These threads become the content buffer for Week 4 launch — you want at least a week of content ready before the first post goes live.',
    buildsToward: ['D5 Twitter/X'],
    unlocks: ['Content buffer for Week 4 Twitter launch', 'Consistent voice across the first batch', 'Reduced daily content pressure during launch week'],
    steps: [
      'Choose 3 topics from Emi\'s expertise areas that will resonate with the target audience',
      'Use the thread template (templates/twitter/thread.md) for each',
      'Write thread #1: aim for a hook that stops scrolling and 4-6 body tweets that deliver value',
      'Write thread #2: vary the format slightly — try a story-based or data-driven angle',
      'Write thread #3: aim for the most shareable topic — something that invites replies',
      'Self-edit all three against the TOV document, then save to a content queue folder',
    ],
    result: 'Three complete Twitter/X threads written, self-edited against the TOV, and saved in the content queue. Each follows the template structure and sounds authentically like Emi.',
    resources: [
      { label: 'templates/twitter/thread.md', type: 'file' },
      { label: 'TOV document', type: 'file' },
      { label: 'Emi\'s key topics and expertise areas', type: 'doc' },
    ],
    estimate: '2hrs',
    framework: null,
  },
  'w3-sat-1': {
    why: 'The first Substack article must be polished and ready for publication at the start of Week 4. Finalizing means incorporating any feedback from the Friday Emi session, doing a final proofread, adding images or formatting, and scheduling the publication. Having it queued and ready means Monday of Week 4 starts with a launch, not last-minute editing.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Monday Week 4 Substack launch with zero stress', 'Cross-platform launch coordination', 'Email delivery tested before going live'],
    steps: [
      'Incorporate any feedback from Friday\'s Emi session into the draft',
      'Do a final proofread: grammar, clarity, flow, and voice consistency',
      'Add any images, pull quotes, or formatting that enhances readability',
      'Write the email subject line and preview text for the subscriber notification',
      'Schedule the publication in Substack for Monday morning (Week 4)',
      'Verify email delivery settings — send a test email to confirm formatting',
    ],
    result: 'Substack #1 is finalized, proofread, and scheduled for Monday publication. Email delivery has been tested. The article is polished and ready for launch.',
    resources: [
      { label: 'Substack #1 draft (revised)', type: 'file' },
      { label: 'Substack scheduling documentation', type: 'link' },
    ],
    estimate: '1hr',
    framework: null,
  },

  // ════════════════════════════════════════════════════════════
  //  WEEK 4 — Phase B: Content Engine — Launch Content
  // ════════════════════════════════════════════════════════════

  // ── Monday (Day 22) ──
  'w4-mon-0': {
    why: 'This is launch day for the Substack newsletter. Publishing article #1 marks the moment Emi\'s content goes from private drafts to public thought leadership. The first published article sets the quality bar, establishes the publication cadence, and sends the first real email to subscribers. Every detail matters — subject line, preview text, formatting, and timing.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Subscribers receive first content — retention clock starts', 'Material to repurpose for LinkedIn in Day 23', 'Social proof: a live publication with real content'],
    steps: [
      'Do a final review of the scheduled article — check formatting, links, images, and subject line',
      'Confirm the publication is set to send to all subscribers',
      'Publish (or let the scheduled publish trigger)',
      'Monitor email delivery: check for bounces or formatting issues in the received email',
      'Share the published article URL — verify it renders correctly for non-subscribers',
      'Log the publication in updates.md with publication date and subscriber count',
    ],
    result: 'Substack #1 is published and delivered to all subscribers. Email delivery confirmed with no formatting issues. The article is publicly accessible at its Substack URL.',
    resources: [
      { label: 'Substack publisher dashboard', type: 'link' },
      { label: 'Substack #1 (scheduled)', type: 'file' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w4-mon-1': {
    why: 'The first Twitter/X thread is Emi\'s public entrance to the platform. It tells the algorithm and potential followers what kind of content to expect. The thread should showcase her expertise, voice, and the value followers will get. A strong debut thread, combined with the polished profile from Week 3, maximizes the chance of early follows and engagement that compound over time.',
    buildsToward: ['D5 Twitter/X'],
    unlocks: ['Algorithm exposure begins — reach compounds with each post', 'Early follower base for engagement on future threads', 'Validation of content templates in the wild'],
    steps: [
      'Select the strongest thread from the 3 written on Day 20',
      'Do a final review: hook strength, flow between tweets, CTA in the closing tweet',
      'Post the thread to Twitter/X (manually or via scheduling tool)',
      'Pin or reference the thread in the profile if it outperforms the pinned welcome post',
      'Engage with any early replies within the first 2 hours (critical for algorithm)',
      'Log the post in the content tracking system with date, topic, and thread link',
    ],
    result: 'First Twitter/X thread is live. Early engagement has been responded to. Thread link and metrics are logged in the content tracker.',
    resources: [
      { label: 'Content queue (3 threads from Day 20)', type: 'file' },
      { label: 'Twitter/X posting best practices', type: 'doc' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w4-mon-2': {
    why: 'LinkedIn is where Emi\'s professional network already exists — colleagues, students, conference contacts. Optimizing the profile now ensures that when the LinkedIn article drops on Tuesday, visitors land on a profile that reinforces the same brand they see on the website and Substack. An outdated or generic LinkedIn profile undercuts the credibility of every content piece shared there.',
    buildsToward: ['D2 Social Guidelines', 'D1 Brand Identity'],
    unlocks: ['Credible profile ready for LinkedIn article on Day 23', 'Cross-platform brand consistency', 'Professional network re-engagement through fresh profile appearance'],
    steps: [
      'Rewrite the headline (120 chars max) to match brand positioning — not just a job title, but a value proposition',
      'Rewrite the About section using Emi\'s voice (reference TOV document): story, expertise, what she publishes, CTA to website/Substack',
      'Upload a branded banner image consistent with website and Twitter/X',
      'Ensure profile photo matches other platforms',
      'Update the Featured section with a link to the website and Substack #1',
      'Review the profile as a first-time visitor — does it clearly communicate who Emi is and why to follow?',
    ],
    result: 'LinkedIn profile is fully optimized with brand-consistent headline, About section, banner, and Featured links. A first-time visitor understands who Emi is, what she offers, and where to find more within 10 seconds.',
    resources: [
      { label: 'brand_guidelines.md', type: 'file' },
      { label: 'TOV document', type: 'file' },
      { label: 'LinkedIn profile optimization guide', type: 'link' },
    ],
    estimate: '1hr',
    framework: null,
  },

  // ── Tuesday (Day 23) ──
  'w4-tue-0': {
    why: 'Repurposing is the content multiplier. Emi invested 2+ hours writing Substack #1 — adapting it for LinkedIn extracts additional value from that effort with a fraction of the work. LinkedIn\'s format is different (shorter, more professional, optimized for the feed), so this is not copy-paste. It is strategic adaptation that reaches a different audience segment through a different platform.',
    buildsToward: ['D4 Substack', 'D2 Social Guidelines'],
    unlocks: ['Cross-platform content strategy validated', 'LinkedIn audience exposed to Emi\'s thought leadership', 'Template for future Substack-to-LinkedIn repurposing'],
    steps: [
      'Read Substack #1 and identify the core argument and 2-3 strongest points',
      'Rewrite the opening for LinkedIn — shorter hook, more professional framing',
      'Condense the body to LinkedIn-friendly length (600-1200 words vs. Substack\'s full length)',
      'Adapt the tone: slightly more professional than Substack while still sounding like Emi (TOV document)',
      'Add a CTA that links to the full Substack article for readers who want more depth',
      'Publish the LinkedIn article and track the URL in the content log',
    ],
    result: 'A LinkedIn article adapted from Substack #1 is published. It stands on its own as valuable content while linking back to the full Substack piece. The adaptation workflow is documented for future repurposing.',
    resources: [
      { label: 'Substack #1 (published)', type: 'link' },
      { label: 'TOV document', type: 'file' },
      { label: 'templates/linkedin/article.md', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w4-tue-1': {
    why: 'Social branded guidelines codify the rules for posting across all platforms — frequency, tone adaptations, content types, and engagement practices. Without this document, the EA must make judgment calls on every post. With it, content creation becomes a repeatable system. This document is the D2 Social Guidelines deliverable taking shape.',
    buildsToward: ['D2 Social Guidelines'],
    unlocks: ['Consistent posting decisions without asking Emi every time', 'Foundation for content automation in Phase C', 'Onboarding reference if the team grows'],
    steps: [
      'Create the document structure: Platform Rules, Content Types, Posting Cadence, Tone Adaptations, Engagement Rules, Visual Guidelines',
      'Define posting frequency for each platform: Twitter (daily), LinkedIn (2x/week), Substack (weekly)',
      'Document tone adaptations per platform — how Emi\'s voice shifts between Twitter (casual-sharp) and LinkedIn (professional-warm)',
      'Specify content types per platform (threads vs. articles vs. newsletters)',
      'Define engagement rules: response time targets, reply tone, what to ignore',
      'Save as the draft social branded guidelines doc for refinement through the week',
    ],
    result: 'A draft social branded guidelines document with clear rules for posting frequency, tone, content types, and engagement across Twitter, LinkedIn, and Substack. Ready for refinement based on real publishing experience this week.',
    resources: [
      { label: 'TOV document', type: 'file' },
      { label: 'brand_guidelines.md', type: 'file' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },
  'w4-tue-2': {
    why: 'Momentum matters on Twitter/X. Posting thread #2 the day after #1 signals to the algorithm and to early followers that Emi is a consistent presence, not a one-time poster. The second thread also provides a data point for what topics and formats resonate, which informs the content calendar later this week.',
    buildsToward: ['D5 Twitter/X'],
    unlocks: ['Algorithm consistency signal', 'Second data point on engagement patterns', 'Follower retention through regular content'],
    steps: [
      'Select thread #2 from the content queue (written Day 20)',
      'Do a final review — ensure it complements (not repeats) thread #1\'s topic',
      'Post the thread to Twitter/X',
      'Engage with replies within the first 2 hours',
      'Note any engagement differences compared to thread #1 (topic, format, timing)',
    ],
    result: 'Twitter/X thread #2 is live. Engagement has been tracked alongside thread #1 for comparison. Content queue still has thread #3 ready.',
    resources: [
      { label: 'Content queue', type: 'file' },
    ],
    estimate: '20min',
    framework: null,
  },

  // ── Wednesday (Day 24) ──
  'w4-wed-0': {
    why: 'One week of live content provides the first real data on what works. Emi needs to see the numbers — opens, clicks, replies, follows — not to judge success, but to calibrate the content strategy. What topics sparked the most engagement? Which platform performed best? This session turns gut feelings into data-driven decisions for the next 3 weeks of content.',
    buildsToward: ['D4 Substack', 'D5 Twitter/X', 'D2 Social Guidelines'],
    unlocks: ['Data-informed content direction', 'Emi buy-in on content strategy based on evidence', 'Adjustments to social guidelines based on real performance'],
    steps: [
      'Compile engagement metrics: Substack (opens, clicks, replies), Twitter (impressions, engagement rate, follows), LinkedIn (views, reactions, comments)',
      'Identify top-performing content and hypothesize why it worked',
      'Identify underperforming content and hypothesize why it did not land',
      'Prepare 2-3 strategic recommendations based on the data',
      'Present everything to Emi with clear visuals (charts or summary table)',
      'Capture Emi\'s reactions and strategic adjustments in session notes',
    ],
    result: 'Content review session complete. Engagement data compiled across all platforms. Strategic adjustments noted with Emi\'s input. Session notes saved for content calendar planning.',
    resources: [
      { label: 'Substack analytics dashboard', type: 'link' },
      { label: 'Twitter/X analytics', type: 'link' },
      { label: 'LinkedIn analytics', type: 'link' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w4-wed-1': {
    why: 'Substack #2 needs to land within one week of #1 to establish the weekly cadence. Subscribers who signed up for a newsletter expect consistent delivery. The outline should be informed by the morning\'s engagement review — if a topic resonated on Twitter, expanding it for Substack is a data-validated choice. Planning now gives Thursday a clear writing target.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Efficient drafting on Thursday', 'Data-informed topic selection', 'Weekly publishing cadence established'],
    steps: [
      'Review the engagement data from the morning session — which topics resonated?',
      'Choose a Substack #2 topic: either expand a high-performing Twitter topic or explore a related angle from Substack #1',
      'Write the outline: hook, 3-5 sections, conclusion with CTA',
      'Define the core thesis — what should the reader take away?',
      'Identify any research, examples, or data needed for the draft',
    ],
    result: 'Substack #2 outline complete with a data-informed topic choice. Outline includes hook, section structure, thesis, and research needs. Ready for drafting on Thursday.',
    resources: [
      { label: 'Engagement data from morning session', type: 'file' },
      { label: 'templates/substack/article.md', type: 'file' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w4-wed-2': {
    why: 'Thread #3 continues the daily posting momentum and uses the third piece from the batch written on Day 20. Consistent posting in the first week trains the algorithm and builds follower expectations. Each thread also generates engagement data that feeds back into the content strategy.',
    buildsToward: ['D5 Twitter/X'],
    unlocks: ['Third data point on engagement', 'Content queue empty — triggers new batch writing on Friday', 'Consistent first-week presence'],
    steps: [
      'Select thread #3 from the content queue — the last of the Day 20 batch',
      'Final review against TOV and ensure it offers a different angle from threads #1 and #2',
      'Post the thread to Twitter/X',
      'Engage with replies promptly',
      'Update the content tracker with thread #3 metrics',
    ],
    result: 'Twitter/X thread #3 is live. All three threads from the initial batch have been posted. Engagement data for all three is being tracked.',
    resources: [
      { label: 'Content queue', type: 'file' },
    ],
    estimate: '20min',
    framework: null,
  },

  // ── Thursday (Day 25) ──
  'w4-thu-0': {
    why: 'With the outline ready from yesterday and engagement data fresh, Thursday is the writing day. Substack #2 needs to be as strong as #1 but should also show growth — a tighter structure, a more confident voice, or a more daring angle. This article proves that the content pipeline is sustainable, not a one-off effort.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Substack #2 ready for Emi review Friday', 'Weekly publishing cadence sustained', 'Cross-platform repurposing material for next week'],
    steps: [
      'Open the Substack #2 outline and TOV document',
      'Write the opening hook — aim to surpass the quality of Substack #1\'s hook',
      'Draft each section following the outline, incorporating research and data identified yesterday',
      'Include specific examples or stories that ground the argument in Emi\'s experience',
      'Write a closing CTA that encourages replies or sharing',
      'Self-edit against the TOV Do\'s/Don\'ts — be ruthless about cutting filler',
    ],
    result: 'Substack #2 draft complete. The article is structured, voiced in Emi\'s tone, and self-edited. Ready for Emi review on Friday.',
    resources: [
      { label: 'Substack #2 outline', type: 'file' },
      { label: 'TOV document', type: 'file' },
    ],
    estimate: '2hrs',
    framework: null,
  },
  'w4-thu-1': {
    why: 'A content calendar prevents reactive, last-minute content creation. Mapping 4 weeks out ensures every post, article, and thread is planned with strategic intent — topic diversity, platform balance, and key dates are all visible in advance. This calendar becomes the execution backbone for the EA and the review artifact for Emi sessions.',
    buildsToward: ['D2 Social Guidelines', 'D4 Substack', 'D5 Twitter/X'],
    unlocks: ['Proactive content planning replaces reactive scrambling', 'Emi can see the content roadmap and suggest changes', 'Batch writing becomes more efficient with planned topics'],
    steps: [
      'Create a calendar template with columns: Date, Platform, Content Type, Topic, Status, Link',
      'Map the next 4 weeks of Substack articles (weekly cadence, topic progression)',
      'Map Twitter/X threads for each week (3-4 per week, varied formats)',
      'Map LinkedIn posts (2x/week, mix of original and repurposed)',
      'Identify any key dates, events, or trending moments in Emi\'s field to plan around',
      'Add status tracking: Draft, Review, Approved, Scheduled, Published',
    ],
    result: 'A content calendar template covering 4 weeks across all platforms. Every slot has a planned topic, content type, and status field. The calendar is ready for Emi review on Friday.',
    resources: [
      { label: 'Engagement data from Week 4', type: 'file' },
      { label: 'Emi\'s upcoming events and key dates', type: 'doc' },
    ],
    estimate: '1hr',
    framework: null,
  },

  // ── Friday (Day 26) ──
  'w4-fri-0': {
    why: 'This is the second Emi review session this week, and it covers two critical artifacts: the Substack #2 draft and the 4-week content calendar. Emi\'s approval on the draft ensures voice quality is maintained. Her review of the calendar is even more important — it is the first time she sees the content roadmap and can shape the strategic direction of upcoming topics.',
    buildsToward: ['D4 Substack', 'D2 Social Guidelines'],
    unlocks: ['Substack #2 ready for final polish and publication', 'Content calendar approved — reduces future review overhead', 'Strategic alignment on content direction for the next month'],
    steps: [
      'Present Substack #2 draft — highlight improvements over #1 based on engagement data',
      'Walk through any editorial choices and how they connect to Emi\'s voice',
      'Present the 4-week content calendar — explain the topic logic and platform distribution',
      'Ask Emi to flag any topics she wants to add, remove, or reorder',
      'Capture all feedback with clear action items and priorities',
      'Confirm the publication schedule for Substack #2 (Saturday)',
    ],
    result: 'Substack #2 draft reviewed with Emi feedback incorporated or noted. Content calendar reviewed and approved (or adjusted). Publication of Substack #2 confirmed for Saturday.',
    resources: [
      { label: 'Substack #2 draft', type: 'file' },
      { label: 'Content calendar (4 weeks)', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w4-fri-1': {
    why: 'The initial batch of 3 threads from Day 20 is spent. Without a new batch, posting stops next week and the algorithm momentum dies. Batch writing 3 more threads (4-6) on Friday afternoon keeps the content buffer full. Each thread should be informed by the engagement data from this week — double down on formats and topics that worked.',
    buildsToward: ['D5 Twitter/X'],
    unlocks: ['Content buffer replenished for next week', 'Data-informed content improves engagement', 'EA can post consistently without daily writing pressure'],
    steps: [
      'Review this week\'s engagement data — which thread topics and formats performed best?',
      'Choose 3 new topics that build on what worked (or deliberately test a new angle)',
      'Write thread #4 using the strongest-performing format from this week',
      'Write thread #5 with a different format to test variety',
      'Write thread #6 targeting maximum shareability or discussion',
      'Self-edit all three against the TOV document and add to the content queue',
    ],
    result: 'Three new Twitter/X threads (#4-6) written, self-edited, and added to the content queue. Topics and formats are informed by Week 4 engagement data.',
    resources: [
      { label: 'Week 4 engagement data', type: 'file' },
      { label: 'templates/twitter/thread.md', type: 'file' },
      { label: 'TOV document', type: 'file' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },

  // ── Saturday (Day 27) ──
  'w4-sat-0': {
    why: 'The social branded guidelines draft from Tuesday has been tested against a full week of real publishing. Now it needs to be finalized with lessons learned — what worked, what did not, what rules need adjustment. A finalized guidelines doc means the EA can operate with confidence and consistency going forward, and it becomes D2 Social Guidelines milestone material.',
    buildsToward: ['D2 Social Guidelines'],
    unlocks: ['Milestone progress: D2 Social Guidelines', 'EA can post independently with clear rules', 'Onboarding reference for any future team members'],
    steps: [
      'Review the draft social guidelines against this week\'s real publishing experience',
      'Update posting frequency recommendations based on what was sustainable',
      'Refine tone adaptation rules based on platform-specific engagement data',
      'Add engagement rules learned from real interactions (what types of replies to prioritize)',
      'Incorporate any feedback from Emi\'s review sessions this week',
      'Format the document for readability and share with Emi for final sign-off',
    ],
    result: 'Social branded guidelines document finalized with rules validated by a full week of real publishing. Document covers posting frequency, tone adaptations, content types, and engagement rules for all platforms.',
    resources: [
      { label: 'Draft social guidelines (from Day 23)', type: 'file' },
      { label: 'Week 4 engagement data', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w4-sat-1': {
    why: 'Publishing Substack #2 one week after #1 establishes the weekly cadence that subscribers expect. Consistency is the most important factor in newsletter growth — irregular publishing trains subscribers to ignore future emails. This article also provides fresh material for next week\'s LinkedIn repurposing and further validates the content pipeline.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Weekly cadence established — subscribers know when to expect content', 'Fresh material for LinkedIn repurposing next week', 'Second data point on Substack engagement patterns'],
    steps: [
      'Incorporate any remaining feedback from Friday\'s Emi session',
      'Final proofread: grammar, flow, voice consistency, formatting',
      'Write the email subject line and preview text — aim to match or beat Substack #1 open rate',
      'Publish the article on Substack',
      'Monitor email delivery for the first hour — check for bounces or formatting issues',
      'Log publication in updates.md and the content calendar',
    ],
    result: 'Substack #2 published and delivered to subscribers. Email delivery confirmed. Metrics tracking started. Weekly cadence is now established.',
    resources: [
      { label: 'Substack #2 (final draft)', type: 'file' },
      { label: 'Substack publisher dashboard', type: 'link' },
    ],
    estimate: '30min',
    framework: null,
  },

  // ════════════════════════════════════════════════════════════
  //  WEEK 5 — Phase B: Content Engine — Pipeline
  // ════════════════════════════════════════════════════════════

  // ── Monday (Day 29) ──
  'w5-mon-0': {
    why: 'Two weeks of content across three platforms generates enough data to identify real patterns — not flukes. This analysis reveals what topics Emi\'s audience cares about most, which platforms drive the most growth, and where effort is wasted. Data-driven decisions from this point forward replace guesswork and dramatically improve content ROI.',
    buildsToward: ['D2 Social Guidelines', 'D4 Substack', 'D5 Twitter/X'],
    unlocks: ['Evidence-based content strategy going forward', 'Topic selection backed by data, not intuition', 'Platform prioritization based on real performance'],
    steps: [
      'Pull full metrics from Substack (2 articles): open rates, click-through rates, subscriber growth, replies',
      'Pull full metrics from Twitter/X (3 threads + engagement): impressions, engagement rate, follower growth, reply quality',
      'Pull LinkedIn metrics: article views, post engagement, profile view increases',
      'Create a comparison table across platforms: effort invested vs. results achieved',
      'Identify the top 3 insights: best topic, best format, best platform for ROI',
      'Write a brief metrics report with actionable recommendations and save to decisions/',
    ],
    result: 'A comprehensive metrics report covering 2 weeks of content across all platforms. Top insights identified with clear recommendations for content direction. The report is saved and ready to inform all future content decisions.',
    resources: [
      { label: 'Substack analytics', type: 'link' },
      { label: 'Twitter/X analytics', type: 'link' },
      { label: 'LinkedIn analytics', type: 'link' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },
  'w5-mon-1': {
    why: 'The metrics report from this morning tells you exactly what Emi\'s audience wants more of. Substack #3\'s topic should be the first article driven entirely by data rather than intuition. Choosing a topic that aligns with proven audience interest dramatically increases the chance of higher opens, more shares, and subscriber growth.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Data-driven article with higher expected engagement', 'Validated data-to-content workflow', 'Content strategy evolution from intuition to evidence'],
    steps: [
      'Review the metrics report — which topics had the highest engagement and why?',
      'Choose a topic that doubles down on proven interest or explores a closely related angle',
      'Write the outline: hook, 3-5 sections, thesis, closing CTA',
      'Reference specific data points or audience feedback that validate this topic choice',
      'Note any research or examples needed for the draft',
    ],
    result: 'Substack #3 outline complete, explicitly informed by engagement data. The topic selection rationale is documented. Ready for drafting on Day 30.',
    resources: [
      { label: 'Metrics report (from this morning)', type: 'file' },
      { label: 'templates/substack/article.md', type: 'file' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w5-mon-2': {
    why: 'Consistent Twitter posting is the engine of discovery. Thread #4 continues the daily/every-other-day cadence that the algorithm rewards. Each posted thread also generates fresh engagement data that validates or adjusts the content strategy. Stopping now would waste the momentum built over Week 4.',
    buildsToward: ['D5 Twitter/X'],
    unlocks: ['Continued algorithm momentum', 'Fresh engagement data for ongoing optimization', 'Follower growth consistency'],
    steps: [
      'Select thread #4 from the content queue (written on Day 26)',
      'Final review against TOV — ensure the topic adds variety to the feed',
      'Post the thread to Twitter/X',
      'Engage with replies within the first 2 hours',
      'Log metrics in the content tracker',
    ],
    result: 'Twitter/X thread #4 posted. Engagement tracked and compared to previous threads. Content queue still has threads #5 and #6 ready.',
    resources: [
      { label: 'Content queue', type: 'file' },
    ],
    estimate: '20min',
    framework: null,
  },

  // ── Tuesday (Day 30) ──
  'w5-tue-0': {
    why: 'Substack #3 is the first fully data-driven article. Writing it validates that the metrics-to-content pipeline works — that you can go from engagement data to a published piece without losing Emi\'s voice or strategic intent. If this article outperforms the first two, it proves the system is working and improving.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Third article in the pipeline — weekly cadence is becoming habit', 'Validation that data-driven topic selection improves results', 'More material for cross-platform repurposing'],
    steps: [
      'Open the Substack #3 outline and TOV document',
      'Write the hook — reference or build on what made the audience engage in previous articles',
      'Draft each section, incorporating research and Emi\'s unique perspective on the topic',
      'Weave in a personal angle or story that connects Emi\'s expertise to the reader\'s life',
      'Write a closing that invites discussion — ask a specific question or challenge an assumption',
      'Self-edit ruthlessly against the TOV document',
    ],
    result: 'Substack #3 draft complete, data-driven in topic selection and crafted in Emi\'s voice. Self-edited and ready for review.',
    resources: [
      { label: 'Substack #3 outline', type: 'file' },
      { label: 'TOV document', type: 'file' },
    ],
    estimate: '2hrs',
    framework: null,
  },
  'w5-tue-1': {
    why: 'The best Twitter thread from the past two weeks has already proven it resonates. Repurposing it as a LinkedIn post reaches Emi\'s professional network with content that has been validated by a different audience. This is the cross-platform flywheel: create once on Twitter, refine based on engagement, expand for LinkedIn\'s longer-form, professional audience.',
    buildsToward: ['D2 Social Guidelines'],
    unlocks: ['LinkedIn engagement growth with minimal incremental effort', 'Cross-platform repurposing workflow validated', 'Emi\'s professional network activated with tested content'],
    steps: [
      'Identify the best-performing Twitter thread from the past two weeks (highest engagement rate)',
      'Analyze why it worked — topic, format, hook, timing?',
      'Expand the thread into a LinkedIn post format: add professional context, deepen the argument, lengthen slightly',
      'Adapt the tone for LinkedIn — slightly more formal while maintaining Emi\'s voice (reference TOV)',
      'Add a CTA that fits LinkedIn culture (invite discussion, tag relevant connections)',
      'Publish and log in the content tracker',
    ],
    result: 'LinkedIn post #2 published, adapted from the best-performing Twitter thread. The repurposing workflow is documented and repeatable.',
    resources: [
      { label: 'Twitter/X engagement data', type: 'file' },
      { label: 'templates/linkedin/post.md', type: 'file' },
      { label: 'TOV document', type: 'file' },
    ],
    estimate: '45min',
    framework: null,
  },

  // ── Wednesday (Day 31) ──
  'w5-wed-0': {
    why: 'This session marks the transition from building the content pipeline to systematizing it. Emi reviews the current pipeline health (3 Substacks, 6+ threads, LinkedIn posts) and discusses what can be automated or templated for Phase C. The goal is to identify which manual steps the EA can offload to agents or workflows, freeing time for higher-value strategic work.',
    buildsToward: ['D2 Social Guidelines', 'D7 Agents'],
    unlocks: ['Automation priority list for Phase C agent builds', 'Emi alignment on what should stay human vs. automated', 'Strategic shift from content creation to content systems'],
    steps: [
      'Prepare the content pipeline status: what has been published, what is queued, what is in draft',
      'Present the metrics trends: are engagement and subscriber growth improving week over week?',
      'Walk through the current manual workflow step by step — show where time goes',
      'Propose automation candidates: content scheduling, cross-platform repurposing, metrics collection, topic ideation',
      'Ask Emi which steps she wants to keep human-reviewed and which can be fully automated',
      'Save the automation plan with priorities ranked by time-savings impact',
    ],
    result: 'Automation plan documented with Emi\'s approval. Clear list of what to automate (Phase C), what stays manual, and priority order based on time savings. Content pipeline status reviewed and healthy.',
    resources: [
      { label: 'Content calendar', type: 'file' },
      { label: 'Metrics reports', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w5-wed-1': {
    why: 'Week 3 is the third consecutive Substack publication — this is where the habit becomes real for both Emi and her subscribers. Missing a week now would signal inconsistency. Publishing Substack #3 (the data-driven article) also tests whether the metrics-informed approach produces better results. The comparison against Substack #1 and #2 will be revealing.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Third consecutive weekly publication — cadence is locked in', 'Data to compare data-driven vs. intuition-driven article performance', 'Fresh content for LinkedIn repurposing'],
    steps: [
      'Incorporate any feedback from Tuesday\'s self-edit and this morning\'s review discussion',
      'Final proofread: grammar, flow, voice, formatting, links',
      'Write the email subject line and preview text — aim to beat previous open rates',
      'Publish the article on Substack',
      'Monitor email delivery for the first hour',
      'Log publication metrics and compare open rates to previous articles',
    ],
    result: 'Substack #3 published and delivered. Three consecutive weekly publications achieved. Early metrics are being tracked for comparison against previous articles.',
    resources: [
      { label: 'Substack #3 (draft)', type: 'file' },
      { label: 'Substack publisher dashboard', type: 'link' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w5-wed-2': {
    why: 'Threads #5 and #6 are the last two from the Friday batch. Posting both on the same day (as a double-post or staggered) depletes the queue intentionally — a new batch will be written as part of the Saturday workflow. Maintaining the posting cadence keeps algorithmic momentum alive and continues generating engagement data.',
    buildsToward: ['D5 Twitter/X'],
    unlocks: ['Content queue cleared — triggers weekend batch writing', 'Continued Twitter presence through mid-week', 'Fresh engagement data for content optimization'],
    steps: [
      'Select threads #5 and #6 from the content queue',
      'Final review both against TOV — ensure topic variety in the feed',
      'Post thread #5 in the morning for maximum reach',
      'Post thread #6 in the afternoon or evening to test timing differences',
      'Engage with replies on both threads',
      'Update the content tracker with metrics for both',
    ],
    result: 'Twitter/X threads #5 and #6 posted. Content queue is now empty, triggering the need for a new batch this weekend. All metrics logged.',
    resources: [
      { label: 'Content queue', type: 'file' },
    ],
    estimate: '30min',
    framework: null,
  },

  // ── Thursday (Day 32) ──
  'w5-thu-0': {
    why: 'A Standard Operating Procedure (SOP) for content creation transforms the workflow from "knowledge in the EA\'s head" to a documented, repeatable system. This is the prerequisite for automation — you cannot automate what you have not documented. The SOP also protects against context loss if the EA is unavailable and becomes the blueprint for the content agents built in Phase C.',
    buildsToward: ['D2 Social Guidelines', 'D7 Agents'],
    unlocks: ['Automation blueprint for Phase C agent development', 'Workflow resilience — anyone can follow the SOP', 'Clear identification of bottlenecks and automation opportunities'],
    steps: [
      'Map the full content creation workflow from ideation to publication for each platform',
      'Document each step with: action, time estimate, tools used, input needed, output produced',
      'Identify decision points — where does human judgment matter vs. where is it mechanical?',
      'Mark each step as: keep manual, partially automate, or fully automate',
      'Include quality checkpoints: TOV review, Emi approval, metrics review',
      'Save the SOP document with clear section headers for each platform workflow',
    ],
    result: 'A comprehensive SOP documenting the content creation workflow for Substack, Twitter/X, and LinkedIn. Every step includes time estimates, tools, and automation potential. The document is the foundation for Phase C agent builds.',
    resources: [
      { label: 'Social branded guidelines', type: 'file' },
      { label: 'Content calendar', type: 'file' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },
  'w5-thu-1': {
    why: 'With the SOP being documented today and the content calendar running ahead, this is the right moment to outline Substack #4 while the strategic thinking is fresh. The outline ensures Friday\'s Emi session can review both the SOP and the next article direction in one efficient meeting. Staying one article ahead keeps the pipeline flowing without stress.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Pipeline stays one article ahead of publication', 'Friday Emi review covers both SOP and next content', 'Writing can happen on any available day without deadline pressure'],
    steps: [
      'Review updated metrics and engagement trends — what is the audience responding to?',
      'Choose a topic for Substack #4 that continues the content arc (builds on #1-3 themes or explores new territory)',
      'Write the outline: hook, 3-5 sections, thesis, CTA',
      'Identify any unique angles or personal stories Emi can contribute',
      'Note research or data needs for the draft',
    ],
    result: 'Substack #4 outline complete. Topic chosen with strategic intent, building on the content arc of the first three articles. Ready for Emi review and subsequent drafting.',
    resources: [
      { label: 'Metrics reports', type: 'file' },
      { label: 'Previous Substack outlines', type: 'file' },
    ],
    estimate: '30min',
    framework: null,
  },

  // ── Friday (Day 33) ──
  'w5-fri-0': {
    why: 'This Emi session covers two milestone artifacts: the content creation SOP and the analytics overview. The SOP approval is critical because it defines what gets automated in Phase C — Emi needs to agree on which steps stay human and which become agents. The analytics review validates that the content strategy is working and builds Emi\'s confidence in the system.',
    buildsToward: ['D2 Social Guidelines', 'D7 Agents'],
    unlocks: ['SOP approved — Phase C automation can be planned', 'Analytics-informed strategy confirmed by Emi', 'Clear scope definition for content agents'],
    steps: [
      'Present the content creation SOP — walk through each platform workflow step by step',
      'Highlight the automation candidates and explain the time savings for each',
      'Ask Emi to approve the SOP or flag steps that must remain manual',
      'Present the analytics overview: 2-week trends, best performers, growth metrics',
      'Discuss whether the current strategy should continue, pivot, or expand',
      'Save session notes with SOP approval status and strategic decisions',
    ],
    result: 'Content creation SOP reviewed and approved by Emi (or feedback noted for revisions). Analytics reviewed with strategic direction confirmed. Phase C automation scope is defined.',
    resources: [
      { label: 'Content creation SOP', type: 'file' },
      { label: 'Metrics reports', type: 'file' },
    ],
    estimate: '1hr',
    framework: null,
  },
  'w5-fri-1': {
    why: 'The Substack pipeline must always stay one draft ahead of publication to prevent last-minute scrambling. Writing the Substack #4 draft on Friday means it can be polished over the weekend and published on schedule. This rhythm — outline mid-week, draft Friday, polish and publish weekend — is the cadence the SOP documents.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Pipeline stays ahead of publication schedule', 'Weekend polish time reduces stress', 'Validates the SOP workflow in real-time'],
    steps: [
      'Open the Substack #4 outline and TOV document',
      'Write the hook — aim for a fresh angle that builds on the growing publication identity',
      'Draft each section, bringing in research, Emi\'s perspective, and practical takeaways',
      'Include at least one element that encourages subscriber engagement (question, poll, challenge)',
      'Write a closing that reinforces the publication\'s value proposition',
      'Self-edit against the TOV document — check voice, clarity, and structure',
    ],
    result: 'Substack #4 draft complete, self-edited, and ready for weekend polish. The article continues the publication\'s quality trajectory and voice consistency.',
    resources: [
      { label: 'Substack #4 outline', type: 'file' },
      { label: 'TOV document', type: 'file' },
    ],
    estimate: '2hrs',
    framework: null,
  },

  // ── Saturday (Day 34) ──
  'w5-sat-0': {
    why: 'Four consecutive weekly publications marks the moment the Substack transitions from "experiment" to "established publication." Subscribers now expect content every week. Publishing #4 on schedule reinforces this trust. The article also provides a fourth data point for metrics analysis, making engagement trends statistically meaningful.',
    buildsToward: ['D4 Substack'],
    unlocks: ['Four-week publishing streak established', 'Statistically meaningful engagement data', 'Strong foundation for Phase C automation of the pipeline'],
    steps: [
      'Do a final polish pass on Substack #4 — tighten the prose, check formatting, verify links',
      'Write the email subject line and preview text — test variations if the platform allows',
      'Publish the article on Substack',
      'Monitor delivery and early engagement for the first hour',
      'Update the content calendar and metrics tracker',
      'Log the publication in updates.md — note the 4-week streak achievement',
    ],
    result: 'Substack #4 published. Four consecutive weekly publications achieved. The publication has established a reliable cadence and growing subscriber trust.',
    resources: [
      { label: 'Substack #4 (draft)', type: 'file' },
      { label: 'Substack publisher dashboard', type: 'link' },
    ],
    estimate: '30min',
    framework: null,
  },
  'w5-sat-1': {
    why: 'The content queue is empty after Wednesday\'s double-post. A weekly batch of 3 threads (#7-9) keeps the Twitter/X engine running through next week without daily writing pressure. By now, the batch writing process should feel efficient — templates are refined, topics are data-informed, and Emi\'s voice comes naturally. This batch also ensures Phase C starts with a content buffer.',
    buildsToward: ['D5 Twitter/X'],
    unlocks: ['Content buffer for next week and Phase C transition', 'Refined batch writing efficiency', 'Consistent Twitter presence while focus shifts to automation'],
    steps: [
      'Review the past 2 weeks of Twitter engagement data — identify strongest topics and formats',
      'Choose 3 topics that build on proven interest or test promising new angles',
      'Write thread #7 in the highest-performing format identified by data',
      'Write thread #8 with a fresh format or angle to keep the feed varied',
      'Write thread #9 targeting engagement (questions, hot takes, or practical advice)',
      'Self-edit all three against the TOV document and add to the content queue',
    ],
    result: 'Three new Twitter/X threads (#7-9) written, self-edited, and queued. The content buffer is replenished for next week. Batch writing efficiency has improved compared to the first batch.',
    resources: [
      { label: 'Twitter/X engagement data (2 weeks)', type: 'file' },
      { label: 'templates/twitter/thread.md', type: 'file' },
      { label: 'TOV document', type: 'file' },
    ],
    estimate: '1.5hrs',
    framework: null,
  },

  // ── Week 6 (Days 36-42) — Claude Code Setup ──
  'w6-mon-0': { why: 'The WAT framework enhances Claude\'s decision-making and task management.', steps: ['Review WAT framework', 'Install CLAUDE.md', 'Test behavior changes'], result: 'WAT CLAUDE.md framework installed and verified.', resources: [] },
  'w6-mon-1': { why: 'Web Design CLAUDE.md adds specialized design capabilities.', steps: ['Review the file', 'Install to workspace', 'Test with a design task'], result: 'Web Design CLAUDE.md installed.', resources: [] },
  'w6-mon-2': { why: 'Maintaining weekly Substack publishing cadence.', steps: ['Final edit', 'Publish', 'Monitor delivery'], result: 'Substack #4 published.', resources: [] },
  'w6-tue-0': { why: 'Skill Builder enables creation of custom skills as needs arise.', steps: ['Install SKILL.md', 'Install reference.md', 'Verify functionality'], result: 'Skill Builder installed and working.', resources: [] },
  'w6-tue-1': { why: 'Video to Website skill enables content repurposing from YouTube.', steps: ['Review SKILL.md', 'Install to workspace', 'Test with sample video'], result: 'Video to Website SKILL.md installed.', resources: [] },
  'w6-tue-2': { why: 'Consistent Twitter posting while building automation.', steps: ['Post weekly batch', 'Engage with audience', 'Track metrics'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w6-wed-0': { why: 'Emi alignment on automation priorities ensures effort goes to the right places.', steps: ['Present automation plan', 'Review content performance', 'Prioritize agents'], result: 'Automation priorities approved.', resources: [] },
  'w6-wed-1': { why: 'The content scheduler is the first custom workflow automating repetitive tasks.', steps: ['Design the workflow', 'Build scheduling logic', 'Test with sample content'], result: 'Content scheduler workflow operational.', resources: [] },
  'w6-wed-2': { why: 'Keeping the content pipeline active during automation work.', steps: ['Choose topic', 'Create outline', 'Plan research'], result: 'Substack #5 outline complete.', resources: [] },
  'w6-thu-0': { why: 'Morning briefing agent provides daily project awareness automatically.', steps: ['Design agent architecture', 'Write prompts', 'Test with live data'], result: 'Morning briefing agent v1 operational.', resources: [] },
  'w6-thu-1': { why: 'Testing ensures the agent output is genuinely useful, not just functional.', steps: ['Review multiple outputs', 'Check accuracy', 'Refine prompts'], result: 'Morning briefing output quality validated.', resources: [] },
  'w6-fri-0': { why: 'Emi review of automation and content ensures quality through the transition.', steps: ['Demo morning briefing', 'Review Substack #5', 'Capture feedback'], result: 'Both reviewed and approved or adjusted.', resources: [] },
  'w6-fri-1': { why: 'Maintaining weekly Substack content output.', steps: ['Write full draft', 'Apply TOV', 'Self-edit'], result: 'Substack #5 draft complete.', resources: [] },
  'w6-sat-0': { why: 'YouTube scout automates discovery of relevant content trends.', steps: ['Design monitoring logic', 'Connect to YouTube API', 'Test with target channels'], result: 'YouTube scout agent operational.', resources: [] },
  'w6-sat-1': { why: 'Maintaining Substack cadence.', steps: ['Final edit', 'Publish', 'Monitor'], result: 'Substack #5 published.', resources: [] },

  // ── Week 7 (Days 43-49) — Agent Building ──
  'w7-mon-0': { why: 'The overnight research agent automates paper scanning for fresh insights.', steps: ['Design research scope', 'Build scanning logic', 'Test with real sources'], result: 'Overnight research agent built and tested.', resources: [] },
  'w7-mon-1': { why: 'The content pipeline agent converts notes into draft content automatically.', steps: ['Define input format', 'Build draft generation', 'Test quality'], result: 'Content pipeline agent operational.', resources: [] },
  'w7-tue-0': { why: 'End-to-end testing catches edge cases before agents run in production.', steps: ['Run all agents', 'Test edge cases', 'Fix failures'], result: 'All agents passing end-to-end tests.', resources: [] },
  'w7-tue-1': { why: 'Keeping Substack pipeline active.', steps: ['Choose topic', 'Create outline', 'Plan research'], result: 'Substack #6 outline complete.', resources: [] },
  'w7-tue-2': { why: 'Maintaining Twitter presence.', steps: ['Post weekly batch', 'Engage', 'Track metrics'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w7-wed-0': { why: 'Emi approval of agent outputs ensures quality meets her standards.', steps: ['Present agent samples', 'Review quality', 'Capture feedback'], result: 'Agent outputs approved or adjustments noted.', resources: [] },
  'w7-wed-1': { why: 'Consistent Substack output.', steps: ['Write full draft', 'Apply TOV', 'Self-edit'], result: 'Substack #6 draft complete.', resources: [] },
  'w7-thu-0': { why: 'Refining prompts based on real feedback improves output quality.', steps: ['Review Emi feedback', 'Adjust prompts', 'Re-test outputs'], result: 'Agent prompts refined based on feedback.', resources: [] },
  'w7-thu-1': { why: 'Connecting briefing to daily workflow makes it actionable.', steps: ['Integrate with task system', 'Test daily trigger', 'Verify output routing'], result: 'Morning briefing connected to daily workflow.', resources: [] },
  'w7-fri-0': { why: 'Emi review of content and book chapter progress.', steps: ['Review content', 'Discuss book outline', 'Capture direction'], result: 'Content reviewed and book direction discussed.', resources: [] },
  'w7-fri-1': { why: 'Maintaining weekly publishing.', steps: ['Final edit', 'Publish', 'Monitor'], result: 'Substack #6 published.', resources: [] },
  'w7-sat-0': { why: 'Cross-platform repurposing leverages existing content for LinkedIn.', steps: ['Select highlight', 'Adapt for LinkedIn', 'Publish'], result: 'LinkedIn post #3 published.', resources: [] },
  'w7-sat-1': { why: 'Documentation ensures agents can be maintained and debugged.', steps: ['Document architecture', 'Write troubleshooting guide', 'Create runbook'], result: 'Agent architecture documented.', resources: [] },

  // ── Week 8 (Days 50-56) — Pipeline Integration ──
  'w8-mon-0': { why: 'Connecting agents to Substack workflow automates the content pipeline.', steps: ['Design integration points', 'Connect agent outputs', 'Test flow'], result: 'Agents connected to Substack workflow.', resources: [] },
  'w8-mon-1': { why: 'Connecting agents to Twitter automates thread generation.', steps: ['Design integration', 'Connect outputs', 'Test flow'], result: 'Agents connected to Twitter/X workflow.', resources: [] },
  'w8-tue-0': { why: 'LinkedIn automation completes the cross-platform agent network.', steps: ['Design automation rules', 'Build integration', 'Test'], result: 'LinkedIn automation setup complete.', resources: [] },
  'w8-tue-1': { why: 'Testing agent-assisted content creation.', steps: ['Use agents for outline', 'Write draft', 'Compare quality'], result: 'Substack #7 outline complete (agent-assisted).', resources: [] },
  'w8-tue-2': { why: 'Maintaining Twitter presence.', steps: ['Post weekly batch', 'Engage', 'Track'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w8-wed-0': { why: 'Emi approval of automated content ensures quality standards are maintained.', steps: ['Present automated samples', 'Review quality', 'Approve or adjust'], result: 'Automated content samples approved.', resources: [] },
  'w8-wed-1': { why: 'Full pipeline test validates the entire system works together.', steps: ['Run complete pipeline', 'Check each stage', 'Verify outputs'], result: 'Full pipeline test passed.', resources: [] },
  'w8-thu-0': { why: 'Fixing issues found in testing before going to production.', steps: ['Triage issues', 'Fix bugs', 'Re-test'], result: 'Pipeline issues resolved.', resources: [] },
  'w8-thu-1': { why: 'Continued content output through the pipeline.', steps: ['Write draft', 'Apply TOV', 'Edit'], result: 'Substack #7 draft complete.', resources: [] },
  'w8-fri-0': { why: 'Final agent review before transitioning to YouTube phase.', steps: ['Present final agent status', 'Review all workflows', 'Get approval'], result: 'Agent system approved for production use.', resources: [] },
  'w8-fri-1': { why: 'Weekly publishing continues.', steps: ['Final edit', 'Publish', 'Monitor'], result: 'Substack #7 published.', resources: [] },
  'w8-sat-0': { why: 'Scheduled tasks automate recurring operations.', steps: ['Configure triggers', 'Deploy schedules', 'Verify execution'], result: 'Trigger.dev scheduled tasks deployed.', resources: [] },
  'w8-sat-1': { why: 'A runbook ensures anyone can maintain the agent system.', steps: ['Document procedures', 'Write escalation paths', 'Create checklists'], result: 'Agent maintenance runbook complete.', resources: [] },

  // ── Week 9 (Days 57-63) — YouTube Channel Setup ──
  'w9-mon-0': { why: 'The YouTube channel is the video arm of the content system.', steps: ['Create channel', 'Apply brand guidelines', 'Configure settings'], result: 'YouTube channel created and branded.', resources: [] },
  'w9-mon-1': { why: 'Channel banner and profile create the first visual impression.', steps: ['Design banner', 'Create profile image', 'Upload and verify'], result: 'Channel banner and profile set up.', resources: [] },
  'w9-mon-2': { why: 'Maintaining Twitter presence.', steps: ['Post weekly batch', 'Engage', 'Track'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w9-tue-0': { why: 'Strategic topic selection ensures strong channel launch.', steps: ['Research trending topics', 'Align with Emi expertise', 'Select first 5'], result: 'First 5 video topics planned with Emi.', resources: [] },
  'w9-tue-1': { why: 'Templates speed up video production and ensure consistency.', steps: ['Design intro sequence', 'Design outro with CTA', 'Create templates'], result: 'YouTube intro/outro template created.', resources: [] },
  'w9-wed-0': { why: 'First on-camera recording is a major milestone.', steps: ['Set up recording space', 'Record with Emi', 'Review raw footage'], result: 'First on-camera video recorded.', resources: [] },
  'w9-wed-1': { why: 'Maintaining Substack pipeline.', steps: ['Choose topic', 'Create outline', 'Plan research'], result: 'Substack #8 outline complete.', resources: [] },
  'w9-thu-0': { why: 'Post-production gives the video a professional, branded feel.', steps: ['Edit cuts and pacing', 'Add branded overlays', 'Add captions'], result: 'First video edited with branded elements.', resources: [] },
  'w9-thu-1': { why: 'Continued Substack output.', steps: ['Write draft', 'Apply TOV', 'Edit'], result: 'Substack #8 draft complete.', resources: [] },
  'w9-fri-0': { why: 'Emi approval before the first public upload.', steps: ['Review video edit', 'Get approval', 'Note any changes'], result: 'First video approved for upload.', resources: [] },
  'w9-fri-1': { why: 'Weekly Substack publishing.', steps: ['Final edit', 'Publish', 'Monitor'], result: 'Substack #8 published.', resources: [] },
  'w9-sat-0': { why: 'First YouTube upload marks the channel launch.', steps: ['Upload video', 'Write description', 'Set thumbnail'], result: 'First YouTube video uploaded.', resources: [] },
  'w9-sat-1': { why: 'SEO optimization increases discoverability.', steps: ['Create description template', 'Research SEO tags', 'Apply to first video'], result: 'YouTube description template and SEO tags created.', resources: [] },

  // ── Week 10 (Days 64-70) — Multi-Format ──
  'w10-mon-0': { why: 'AI avatar expands video output without requiring Emi on camera every time.', steps: ['Research avatar tools', 'Set up account', 'Configure avatar'], result: 'AI avatar tool set up and configured.', resources: [] },
  'w10-mon-1': { why: 'Testing the avatar validates whether the output meets quality standards.', steps: ['Create test script', 'Generate avatar video', 'Review quality'], result: 'First AI avatar test video created.', resources: [] },
  'w10-mon-2': { why: 'Maintaining Twitter presence.', steps: ['Post weekly batch', 'Engage', 'Track'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w10-tue-0': { why: 'Refining the avatar ensures it represents Emi\'s brand properly.', steps: ['Adjust voice settings', 'Refine visual style', 'Re-test'], result: 'AI avatar refined and brand-aligned.', resources: [] },
  'w10-tue-1': { why: 'Screen capture is the third video format, ideal for technical explainers.', steps: ['Install OBS', 'Configure recording settings', 'Test recording'], result: 'OBS screen capture set up and tested.', resources: [] },
  'w10-wed-0': { why: 'Emi review of all video formats ensures quality across the board.', steps: ['Present avatar format', 'Present screen capture', 'Get feedback'], result: 'All video formats reviewed with Emi.', resources: [] },
  'w10-wed-1': { why: 'First screen capture explainer tests the format with real content.', steps: ['Write script', 'Record screen capture', 'Review output'], result: 'First screen capture video recorded.', resources: [] },
  'w10-thu-0': { why: 'Editing both formats tests the full production pipeline.', steps: ['Edit avatar video', 'Edit screen capture', 'Add branded elements'], result: 'Both videos edited and production-ready.', resources: [] },
  'w10-thu-1': { why: 'Maintaining Substack pipeline.', steps: ['Choose topic', 'Create outline', 'Plan'], result: 'Substack #9 outline complete.', resources: [] },
  'w10-fri-0': { why: 'Emi approval of all 3 video formats before scaling production.', steps: ['Present all 3 formats', 'Get approval', 'Note adjustments'], result: 'All 3 video formats approved.', resources: [] },
  'w10-fri-1': { why: 'Maintaining weekly Substack cadence.', steps: ['Write draft', 'Edit', 'Publish'], result: 'Substack #9 published.', resources: [] },
  'w10-sat-0': { why: 'Uploading multiple formats shows channel variety and commitment.', steps: ['Upload avatar video', 'Upload screen capture', 'Optimize metadata'], result: 'Two more YouTube videos uploaded.', resources: [] },
  'w10-sat-1': { why: 'Cross-platform announcement drives traffic to YouTube.', steps: ['Write announcement', 'Post to LinkedIn', 'Track engagement'], result: 'LinkedIn post #4 published announcing YouTube.', resources: [] },

  // ── Week 11 (Days 71-77) — Content Flywheel ──
  'w11-mon-0': { why: 'Planning ahead ensures consistent YouTube output.', steps: ['Map 4 weeks of content', 'Assign formats to dates', 'Identify topics'], result: 'YouTube content calendar created.', resources: [] },
  'w11-mon-1': { why: 'Batch recording is more efficient than one-at-a-time.', steps: ['Prepare scripts', 'Set up recording space', 'Record 2 videos'], result: '2 on-camera videos batch recorded.', resources: [] },
  'w11-mon-2': { why: 'Maintaining Twitter presence.', steps: ['Post weekly batch', 'Engage', 'Track'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w11-tue-0': { why: 'Post-production on batch maintains the content buffer.', steps: ['Edit both videos', 'Add branded elements', 'Schedule uploads'], result: 'Video batch edited and scheduled.', resources: [] },
  'w11-tue-1': { why: 'AI avatar content from latest research keeps the channel fresh.', steps: ['Select research topic', 'Write avatar script', 'Generate video'], result: 'AI avatar video created from latest research.', resources: [] },
  'w11-wed-0': { why: 'Regular Emi sessions keep content aligned and book progress on track.', steps: ['Review content metrics', 'Discuss book chapter', 'Adjust strategy'], result: 'Content and book progress reviewed.', resources: [] },
  'w11-wed-1': { why: 'Repurposing YouTube content for Twitter maximizes reach.', steps: ['Extract key points from video', 'Adapt for Twitter format', 'Post'], result: 'YouTube content repurposed for Twitter.', resources: [] },
  'w11-thu-0': { why: 'Maintaining Substack pipeline.', steps: ['Choose topic', 'Create outline', 'Plan'], result: 'Substack #10 outline complete.', resources: [] },
  'w11-thu-1': { why: 'Regular YouTube uploads build channel momentum.', steps: ['Upload video', 'Optimize metadata', 'Promote'], result: 'Next YouTube video uploaded.', resources: [] },
  'w11-fri-0': { why: 'Data-driven strategy adjustments improve performance.', steps: ['Review all platform metrics', 'Identify trends', 'Adjust strategy'], result: 'Strategy adjusted based on metrics.', resources: [] },
  'w11-fri-1': { why: 'Weekly Substack publishing.', steps: ['Write draft', 'Edit', 'Publish'], result: 'Substack #10 published.', resources: [] },
  'w11-sat-0': { why: 'Adding screen capture format variety to the channel.', steps: ['Write script', 'Record screen capture', 'Edit'], result: 'Screen capture explainer #2 recorded.', resources: [] },
  'w11-sat-1': { why: 'Cross-platform analytics reveal the full picture.', steps: ['Pull all platform data', 'Analyze holistically', 'Document findings'], result: 'Cross-platform analytics review complete.', resources: [] },

  // ── Week 12 (Days 78-84) — Optimization ──
  'w12-mon-0': { why: 'Deep metrics analysis reveals what is working and what to double down on.', steps: ['Compile all platform metrics', 'Analyze patterns', 'Create report'], result: 'Comprehensive metrics analysis complete.', resources: [] },
  'w12-mon-1': { why: 'YouTube thumbnail and SEO optimization increases click-through rates.', steps: ['Analyze thumbnail performance', 'Optimize SEO tags', 'A/B test thumbnails'], result: 'YouTube thumbnails and SEO optimized.', resources: [] },
  'w12-mon-2': { why: 'Maintaining Twitter presence.', steps: ['Post weekly batch', 'Engage', 'Track'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w12-tue-0': { why: 'Data-driven pipeline refinements improve output quality and efficiency.', steps: ['Review pipeline metrics', 'Identify bottlenecks', 'Optimize agents'], result: 'Content pipeline refined based on data.', resources: [] },
  'w12-tue-1': { why: 'Interactive prototypes showcase Emi\'s concepts in an engaging format.', steps: ['Design prototype concept', 'Build interactive elements', 'Test usability'], result: 'Interactive prototype #1 built.', resources: [] },
  'w12-wed-0': { why: 'Emi review of prototypes and book progress.', steps: ['Demo prototype', 'Discuss book chapters', 'Capture feedback'], result: 'Prototype reviewed and book progress discussed.', resources: [] },
  'w12-wed-1': { why: 'Maintaining Substack pipeline.', steps: ['Choose topic', 'Create outline', 'Plan'], result: 'Substack #11 outline complete.', resources: [] },
  'w12-thu-0': { why: 'Building multiple prototypes demonstrates versatility.', steps: ['Design prototypes #2-3', 'Build them', 'Test usability'], result: 'Prototypes #2-3 created.', resources: [] },
  'w12-thu-1': { why: 'Weekly Substack publishing.', steps: ['Write draft', 'Edit', 'Publish'], result: 'Substack #11 published.', resources: [] },
  'w12-fri-0': { why: 'Emi review ensures prototypes and content meet her standards.', steps: ['Present prototypes', 'Review content batch', 'Get approval'], result: 'Prototypes and content reviewed.', resources: [] },
  'w12-fri-1': { why: 'Regular YouTube uploads maintain channel growth.', steps: ['Upload 2 videos', 'Optimize metadata', 'Promote'], result: '2 YouTube videos uploaded.', resources: [] },
  'w12-sat-0': { why: 'Expanding the prototype library.', steps: ['Design prototypes #4-5', 'Build them', 'Test'], result: 'Prototypes #4-5 created.', resources: [] },
  'w12-sat-1': { why: 'LinkedIn presence maintains professional visibility.', steps: ['Write post about prototypes', 'Publish', 'Engage'], result: 'LinkedIn post #5 published.', resources: [] },

  // ── Week 13 (Days 85-91) — Growth ──
  'w13-mon-0': { why: 'Cross-promotion expands reach beyond organic growth.', steps: ['Identify 3 potential collaborators', 'Draft outreach messages', 'Send'], result: 'Guest outreach sent to 3 contacts.', resources: [] },
  'w13-mon-1': { why: 'University licensing is a potential revenue stream.', steps: ['Research licensing models', 'Build prospect list', 'Draft proposal'], result: 'University licensing research complete.', resources: [] },
  'w13-mon-2': { why: 'Maintaining Twitter presence.', steps: ['Post weekly batch', 'Engage', 'Track'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w13-tue-0': { why: 'Platform MVP scoping prepares for potential product evolution.', steps: ['Define MVP features', 'Scope technical requirements', 'Create document'], result: 'Platform MVP scoping document complete.', resources: [] },
  'w13-tue-1': { why: 'Building content buffer for consistent publishing.', steps: ['Batch create next week content', 'Review quality', 'Queue'], result: 'Content batch produced for next week.', resources: [] },
  'w13-wed-0': { why: 'Growth strategy alignment with Emi.', steps: ['Present growth data', 'Discuss university contacts', 'Plan next steps'], result: 'Growth strategy reviewed and aligned.', resources: [] },
  'w13-wed-1': { why: 'Maintaining Substack pipeline.', steps: ['Choose topic', 'Create outline', 'Plan'], result: 'Substack #12 outline complete.', resources: [] },
  'w13-thu-0': { why: 'Weekly Substack publishing.', steps: ['Write draft', 'Edit', 'Publish'], result: 'Substack #12 published.', resources: [] },
  'w13-thu-1': { why: 'Expanding the prototype portfolio.', steps: ['Design prototypes #6-7', 'Build them', 'Test'], result: 'Prototypes #6-7 created.', resources: [] },
  'w13-fri-0': { why: 'Emi review of prototypes and handoff planning.', steps: ['Present prototypes', 'Discuss handoff plan', 'Capture decisions'], result: 'Prototypes reviewed and handoff planned.', resources: [] },
  'w13-fri-1': { why: 'Regular YouTube uploads.', steps: ['Upload 2 videos', 'Optimize', 'Promote'], result: '2 YouTube videos uploaded.', resources: [] },
  'w13-sat-0': { why: 'Comprehensive documentation enables long-term maintenance.', steps: ['Document all systems', 'Write process guides', 'Create reference docs'], result: 'All systems and processes documented.', resources: [] },
  'w13-sat-1': { why: 'Milestone update keeps the audience engaged with the journey.', steps: ['Write milestone post', 'Publish to LinkedIn', 'Engage'], result: 'LinkedIn post #6 published.', resources: [] },

  // ── Week 14 (Days 92-98) — Handoff ──
  'w14-mon-0': { why: 'Final documentation ensures the system is self-sustaining.', steps: ['Document all agents', 'Document all workflows', 'Create master index'], result: 'Final system documentation complete.', resources: [] },
  'w14-mon-1': { why: 'Troubleshooting guide enables Emi to fix issues independently.', steps: ['Document common issues', 'Write fix procedures', 'Test guide accuracy'], result: 'Agent troubleshooting guide complete.', resources: [] },
  'w14-mon-2': { why: 'Final Twitter batch of the sprint.', steps: ['Post weekly batch', 'Engage', 'Track'], result: 'Twitter/X weekly batch posted.', resources: [] },
  'w14-tue-0': { why: 'Solo maintenance test validates that Emi can run the system alone.', steps: ['Simulate one week of operations', 'Track issues', 'Note gaps'], result: 'Solo maintenance test run complete.', resources: [] },
  'w14-tue-1': { why: 'The final Substack article caps the sprint content.', steps: ['Choose reflective topic', 'Write draft', 'Edit'], result: 'Substack #13 draft complete.', resources: [] },
  'w14-wed-0': { why: 'Emi review of the test run identifies any remaining gaps.', steps: ['Review test results', 'Fix issues found', 'Verify fixes'], result: 'Test run issues resolved.', resources: [] },
  'w14-wed-1': { why: 'Final Substack publication.', steps: ['Final edit', 'Publish', 'Monitor'], result: 'Substack #13 published.', resources: [] },
  'w14-thu-0': { why: 'Fixing remaining issues ensures a clean handoff.', steps: ['Review issue list', 'Implement fixes', 'Re-test'], result: 'All maintenance test issues fixed.', resources: [] },
  'w14-thu-1': { why: 'Final YouTube uploads complete the video library.', steps: ['Upload final videos', 'Optimize metadata', 'Verify'], result: 'Final YouTube videos uploaded.', resources: [] },
  'w14-fri-0': { why: 'Final review and celebration of the 98-day journey.', steps: ['Present final metrics', 'Review full system', 'Celebrate achievements'], result: 'Final review complete. Sprint celebrated.', resources: [] },
  'w14-fri-1': { why: 'Final metrics report documents the sprint\'s achievements.', steps: ['Compile all metrics', 'Create summary report', 'Compare to goals'], result: 'Final metrics report compiled.', resources: [] },
  'w14-sat-0': { why: 'Credential transfer ensures Emi has full control of all systems.', steps: ['Transfer all credentials', 'Verify access for each system', 'Update documentation'], result: 'All credentials and access transferred.', resources: [] },
  'w14-sat-1': { why: 'A 30-day maintenance calendar ensures the system stays healthy post-sprint.', steps: ['Plan 30 days of maintenance tasks', 'Schedule reminders', 'Create calendar'], result: '30-day post-sprint maintenance calendar created.', resources: [] },
};


// === SPRINT DAY CONTEXT ===
// Provides theme, summary, and estimates for each day

export const SPRINT_DAY_CONTEXT = {

  // ── Week 1: D8 Configuration ──
  1:  { theme: 'Build the Foundation',       summary: 'Set up the workspace folder structure, create session-continuity files, and save the sprint brief.',   taskCount: 3, totalEstimate: '~1h' },
  2:  { theme: 'Load the Arsenal',           summary: 'Download Jack Skool prompts, write the project CLAUDE.md identity file, and install YouTube Transcript MCP.',  taskCount: 3, totalEstimate: '~3.5h' },
  3:  { theme: 'Install the Skills',         summary: 'Download Nate Skool assets and install Frontend Design + Skill Builder skills.',  taskCount: 3, totalEstimate: '~1.5h' },
  4:  { theme: 'Templates + Multi-Model',    summary: 'Install Nano Banana 2, create brand_config.json structure, and build platform template shells.',  taskCount: 3, totalEstimate: '~2h' },
  5:  { theme: 'Connect + Verify',           summary: 'Connect Firecrawl and Perplexity MCPs, install Skill Creator 2.0, add brand rules to CLAUDE.md, and run the final D8 verification.',  taskCount: 4, totalEstimate: '~2.5h' },
  6:  { theme: 'Gather the Raw Material',    summary: 'Collect Emi lecture transcripts, download segmentation prompts, and study the Andrew Lane mood board method.',  taskCount: 3, totalEstimate: '~2.5h' },
  7:  { theme: 'Light Sunday',               summary: 'Run segmentation on the first transcript and read Emi\'s top papers.',  taskCount: 0, totalEstimate: '~1-2h' },

  // ── Week 2: D1 Brand Identity + D7 Seedlings ──
  8:  { theme: 'Segment the Voice',          summary: 'Run the Segmentation Prompt on two transcripts and optimize Emi\'s LinkedIn profile.',  taskCount: 3, totalEstimate: '~3.5h' },
  9:  { theme: 'Build the Voice Rules',      summary: 'Compile the TOV document, test voice with a sample post, and generate the first mood board.',  taskCount: 3, totalEstimate: '~3h' },
  10: { theme: 'First Emi Review',           summary: 'Review TOV + mood board with Emi, extract colors, build Morning Briefing Agent v1, and run eval with 3 variations.',  taskCount: 4, totalEstimate: '~4.5h' },
  11: { theme: 'Refine + Scout',             summary: 'Generate mood board v2, select font pairing, build YouTube Scout Agent v1, and run eval with 3 channel sets.',  taskCount: 4, totalEstimate: '~5h' },
  12: { theme: 'Brand Approval Day',         summary: 'Get Emi\'s final brand direction approval, create brand guidelines, and populate brand_config.json.',  taskCount: 3, totalEstimate: '~3h' },
  13: { theme: 'Test + Guard',               summary: 'Apply Anti-Generic Guardrails and test content across 3 platforms for Emi\'s approval.',  taskCount: 2, totalEstimate: '~2.5h' },
  14: { theme: 'Brand Milestone',            summary: 'Milestone: Brand Guidelines Finalized. Rest and review the first two weeks.',  taskCount: 0, totalEstimate: '0' },

  // ── Week 3-5: Phase B Content Engine ──
  15: { theme: 'Website Branding',           summary: 'Apply brand guidelines to the website and test responsive layouts.',  taskCount: 3, totalEstimate: '~3-4h' },
  16: { theme: 'Substack Setup',             summary: 'Add newsletter signup to website and configure Substack.',  taskCount: 3, totalEstimate: '~2-3h' },
  17: { theme: 'Emi Review + Drafting',      summary: 'Review website and Substack with Emi, begin first article.',  taskCount: 3, totalEstimate: '~2-3h' },
  18: { theme: 'Write + Launch Twitter',     summary: 'Write first Substack draft and set up Twitter/X profile.',  taskCount: 2, totalEstimate: '~3-4h' },
  19: { theme: 'Review + Deploy',            summary: 'Emi reviews Substack + Twitter, create content templates, deploy website v2.',  taskCount: 3, totalEstimate: '~3h' },
  20: { theme: 'Batch Content Day',          summary: 'Write first 3 Twitter threads and finalize Substack #1.',  taskCount: 2, totalEstimate: '~3-4h' },
  21: { theme: 'Website Milestone',          summary: 'Milestone: Website v1 Live.',  taskCount: 0, totalEstimate: '0' },
  22: { theme: 'Launch Day',                 summary: 'Publish Substack #1, post first Twitter thread, optimize LinkedIn.',  taskCount: 3, totalEstimate: '~3h' },
  23: { theme: 'Cross-Platform Push',        summary: 'LinkedIn article from Substack, draft social guidelines, post thread #2.',  taskCount: 3, totalEstimate: '~3-4h' },
  24: { theme: 'Review + Plan',              summary: 'Review first week of content with Emi, draft Substack #2 outline.',  taskCount: 3, totalEstimate: '~2-3h' },
  25: { theme: 'Write + Calendar',           summary: 'Write Substack #2 draft and create content calendar.',  taskCount: 2, totalEstimate: '~3-4h' },
  26: { theme: 'Review + Batch',             summary: 'Emi reviews Substack #2 and calendar, batch Twitter threads.',  taskCount: 2, totalEstimate: '~3h' },
  27: { theme: 'Finalize + Publish',         summary: 'Finalize social guidelines and publish Substack #2.',  taskCount: 2, totalEstimate: '~2-3h' },
  28: { theme: 'Analytics Sunday',           summary: 'Review analytics and engagement metrics.',  taskCount: 0, totalEstimate: '~1-2h' },
  29: { theme: 'Data-Driven Content',        summary: 'Analyze 2 weeks of metrics, draft Substack #3, post thread #4.',  taskCount: 3, totalEstimate: '~3h' },
  30: { theme: 'Write + Repurpose',          summary: 'Write Substack #3 and repurpose best thread for LinkedIn.',  taskCount: 2, totalEstimate: '~3h' },
  31: { theme: 'Automation Planning',        summary: 'Plan automation with Emi, publish Substack #3, post threads.',  taskCount: 3, totalEstimate: '~2-3h' },
  32: { theme: 'SOP + Batch',               summary: 'Document content creation workflow and batch write threads.',  taskCount: 2, totalEstimate: '~3h' },
  33: { theme: 'Practice Video Day',         summary: 'Record practice on-camera video with Emi, draft Substack #4.',  taskCount: 2, totalEstimate: '~2-3h' },
  34: { theme: 'Write + Plan YouTube',       summary: 'Write Substack #4 draft and plan YouTube channel structure.',  taskCount: 2, totalEstimate: '~3-4h' },
  35: { theme: 'Content Milestone',          summary: 'Milestone: First Substack + Twitter Active.',  taskCount: 0, totalEstimate: '0' },

  // ── Week 6-8: Phase C Automation ──
  36: { theme: 'Framework Install',          summary: 'Install WAT and Web Design frameworks, publish Substack #4.',  taskCount: 3, totalEstimate: '~2-3h' },
  37: { theme: 'Skill Installation',         summary: 'Install Skill Builder and Video to Website skills, post Twitter batch.',  taskCount: 3, totalEstimate: '~2h' },
  38: { theme: 'First Workflow',             summary: 'Review automation plan with Emi, create content scheduler workflow.',  taskCount: 3, totalEstimate: '~3-4h' },
  39: { theme: 'Morning Briefing',           summary: 'Build and test morning briefing agent.',  taskCount: 2, totalEstimate: '~3-4h' },
  40: { theme: 'Review + Write',             summary: 'Emi reviews morning briefing, write Substack #5.',  taskCount: 2, totalEstimate: '~2-3h' },
  41: { theme: 'YouTube Scout',              summary: 'Build YouTube scout agent, publish Substack #5.',  taskCount: 2, totalEstimate: '~3-4h' },
  42: { theme: 'Agent Review Sunday',        summary: 'Review agent outputs and iterate prompts.',  taskCount: 0, totalEstimate: '~1-2h' },
  43: { theme: 'Agent Building Day',         summary: 'Build overnight research agent and content pipeline agent.',  taskCount: 2, totalEstimate: '~4-5h' },
  44: { theme: 'Testing + Content',          summary: 'Test all agents end-to-end, draft Substack #6, post Twitter batch.',  taskCount: 3, totalEstimate: '~3-4h' },
  45: { theme: 'Agent Approval',             summary: 'Emi approves agent outputs, write Substack #6.',  taskCount: 2, totalEstimate: '~2-3h' },
  46: { theme: 'Refinement',                 summary: 'Refine agent prompts, connect briefing to workflow.',  taskCount: 2, totalEstimate: '~3h' },
  47: { theme: 'Content + Book',             summary: 'Emi reviews content and book chapter outline, publish Substack #6.',  taskCount: 2, totalEstimate: '~2h' },
  48: { theme: 'LinkedIn + Docs',            summary: 'LinkedIn post and agent architecture documentation.',  taskCount: 2, totalEstimate: '~3h' },
  49: { theme: 'Agent Review Sunday',        summary: 'Review agent logs and plan pipeline integration.',  taskCount: 0, totalEstimate: '~1-2h' },
  50: { theme: 'Pipeline Wiring',            summary: 'Connect agents to Substack and Twitter workflows.',  taskCount: 2, totalEstimate: '~4h' },
  51: { theme: 'LinkedIn Auto + Content',    summary: 'LinkedIn automation, agent-assisted Substack #7, Twitter batch.',  taskCount: 3, totalEstimate: '~3-4h' },
  52: { theme: 'Full Pipeline Test',         summary: 'Emi approves automated content, run full pipeline test.',  taskCount: 2, totalEstimate: '~3h' },
  53: { theme: 'Fix + Write',               summary: 'Fix pipeline issues, write Substack #7.',  taskCount: 2, totalEstimate: '~3h' },
  54: { theme: 'Final Agent Review',         summary: 'Final agent review before YouTube phase, publish Substack #7.',  taskCount: 2, totalEstimate: '~2h' },
  55: { theme: 'Deploy + Document',          summary: 'Deploy scheduled tasks and create maintenance runbook.',  taskCount: 2, totalEstimate: '~3h' },
  56: { theme: 'Agents Milestone',           summary: 'Milestone: Agents Operational.',  taskCount: 0, totalEstimate: '0' },

  // ── Week 9-14: Phase D YouTube + Scale ──
  57: { theme: 'YouTube Channel Birth',      summary: 'Create and brand the YouTube channel, post Twitter batch.',  taskCount: 3, totalEstimate: '~3h' },
  58: { theme: 'Video Planning',             summary: 'Plan first 5 video topics and create intro/outro template.',  taskCount: 2, totalEstimate: '~3-4h' },
  59: { theme: 'First Recording',            summary: 'Record first on-camera video with Emi, draft Substack #8.',  taskCount: 2, totalEstimate: '~3h' },
  60: { theme: 'Video Editing',              summary: 'Edit first video with branded overlays, write Substack #8.',  taskCount: 2, totalEstimate: '~4-5h' },
  61: { theme: 'Video Approval',             summary: 'Emi reviews and approves first video, publish Substack #8.',  taskCount: 2, totalEstimate: '~2h' },
  62: { theme: 'First Upload',               summary: 'Upload first YouTube video and create SEO templates.',  taskCount: 2, totalEstimate: '~2h' },
  63: { theme: 'YouTube Analytics',          summary: 'Monitor first video analytics and engagement.',  taskCount: 0, totalEstimate: '~1h' },
  64: { theme: 'AI Avatar Setup',            summary: 'Set up AI avatar tool and create first test video.',  taskCount: 3, totalEstimate: '~3-4h' },
  65: { theme: 'Multi-Format Prep',          summary: 'Refine avatar and set up OBS screen capture.',  taskCount: 2, totalEstimate: '~3h' },
  66: { theme: 'Format Review',              summary: 'Emi reviews all video formats, record screen capture.',  taskCount: 2, totalEstimate: '~3h' },
  67: { theme: 'Edit Both Formats',          summary: 'Edit avatar and screen capture videos, outline Substack #9.',  taskCount: 2, totalEstimate: '~4h' },
  68: { theme: 'Format Approval',            summary: 'Emi approves all 3 video formats, publish Substack #9.',  taskCount: 2, totalEstimate: '~2-3h' },
  69: { theme: 'Multi-Upload Day',           summary: 'Upload 2 YouTube videos, LinkedIn announcement.',  taskCount: 2, totalEstimate: '~2h' },
  70: { theme: 'YouTube Milestone',          summary: 'Milestone: YouTube Channel Live.',  taskCount: 0, totalEstimate: '0' },
  71: { theme: 'Flywheel Start',             summary: 'YouTube content calendar, batch record 2 videos, Twitter batch.',  taskCount: 3, totalEstimate: '~4-5h' },
  72: { theme: 'Edit + Create',              summary: 'Edit video batch and create avatar video from research.',  taskCount: 2, totalEstimate: '~4h' },
  73: { theme: 'Review + Repurpose',         summary: 'Emi content review, cross-platform repurposing.',  taskCount: 2, totalEstimate: '~2-3h' },
  74: { theme: 'Write + Upload',             summary: 'Substack #10 outline and YouTube upload.',  taskCount: 2, totalEstimate: '~2-3h' },
  75: { theme: 'Strategy Adjust',            summary: 'Review metrics with Emi, publish Substack #10.',  taskCount: 2, totalEstimate: '~2-3h' },
  76: { theme: 'Record + Analyze',           summary: 'Screen capture #2 and cross-platform analytics.',  taskCount: 2, totalEstimate: '~3h' },
  77: { theme: 'Optimization Sunday',        summary: 'Review week and plan optimization.',  taskCount: 0, totalEstimate: '~1-2h' },
  78: { theme: 'Deep Analytics',             summary: 'Analyze all platform metrics, optimize YouTube, Twitter batch.',  taskCount: 3, totalEstimate: '~3-4h' },
  79: { theme: 'Pipeline + Prototypes',      summary: 'Refine content pipeline, build first interactive prototype.',  taskCount: 2, totalEstimate: '~4-5h' },
  80: { theme: 'Prototype Review',           summary: 'Emi reviews prototype and book progress, Substack #11.',  taskCount: 2, totalEstimate: '~2-3h' },
  81: { theme: 'Build + Publish',            summary: 'Create prototypes #2-3, publish Substack #11.',  taskCount: 2, totalEstimate: '~4h' },
  82: { theme: 'Review + Upload',            summary: 'Emi reviews prototypes, upload 2 YouTube videos.',  taskCount: 2, totalEstimate: '~2-3h' },
  83: { theme: 'Prototype Sprint',           summary: 'Create prototypes #4-5, LinkedIn milestone preview.',  taskCount: 2, totalEstimate: '~4h' },
  84: { theme: 'Pipeline Milestone',         summary: 'Milestone: Full Content Pipeline Running.',  taskCount: 0, totalEstimate: '0' },
  85: { theme: 'Growth Push',                summary: 'Guest outreach, university research, Twitter batch.',  taskCount: 3, totalEstimate: '~3-4h' },
  86: { theme: 'MVP + Batch',               summary: 'Platform MVP scoping, batch content production.',  taskCount: 2, totalEstimate: '~4h' },
  87: { theme: 'Growth Strategy',            summary: 'Growth strategy with Emi, Substack #12 outline.',  taskCount: 2, totalEstimate: '~2h' },
  88: { theme: 'Publish + Build',            summary: 'Publish Substack #12, create prototypes #6-7.',  taskCount: 2, totalEstimate: '~4h' },
  89: { theme: 'Review + Upload',            summary: 'Emi reviews prototypes, upload 2 YouTube videos.',  taskCount: 2, totalEstimate: '~2-3h' },
  90: { theme: 'Documentation Day',          summary: 'Document all systems and processes, LinkedIn update.',  taskCount: 2, totalEstimate: '~4h' },
  91: { theme: 'Handoff Prep Sunday',        summary: 'Prepare handoff documentation.',  taskCount: 0, totalEstimate: '~2h' },
  92: { theme: 'Final Documentation',        summary: 'System documentation, troubleshooting guide, Twitter batch.',  taskCount: 3, totalEstimate: '~4-5h' },
  93: { theme: 'Solo Test',                  summary: 'Simulate Emi-only maintenance week, draft final Substack.',  taskCount: 2, totalEstimate: '~4h' },
  94: { theme: 'Test Review',               summary: 'Review test run with Emi, publish Substack #13.',  taskCount: 2, totalEstimate: '~2-3h' },
  95: { theme: 'Final Fixes',               summary: 'Fix remaining issues, upload final YouTube videos.',  taskCount: 2, totalEstimate: '~3h' },
  96: { theme: 'Celebration Day',            summary: 'Final review with Emi, compile metrics report.',  taskCount: 2, totalEstimate: '~2h' },
  97: { theme: 'Handoff Day',               summary: 'Transfer all credentials and create post-sprint calendar.',  taskCount: 2, totalEstimate: '~3h' },
  98: { theme: 'System Handoff Complete',    summary: 'Milestone: System Handoff Complete. The 24/7 content system is live.',  taskCount: 0, totalEstimate: '0' },
};


// === SPRINT ASSISTANT MESSAGES ===
// Contextual, honest, encouraging messages per day

export const SPRINT_ASSISTANT_MESSAGES = {

  // ── Week 1 ──
  1: "Day 1. Everything starts with structure. The folders you create today will hold every skill, every agent, every piece of content for the next 98 days. It's not glamorous work, but without it you'll be searching for files in Week 6 instead of building agents. Get this right and you won't think about it again.",

  2: "Day 2. Today you load the weapons. The Jack Skool prompts are your content arsenal — 28+ tools refined by practitioners, not theorists. And CLAUDE.md is the single most important file you'll write this sprint. Every conversation with Claude starts with this file. Take your time on it. A sharp CLAUDE.md saves you hundreds of hours downstream.",

  3: "Day 3. Skills day. You're installing the capabilities that make Claude genuinely useful rather than generically helpful. Frontend Design for when you build the website. Skill Builder for when you need capabilities that don't exist yet. Think of today as stocking a workshop — every tool you hang on the wall today is one you won't scramble to find later.",

  4: "Day 4. Multi-model orchestration and templates. Nano Banana gives you a second brain (Gemini) for when you need creative variety or quality checks. The brand_config.json structure is your future self thanking your present self — every empty field is a decision you know you need to make. Platform templates mean you'll never stare at a blank page in Phase B.",

  5: "Day 5. This is your first milestone. Firecrawl and Perplexity are the last two tools, and then D8 Configuration is complete. The verification at the end matters — run every MCP, check every file, confirm every skill. If something is broken, you want to know now. Walk out of today knowing the foundation is solid.",

  6: "Day 6. Shift from technical setup to human material. Emi's voice lives in her lectures — the rhythm, the tangents, the metaphors she reaches for when explaining something she cares about. Written work is polished. Spoken work is real. That's what you need. The Andrew Lane video is 17 minutes that will save you hours of mood board trial and error next week.",

  7: "Day 7. Light day, but don't waste it. Running segmentation on the first transcript while it's quiet gives you a head start on Monday. When you sit down on Day 8, you'll already know what the output looks like and can move faster on transcript #2. Read Emi's papers to deepen your understanding of her intellectual world.",

  // ── Week 2 ──
  8: "Day 8. Brand week begins. Two segmentation runs today — the first gives you data, the second gives you patterns. What shows up in both transcripts is core Emi. What shows up in only one is contextual. This distinction is the foundation of an authentic voice profile, not a generic one. The LinkedIn optimization is a quick win that makes Emi immediately more discoverable.",

  9: "Day 9. The TOV document is where analysis becomes action. Do's and Don'ts are rules Claude can follow and you can verify against. The sample post test is non-negotiable — if the voice rules don't produce content that sounds like Emi, fix the rules now. The mood board is visual exploration; don't expect perfection, expect a direction to react to.",

  10: "Day 10. First Emi session. This is where the real brand emerges. Your job is to present clearly and listen carefully. Her gut reactions to the mood board matter more than her analytical feedback. 'I don't like this but I can't say why' is gold — dig into it. The Morning Briefing Agent is your first taste of building something that runs on its own.",

  11: "Day 11. Iteration day. Mood board v2 should feel noticeably closer to Emi's vision. Font pairing is deceptively important — wrong fonts make right colors look wrong. The YouTube Scout Agent is your second seedling, and it uses two MCPs together. If you can build this, you can build the complex agents in Phase C.",

  12: "Day 12. Brand approval gate. Everything you've built this week leads to this session. If Emi approves, you walk out with a complete brand foundation. If she requests changes, that's fine — you have Day 13 to address them. Either way, the brand guidelines document you write today becomes the reference that governs every piece of content for the rest of the sprint.",

  13: "Day 13. Almost there. Anti-Generic Guardrails protect you from the biggest AI trap — looking professional but forgettable. The content test across 3 platforms is the final proof. If a tweet, a LinkedIn post, and a Substack paragraph all sound like Emi, the system works. Tomorrow is the Brand Guidelines milestone.",

  14: "Day 14. Milestone day. Brand Guidelines Finalized. Two weeks down, 84 to go. Take a moment to appreciate what you've built: a complete workspace, an authentic voice profile, a visual identity Emi approved, two working agents, and a content system ready to produce. Phase B starts Monday. You're building on a real foundation now.",
};

// ── Generate messages for days 15-98 ── 7 per phase = weekly rotation ──
const phaseMessages = {
  B: [
    "Monday: fresh content week begins. Review your analytics from last week \u2014 what resonated? What fell flat? Let data drive today\u2019s content choices, not assumptions. Every post you publish this week compounds on what came before.",
    "Writing day. The Substack article is your deepest content \u2014 the one piece that proves Emi isn\u2019t just posting sound bites but has real depth. Take your time on the draft. A strong article feeds Twitter threads, LinkedIn posts, and newsletter content for the whole week.",
    "Emi session day. Come prepared with data: impressions, engagement, subscriber growth. Her gut reaction to the content matters, but so does what the audience is actually responding to. Adjust the plan based on both.",
    "Cross-platform repurposing day. That Substack draft? Pull out 3 tweetable insights, 1 LinkedIn angle, and the newsletter hook. Writing once and adapting many times is how a content engine outpaces a content calendar.",
    "Publishing day. Ship the Substack, post the threads, update the calendar. Perfectionism kills consistency, and consistency is what builds an audience. A good article published beats a perfect article in drafts.",
    "Batch content day. Writing multiple Twitter threads or LinkedIn posts in one sitting is faster and more cohesive than doing one at a time. Get into flow, produce the week\u2019s social content, and schedule it. Then you\u2019re free to think ahead.",
    "Reflection day. Review what shipped this week. Update the content calendar. Are you building toward the subscriber and follower targets? If growth is slower than expected, the fix is almost always: post more, engage more, or adjust the topics.",
  ],
  C: [
    "Monday: automation week begins. Look at your content creation workflow from Phase B \u2014 what took the most time? What was repetitive? Those are your automation targets. Build the agent that eliminates the biggest bottleneck first.",
    "Agent building day. Write the prompt, define the inputs, test with real data. V1 won\u2019t be perfect and that\u2019s fine. The eval workflow you learned in Week 1 is your safety net \u2014 test it, score it, iterate. Ship working, not perfect.",
    "Emi session day. Demo the agents in action. Her trust in the automation depends on seeing it work with her content, her voice, her standards. If an agent produces something that doesn\u2019t sound like her, the prompt needs work.",
    "Integration day. Individual agents are tools. Connected agents are a system. Wire today\u2019s agent into the content pipeline \u2014 does it feed the next step correctly? Does the output format match the input the next agent expects?",
    "Testing day. Run the full pipeline end-to-end with real content. Where does it break? Where does quality drop? Fix the weakest link. A pipeline is only as good as its worst agent.",
    "Refinement day. Take the test results and improve. Tighten prompts, add guardrails, handle edge cases. The difference between a demo agent and a production agent is how it handles the unexpected.",
    "Documentation day. Write down what each agent does, what it needs, and how to fix it when it breaks. Future you \u2014 or Emi running this independently \u2014 needs to understand the system without you explaining it live.",
  ],
  D: [
    "Monday: YouTube + Scale week begins. Video is the highest-leverage content format \u2014 it builds trust faster than text, reaches new audiences through recommendations, and repurposes into every other format. Today\u2019s planning sets the pace for the week.",
    "Production day. Whether it\u2019s on-camera, avatar, or screen capture \u2014 the script matters more than the production value. Emi\u2019s ideas and voice are the product. The format is just the delivery vehicle. Focus on the script, then record.",
    "Emi session day. Review the latest content across all platforms. By now the system should be mostly running \u2014 your role is shifting from operator to quality controller. Flag anything that doesn\u2019t meet the bar, approve what does.",
    "Cross-platform day. Every YouTube video is also 5 Twitter posts, a LinkedIn article, a Substack teaser, and an email. The content flywheel should be spinning fast now \u2014 if it\u2019s not, check what\u2019s manual that should be automated.",
    "Growth check day. How are the numbers tracking? Subscribers, followers, views, engagement. If you\u2019re behind target, double down on what\u2019s working. If ahead, experiment with new formats. Data drives decisions now, not intuition.",
    "System maintenance day. Check every agent, every pipeline, every scheduled post. Things break silently. A scout that stopped working 3 days ago means 3 days of missed intelligence. Keep the machine running.",
    "Strategic review day. Zoom out. Are we building toward the 24/7 content system? What\u2019s still manual that should be automated? What content is underperforming? Adjust the plan for next week based on this week\u2019s evidence.",
  ],
};

// Fill days 15-98 with phase-appropriate messages (7-day rotation)
for (let day = 15; day <= 98; day++) {
  if (!SPRINT_ASSISTANT_MESSAGES[day]) {
    let phase;
    if (day <= 35) phase = 'B';
    else if (day <= 49) phase = 'C';
    else phase = 'D';
    const msgs = phaseMessages[phase];
    // Map day-of-week within the phase to the 7 messages (Mon=0, Tue=1, ..., Sun=6)
    const dayOfWeek = (day - 1) % 7;
    SPRINT_ASSISTANT_MESSAGES[day] = msgs[dayOfWeek % msgs.length];
  }
}
