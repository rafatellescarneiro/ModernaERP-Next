/**
 * ==========================================================
 * Header da aplicação
 * ==========================================================
 */

export function Header(){
  return(
    <header className = "flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-lg font-semibold text-slate-800">
        Dashboard
      </h2>

      <div className="text-sm text-slate-500">
        Moderna ERP v0.1
      </div>
    </header>
  );
}
