

# Orbee — Campus Social App Landing Page Hero

## Overview
A premium, minimal hero section for "Orbee," a Gen-Z campus social app. The design centers on soft pastel gradients, elegant typography, and smooth staggered animations that feel calm and polished.

---

## Hero Layout (Top to Bottom)

### 1. Navigation Bar
- Simple top bar with "Orbee" logo/wordmark on the left
- Minimal nav links or just the logo for a clean look

### 2. Headline & Subtext (Centered)
- **Headline:** "Meet your campus orbit." — large, modern serif font (Google Font like Playfair Display or DM Serif Display), split across two balanced lines
- **Subtext:** "Discover students around you based on shared interests." — clean sans-serif, muted color
- Generous vertical spacing for breathing room

### 3. CTA Button
- **"Enter the Orbit"** — full pill-shaped button, dark background, white text
- Hover: subtle scale-up + soft shadow lift
- Centered below the subtext

### 4. Visual Section — Phone Mockup + Profile Cards
- A centered phone frame/mockup showing a sample user profile UI inside
- **5–6 floating profile cards** arranged around/behind the phone:
  - Each card: square with rounded corners, realistic student photo (from UI Faces / Unsplash), name, and an interest tag (e.g., 🎸 Music, 🏀 Basketball, 📸 Photography)
  - Outer cards slightly blurred for depth-of-field effect
  - Center-most card slightly larger
- Soft drop shadow under the phone mockup

---

## Animations (Framer Motion)
- **Headline & subtext:** Gentle fade-in + slide-up on load
- **CTA button:** Fade-in after text with slight delay
- **Profile cards:** Staggered entrance — each card fades in from 40px below, scales from 0.95→1, with 0.2s stagger delay and 0.6s duration per card. Smooth easing.
- **Post-reveal idle:** Subtle floating animation on profile cards (gentle up/down bob)

---

## Styling & Polish
- **Background:** Soft pastel gradient — light pink → lavender → white
- **Typography:** Modern serif for headline, clean sans-serif for body/UI
- **Color palette:** Pastels, dark text for contrast, muted secondary text
- Fully responsive — cards reflow/resize on mobile, phone mockup scales down
- No heavy effects, no loud gradients, no aggressive motion — everything stays elegant

---

## Dependencies
- **Framer Motion** will be added for smooth, premium animations
- Tailwind CSS for all styling
- Placeholder student images via public URLs

