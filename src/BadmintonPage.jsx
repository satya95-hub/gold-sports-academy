import { useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,900;1,700&family=Exo+2:wght@300;400;600;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.bd{font-family:'Inter',sans-serif;background:#120d00;color:#fff;overflow-x:hidden;cursor:none;min-height:100vh;}
.bd *{cursor:none!important;}

@keyframes fadeDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes glowPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.9;transform:scale(1.12)}}
@keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes ripOut{to{transform:translate(-50%,-50%) scale(18);opacity:0}}
@keyframes scrollPulse{0%,100%{opacity:.35;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.4)}}
@keyframes smashPulse{0%,100%{transform:translateY(0) rotate(-8deg)}40%{transform:translateY(-14px) rotate(5deg)}70%{transform:translateY(-6px) rotate(-3deg)}}
@keyframes spotlightMove{0%,100%{opacity:.08;transform:translate(-50%,-50%) scale(1)}50%{opacity:.14;transform:translate(-50%,-50%) scale(1.18)}}
@keyframes lineGrow{from{width:0}to{width:100%}}
@keyframes emShimmer{0%{background-position:-200% center}100%{background-position:200% center}}

/* ── CURSOR ── */
.bd-cur{width:16px;height:16px;border:1.5px solid #e8a800;border-radius:50%;
  position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);
  transition:width .18s,height .18s,background .18s;}
.bd-cur.big{width:36px;height:36px;background:rgba(232,168,0,.08);}
.bd-dot{width:4px;height:4px;background:#e8a800;border-radius:50%;
  position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);}

/* ── NAV ── */
.bd-nav{position:fixed;top:0;left:0;right:0;z-index:300;
  display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
  padding:clamp(14px,2vw,20px) clamp(20px,4vw,56px);
  background:rgba(14,14,14,.92);backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(232,168,0,.1);}
.bd-logo{font-family:'Inter',sans-serif;font-size:clamp(14px,1.5vw,18px);font-weight:800;
  color:#fff;text-decoration:none;letter-spacing:-.5px;justify-self:start;
  display:flex;align-items:center;gap:9px;}
.bd-logo-mark{width:30px;height:30px;background:linear-gradient(135deg,#8a5a00,#e8a800);
  border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px;}
.bd-nav-title{font-family:'Exo 2',sans-serif;font-size:clamp(8px,.9vw,11px);
  font-weight:800;letter-spacing:4px;text-transform:uppercase;
  color:rgba(232,168,0,.6);justify-self:center;}
.bd-back{font-family:'Exo 2',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;
  text-transform:uppercase;color:rgba(255,255,255,.6);text-decoration:none;
  background:rgba(232,168,0,.06);border:1px solid rgba(232,168,0,.2);
  padding:7px 18px;border-radius:6px;transition:all .3s;justify-self:end;}
.bd-back:hover{background:rgba(232,168,0,.14);border-color:#e8a800;color:#e8a800;}

/* ── FIXED BG ── */
.bd-bg{position:fixed;inset:0;z-index:-2;
  background:radial-gradient(ellipse 140% 80% at 50% 0%,#4a2c00 0%,#120d00 70%);}
.bd-glow{position:absolute;border-radius:50%;pointer-events:none;}
.bd-glow-1{width:700px;height:500px;
  background:radial-gradient(ellipse,rgba(138,90,0,.45),transparent 70%);
  top:-100px;left:-80px;animation:glowPulse 7s ease-in-out infinite;}
.bd-glow-2{width:600px;height:500px;
  background:radial-gradient(ellipse,rgba(232,168,0,.15),transparent 70%);
  bottom:-60px;right:-60px;animation:glowPulse 7s ease-in-out infinite 3.5s;}
.bd-spotlight{position:absolute;width:900px;height:900px;border-radius:50%;
  background:radial-gradient(circle,rgba(232,168,0,.12) 0%,transparent 65%);
  top:50%;left:50%;transform:translate(-50%,-50%);
  animation:spotlightMove 9s ease-in-out infinite;}

/* ── HERO ── */
.bd-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;
  justify-content:center;text-align:center;position:relative;overflow:hidden;
  padding:clamp(90px,12vh,130px) clamp(16px,5vw,60px) clamp(100px,14vh,140px);}
.bd-hero-rule{width:40px;height:2px;
  background:linear-gradient(90deg,#e8a800,rgba(232,168,0,.15));
  border-radius:2px;margin-bottom:clamp(16px,2.5vh,24px);
  animation:lineGrow .8s ease .1s both;}
.bd-hero-pill{display:inline-flex;align-items:center;gap:8px;
  background:rgba(232,168,0,.06);border:1px solid rgba(232,168,0,.2);
  border-radius:100px;padding:7px 22px;margin-bottom:clamp(20px,3vh,32px);
  font-family:'Exo 2',sans-serif;font-size:clamp(9px,.95vw,11px);font-weight:800;
  letter-spacing:3px;text-transform:uppercase;color:#e8a800;
  animation:fadeDown .8s ease .15s both;}
.bd-shuttle-emoji{font-size:clamp(64px,10vw,100px);display:block;margin-bottom:6px;
  filter:drop-shadow(0 0 28px rgba(232,168,0,.4));
  animation:smashPulse 3s ease-in-out infinite,fadeUp .8s ease both;}
.bd-h1{margin-bottom:clamp(16px,2.5vh,24px);width:100%;text-align:center;}
.bd-h1-top{display:block;font-family:'Inter',sans-serif;font-weight:900;
  font-size:clamp(40px,7.5vw,118px);letter-spacing:-3px;line-height:.95;color:#fff;
  animation:fadeUp .85s ease .22s both;}
.bd-h1-bot{display:inline-block;font-family:'Playfair Display',serif;font-style:italic;font-weight:700;
  font-size:clamp(44px,8vw,124px);letter-spacing:-2px;line-height:1.1;padding-bottom:0.25em;padding-right:0.1em;margin-bottom:-0.25em;
  background:linear-gradient(135deg,#8a5a00 0%,#e8a800 40%,#ffe066 65%,#c88a00 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:fadeUp .85s ease .36s both,emShimmer 5s linear 1.8s infinite;}
.bd-sub{font-family:'Inter',sans-serif;font-size:clamp(13px,1.3vw,16px);font-weight:400;
  color:rgba(255,255,255,.42);letter-spacing:.3px;max-width:480px;
  margin-bottom:clamp(28px,4vh,44px);animation:fadeUp .85s ease .5s both;line-height:1.75;}
.bd-btns{display:flex;gap:clamp(10px,1.5vw,16px);flex-wrap:wrap;justify-content:center;
  animation:fadeUp .85s ease .62s both;}
.bd-btn-p{font-family:'Exo 2',sans-serif;font-size:clamp(11px,1vw,13px);font-weight:700;
  letter-spacing:.5px;text-transform:uppercase;text-decoration:none;
  background:linear-gradient(135deg,#8a5a00,#c88a00);color:#fff;
  padding:clamp(12px,1.5vw,16px) clamp(28px,4vw,48px);border-radius:8px;
  box-shadow:0 8px 28px rgba(138,90,0,.4);transition:all .3s;}
.bd-btn-p:hover{transform:translateY(-3px);box-shadow:0 16px 44px rgba(138,90,0,.6);
  background:linear-gradient(135deg,#c88a00,#e8a800);}
.bd-btn-g{font-family:'Exo 2',sans-serif;font-size:clamp(11px,1vw,13px);font-weight:600;
  letter-spacing:.5px;text-transform:uppercase;text-decoration:none;
  background:transparent;color:rgba(255,255,255,.65);
  border:1px solid rgba(255,255,255,.14);
  padding:clamp(12px,1.5vw,16px) clamp(28px,4vw,48px);border-radius:8px;transition:all .3s;}
.bd-btn-g:hover{border-color:rgba(232,168,0,.5);color:#e8a800;transform:translateY(-3px);}

/* hero stats */
.bd-hero-stats{display:flex;align-items:center;gap:0;flex-wrap:wrap;justify-content:center;
  margin-top:clamp(44px,7vh,72px);animation:fadeUp .85s ease .78s both;}
.bd-stat-item{text-align:center;padding:0 clamp(18px,3vw,44px);}
.bd-stat-n{font-size:clamp(22px,3.2vw,40px);font-weight:800;
  color:#e8a800;line-height:1;letter-spacing:-1px;}
.bd-stat-l{font-family:'Exo 2',sans-serif;font-size:clamp(8px,.85vw,10px);font-weight:700;
  letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-top:4px;}
.bd-stat-sep{width:1px;height:32px;background:rgba(232,168,0,.15);flex-shrink:0;}

.bd-scroll{position:absolute;bottom:clamp(16px,3.5vh,28px);left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:6px;z-index:2;
  animation:fadeUp .85s ease 1.05s both;}
.bd-scroll span{font-family:'Exo 2',sans-serif;font-size:8px;letter-spacing:4px;
  text-transform:uppercase;color:rgba(232,168,0,.4);}
.bd-scroll-line{width:1px;height:44px;
  background:linear-gradient(to bottom,#e8a800,transparent);
  animation:scrollPulse 2s ease-in-out infinite;}

/* ── TICKER ── */
.bd-ticker{background:linear-gradient(90deg,#3d2400,#4a2c00,#3d2400);
  padding:15px 0;overflow:hidden;position:relative;z-index:10;
  border-top:1px solid rgba(232,168,0,.1);border-bottom:1px solid rgba(232,168,0,.1);}
.bd-ticker-inner{display:flex;gap:0;white-space:nowrap;
  animation:tickerScroll 22s linear infinite;}
.bd-ticker-item{font-family:'Exo 2',sans-serif;font-size:11px;font-weight:700;
  letter-spacing:3px;text-transform:uppercase;color:rgba(232,168,0,.4);
  padding:0 clamp(20px,3vw,44px);}
.bd-ticker-item span{color:rgba(232,168,0,.8);margin-left:8px;}

/* ── CONTENT ── */
.bd-content{position:relative;z-index:10;background:#120d00;}
.bd-sec{padding:clamp(60px,8vh,100px) clamp(16px,5vw,64px);max-width:1260px;margin:0 auto;}
.bd-ey{font-family:'Exo 2',sans-serif;font-size:clamp(9px,.9vw,11px);font-weight:800;
  letter-spacing:5px;text-transform:uppercase;color:#e8a800;opacity:.7;margin-bottom:10px;}
.bd-h2{font-family:'Inter',sans-serif;font-weight:900;
  font-size:clamp(32px,5vw,64px);color:#fff;line-height:1.1;
  margin-bottom:12px;letter-spacing:-2px;}
.bd-h2 em{font-style:italic;display:inline-block;padding-bottom:0.25em;padding-right:0.08em;margin-bottom:-0.25em;
  background:linear-gradient(135deg,#c88a00,#e8a800);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:-0.2em;}
.bd-div{width:52px;height:2px;border-radius:2px;
  background:linear-gradient(90deg,#8a5a00,#e8a800);
  margin-bottom:clamp(36px,5vh,56px);box-shadow:0 2px 14px rgba(232,168,0,.3);}
.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease;}
.revealed{opacity:1;transform:translateY(0);}

/* ── PROGRAM CARDS ── */
.bd-pgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,248px),1fr));gap:clamp(14px,2vw,22px);}
.bd-pcard{background:#1e1200;border:1px solid rgba(232,168,0,.08);
  border-radius:14px;padding:clamp(22px,2.5vw,36px) clamp(18px,2vw,28px);
  position:relative;overflow:hidden;transition:transform .4s,box-shadow .4s,border-color .4s;}
.bd-pcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,#8a5a00,#e8a800);transform:scaleX(0);transform-origin:left;transition:transform .5s;}
.bd-pcard:hover{transform:translateY(-10px);
  box-shadow:0 22px 60px rgba(138,90,0,.25);border-color:rgba(232,168,0,.25);}
.bd-pcard:hover::before{transform:scaleX(1);}
.bd-pdeco{position:absolute;bottom:-12px;right:-8px;font-size:68px;opacity:.04;pointer-events:none;}
.bd-pcard:hover .bd-pdeco{opacity:.07;}
.bd-pba{display:inline-block;background:rgba(232,168,0,.07);color:#e8a800;
  font-family:'Exo 2',sans-serif;font-size:9px;font-weight:800;letter-spacing:2px;
  text-transform:uppercase;padding:4px 12px;border-radius:100px;margin-bottom:12px;
  border:1px solid rgba(232,168,0,.18);}
.bd-pico{font-size:clamp(28px,3.5vw,44px);margin-bottom:8px;display:block;}
.bd-pn{font-family:'Inter',sans-serif;font-weight:800;font-size:clamp(18px,2vw,24px);
  color:#fff;letter-spacing:-.5px;margin-bottom:8px;}
.bd-pd{font-size:clamp(12px,1.1vw,14px);color:rgba(255,255,255,.38);line-height:1.75;margin-bottom:14px;}
.bd-pf{list-style:none;display:flex;flex-direction:column;gap:7px;}
.bd-pf li{font-size:clamp(11px,1vw,13px);color:#e8a800;display:flex;align-items:center;gap:9px;font-weight:600;}
.bd-pf li::before{content:'';width:5px;height:5px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,#8a5a00,#e8a800);box-shadow:0 0 7px rgba(232,168,0,.4);}

/* ── PRICING ── */
.bd-price-shell{max-width:940px;margin:0 auto;
  background:#181000;border-radius:16px;
  border:1px solid rgba(232,168,0,.1);overflow:hidden;
  box-shadow:0 18px 60px rgba(0,0,0,.5);}
.bd-ph{background:linear-gradient(135deg,#3d2400,#8a5a00);
  padding:clamp(16px,2vw,26px) clamp(18px,3vw,44px);
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.bd-ph h3{font-family:'Inter',sans-serif;font-size:clamp(18px,2vw,24px);font-weight:800;
  color:#fff;letter-spacing:-.5px;}
.bd-ph p{font-family:'Exo 2',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:3px;color:rgba(232,168,0,.6);text-transform:uppercase;}
.bd-pt-head{display:grid;grid-template-columns:1.6fr 1fr 1fr .9fr;
  padding:clamp(8px,1.2vw,13px) clamp(18px,3vw,44px);
  background:rgba(232,168,0,.04);border-bottom:1px solid rgba(232,168,0,.07);}
.bd-pt-head span{font-family:'Exo 2',sans-serif;font-size:9px;font-weight:800;
  letter-spacing:3px;text-transform:uppercase;color:rgba(232,168,0,.35);}
.bd-pt-row{display:grid;grid-template-columns:1.6fr 1fr 1fr .9fr;
  padding:clamp(13px,1.8vw,20px) clamp(18px,3vw,44px);
  border-bottom:1px solid rgba(232,168,0,.05);align-items:center;transition:background .25s;}
.bd-pt-row:last-of-type{border-bottom:none;}
.bd-pt-row:hover{background:rgba(232,168,0,.03);}
.bd-pnm{font-family:'Inter',sans-serif;font-weight:700;font-size:clamp(13px,1.3vw,15px);color:#fff;}
.bd-pdr{font-family:'Inter',sans-serif;font-size:clamp(11px,1vw,12px);color:rgba(255,255,255,.3);}
.bd-ppr{font-family:'Inter',sans-serif;font-weight:800;font-size:clamp(18px,2vw,24px);
  color:#e8a800;letter-spacing:-1px;}
.bd-tag{display:inline-block;font-family:'Exo 2',sans-serif;font-size:9px;font-weight:800;
  letter-spacing:1.5px;padding:4px 10px;border-radius:100px;text-transform:uppercase;}
.bt-open{background:rgba(232,168,0,.07);color:#e8a800;border:1px solid rgba(232,168,0,.2);}
.bt-hot{background:rgba(255,214,0,.08);color:#ccaa00;border:1px solid rgba(255,214,0,.18);}
.bt-adv{background:rgba(255,107,107,.07);color:#e05555;border:1px solid rgba(255,107,107,.18);}
.bt-new{background:rgba(232,168,0,.12);color:#e8a800;border:1px solid rgba(232,168,0,.28);}
.bd-pt-note{padding:clamp(10px,1.5vh,14px) clamp(18px,3vw,44px);
  font-size:11px;color:rgba(232,168,0,.3);
  border-top:1px solid rgba(232,168,0,.05);font-style:italic;}
@media(max-width:580px){.bd-pt-head{display:none;}.bd-pt-row{grid-template-columns:1fr 1fr;gap:4px 0;padding:14px 18px;}.bd-pnm{grid-column:1/-1;}}

/* ── SCHEDULE ── */
.bd-sched{display:grid;grid-template-columns:repeat(7,1fr);gap:clamp(6px,1vw,12px);max-width:900px;margin:0 auto;}
@media(max-width:620px){.bd-sched{grid-template-columns:repeat(4,1fr);}}
.bd-day{background:#1e1200;border:1px solid rgba(232,168,0,.08);
  border-radius:10px;padding:clamp(14px,2vw,22px) 8px;text-align:center;transition:all .35s;}
.bd-day:hover{border-color:#e8a800;transform:translateY(-8px);
  box-shadow:0 16px 40px rgba(138,90,0,.25);background:#1a1a1a;}
.bd-de{font-size:clamp(16px,2vw,22px);margin-bottom:4px;}
.bd-dn{font-family:'Exo 2',sans-serif;font-size:clamp(8px,.85vw,10px);
  font-weight:800;letter-spacing:2px;color:#e8a800;text-transform:uppercase;margin-bottom:4px;opacity:.8;}
.bd-dt{font-size:clamp(9px,.85vw,11px);color:rgba(255,255,255,.3);line-height:1.9;}

/* ── REVIEWS ── */
.bd-rgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,268px),1fr));gap:clamp(14px,2vw,22px);}
.bd-rcrd{background:#1e1200;border:1px solid rgba(232,168,0,.07);
  border-radius:14px;padding:clamp(22px,2.5vw,34px);position:relative;overflow:hidden;
  transition:transform .3s,box-shadow .3s,border-color .3s;}
.bd-rcrd:hover{transform:translateY(-6px);box-shadow:0 18px 50px rgba(0,0,0,.4);
  border-color:rgba(232,168,0,.2);}
.bd-rcrd::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,#8a5a00,#e8a800);transform:scaleX(0);transform-origin:left;transition:transform .45s;}
.bd-rcrd:hover::after{transform:scaleX(1);}
.bd-rq{font-size:52px;line-height:0;color:rgba(232,168,0,.07);font-family:Georgia,serif;margin-bottom:14px;display:block;}
.bd-rs{color:#FFD700;font-size:14px;margin-bottom:10px;letter-spacing:1px;}
.bd-rt{font-size:clamp(13px,1.2vw,15px);color:rgba(255,255,255,.5);line-height:1.78;margin-bottom:16px;}
.bd-ra{display:flex;align-items:center;gap:12px;}
.bd-rav{width:40px;height:40px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,#3d2400,#e8a800);
  display:flex;align-items:center;justify-content:center;
  font-family:'Inter',sans-serif;font-weight:800;font-size:16px;color:#fff;}
.bd-ran{font-family:'Inter',sans-serif;font-weight:700;color:#fff;font-size:14px;}
.bd-rad{font-size:11px;color:rgba(255,255,255,.28);}

/* ── CTA ── */
.bd-cta-wrap{padding:clamp(50px,7vh,90px) clamp(16px,5vw,60px) clamp(70px,9vh,110px);
  position:relative;z-index:10;background:#120d00;}
.bd-cta{max-width:880px;margin:0 auto;text-align:center;
  background:linear-gradient(135deg,#3d2400 0%,#4a2c00 50%,#8a5a00 100%);
  border-radius:20px;padding:clamp(44px,6vw,82px) clamp(28px,5vw,78px);
  position:relative;overflow:hidden;
  border:1px solid rgba(232,168,0,.14);
  box-shadow:0 28px 80px rgba(0,0,0,.5);}
.bd-cta::before{content:'🏸';font-size:200px;position:absolute;right:-10px;top:-10px;opacity:.05;pointer-events:none;}
.bd-cta::after{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 55% at 50% 0%,rgba(232,168,0,.09),transparent);pointer-events:none;}
.bd-cta h2{font-family:'Inter',sans-serif;font-weight:900;
  font-size:clamp(28px,4.5vw,58px);color:#fff;margin-bottom:12px;
  letter-spacing:-1.5px;position:relative;z-index:1;}
.bd-cta>p{font-size:clamp(13px,1.3vw,16px);color:rgba(255,255,255,.6);
  margin-bottom:clamp(24px,3vh,40px);position:relative;z-index:1;}
.bd-cta-meta{display:flex;gap:clamp(10px,1.8vw,28px);justify-content:center;flex-wrap:wrap;
  margin-bottom:clamp(28px,4vh,46px);position:relative;z-index:1;}
.bd-cta-item{display:flex;align-items:center;gap:9px;
  font-size:clamp(11px,1vw,13px);color:rgba(255,255,255,.75);font-weight:600;
  background:rgba(232,168,0,.06);backdrop-filter:blur(8px);
  border:1px solid rgba(232,168,0,.18);border-radius:100px;padding:9px 18px;}
.bd-enroll{display:inline-block;
  padding:clamp(14px,1.8vw,19px) clamp(44px,5.5vw,78px);
  font-family:'Exo 2',sans-serif;font-weight:900;font-size:clamp(12px,1.2vw,14px);
  letter-spacing:3px;text-transform:uppercase;text-decoration:none;
  background:linear-gradient(135deg,#8a5a00,#e8a800);color:#fff;
  border-radius:8px;box-shadow:0 10px 32px rgba(138,90,0,.4);
  transition:all .35s;position:relative;z-index:1;}
.bd-enroll:hover{transform:scale(1.05) translateY(-3px);box-shadow:0 20px 50px rgba(138,90,0,.6);
  background:linear-gradient(135deg,#c88a00,#e8a800);}

/* ── FOOTER ── */
.bd-footer{background:#0c0800;padding:clamp(22px,3vh,34px) clamp(16px,5vw,48px);
  text-align:center;border-top:1px solid rgba(232,168,0,.07);position:relative;z-index:10;}
.bd-footer p{font-size:12px;color:rgba(255,255,255,.22);letter-spacing:.5px;line-height:2.6;}
.bd-footer a{color:rgba(232,168,0,.4);text-decoration:none;transition:color .3s;}
.bd-footer a:hover{color:#e8a800;}
`;

const PROGRAMS=[
  {badge:"Beginner · Age 6+",icon:"🐣",deco:"🏸",name:"Court Starter",desc:"Learn fundamentals with proper grip, basic shots and court movement.",feats:["Grip & stance basics","Clear, drop & drive shots","Court positioning","Basic footwork patterns"]},
  {badge:"Intermediate · Age 10+",icon:"⚡",deco:"🎯",name:"Power Play",desc:"Build tactical awareness, consistency and match-ready skills.",feats:["Smash & net kills","Rally consistency","Doubles strategy","Speed & agility drills"]},
  {badge:"Advanced · Competitive",icon:"🏆",deco:"🥇",name:"Champion Series",desc:"Tournament-level training for those aiming at competitive play.",feats:["Match simulation","Advanced deception shots","Tournament preparation","Mental resilience coaching"]},
  {badge:"Family · All Ages",icon:"👨‍👩‍👧",deco:"🌟",name:"Family Batch",desc:"Flexible, fun batch perfect for families wanting to play together.",feats:["Flexible group sizes","Weekend batches","Light fitness included","Fun game formats"]},
];
const PRICES=[
  {name:"Court Starter (Kids)", dur:"5 days/week · 45 min", price:"₹1,000",tag:"bt-open",lbl:"Open"},
  {name:"Beginner (Adult)",     dur:"5 days/week · 60 min", price:"₹1,200",tag:"bt-hot", lbl:"Popular"},
  {name:"Power Play (Intermediate)",dur:"5 days/week · 75 min",price:"₹1,600",tag:"bt-hot",lbl:"Popular"},
  {name:"Champion Series",      dur:"6 days/week · 90 min", price:"₹2,200",tag:"bt-adv", lbl:"Advanced"},
  {name:"Family Batch",         dur:"Weekends · 90 min",    price:"₹1,800",tag:"bt-new", lbl:"New"},
  {name:"Court Rental",         dur:"Per hour",             price:"₹150",  tag:"bt-open",lbl:"Open"},
];
const DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const REVIEWS=[
  {ini:"R",name:"Ravi Kumar",date:"Jan 2025",text:"Best badminton coaching in Kengeri! Coaches are very professional and focus on technique. My game improved drastically."},
  {ini:"P",name:"Priya S",date:"Nov 2024",text:"Clean courts, great coaching staff. My son joined the kids batch and loves every session. Highly recommend!"},
  {ini:"A",name:"Arjun M",date:"March 2024",text:"Excellent facility and experienced coaches. The Champion Series program prepared me well for district level tournaments."},
];
const TICKER_ITEMS=["🏸 Beginner Batches","⚡ Advanced Coaching","🏆 Tournament Prep","👨‍👩‍👧 Kids Programs","🎯 Footwork Drills","💪 Fitness Training"];

function Cursor(){
  const curRef=useRef(null),dotRef=useRef(null),pos=useRef({x:0,y:0,cx:0,cy:0});
  useEffect(()=>{
    const mv=e=>{pos.current.x=e.clientX;pos.current.y=e.clientY;};
    document.addEventListener("mousemove",mv);
    let raf;
    const tick=()=>{
      pos.current.cx+=(pos.current.x-pos.current.cx)*.16;
      pos.current.cy+=(pos.current.y-pos.current.cy)*.16;
      if(curRef.current){curRef.current.style.left=pos.current.cx+"px";curRef.current.style.top=pos.current.cy+"px";}
      if(dotRef.current){dotRef.current.style.left=pos.current.x+"px";dotRef.current.style.top=pos.current.y+"px";}
      raf=requestAnimationFrame(tick);
    };
    tick();
    const on=()=>curRef.current?.classList.add("big"),off=()=>curRef.current?.classList.remove("big");
    document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",on);el.addEventListener("mouseleave",off);});
    const ck=e=>{
      const d=document.createElement("div");
      d.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:6px;height:6px;border:1.5px solid rgba(232,168,0,.7);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%) scale(0);animation:ripOut .6s ease-out forwards;`;
      document.body.appendChild(d);setTimeout(()=>d.remove(),700);
    };
    document.addEventListener("click",ck);
    return()=>{document.removeEventListener("mousemove",mv);document.removeEventListener("click",ck);cancelAnimationFrame(raf);};
  },[]);
  return <><div ref={curRef} className="bd-cur"/><div ref={dotRef} className="bd-dot"/></>;
}

function useReveal(){
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add("revealed"),+e.target.dataset.dl||0);obs.unobserve(e.target);}});
    },{threshold:.07});
    document.querySelectorAll(".reveal").forEach((el,i)=>{el.dataset.dl=(i%5)*90;obs.observe(el);});
    return()=>obs.disconnect();
  },[]);
}

export default function BadmintonPage(){
  useReveal();
  return(
    <div className="bd">
      <style>{CSS}</style>
      <Cursor/>

      {/* Fixed emerald bg */}
      <div className="bd-bg">
        <div className="bd-glow bd-glow-1"/>
        <div className="bd-glow bd-glow-2"/>
        <div className="bd-spotlight"/>
      </div>

      {/* NAV */}
      <nav className="bd-nav">
        <a href="/" className="bd-logo">
          <div className="bd-logo-mark">🏆</div>
          <div><span style={{color:"#e8a800"}}>Gold</span> Sports Academy</div>
        </a>
        <span className="bd-nav-title">Badminton Academy</span>
        <a href="/" className="bd-back">← Back</a>
      </nav>

      {/* HERO */}
      <section className="bd-hero">
        <div className="bd-hero-rule"/>
        <div className="bd-hero-pill">🏸 Gold Sports Academy · Kengeri, Bangalore</div>
        <span className="bd-shuttle-emoji">🏸</span>
        <h1 className="bd-h1">
          <span className="bd-h1-top">Smash Your</span>
          <span className="bd-h1-bot">Limits</span>
        </h1>
        <p className="bd-sub">Elite badminton coaching for competitive players & beginners alike</p>
        <div className="bd-btns">
          <a href="#pricing" className="bd-btn-p">🏸 View Pricing</a>
          <a href="#programs" className="bd-btn-g">Explore Programs</a>
        </div>
        {/* Stats */}
        <div className="bd-hero-stats">
          {[{n:"310+",l:"Students"},{n:"4.4★",l:"JD Rating"},{n:"7 Days",l:"Open Weekly"},{n:"6 AM",l:"Opens Daily"}].map((s,i,arr)=>(
            <div key={i} style={{display:"contents"}}>
              {i>0&&<div className="bd-stat-sep"/>}
              <div className="bd-stat-item">
                <div className="bd-stat-n">{s.n}</div>
                <div className="bd-stat-l">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bd-scroll"><span>Scroll</span><div className="bd-scroll-line"/></div>
      </section>

      {/* TICKER */}
      <div className="bd-ticker">
        <div className="bd-ticker-inner">
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((t,i)=>(
            <span key={i} className="bd-ticker-item">{t}<span>·</span></span>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="bd-content">
        {/* Programs */}
        <section className="bd-sec" id="programs">
          <div className="bd-ey reveal">— Training Programs —</div>
          <h2 className="bd-h2 reveal">Badminton <em>Classes</em></h2>
          <div className="bd-div reveal"/>
          <div className="bd-pgrid">
            {PROGRAMS.map((p,i)=>(
              <div key={i} className="bd-pcard reveal">
                <div className="bd-pdeco">{p.deco}</div>
                <span className="bd-pba">{p.badge}</span>
                <span className="bd-pico">{p.icon}</span>
                <div className="bd-pn">{p.name}</div>
                <div className="bd-pd">{p.desc}</div>
                <ul className="bd-pf">{p.feats.map((f,j)=><li key={j}>{f}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bd-sec" id="pricing" style={{paddingTop:0}}>
          <div className="bd-ey reveal">— Fee Structure —</div>
          <h2 className="bd-h2 reveal">Badminton <em>Pricing</em></h2>
          <div className="bd-div reveal"/>
          <div className="bd-price-shell reveal">
            <div className="bd-ph"><h3>🏸 Badminton Fee Structure</h3><p>Monthly · GSA Court</p></div>
            <div className="bd-pt-head"><span>Program</span><span>Sessions</span><span>Monthly Fee</span><span>Status</span></div>
            {PRICES.map((r,i)=>(
              <div key={i} className="bd-pt-row">
                <div className="bd-pnm">{r.name}</div>
                <div className="bd-pdr">{r.dur}</div>
                <div className="bd-ppr">{r.price}</div>
                <div><span className={`bd-tag ${r.tag}`}>{r.lbl}</span></div>
              </div>
            ))}
            <div className="bd-pt-note">* Indicative pricing. Contact academy for exact fees.</div>
          </div>
        </section>

        {/* Schedule */}
        <section className="bd-sec" id="schedule" style={{paddingTop:0}}>
          <div className="bd-ey reveal">— Open Every Day —</div>
          <h2 className="bd-h2 reveal">Court <em>Timings</em></h2>
          <div className="bd-div reveal"/>
          <div className="bd-sched">
            {DAYS.map((d,i)=>(
              <div key={i} className="bd-day reveal">
                <div className="bd-de">🏸</div>
                <div className="bd-dn">{d}</div>
                <div className="bd-dt">6:00 AM<br/>–<br/>8:00 PM</div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="bd-sec" id="reviews" style={{paddingTop:0}}>
          <div className="bd-ey reveal">— Member Reviews —</div>
          <h2 className="bd-h2 reveal">Player <em>Stories</em></h2>
          <div className="bd-div reveal"/>
          <div className="bd-rgrid">
            {REVIEWS.map((r,i)=>(
              <div key={i} className="bd-rcrd reveal">
                <span className="bd-rq">"</span>
                <div className="bd-rs">★★★★★</div>
                <div className="bd-rt">{r.text}</div>
                <div className="bd-ra">
                  <div className="bd-rav">{r.ini}</div>
                  <div><div className="bd-ran">{r.name}</div><div className="bd-rad">{r.date}</div></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="bd-cta-wrap">
        <div className="bd-cta reveal">
          <h2>Ready to Smash It? 🏸</h2>
          <p>Join 300+ players at Gold Sports Academy, Kengeri, Bangalore</p>
          <div className="bd-cta-meta">
            <div className="bd-cta-item">📍 No.25, Near Bandematt Arch, BSM Layout, Kengeri</div>
            <div className="bd-cta-item">📞 9945666663 / 914887</div>
            <div className="bd-cta-item">🕕 Daily 6:00 AM – 8:00 PM</div>
          </div>
          <a href="tel:9945666663" className="bd-enroll">📞 Enroll Now</a>
        </div>
      </div>

      <footer className="bd-footer">
        <p>© 2026 Gold Sports Academy · No.25, Near Bandematt Arch, BSM Layout, Kengeri, Bangalore 560060</p>
        <p>GSTIN: 29AIXPL3817F3ZP &nbsp;·&nbsp; <a href="/swimming">🏊 Swimming Classes</a> &nbsp;·&nbsp; <a href="/">← Home</a></p>
      </footer>
    </div>
  );
}