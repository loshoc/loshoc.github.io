import React, { useRef } from 'react';
import pulse6Cover from '../assets/pulse-6-cover.png';
import pulseLightshow01 from '../assets/pulse-lightshow-01.png';
import pulseLightshow02 from '../assets/pulse-lightshow-02.png';
import pulseLightshow03 from '../assets/pulse-lightshow-03.png';
import pulseLightshow04 from '../assets/pulse-lightshow-04.png';
import pulseLightshow05 from '../assets/pulse-lightshow-05.png';
import pulseLightshow06 from '../assets/pulse-lightshow-06.png';
import pulseLightingProcess01 from '../assets/pulse-lighting-process-01.png';
import pulseLightingProcess02 from '../assets/pulse-lighting-process-02.png';
import pulsePartyboxFire from '../assets/pulse-partybox-fire.mp4';
import pulsePartyboxSync from '../assets/pulse-partybox-sync.mp4';
import pulseTheme01 from '../assets/pulse-theme-01.mp4';
import pulseTheme02 from '../assets/pulse-theme-02.mp4';

const HorizontalGallery = ({ children, note }) => {
  const viewportRef = useRef(null);
  const scrollGallery = (direction) => viewportRef.current?.scrollBy({ left: direction * viewportRef.current.clientWidth * .62, behavior: 'smooth' });

  return <><div className="case-gallery__viewport" ref={viewportRef}>{children}</div><div className="case-gallery__footer">{note && <p className="case-gallery__hint">{note}</p>}<div className="case-gallery__controls"><button type="button" aria-label="Previous media" onClick={() => scrollGallery(-1)}>←</button><button type="button" aria-label="Next media" onClick={() => scrollGallery(1)}>→</button></div></div></>;
};

const MediaPlaceholder = ({ label, caption, video = false }) => <figure className="case-gallery__item"><div className="case-gallery__media case-gallery__media--placeholder" aria-label={label}><span>{video ? 'Video placeholder' : 'Image placeholder'}</span></div><figcaption>{caption}</figcaption></figure>;
const MediaImage = ({ src, alt, caption }) => <figure className="case-gallery__item case-gallery__item--portrait"><div className="case-gallery__media case-gallery__media--portrait"><img src={src} alt={alt} /></div><figcaption>{caption}</figcaption></figure>;

const CaseStudyPage = () => (
  <main className="case-study">
    <header className="case-nav">
      <a className="case-wordmark" href="#home">KIWI</a>
      <a className="case-back" href="#home">← Selected projects</a>
    </header>

    <section className="case-hero">
      <div className="case-hero__copy">
        <p className="case-kicker">Flagship NPI · 2026</p>
        <h1>JBL Pulse 6</h1>
        <p className="case-lede">Designing a sound-and-light experience across product, app, and space.</p>
      </div>
      <div className="case-hero__visual" aria-label="JBL Pulse 6 cover image"><img src={pulse6Cover} alt="JBL Pulse 6" /></div>
    </section>

    <section className="case-facts" aria-label="Project facts">
      <div><span>Role</span><strong>UI/UX Designer · Design Engineer</strong></div>
      <div><span>Scope</span><strong>Device · App · Motion · Installation</strong></div>
      <div><span>Owned</span><strong>Lighting system · Shader · Design tool</strong></div>
      <div><span>Outcome</span><strong>Shipped product · Internal skill</strong></div>
    </section>

    <section className="case-evidence case-section" aria-label="Final Pulse 6 experience">
      <div className="case-evidence__media"><span>Final device lightshow + app video placeholder</span></div>
    </section>

    <section className="case-intro case-section">
      <p className="case-section__label">01 — Device lightshow</p>
      <h2>Designing one light system across a new handle and body.</h2>
      <p>The new handle introduced a second lighting zone, but it could not simply mirror the body. Its shorter distance from LED to diffuser made it brighter by default, and the top had to remain open for the top driver’s acoustic performance. The task was to make the two zones feel connected, while ensuring the handle could still hold its own when the body was switched off.</p>
    </section>

    <section className="case-gallery case-gallery--device case-section" aria-label="Device lightshow media">
      <HorizontalGallery><div className="case-gallery__track">
        <MediaImage src={pulseLightshow01} alt="JBL Pulse 6 in a warm orange lighting theme" caption="Warm theme — light revealing the new handle and body." />
        <MediaImage src={pulseLightshow02} alt="JBL Pulse 6 in a deep red lighting theme" caption="Red theme — a more focused, energetic product presence." />
        <MediaImage src={pulseLightshow03} alt="JBL Pulse 6 in a blue lighting theme" caption="Blue theme — colour and light following the product form." />
        <MediaImage src={pulseLightshow04} alt="JBL Pulse 6 lighting detail" caption="Lighting detail study — depth, contrast, and product silhouette." />
        <MediaImage src={pulseLightshow05} alt="JBL Pulse 6 in a green lighting theme" caption="Green theme — a calmer ambient expression." />
        <MediaImage src={pulseLightshow06} alt="JBL Pulse 6 in a blue product lighting theme" caption="Blue theme — an alternate expression of the same lighting language." />
      </div></HorizontalGallery>
    </section>

    <section className="case-text-block case-text-block--process case-section">
      <p className="case-section__label">Lighting design process</p>
      <h2>Balancing the two zones before designing the themes.</h2>
      <p>We explored materials, diffuser treatments, and LED counts to create a uniform light field that was bright enough without visible hotspots. A key consideration was balancing the higher-intensity handle with the body, so neither zone overpowered the other while the new form still read clearly.</p>
      <p>Once the physical direction was established, we used internal tools to design the lightshow, simulate its behaviour on screen, and then apply the result to the device.</p>
    </section>

    <section className="case-gallery case-process-gallery case-section" aria-label="Lighting design process media">
      <HorizontalGallery><div className="case-gallery__track">
        <figure className="case-gallery__item"><div className="case-gallery__media"><img src={pulseLightingProcess01} alt="Physical lighting design exploration for JBL Pulse 6" /></div></figure>
        <figure className="case-gallery__item"><div className="case-gallery__media"><img src={pulseLightingProcess02} alt="Digital lighting simulation tool for JBL Pulse 6" /></div></figure>
      </div></HorizontalGallery>
    </section>

    <section className="case-ownership-note case-section">
      <p>I led the lighting direction for Pulse 6: defining the relationship between handle and body, the constraints each theme needed to satisfy, and the visual rules carried into the app experience.</p>
    </section>

    <section className="case-intro case-section">
      <p className="case-section__label">Six party · ten ambient</p>
      <h2>Sixteen themes, two kinds of presence.</h2>
      <p>I structured the lighting system into six party themes and ten ambient themes. The party set carries more energy and movement; the ambient set is quieter and designed to sit in a room for longer periods.</p>
    </section>

    <section className="case-overview-video case-section" aria-label="Lighting themes overview video">
      <video className="case-overview-video__media" src={pulseTheme01} autoPlay muted loop playsInline />
      <video className="case-overview-video__media" src={pulseTheme02} autoPlay muted loop playsInline />
    </section>

    <div className="case-theme-details">
      <h3>One theme, three lighting states.</h3>
      <p>The handle and body can be controlled independently in the app. I designed every theme with handle-only, body-only, and both-zone configurations in mind—not as separate themes, but as states the same lighting logic needed to support. This kept the visual relationship intact whether one zone or both were active.</p>
    </div>

    <div className="case-illustration" aria-label="Pulse 6 and PartyBox party theme illustration">
      <video className="case-illustration__video" src={pulsePartyboxFire} autoPlay muted loop playsInline />
      <div className="case-illustration__copy">
        <h3>Six party themes, one shared genre.</h3>
        <p>Six Pulse 6 themes synchronize with PartyBox through the universal lighting protocol. I defined shared colour relationships, energy, rhythm, and transition behaviour so both products can perform together while each keeps its own visual identity.</p>
      </div>
      <video className="case-illustration__video" src={pulsePartyboxSync} autoPlay muted loop playsInline />
    </div>

    <section className="case-text-block case-section">
      <p className="case-section__label">02 — Immersive lighting control</p>
      <h2>Control the lightshow, not a list of settings.</h2>
      <p>The companion app is where people enter, explore, and shape the Pulse 6 lightshow. I designed the controls to feel immersive and immediate: users can browse themes, understand their character, make adjustments, and see the result reflected in the product.</p>
    </section>

    <section className="case-gallery case-section" aria-label="App interaction media">
      <HorizontalGallery><div className="case-gallery__track">
        <MediaPlaceholder label="Immersive app control placeholder" caption="Immersive lighting controls — image placeholder." />
        <MediaPlaceholder label="Theme selection flow placeholder" caption="Theme browsing and selection — image placeholder." />
        <MediaPlaceholder label="App and device synchronization placeholder" caption="Selecting a theme and seeing the device respond — video placeholder." video />
      </div></HorizontalGallery>
    </section>

    <section className="case-text-block case-section">
      <p className="case-section__label">Code-driven transitions</p>
      <h2>Making sixteen themes move without hand-authoring every path.</h2>
      <p>I initially explored Rive for the lighting motion. It worked for individual states, but it would require too much manual work to design, manage, and maintain all theme transitions. I researched the approach, designed the transition logic, and implemented a shader-based solution myself. The development team integrated my code into the product codebase.</p>
    </section>

    <section className="case-gallery case-section" aria-label="Shader method media">
      <HorizontalGallery><div className="case-gallery__track">
        <MediaPlaceholder label="Rive motion exploration placeholder" caption="Early Rive motion exploration — image or video placeholder." />
        <MediaPlaceholder label="Shader code snippet placeholder" caption="Shader-based transition implementation — code placeholder." />
        <MediaPlaceholder label="Final transition result placeholder" caption="Continuous blend between lighting themes — video placeholder." video />
      </div></HorizontalGallery>
    </section>

    <section className="case-text-block case-section">
      <p className="case-section__label">03 — Internal skill</p>
      <h2>Turning a project method into a reusable starting point.</h2>
      <p>To make the work scalable, I summarized the lighting style, interaction rules, shader method, and implementation guidance into an internal skill. It gives future teams a practical foundation for building coherent lighting behavior across products with different forms and capabilities.</p>
    </section>

    <section className="case-gallery case-section" aria-label="Internal skill media">
      <HorizontalGallery><div className="case-gallery__track">
        <MediaPlaceholder label="Lighting system principles placeholder" caption="Lighting style and interaction principles — image placeholder." />
        <MediaPlaceholder label="Internal skill documentation placeholder" caption="Internal skill documentation — image placeholder." />
        <MediaPlaceholder label="Future product studies placeholder" caption="Scaling the method to future products — image placeholder." />
      </div></HorizontalGallery>
    </section>

    <section className="case-intro case-section">
      <p className="case-section__label">04 — Shanghai launch installation</p>
      <h2>Turning final products into a physical light canvas.</h2>
      <p>The Shanghai launch was a separate workstream: many final Pulse 6 products performing together in space. I designed the installation lightshow, defined the product-control protocol, and designed and developed a dedicated creative tool for composing and running the experience. Wenkin led the communication tool.</p>
    </section>

    <section className="case-gallery case-section" aria-label="Shanghai launch media">
      <HorizontalGallery><div className="case-gallery__track">
        <MediaPlaceholder label="Shanghai installation lightshow placeholder" caption="Shanghai launch lightshow — video placeholder." video />
        <MediaPlaceholder label="Installation design tool placeholder" caption="Creative tool for composing the installation — image placeholder." />
        <MediaPlaceholder label="Launch installation behind the scenes placeholder" caption="Behind the scenes with final Pulse 6 products — image placeholder." />
      </div></HorizontalGallery>
    </section>

    <section className="case-outcome case-section">
      <p className="case-section__label">Outcome</p>
      <h2>A lightshow on the product, a method for what comes next.</h2>
      <p>JBL Pulse 6 launched with a distinctive device lightshow, immersive app controls, a code-driven transition method, and a reusable internal skill for future lighting products. The same visual language later became a separate, room-scale launch experience in Shanghai.</p>
    </section>

    <footer className="case-footer"><a href="#home">Back to selected projects</a><span>Next: One Platform →</span></footer>
  </main>
);

export default CaseStudyPage;
