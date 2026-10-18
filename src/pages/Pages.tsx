import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle, Search, Send } from 'lucide-react';
import { properties, formatPrice, inquiryMessage, whatsappUrl, DEMO_LABEL } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { AddressBlock, PageIntro } from '../components/SiteShell';

function usePageMeta(title:string,description:string) {
  useEffect(()=>{
    document.title=`${title} | Falcon Ventures Pvt. Ltd.`;
    let meta=document.querySelector('meta[name="description"]') as HTMLMetaElement|null;
    if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta);}
    meta.content=description;
    let og=document.querySelector('meta[property="og:title"]') as HTMLMetaElement|null;
    if(!og){og=document.createElement('meta');og.setAttribute('property','og:title');document.head.appendChild(og);}
    og.content=document.title;
    window.scrollTo({top:0,behavior:'auto'});
  },[title,description]);
}

function DemoNotice() { return <div className="notice"><strong>{DEMO_LABEL}.</strong> All property details, locations and displayed prices are illustrative proposal content. They are not confirmed, verified or represented as owned by Falcon Ventures Pvt. Ltd. Please verify independently before making any decision.</div>; }

export function HomePage() {
  usePageMeta('Property, Investment & Enterprise Since 1986','Falcon Ventures Pvt. Ltd. is a Lahore-based company established in 1986, with expertise spanning real estate, investment, engineering, construction, hospitality and mining.');
  useEffect(()=>{
    const parallax=()=>document.querySelector('.hero')?.setAttribute('style',`--scroll-offset:${Math.min(window.scrollY*.14,85)}px`);
    window.addEventListener('scroll',parallax,{passive:true}); return()=>window.removeEventListener('scroll',parallax);
  },[]);
  return <main>
    <section className="hero">
      <div className="hero-content"><div className="eyebrow">Lahore · Pakistan · Established 1986</div><h1>Built on <em>perspective.</em><br/>Focused on what’s next.</h1><p className="hero-copy">A diversified Pakistani enterprise bringing a considered approach to real estate, investment and the built environment.</p><div className="hero-actions"><Link href="/properties" className="btn btn-gold">Explore demo listings <ArrowRight size={15}/></Link><Link href="/about" className="btn btn-outline">Our story <ArrowUpRight size={14}/></Link></div></div>
      <div className="hero-note">A perspective shaped over decades</div><div className="hero-bottom"><span><strong>Falcon Ventures Pvt. Ltd.</strong> &nbsp; Corporate profile</span><span>Scroll to explore &nbsp; ↓</span></div>
    </section>
    <section className="section ivory">
      <div className="section-heading"><div><div className="kicker">Curated opportunities · Proposal demo</div><h2>Places with<br/>possibility.</h2></div><p>Explore a selection of illustrative real estate opportunities inspired by Pakistan’s distinctive urban markets. Every listing is a demo, subject to verification.</p></div>
      <div className="listing-grid">{properties.slice(0,3).map(p=><PropertyCard key={p.id} property={p}/>)}</div>
      <div style={{textAlign:'center',marginTop:36}}><Link className="btn btn-outline" href="/properties">View all demo listings <ArrowRight size={14}/></Link></div>
    </section>
    <section className="heritage">
      <div className="heritage-image" role="img" aria-label="Modern architecture surrounded by greenery"></div>
      <div className="heritage-copy"><div className="kicker">A longer view</div><h2>Established in Lahore.<br/>Thinking across horizons.</h2><p>Since 1986, Falcon Ventures has brought together capabilities across engineering, construction, hospitality, mining, turnkey execution, real estate, joint ventures and investment.</p><Link className="btn btn-gold" href="/about">Discover Falcon Ventures <ArrowRight size={14}/></Link><div className="year-mark">1986</div></div>
    </section>
    <section className="section forest">
      <div className="statement"><div className="eyebrow">More than one perspective</div><blockquote>“We see value in the spaces <em>between disciplines.</em>”</blockquote><p>Our company profile reflects an enterprise with interests across connected industries — from the built environment to natural resources and media.</p></div>
      <div className="stats-row"><div className="stat"><b>1986</b><span>Established in Lahore</span></div><div className="stat"><b>05</b><span>Associated companies</span></div><div className="stat"><b>08</b><span>Areas of expertise</span></div><div className="stat"><b>PK</b><span>Rooted in Pakistan</span></div></div>
    </section>
    <section className="section">
      <div className="section-heading"><div><div className="kicker">What we bring to the table</div><h2>One company.<br/>Connected capabilities.</h2></div><p>Our work spans sectors and delivery models — bringing distinct experience to each conversation.</p></div>
      <div className="service-grid">{['Real estate & investment','Engineering & construction','Turnkey execution','Hospitality','Mining & refining','Joint ventures'].map((x,i)=><div className="service-item" key={x}><span className="service-index">0{i+1}</span><h3>{x}</h3><p>Expertise and interests as described in the supplied company profile.</p></div>)}</div>
      <div style={{marginTop:35}}><Link href="/services" className="btn btn-outline">Explore our services <ArrowRight size={14}/></Link></div>
    </section>
    <section className="section ivory">
      <div className="section-heading"><div><div className="kicker">Make the first move</div><h2>Start with a<br/>conversation.</h2></div><p>Whether you’re exploring a property proposal, a project discussion or a new investment conversation, reach our Lahore office directly.</p></div>
      <Link href="/contact" className="btn btn-gold">Contact Falcon Ventures <ArrowRight size={14}/></Link>
    </section>
  </main>;
}

export function PropertiesPage() {
  usePageMeta('Property Opportunities','Browse illustrative property listings across Lahore, DHA Lahore, Gulberg, Islamabad and Bahria Town. Demo listings are subject to verification.');
  const [query,setQuery]=useState(''); const [location,setLocation]=useState(''); const [type,setType]=useState(''); const [budget,setBudget]=useState('');
  const locations=useMemo(()=>Array.from(new Set(properties.map(p=>p.city))),[]);
  const types=useMemo(()=>Array.from(new Set(properties.map(p=>p.type))),[]);
  const filtered=properties.filter(p=>(!query||`${p.title} ${p.location} ${p.type}`.toLowerCase().includes(query.toLowerCase()))&&(!location||p.city===location)&&(!type||p.type===type)&&(!budget||p.price<=Number(budget)));
  return <main>
    <PageIntro eyebrow="Property opportunities" title="A portfolio of possibilities." description="Explore illustrative property opportunities across Pakistan’s distinctive urban markets. Search, refine and start a conversation about any listing."/>
    <section className="section">
      <DemoNotice/>
      <div className="filters">
        <label><span className="sr-only">Search listings</span><input className="field-control" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name, area or type" data-testid="input-property-search"/></label>
        <select className="field-control" value={location} onChange={e=>setLocation(e.target.value)} aria-label="Filter by location" data-testid="select-property-location"><option value="">All locations</option>{locations.map(x=><option value={x} key={x}>{x}</option>)}</select>
        <select className="field-control" value={type} onChange={e=>setType(e.target.value)} aria-label="Filter by property type" data-testid="select-property-type"><option value="">All property types</option>{types.map(x=><option value={x} key={x}>{x}</option>)}</select>
        <select className="field-control" value={budget} onChange={e=>setBudget(e.target.value)} aria-label="Filter by maximum budget" data-testid="select-property-budget"><option value="">Any budget</option><option value="30000000">Up to PKR 30 million</option><option value="80000000">Up to PKR 80 million</option><option value="150000000">Up to PKR 150 million</option><option value="300000000">Up to PKR 300 million</option></select>
      </div>
      <div className="results-line"><span>{filtered.length} illustrative {filtered.length===1?'opportunity':'opportunities'}</span><span>Prices in PKR · Subject to verification</span></div>
      {filtered.length?<div className="listing-grid">{filtered.map(p=><PropertyCard key={p.id} property={p}/>)}</div>:<div className="no-results"><Search size={25} color="#c5a76b"/><h3>No matching demo listings</h3><p>Try a different search or adjust your filters.</p><button className="btn btn-gold" onClick={()=>{setQuery('');setLocation('');setType('');setBudget('');}} data-testid="button-clear-filters">Clear filters</button></div>}
    </section>
  </main>;
}

export function PropertyDetailPage() {
  const {id}=useParams<{id:string}>(); const item=properties.find(p=>p.id===id);
  usePageMeta(item?item.title:'Property listing not found',item?`${item.title}, ${item.location}. Illustrative demo listing at ${formatPrice(item.price)}, subject to verification.`:'The requested demo property listing could not be found.');
  if(!item) return <main className="not-found"><div><strong>404</strong><h1>Listing not found</h1><p>This demo listing is no longer in our showcase.</p><Link href="/properties" className="btn btn-gold">Browse demo listings</Link></div></main>;
  const extra=properties.filter(p=>p.id!==item.id).slice(0,2);
  return <main className="detail-wrap">
    <div className="crumb"><Link href="/properties">Property opportunities</Link> &nbsp; / &nbsp; {item.title}</div>
    <DemoNotice/>
    <div className="detail-head"><div><div className="property-type">{item.type} · {item.tag}</div><h1>{item.title}</h1><div className="property-location"><MapPin size={14}/>{item.location}</div></div><div className="detail-price">{formatPrice(item.price)}<div className="demo-disclaimer">{DEMO_LABEL}</div></div></div>
    <p className="gallery-note">Illustrative reference photography only. Images are not verified as depicting this specific demo listing.</p>
    <div className="gallery"><img src={item.image} alt={`Illustrative real estate reference for ${item.title}`} data-testid="img-property-main"/>{extra.map(p=><img key={p.id} src={p.image} alt="Illustrative architectural reference, not verified for this listing" loading="lazy"/>)}</div>
    <div className="detail-content">
      <div><h2>About this opportunity</h2><p>{item.description}</p><h2 style={{marginTop:35}}>Specifications</h2><div className="spec-grid"><div className="spec"><b>{item.size}</b><span>Size</span></div>{item.beds&&<div className="spec"><b>{item.beds}</b><span>Bedrooms</span></div>}{item.baths&&<div className="spec"><b>{item.baths}</b><span>Bathrooms</span></div>}<div className="spec"><b>{item.type}</b><span>Property type</span></div></div><h2>Amenities & features</h2><div className="amenities">{item.amenities.map(a=><span key={a}>{a}</span>)}</div><h2 style={{marginTop:35}}>Location</h2><p><MapPin size={14} style={{verticalAlign:'middle',color:'#c5a76b'}}/> &nbsp;{item.location}</p><div className="map-placeholder"><div><MapPin size={21}/><br/>Location reference only<br/><small>Exact location and details require independent verification.</small></div></div></div>
      <aside className="detail-panel"><div className="kicker">Discuss this listing</div><h2 style={{fontSize:28,marginTop:12}}>Request details.</h2><p>Start a direct WhatsApp conversation about this illustrative opportunity.</p><a className="btn btn-whatsapp" href={whatsappUrl(inquiryMessage(item))} target="_blank" rel="noreferrer" data-testid="link-detail-whatsapp"><MessageCircle size={16}/> Buy / Inquire on WhatsApp</a><Link className="btn btn-outline" href="/contact">Contact our office <ArrowRight size={14}/></Link><small>{DEMO_LABEL}. Falcon Ventures does not represent ownership or verification of this listing. Please conduct independent due diligence.</small></aside>
    </div>
  </main>;
}

export function AboutPage() {
  usePageMeta('About Falcon Ventures','Falcon Ventures Pvt. Ltd. was established in Lahore in 1986. Learn about the company profile, capabilities and associated companies.');
  return <main>
    <PageIntro eyebrow="About Falcon Ventures" title="Four decades of enterprise." description="An established Lahore company with a broad view of Pakistan’s connected industries and opportunities."/>
    <section className="section">
      <div className="split-section"><div><div className="kicker">Our beginnings · 1986</div><h2>Rooted in Lahore.<br/>Open to possibility.</h2><p>Falcon Ventures Pvt. Ltd. was established in Lahore in 1986. The company profile reflects a diversified outlook spanning real estate, engineering, construction, hospitality, mining, turnkey execution, joint ventures and investment.</p><p>We approach each conversation through the lens of its context: the place, the people and the long-term opportunity.</p><div className="company-list"><div>Real estate</div><div>Engineering</div><div>Construction</div><div>Hospitality</div><div>Mining</div><div>Investment</div></div></div><div className="image-panel" style={{backgroundImage:'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400)'}} role="img" aria-label="Modern architectural residence"/></div>
    </section>
    <section className="section forest"><div className="section-heading"><div><div className="eyebrow">A connected enterprise</div><h2>Associated companies</h2></div><p>Company affiliations and membership statements below are presented as supplied in the company profile; no independent verification is implied.</p></div><div className="company-list">{['Falcon Engineering Ltd','Falcon Mining and Refining Ltd','Rose Gold Mining Ltd','Farris Textiles (Pvt.) Limited','Al-Sharq newspaper'].map(x=><div key={x}>{x}</div>)}</div></section>
    <section className="section"><div className="section-heading"><div><div className="kicker">Membership & affiliations</div><h2>Part of a wider conversation.</h2></div></div><div className="company-list"><div>Corporate membership with Lahore Chamber of Commerce</div><div>Affiliation with Nayyar Ali Dada & Associates</div><div>Affiliation with Star Marketing</div></div><p className="demo-disclaimer" style={{marginTop:22}}>These statements reflect information supplied in the company profile and are not independently verified here.</p></section>
  </main>;
}

export function ProjectsPage() {
  usePageMeta('Projects & Opportunities','Explore presentation-only demo listings and illustrative opportunity categories. No completed projects are claimed.');
  const images=['https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1200','https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200','https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200','https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'];
  const cards=[['Residential living','Illustrative villa and apartment opportunities across Lahore and Islamabad.'],['Commercial destinations','Demo workplace and mixed-use concepts in established urban settings.'],['Hospitality investment','Proposal-stage hospitality concepts for feasibility discussion.'],['Land & development','Illustrative plots and development potential, subject to independent review.']];
  return <main><PageIntro eyebrow="Projects & opportunities" title="An open field of possibility." description="Browse illustrative opportunity categories alongside demo property listings. This proposal showcase does not represent a record of completed or owned projects."/><section className="section"><DemoNotice/><div className="project-list">{cards.map(([title,copy],i)=><article key={title} className="project-card" style={{backgroundImage:`url(${images[i]})`}}><div><span className="property-type">Illustrative opportunity · 0{i+1}</span><h3>{title}</h3><p>{copy}</p></div></article>)}</div><div style={{textAlign:'center',marginTop:37}}><Link className="btn btn-gold" href="/properties">View demo listings <ArrowRight size={14}/></Link></div></section></main>;
}

export function ServicesPage() {
  usePageMeta('Services & Expertise','Explore Falcon Ventures areas of expertise: engineering, construction, hospitality, mining, turnkey execution, real estate, joint ventures and investment.');
  const services=[['01','Engineering','Engineering capabilities and expertise as described in the supplied company profile.'],['02','Construction','Construction experience and services for project conversations and delivery planning.'],['03','Turnkey execution','Turnkey execution expertise, bringing project needs into a coordinated conversation.'],['04','Real estate','Property and real estate opportunities, including the illustrative demo listings on this website.'],['05','Hospitality','Hospitality sector interests and investment opportunities for discussion.'],['06','Mining','Mining and refining interests reflected in associated company information.'],['07','Joint ventures','Joint venture discussions shaped around aligned interests and opportunity.'],['08','Investment','Investment opportunities and capital conversations across connected sectors.']];
  return <main><PageIntro eyebrow="Expertise" title="Capabilities across disciplines." description="Falcon Ventures’ supplied company profile describes expertise spanning the built environment, natural resources, hospitality and investment."/><section className="section"><div className="service-grid">{services.map(([no,title,copy])=><article className="service-item" key={no}><span className="service-index">{no}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="notice" style={{marginTop:30}}>Descriptions are limited to areas stated in the supplied company profile; no specific project delivery, certification or performance claims are made.</div></section><section className="section forest"><div className="statement"><div className="eyebrow">Where shall we begin?</div><blockquote>Every opportunity starts with <em>a conversation.</em></blockquote><p>Speak with our Lahore office about your area of interest.</p><Link className="btn btn-gold" style={{marginTop:25}} href="/contact">Get in touch <ArrowRight size={14}/></Link></div></section></main>;
}

export function ContactPage() {
  usePageMeta('Contact Falcon Ventures','Contact Falcon Ventures Pvt. Ltd. at its Lahore head office or by phone and WhatsApp at +92 323 4099786.');
  const [submitted,setSubmitted]=useState(false); const [errors,setErrors]=useState<Record<string,string>>({});
  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form=new FormData(e.currentTarget); const next:Record<string,string>={};
    const name=String(form.get('name')||'').trim(),email=String(form.get('email')||'').trim(),message=String(form.get('message')||'').trim();
    if(name.length<2)next.name='Please enter your name.'; if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))next.email='Enter a valid email address.'; if(message.length<10)next.message='Please add a little more detail (at least 10 characters).';
    setErrors(next); if(Object.keys(next).length===0){setSubmitted(true);e.currentTarget.reset();}else{setSubmitted(false);}
  }
  return <main><PageIntro eyebrow="Contact" title="Begin a conversation." description="Reach out to our Lahore office. For property-specific questions, you can also contact us directly on WhatsApp."/><section className="section"><div className="contact-grid">
    <div className="contact-info"><div className="kicker">Falcon Ventures Pvt. Ltd.</div><h2>We’re here to listen.</h2><p>Tell us what you’re exploring. For this presentation demo, contact-form submissions remain in your browser and are not transmitted or stored.</p><AddressBlock/><div className="contact-row"><MessageCircle size={17}/><div><b>WhatsApp</b><a href={whatsappUrl('Hello Falcon Ventures, I would like to make a general inquiry.')} target="_blank" rel="noreferrer">Message +92 323 4099786 ↗</a></div></div></div>
    <form className="contact-form" onSubmit={handleSubmit} noValidate><h2>Send an inquiry</h2><p>All fields marked with an asterisk are required.</p>{submitted&&<div className="form-status" role="status" data-testid="status-contact-demo">Your message has been confirmed locally in this demo. It was not sent to Falcon Ventures or stored.</div>}
      <div className="form-grid"><div className="form-field"><label htmlFor="contact-name">Your name *</label><input className="field-control" id="contact-name" name="name" required placeholder="Name" data-testid="input-contact-name"/>{errors.name&&<span className="form-error">{errors.name}</span>}</div>
      <div className="form-field"><label htmlFor="contact-email">Email address *</label><input className="field-control" id="contact-email" name="email" type="email" required placeholder="you@company.com" data-testid="input-contact-email"/>{errors.email&&<span className="form-error">{errors.email}</span>}</div>
      <div className="form-field full"><label htmlFor="contact-phone">Phone (optional)</label><input className="field-control" id="contact-phone" name="phone" type="tel" placeholder="+92" data-testid="input-contact-phone"/></div>
      <div className="form-field full"><label htmlFor="contact-message">How can we help? *</label><textarea className="field-control" id="contact-message" name="message" required placeholder="Tell us a little about your inquiry…" data-testid="input-contact-message"/>{errors.message&&<span className="form-error">{errors.message}</span>}</div></div>
      <button className="btn btn-gold" type="submit" data-testid="button-submit-contact">Submit inquiry <Send size={14}/></button><p style={{marginTop:16,lineHeight:1.6}}>Demo form only: no backend submission, transmission or storage occurs.</p>
    </form>
  </div></section><section className="section map-section"><div className="section-heading"><div><div className="kicker">Visit our office</div><h2>Our Lahore headquarters.</h2></div><p>Suite #704, Al-Hafeez Mall, Main Boulevard, Gulberg, Lahore, Punjab 54000, Pakistan.</p></div><div className="contact-map"><iframe title="Map to Falcon Ventures headquarters in Gulberg, Lahore" src="https://maps.google.com/maps?q=Suite%20%23704%2C%20Al-Hafeez%20Mall%2C%20Main%20Boulevard%2C%20Gulberg%2C%20Lahore%2C%20Punjab%2054000%2C%20Pakistan&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div><a className="map-directions" href="https://www.google.com/maps/search/?api=1&query=Suite%20%23704%2C%20Al-Hafeez%20Mall%2C%20Main%20Boulevard%2C%20Gulberg%2C%20Lahore%2C%20Punjab%2054000%2C%20Pakistan" target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={14}/></a></section></main>;
}

export function NotFoundPage() {
  usePageMeta('Page not found','The page you are looking for could not be found.');
  return <main className="not-found"><div><strong>404</strong><div className="eyebrow" style={{justifyContent:'center'}}>Wrong turn</div><h1>This page isn’t on the map.</h1><p>Try returning to the home page or exploring our demo listings.</p><div className="hero-actions" style={{justifyContent:'center'}}><Link className="btn btn-gold" href="/">Return home <ArrowRight size={14}/></Link><Link className="btn btn-outline" href="/properties">Explore listings</Link></div></div></main>;
}
