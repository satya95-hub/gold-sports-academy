import { useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Exo+2:wght@400;600;800;900&family=Nunito:wght@400;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.sw{font-family:'Nunito',sans-serif;overflow-x:hidden;cursor:none;background:#002830;}
.sw *{cursor:none!important;}

@keyframes fadeDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
@keyframes scrollPulse{0%,100%{opacity:.4;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.4)}}
@keyframes ripOut{to{transform:translate(-50%,-50%) scale(18);opacity:0}}

.nav{position:fixed;top:0;left:0;right:0;z-index:300;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
  padding:clamp(12px,2vw,18px) clamp(18px,4vw,52px);
  background:rgba(0,0,0,.22);backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(255,255,255,.1);}
.nav-logo{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(14px,1.8vw,20px);color:#00d4e8;text-decoration:none;letter-spacing:.5px;justify-self:start;}
.nav-logo em{font-style:normal;color:#e8a800;}
.nav-pill{font-family:'Exo 2',sans-serif;font-size:clamp(8px,.9vw,11px);font-weight:800;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.75);justify-self:center;text-align:center;}
.nav-back{font-family:'Exo 2',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:#fff;text-decoration:none;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.38);
  padding:6px 16px;border-radius:3px;transition:all .3s;justify-self:end;}
.nav-back:hover{background:#fff;color:#007a8a;}

/* ── HERO ── */
.hero{position:relative;width:100%;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;}
.hero-vid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 20%;z-index:0;}
.hero-overlay{position:absolute;inset:0;z-index:1;
  background:linear-gradient(to bottom,
    rgba(0,8,18,.55) 0%,
    rgba(0,8,18,.15) 30%,
    rgba(0,8,18,.22) 55%,
    rgba(0,15,30,.80) 82%,
    rgba(0,15,30,.97) 100%);}
.hero-body{position:relative;z-index:2;text-align:center;width:100%;max-width:920px;
  padding:clamp(80px,12vh,120px) clamp(16px,5vw,64px) clamp(100px,14vh,140px);
  display:flex;flex-direction:column;align-items:center;}

.hero-pill{display:inline-flex;align-items:center;gap:8px;
  background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.38);
  border-radius:100px;padding:7px 22px;
  font-family:'Exo 2',sans-serif;font-size:clamp(9px,.95vw,11px);font-weight:800;
  letter-spacing:3px;text-transform:uppercase;color:#fff;backdrop-filter:blur(12px);
  margin-bottom:clamp(18px,3vh,28px);animation:fadeDown .75s ease .1s both;}

.hero-h1-top{font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(48px,8.5vw,114px);color:rgba(255,255,255,.97);
  letter-spacing:-1px;line-height:1;
  text-shadow:0 2px 44px rgba(0,0,0,.6);
  animation:fadeUp .85s ease .22s both;display:block;}
.hero-h1-bot{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;
  font-size:clamp(54px,10vw,130px);letter-spacing:-2px;line-height:1;
  background:linear-gradient(155deg,#fff 0%,#cdfcff 32%,#7af5ff 58%,#fff 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  filter:drop-shadow(0 4px 28px rgba(0,200,230,.5));
  animation:fadeUp .85s ease .36s both;display:block;margin-bottom:clamp(16px,3vh,28px);}
.hero-sub{font-size:clamp(14px,1.5vw,18px);font-weight:500;color:rgba(255,255,255,.82);
  line-height:1.9;max-width:520px;text-shadow:0 1px 20px rgba(0,0,0,.45);
  margin-bottom:clamp(26px,4vh,40px);animation:fadeUp .85s ease .5s both;}

.hero-btns{display:flex;gap:clamp(10px,1.5vw,16px);flex-wrap:wrap;justify-content:center;
  margin-bottom:clamp(36px,6vh,60px);animation:fadeUp .85s ease .62s both;}
.btn-solid{font-family:'Exo 2',sans-serif;font-size:clamp(10px,1vw,12px);font-weight:900;
  letter-spacing:3px;text-transform:uppercase;text-decoration:none;
  background:#fff;color:#005f6b;border-radius:4px;
  padding:clamp(13px,1.6vw,16px) clamp(28px,4vw,52px);
  box-shadow:0 8px 28px rgba(0,0,0,.35);transition:all .32s;}
.btn-solid:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.4);}
.btn-ghost{font-family:'Exo 2',sans-serif;font-size:clamp(10px,1vw,12px);font-weight:700;
  letter-spacing:3px;text-transform:uppercase;text-decoration:none;
  background:rgba(255,255,255,.1);color:#fff;
  border:2px solid rgba(255,255,255,.5);border-radius:4px;
  padding:clamp(13px,1.6vw,16px) clamp(28px,4vw,52px);
  backdrop-filter:blur(10px);transition:all .32s;}
.btn-ghost:hover{background:rgba(255,255,255,.22);transform:translateY(-4px);}

/* Stats row */
.hero-stats{display:flex;align-items:center;gap:0;flex-wrap:nowrap;justify-content:center;
  animation:fadeUp .85s ease .78s both;}
.stat-item{text-align:center;padding:0 clamp(18px,3vw,44px);white-space:nowrap;}
.stat-n{font-family:'Inter',sans-serif;font-weight:800;
  font-size:clamp(20px,2.8vw,38px);color:#fff;line-height:1;white-space:nowrap;
  text-shadow:0 2px 20px rgba(0,0,0,.4);}
.stat-l{font-family:'Exo 2',sans-serif;font-size:clamp(8px,.85vw,10px);font-weight:700;
  letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-top:5px;white-space:nowrap;}
.stat-sep{width:1px;height:32px;background:rgba(255,255,255,.2);flex-shrink:0;}

.scroll-hint{position:absolute;bottom:clamp(16px,3.5vh,28px);left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:6px;z-index:2;
  animation:fadeUp .85s ease 1.05s both;}
.scroll-hint span{font-family:'Exo 2',sans-serif;font-size:8px;letter-spacing:4px;
  text-transform:uppercase;color:rgba(255,255,255,.45);}
.scroll-line{width:1.5px;height:42px;background:linear-gradient(to bottom,rgba(255,255,255,.7),transparent);
  animation:scrollPulse 2s ease-in-out infinite;}

/* Wave */
.wave{position:relative;z-index:10;line-height:0;background:#002830;}
.wave svg{display:block;}

/* Content */
.content{background:linear-gradient(180deg,#e6fdff 0%,#f0feff 40%,#f8ffff 75%,#fffdf5 100%);position:relative;z-index:10;}
.sec{padding:clamp(60px,8vh,110px) clamp(16px,5vw,64px);max-width:1260px;margin:0 auto;}
.eyebrow{font-family:'Exo 2',sans-serif;font-size:clamp(9px,.9vw,11px);font-weight:800;letter-spacing:5px;
  text-transform:uppercase;color:#009eb0;margin-bottom:10px;}
.sh2{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(30px,4.5vw,62px);
  color:#003d46;line-height:1;margin-bottom:12px;}
.sh2 em{font-style:normal;color:#007a8a;}
.sdiv{width:60px;height:3px;border-radius:2px;background:linear-gradient(90deg,#007a8a,#00d4e8);
  margin-bottom:clamp(36px,5vh,56px);box-shadow:0 2px 14px rgba(0,180,200,.38);}
.reveal{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease;}
.revealed{opacity:1;transform:translateY(0);}

/* Program cards */
.pgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,248px),1fr));gap:clamp(14px,2vw,24px);}
.pcard{background:#fff;border-radius:18px;padding:clamp(22px,2.5vw,36px) clamp(18px,2vw,28px);
  border:2px solid rgba(0,180,200,.09);position:relative;overflow:hidden;
  transition:transform .4s,box-shadow .4s,border-color .4s;box-shadow:0 4px 24px rgba(0,180,200,.09);}
.pcard::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#007a8a,#00d4e8);transform:scaleX(0);transform-origin:left;transition:transform .5s;}
.pcard:hover{transform:translateY(-10px);box-shadow:0 22px 60px rgba(0,180,200,.2);border-color:rgba(0,180,200,.28);}
.pcard:hover::before{transform:scaleX(1);}
.pdeco{position:absolute;bottom:-14px;right:-8px;font-size:70px;opacity:.05;pointer-events:none;transition:opacity .4s,transform .4s;}
.pcard:hover .pdeco{opacity:.1;transform:scale(1.1) rotate(-8deg);}
.pba{display:inline-block;background:rgba(0,180,200,.08);color:#007a8a;font-family:'Exo 2',sans-serif;
  font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
  padding:4px 12px;border-radius:100px;margin-bottom:12px;border:1px solid rgba(0,180,200,.18);}
.pico{font-size:clamp(28px,3.5vw,44px);margin-bottom:8px;display:block;}
.pn{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(16px,1.9vw,22px);color:#003d46;margin-bottom:7px;}
.pd{font-size:clamp(12px,1.1vw,14px);color:rgba(0,61,70,.5);line-height:1.75;margin-bottom:14px;}
.pf{list-style:none;display:flex;flex-direction:column;gap:7px;}
.pf li{font-size:clamp(11px,1vw,13px);color:#006070;display:flex;align-items:center;gap:9px;font-weight:700;}
.pf li::before{content:'';width:6px;height:6px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,#007a8a,#00d4e8);box-shadow:0 0 7px rgba(0,212,232,.5);}

/* Pricing */
.price-shell{max-width:940px;margin:0 auto;background:#fff;border-radius:22px;
  border:2px solid rgba(0,180,200,.12);overflow:hidden;box-shadow:0 18px 60px rgba(0,180,200,.13);}
.ph{background:linear-gradient(135deg,#007a8a,#00d4e8);
  padding:clamp(16px,2vw,26px) clamp(18px,3vw,44px);
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.ph h3{font-family:'Playfair Display',serif;font-size:clamp(16px,1.8vw,22px);color:#fff;font-weight:900;}
.ph p{font-family:'Exo 2',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;color:rgba(255,255,255,.82);text-transform:uppercase;}
.pt-head{display:grid;grid-template-columns:1.6fr 1fr 1fr .9fr;
  padding:clamp(8px,1.2vw,13px) clamp(18px,3vw,44px);
  background:rgba(0,180,200,.04);border-bottom:1px solid rgba(0,180,200,.08);}
.pt-head span{font-family:'Exo 2',sans-serif;font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:rgba(0,150,170,.52);}
.pt-row{display:grid;grid-template-columns:1.6fr 1fr 1fr .9fr;
  padding:clamp(13px,1.8vw,20px) clamp(18px,3vw,44px);
  border-bottom:1px solid rgba(0,180,200,.05);align-items:center;transition:background .25s;}
.pt-row:last-of-type{border-bottom:none;}
.pt-row:hover{background:rgba(0,212,232,.04);}
.pnm{font-family:'Nunito',sans-serif;font-weight:800;font-size:clamp(12px,1.2vw,14px);color:#003d46;}
.pdr{font-family:'Nunito',sans-serif;font-size:clamp(11px,1vw,12px);color:rgba(0,61,70,.48);}
.ppr{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(18px,2vw,24px);color:#007a8a;}
.tag{display:inline-block;font-family:'Exo 2',sans-serif;font-size:9px;font-weight:800;
  letter-spacing:1.5px;padding:4px 10px;border-radius:100px;text-transform:uppercase;}
.t-open{background:rgba(0,180,200,.08);color:#007a8a;border:1px solid rgba(0,180,200,.22);}
.t-hot{background:rgba(255,214,0,.14);color:#9a7000;border:1px solid rgba(255,180,0,.28);}
.t-adv{background:rgba(0,212,232,.1);color:#007a8a;border:1px solid rgba(0,212,232,.28);}
.t-new{background:rgba(255,107,107,.1);color:#d93535;border:1px solid rgba(255,107,107,.28);}
.pt-note{padding:clamp(10px,1.5vh,15px) clamp(18px,3vw,44px);font-family:'Nunito',sans-serif;
  font-size:11px;color:rgba(0,150,170,.42);border-top:1px solid rgba(0,180,200,.06);font-style:italic;}
@media(max-width:580px){.pt-head{display:none;}.pt-row{grid-template-columns:1fr 1fr;gap:4px 0;padding:14px 18px;}.pnm{grid-column:1/-1;}}

/* Schedule */
.sched{display:grid;grid-template-columns:repeat(7,1fr);gap:clamp(6px,1vw,12px);max-width:900px;margin:0 auto;}
@media(max-width:620px){.sched{grid-template-columns:repeat(4,1fr);}}
.day{background:#fff;border:2px solid rgba(0,180,200,.1);border-radius:13px;
  padding:clamp(14px,2vw,22px) 8px;text-align:center;
  box-shadow:0 4px 18px rgba(0,180,200,.07);transition:all .35s;}
.day:hover{border-color:#00bcd4;transform:translateY(-8px);box-shadow:0 16px 42px rgba(0,180,200,.22);}
.de{font-size:clamp(16px,2vw,22px);margin-bottom:4px;}
.dn{font-family:'Exo 2',sans-serif;font-size:clamp(8px,.85vw,10px);font-weight:800;letter-spacing:2px;color:#007a8a;text-transform:uppercase;margin-bottom:4px;}
.dt{font-size:clamp(9px,.85vw,11px);color:rgba(0,61,70,.52);line-height:1.9;}

/* Reviews */
.rgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,268px),1fr));gap:clamp(14px,2vw,24px);}
.rcrd{background:#fff;border-radius:18px;border:2px solid rgba(0,180,200,.07);
  padding:clamp(22px,2.5vw,34px);box-shadow:0 4px 22px rgba(0,180,200,.07);
  position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s;}
.rcrd:hover{transform:translateY(-6px);box-shadow:0 18px 50px rgba(0,180,200,.16);}
.rcrd::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,#007a8a,#00d4e8);transform:scaleX(0);transform-origin:left;transition:transform .45s;}
.rcrd:hover::after{transform:scaleX(1);}
.rq{font-size:52px;line-height:0;color:rgba(0,180,200,.09);font-family:Georgia,serif;margin-bottom:14px;display:block;}
.rs{color:#ffd700;font-size:14px;margin-bottom:10px;letter-spacing:1px;}
.rt{font-size:clamp(13px,1.2vw,15px);color:#005f70;line-height:1.78;margin-bottom:16px;}
.ra{display:flex;align-items:center;gap:12px;}
.rav{width:40px;height:40px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,#007a8a,#00d4e8);
  display:flex;align-items:center;justify-content:center;
  font-family:'Playfair Display',serif;font-weight:900;font-size:16px;color:#fff;}
.ran{font-family:'Nunito',sans-serif;font-weight:800;color:#003d46;font-size:14px;}
.rad{font-size:11px;color:rgba(0,61,70,.42);}

/* Insights */
.igrid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2vw,22px);max-width:840px;margin:0 auto;}
@media(max-width:600px){.igrid{grid-template-columns:1fr;}}
.ic{background:#fff;border-radius:18px;padding:clamp(22px,2.5vw,32px);box-shadow:0 4px 20px rgba(0,0,0,.055);}
.ic.g{border:2px solid rgba(0,194,100,.14);}
.ic.w{border:2px solid rgba(255,107,107,.14);}
.ih{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(15px,1.6vw,19px);
  margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.ic.g .ih{color:#2e7d32;}
.ic.w .ih{color:#c0392b;}
.il{list-style:none;display:flex;flex-direction:column;gap:10px;}
.il li{font-size:clamp(12px,1.1vw,14px);color:#005f70;display:flex;gap:10px;line-height:1.65;font-weight:600;}

/* CTA */
.cta-wrap{position:relative;z-index:10;overflow:hidden;padding:clamp(60px,8vh,100px) clamp(16px,5vw,60px);}
.cta-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;}
.cta-box{max-width:860px;margin:0 auto;text-align:center;position:relative;z-index:2;}
.cta-box h2{font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(32px,5vw,64px);color:#fff;margin-bottom:12px;
  text-shadow:0 2px 30px rgba(0,0,0,.25);}
.cta-box>p{font-size:clamp(14px,1.4vw,18px);color:rgba(255,255,255,.88);
  margin-bottom:clamp(28px,4vh,48px);font-weight:500;}
.cta-meta{display:flex;gap:clamp(16px,2.5vw,44px);justify-content:center;flex-wrap:wrap;
  margin-bottom:clamp(32px,4vh,52px);}
.cta-item{display:flex;align-items:center;gap:9px;
  font-size:clamp(12px,1.2vw,15px);color:rgba(255,255,255,.92);font-weight:700;
  background:rgba(255,255,255,.12);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.25);border-radius:100px;
  padding:10px 20px;}
.enroll{display:inline-block;
  padding:clamp(16px,2vw,22px) clamp(48px,6vw,88px);
  font-family:'Exo 2',sans-serif;font-weight:900;font-size:clamp(12px,1.2vw,15px);
  letter-spacing:4px;text-transform:uppercase;
  text-decoration:none;background:#fff;color:#006070;border-radius:8px;
  box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 0 rgba(255,255,255,.4);
  transition:all .36s;position:relative;overflow:hidden;}
.enroll::after{content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(0,212,232,.15),transparent);
  opacity:0;transition:opacity .3s;}
.enroll:hover{transform:scale(1.06) translateY(-4px);
  box-shadow:0 22px 56px rgba(0,0,0,.3),0 0 0 6px rgba(255,255,255,.15);color:#004a56;}
.enroll:hover::after{opacity:1;}

/* Footer */
.footer{background:#002830;padding:clamp(28px,4vh,48px) clamp(16px,5vw,48px);text-align:center;position:relative;z-index:10;}
.footer p{font-size:12px;color:rgba(255,255,255,.3);letter-spacing:1px;line-height:2.6;}
.footer a{color:rgba(0,212,232,.6);text-decoration:none;transition:color .3s;}
.footer a:hover{color:#00d4e8;}
.footer-socials{display:flex;justify-content:center;gap:10px;margin-top:16px;}
.footer-social-btn{width:40px;height:40px;border-radius:11px;
  background:#fff;border:1px solid rgba(255,255,255,.15);
  display:flex;align-items:center;justify-content:center;
  text-decoration:none;transition:all .25s cubic-bezier(.25,.46,.45,.94);
  box-shadow:0 2px 10px rgba(0,0,0,.2);}
.footer-social-btn:hover{transform:translateY(-4px) scale(1.1);}
.footer-social-btn:nth-child(1):hover{box-shadow:0 8px 22px rgba(214,36,159,.45);}
.footer-social-btn:nth-child(2):hover{box-shadow:0 8px 22px rgba(255,0,0,.45);}
.footer-social-btn:nth-child(3):hover{box-shadow:0 8px 22px rgba(24,119,242,.45);}

/* Cursor */
.cur{width:22px;height:22px;border:2px solid #00bcd4;border-radius:50%;position:fixed;pointer-events:none;z-index:9999;
  transform:translate(-50%,-50%);transition:width .2s,height .2s,background .2s;
  box-shadow:0 0 20px rgba(0,212,232,.5);}
.cur.big{width:40px;height:40px;background:rgba(0,212,232,.12);}
.dot{width:5px;height:5px;background:#00bcd4;border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);}
@keyframes waPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}50%{box-shadow:0 0 0 12px rgba(37,211,102,0)}}
.wa-fab{position:fixed;bottom:clamp(24px,4vh,36px);right:clamp(20px,3vw,32px);z-index:500;
  width:58px;height:58px;border-radius:50%;background:#25D366;
  display:flex;align-items:center;justify-content:center;text-decoration:none;
  box-shadow:0 6px 24px rgba(37,211,102,.45);
  animation:waPulse 2.4s ease-in-out infinite;
  transition:transform .25s cubic-bezier(.25,.46,.45,.94),box-shadow .25s;}
.wa-fab:hover{transform:scale(1.12);animation:none;box-shadow:0 12px 36px rgba(37,211,102,.6);}
.wa-fab svg{width:32px;height:32px;}

/* COACH SECTION */
@keyframes ringRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes coachGlow{0%,100%{box-shadow:0 0 0 6px rgba(0,212,232,.08),0 0 40px rgba(0,212,232,.15)}
  50%{box-shadow:0 0 0 10px rgba(0,212,232,.12),0 0 60px rgba(0,212,232,.28)}}

.coach-sec{text-align:center;}
.coach-card{max-width:980px;margin:0 auto;
  display:grid;grid-template-columns:260px 1fr;gap:clamp(32px,5vw,64px);
  align-items:start;text-align:left;
  background:linear-gradient(145deg,#001c24,#002530);
  border:1px solid rgba(0,212,232,.25);border-radius:24px;
  padding:clamp(28px,4vw,52px);
  box-shadow:0 24px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(0,212,232,.15);}
@media(max-width:720px){.coach-card{grid-template-columns:1fr;text-align:center;}}

/* Photo col */
.coach-photo-col{display:flex;flex-direction:column;align-items:center;gap:20px;}
.coach-ring-outer{position:relative;width:200px;height:200px;flex-shrink:0;}
.coach-ring-svg{position:absolute;inset:-12px;width:calc(100% + 24px);height:calc(100% + 24px);
  animation:ringRotate 12s linear infinite;}
.coach-ring-inner{width:200px;height:200px;border-radius:50%;overflow:hidden;
  border:3px solid #00d4e8;
  animation:coachGlow 3s ease-in-out infinite;}
/* Real photo — 1:1 square cropped to circle */
.coach-img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block;}
.coach-img-placeholder{width:100%;height:100%;
  background:linear-gradient(135deg,#003d4d,#006070);
  display:flex;align-items:center;justify-content:center;font-size:80px;}
.coach-stats-col{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
.coach-stat-pill{background:rgba(0,212,232,.12);border:1px solid rgba(0,212,232,.3);
  border-radius:12px;padding:10px 16px;text-align:center;min-width:110px;}
.csp-val{display:block;font-size:24px;font-weight:800;color:#00d4e8;line-height:1;}
.csp-lbl{display:block;font-size:9px;font-weight:700;letter-spacing:1.5px;
  text-transform:uppercase;color:rgba(255,255,255,.55);margin-top:5px;}

/* Info col */
.coach-info-col{display:flex;flex-direction:column;gap:0;}
.coach-tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:3px;
  text-transform:uppercase;color:#00d4e8;
  background:rgba(0,212,232,.15);border:1px solid rgba(0,212,232,.35);
  padding:5px 14px;border-radius:100px;margin-bottom:12px;width:fit-content;}
.coach-name-big{font-family:'Playfair Display',serif;font-weight:900;
  font-size:clamp(26px,3.5vw,42px);color:#ffffff;letter-spacing:-.5px;
  line-height:1.1;margin-bottom:6px;
  text-shadow:0 2px 20px rgba(0,212,232,.3);}
.coach-location{font-size:12px;color:rgba(255,255,255,.55);
  letter-spacing:.5px;margin-bottom:24px;}
.coach-creds{display:flex;flex-direction:column;gap:10px;margin-bottom:28px;}
.coach-cred-row{display:flex;align-items:center;gap:14px;
  background:rgba(0,0,0,.3);border:1px solid rgba(0,212,232,.18);
  border-radius:12px;padding:12px 16px;transition:all .3s;}
.coach-cred-row:hover{background:rgba(0,212,232,.12);border-color:rgba(0,212,232,.4);
  transform:translateX(4px);}
.coach-cred-icon{font-size:22px;flex-shrink:0;}
.coach-cred-label{font-size:13px;font-weight:700;color:#ffffff;margin-bottom:2px;}
.coach-cred-sub{font-size:11px;color:rgba(255,255,255,.5);letter-spacing:.3px;}
.coach-linkedin-btn{display:inline-flex;align-items:center;gap:7px;
  background:#0A66C2;color:#fff;font-size:11px;font-weight:700;letter-spacing:.5px;
  padding:9px 18px;border-radius:8px;text-decoration:none;width:fit-content;
  transition:all .28s;box-shadow:0 4px 14px rgba(10,102,194,.4);}
.coach-linkedin-btn:hover{transform:translateY(-3px);background:#0854a0;
  box-shadow:0 8px 24px rgba(10,102,194,.55);}
`;

const PROGRAMS=[
  {badge:"Beginner · Age 4+",icon:"🐣",deco:"🐠",name:"Aqua Starter",desc:"Get comfortable in water through fun, safe exercises and guided breathing — perfect for first-timers.",feats:["Water acclimatisation","Basic floating & kicking","Breathing techniques","Pool safety training"]},
  {badge:"Intermediate · Age 6+",icon:"🏊",deco:"🐙",name:"Stroke Mastery",desc:"Master all four competitive strokes with correct form, flip turns, and endurance building.",feats:["Freestyle & Backstroke","Breaststroke & Butterfly","Flip turns & starts","Lap endurance training"]},
  {badge:"Advanced · Competitive",icon:"🏆",deco:"🦈",name:"Champions Track",desc:"Race strategy, speed training and competition-level technique for serious swimmers.",feats:["Race tactics & strategy","Advanced stroke drills","Timed assessments","Competition prep"]},
  {badge:"Women Only · All Ages",icon:"👩",deco:"🧜",name:"Ladies Aqua",desc:"Exclusive women-only batches in a safe, comfortable and supportive environment.",feats:["Women-only sessions","Fitness & leisure swim","Flexible timings","All levels welcome"]},
];
const PRICES=[
  {name:"Aqua Starter (Kids)",   dur:"45 min / session",  price:"₹1,200",tag:"t-open",lbl:"Open"},
  {name:"Beginner (Adult)",      dur:"45 min / session",  price:"₹1,500",tag:"t-hot", lbl:"Popular"},
  {name:"Intermediate Program",  dur:"60 min / session",  price:"₹1,800",tag:"t-open",lbl:"Open"},
  {name:"Ladies Exclusive Batch",dur:"45 min / session",  price:"₹1,400",tag:"t-hot", lbl:"Popular"},
  {name:"Champions Track",       dur:"90 min / session",  price:"₹2,500",tag:"t-adv", lbl:"Advanced"},
  {name:"Summer Crash Camp",     dur:"Seasonal · 1 month",price:"₹3,000",tag:"t-new", lbl:"Camp"},
];
const DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const REVIEWS=[
  {ini:"C",name:"Charan",date:"April 2019",text:"Very Good Coaching — professionals who are patient and encouraging. Perfect for beginners of any age."},
  {ini:"P",name:"Pradeep",date:"October 2024",text:"Excellent coaching staff. My kids genuinely look forward to morning sessions. Clean pool and well-maintained."},
  {ini:"S",name:"Sahana",date:"March 2024",text:"Great place to learn swimming. Supportive, experienced instructors. Highly recommend for all age groups!"},
];

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
      d.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:6px;height:6px;border:1.5px solid rgba(0,212,232,.7);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%) scale(0);animation:ripOut .6s ease-out forwards;`;
      document.body.appendChild(d);setTimeout(()=>d.remove(),700);
    };
    document.addEventListener("click",ck);
    return()=>{document.removeEventListener("mousemove",mv);document.removeEventListener("click",ck);cancelAnimationFrame(raf);};
  },[]);
  return <><div ref={curRef} className="cur"/><div ref={dotRef} className="dot"/></>;
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

const STATS=[{n:"310+",l:"Happy Swimmers"},{n:"4.4★",l:"JD Rating"},{n:"7 Days",l:"Open Weekly"},{n:"6 AM",l:"Opens Daily"}];

/* ─── Animated Water Canvas for CTA ─── */
function CtaCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cvs = ref.current, ctx = cvs.getContext('2d');
    let W, H, raf, fr = 0;
    const resize = () => { W = cvs.width = cvs.offsetWidth; H = cvs.height = cvs.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Wave layers
    const waves = [
      { y:.55, amp:22, spd:.018, ph:0,   col:'rgba(0,212,232,.55)',  lw:0 },
      { y:.62, amp:18, spd:.013, ph:1.8, col:'rgba(0,188,212,.45)',  lw:0 },
      { y:.70, amp:28, spd:.009, ph:0.9, col:'rgba(0,160,180,.50)',  lw:0 },
      { y:.78, amp:16, spd:.015, ph:2.4, col:'rgba(0,137,150,.55)',  lw:0 },
      { y:.88, amp:20, spd:.011, ph:3.5, col:'rgba(0,100,115,.60)',  lw:0 },
      { y:.96, amp:10, spd:.020, ph:1.1, col:'rgba(0,70,85,.70)',    lw:0 },
    ];

    // Bubbles
    const bubs = Array.from({length:22}, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random()*5+2,
      vy: -(Math.random()*.3+.1),
      vx: (Math.random()-.5)*.15,
      life: Math.random(),
    }));
    const mkB = () => ({ x:Math.random(), y:1.05, r:Math.random()*5+2, vy:-(Math.random()*.3+.1), vx:(Math.random()-.5)*.15, life:1 });

    // Caustic patches
    const caustics = Array.from({length:12}, () => ({
      x: Math.random(), y: .5+Math.random()*.5,
      rx: 40+Math.random()*60, ry: 15+Math.random()*25,
      spd: .004+Math.random()*.006, ph: Math.random()*Math.PI*2,
    }));

    const loop = () => {
      raf = requestAnimationFrame(loop); fr++;
      ctx.clearRect(0, 0, W, H);

      // Deep gradient base
      const bg = ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,   '#004d5e');
      bg.addColorStop(0.4, '#006d7a');
      bg.addColorStop(0.7, '#00919e');
      bg.addColorStop(1,   '#00bcd4');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      // Overhead light glow
      const lg = ctx.createRadialGradient(W*.5, 0, 0, W*.5, 0, W*.65);
      lg.addColorStop(0, 'rgba(180,255,255,.18)');
      lg.addColorStop(1, 'transparent');
      ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);

      // Caustic shimmer patches
      caustics.forEach(c => {
        c.ph += c.spd;
        const cx = c.x*W, cy = c.y*H;
        const wobble = Math.sin(c.ph)*.35+1;
        const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,c.rx*wobble);
        cg.addColorStop(0, 'rgba(255,255,255,.14)');
        cg.addColorStop(.6,'rgba(180,255,255,.05)');
        cg.addColorStop(1, 'transparent');
        ctx.save();
        ctx.scale(1, c.ry/(c.rx*wobble));
        ctx.beginPath();
        ctx.arc(cx, cy/(c.ry/(c.rx*wobble)), c.rx*wobble, 0, Math.PI*2);
        ctx.fillStyle = cg; ctx.fill();
        ctx.restore();
      });

      // Animated waves from bottom up
      waves.forEach(wv => {
        wv.ph += wv.spd;
        ctx.beginPath();
        ctx.moveTo(0, wv.y*H);
        for(let x=0; x<=W; x+=3){
          const y = wv.y*H + Math.sin(x*.009+wv.ph)*wv.amp + Math.sin(x*.018+wv.ph*.7)*wv.amp*.4;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        ctx.fillStyle = wv.col; ctx.fill();
      });

      // Bubbles rising
      bubs.forEach((b,i) => {
        b.y += b.vy/H; b.x += b.vx/W; b.life -= .004;
        if(b.y < -0.02 || b.life <= 0) bubs[i] = mkB();
        const bx=b.x*W, by=b.y*H;
        ctx.beginPath(); ctx.arc(bx, by, b.r, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(255,255,255,${b.life*.5})`; ctx.lineWidth=1.2; ctx.stroke();
        ctx.beginPath(); ctx.arc(bx-b.r*.3, by-b.r*.3, b.r*.3, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${b.life*.4})`; ctx.fill();
      });

      // Surface shimmer line
      if(fr%3===0){
        const sy=(fr*1.2)%H;
        const sg=ctx.createLinearGradient(0,sy,W,sy+2);
        sg.addColorStop(0,'transparent'); sg.addColorStop(.5,'rgba(255,255,255,.04)'); sg.addColorStop(1,'transparent');
        ctx.fillStyle=sg; ctx.fillRect(0,sy,W,2);
      }
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="cta-canvas"/>;
}

export default function App(){
  useReveal();
  return(
    <div className="sw">
      <style>{CSS}</style>
      <Cursor/>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">🏆 Gold Sports <em>Academy</em></a>
        <span className="nav-pill">Swimming Classes</span>
        <a href="/" className="nav-back">← Back</a>
      </nav>

      {/* ══ HERO — fullscreen slow-motion diver video ══ */}
      <section className="hero">
        <video className="hero-vid" autoPlay muted loop playsInline>
          <source src="/src/assets/swim1.mp4" type="video/mp4"/>
        </video>
        <div className="hero-overlay"/>

        <div className="hero-body">
          {/* rating pill */}
          <div className="hero-pill">⭐ 4.4 Rated &nbsp;·&nbsp; Kengeri, Bangalore &nbsp;·&nbsp; Est. 2019</div>

          {/* headline */}
          <h1 style={{lineHeight:.9,marginBottom:0}}>
            <span className="hero-h1-top">Dive Into</span>
            <span className="hero-h1-bot">Excellence</span>
          </h1>

          <p className="hero-sub">Professional swimming training for all ages — from first splash to champion strokes, guided by expert coaches.</p>

          {/* CTA buttons */}
          <div className="hero-btns">
            <a href="#pricing" className="btn-solid">🏊 View Pricing</a>
            <a href="#programs" className="btn-ghost">Explore Programs</a>
          </div>

          {/* Stats — floating text, no background box */}
          <div className="hero-stats">
            {STATS.map((s,i)=>(
              <div key={i} style={{display:"contents"}}>
                {i>0 && <div className="stat-sep"/>}
                <div className="stat-item">
                  <div className="stat-n">{s.n}</div>
                  <div className="stat-l">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* Wave */}
      <div className="wave">
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width:"100%",display:"block"}}>
          <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#e6fdff"/>
        </svg>
      </div>

      {/* Content */}
      <div className="content">
        {/* Programs */}
        <section className="sec" id="programs">
          <div className="eyebrow reveal">— Our Programs —</div>
          <h2 className="sh2 reveal">Swimming <em>Courses</em></h2>
          <div className="sdiv reveal"/>
          <div className="pgrid">
            {PROGRAMS.map((p,i)=>(
              <div key={i} className="pcard reveal">
                <div className="pdeco">{p.deco}</div>
                <span className="pba">{p.badge}</span>
                <span className="pico">{p.icon}</span>
                <div className="pn">{p.name}</div>
                <div className="pd">{p.desc}</div>
                <ul className="pf">{p.feats.map((f,j)=><li key={j}>{f}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="sec" id="pricing" style={{paddingTop:0}}>
          <div className="eyebrow reveal">— Fee Structure —</div>
          <h2 className="sh2 reveal">Swim <em>Pricing</em></h2>
          <div className="sdiv reveal"/>
          <div className="price-shell reveal">
            <div className="ph"><h3>🌊 Swimming Fee Structure</h3><p>Monthly · Kengeri Pool</p></div>
            <div className="pt-head"><span>Program</span><span>Duration</span><span>Monthly Fee</span><span>Status</span></div>
            {PRICES.map((r,i)=>(
              <div key={i} className="pt-row">
                <div className="pnm">{r.name}</div>
                <div className="pdr">{r.dur}</div>
                <div className="ppr">{r.price}</div>
                <div><span className={`tag ${r.tag}`}>{r.lbl}</span></div>
              </div>
            ))}
            <div className="pt-note">* Indicative pricing. Contact academy for exact fees.</div>
          </div>
        </section>

        {/* Schedule */}
        <section className="sec" id="schedule" style={{paddingTop:0}}>
          <div className="eyebrow reveal">— Open Every Day —</div>
          <h2 className="sh2 reveal">Pool <em>Timings</em></h2>
          <div className="sdiv reveal"/>
          <div className="sched">
            {DAYS.map((d,i)=>(
              <div key={i} className="day reveal">
                <div className="de">🌊</div>
                <div className="dn">{d}</div>
                <div className="dt">6:00 AM<br/>–<br/>8:00 PM</div>
              </div>
            ))}
          </div>
        </section>

        {/* COACH SECTION */}
        <section className="sec coach-sec" id="coach" style={{paddingTop:0}}>
          <div className="eyebrow reveal">— Meet Your Coach —</div>
          <h2 className="sh2 reveal">The <em>Expert</em> Behind Every Stroke</h2>
          <div className="sdiv reveal"/>

          <div className="coach-card reveal">
            {/* LEFT — photo + glow ring */}
            <div className="coach-photo-col">
              <div className="coach-ring-outer">
                <div className="coach-ring-inner">
                  <img src="/src/assets/coach_img.png" className="coach-img" alt="Lakshman HK - Head Coach Gold Sports Academy"/>
                </div>
                <svg className="coach-ring-svg" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="94" fill="none" stroke="url(#ringGrad)" strokeWidth="2.5" strokeDasharray="12 6" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d4e8" stopOpacity="0.8"/>
                      <stop offset="50%" stopColor="#00d4e8" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#00d4e8" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {/* stat pills under photo */}
              <div className="coach-stats-col">
                <div className="coach-stat-pill">
                  <span className="csp-val">310+</span>
                  <span className="csp-lbl">Swimmers Trained</span>
                </div>
                <div className="coach-stat-pill">
                  <span className="csp-val">5+</span>
                  <span className="csp-lbl">Years Coaching</span>
                </div>
              </div>
            </div>

            {/* RIGHT — info */}
            <div className="coach-info-col">
              <div className="coach-tag">Head Coach &amp; Founder</div>
              <div className="coach-name-big">Lakshman H K</div>
              <div className="coach-location">📍 Gold Sports Academy, Kengeri, Bengaluru</div>

              <div className="coach-creds">
                {[
                  { icon:"🏊", label:"Head Coach & Founder", sub:"Gold Sports Academy" },
                  { icon:"🎓", label:"ASCA Certified Level 2", sub:"American Swimming Coaches Association" },
                  { icon:"🌐", label:"Internationally Certified Coach", sub:"Global Swimming Standards" },
                  { icon:"🛟", label:"Advance Lifeguarding", sub:"Certified Water Safety" },
                  { icon:"❤️", label:"CPR Certified", sub:"Emergency Response Ready" },
                ].map((c,i) => (
                  <div key={i} className="coach-cred-row">
                    <div className="coach-cred-icon">{c.icon}</div>
                    <div>
                      <div className="coach-cred-label">{c.label}</div>
                      <div className="coach-cred-sub">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/in/lakshman-hk-5058a43b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="coach-linkedin-btn"
              >
                <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                View LinkedIn Profile ↗
              </a>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="sec" id="reviews" style={{paddingTop:0}}>
          <div className="eyebrow reveal">— 310+ Reviews —</div>
          <h2 className="sh2 reveal">Member <em>Stories</em></h2>
          <div className="sdiv reveal"/>
          <div className="rgrid">
            {REVIEWS.map((r,i)=>(
              <div key={i} className="rcrd reveal">
                <span className="rq">"</span>
                <div className="rs">★★★★★</div>
                <div className="rt">{r.text}</div>
                <div className="ra">
                  <div className="rav">{r.ini}</div>
                  <div><div className="ran">{r.name}</div><div className="rad">{r.date}</div></div>
                </div>
              </div>
            ))}
          </div>

        </section>
      </div>

      {/* CTA with animated water */}
      <div className="cta-wrap">
        <CtaCanvas/>
        <div className="cta-box reveal">
          <h2>Ready to Dive In? 🏊</h2>
          <p>Join 300+ swimmers at Gold Sports Academy, Kengeri, Bangalore</p>
          <div className="cta-meta">
            <div className="cta-item">📍 No.25, Near Bandematt Arch, BSM Layout, Kengeri</div>
            <div className="cta-item">📞 9148873516 / 91488867178</div>
            <div className="cta-item">🕕 Daily 6:00 AM – 8:00 PM</div>
          </div>
          <a href="tel:9148873516" className="enroll">📞 Enroll Now</a>
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 Gold Sports Academy · No.25, Near Bandematt Arch, BSM Layout, Kengeri, Bangalore 560060</p>
        <p>GSTIN: 29AIXPL3817F3ZP &nbsp;·&nbsp; <a href="#">→ Badminton Classes</a> &nbsp;·&nbsp; <a href="#">← Home</a></p>
        <div className="footer-socials">
          {/* Instagram — branded gradient */}
          <a href="https://www.instagram.com/gold.sportsacademy/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Instagram">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <defs>
                <radialGradient id="sw-ig" cx="30%" cy="107%" r="150%">
                  <stop offset="0%" stopColor="#fdf497"/>
                  <stop offset="45%" stopColor="#fd5949"/>
                  <stop offset="60%" stopColor="#d6249f"/>
                  <stop offset="90%" stopColor="#285AEB"/>
                </radialGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#sw-ig)"/>
              <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.8" fill="none"/>
              <circle cx="17.3" cy="6.7" r="1.1" fill="#fff"/>
            </svg>
          </a>
          {/* YouTube — branded red */}
          <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="YouTube">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <rect x="0" y="0" width="24" height="24" rx="5" fill="#FF0000"/>
              <path d="M19.6 8.2a1.96 1.96 0 0 0-1.38-1.39C16.9 6.5 12 6.5 12 6.5s-4.9 0-6.22.31A1.96 1.96 0 0 0 4.4 8.2C4.1 9.53 4.1 12 4.1 12s0 2.47.3 3.8a1.96 1.96 0 0 0 1.38 1.39C7.1 17.5 12 17.5 12 17.5s4.9 0 6.22-.31a1.96 1.96 0 0 0 1.38-1.39c.3-1.33.3-3.8.3-3.8s0-2.47-.3-3.8z" fill="#fff"/>
              <polygon points="10.2,14.7 15.1,12 10.2,9.3" fill="#FF0000"/>
            </svg>
          </a>
          {/* Facebook — branded blue */}
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Facebook">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <rect x="0" y="0" width="24" height="24" rx="5" fill="#1877F2"/>
              <path d="M16.5 8h-2c-.3 0-.5.2-.5.5V10h2.5l-.4 2.5H14V19h-2.5v-6.5H10V10h1.5V8.5C11.5 6.6 12.8 5.5 14.5 5.5c.8 0 1.6.1 2 .1V8z" fill="#fff"/>
            </svg>
          </a>
          {/* WhatsApp — floating FAB handles this */}
        </div>
      </footer>
      {/* WHATSAPP FLOATING BUTTON */}
      <a href="https://wa.me/919148873516?text=Hi%2C%20I%20am%20interested%20in%20Swimming%20Classes%20at%20Gold%20Sports%20Academy%2C%20Kengeri.%20Could%20you%20please%20share%20the%20batch%20timings%2C%20fees%20and%20available%20slots%3F%20Thank%20you!" target="_blank" rel="noopener noreferrer" className="wa-fab" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}