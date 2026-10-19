const { createApp } = Vue;

createApp({
  data() {
    return {
      scrolled: false,
      menuOpen: false,
      activeCategory: "Semua",
      selected: null,
      sent: false,
      fireflies: [],
      year: new Date().getFullYear(),
      form: { name: "", email: "", message: "" },

      // ====== UBAH DATA DI BAWAH INI ======
      profile: {
        name: "Mas IKYY",
        initials: "R",
        title: "Penenun Dunia Digital",
        tagline: "Merancang antarmuka, ilustrasi, dan dunia imajinasi yang hidup.",
        about: [
          "Dahulu kala, seorang pengelana meninggalkan desa kecilnya dengan sebuah pena dan layar kosong. Kini ia menciptakan dunia yang bisa dijelajahi siapa pun.",
          "Dengan pengalaman bertahun-tahun di bidang desain dan pengembangan, saya percaya setiap produk punya cerita, dan tugas saya adalah membuatnya terasa ajaib sekaligus mudah digunakan.",
        ],
      },
      stats: [
        { value: "1+", label: "Tahun Berkelana" },
        { value: "40+", label: "Quest Selesai" },
        { value: "25", label: "Sekutu (Klien)" },
      ],
      menu: [
        { id: "gerbang", label: "Gerbang" },
        { id: "kisah", label: "Kisah" },
        { id: "quest", label: "Quest" },
        { id: "kemampuan", label: "Kemampuan" },
        { id: "perjalanan", label: "Perjalanan" },
        { id: "kontak", label: "Kontak" },
      ],
      projects: [
        {
          id: 1, title: "Kronik Eldoria", category: "Web",
          icon: "🏰", gradient: "linear-gradient(135deg,#2a1f4d,#8e5cff)",
          summary: "Situs wiki interaktif untuk dunia fantasi buatan sendiri.",
          description: "Platform wiki dengan peta interaktif, silsilah karakter, dan pencarian cepat. Dibangun agar penulis dapat mengelola lore dunianya dengan rapi.",
          tools: ["Vue 3", "CSS", "Node.js"], link: "#",
        },
        {
          id: 2, title: "Naga Pelindung", category: "Ilustrasi",
          icon: "🐉", gradient: "linear-gradient(135deg,#4a0f1a,#c9a24b)",
          summary: "Seri ilustrasi naga untuk sampul novel fantasi.",
          description: "Lima ilustrasi sampul dengan palet merah anggur dan emas, dikerjakan digital dengan tekstur kertas tua.",
          tools: ["Procreate", "Photoshop"], link: "#",
        },
        {
          id: 3, title: "Rune UI Kit", category: "UI/UX",
          icon: "🔮", gradient: "linear-gradient(135deg,#0f2a2e,#5ce1e6)",
          summary: "Design system bertema sihir untuk aplikasi game.",
          description: "Kumpulan komponen UI, ikon bergaya rune, dan panduan tipografi untuk aplikasi game kartu fantasi.",
          tools: ["Figma", "Design Tokens"], link: "#",
        },
        {
          id: 4, title: "Hutan Berbisik", category: "Web",
          icon: "🌲", gradient: "linear-gradient(135deg,#12261a,#7fb7be)",
          summary: "Landing page imersif dengan animasi parallax hutan.",
          description: "Pengalaman scroll bercerita dengan lapisan parallax, efek kunang-kunang, dan audio ambient opsional.",
          tools: ["Vue 3", "GSAP", "CSS"], link: "#",
        },
        {
          id: 5, title: "Grimoire Resep", category: "UI/UX",
          icon: "📖", gradient: "linear-gradient(135deg,#3b2a14,#e8d9b5)",
          summary: "Aplikasi resep dengan tampilan buku mantra kuno.",
          description: "Desain aplikasi mobile bertema buku mantra, lengkap dengan animasi halaman dan mode memasak.",
          tools: ["Figma", "Prototyping"], link: "#",
        },
        {
          id: 6, title: "Penjaga Gerbang", category: "Ilustrasi",
          icon: "⚔️", gradient: "linear-gradient(135deg,#1a1a22,#9aa0b5)",
          summary: "Desain karakter ksatria untuk proyek game indie.",
          description: "Concept art karakter, turnaround sheet, dan variasi kostum untuk game RPG indie.",
          tools: ["Clip Studio", "Blender"], link: "#",
        },
      ],
      skills: [
        { name: "Vue.js", icon: "⚡", level: 41 },
        { name: "CSS & Animasi", icon: "🎨", level: 45 },
        { name: "UI/UX Design", icon: "🪄", level: 56 },
        { name: "berhayal", icon: "🖌️", level: 70 },
        { name: "JavaScript", icon: "🗝️", level: 43},
        { name: "Adapt", icon: "🧠", level: 60 },
      ],
      timeline: [
        { year: "2026", role: "Lead Designer", place: "Studio Cahaya Bulan", desc: "Membangun produk digital bertema fantasi." },
        { year: "2025", role: "Front-end Developer", place: "Perkemahan", desc: "Mempelajari sihir dasar HTML Dan CSS." },

      ],
      socials: [
        { label: "GitHub", url: "https://github.com/M-Rizky-Wiguna/" },
        { label: "TikTok", url: "https://tiktok.com/@maskyylohya"},
        { label: "Instagram (Problem)", url: "https://instagram.com/maskyylohya" },
      ],
    };
  },

  computed: {
    categories() {
      return ["Semua", ...new Set(this.projects.map((p) => p.category))];
    },
    filteredProjects() {
      if (this.activeCategory === "Semua") return this.projects;
      return this.projects.filter((p) => p.category === this.activeCategory);
    },
  },

  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 40;
    },
    makeFireflies() {
      this.fireflies = Array.from({ length: 28 }, (_, i) => ({
        id: i,
        style: {
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
          animationDelay: Math.random() * 8 + "s",
          animationDuration: 6 + Math.random() * 8 + "s",
          "--size": 2 + Math.random() * 3 + "px",
        },
      }));
    },
    setupReveal() {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    },
    sendMessage() {
      // Ganti dengan layanan nyata (Formspree, EmailJS, backend sendiri, dll.)
      console.log("Pesan terkirim:", { ...this.form });
      this.sent = true;
      this.form = { name: "", email: "", message: "" };
      setTimeout(() => (this.sent = false), 5000);
    },
    onKey(e) {
      if (e.key === "Escape") this.selected = null;
    },
  },

  mounted() {
    this.makeFireflies();
    this.setupReveal();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("keydown", this.onKey);
  },
  unmounted() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("keydown", this.onKey);
  },
}).mount("#app");
