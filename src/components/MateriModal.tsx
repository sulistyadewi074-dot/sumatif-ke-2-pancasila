import React, { useState } from 'react';
import { MATERI_PANCASILA, MateriSection } from '../data/materiPancasila';
import { downloadMateriPembelajaranPDF } from '../utils/pdfGenerator';
import {
  X,
  BookOpen,
  Download,
  Compass,
  Star,
  HeartHandshake,
  TreePine,
  Users,
  Wheat,
  Megaphone,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  School,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface MateriModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam?: () => void;
}

export const MateriModal: React.FC<MateriModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    MATERI_PANCASILA.sections[0].id
  );

  if (!isOpen) return null;

  const activeSection =
    MATERI_PANCASILA.sections.find((s) => s.id === activeSectionId) ||
    MATERI_PANCASILA.sections[0];

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-blue-600" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-500 fill-amber-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      case 'TreePine':
        return <TreePine className="w-5 h-5 text-emerald-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-indigo-600" />;
      case 'Wheat':
        return <Wheat className="w-5 h-5 text-yellow-600" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-blue-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-purple-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Modal */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                  Modul Pembelajaran Siswa
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {MATERI_PANCASILA.targetKelas} • {MATERI_PANCASILA.schoolName}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight mt-0.5">
                {MATERI_PANCASILA.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadMateriPembelajaranPDF()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
              title="Unduh Modul Ringkasan Materi dalam bentuk PDF"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Unduh PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Sidebar Nav + Konten Utama */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Sisi Kiri: Menu Navigasi Sub-Bab */}
          <div className="md:col-span-4 lg:col-span-4 border-r border-slate-200 bg-slate-50/50 p-3 sm:p-4 overflow-y-auto space-y-1.5">
            <div className="px-2 py-1 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Daftar Bab &amp; Topik Materi
              </span>
            </div>

            {MATERI_PANCASILA.sections.map((sec, idx) => {
              const isActive = sec.id === activeSectionId;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'hover:bg-slate-100 text-slate-700 bg-white border border-slate-200/80'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100'
                    }`}
                  >
                    {getSectionIcon(sec.iconName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isActive ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {sec.title}
                    </p>
                    <p
                      className={`text-[11px] line-clamp-1 mt-0.5 ${
                        isActive ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {sec.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sisi Kanan: Konten Utama Sub-Bab Terpilih */}
          <div className="md:col-span-8 lg:col-span-8 p-5 sm:p-7 overflow-y-auto space-y-6 bg-white">
            {/* Header Sub-Bab */}
            <div className="pb-4 border-b border-slate-100">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Materi Pokok Pendidikan Pancasila</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {activeSection.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {activeSection.subtitle}
              </p>
            </div>

            {/* Paragraf Penjelasan */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {activeSection.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Poin-Poin Kunci (Key Takeaways) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Poin Penting Pengamalan:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {activeSection.keyPoints.map((pt, ptIdx) => (
                  <li key={ptIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips Aksi Nyata & Ajakan Teman */}
            {activeSection.actionTips && activeSection.actionTips.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-blue-700" />
                  Tips Aksi Nyata &amp; Cara Mengajak Teman:
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-blue-950">
                  {activeSection.actionTips.map((tip, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-2.5 bg-white/80 rounded-xl border border-blue-100 flex items-start gap-2"
                    >
                      <span className="text-blue-600 font-bold shrink-0">👉</span>
                      <span className="font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Modal: Tombol Aksi */}
        <div className="px-5 py-3.5 sm:px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/80 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Siap untuk menguji pemahaman? Tekan tombol untuk mulai ujian online.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Tutup Materi
            </button>
            {onStartExam && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartExam();
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Mulai Tes Sumatif</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
