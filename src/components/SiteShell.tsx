import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, MessageCircle, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '../data/properties';

const nav = [
  ['Home','/'],['Properties','/properties'],['Projects','/projects'],['Services','/services'],['About','/about'],['Contact','/contact'],
];

export function Brand() {
  return <Link href="/" className="brand" aria-label="Falcon Ventures home" data-testid="link-brand"><span className="brand-mark"><span>F</span></span><span className="brand-name">Falcon Ventures<small>Since 1986 · Lahore</small></span></Link>;
}

export function Header() {
  const [location] = useLocation();
  const [open,setOpen] = useState(false);
  useEffect(()=>setOpen(false),[location]);
  return <header className={`topbar ${location === '/' ? '' : 'solid'}`}>
    <Brand/>
    <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} data-testid="button-mobile-menu">{open?<X size={23}/>:<Menu size={23}/>}</button>
    <nav className={`nav-links ${open?'open':''}`} aria-label="Main navigation">
      {nav.map(([label,path])=><Link key={path} href={path} className={location===path?'active':''} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</Link>)}
      <Link href="/contact" className="nav-contact" data-testid="link-nav-inquire">Start a conversation <ArrowUpRight size={13}/></Link>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand"><Brand/><p>A Lahore-based company established in 1986, with interests and expertise across real estate, engineering, construction, hospitality, mining and investment.</p></div>
      <div><h4>Explore</h4><div className="footer-links">{nav.slice(1).map(([label,path])=><Link key={path} href={path}>{label}</Link>)}</div></div>
      <div><h4>Our focus</h4><div className="footer-links"><Link href="/services">Real estate</Link><Link href="/services">Turnkey execution</Link><Link href="/services">Joint ventures</Link><Link href="/projects">Demo listings</Link></div></div>
      <div><h4>Find us</h4><div className="footer-links"><span>Suite #704, Al-Hafeez Mall,<br/>Main Boulevard, Gulberg, Lahore</span><a href="tel:+923234099786">+92 323 4099786</a><a href={whatsappUrl('Hello Falcon Ventures, I would like to get in touch.')} target="_blank" rel="noreferrer">WhatsApp inquiry ↗</a></div></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Falcon Ventures Pvt. Ltd.</span><span>All property listings on this demonstration are subject to verification.</span></div>
  </footer>;
}

export function FloatingWhatsApp() {
  return <a className="wa-float" href={whatsappUrl('Hello Falcon Ventures, I would like to make a general inquiry.')} target="_blank" rel="noreferrer" aria-label="Contact Falcon Ventures on WhatsApp" data-testid="link-floating-whatsapp"><MessageCircle size={18}/><span>WhatsApp</span></a>;
}

export function SiteLayout({children}:{children:ReactNode}) {
  useEffect(()=>{ window.scrollTo({top:0,behavior:'auto'}); },[]);
  useEffect(()=>{
    if(!('IntersectionObserver' in window)) return;
    const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}
    }),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
    const observe=()=>document.querySelectorAll('.section, .page-hero, .property-card, .project-card').forEach(node=>{
      if(!node.classList.contains('scroll-in')){node.classList.add('scroll-in');reveal.observe(node);}
    });
    observe();
    const mutations=new MutationObserver(observe);
    mutations.observe(document.querySelector('.site-shell')||document.body,{childList:true,subtree:true});
    return()=>{mutations.disconnect();reveal.disconnect();};
  },[]);
  return <div className="site-shell"><Header/>{children}<Footer/><FloatingWhatsApp/></div>;
}

export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description:string}) {
  return <section className="page-hero"><div className="crumb"><Link href="/">Home</Link> &nbsp; / &nbsp; {eyebrow}</div><div className="eyebrow" style={{marginTop:30}}>{eyebrow}</div><h1>{title}</h1><p>{description}</p></section>;
}

export function AddressBlock() {
  return <><div className="contact-row"><MapPin size={17}/><div><b>Head office</b><span>Suite #704, Al-Hafeez Mall, Main Boulevard,<br/>Gulberg, Lahore, Punjab 54000, Pakistan</span></div></div><div className="contact-row"><Phone size={17}/><div><b>Call or WhatsApp</b><a href="tel:+923234099786">+92 323 4099786</a></div></div></>;
}
