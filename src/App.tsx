import React, { useState, useEffect } from 'react';
import { 
  AnimatePresence, 
  LazyMotion,
  domMax,
  m,
  useScroll,
  useTransform
} from 'framer-motion';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { 
  Palette, 
  User, 
  Instagram, 
  Menu, 
  X,
  Layers,
  PenTool,
  ArrowRight,
  Mail,
  ArrowUpRight,
  MessageSquare,
  Github as BehanceIcon,
  Globe,
  Database,
  Layout
} from 'lucide-react';

// @ts-ignore
import founderImg from './assets/founder.png';

// --- Configuration ---

const CONTACT_INFO = {
  instagram: "https://www.instagram.com/izzie379_/", // Artist: Replace with your Instagram URL
  behance: "https://www.behance.net/Portfolio_919",
  discord: "izzieblush", // Artist: Replace with your Discord Invite Link
  email: "izzie22aug@gmail.com"
};

const PORTFOLIO_ITEMS = [
  { 
    title: "Web Design UI UX", 
    image: "https://media.discordapp.net/attachments/1269738553798164591/1480208660235026653/image.png?ex=69aed73d&is=69ad85bd&hm=3bf92cec0c114ef4613e30acaef13b86b9eed3a7a8e103a20b76a0ef75b9efa2&=&format=webp&quality=lossless",
    link: "https://www.behance.net/gallery/238283955/Web-Design-UI-UX"
  },
  { 
    title: "Character Art", 
    image: "https://media.discordapp.net/attachments/1269738553798164591/1480208221586194442/image.png?ex=69aed6d4&is=69ad8554&hm=3333fd0e603106f2b4a5e089e143a8322adb73d2ce81f22d58b9406ed031ffeb&=&format=webp&quality=lossless",
    link: "https://www.behance.net/gallery/234612627/Character-art"
  },
  { 
    title: "Twitch Emotes", 
    image: "https://media.discordapp.net/attachments/1269738553798164591/1480208808814055615/image.png?ex=69aed760&is=69ad85e0&hm=b05fe90cf0b69db1653ee4088ba3d6fcba8e0518d81e1b71f71b52ddc0e095ea&=&format=webp&quality=lossless",
    link: "https://www.behance.net/gallery/230858479/Twitch-Emotes"
  },
  { 
    title: "Overlays", 
    image: "https://media.discordapp.net/attachments/1269738553798164591/1480208222123196599/image.png?ex=69aed6d5&is=69ad8555&hm=fb90494366abb262fd7309f071e9ac23d887632ee8c7be9869dd01e2ef4a0e0a&=&format=webp&quality=lossless",
    link: "https://www.behance.net/gallery/230858357/Overlays"
  },
  { 
    title: "Headers Banners", 
    image: "https://media.discordapp.net/attachments/1269738553798164591/1480208222605410415/image.png?ex=69aed6d5&is=69ad8555&hm=cb0c09112118d201c7ef09912383cd4183a18711124cf864d5809baedc24e57d&=&format=webp&quality=lossless",
    link: "https://www.behance.net/gallery/230857207/HeadersBanners"
  },
  { 
    title: "Logofolio", 
    image: "https://media.discordapp.net/attachments/1269738553798164591/1480208222940958721/image.png?ex=69aed6d5&is=69ad8555&hm=31e8ea816bbf9884f08214c0f2890c754733c77d004bb8b08a509d65547be334&=&format=webp&quality=lossless",
    link: "https://www.behance.net/gallery/230856977/Logofolio"
  },
  { 
    title: "2D 3D VTuber Model", 
    image: "https://media.discordapp.net/attachments/1269738553798164591/1480208223419105425/image.png?ex=69aed6d5&is=69ad8555&hm=9cc0a76e93bc38386ac15ac971aca5de300b41a6aa9a9b4398a0e529d1edf910&=&format=webp&quality=lossless",
    link: "https://www.behance.net/gallery/230856399/3D-VTuber-Models"
  },
];

// --- Shared Components ---

const SectionTitle = ({ subtitle, title, description }: { subtitle: string; title: string; description?: string }) => (
  <m.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-20"
  >
    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-moon-muted block mb-4">{subtitle}</span>
    <h2 className="text-5xl md:text-8xl font-display font-medium tracking-tight mb-6">{title}</h2>
    {description && <p className="text-moon-muted max-w-xl text-lg leading-relaxed">{description}</p>}
  </m.div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Portfolio', 'About', 'Services', 'Contact'];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/');
      // Small delay to allow home route to mount before scrolling
      setTimeout(() => {
        const el = document.getElementById(item.toLowerCase());
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 py-4 border-b border-white/5' : 'bg-transparent py-10'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity">
          LUNARIA<span className="text-moon-muted">.STUDIO</span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {links.map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase()}`} 
              onClick={(e) => handleNavClick(e, item)}
              className="nav-link"
            >
              {item}
            </a>
          ))}
          <Link to="/contact">
            <m.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              GET IN TOUCH
            </m.button>
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 md:hidden p-8 flex flex-col gap-6"
          >
            {links.map((item) => (
              <a 
                key={item} 
                href={`/#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, item)}
                className="nav-link text-lg"
              >
                {item}
              </a>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <m.button 
                whileTap={{ scale: 0.98 }}
                className="btn-primary mt-4 w-full text-center"
              >
                GET IN TOUCH
              </m.button>
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <m.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter blur-[3px] scale-110 opacity-60"
        >
          <source src="https://motionbgs.com/media/5842/sakura-with-full-moon.960x540.mp4" type="video/mp4" />
        </video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-black/40 md:bg-black/20" />
      </m.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20">
        <m.div style={{ opacity, y: textY }}>
          <m.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-moon-muted block mb-8"
          >
            Concept Artist & Illustrator
          </m.span>
          
          <m.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="text-6xl md:text-[11rem] font-display font-bold leading-[0.8] tracking-tighter mb-12"
          >
            CELESTIAL<br />
            <span className="text-gradient">VISIONS.</span>
          </m.h1>
          
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-center gap-12 mt-20 pt-12 border-t border-white/5"
          >
            <p className="max-w-md text-moon-muted text-lg leading-relaxed">
              Crafting ethereal digital experiences for world-builders, game studios, and visionary brands. 
              Focused on the intersection of dark aesthetics and technical precision.
            </p>
            <div className="flex items-center gap-6">
              <m.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#portfolio" 
                className="btn-primary flex items-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  VIEW WORK <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </m.a>
              <m.a 
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.98 }}
                href="#contact" 
                className="btn-outline"
              >
                CONTACT
              </m.a>
            </div>
          </m.div>
        </m.div>
      </div>

      {/* Hero Bottom - Scroll Indicator */}
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent" />
      </m.div>
    </section>
  );
};

const ArtworkGallery = () => {
  return (
    <section id="portfolio" className="py-40 px-6 max-w-7xl mx-auto">
      <SectionTitle 
        subtitle="Works"
        title="PORTFOLIO" 
        description="A curated selection of creative projects. Click on any category to view full case studies on Behance."
      />

      <m.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {PORTFOLIO_ITEMS.map((cat) => (
          <m.a 
            key={cat.title}
            href={cat.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.2, 1] }
              }
            }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group block relative aspect-[3/2] overflow-hidden rounded-2xl bg-white/5 border border-white/5"
          >
            {/* Soft Glow Border Effect */}
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] pointer-events-none" />
            
            {/* Dark Bottom Gradient for Readability */}
            <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-500 group-hover:via-black/60" />

            <img 
              src={cat.image} 
              alt={cat.title} 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 z-30 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase block mb-2 group-hover:text-white transition-colors">Behance</span>
                        <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-white leading-tight">
                            {cat.title}
                        </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <ArrowUpRight size={18} />
                    </div>
                </div>
            </div>
          </m.a>
        ))}
      </m.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-40 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <m.div 
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="relative group sticky top-40"
        >
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl">
            <img 
              src={founderImg} 
              alt="Lunaria Founder" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          </div>
        </m.div>

        <div className="lg:pt-4">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-moon-muted block mb-4">THE STUDIO</span>
            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-8 leading-[1.1]">Digital Art Studio Crafting Unique Visual Worlds</h2>
          </m.div>

          <div className="space-y-6 text-moon-muted text-lg leading-relaxed font-light">
            <p>
              Lunaria is an independent digital art studio focused on creating high quality visual assets for creators, brands, and online communities.
            </p>
            <p>
              Founded by a visual artist passionate about aesthetics, storytelling, and character-driven design, the studio specializes in artwork that helps projects stand out in the digital world.
            </p>
            <p>
              From character art and VTuber models to streaming overlays, branding assets, and UI design, Lunaria combines artistic creativity with technical precision to deliver visuals that feel unique, expressive, and memorable.
            </p>
            <p>
              Each project is approached as a collaboration, ensuring that every piece reflects the identity and vision of the client.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/5">
            <div>
              <div className="text-4xl md:text-5xl font-display font-medium text-white mb-2 leading-none">110+</div>
              <div className="text-[9px] font-bold tracking-[0.2em] text-moon-muted uppercase">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-medium text-white mb-2 leading-none">6+</div>
              <div className="text-[9px] font-bold tracking-[0.2em] text-moon-muted uppercase">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-medium text-white mb-2 leading-none">50+</div>
              <div className="text-[9px] font-bold tracking-[0.2em] text-moon-muted uppercase">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const list = [
    { title: "Visual Dev", icon: <Globe size={20} />, text: "Strategic visual direction and cinematic style guides for independent digital worlds." },
    { title: "Illustration", icon: <Palette size={20} />, text: "Professional splash art and narrative illustrations with high technical precision." },
    { title: "Character Design", icon: <User size={20} />, text: "Detailed character turnarounds, expression sheets, and conceptual focus." },
    { title: "Web UI", icon: <Layout size={20} />, text: "Modern web experiences and functional UI icons for world-builders and studios." },
  ];

  return (
    <section id="services" className="py-40 px-6 max-w-7xl mx-auto border-t border-white/5">
      <SectionTitle 
        subtitle="Offerings"
        title="CAPABILITIES."
        description="Focused creative specializations for high-end digital projects requiring artistic excellence."
      />
      <m.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {list.map((s, i) => (
          <m.div 
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.04)" }}
            className="premium-card p-12 transition-all duration-500"
          >
            <div className="text-white mb-8 bg-white/5 w-14 h-14 flex items-center justify-center rounded-2xl group-hover:bg-white group-hover:text-black transition-all duration-500">{s.icon}</div>
            <h3 className="text-2xl font-medium tracking-tight mb-4">{s.title}</h3>
            <p className="text-moon-muted text-base leading-relaxed">{s.text}</p>
          </m.div>
        ))}
      </m.div>
    </section>
  );
};

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <section className="min-h-[80vh] py-40 px-6 max-w-7xl mx-auto flex flex-col justify-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-moon-muted block mb-4">Inquiry</span>
          <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tight mb-12">Let's Work Together</h1>
          <p className="text-moon-muted max-w-2xl text-xl leading-relaxed font-light mb-20">
            If you have a project idea or collaboration in mind, feel free to reach out through any of the platforms below. 
            I'm currently accepting new commissions for late 2026.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Email", 
              info: CONTACT_INFO.email, 
              icon: <Mail size={24} />, 
              link: `mailto:${CONTACT_INFO.email}`,
              color: "bg-white text-black" 
            },
            { 
              title: "Instagram", 
              info: "@izzie379_", 
              icon: <Instagram size={24} />, 
              link: CONTACT_INFO.instagram,
              color: "bg-white/5 text-white" 
            },
            { 
              title: "Discord", 
              info: "izzieblush", 
              icon: <MessageSquare size={24} />, 
              link: `https://discord.com/users/${CONTACT_INFO.discord}`,
              color: "bg-white/5 text-white" 
            }
          ].map((item, i) => (
            <m.a
              key={item.title}
              href={item.link}
              target={item.title === 'Email' ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`p-12 rounded-[2.5rem] border border-white/10 ${item.color} group transition-all duration-500`}
            >
              <div className={`mb-10 w-16 h-16 flex items-center justify-center rounded-2xl ${item.title === 'Email' ? 'bg-black/5' : 'bg-white/5'}`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
              <p className={item.title === 'Email' ? 'text-black/60' : 'text-moon-muted'}>{item.info}</p>
            </m.a>
          ))}
        </div>
      </section>
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-40 px-6 max-w-7xl mx-auto border-t border-white/5">
      <m.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
      >
        <div>
          <SectionTitle 
            subtitle="Connect"
            title="LET'S CREATE."
            description="Looking to bring your vision to life? Reach out via email for project inquiries or connect with me on Discord."
          />
          <div className="space-y-12 mt-16">
            <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-moon-muted uppercase block">Primary Contact</span>
                <m.a 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center justify-between p-8 md:p-10 rounded-3xl bg-white text-black hover:bg-white/90 transition-all group"
                >
                    <div className="flex items-center gap-6">
                        <Mail size={32} />
                        <div>
                            <div className="text-2xl font-medium font-display">Send Email</div>
                            <div className="text-black/60 text-sm">{CONTACT_INFO.email}</div>
                        </div>
                    </div>
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </m.a>
            </div>

            <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-moon-muted uppercase block">Discord Contact</span>
                <m.a 
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://discord.com/users/${CONTACT_INFO.discord}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 text-2xl md:text-4xl font-medium tracking-tight hover:text-white/60 transition-colors group"
                >
                  <MessageSquare className="text-moon-muted group-hover:text-white transition-colors" size={32} />
                  <span>{CONTACT_INFO.discord}</span>
                </m.a>
            </div>

            <div className="flex gap-10 mt-16 pt-12 border-t border-white/5">
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="text-moon-muted hover:text-white transition-colors font-bold tracking-[0.3em] text-[10px] uppercase">Instagram</a>
              <a href={CONTACT_INFO.behance} target="_blank" rel="noopener noreferrer" className="text-moon-muted hover:text-white transition-colors font-bold tracking-[0.3em] text-[10px] uppercase">Behance</a>
              <a href={`https://discord.com/users/${CONTACT_INFO.discord}`} target="_blank" rel="noopener noreferrer" className="text-moon-muted hover:text-white transition-colors font-bold tracking-[0.3em] text-[10px] uppercase">Discord</a>
            </div>
          </div>
        </div>
        
        <m.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-video lg:aspect-square group rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] p-12 flex flex-col justify-center items-center text-center"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <MessageSquare size={64} className="text-white/10 mb-8 group-hover:scale-110 group-hover:text-white transition-all duration-700" />
            <h3 className="text-3xl font-display font-medium mb-4">Discord Profile</h3>
            <p className="text-moon-muted max-w-sm mb-10 leading-relaxed">Prefer real-time chat? Feel free to add me or send a message directly on Discord.</p>
            <m.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://discord.com/users/${CONTACT_INFO.discord}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
            >
                OPEN DISCORD PROFILE
            </m.a>
        </m.div>
      </m.div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
    <div className="text-2xl font-display font-bold tracking-tighter text-white">
      LUNARIA<span className="text-moon-muted">.STUDIO</span>
    </div>
    <div className="text-[10px] font-bold tracking-[0.5em] text-moon-muted uppercase text-center">
      © {new Date().getFullYear()} LUNARIA STUDIO • OPTIMIZED PERFORMANCE
    </div>
    <div className="flex gap-10">
      <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={20} className="text-moon-muted hover:text-white cursor-pointer transition-colors" /></a>
      <a href={CONTACT_INFO.behance} target="_blank" rel="noopener noreferrer"><BehanceIcon size={20} className="text-moon-muted hover:text-white cursor-pointer transition-colors" /></a>
      <a href={`https://discord.com/users/${CONTACT_INFO.discord}`} target="_blank" rel="noopener noreferrer"><MessageSquare size={20} className="text-moon-muted hover:text-white cursor-pointer transition-colors" /></a>
    </div>
  </footer>
);

const Home = () => (
  <main>
    <Hero />
    <ArtworkGallery />
    <About />
    <Services />
    <Contact />
  </main>
);

// --- Main ---

export default function App() {
  const { scrollY } = useScroll();
  const circle1Y = useTransform(scrollY, [0, 1000], [0, 100]);
  const circle2Y = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <Router>
      <LazyMotion features={domMax}>
        <div className="bg-moon-bg min-h-screen relative overflow-x-hidden">
          <div className="noise-overlay" />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />

          {/* Decorative elements */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
             <m.div 
               style={{ y: circle1Y }}
               className="absolute top-0 right-0 w-[600px] h-[600px] border border-white/[0.03] rounded-full translate-x-1/2 -translate-y-1/2" 
             />
             <m.div 
               style={{ y: circle2Y }}
               className="absolute bottom-0 left-0 w-[400px] h-[400px] border border-white/[0.02] rounded-full -translate-x-1/2 translate-y-1/2" 
             />
          </div>
        </div>
      </LazyMotion>
    </Router>
  );
};
