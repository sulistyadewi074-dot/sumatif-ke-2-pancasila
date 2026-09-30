import { jsPDF } from 'jspdf';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';

/**
 * Format tanggal dalam bahasa Indonesia
 */
export function formatIndonesianDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * 1. Download Lembar Hasil Tes Siswa (Tanda Tangan Guru & Orang Tua/Wali)
 */
export function downloadStudentResultPDF(result: ExamResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // --- KOP SURAT SEKOLAH ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(14);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 3;

  // Garis Pembatas Kop
  doc.setLineWidth(0.8);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.8, pageWidth - 15, y + 0.8);
  y += 8;

  // --- JUDUL DOKUMEN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('LEMBAR LAPORAN HASIL TES SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tahun Ajaran 2025/2026`, pageWidth / 2, y, { align: 'center' });
  y += 9;

  // --- DATA IDENTITAS SISWA ---
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 36, 2, 2, 'FD');

  doc.setFontSize(10);
  const leftX = 20;
  const col2X = 58;
  const rightX = 115;
  const col4X = 150;

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nama Peserta', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.nama}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Mata Pelajaran', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATA_PELAJARAN}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nomor Absen', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.noAbsen}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Materi / Pokok', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATERI}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Kelas', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: Kelas ${result.kelas || CONFIG.KELAS} SD`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Standar KKTP', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.KKTP} (Skala 0–100)`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Waktu Tes', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.timestamp}`, col2X, y);

  y += 12;

  // --- TABEL PEROLEHAN HASIL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('A. Hasil Perolehan Nilai Tes', 15, y);
  y += 5;

  // Header Tabel
  doc.setFillColor(30, 58, 138); // Dark Navy Blue
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Komponen Penilaian', 20, y + 5.5);
  doc.text('Jumlah / Nilai', pageWidth - 45, y + 5.5, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  y += 8;

  // Baris-baris tabel
  const totalQuestionsCount = (result.benar || 0) + (result.salah || 0) > 0 ? (result.benar || 0) + (result.salah || 0) : 35;
  const tableRows = [
    { label: 'Jumlah Soal Keseluruhan', value: `${totalQuestionsCount} Butir Soal` },
    { label: 'Jumlah Jawaban Benar', value: `${result.benar} Soal` },
    { label: 'Jumlah Jawaban Salah', value: `${result.salah} Soal` },
    { label: 'Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)', value: `${CONFIG.KKTP}` },
    { label: 'Nilai Akhir Ujian (Skala 0–100)', value: `${result.nilai}` },
    {
      label: 'Keterangan Kelulusan',
      value: result.status === 'Lulus' || result.nilai >= CONFIG.KKTP ? 'LULUS (Mencapai KKTP)' : 'BELUM LULUS (Perlu Remedial)',
    },
  ];

  doc.setFontSize(9.5);
  tableRows.forEach((row, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(15, y, pageWidth - 30, 7.5, 'FD');

    doc.setFont('helvetica', idx >= 4 ? 'bold' : 'normal');
    doc.text(row.label, 20, y + 5);

    if (row.label.includes('Nilai Akhir')) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 58, 138);
    } else if (row.label.includes('Keterangan')) {
      doc.setFont('helvetica', 'bold');
      if (result.status === 'Lulus' || result.nilai >= CONFIG.KKTP) {
        doc.setTextColor(16, 185, 129); // Green
      } else {
        doc.setTextColor(239, 68, 68); // Red
      }
    } else {
      doc.setTextColor(0, 0, 0);
    }

    doc.text(row.value, pageWidth - 20, y + 5, { align: 'right' });
    doc.setTextColor(0, 0, 0);
    y += 7.5;
  });

  y += 8;

  // --- CATATAN GURU ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('B. Catatan Perkembangan Belajar', 15, y);
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(255, 255, 255);
  doc.rect(15, y, pageWidth - 30, 16, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const feedbackText =
    result.status === 'Lulus' || result.nilai >= CONFIG.KKTP
      ? 'Selamat! Peserta didik telah menguasai kompetensi Nilai-nilai Pancasila dengan sangat baik dan memenuhi standar KKTP.'
      : 'Perlu penguatan materi pemahaman dan pengamalan Nilai-nilai Pancasila serta bimbingan remedial.';
  doc.text(feedbackText, 18, y + 6);
  y += 24;

  // --- TANDA TANGAN (KOLOM GURU & ORANG TUA) ---
  const signDateStr = `${CONFIG.KOTA}, ${formatIndonesianDate()}`;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);

  const leftSignX = 40;
  const rightSignX = pageWidth - 45;

  doc.text('Mengetahui,', leftSignX, y, { align: 'center' });
  doc.text(signDateStr, rightSignX, y, { align: 'center' });
  y += 5;
  doc.text('Orang Tua / Wali Murid', leftSignX, y, { align: 'center' });
  doc.text(`Guru Kelas ${CONFIG.KELAS}`, rightSignX, y, { align: 'center' });

  y += 22; // Tempat tanda tangan
  doc.setFont('helvetica', 'bold');
  doc.text('( ................................................ )', leftSignX, y, { align: 'center' });
  doc.text(CONFIG.GURU, rightSignX, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`${CONFIG.LABEL_NIP_GURU}. ${CONFIG.NIP_GURU}`, rightSignX, y, { align: 'center' });

  // Unduh dokumen PDF
  const cleanName = result.nama.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Hasil_Tes_Pendidikan_Pancasila_${cleanName}_Absen_${result.noAbsen}.pdf`);
}

/**
 * 2. Download Seluruh Naskah Soal Ujian dalam format PDF
 */
export function downloadExamQuestionsPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
    }
  };

  // --- KOP NASKAH SOAL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 3;

  doc.setLineWidth(0.7);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.7, pageWidth - 15, y + 0.7);
  y += 7;

  // Judul Naskah
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`NASKAH SOAL TES SUMATIF KELAS ${CONFIG.KELAS}`, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} | Materi: ${CONFIG.MATERI}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 7;

  // Box Identitas Siswa
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(252, 252, 252);
  doc.rect(15, y, pageWidth - 30, 16, 'FD');
  doc.setFontSize(9);
  doc.text('Nama Siswa  : ..............................................................', 18, y + 6);
  doc.text('Nomor Absen : ................', 18, y + 12);
  doc.text(`Kelas / Semester : ${CONFIG.KELAS} / Genap`, pageWidth / 2 + 10, y + 6);
  doc.text(`Waktu Pengerjaan: Mandiri / Fleksibel`, pageWidth / 2 + 10, y + 12);
  y += 20;

  // Petunjuk Umum
  doc.setFillColor(245, 247, 250);
  doc.rect(15, y, pageWidth - 30, 11, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('PETUNJUK UMUM:', 18, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    '1. Tulislah identitas Anda. 2. Kerjakan soal dari yang paling mudah. 3. Periksa kembali jawaban sebelum dikumpulkan.',
    18,
    y + 8,
    { maxWidth: pageWidth - 36 }
  );
  y += 16;

  // Iterasi Soal
  questions.forEach((q, idx) => {
    checkPageBreak(25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);

    let typeLabel = 'Pilihan Ganda';
    if (q.type === 'pgk') typeLabel = 'Pilihan Ganda Kompleks (Bisa >1 jawaban benar)';
    if (q.type === 'pgk_kategori') typeLabel = 'PGK Kategori (Respon Kategori)';
    if (q.type === 'isian') typeLabel = 'Isian Singkat';

    doc.setTextColor(30, 58, 138);
    doc.text(`Soal No. ${idx + 1} [${typeLabel}] - ${q.topic}`, 15, y);
    doc.setTextColor(0, 0, 0);
    y += 5;

    // Teks Soal
    doc.setFont('helvetica', 'normal');
    const textLines = doc.splitTextToSize(q.text, pageWidth - 32);
    checkPageBreak(textLines.length * 4.5 + 15);
    doc.text(textLines, 16, y);
    y += textLines.length * 4.5 + 2;

    // Opsi Jawaban PG & PGK
    if ((q.type === 'pg' || q.type === 'pgk') && q.options && q.options.length > 0) {
      q.options.forEach((opt) => {
        checkPageBreak(8);
        const optLines = doc.splitTextToSize(`[   ]  ${opt.id}. ${opt.text}`, pageWidth - 36);
        doc.text(optLines, 20, y);
        y += optLines.length * 4.2 + 1;
      });
      y += 3;
    }

    // Pernyataan Kategori
    if (q.type === 'pgk_kategori' && q.statements && q.statements.length > 0) {
      const posLabel = q.categoryType === 'setuju_tidak_setuju' ? 'Setuju' : q.categoryType === 'sesuai_tidak_sesuai' ? 'Sesuai' : 'Benar';
      const negLabel = q.categoryType === 'setuju_tidak_setuju' ? 'Tidak Setuju' : q.categoryType === 'sesuai_tidak_sesuai' ? 'Tidak Sesuai' : 'Salah';

      q.statements.forEach((st, sIdx) => {
        checkPageBreak(10);
        const stLines = doc.splitTextToSize(
          `Pernyataan ${sIdx + 1}: ${st.text}   [  ] ${posLabel}   [  ] ${negLabel}`,
          pageWidth - 36
        );
        doc.text(stLines, 20, y);
        y += stLines.length * 4.5 + 1.5;
      });
      y += 3;
    }

    // Isian Singkat
    if (q.type === 'isian') {
      checkPageBreak(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Jawaban Singkat: ........................................................................................................', 20, y);
      doc.setFont('helvetica', 'normal');
      y += 6;
    }
  });

  doc.save(`Naskah_Soal_Pendidikan_Pancasila_Kelas_VI_${CONFIG.SEKOLAH.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}

/**
 * 3. Export Rekap Nilai ke Format CSV (Kompatibel Microsoft Excel)
 */
export function exportResultsToCSV(results: ExamResult[]): void {
  const headers = ['Timestamp', 'Nama Siswa', 'Kelas', 'Nomor Absen', 'Benar', 'Salah', 'Nilai', 'Status'];

  const rows = results.map((r) => [
    `"${r.timestamp || ''}"`,
    `"${r.nama || ''}"`,
    `"${r.kelas || CONFIG.KELAS}"`,
    `"${r.noAbsen || ''}"`,
    r.benar,
    r.salah,
    r.nilai,
    `"${r.status}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Nilai_Tes_Pendidikan_Pancasila_Kelas_${CONFIG.KELAS}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 4. Download Rekap Nilai PDF untuk Panel Guru
 */
export function downloadResultsRecapPDF(results: ExamResult[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 15;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 15) {
      doc.addPage();
      y = 15;
    }
  };

  // Header Rekap
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('DAFTAR REKAPITULASI NILAI TES SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${CONFIG.SEKOLAH} | KELAS ${CONFIG.KELAS} | MATA PELAJARAN: ${CONFIG.MATA_PELAJARAN.toUpperCase()}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 7;

  // Header Tabel
  doc.setFillColor(30, 58, 138);
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');

  const cols = [
    { label: 'No', x: 18 },
    { label: 'Waktu Pengerjaan', x: 30 },
    { label: 'Nama Lengkap Siswa', x: 75 },
    { label: 'Absen', x: 145 },
    { label: 'Kelas', x: 165 },
    { label: 'Benar', x: 185 },
    { label: 'Salah', x: 205 },
    { label: 'Nilai', x: 225 },
    { label: 'Keterangan', x: 250 },
  ];

  cols.forEach((col) => {
    doc.text(col.label, col.x, y + 5.5);
  });
  doc.setTextColor(0, 0, 0);
  y += 8;

  // Baris Siswa
  doc.setFontSize(8.5);
  results.forEach((r, idx) => {
    checkPageBreak(7.5);
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(15, y, pageWidth - 30, 7, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.text(String(idx + 1), 18, y + 4.8);
    doc.text(r.timestamp.substring(0, 19), 30, y + 4.8);

    const truncatedName = r.nama.length > 30 ? r.nama.substring(0, 28) + '...' : r.nama;
    doc.text(truncatedName, 75, y + 4.8);

    doc.text(r.noAbsen, 145, y + 4.8);
    doc.text(r.kelas || CONFIG.KELAS, 165, y + 4.8);
    doc.text(String(r.benar), 185, y + 4.8);
    doc.text(String(r.salah), 205, y + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.text(String(r.nilai), 225, y + 4.8);

    if (r.status === 'Lulus' || r.nilai >= CONFIG.KKTP) {
      doc.setTextColor(16, 185, 129);
      doc.text('LULUS', 250, y + 4.8);
    } else {
      doc.setTextColor(239, 68, 68);
      doc.text('BELUM LULUS', 250, y + 4.8);
    }
    doc.setTextColor(0, 0, 0);

    y += 7;
  });

  doc.save(`Rekap_Nilai_Tes_Pendidikan_Pancasila_Kelas_${CONFIG.KELAS}.pdf`);
}

/**
 * 5. Download Modul & Ringkasan Materi Pembelajaran Pancasila (PDF)
 */
export function downloadMateriPembelajaranPDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 18) {
      doc.addPage();
      y = 16;
    }
  };

  // --- KOP RESMI SEKOLAH ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 3;

  doc.setLineWidth(0.7);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.7, pageWidth - 15, y + 0.7);
  y += 7;

  // Judul Modul
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('RINGKASAN MATERI PEMBELAJARAN PENDIDIKAN PANCASILA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138);
  doc.text(`TEMA: MENGAMALKAN PANCASILA SEBAGAI PANDANGAN HIDUP BANGSA`, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(9);
  doc.text(`SUBTEMA: MENGAJAK TEMAN MENGAMALKAN NILAI-NILAI PANCASILA • KELAS ${CONFIG.KELAS}`, pageWidth / 2, y, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  y += 7;

  // Kotak Pengantar
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 19, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const introLines = doc.splitTextToSize(
    'Pancasila sebagai Pandangan Hidup Bangsa (Way of Life) menjadi petunjuk arah moral dan pedoman perilaku sehari-hari. Sebagai insan Pancasila, setiap siswa tidak hanya wajib mengamalkan untuk diri sendiri, tetapi juga aktif mengajak sesama teman mengamalkannya dengan teladan nyata dan komunikasi santun.',
    pageWidth - 36
  );
  doc.text(introLines, 18, y + 5);
  y += 24;

  const sections = [
    {
      title: 'A. Makna Pancasila sebagai Pandangan Hidup Bangsa',
      points: [
        '1. Kompas Moral: Penuntun dalam membedakan perbuatan baik dan tercela.',
        '2. Perekat Persatuan: Menyatukan ratusan suku dan agama dalam keharmonisan Bhinneka Tunggal Ika.',
        '3. Penyaring Globalisasi: Membentengi diri dari pergaulan bebas, individualisme, dan pornografi.',
      ],
    },
    {
      title: 'B. Pengamalan Tiap Sila dalam Kehidupan Sehari-hari',
      points: [
        'Sila 1 (Bintang Emas): Taat beribadah, toleran, dan tidak mengganggu teman yang sedang sholat/sembahyang.',
        'Sila 2 (Rantai Emas): Menjunjung tinggi kesetaraan derajat, empati, tolong-menolong, dan tolak perundungan (stop bullying).',
        'Sila 3 (Pohon Beringin): Cinta tanah air, bangga bahasa Indonesia & produk lokal, serta gotong royong.',
        'Sila 4 (Kepala Banteng): Mengutamakan musyawarah mufakat, menghargai pendapat, dan tidak memaksakan kehendak.',
        'Sila 5 (Padi dan Kapas): Keseimbangan hak dan kewajiban, gemar menabung, hidup hemat, dan menghargai karya teman.',
      ],
    },
    {
      title: 'C. 5 Strategi Efektif Mengajak Teman Mengamalkan Pancasila',
      points: [
        '1. Memberi Teladan Terlebih Dahulu (Ing Ngarso Sung Tulodo): Teman tergerak saat melihat perbuatan baik kita.',
        '2. Mengajak dengan Bahasa Ramah & Santun: Hindari nada memerintah atau sok tahu di hadapan teman.',
        '3. Menasihati Secara Pribadi (Empat Mata): Jangan mempermalukan teman saat ia melakukan kesalahan.',
        '4. Melibatkan dalam Aksi Nyata Kolaboratif: Piket kelas bersama, donasi peduli bencana, dan kelompok belajar rukun.',
        '5. Membangun Budaya Apresiasi: Memberi pujian tulus saat teman berbuat jujur dan bertanggung jawab.',
      ],
    },
    {
      title: 'D. Contoh Kalimat Ajakan Positif Berjiwa Pancasila',
      points: [
        '- "Sudah jam istirahat nih, yuk kita tunaikan ibadah dulu baru lanjut bermain!" (Sila 1)',
        '- "Teman-teman, jangan mengejek julukan itu ya, kita semua bersaudara dan sederajat." (Sila 2)',
        '- "Ayo kita buat kelompok piket campuran biar kelas kita bersih dan kita makin kompak!" (Sila 3)',
        '- "Daripada kita bertengkar, bagaimana kalau kita musyawarahkan bersama lewat voting?" (Sila 4)',
        '- "Uang jajan kita masih ada sisa, yuk kita masukkan ke celengan tabungan daripada boros!" (Sila 5)',
      ],
    },
  ];

  sections.forEach((sec) => {
    checkPageBreak(18 + sec.points.length * 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(30, 58, 138);
    doc.text(sec.title, 15, y);
    doc.setTextColor(0, 0, 0);
    y += 5.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    sec.points.forEach((pt) => {
      const ptLines = doc.splitTextToSize(pt, pageWidth - 36);
      checkPageBreak(ptLines.length * 4.5 + 2);
      doc.text(ptLines, 18, y);
      y += ptLines.length * 4.5 + 1.5;
    });
    y += 3;
  });

  // Tanda Tangan Guru
  checkPageBreak(35);
  y += 4;
  const signDateStr = `${CONFIG.KOTA}, ${formatIndonesianDate()}`;
  const rightSignX = pageWidth - 50;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(signDateStr, rightSignX, y, { align: 'center' });
  y += 4.5;
  doc.text(`Guru Kelas ${CONFIG.KELAS}`, rightSignX, y, { align: 'center' });
  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.GURU, rightSignX, y, { align: 'center' });
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`${CONFIG.LABEL_NIP_GURU}. ${CONFIG.NIP_GURU}`, rightSignX, y, { align: 'center' });

  doc.save(`Ringkasan_Materi_Pancasila_Kelas_${CONFIG.KELAS}_${CONFIG.SEKOLAH.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}

