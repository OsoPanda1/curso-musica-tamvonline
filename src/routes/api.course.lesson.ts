import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { findLesson, FREE_LESSON_ID } from "@/lib/course-content.server";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, no-store, max-age=0",
      vary: "authorization",
    },
  });
}

export const Route = createFileRoute("/api/course/lesson")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const lessonId = new URL(request.url).searchParams.get("lessonId") ?? "";
        const lesson = findLesson(lessonId);
        if (!lesson) return json({ error: "Lección no encontrada." }, 404);

        const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
        if (!token) return json({ error: "Inicia sesión para acceder a la lección." }, 401);

        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!url || !key) return json({ error: "El servicio de cursos no está configurado." }, 503);

        try {
          const client = createClient(url, key, {
            global: { headers: { authorization: `Bearer ${token}` } },
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { data: authData, error: authError } = await client.auth.getUser(token);
          if (authError || !authData.user) return json({ error: "La sesión no es válida." }, 401);

          if (lesson.id !== FREE_LESSON_ID) {
            const { data: enrollment, error: enrollmentError } = await client
              .from("enrollments")
              .select("paid_until")
              .eq("user_id", authData.user.id)
              .maybeSingle();
            if (enrollmentError) {
              console.error("[course] Enrollment lookup failed", enrollmentError.code);
              return json({ error: "No se pudo verificar la inscripción." }, 503);
            }
            if (!enrollment?.paid_until || new Date(enrollment.paid_until).getTime() <= Date.now()) {
              return json({ error: "Esta lección requiere una inscripción activa." }, 403);
            }
          }

          return json({ lesson });
        } catch (error) {
          console.error("[course] Lesson delivery failed", error instanceof Error ? error.message : "unknown error");
          return json({ error: "No se pudo cargar la lección." }, 500);
        }
      },
    },
  },
});
