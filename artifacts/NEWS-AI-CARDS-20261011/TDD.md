# Implementation

Use pure shared selectors for locale news text and report/ticker commentary. Prefer cleaned summary/highlights then raw commentary. Render all provider text escaped, preserve paragraph breaks, strip engine highlight marker syntax. Cards are independent of article date filtering and clearly label themselves current published analysis. No extra network calls, dependencies or schema changes.
