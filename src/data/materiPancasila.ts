export interface MateriSection {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  content: string[];
  keyPoints: string[];
  actionTips?: string[];
}

export const MATERI_PANCASILA = {
  title: "Mengamalkan Pancasila sebagai Pandangan Hidup Bangsa",
  subTitle: "Panduan Praktis & Cara Mengajak Teman Mengamalkan Nilai-nilai Pancasila di Sekolah",
  targetKelas: "Kelas VI Sekolah Dasar",
  schoolName: "SD Negeri 3 Loloan Timur",
  introduction: `Pancasila bukan hanya sebatas dasar negara yang tercantum dalam pembukaan UUD 1945, melainkan juga merupakan "Pandangan Hidup Bangsa" (Way of Life / Weltanschauung). 

Sebagai pandangan hidup, nilai-nilai luhur Pancasila menjadi kompas moral, pedoman bersikap, penuntun bertingkah laku, dan filter dari pengaruh buruk perkembangan zaman bagi setiap warga negara Indonesia, khususnya generasi muda di sekolah.`,
  
  sections: [
    {
      id: "pandangan-hidup",
      title: "1. Makna Pancasila sebagai Pandangan Hidup Bangsa",
      subtitle: "Kompas moral dan pedoman hidup bersama bangsa Indonesia",
      iconName: "Compass",
      content: [
        "Pancasila sebagai Pandangan Hidup Bangsa berarti semua nilai yang terkandung di dalam sila-sila Pancasila digunakan sebagai petunjuk arah dan pedoman dalam berpikir, bersikap, bertutur kata, serta bertingkah laku sehari-hari.",
        "Bangsa Indonesia adalah bangsa yang majemuk dengan ratusan suku, bahasa daerah, dan agama. Tanpa pandangan hidup yang kokoh, perbedaan ini rentan memicu perpecahan. Pancasila hadir sebagai perekat dan tali pemersatu persaudaraan kebangsaan.",
        "Di era modern dan globalisasi, Pancasila berfungsi sebagai 'penyaring' (filter) budaya asing. Kita terbuka menerima ilmu pengetahuan dan teknologi yang maju, namun tetap teguh menolak budaya bebas atau individualisme yang bertentangan dengan adat kesopanan Indonesia."
      ],
      keyPoints: [
        "Pedoman berperilaku adil, jujur, santun, dan bertanggung jawab",
        "Pemersatu keberagaman suku, agama, ras, dan antargolongan",
        "Benteng moral penyaring pengaruh negatif era globalisasi",
        "Cita-cita luhur menuju masyarakat adil dan makmur"
      ],
      actionTips: [
        "Jadikan nilai Pancasila kebiasaan harian, bukan sekadar hafalan ujian",
        "Awali setiap aktivitas harian dengan niat baik dan doa",
        "Selalu introspeksi diri apakah perkataan kita sudah mencerminkan kesopanan"
      ]
    },
    {
      id: "sila-1",
      title: "2. Pengamalan Sila ke-1: Ketuhanan Yang Maha Esa",
      subtitle: "Simbol Bintang Emas • Menjaga Iman, Takwa, dan Toleransi Beragama",
      iconName: "Star",
      content: [
        "Bintang emas bersudut lima berlatar hitam melambangkan cahaya kerohanian dari Tuhan Yang Maha Esa yang menerangi setiap manusia dan membimbing bangsa Indonesia menuju jalan kebaikan.",
        "Mengamalkan sila pertama berarti kita taat beribadah sesuai agama masing-masing, sekaligus menghargai hak dan kebebasan teman pemeluk agama lain untuk beribadah dengan tenang tanpa gangguan.",
        "Di sekolah yang beragam seperti SD Negeri 3 Loloan Timur, kerukunan beragama terwujud nyata saat siswa saling menyapa ramah, berteman akrab tanpa sekat agama, dan menjaga ketenangan ketika rekan lain beribadah."
      ],
      keyPoints: [
        "Melaksanakan ibadah tepat waktu dan bersyukur atas nikmat Tuhan",
        "Menghormati teman yang sedang menjalankan kewajiban ibadah",
        "Tidak memaksakan agama atau kepercayaan kepada orang lain",
        "Membina kerukunan dan persaudaraan antarumat beragama"
      ],
      actionTips: [
        "Mempersilakan teman beribadah saat jam istirahat tanpa mengganggunya",
        "Menjaga keheningan saat teman atau warga sekitar sedang berdoa",
        "Mengucapkan selamat hari besar keagamaan kepada teman dengan tulus"
      ]
    },
    {
      id: "sila-2",
      title: "3. Pengamalan Sila ke-2: Kemanusiaan yang Adil dan Beradab",
      subtitle: "Simbol Rantai Emas • Menjunjung Hak Asasi, Empati, dan Anti-Perundungan",
      iconName: "HeartHandshake",
      content: [
        "Mata rantai bulat dan persegi empat yang saling mengait melambangkan hubungan persaudaraan antara laki-laki dan perempuan yang saling membutuhkan dan bersatu kuat sebagai sesama manusia.",
        "Sila kedua menuntut kita untuk mengakui persamaan harkat, derajat, hak, dan kewajiban asasi setiap manusia tanpa memandang status sosial, fisik, maupun kekayaan.",
        "Sikap beradab diwujudkan dengan bertutur kata sopan, gemar menolong yang lemah, berempati saat ada teman tertimpa musibah, serta dengan tegas menolak segala bentuk perundungan (bullying) di sekolah."
      ],
      keyPoints: [
        "Mengakui persamaan derajat antarsesama teman di kelas",
        "Bersikap tenggang rasa dan tepa salira (menjaga perasaan orang lain)",
        "Menolak perundungan verbal, fisik, maupun cyber bullying",
        "Aktif menolong teman yang kesusahan atau tertimpa musibah"
      ],
      actionTips: [
        "Jangan pernah mengejek nama orang tua, bentuk fisik, atau kekurangan teman",
        "Segera dampingi dan hibur teman yang sedang sedih atau terjatuh",
        "Gunakan panggilan yang sopan dan menyenangkan saat berbicara di kelas"
      ]
    },
    {
      id: "sila-3",
      title: "4. Pengamalan Sila ke-3: Persatuan Indonesia",
      subtitle: "Simbol Pohon Beringin • Cinta Tanah Air, Bangga Produk Lokal, & Gotong Royong",
      iconName: "TreePine",
      content: [
        "Pohon beringin yang besar, berakar tunjang kuat, dan bersulur rimbun mencerminkan bangsa Indonesia yang menaungi keragaman suku, bahasa, dan budaya di bawah payung persatuan NKRI.",
        "Cinta tanah air dibuktikan bukan dengan kata-kata muluk, melainkan tindakan nyata: bangga berbahasa Indonesia yang baik, menghargai pakaian adat serta tarian daerah, dan bangga memakai sepatu atau tas buatan lokal.",
        "Semangat gotong royong adalah jiwa asli persatuan Indonesia, di mana tugas berat seperti membersihkan lingkungan sekolah menjadi ringan jika dikerjakan bersama dengan gembira."
      ],
      keyPoints: [
        "Menempatkan kepentingan persatuan di atas kepentingan pribadi/kelompok",
        "Bangga menggunakan bahasa Indonesia dan bangga produk buatan dalam negeri",
        "Menghargai keragaman adat, tarian, dan lagu daerah nusantara",
        "Mengikuti upacara bendera hari Senin dengan tertib, khidmat, dan disiplin"
      ],
      actionTips: [
        "Berteman akrab dengan siapa saja tanpa membeda-bedakan suku asal",
        "Utamakan membeli jajan dan alat tulis buatan pengrajin / produsen lokal",
        "Semangat saat melaksanakan tugas piket kebersihan kelas bersama teman"
      ]
    },
    {
      id: "sila-4",
      title: "5. Pengamalan Sila ke-4: Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan",
      subtitle: "Simbol Kepala Banteng • Mengutamakan Musyawarah Mufakat & Menghargai Pendapat",
      iconName: "Users",
      content: [
        "Kepala banteng melambangkan budaya bangsa Indonesia yang suka berkumpul, berembuk, dan bermusyawarah untuk memecahkan persoalan secara kekeluargaan dan bijaksana.",
        "Musyawarah mufakat mengajarkan bahwa suara setiap orang berharga. Kita boleh menyampaikan usul dengan santun, namun kita tidak boleh bersikap egois atau memaksakan kehendak agar usulan kita yang harus dipakai.",
        "Ketika musyawarah telah membuahkan hasil kesepakatan, seluruh peserta rapat wajib menerima dan melaksanakannya dengan lapang dada (legawa) dan penuh tanggung jawab."
      ],
      keyPoints: [
        "Mengutamakan musyawarah mufakat dalam pengambilan keputusan bersama",
        "Tidak memaksakan kehendak pribadi kepada teman atau anggota regu",
        "Menghargai hak teman lain untuk berpendapat dan mendengarkan dengan seksama",
        "Melaksanakan hasil keputusan mufakat dengan ikhlas dan tanggung jawab"
      ],
      actionTips: [
        "Angkat tangan terlebih dahulu sebelum berbicara dalam musyawarah kelas",
        "Jangan memotong pembicaraan teman yang sedang menyampaikan ide",
        "Jika usulan kita tidak terpilih, tetap dukung keputusan bersama dengan senang hati"
      ]
    },
    {
      id: "sila-5",
      title: "6. Pengamalan Sila ke-5: Keadilan Sosial bagi Seluruh Rakyat Indonesia",
      subtitle: "Simbol Padi dan Kapas • Menjaga Keseimbangan Hak-Kewajiban & Gaya Hidup Hemat",
      iconName: "Wheat",
      content: [
        "Padi (pangan) dan kapas (sandang) melambangkan kemakmuran dan kesejahteraan merata tanpa kesenjangan yang menjadi cita-cita luhur kemerdekaan Indonesia.",
        "Keadilan sosial dimulai dari keadilan bersikap: menyeimbangkan antara pelaksanaan kewajiban belajar/piket dengan penuntutan hak bermain atau mendapat fasilitas kelas.",
        "Sila kelima juga mendidik kita agar tidak bersikap boros, tidak bergaya hidup mewah untuk pamer, gemar menabung demi masa depan, serta menghargai karya seni atau jerih payah orang lain."
      ],
      keyPoints: [
        "Menjaga keseimbangan antara hak dan kewajiban siswa di sekolah",
        "Membiasakan pola hidup hemat, gemar menabung, dan menjauhi sifat boros",
        "Suka menghargai hasil karya dan prestasi orang lain dengan tulus",
        "Bekerja keras dalam belajar dan tidak suka mengambil jalan pintas (mencontek)"
      ],
      actionTips: [
        "Sisihkan sebagian uang jajan untuk celengan tabungan setiap hari",
        "Laksanakan kewajiban piket terlebih dahulu sebelum menuntut waktu istirahat",
        "Berikan tepuk tangan dan apresiasi tulus atas hasil lukisan atau karya teman"
      ]
    },
    {
      id: "mengajak-teman",
      title: "7. Strategi Nyata: Mengajak Teman Mengamalkan Pancasila",
      subtitle: "Cara Santun, Efektif, dan Menginspirasi Tanpa Sikap Menggurui",
      iconName: "Megaphone",
      content: [
        "Mengamalkan Pancasila tidak cukup hanya untuk diri sendiri. Sebagai insan Pancasila, kita memiliki tanggung jawab moral untuk mengajak teman-teman sebaya ikut berbuat kebaikan.",
        "Mengajak teman bukanlah dengan memarahi, mempermalukan di depan umum, atau bersikap sok suci. Kunci utama keberhasilan mengajak orang lain adalah keteladanan nyata dan komunikasi yang hangat.",
        "Ki Hajar Dewantara mengajarkan 'Ing Ngarso Sung Tulodo' (Di depan memberi teladan). Ketika teman melihat kita jujur saat ujian, rajin menolong, dan tidak mudah marah, mereka akan tergerak untuk meniru kebaikan tersebut."
      ],
      keyPoints: [
        "1. Memberi Teladan Terlebih Dahulu: Tindakan nyata lebih kuat daripada seribu nasihat.",
        "2. Mengajak dengan Bahasa Santun: Ajak dengan senyuman dan kata-kata bersahabat.",
        "3. Berbicara Empat Mata: Jika teman keliru, ingatkan secara pribadi tanpa mempermalukannya.",
        "4. Melibatkan dalam Kolaborasi Positif: Buat proyek kebaikan kelas (kotak amal, piket ceria, belajar bareng).",
        "5. Membuat Kampanye Kreatif: Bikin poster ajakan Pancasila di mading atau sudut baca kelas."
      ],
      actionTips: [
        "Contoh Ajakan Sila 1: 'Hai Budi, sudah jam 12 nih, yuk kita ke mushola sholat zuhur dulu!'",
        "Contoh Ajakan Sila 2: 'Teman-teman, jangan dipanggil dengan julukan itu ya, kasihan teman kita bisa sedih.'",
        "Contoh Ajakan Sila 3: 'Ayo kita bikin regu kerja kelompok campuran supaya makin kenal dan kompak!'",
        "Contoh Ajakan Sila 4: 'Daripada berdebat ramai, yuk kita voting atau musyawarahkan bersama secara tertib.'",
        "Contoh Ajakan Sila 5: 'Wah uang jajanku masih ada sisa, yuk kita masukkan ke celengan tabungan kelas!'"
      ]
    },
    {
      id: "studi-kasus",
      title: "8. Studi Kasus Nyata di Sekolah & Cara Mengajak Teman",
      subtitle: "Skenario Kehidupan Siswa Kelas VI dan Solusi Pancasilais",
      iconName: "ShieldAlert",
      content: [
        "Berikut adalah beberapa contoh skenario masalah nyata yang sering terjadi di lingkungan sekolah beserta cara bijak mengajak teman mengatasinya berdasarkan nilai Pancasila:"
      ],
      keyPoints: [
        "Kasus 1: Teman tidak mau sekelompok dengan siswa yang berbeda suku. Cara Mengajak: Ingatkan semboyan Bhinneka Tunggal Ika (Sila ke-3) dan ajak bahwa keberagaman membuat kelompok lebih kaya ide.",
        "Kasus 2: Ada siswa yang mengejek baju atau bekal teman yang sederhana. Cara Mengajak: Tarik teman tersebut ke tempat tenang, sampaikan bahwa semua manusia sederajat dan patut dihargai (Sila ke-2).",
        "Kasus 3: Siswa saling berebut memilih game saat jam istirahat. Cara Mengajak: Ajak bermusyawarah dan bergantian secara adil melalui voting santai (Sila ke-4).",
        "Kasus 4: Teman mengajak jajan berlebihan dan meremehkan menabung. Cara Mengajak: Tunjukkan manfaat menabung untuk membeli perlengkapan sekolah impian (Sila ke-5).",
        "Kasus 5: Teman mengajak menyontek saat tes sumatif. Cara Mengajak: Tolak dengan sopan, 'Maaf teman, jujur itu berkah dan Tuhan Maha Melihat perbuatan kita' (Sila ke-1)."
      ],
      actionTips: [
        "Jadilah pelopor kebaikan (agent of change) di kelas VI SD Negeri 3 Loloan Timur",
        "Bantu guru menciptakan suasana kelas yang damai, hangat, dan penuh toleransi",
        "Bangga menjadi anak Indonesia yang berjiwa Pancasila sejati!"
      ]
    }
  ]
};
