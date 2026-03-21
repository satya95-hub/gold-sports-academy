import { useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,900;1,700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}

.hp{font-family:'Inter',sans-serif;background:#faf8f4;color:#1a1200;overflow-x:hidden;cursor:none;min-height:100vh;}
.hp *{cursor:none!important;}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes lineGrow{from{width:0}to{width:100%}}
@keyframes ripOut{to{transform:translate(-50%,-50%) scale(18);opacity:0}}
@keyframes scrollPulse{0%,100%{opacity:.3;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.4)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes spotlightMove{0%,100%{opacity:.18;transform:translate(-50%,-50%) scale(1)}50%{opacity:.32;transform:translate(-50%,-50%) scale(1.18)}}
@keyframes goldShimmer{0%{background-position:-200% center}100%{background-position:200% center}}

/* CURSOR */
.hp-cur{width:16px;height:16px;border:1.5px solid #b87a00;border-radius:50%;
  position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);
  transition:width .18s,height .18s,background .18s;}
.hp-cur.big{width:36px;height:36px;background:rgba(184,122,0,.08);}
.hp-dot{width:4px;height:4px;background:#b87a00;border-radius:50%;
  position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);}

/* NAV */
.hp-nav{position:fixed;top:0;left:0;right:0;z-index:300;
  display:flex;align-items:center;justify-content:space-between;
  padding:clamp(12px,2.2vw,22px) clamp(16px,4vw,60px);
  background:rgba(250,248,244,.92);backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(184,122,0,.12);}
.hp-nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0;}
.hp-nav-logo-mark{width:clamp(28px,4vw,34px);height:clamp(28px,4vw,34px);
  background:linear-gradient(135deg,#b87a00,#e8a800);
  border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.hp-nav-logo-text{font-size:clamp(12px,1.3vw,15px);font-weight:700;color:#6b3f00;letter-spacing:.3px;white-space:nowrap;}
.hp-nav-logo-text span{color:#b87a00;font-weight:700;}
.hp-nav-links{display:flex;align-items:center;gap:clamp(6px,1.5vw,12px);}
.hp-nav-link{font-size:clamp(10px,1vw,12px);font-weight:600;letter-spacing:.3px;text-decoration:none;
  padding:clamp(6px,1vw,8px) clamp(12px,2vw,20px);border-radius:7px;transition:all .25s;display:flex;align-items:center;gap:6px;}
.hp-nav-link.swim{background:rgba(0,130,180,.07);color:#0072a0;border:1px solid rgba(0,130,180,.18);}
.hp-nav-link.swim:hover{background:rgba(0,130,180,.14);border-color:rgba(0,130,180,.4);}
@media(max-width:480px){
  .hp-nav-logo-text{font-size:11px;}
  .hp-nav-link{padding:6px 10px;font-size:10px;}
}

/* HERO */
.hp-hero{width:100%;min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;position:relative;overflow:visible;
  padding:clamp(100px,14vh,140px) clamp(24px,5vw,80px) clamp(80px,12vh,120px);
  background:linear-gradient(160deg,#fdf9f0 0%,#faf6ed 40%,#f5f0e8 100%);}
@media(max-width:768px){
  .hp-hero{min-height:auto;padding-top:70px;padding-bottom:60px;justify-content:flex-start;}
}
.hp-hero::before{content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle at 20% 20%,rgba(232,168,0,.06) 0%,transparent 50%),
    radial-gradient(circle at 80% 80%,rgba(0,130,180,.04) 0%,transparent 50%);
  pointer-events:none;}
.hp-spotlight{position:absolute;width:900px;height:900px;border-radius:50%;
  background:radial-gradient(circle,rgba(232,168,0,.14) 0%,transparent 65%);
  top:40%;left:50%;transform:translate(-50%,-50%);pointer-events:none;
  animation:spotlightMove 9s ease-in-out infinite;}
.hp-hero-rule{width:44px;height:2px;
  background:linear-gradient(90deg,#b87a00,rgba(184,122,0,.15));
  border-radius:2px;margin-bottom:clamp(20px,3vh,30px);
  animation:lineGrow .8s ease .1s both;}
.hp-hero-eyebrow{font-size:clamp(10px,.95vw,12px);font-weight:600;letter-spacing:4px;
  text-transform:uppercase;color:#8a5a00;
  margin-bottom:clamp(16px,2.5vh,24px);animation:fadeUp .8s ease .2s both;}
.hp-hero-title{text-align:center;margin-bottom:clamp(24px,3.5vh,36px);width:100%;padding:0 clamp(8px,2vw,20px);}
.hp-hero-t1{display:block;font-family:'Inter',sans-serif;font-weight:900;
  font-size:clamp(42px,7.5vw,120px);letter-spacing:-3px;line-height:.95;color:#6b3f00;
  animation:fadeUp .85s ease .3s both;}
.hp-hero-t2{display:inline-block;font-family:'Playfair Display',serif;font-style:italic;font-weight:700;
  font-size:clamp(44px,8vw,126px);letter-spacing:-2px;line-height:1.1;
  padding-top:0.05em;padding-left:0.08em;padding-bottom:0.3em;padding-right:0.15em;margin-bottom:-0.3em;
  background:linear-gradient(135deg,#8a5a00 0%,#c88a00 35%,#e8a800 55%,#b87a00 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:fadeUp .85s ease .42s both, goldShimmer 5s linear 1.5s infinite;}
.hp-hero-sub{font-size:clamp(14px,1.3vw,16px);font-weight:400;
  color:rgba(26,18,0,.45);letter-spacing:.3px;max-width:420px;text-align:center;
  line-height:1.8;margin-bottom:clamp(36px,5vh,56px);animation:fadeUp .85s ease .54s both;}
.hp-hero-cta{display:flex;gap:clamp(8px,1.2vw,14px);flex-wrap:wrap;justify-content:center;
  margin-bottom:clamp(56px,9vh,88px);animation:fadeUp .85s ease .66s both;}
.hp-cta-swim{display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,#005f8a,#0099cc);color:#fff;
  font-size:clamp(11px,1vw,13px);font-weight:700;letter-spacing:.5px;
  padding:clamp(12px,1.4vw,15px) clamp(24px,3vw,38px);border-radius:8px;
  text-decoration:none;transition:all .28s;box-shadow:0 6px 22px rgba(0,100,150,.25);}
.hp-cta-swim:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,100,150,.35);}
  background:linear-gradient(135deg,#8a5a00,#c88a00);color:#fff;
  font-size:clamp(11px,1vw,13px);font-weight:700;letter-spacing:.5px;
  padding:clamp(12px,1.4vw,15px) clamp(24px,3vw,38px);border-radius:8px;
  text-decoration:none;transition:all .28s;box-shadow:0 6px 22px rgba(140,90,0,.25);}

/* Stats */
.hp-hero-stats{display:flex;align-items:center;gap:0;flex-wrap:nowrap;justify-content:center;
  animation:fadeUp .85s ease .8s both;width:100%;padding:0 8px;}
.hp-stat{text-align:center;padding:0 clamp(8px,3vw,48px);flex:1;min-width:0;}
.hp-stat-n{font-size:clamp(18px,3vw,38px);font-weight:800;color:#8a5a00;
  letter-spacing:-1px;line-height:1;white-space:nowrap;}
.hp-stat-l{font-size:clamp(8px,.85vw,10px);font-weight:700;letter-spacing:1.5px;
  text-transform:uppercase;color:rgba(26,18,0,.4);margin-top:5px;white-space:nowrap;}
.hp-stat-sep{width:1px;min-width:1px;height:28px;background:rgba(184,122,0,.35);
  flex-shrink:0;align-self:center;display:block;}
@media(max-width:480px){
  .hp-stat{padding:0 clamp(6px,2.5vw,20px);}
  .hp-stat-n{font-size:clamp(16px,4.5vw,24px);letter-spacing:-.5px;}
  .hp-stat-l{font-size:clamp(7px,2vw,9px);letter-spacing:.5px;}
  .hp-stat-sep{height:22px;}
}

/* Scroll hint */
.hp-scroll{position:absolute;bottom:clamp(20px,4vh,36px);left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:7px;animation:fadeUp .85s ease 1s both;}
.hp-scroll span{font-size:8px;letter-spacing:4px;text-transform:uppercase;color:rgba(184,122,0,.5);}
.hp-scroll-line{width:1px;height:44px;
  background:linear-gradient(to bottom,#b87a00,transparent);
  animation:scrollPulse 2s ease-in-out infinite;}

/* MARQUEE */
.hp-marquee{overflow:hidden;border-top:1px solid rgba(184,122,0,.15);
  border-bottom:1px solid rgba(184,122,0,.15);padding:14px 0;background:#f0ead8;}
.hp-marquee-inner{display:flex;white-space:nowrap;animation:marquee 22s linear infinite;}
.hp-marquee-item{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;
  color:rgba(138,90,0,.4);padding:0 clamp(24px,3vw,44px);}
.hp-marquee-item strong{color:rgba(138,90,0,.85);}

/* SPORT CARDS */
.hp-cards-wrap{padding:clamp(60px,8vh,100px) clamp(24px,4vw,60px);background:#faf8f4;}
.hp-cards-header{display:flex;flex-direction:column;align-items:center;text-align:center;
  max-width:640px;margin:0 auto clamp(32px,4vh,52px);}
.hp-cards-eyebrow{font-size:10px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:#8a5a00;margin-bottom:10px;}
.hp-cards-heading{font-family:'Inter',sans-serif;font-weight:900;
  font-size:clamp(28px,4vw,52px);color:#1a1200;letter-spacing:-1.5px;line-height:1;margin-bottom:12px;}
.hp-cards-sub{font-size:13px;color:rgba(26,18,0,.38);max-width:340px;text-align:center;line-height:1.7;}
.hp-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,1.5vw,20px);
  max-width:1300px;margin:0 auto;}
@media(max-width:720px){.hp-cards-grid{grid-template-columns:1fr;}}
.hp-card{position:relative;height:clamp(400px,52vh,580px);overflow:hidden;
  text-decoration:none;display:block;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,.08);}
.hp-card-swim .hp-card-bg{background:linear-gradient(160deg,#04111e 0%,#003050 45%,#005f8a 75%,#00a0c8 100%);}
.hp-card-bg{position:absolute;inset:0;transition:transform .7s cubic-bezier(.25,.46,.45,.94);}
.hp-card:hover .hp-card-bg{transform:scale(1.04);}
.hp-card-grad{position:absolute;inset:0;
  background:linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.3) 50%,transparent 80%);}
.hp-card-top{position:absolute;top:24px;left:24px;right:24px;
  display:flex;align-items:center;justify-content:space-between;}
.hp-card-badge{font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
  color:rgba(255,255,255,.8);padding:6px 14px;border-radius:100px;backdrop-filter:blur(8px);}
.hp-card-arrow{width:38px;height:38px;border:1px solid rgba(255,255,255,.2);border-radius:8px;
  display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);
  font-size:15px;transition:all .3s;backdrop-filter:blur(8px);}
.hp-card-swim:hover .hp-card-arrow{background:#00b4d8;color:#fff;border-color:#00b4d8;}
.hp-card-content{position:absolute;bottom:0;left:0;right:0;padding:clamp(24px,3vw,36px);}
.hp-card-icon{font-size:clamp(38px,5vw,56px);display:block;margin-bottom:10px;transition:transform .4s ease;}
.hp-card:hover .hp-card-icon{transform:translateY(-8px);}
.hp-card-sport{font-size:clamp(34px,5vw,54px);font-weight:900;color:#fff;letter-spacing:-1.5px;line-height:1;margin-bottom:6px;}
.hp-card-tagline{font-size:clamp(12px,1.1vw,14px);color:rgba(255,255,255,.5);
  max-height:0;overflow:hidden;transition:max-height .4s,opacity .4s;opacity:0;line-height:1.6;}
.hp-card:hover .hp-card-tagline{max-height:60px;opacity:1;}
.hp-card-cta{display:flex;align-items:center;gap:10px;margin-top:clamp(12px,2vh,18px);
  font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;transition:color .3s;}
.hp-card-cta-line{height:1.5px;width:0;transition:width .5s ease .1s;}
.hp-card-swim .hp-card-cta{color:rgba(0,180,216,.5);}
.hp-card-swim:hover .hp-card-cta{color:#00b4d8;}
.hp-card-swim .hp-card-cta-line{background:#00b4d8;}
.hp-card-swim:hover .hp-card-cta-line{width:44px;}

/* STATS STRIP */
.hp-strip{background:#f0ead8;
  border-top:1px solid rgba(184,122,0,.12);border-bottom:1px solid rgba(184,122,0,.12);
  padding:clamp(40px,5vh,60px) clamp(24px,5vw,80px);}
.hp-strip-inner{max-width:1100px;margin:0 auto;
  display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(184,122,0,.12);}
@media(max-width:640px){.hp-strip-inner{grid-template-columns:repeat(2,1fr);}}
.hp-strip-item{background:#f0ead8;padding:clamp(24px,3vw,36px) clamp(16px,2vw,28px);
  text-align:center;transition:background .3s;}
.hp-strip-item:hover{background:#e8e0cc;}
.hp-strip-val{font-size:clamp(28px,4vw,44px);font-weight:800;color:#8a5a00;letter-spacing:-1.5px;line-height:1;margin-bottom:6px;}
.hp-strip-lbl{font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:rgba(138,90,0,.5);}

/* ABOUT */
.hp-about{padding:clamp(60px,8vh,100px) clamp(24px,5vw,80px);
  max-width:1100px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,100px);align-items:center;}
@media(max-width:720px){.hp-about{grid-template-columns:1fr;}}
.hp-about-eyebrow{font-size:10px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:#8a5a00;margin-bottom:16px;}
.hp-about-heading{font-weight:900;font-size:clamp(28px,4vw,48px);letter-spacing:-1.5px;
  line-height:1.15;color:#1a1200;margin-bottom:clamp(16px,2.5vh,24px);}
.hp-about-heading em{font-style:italic;display:inline-block;padding-bottom:0.25em;padding-right:0.08em;margin-bottom:-0.25em;
  background:linear-gradient(135deg,#8a5a00,#c88a00);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.hp-about-text{font-size:clamp(13px,1.2vw,15px);color:rgba(26,18,0,.48);line-height:1.85;}
.hp-about-right{display:flex;flex-direction:column;gap:clamp(14px,2vh,20px);}
.hp-about-card{background:#fff;border:1px solid rgba(184,122,0,.1);
  border-radius:14px;padding:clamp(18px,2vw,26px);
  display:flex;align-items:flex-start;gap:14px;
  transition:all .3s;box-shadow:0 2px 12px rgba(0,0,0,.04);}
.hp-about-card:hover{border-color:rgba(184,122,0,.3);box-shadow:0 8px 32px rgba(184,122,0,.1);transform:translateY(-2px);}
.hp-about-card-icon{font-size:22px;flex-shrink:0;margin-top:2px;}
.hp-about-card-title{font-size:14px;font-weight:700;color:#1a1200;margin-bottom:4px;}
.hp-about-card-desc{font-size:12px;color:rgba(26,18,0,.42);line-height:1.7;}

/* FIND US */
.hp-map-section{background:#f5f0e8;padding:clamp(60px,8vh,100px) clamp(24px,5vw,80px);
  border-top:1px solid rgba(184,122,0,.1);}
.hp-map-inner{max-width:1200px;margin:0 auto;}
.hp-map-two-col{display:grid;grid-template-columns:1fr 1.5fr;gap:clamp(36px,5vw,80px);align-items:center;}
@media(max-width:820px){.hp-map-two-col{grid-template-columns:1fr;}}
.hp-map-left{display:flex;flex-direction:column;}
.hp-map-eyebrow{font-size:10px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:#8a5a00;margin-bottom:14px;}
.hp-map-heading{font-weight:900;font-size:clamp(26px,3.8vw,44px);letter-spacing:-1.5px;
  color:#1a1200;line-height:1.15;margin-bottom:clamp(20px,3vh,28px);overflow:visible;}
.hp-map-heading em{font-style:italic;display:inline-block;padding-bottom:0.25em;padding-right:0.08em;margin-bottom:-0.25em;
  background:linear-gradient(135deg,#8a5a00,#c88a00);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.hp-map-details{display:flex;flex-direction:column;gap:clamp(10px,1.5vh,14px);margin-bottom:clamp(24px,3vh,32px);}
.hp-map-detail{display:flex;align-items:flex-start;gap:14px;
  background:#fff;border:1px solid rgba(184,122,0,.1);
  border-radius:12px;padding:clamp(14px,1.8vw,18px) clamp(14px,2vw,20px);
  transition:all .3s;box-shadow:0 2px 10px rgba(0,0,0,.04);}
.hp-map-detail:hover{border-color:rgba(184,122,0,.28);box-shadow:0 6px 24px rgba(184,122,0,.1);}
.hp-map-detail-icon{font-size:18px;flex-shrink:0;margin-top:1px;}
.hp-map-detail-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8a5a00;margin-bottom:3px;}
.hp-map-detail-val{font-size:clamp(12px,1.1vw,14px);font-weight:600;color:#1a1200;line-height:1.5;}

/* CLICKABLE MAP THUMBNAIL */
.hp-map-thumb{position:relative;border-radius:18px;overflow:hidden;
  aspect-ratio:4/3;
  border:1px solid rgba(184,122,0,.22);
  box-shadow:0 16px 52px rgba(0,0,0,.13);
  transition:all .35s cubic-bezier(.25,.46,.45,.94);}
.hp-map-thumb:hover{transform:translateY(-6px);box-shadow:0 28px 72px rgba(0,0,0,.2);
  border-color:rgba(184,122,0,.45);}
.hp-map-iframe{width:100%;height:100%;border:none;display:block;
  filter:saturate(.9) contrast(1.05);pointer-events:none;}
.hp-map-click-overlay{position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:flex-end;padding:24px;
  background:linear-gradient(to top,rgba(26,18,0,.75) 0%,rgba(26,18,0,.05) 45%,transparent 70%);
  text-decoration:none;transition:background .3s;}
.hp-map-thumb:hover .hp-map-click-overlay{
  background:linear-gradient(to top,rgba(26,18,0,.85) 0%,rgba(26,18,0,.12) 50%,transparent 75%);}
.hp-map-thumb-label{font-size:15px;font-weight:800;color:#fff;letter-spacing:.3px;margin-bottom:5px;
  text-shadow:0 2px 8px rgba(0,0,0,.5);transition:transform .3s;}
.hp-map-thumb:hover .hp-map-thumb-label{transform:translateY(-3px);}
.hp-map-thumb-sub{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  color:rgba(232,168,0,.95);text-shadow:0 1px 4px rgba(0,0,0,.5);}

/* ACTIONS ROW */
.hp-map-actions{display:flex;align-items:center;gap:clamp(10px,1.5vw,16px);flex-wrap:wrap;}

/* SOCIAL ICON BUTTONS */
.hp-socials{display:flex;align-items:center;gap:10px;}
.hp-social-btn{width:46px;height:46px;border-radius:12px;border:1px solid rgba(0,0,0,.08);
  background:#fff;display:flex;align-items:center;justify-content:center;
  text-decoration:none;transition:all .28s cubic-bezier(.25,.46,.45,.94);
  box-shadow:0 2px 10px rgba(0,0,0,.08);}
.hp-social-btn:hover{transform:translateY(-4px) scale(1.08);}
.hp-social-btn.insta:hover{box-shadow:0 10px 28px rgba(214,36,159,.35);border-color:transparent;}
.hp-social-btn.yt:hover{box-shadow:0 10px 28px rgba(255,0,0,.35);border-color:transparent;}
.hp-social-btn.fb:hover{box-shadow:0 10px 28px rgba(24,119,242,.35);border-color:transparent;}

/* FOOTER */
.hp-footer{border-top:1px solid rgba(184,122,0,.12);background:#eee8d8;
  padding:clamp(32px,4vh,48px) clamp(24px,5vw,80px);}
.hp-footer-top{display:flex;align-items:flex-start;justify-content:space-between;
  flex-wrap:wrap;gap:24px;margin-bottom:clamp(20px,2.5vh,30px);}
.hp-footer-left{font-size:12px;color:rgba(26,18,0,.38);letter-spacing:.3px;line-height:2.2;}
.hp-footer-left span{color:#8a5a00;font-weight:600;}
.hp-footer-right{display:flex;flex-direction:column;align-items:flex-end;gap:12px;}
.hp-footer-nav{display:flex;gap:20px;}
.hp-footer-nav a{font-size:12px;font-weight:600;letter-spacing:.5px;
  text-decoration:none;color:rgba(138,90,0,.55);transition:color .25s;}
.hp-footer-nav a:hover{color:#8a5a00;}
.hp-footer-social{display:flex;gap:8px;}
.hp-footer-social-btn{width:34px;height:34px;border-radius:8px;
  border:1px solid rgba(0,0,0,.08);background:#fff;
  display:flex;align-items:center;justify-content:center;
  text-decoration:none;transition:all .25s cubic-bezier(.25,.46,.45,.94);
  box-shadow:0 1px 6px rgba(0,0,0,.07);}
.hp-footer-social-btn:hover{transform:translateY(-3px) scale(1.1);}
.hp-footer-social-btn.insta:hover{box-shadow:0 6px 18px rgba(214,36,159,.3);}
.hp-footer-social-btn.yt:hover{box-shadow:0 6px 18px rgba(255,0,0,.3);}
.hp-footer-social-btn.fb:hover{box-shadow:0 6px 18px rgba(24,119,242,.3);}
.hp-footer-bottom{border-top:1px solid rgba(184,122,0,.12);padding-top:clamp(14px,2vh,20px);
  display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;}
.hp-footer-copy{font-size:11px;color:rgba(26,18,0,.3);letter-spacing:.3px;}
.hp-footer-gstin{font-size:11px;color:rgba(138,90,0,.4);letter-spacing:.5px;}

/* WHATSAPP FLOATING BUTTON */
@keyframes waPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.45)}50%{box-shadow:0 0 0 12px rgba(37,211,102,0)}}
.hp-wa-fab{position:fixed;bottom:clamp(24px,4vh,36px);right:clamp(20px,3vw,32px);z-index:500;
  width:58px;height:58px;border-radius:50%;background:#25D366;
  display:flex;align-items:center;justify-content:center;
  text-decoration:none;
  box-shadow:0 6px 24px rgba(37,211,102,.45);
  animation:waPulse 2.4s ease-in-out infinite;
  transition:transform .25s cubic-bezier(.25,.46,.45,.94),box-shadow .25s;}
.hp-wa-fab:hover{transform:scale(1.12);animation:none;
  box-shadow:0 12px 36px rgba(37,211,102,.6);}
.hp-wa-fab svg{width:32px;height:32px;}
`;

/* ── SVG SOCIAL ICONS ─────────────────────────────────── */
function IconInstagram({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="5%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/>
          <stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)"/>
      <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.8" fill="none"/>
      <circle cx="17.3" cy="6.7" r="1.1" fill="#fff"/>
    </svg>
  );
}

function IconYouTube({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="24" height="24" rx="5" fill="#FF0000"/>
      <path d="M19.6 8.2a1.96 1.96 0 0 0-1.38-1.39C16.9 6.5 12 6.5 12 6.5s-4.9 0-6.22.31A1.96 1.96 0 0 0 4.4 8.2C4.1 9.53 4.1 12 4.1 12s0 2.47.3 3.8a1.96 1.96 0 0 0 1.38 1.39C7.1 17.5 12 17.5 12 17.5s4.9 0 6.22-.31a1.96 1.96 0 0 0 1.38-1.39c.3-1.33.3-3.8.3-3.8s0-2.47-.3-3.8z" fill="#fff"/>
      <polygon points="10.2,14.7 15.1,12 10.2,9.3" fill="#FF0000"/>
    </svg>
  );
}

function IconFacebook({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="24" height="24" rx="5" fill="#1877F2"/>
      <path d="M16.5 8h-2c-.3 0-.5.2-.5.5V10h2.5l-.4 2.5H14V19h-2.5v-6.5H10V10h1.5V8.5C11.5 6.6 12.8 5.5 14.5 5.5c.8 0 1.6.1 2 .1V8z" fill="#fff"/>
    </svg>
  );
}

/* ── UPDATE THESE WHEN CLIENT PROVIDES LINKS ─────────── */
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/goldsportsacademy/",   // ← replace with real link
  youtube:   "https://www.youtube.com/@GoldSportsAcademy",     // ← replace with real link
  facebook:  "https://facebook.com/",    // ← replace with real link
  whatsapp:  "https://wa.me/919148873516?text=Hi%2C%20I%20found%20Gold%20Sports%20Academy%20online.%20I%20would%20like%20to%20know%20more%20about%20your%20classes%20and%20fees.%20Please%20share%20the%20details.%20Thank%20you!", // ← replace with real WhatsApp link
};

function Cursor() {
  const curRef = useRef(null), dotRef = useRef(null), pos = useRef({x:0,y:0,cx:0,cy:0});
  useEffect(() => {
    const mv = e => { pos.current.x = e.clientX; pos.current.y = e.clientY; };
    document.addEventListener("mousemove", mv);
    let raf;
    const tick = () => {
      pos.current.cx += (pos.current.x - pos.current.cx) * .15;
      pos.current.cy += (pos.current.y - pos.current.cy) * .15;
      if(curRef.current){ curRef.current.style.left = pos.current.cx+"px"; curRef.current.style.top = pos.current.cy+"px"; }
      if(dotRef.current){ dotRef.current.style.left = pos.current.x+"px"; dotRef.current.style.top = pos.current.y+"px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const on = () => curRef.current?.classList.add("big");
    const off = () => curRef.current?.classList.remove("big");
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter",on); el.addEventListener("mouseleave",off); });
    const ck = e => {
      const d = document.createElement("div");
      d.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:6px;height:6px;border:1px solid rgba(184,122,0,.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%) scale(0);animation:ripOut .55s ease-out forwards;`;
      document.body.appendChild(d); setTimeout(()=>d.remove(), 600);
    };
    document.addEventListener("click", ck);
    return () => { document.removeEventListener("mousemove",mv); document.removeEventListener("click",ck); cancelAnimationFrame(raf); };
  }, []);
  return <><div ref={curRef} className="hp-cur"/><div ref={dotRef} className="hp-dot"/></>;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting) {
          e.target.style.animation = `fadeUp .7s ease ${e.target.dataset.dl||'0s'} both`;
          e.target.style.opacity = "1";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: .1 });
    document.querySelectorAll(".hp-reveal").forEach((el,i) => {
      el.style.opacity = "0";
      el.dataset.dl = `${i * 0.08}s`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
}

const MARQUEE = ["Swimming Classes","All Ages Welcome","Expert Coaches","Est. 2019","Kengeri, Bangalore","4.4★ Rated","Open 7 Days","Swimming Summer Camp 2026"];
const ABOUT_CARDS = [
  { icon:"🎯", title:"Expert Coaching", desc:"Certified coaches with years of competitive and training experience across all levels." },
  { icon:"🏅", title:"All Ages & Levels", desc:"Programs for kids from age 4, beginners, intermediates and competitive players." },
  { icon:"☀️", title:"Swimming Summer Camp 2026", desc:"Special summer camp now running — intensive daily sessions for kids & teens. Limited slots, enroll now!" },
];

export default function HomePage() {
  useReveal();
  return (
    <div className="hp">
      <style>{CSS}</style>
      <Cursor/>

      {/* NAV */}
      <nav className="hp-nav">
        <a href="/" className="hp-nav-logo">
          <div className="hp-nav-logo-mark">🏆</div>
          <div className="hp-nav-logo-text">Gold Sports <span>Academy</span></div>
        </a>
        <div className="hp-nav-links">
          <a href="/swimming" className="hp-nav-link swim">🏊 Swimming</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-spotlight"/>
        <div className="hp-hero-rule"/>
        <p className="hp-hero-eyebrow">Kengeri, Bangalore · Est. 2019</p>
        <div className="hp-hero-title">
          <span className="hp-hero-t1">Gold Sports</span>
          <span className="hp-hero-t2">Academy</span>
        </div>
        <p className="hp-hero-sub">Where champions are made — professional swimming coaching for all ages.</p>
        <div className="hp-hero-cta">
          <a href="/swimming" className="hp-cta-swim">🏊 Swimming Classes</a>
        </div>
        <div className="hp-hero-stats" style={{display:"flex",flexDirection:"row",alignItems:"center",flexWrap:"nowrap",justifyContent:"center"}}>
          <div className="hp-stat">
            <div className="hp-stat-n">310+</div>
            <div className="hp-stat-l">Students</div>
          </div>
          <div className="hp-stat-sep"/>
          <div className="hp-stat">
            <div className="hp-stat-n">4.4★</div>
            <div className="hp-stat-l">JD Rating</div>
          </div>
          <div className="hp-stat-sep"/>
          <div className="hp-stat">
            <div className="hp-stat-n">7 Days</div>
            <div className="hp-stat-l">Open Weekly</div>
          </div>
          <div className="hp-stat-sep"/>
          <div className="hp-stat">
            <div className="hp-stat-n">6 AM</div>
            <div className="hp-stat-l">Opens Daily</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="hp-marquee">
        <div className="hp-marquee-inner">
          {[...MARQUEE,...MARQUEE,...MARQUEE].map((t,i) => (
            <span key={i} className="hp-marquee-item">
              {i%2===0 ? <strong>{t}</strong> : t} &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* SPORT CARDS */}
      <div className="hp-cards-wrap">
        <div className="hp-cards-header">
          <div className="hp-cards-eyebrow hp-reveal">Our Sport</div>
          <div className="hp-cards-heading hp-reveal">Professional Swimming</div>
          <div className="hp-cards-sub hp-reveal">Expert swimming coaching for all ages — from first splash to competitive level.</div>
        </div>
        <div className="hp-cards-grid" style={{gridTemplateColumns:"1fr",maxWidth:"640px",margin:"0 auto"}}>
          <a href="/swimming" className="hp-card hp-card-swim hp-reveal">
            <div className="hp-card-bg"/>
            <div className="hp-card-grad"/>
            <div className="hp-card-top">
              <span className="hp-card-badge">Aquatic Sports</span>
              <div className="hp-card-arrow">↗</div>
            </div>
            <div className="hp-card-content">
              <span className="hp-card-icon">🏊</span>
              <div className="hp-card-sport">Swimming</div>
              <div className="hp-card-tagline">From first splash to champion strokes — beginner to competitive, all ages welcome.</div>
              <div className="hp-card-cta"><div className="hp-card-cta-line"/>View Programs</div>
            </div>
          </a>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="hp-strip">
        <div className="hp-strip-inner">
          {[
            {val:"310+", lbl:"Happy Students"},
            {val:"4.4★", lbl:"JustDial Rating"},
            {val:"7",    lbl:"Days a Week"},
            {val:"6AM",  lbl:"Opens Daily"},
          ].map((s,i) => (
            <div key={i} className="hp-strip-item hp-reveal">
              <div className="hp-strip-val">{s.val}</div>
              <div className="hp-strip-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div style={{background:"#faf8f4"}}>
        <div className="hp-about">
          <div>
            <div className="hp-about-eyebrow hp-reveal">About the Academy</div>
            <h2 className="hp-about-heading hp-reveal">Training the<br/><em>Next Generation</em><br/>of Champions</h2>
            <p className="hp-about-text hp-reveal">Gold Sports Academy has been shaping athletes in Kengeri since 2019. With certified coaches, clean facilities and flexible timings, we make professional sports training accessible to everyone in Bangalore.</p>
          </div>
          <div className="hp-about-right">
            {ABOUT_CARDS.map((c,i) => (
              <div key={i} className="hp-about-card hp-reveal">
                <div className="hp-about-card-icon">{c.icon}</div>
                <div>
                  <div className="hp-about-card-title">{c.title}</div>
                  <div className="hp-about-card-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIND US */}
      <div className="hp-map-section">
        <div className="hp-map-inner">
          <div className="hp-map-two-col">
            {/* LEFT — text content */}
            <div className="hp-map-left">
              <div className="hp-map-eyebrow hp-reveal">Find Us</div>
              <h2 className="hp-map-heading hp-reveal">Come Train <em>With Us</em></h2>
              <div className="hp-map-details">
                {[
                  { icon:"📍", label:"Address", val:"No.25, Near Bandematt Arch, BSM Layout, 7th Cross, Kengeri, Bangalore — 560060" },
                  { icon:"📞", label:"Phone",   val:"9148873516  /  91488867178" },
                  { icon:"🕕", label:"Hours",   val:"Tue – Sun  |  6:00 AM – 8:00 PM  |  Monday Holiday" },
                ].map((d,i) => (
                  <div key={i} className="hp-map-detail hp-reveal">
                    <div className="hp-map-detail-icon">{d.icon}</div>
                    <div>
                      <div className="hp-map-detail-label">{d.label}</div>
                      <div className="hp-map-detail-val">{d.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hp-socials hp-reveal">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hp-social-btn insta" title="Instagram">
                  <IconInstagram size={20}/>
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hp-social-btn yt" title="YouTube">
                  <IconYouTube size={20}/>
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hp-social-btn fb" title="Facebook">
                  <IconFacebook size={20}/>
                </a>
              </div>
            </div>
            {/* RIGHT — OSM iframe with Google Maps click-through overlay */}
            <div className="hp-map-thumb hp-reveal">
              <iframe
                title="Gold Sports Academy Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.4717%2C12.9107%2C77.4817%2C12.9187&layer=mapnik&marker=12.9146667%2C77.4767426"
                className="hp-map-iframe"
                loading="lazy"
              />
              {/* transparent overlay — intercepts clicks and opens Google Maps */}
              <a
                href="https://www.google.com/maps/place/Gold+Sports+Academy/@12.9146719,77.4741677,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae3f218c97e001:0x787bdc74f0c3789b!8m2!3d12.9146667!4d77.4767426!16s%2Fg%2F11h12zs08g"
                target="_blank"
                rel="noopener noreferrer"
                className="hp-map-click-overlay"
                title="Open in Google Maps"
              >
                <div className="hp-map-thumb-label">📍 Gold Sports Academy</div>
                <div className="hp-map-thumb-sub">Open in Google Maps ↗</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="hp-footer">
        <div className="hp-footer-top">
          <div className="hp-footer-left">
            <p>© 2026 <span>Gold Sports Academy</span></p>
            <p>No.25, Near Bandematt Arch, BSM Layout, Kengeri, Bangalore 560060</p>
            <p>📞 9148873516 / 91488867178 · GSTIN: 29AIXPL3817F3ZP</p>
          </div>
          <div className="hp-footer-right">
            <div className="hp-footer-nav">
              <a href="/swimming">Swimming</a>
            </div>
            <div className="hp-footer-social">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hp-footer-social-btn insta" title="Instagram">
                <IconInstagram size={17}/>
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hp-footer-social-btn yt" title="YouTube">
                <IconYouTube size={17}/>
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hp-footer-social-btn fb" title="Facebook">
                <IconFacebook size={17}/>
              </a>
            </div>
          </div>
        </div>
        <div className="hp-footer-bottom">
          <span className="hp-footer-copy">Designed & Developed by <a href="https://satya95-hub.github.io/Naga-Satyam-Portfolio/" target="_blank" rel="noopener noreferrer" style={{color:"#b87a00",textDecoration:"none",fontWeight:600}}>Naga Satyam Chitturi</a></span>
          <span className="hp-footer-gstin">GSTIN: 29AIXPL3817F3ZP</span>
        </div>
      </footer>
      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="hp-wa-fab"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}