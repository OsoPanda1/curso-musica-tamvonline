import { describe, expect, it } from "vitest";
import { COURSE, ALL_LESSONS, findLesson } from "./course-content.server";
import { enrichLesson } from "./course-enrichment.server";

describe("course lesson teaching content", () => {
  it("has lesson metadata for all nine modules and 22 lessons", () => {
    expect(COURSE).toHaveLength(9);
    expect(ALL_LESSONS).toHaveLength(22);
  });

  it("provides examples and practical exercises for every lesson", () => {
    for (const lesson of ALL_LESSONS) {
      const enriched = enrichLesson(lesson);
      expect(enriched.blocks.length, lesson.id).toBeGreaterThan(lesson.blocks.length);
      expect(enriched.blocks.some((block) => block.type === "practice"), lesson.id).toBe(true);
      expect(
        enriched.blocks.some((block) => block.type === "code" || block.type === "table" || block.type === "p"),
        lesson.id,
      ).toBe(true);
    }
  });

  it("does not change lesson identity when enrichment is applied", () => {
    for (const lesson of ALL_LESSONS) {
      expect(enrichLesson(lesson).id).toBe(lesson.id);
      expect(findLesson(lesson.id)?.title).toBe(lesson.title);
    }
  });
});
