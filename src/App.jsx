import { useState, useEffect, useCallback } from "react";

const T = {
  it: {
    nav: { portfolio: "Portfolio", about: "Chi Sono", services: "Servizi", contact: "Contatti" },
    categories: {
      landscape: { name: "Paesaggi & Natura", desc: "La bellezza dei paesaggi italiani e della natura selvaggia" },
      wedding: { name: "Matrimoni & Eventi", desc: "Momenti irripetibili del vostro giorno più bello" },
      portrait: { name: "Ritratti & Moda", desc: "L'essenza delle persone catturata in uno scatto" },
      street: { name: "Street & Documentario", desc: "Storie di vita quotidiana e cultura urbana" },
    },
    about: {
      title: "Chi Sono",
      p1: "Sono Sabrina Maltempi, fotografa italiana con una passione profonda per la luce naturale e i dettagli che raccontano storie.",
      p2: "Come ottico di professione, ho sviluppato una sensibilità unica per la visione: capire come l'occhio percepisce il mondo mi ha insegnato a catturarlo attraverso l'obiettivo in modo autentico e coinvolgente.",
      p3: "Che si tratti di un paesaggio all'alba, di un momento spontaneo per strada o di un ritratto intimo, il mio obiettivo è sempre lo stesso: trasformare l'ordinario in qualcosa di straordinario.",
      badge: "Ottico & Fotografa",
    },
    services: {
      title: "Servizi", subtitle: "Ogni servizio è personalizzato sulle tue esigenze",
      items: [
        { name: "Matrimoni & Eventi", desc: "Racconto la vostra giornata speciale con sensibilità e attenzione ad ogni dettaglio." },
        { name: "Ritratti & Moda", desc: "Sessioni in studio o in location per ritratti personali e book professionali." },
        { name: "Paesaggi & Natura", desc: "Stampe fine art di paesaggi italiani, perfette per arredare i vostri spazi." },
        { name: "Street & Documentario", desc: "Progetti fotografici che raccontano storie e la bellezza della vita quotidiana." },
      ],
      cta: "Richiedi un Preventivo",
    },
    contact: {
      title: "Contatti", subtitle: "Raccontami il tuo progetto",
      name: "Nome", email: "Email", message: "Messaggio", send: "Invia Messaggio",
      location: "Zona", locationVal: "Tutta Italia",
    },
    back: "← Torna al Portfolio",
    footer: { rights: "Tutti i diritti riservati", tagline: "Fotografia d'autore" },
  },
  en: {
    nav: { portfolio: "Portfolio", about: "About", services: "Services", contact: "Contact" },
    categories: {
      landscape: { name: "Landscapes & Nature", desc: "The beauty of Italian landscapes and wild nature" },
      wedding: { name: "Weddings & Events", desc: "Unrepeatable moments of your most beautiful day" },
      portrait: { name: "Portraits & Fashion", desc: "The essence of people captured in a shot" },
      street: { name: "Street & Documentary", desc: "Stories of everyday life and urban culture" },
    },
    about: {
      title: "About Me",
      p1: "I'm Sabrina Maltempi, an Italian photographer with a deep passion for natural light and the details that tell stories.",
      p2: "As an optician by profession, I've developed a unique sensitivity for vision: understanding how the eye perceives the world has taught me to capture it through the lens in an authentic and engaging way.",
      p3: "Whether it's a landscape at dawn, a spontaneous street moment, or an intimate portrait, my goal is always the same: transforming the ordinary into something extraordinary.",
      badge: "Optician & Photographer",
    },
    services: {
      title: "Services", subtitle: "Every service is tailored to your needs",
      items: [
        { name: "Weddings & Events", desc: "I tell the story of your special day with sensitivity and attention to every detail." },
        { name: "Portraits & Fashion", desc: "Photo sessions in studio or on location for personal portraits and professional books." },
        { name: "Landscapes & Nature", desc: "Fine art prints of Italian landscapes, perfect for decorating your spaces." },
        { name: "Street & Documentary", desc: "Photographic projects that tell stories and the hidden beauty of everyday life." },
      ],
      cta: "Request a Quote",
    },
    contact: {
      title: "Contact", subtitle: "Tell me about your project",
      name: "Name", email: "Email", message: "Message", send: "Send Message",
      location: "Area", locationVal: "All of Italy",
    },
    back: "← Back to Portfolio",
    footer: { rights: "All rights reserved", tagline: "Fine Art Photography" },
  },
};

const IMAGES = {
  landscape: {
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1000&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1000&q=80",
      "https://images.unsplash.com/photo-1465056836900-8f1e940f1904?w=1000&q=80",
    ],
  },
  wedding: {
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1000&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&q=80",
    ],
  },
  portrait: {
    cover: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=80",
    ],
  },
  street: {
    cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1000&q=80",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1000&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1000&q=80",
      "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=1000&q=80",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1000&q=80",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1000&q=80",
    ],
  },
};

const AnimatedLogo = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="-55 -55 110 110" style={{ display: "block" }}>
    <path className="sm-ir" d="M0 -42 L15 -29 L0 -14Z" fill="#2D7A32" opacity=".72" stroke="#2D7A32" strokeWidth=".3"/>
    <path className="sm-ir" style={{ animationDelay: ".04s" }} d="M30 -30 L30 -11 L15 -17Z" fill="#2D7A32" opacity=".6" stroke="#2D7A32" strokeWidth=".3"/>
    <path className="sm-ir" style={{ animationDelay: ".08s" }} d="M42 0 L29 15 L14 0Z" fill="#2D7A32" opacity=".72" stroke="#2D7A32" strokeWidth=".3"/>
    <path className="sm-ir" style={{ animationDelay: ".12s" }} d="M30 30 L11 30 L17 15Z" fill="#2D7A32" opacity=".6" stroke="#2D7A32" strokeWidth=".3"/>
    <path className="sm-ir" style={{ animationDelay: ".16s" }} d="M0 42 L-15 29 L0 14Z" fill="#2D7A32" opacity=".72" stroke="#2D7A32" strokeWidth=".3"/>
    <path className="sm-ir" style={{ animationDelay: ".20s" }} d="M-30 30 L-30 11 L-15 17Z" fill="#2D7A32" opacity=".6" stroke="#2D7A32" strokeWidth=".3"/>
    <path className="sm-ir" style={{ animationDelay: ".24s" }} d="M-42 0 L-29 -15 L-14 0Z" fill="#2D7A32" opacity=".72" stroke="#2D7A32" strokeWidth=".3"/>
    <path className="sm-ir" style={{ animationDelay: ".28s" }} d="M-30 -30 L-11 -30 L-17 -15Z" fill="#2D7A32" opacity=".6" stroke="#2D7A32" strokeWidth=".3"/>
    <circle className="sm-pu" cx="0" cy="0" r="8" fill="#111"/>
  </svg>
);

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/>
  </svg>
);
const FbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const injectStyles = () => {
  if (document.getElementById("sm3-styles")) return;
  const s = document.createElement("style");
  s.id = "sm3-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');
    :root {
      --ff-d: 'Cormorant Garamond', serif;
      --ff-b: 'Outfit', sans-serif;
      --sw: 260px;
      --bg: #FAFAF8; --sf: #FFF; --tx: #1A1A1A;
      --tm: #6B6B6B; --tl: #999; --ac: #2D7A32;
      --bd: #E8E6E1; --bl: #F0EDE8;
      --e: .4s cubic-bezier(.25,.46,.45,.94);
    }
    *{margin:0;padding:0;box-sizing:border-box}
    .sm3{font-family:var(--ff-b);color:var(--tx);background:var(--bg);display:flex;min-height:100vh;-webkit-font-smoothing:antialiased}

    @keyframes smIris{0%,100%{transform:scale(1);opacity:.7}20%{transform:scale(.7);opacity:.9}40%{transform:scale(.7);opacity:.9}60%{transform:scale(1);opacity:.7}}
    @keyframes smPupil{0%,100%{transform:scale(1)}20%{transform:scale(1.25)}40%{transform:scale(1.25)}60%{transform:scale(1)}}
    .sm-ir{animation:smIris 5s ease-in-out infinite;transform-origin:center}
    .sm-pu{animation:smPupil 5s ease-in-out infinite;transform-origin:center}

    .sm3-sidebar{position:fixed;top:0;left:0;bottom:0;width:var(--sw);background:var(--sf);border-right:1px solid var(--bl);display:flex;flex-direction:column;padding:40px 32px;z-index:100;overflow-y:auto}
    .sm3-nav{list-style:none;margin-bottom:32px}
    .sm3-nav li{margin-bottom:2px}
    .sm3-nb{display:block;width:100%;text-align:left;font-size:13px;font-weight:400;letter-spacing:.06em;text-transform:uppercase;color:var(--tm);text-decoration:none;padding:10px 12px;transition:var(--e);cursor:pointer;background:none;border:none;font-family:var(--ff-b);border-left:2px solid transparent}
    .sm3-nb:hover,.sm3-nb.active{color:var(--tx);border-left-color:var(--ac);background:rgba(45,122,50,.04)}
    .sm3-ns{font-size:12px!important;text-transform:none!important;letter-spacing:.03em!important;padding-left:28px!important}
    .sm3-nd{height:1px;background:var(--bl);margin:12px 12px}
    .sm3-sb{margin-top:auto;padding-top:24px;border-top:1px solid var(--bl)}
    .sm3-sl{display:flex;gap:12px;margin-bottom:20px;padding-left:12px}
    .sm3-sl a{color:var(--tl);transition:var(--e);display:flex;align-items:center;text-decoration:none}
    .sm3-sl a:hover{color:var(--ac)}
    .sm3-lb{font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;background:none;border:1px solid var(--bd);padding:6px 16px;cursor:pointer;color:var(--tl);transition:var(--e);font-family:var(--ff-b);margin-left:12px}
    .sm3-lb:hover{border-color:var(--ac);color:var(--ac)}

    .sm3-main{margin-left:var(--sw);flex:1;min-height:100vh}

    /* Header with logo */
    .sm3-header{text-align:center;padding:32px 0 24px;border-bottom:1px solid var(--bl);background:var(--sf)}
    .sm3-header-logo{display:flex;justify-content:center;margin-bottom:10px}
    .sm3-header-name{font-family:var(--ff-d);font-size:22px;font-weight:300;letter-spacing:3px;color:var(--tx)}
    .sm3-header-surname{font-family:var(--ff-d);font-size:22px;font-weight:400;letter-spacing:5px;color:var(--ac);margin-top:1px}
    .sm3-header-tag{font-size:8px;letter-spacing:6px;color:var(--tl);margin-top:5px;text-transform:uppercase}

    .sm3-projects{padding:40px 48px 80px;max-width:1100px}
    .sm3-pc{margin-bottom:48px;cursor:pointer;transition:var(--e)}
    .sm3-pc:hover{opacity:.85}
    .sm3-pi{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:var(--bl)}
    .sm3-pt{font-family:var(--ff-d);font-size:24px;font-weight:400;color:var(--tx);margin-top:16px;letter-spacing:.02em}
    .sm3-pd{font-size:13px;color:var(--tl);margin-top:4px;font-weight:300}

    .sm3-gallery{padding:40px 48px 80px;max-width:1100px}
    .sm3-gb{font-size:13px;letter-spacing:.06em;color:var(--tm);cursor:pointer;background:none;border:none;font-family:var(--ff-b);margin-bottom:24px;transition:var(--e);padding:8px 0}
    .sm3-gb:hover{color:var(--ac)}
    .sm3-gh{margin-bottom:48px}
    .sm3-gt{font-family:var(--ff-d);font-size:clamp(32px,5vw,48px);font-weight:300;color:var(--tx);letter-spacing:.02em}
    .sm3-gd{font-size:14px;color:var(--tm);margin-top:8px;font-weight:300}
    .sm3-gi{display:flex;flex-direction:column;gap:24px}
    .sm3-gw{cursor:pointer;overflow:hidden}
    .sm3-gimg{width:100%;display:block;transition:transform .6s ease}
    .sm3-gw:hover .sm3-gimg{transform:scale(1.02)}

    .sm3-page{padding:60px 48px 80px;max-width:900px}
    .sm3-pl{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--ac);margin-bottom:12px}
    .sm3-ptl{font-family:var(--ff-d);font-size:clamp(32px,5vw,48px);font-weight:300;color:var(--tx);margin-bottom:40px}

    .sm3-ac{display:grid;grid-template-columns:260px 1fr;gap:56px;align-items:start}
    .sm3-ap{width:100%;aspect-ratio:3/4;object-fit:cover;background:var(--bl)}
    .sm3-ab{display:inline-block;margin-top:12px;font-family:var(--ff-d);font-size:13px;font-style:italic;color:var(--ac);border:1px solid var(--bd);padding:6px 16px}
    .sm3-at p{font-size:15px;line-height:1.85;color:var(--tm);margin-bottom:20px;font-weight:300}
    .sm3-at p:first-child::first-letter{font-family:var(--ff-d);font-size:48px;float:left;line-height:1;margin-right:8px;color:var(--ac);font-weight:400}

    .sm3-sg{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px}
    .sm3-sc{background:var(--sf);border:1px solid var(--bl);padding:36px 28px;transition:var(--e)}
    .sm3-sc:hover{border-color:var(--ac);transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.06)}
    .sm3-sn{font-family:var(--ff-d);font-size:22px;font-weight:400;margin-bottom:12px;color:var(--tx)}
    .sm3-sd{font-size:14px;line-height:1.7;color:var(--tm);font-weight:300}
    .sm3-cta{display:inline-block;margin-top:48px;padding:14px 40px;font-size:12px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(--tx);color:var(--tx);background:none;cursor:pointer;transition:var(--e);font-family:var(--ff-b)}
    .sm3-cta:hover{background:var(--ac);border-color:var(--ac);color:#fff}

    .sm3-cg{display:grid;grid-template-columns:1fr 1fr;gap:64px;margin-top:48px}
    .sm3-ci{display:flex;flex-direction:column;gap:28px}
    .sm3-cil{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--tl);margin-bottom:4px}
    .sm3-civ{font-family:var(--ff-d);font-size:20px;color:var(--tx);font-weight:400}
    .sm3-fm{display:flex;flex-direction:column;gap:18px}
    .sm3-fml{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--tl);margin-bottom:4px}
    .sm3-fi,.sm3-ft{width:100%;padding:12px 14px;border:1px solid var(--bd);background:var(--bg);font-family:var(--ff-b);font-size:14px;color:var(--tx);outline:none;transition:var(--e)}
    .sm3-fi:focus,.sm3-ft:focus{border-color:var(--ac)}
    .sm3-ft{min-height:120px;resize:vertical}
    .sm3-fs{align-self:flex-start;padding:14px 36px;font-size:12px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;background:var(--tx);color:var(--bg);border:1px solid var(--tx);cursor:pointer;transition:var(--e);font-family:var(--ff-b)}
    .sm3-fs:hover{background:var(--ac);border-color:var(--ac)}

    .sm3-lbx{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.94);display:flex;align-items:center;justify-content:center;animation:sm3fi .25s ease}
    .sm3-lbx img{max-width:90vw;max-height:88vh;object-fit:contain}
    .sm3-lbc{position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:28px;cursor:pointer;opacity:.7;transition:var(--e);font-family:var(--ff-b)}
    .sm3-lbc:hover{opacity:1}
    .sm3-lbn{position:absolute;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:40px;cursor:pointer;opacity:.4;transition:var(--e);padding:20px}
    .sm3-lbn:hover{opacity:1}
    .sm3-lbp{left:12px}.sm3-lbnx{right:12px}
    .sm3-lbct{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.5);font-size:13px;letter-spacing:.1em}

    .sm3-footer{padding:32px 48px;border-top:1px solid var(--bl);display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--tl);letter-spacing:.04em}
    .sm3-ftag{font-family:var(--ff-d);font-style:italic;font-size:13px}

    @keyframes sm3fi{from{opacity:0}to{opacity:1}}
    @keyframes sm3up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .sm3-a{animation:sm3up .6s ease forwards;opacity:0}

    .sm3-ham{display:none;position:fixed;top:20px;left:20px;z-index:200;background:var(--sf);border:1px solid var(--bd);width:44px;height:44px;cursor:pointer;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(0,0,0,.08)}
    .sm3-ham span{display:block;width:20px;height:1.5px;background:var(--tx);position:absolute;transition:var(--e)}
    .sm3-ham span:nth-child(1){transform:translateY(-5px)}
    .sm3-ham span:nth-child(3){transform:translateY(5px)}
    .sm3-ham.open span:nth-child(1){transform:rotate(45deg)}
    .sm3-ham.open span:nth-child(2){opacity:0}
    .sm3-ham.open span:nth-child(3){transform:rotate(-45deg)}

    @media(max-width:900px){
      .sm3-sidebar{transform:translateX(-100%);transition:transform .35s ease;z-index:150}
      .sm3-sidebar.open{transform:translateX(0)}
      .sm3-main{margin-left:0}
      .sm3-ham{display:flex}
      .sm3-projects,.sm3-gallery,.sm3-page{padding:20px 24px 60px}
      .sm3-header{padding:80px 24px 20px}
      .sm3-ac{grid-template-columns:1fr;gap:32px}
      .sm3-ap{max-width:220px}
      .sm3-sg{grid-template-columns:1fr}
      .sm3-cg{grid-template-columns:1fr;gap:40px}
      .sm3-footer{flex-direction:column;gap:8px;text-align:center}
    }
  `;
  document.head.appendChild(s);
};

export default function SabrinaMaltempi() {
  const [lang, setLang] = useState("it");
  const [page, setPage] = useState("portfolio");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const t = T[lang];

  useEffect(() => { injectStyles(); }, []);

  const navigate = useCallback((p) => {
    setPage(p); setMobileOpen(false); setLightbox(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const catKeys = ["landscape", "wedding", "portrait", "street"];
  const isGallery = page.startsWith("gallery:");
  const galleryCat = isGallery ? page.split(":")[1] : null;

  return (
    <div className="sm3">
      <button className={`sm3-ham ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(o => !o)}>
        <span/><span/><span/>
      </button>

      <aside className={`sm3-sidebar ${mobileOpen ? "open" : ""}`}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => navigate("portfolio")}>
            <AnimatedLogo size={36} />
            <div>
              <div style={{ fontFamily: "var(--ff-d)", fontSize: 18, fontWeight: 300, letterSpacing: 1, color: "var(--tx)", lineHeight: 1.1 }}>Sabrina</div>
              <div style={{ fontFamily: "var(--ff-d)", fontSize: 18, fontWeight: 400, letterSpacing: 2, color: "var(--ac)", lineHeight: 1.1 }}>Maltempi</div>
            </div>
          </div>
        </div>

        <ul className="sm3-nav">
          <li><button className={`sm3-nb ${page === "portfolio" || isGallery ? "active" : ""}`} onClick={() => navigate("portfolio")}>{t.nav.portfolio}</button></li>
          {catKeys.map(k => (
            <li key={k}><button className={`sm3-nb sm3-ns ${galleryCat === k ? "active" : ""}`} onClick={() => navigate("gallery:" + k)}>{t.categories[k].name}</button></li>
          ))}
          <div className="sm3-nd" />
          <li><button className={`sm3-nb ${page === "about" ? "active" : ""}`} onClick={() => navigate("about")}>{t.nav.about}</button></li>
          <li><button className={`sm3-nb ${page === "services" ? "active" : ""}`} onClick={() => navigate("services")}>{t.nav.services}</button></li>
          <li><button className={`sm3-nb ${page === "contact" ? "active" : ""}`} onClick={() => navigate("contact")}>{t.nav.contact}</button></li>
        </ul>

        <div className="sm3-sb">
          <div className="sm3-sl">
            <a href="https://www.instagram.com/sabry_emme" target="_blank" rel="noopener noreferrer"><IgIcon/></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FbIcon/></a>
          </div>
          <button className="sm3-lb" onClick={() => setLang(l => l === "it" ? "en" : "it")}>
            {lang === "it" ? "EN" : "IT"}
          </button>
        </div>
      </aside>

      <main className="sm3-main">
        {/* HEADER with centered logo */}
        <div className="sm3-header">
          <div className="sm3-header-logo"><AnimatedLogo size={56} /></div>
          <div className="sm3-header-name">SABRINA</div>
          <div className="sm3-header-surname">MALTEMPI</div>
          <div className="sm3-header-tag">PHOTOGRAPHY</div>
        </div>

        {page === "portfolio" && (
          <div className="sm3-projects" key="p">
            {catKeys.map((k, i) => (
              <div key={k} className="sm3-pc sm3-a" style={{ animationDelay: `${i * 120}ms` }} onClick={() => navigate("gallery:" + k)}>
                <img className="sm3-pi" src={IMAGES[k].cover} alt={t.categories[k].name} loading="lazy" />
                <div className="sm3-pt">{t.categories[k].name}</div>
                <div className="sm3-pd">{t.categories[k].desc}</div>
              </div>
            ))}
            <footer className="sm3-footer">
              <div>© {new Date().getFullYear()} Sabrina Maltempi. {t.footer.rights}.</div>
              <div className="sm3-ftag">{t.footer.tagline}</div>
            </footer>
          </div>
        )}

        {isGallery && galleryCat && (
          <div className="sm3-gallery" key={page}>
            <button className="sm3-gb" onClick={() => navigate("portfolio")}>{t.back}</button>
            <div className="sm3-gh sm3-a">
              <div className="sm3-gt">{t.categories[galleryCat].name}</div>
              <div className="sm3-gd">{t.categories[galleryCat].desc}</div>
            </div>
            <div className="sm3-gi">
              {IMAGES[galleryCat].gallery.map((src, i) => (
                <div key={i} className="sm3-gw sm3-a" style={{ animationDelay: `${i * 80}ms` }}
                  onClick={() => setLightbox({ images: IMAGES[galleryCat].gallery, index: i })}>
                  <img className="sm3-gimg" src={src} alt={`${t.categories[galleryCat].name} ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
            <footer className="sm3-footer" style={{ marginTop: 60 }}>
              <div>© {new Date().getFullYear()} Sabrina Maltempi. {t.footer.rights}.</div>
              <div className="sm3-ftag">{t.footer.tagline}</div>
            </footer>
          </div>
        )}

        {page === "about" && (
          <div className="sm3-page sm3-a" key="a">
            <div className="sm3-pl">{t.about.title}</div>
            <h1 className="sm3-ptl">Sabrina Maltempi</h1>
            <div className="sm3-ac">
              <div>
                <img className="sm3-ap" src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&q=80" alt="Sabrina Maltempi" />
                <div className="sm3-ab">{t.about.badge}</div>
              </div>
              <div className="sm3-at">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
            </div>
          </div>
        )}

        {page === "services" && (
          <div className="sm3-page sm3-a" key="s">
            <div className="sm3-pl">{lang === "it" ? "Cosa Offro" : "What I Offer"}</div>
            <h1 className="sm3-ptl">{t.services.title}</h1>
            <p style={{ fontSize: 15, color: "var(--tm)", fontWeight: 300, lineHeight: 1.7 }}>{t.services.subtitle}</p>
            <div className="sm3-sg">
              {t.services.items.map((svc, i) => (
                <div key={i} className="sm3-sc sm3-a" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="sm3-sn">{svc.name}</div>
                  <div className="sm3-sd">{svc.desc}</div>
                </div>
              ))}
            </div>
            <button className="sm3-cta" onClick={() => navigate("contact")}>{t.services.cta}</button>
          </div>
        )}

        {page === "contact" && (
          <div className="sm3-page sm3-a" key="c">
            <div className="sm3-pl">{lang === "it" ? "Parliamone" : "Let's Talk"}</div>
            <h1 className="sm3-ptl">{t.contact.title}</h1>
            <p style={{ fontSize: 15, color: "var(--tm)", fontWeight: 300, lineHeight: 1.7 }}>{t.contact.subtitle}</p>
            <div className="sm3-cg">
              <div className="sm3-ci">
                <div><div className="sm3-cil">Email</div><div className="sm3-civ">info@sabrinamaltempi.com</div></div>
                <div><div className="sm3-cil">{lang === "it" ? "Telefono" : "Phone"}</div><div className="sm3-civ">+39 XXX XXX XXXX</div></div>
                <div><div className="sm3-cil">{t.contact.location}</div><div className="sm3-civ">{t.contact.locationVal}</div></div>
              </div>
              <div className="sm3-fm">
                <div><div className="sm3-fml">{t.contact.name}</div><input className="sm3-fi" type="text" /></div>
                <div><div className="sm3-fml">{t.contact.email}</div><input className="sm3-fi" type="email" /></div>
                <div><div className="sm3-fml">{t.contact.message}</div><textarea className="sm3-ft" /></div>
                <button className="sm3-fs">{t.contact.send}</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {lightbox && (
        <div className="sm3-lbx" onClick={() => setLightbox(null)}>
          <button className="sm3-lbc" onClick={() => setLightbox(null)}>✕</button>
          <button className="sm3-lbn sm3-lbp" onClick={e => { e.stopPropagation(); setLightbox(lb => ({ ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length })); }}>‹</button>
          <img src={lightbox.images[lightbox.index]} alt="" onClick={e => e.stopPropagation()} />
          <button className="sm3-lbn sm3-lbnx" onClick={e => { e.stopPropagation(); setLightbox(lb => ({ ...lb, index: (lb.index + 1) % lb.images.length })); }}>›</button>
          <div className="sm3-lbct">{lightbox.index + 1} / {lightbox.images.length}</div>
        </div>
      )}
    </div>
  );
}
