import { BedDouble, Bath, Ruler, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { type Property, formatPrice, inquiryMessage, whatsappUrl, DEMO_LABEL } from '../data/properties';

export function PropertyCard({property}:{property:Property}) {
  return <article className="property-card" data-testid={`card-property-${property.id}`}>
    <div className="property-image"><img src={property.image} alt={`${property.title}, ${property.location}`} loading="lazy"/><span className="demo-badge">{DEMO_LABEL}</span></div>
    <div className="property-body">
      <div className="property-type">{property.type} · {property.tag}</div>
      <h3 className="property-title">{property.title}</h3>
      <div className="property-location"><MapPin size={13}/>{property.location}</div>
      <div className="property-price">{formatPrice(property.price)}</div>
      <div className="property-meta"><span><Ruler size={13}/>{property.size}</span>{property.beds&&<span><BedDouble size={13}/>{property.beds} beds</span>}{property.baths&&<span><Bath size={13}/>{property.baths} baths</span>}</div>
      <div className="property-actions"><Link href={`/property/${property.id}`} data-testid={`link-property-detail-${property.id}`}>View details <ArrowUpRight size={13}/></Link><a className="whatsapp-link" href={whatsappUrl(inquiryMessage(property))} target="_blank" rel="noreferrer" data-testid={`link-property-whatsapp-${property.id}`}><MessageCircle size={14}/> Buy / Inquire on WhatsApp</a></div>
      <p className="demo-disclaimer">{DEMO_LABEL}</p>
    </div>
  </article>;
}
