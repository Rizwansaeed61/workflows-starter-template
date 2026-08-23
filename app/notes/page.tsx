import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-extrabold font-serif text-[#00a896]">Supabase Notes Live Data</h1>
          <p className="text-sm text-slate-400 mt-1">Queried directly from Supabase PostgreSQL database using Server Components.</p>
        </div>

        <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">Raw JSON Output:</h2>
          <pre className="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
            {JSON.stringify(notes, null, 2)}
          </pre>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Rendered List:</h2>
          <div className="grid gap-3">
            {notes && notes.length > 0 ? (
              notes.map((note: any) => (
                <div key={note.id} className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">{note.title}</span>
                  <span className="text-[10px] font-mono font-bold bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded">ID #{note.id}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No notes found or loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
