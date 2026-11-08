import { describe, it, expect } from "vitest";
import { hasActiveAccess, computeBadges, ALL_LESSONS } from "./course";

describe("access", () => {
  it("no payment means no access", () => expect(hasActiveAccess(null)).toBe(false));
  it("expired quarter means no access", () =>
    expect(hasActiveAccess("2026-01-01T00:00:00Z", new Date("2026-05-01"))).toBe(false));
  it("active quarter grants access", () =>
    expect(hasActiveAccess("2026-06-01T00:00:00Z", new Date("2026-05-01"))).toBe(true));
  it("an invalid expiry never grants access", () =>
    expect(hasActiveAccess("not-a-date", new Date("2026-05-01"))).toBe(false));
  it("access expires at the exact paid-until instant", () =>
    expect(hasActiveAccess("2026-06-01T00:00:00Z", new Date("2026-06-01T00:00:00Z"))).toBe(false));
});

describe("badges", () => {
  it("awards the Module 3 generative director badge after its lessons", () => {
    const moduleThree = new Set(ALL_LESSONS.filter((lesson) => lesson.moduleId === "m3").map((lesson) => lesson.id));
    const badge = computeBadges(moduleThree).find((item) => item.id === "director");
    expect(badge?.earned).toBe(true);
  });

  it("completing everything earns Productor IA", () => {
    const b = computeBadges(new Set(ALL_LESSONS.map((l) => l.id)));
    expect(b.find((x) => x.id === "pro")!.earned).toBe(true);
  });
});
