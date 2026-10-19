import { describe, it, expect } from "vitest";
import { COURSE as CLIENT_COURSE, ALL_LESSONS as CLIENT_LESSONS } from "./course";
import { COURSE as SERVER_COURSE, ALL_LESSONS as SERVER_LESSONS } from "./course-content.server";

describe("course content boundary", () => {
  it("keeps lesson bodies out of the client catalogue", () => {
    expect(CLIENT_LESSONS.length).toBeGreaterThan(0);
    expect(CLIENT_COURSE.every((module) => module.lessons.every((lesson) => lesson.blocks.length === 0))).toBe(true);
    expect(CLIENT_LESSONS.every((lesson) => lesson.blocks.length === 0)).toBe(true);
  });

  it("retains the lesson bodies in the server-only catalogue", () => {
    expect(SERVER_LESSONS.length).toBe(CLIENT_LESSONS.length);
    expect(SERVER_COURSE.every((module) => module.lessons.every((lesson) => lesson.blocks.length > 0))).toBe(true);
  });
});
