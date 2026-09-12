---
name: LifeQuest Master Interface
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  metric-stat-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: 0.02em
  metric-stat-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0.01em
  metric-stat-sm:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-ui:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-performance productivity workspace masked as a contemporary RPG HUD. The visual tone bridges the ruthless clarity of modern software engineering tools (e.g., Linear, Raycast) with the tactile, aspirational progression dynamics of premium cinematic gaming interfaces (e.g., *Destiny*, *Persona 5 Royal*, *Final Fantasy XVI*). 

The emotional objective is to evoke deep focus, dignified agency, and measurable personal mastery. The interface purposefully avoids juvenile gamification tropes (bouncy cartoon shapes, loud arcade confetti, skeuomorphic parchment) while steering clear of overwhelming military telemetry and neon-drenched cyberpunk noise. Every element adheres to an absolute **Anti-Mess Discipline**: every screen features exactly one dominant visual anchor and one unambiguous primary Call to Action (CTA).

Key aesthetic tenets:
- **Obsidian Architectural Precision**: Deep, light-absorbing dark canvases balanced with laser-sharp border definitions.
- **Cinematic Atmosphere**: Soft luminous chromatic glows and surface-level micro-gradients applied strictly to communicate state, level advancement, and focus hierarchy.
- **Dignified Terminology**: Native RPG vernacular (Quest, Character, XP, Gold, Level, Streak, Boss, Achievement, Skill, Chapter) treated with executive-level typography and crisp data display.

## Colors

The color system is calibrated for deep focus sessions, high contrast, and visual stratification across multi-tiered surfaces.

### Semantic Mapping & Palette Architecture
- **Base Canvas & Void**: Deep obsidian charcoal (`#0a0e17`) serves as the root viewport background, with `#0f131c` applied to page headers and fixed canvas panels.
- **Tonal Tier Containers**:
  - `surface-base`: `#131722` (Foundational layout panels, navigation sidebars)
  - `surface-elevated`: `#181c26` (Cards, task blocks, list nodes)
  - `surface-overlay`: `#1e2330` (Modals, interactive popovers, active selection states)
  - `border-subtle`: `#282e3d` (Structural borders, dividers, subtle outlines)
- **Primary / Mastery (Electric Violet)**: `#8b5cf6` handles primary navigation focus, level tier indicators, and primary action buttons. Interactive hover advances to `#7c3aed`, paired with an ambient aura `rgba(139, 92, 246, 0.2)`.
- **Secondary / Vitality & Intel (Luminous Cyan)**: `#06b6d4` (hover `#38bdf8`) handles active state indicators, focus sprint timers, mana/energy reserves, and real-time metric updates.
- **Currency & Mastery Milestones (Burnished Gold)**: `#f59e0b` (accent `#fbbf24`) represents accrued Gold balances, legendary gear tiers, and completed milestone ribbons.
- **Progression & Success (Radiant Emerald)**: `#10b981` denotes completed quests, streak retention, and positive stat delta multipliers.
- **Critical / Threat (Coral Red)**: `#ef4444` denotes impending Boss attacks, deadline expiries, missed daily streaks, and destructive actions.
- **Inactive / Muted (Slate Slate)**: `#64748b` for secondary labels, `#475569` for disabled states and locked requirements.

## Typography

The typographic hierarchy enforces a precise 75/25 split:
1. **Primary Interface Font (75%)**: **Plus Jakarta Sans** is the exclusive typeface for brand headlines, quest narratives, instructions, body text, form controls, and dialogs. It provides contemporary humanist warmth with clean geometric discipline.
2. **Numeric & RPG Metric Font (25%)**: **Space Grotesk** is deployed across numerical telemetry: XP quantities, player levels, currency counts, boss HP ratios, streak counters, and uppercase HUD metadata tags (`label-caps`). Its sharp, mechanical geometry supplies a tactile gaming HUD presence without sacrificing legibility.

Rules for implementation:
- Numeric labels and XP counters must strictly use `metric-stat-*` tokens with tabular figure alignments (`font-variant-numeric: tabular-nums`).
- Quest titles use `headline-sm` or `headline-md`, never exceeding 2 lines of vertical space before truncation.
- HUD micro-labels and category trackers strictly utilize `label-caps` in uppercase format.

## Layout & Spacing

The interface uses a 12-column adaptive fluid grid engineered for responsive desktop dashboards down to mobile companion views.

### Layout Model
- **Desktop (1200px and up)**: 12 columns, 24px (`1.5rem`) gutters, 32px (`2rem`) outer canvas margins. Features a persistent 260px collapsible command rail on the left, an expansive central canvas containing the single anchor card and task streams, and an optional 340px right HUD inspector panel for active character stats and inventory.
- **Tablet (768px - 1199px)**: 8 columns, 16px (`1rem`) gutters, 24px margins. Navigation condenses to an icon-rail (72px), while right HUD inspector docks into collapsible overlay drawers.
- **Mobile (< 768px)**: 4 columns, 12px gutters, 16px (`1rem`) margins. Single-column linear flow prioritizing the Hero Anchor Card and active quest queue. HUD stats condense to a persistent sticky glass micro-bar.

### Spacing Cadence
- `space-xs` (4px): Internal chip padding, inline status icon margins.
- `space-sm` (8px): Form input inner padding, compact badge gaps, quest list items.
- `space-md` (16px): Card internal padding, primary button padding, list item stacks.
- `space-lg` (24px): Card grouping margins, section content offsets.
- `space-xl` (40px): Major section boundaries, separation between Decision Hero and Quest Stream.

## Elevation & Depth

Visual hierarchy uses a tonal containment model combined with low-scatter luminous edge definition. Traditional muddy drop shadows are prohibited in favor of layered dark obsidian tones illuminated by chromatic aura backlights.

### Surface Elevation Levels
- **Tier 0 (Viewport Background)**: Solid `#0a0e17`. Deepest depth layer, host to very faint background SVG grid structures (1px stroke at 3% opacity).
- **Tier 1 (Structural Canvas Panels)**: Background `#131722`, border 1px solid `#282e3d`. No shadow.
- **Tier 2 (Cards & Active Elements)**: Background `#181c26`, border 1px solid `#282e3d`, ambient shadow `0 4px 20px -2px rgba(0, 0, 0, 0.5)`.
- **Tier 3 (Floating Overlays, Modals, Menus)**: Background `#1e2330`, border 1px solid rgba(139, 92, 246, 0.3), shadow `0 12px 36px -4px rgba(0, 0, 0, 0.8)`.

### Luminous Chromatic Glows
For critical game states, borders shift from static slate borders to dynamic energy gradients:
- **Legendary / Hero Focus**: Top border or outer glow using `linear-gradient(90deg, #8b5cf6, #06b6d4)` paired with `box-shadow: 0 0 24px rgba(139, 92, 246, 0.15)`.
- **Active Combat / Boss Pressure**: Subtle pulsed rim light `0 0 16px rgba(239, 68, 68, 0.2)` on targeted card outlines.
- **Glassmorphic Hud Plates**: Backdrop blur of `12px` paired with `rgba(19, 23, 34, 0.85)` surface fill for fixed headers and floating metric strips.

## Shapes

The design system standardizes on tight, modern geometric curvature. Surfaces feel structured, architectural, and durable.

- **Base Radius (8px / `0.5rem`)**: Applied to all primary and secondary buttons, input fields, dropdown menus, and standard card components.
- **Large Radius (16px / `1rem`)**: Reserved exclusively for top-level structural containers, the Decision Engine Hero Card, and modal dialog bodies.
- **Pill (Full Radius / `9999px`)**: Used strictly for XP/Mana progress bar tracks, status pill badges, streak chips, and character avatar frames.
- **Clipped Edges (Special Accent)**: Optional 45-degree 6px micro-chamfer on the top-right corner of tier badges and boss cards, adding a tasteful sci-fi/tactical RPG accent without degrading cross-browser rendering reliability.

## Components

### Buttons
- **Primary Action (Radiant Violet)**: Built with a gradient background `linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)`, solid white text (`#ffffff`), 8px border radius, font `Plus Jakarta Sans 14px Weight 600`. Hover delivers an ambient violet glow (`0 0 16px rgba(139, 92, 246, 0.4)`). Active state applies a 0.98 scale transform.
- **Secondary Action (Subtle Container)**: `#181c26` surface with a 1px border of `#282e3d`. Text is slate-light (`#e2e8f0`). On hover, border shifts to `#8b5cf6` and text brightens to `#ffffff`.
- **Ghost / Tertiary**: Transparent surface, slate-muted text (`#94a3b8`). On hover, background shifts to `rgba(255, 255, 255, 0.04)` with slate-light text.
- **Strategic Cooldown State**: Disabled button state showing a striped diagonal background pattern, 50% opacity, accompanied by an animated numeric countdown indicator in `Space Grotesk` (e.g., `04:12 Cooldown`).

### Decision Engine Hero Card (Dominant Anchor)
The central element of the active workspace. Constrained to one per view:
- **Surface**: Background `#181c26` enclosed by a 1px gradient stroke (`#8b5cf6` down to `#282e3d`).
- **Structure**:
  - *Context Tag*: `label-caps` in cyan (`#06b6d4`) defining current Chapter / Epic Boss objective.
  - *WHAT*: High-impact `headline-lg` title articulating the immediate priority task.
  - *WHY*: `body-md` in muted slate (`#94a3b8`) detailing tactical rationale.
  - *REWARDS BAR*: Embedded horizontal chip array showing precise yield: `+250 XP`, `+50 Gold`, `Skill: Deep Focus`.
  - *Action*: Massive Primary CTA on the right or full-width base ("Execute Quest").

### Quest Card System
Quests conform to strict state styling:
- **Recommended**: Border highlighted with cyan edge; displays "Next Best Action" micro-tag.
- **In Progress**: Active glowing left accent bar (3px, `#8b5cf6`), real-time session duration meter running in `Space Grotesk`.
- **Available**: Standard Tier 2 surface with subtle borders (`#282e3d`).
- **Locked**: Surface opacity reduced to 60%, subtle padlock icon, explicit prerequisite chips displayed (e.g., `Requires: Level 12 Strategy`).
- **Completed**: Dark obsidian wash, emerald strike indicator, XP badge transformed into static emerald tag.
- **Failed / Expired**: Desaturated with coral red edge strike (`#ef4444`).

### RPG Progression Meters
- **XP / Track Meters**: Height 6px or 8px. Track container uses `#0f131c` with inset shadow. Fill bar utilizes vibrant gradient (`#8b5cf6` to `#06b6d4`). Filled portion ends with a 2px bright white tip.
- **Boss HP Bars**: Height 12px. Track `#181c26`. Fill bar coral red (`#ef4444`). Features animated lag bar behind damage deltas to communicate health loss tactility.
- **Dual-Metric Streak / Habit Chips**: Compact capsule component displaying flame/lightning glyph, current consecutive day count in `Space Grotesk 700`, and a mini segmented circular ring representing today's completion status.

### Form Inputs & Text Areas
- Background `#131722`, border 1px solid `#282e3d`, border radius 8px, text `#f8fafc`. Placeholder text `#475569`.
- Focus state: Border transitions to `#8b5cf6` with a soft ring (`box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2)`).