import { useCallback, useEffect, useState } from 'react';
import { Edit3, FolderOpen, Plus, RefreshCw } from 'lucide-react';
import { supabase } from '../../services/supabase.js';
import EntrepreneurLayout from '../shared/EntrepreneurLayout.jsx';

const localKey = (userId) => `foundy-projects-${userId || 'guest'}`;

const getOwnerId = (user) => user?.id_usuario ?? user?.id ?? user?.dui ?? user?.usuario;

function readLocalProjects(userId) {
  try {
    return JSON.parse(localStorage.getItem(localKey(userId)) || '[]');
  } catch {
    return [];
  }
}

function MisProyectos({ usuarioData, onCerrarSesion, onBackHome, onOpenCreateProject, onOpenStatistics, onOpenChat, onOpenSettings, onOpenFoundyCard, onEditProject }) {
  const ownerId = getOwnerId(usuarioData);
  const userName = usuarioData?.usuario || 'Entrepreneur';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  const loadProjects = useCallback(async () => {
    setLoading(true);
    const localProjects = readLocalProjects(ownerId);
    try {
      const { data, error } = await supabase.from('proyecto').select('*');
      if (error) throw error;
      const rows = (data || []).filter((project) => {
        const projectOwner = project.id_usuario ?? project.usuario_id ?? project.creador_id ?? project.usuario;
        return !projectOwner || String(projectOwner) === String(ownerId) || String(projectOwner) === String(userName);
      });
      const merged = [...rows];
      localProjects.forEach((localProject) => {
        if (!merged.some((project) => String(project.id_proyecto || project.id) === String(localProject.id_proyecto || localProject.id))) merged.push(localProject);
      });
      setProjects(merged);
    } catch {
      setProjects(localProjects);
      setNotice('No se pudo conectar con la base de datos. Mostrando tus proyectos guardados en este dispositivo.');
    } finally {
      setLoading(false);
    }
  }, [ownerId, userName]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadProjects(); }, 0);
    const refresh = () => loadProjects();
    window.addEventListener('foundy-project-published', refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('foundy-project-published', refresh);
    };
  }, [loadProjects]);

  return (
    <EntrepreneurLayout active="projects" user={userName} onBackHome={onBackHome} onOpenCreateProject={onOpenCreateProject} onOpenStatistics={onOpenStatistics} onOpenChat={onOpenChat} onOpenSettings={onOpenSettings} onOpenFoundyCard={onOpenFoundyCard} onCerrarSesion={onCerrarSesion} onNotice={setNotice}>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b7471]">Workspace</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#294448]">My projects</h1>
            <p className="mt-2 text-sm text-[#6a8181]">Manage, update and track every idea you have created.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={loadProjects} className="grid h-10 w-10 place-items-center rounded-xl border border-[#d7e4df] bg-white text-[#587073] hover:bg-[#e8f2ee]" aria-label="Refresh projects"><RefreshCw size={17} /></button>
            <button type="button" onClick={onOpenCreateProject} className="flex items-center gap-2 rounded-xl bg-[#0b7471] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#095f5d]"><Plus size={16} /> New project</button>
          </div>
        </div>

        {notice && <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="status">{notice}</div>}
        {loading ? <div className="mt-8 rounded-2xl border border-dashed border-[#cbdcd7] bg-white p-12 text-center text-sm text-[#6a8181]">Loading your projects...</div> : projects.length === 0 ? <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-[#cbdcd7] bg-white p-12 text-center"><FolderOpen size={34} className="text-[#74aaa1]" /><h2 className="mt-4 text-lg font-bold text-[#294448]">No projects yet</h2><p className="mt-2 text-sm text-[#6a8181]">Create your first project and it will appear here.</p><button type="button" onClick={onOpenCreateProject} className="mt-5 rounded-xl bg-[#0b7471] px-4 py-2.5 text-xs font-bold text-white">Create project</button></div> : <div className="mt-8 grid gap-4 md:grid-cols-2">{projects.map((project) => <article key={project.id_proyecto || project.id || project.nombre} className="rounded-2xl border border-[#d7e4df] bg-white p-5 shadow-[0_8px_24px_rgba(25,77,72,0.06)]"><div className="flex items-start justify-between gap-4"><div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${project.estado === 'publicado' ? 'bg-[#dff2e9] text-[#247858]' : 'bg-[#f1eee4] text-[#8a6a2e]'}`}>{project.estado || 'borrador'}</span><h2 className="mt-3 text-lg font-bold text-[#294448]">{project.nombre}</h2></div><button type="button" onClick={() => onEditProject(project)} className="grid h-9 w-9 place-items-center rounded-lg text-[#0b7471] hover:bg-[#e8f2ee]" aria-label={`Edit ${project.nombre}`}><Edit3 size={17} /></button></div><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6a8181]">{project.descripcion}</p><div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#e7efec] pt-4 text-xs"><span className="text-[#78908e]">Goal<strong className="mt-1 block text-sm text-[#294448]">${Number(project.monto_objetivo || 0).toLocaleString('en-US')}</strong></span><span className="text-[#78908e]">Timeline<strong className="mt-1 block text-sm text-[#294448]">{project.fecha_inicio || 'Not set'}{project.fecha_fin ? ` - ${project.fecha_fin}` : ''}</strong></span></div></article>)}</div>}
      </main>
    </EntrepreneurLayout>
  );
}

export default MisProyectos;
