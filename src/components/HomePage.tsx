import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/aurelis-hero.jpg";
import tideImage from "@/assets/aurelis-tide.jpg";
import courtsImage from "@/assets/aurelis-courts.jpg";
import detailImage from "@/assets/aurelis-detail.jpg";

const ArchitecturalCanvas = lazy(() => import("./ArchitecturalCanvas"));

const projects = [
  {
    number: "01",
    name: "The Aurelia",
    location: "Waterfront District",
    type: "Sky residences",
    image: heroImage,
    dimensions: [1536, 1920],
  },
  {
    number: "02",
    name: "Tide House",
    location: "Private Crescent",
    type: "Waterfront living",
    image: tideImage,
    dimensions: [1920, 1280],
  },
  {
    number: "03",
    name: "The Courts",
    location: "Desert Ridge",
    type: "Private villas",
    image: courtsImage,
    dimensions: [1920, 1280],
  },
];

function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" aria-label="Aurelis home" className={`wordmark ${inverse ? "text-surface" : "text-ink"}`}>
      AURELIS
    </a>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.from(".hero-reveal", {
            yPercent: 115,
            duration: 1.25,
            ease: "power4.out",
            stagger: 0.09,
          });
          gsap.from(".hero-media", { scale: 1.08, duration: 1.8, ease: "power3.out" });

          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.from(element, {
              y: 64,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            });
          });

          gsap.to(".feature-image", {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: ".feature-wrap", start: "top bottom", end: "bottom top", scrub: 0.7 },
          });

          if (window.matchMedia("(min-width: 900px)").matches) {
            const track = document.querySelector<HTMLElement>(".project-track");
            if (track) {
              gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth + 56),
                ease: "none",
                scrollTrigger: {
                  trigger: ".project-stage",
                  start: "top top",
                  end: () => `+=${track.scrollWidth - window.innerWidth + 700}`,
                  scrub: 0.8,
                  pin: true,
                  invalidateOnRefresh: true,
                },
              });
            }
          }
        }, pageRef);
        cleanup = () => context.revert();
      },
    );

    return () => cleanup();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={pageRef} id="top" className="overflow-clip bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-6 text-surface md:px-10 lg:px-14">
        <Wordmark inverse />
        <nav className="hidden items-center gap-9 text-xs font-medium uppercase md:flex" aria-label="Main navigation">
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="#vision">Philosophy</a>
          <a className="nav-link" href="#journal">Journal</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="z-50 text-surface hover:bg-surface/10 hover:text-surface md:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-30 flex flex-col justify-end bg-ink px-6 pb-12 text-surface md:hidden">
          <nav className="grid gap-4 font-display text-5xl" aria-label="Mobile navigation">
            {["Projects", "Philosophy", "Journal", "Contact"].map((item) => (
              <a key={item} href={`#${item === "Philosophy" ? "vision" : item.toLowerCase()}`} onClick={closeMenu}>
                {item}
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      <main>
        <section className="relative min-h-[94svh] bg-ink text-surface" aria-labelledby="hero-title">
          <div className="hero-media absolute inset-0 overflow-hidden">
            <img
              src={heroImage}
              alt="Aurelis tower rising above a waterfront at dusk"
              width={1536}
              height={1920}
              fetchPriority="high"
              className="h-full w-full object-cover object-[52%_48%]"
            />
            <div className="absolute inset-0 bg-hero-shade" />
          </div>
          <div className="relative z-10 flex min-h-[94svh] flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-10 lg:px-14">
            <p className="mb-4 overflow-hidden text-xs font-medium uppercase text-surface/75">
              <span className="hero-reveal block">Independent real estate developer</span>
            </p>
            <h1 id="hero-title" className="max-w-[14ch] overflow-hidden font-display text-[clamp(4rem,11vw,10rem)] leading-[0.82]">
              <span className="hero-reveal block">Architecture</span>
              <span className="hero-reveal block font-light italic">with presence.</span>
            </h1>
            <div className="mt-8 flex items-end justify-between gap-8 border-t border-surface/35 pt-5">
              <p className="max-w-md text-sm leading-relaxed text-surface/80 md:text-base">
                Singular residences shaped by material, light, and a lasting sense of place.
              </p>
              <a href="#projects" className="hidden items-center gap-3 text-xs font-semibold uppercase md:flex">
                Explore our work <ArrowDown className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="vision" className="px-5 py-24 md:px-10 md:py-36 lg:px-14 lg:py-44">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_2fr] lg:gap-24">
            <p data-reveal className="section-label">Our perspective</p>
            <div>
              <h2 data-reveal className="max-w-5xl font-display text-[clamp(3rem,7vw,7.5rem)] leading-[0.92]">
                We do not fill skylines. We <span className="text-accent">shape</span> them.
              </h2>
              <div className="mt-14 grid gap-10 border-t border-border pt-7 md:grid-cols-2 md:gap-16">
                <p data-reveal className="max-w-md text-base leading-7 text-muted-foreground">
                  Every Aurelis address begins with a simple question: what belongs here? The answer emerges through proportion, enduring materials, and spaces tuned to daily life.
                </p>
                <a data-reveal href="#signature" className="group flex items-start justify-between border-b border-foreground pb-4 text-sm font-semibold uppercase">
                  Discover our philosophy
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-wrap relative min-h-[92svh] overflow-hidden bg-ink text-surface">
          <img
            src={tideImage}
            alt="Tide House waterfront residences at golden hour"
            width={1920}
            height={1280}
            loading="lazy"
            className="feature-image absolute inset-0 h-[112%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-feature-shade" />
          <div className="relative z-10 flex min-h-[92svh] flex-col justify-between px-5 py-8 md:px-10 md:py-12 lg:px-14">
            <div className="flex justify-between text-xs font-medium uppercase">
              <span>Featured development</span><span>Now releasing</span>
            </div>
            <div data-reveal className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-3 text-sm uppercase text-surface/70">Private Crescent</p>
                <h2 className="font-display text-[clamp(4.5rem,12vw,12rem)] leading-[0.78]">Tide House</h2>
              </div>
              <a href="#projects" className="group flex min-w-48 items-center justify-between border-b border-surface pb-4 text-xs font-semibold uppercase">
                View residence <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-accent text-accent-foreground px-5 py-20 md:px-10 lg:px-14">
          <div className="grid gap-12 border-t border-accent-foreground/30 pt-8 md:grid-cols-3">
            {[['18', 'Distinct addresses'], ['07', 'Global design awards'], ['03', 'Cities in progress']].map(([value, label]) => (
              <div data-reveal key={label} className="border-b border-accent-foreground/30 pb-8 md:border-b-0">
                <strong className="block font-display text-7xl font-normal md:text-8xl">{value}</strong>
                <span className="mt-4 block text-xs font-semibold uppercase">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="project-stage bg-background py-24 md:min-h-screen md:py-28">
          <div className="px-5 md:px-10 lg:px-14">
            <div className="mb-14 flex items-end justify-between">
              <div>
                <p className="section-label mb-5">Selected portfolio</p>
                <h2 className="font-display text-[clamp(3.5rem,7vw,7rem)] leading-none">Places of consequence.</h2>
              </div>
              <span className="hidden text-xs uppercase text-muted-foreground md:block">Scroll to explore</span>
            </div>
          </div>
          <div className="project-track flex flex-col gap-16 px-5 md:w-max md:flex-row md:gap-5 md:px-10 lg:px-14">
            {projects.map((project, index) => (
              <article key={project.name} className="group w-full md:w-[58vw] lg:w-[44vw]">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted md:aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={`${project.name}, ${project.type}`}
                    width={project.dimensions[0]}
                    height={project.dimensions[1]}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <span className="absolute left-5 top-5 text-xs font-semibold text-surface">{project.number}</span>
                </div>
                <div className="mt-5 flex items-start justify-between border-t border-foreground pt-4">
                  <div>
                    <h3 className="font-display text-4xl">{project.name}</h3>
                    <p className="mt-2 text-xs uppercase text-muted-foreground">{project.location} · {project.type}</p>
                  </div>
                  <ArrowUpRight className="mt-1 size-6" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="signature" className="grid min-h-[92svh] bg-ink text-surface lg:grid-cols-2">
          <div className="flex flex-col justify-between px-5 py-16 md:px-10 lg:px-14 lg:py-20">
            <p className="section-label text-surface/60">The architectural signature</p>
            <div data-reveal>
              <h2 className="max-w-2xl font-display text-[clamp(3.7rem,7vw,7.5rem)] leading-[0.88]">Form that moves with light.</h2>
              <p className="mt-8 max-w-lg text-base leading-7 text-surface/65">
                Sculpted profiles, deep shadow lines, and layered terraces give every building a changing character from dawn to night.
              </p>
            </div>
          </div>
          <div className="relative min-h-[65svh] overflow-hidden bg-signature">
            <img src={detailImage} alt="Bronze facade detail" width={1280} height={1600} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 hidden motion-safe:block">
              <Suspense fallback={null}><ArchitecturalCanvas /></Suspense>
            </div>
            <p className="absolute bottom-6 left-6 text-xs uppercase text-surface/55">Move to inspect · 01</p>
          </div>
        </section>

        <section id="journal" className="px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            <div data-reveal className="overflow-hidden"><img src={detailImage} alt="Crafted facade details in bronze and stone" width={1280} height={1600} loading="lazy" className="aspect-[5/4] h-full w-full object-cover" /></div>
            <div className="flex flex-col justify-between border-t border-border pt-5">
              <div>
                <p className="section-label">Journal · Material studies</p>
                <h2 data-reveal className="mt-12 font-display text-5xl leading-[0.96] md:text-7xl">The quiet intelligence of a well-made facade.</h2>
              </div>
              <a href="#contact" className="group mt-16 flex items-center justify-between border-b border-foreground pb-4 text-xs font-semibold uppercase">
                Read the story <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-accent px-5 py-20 text-accent-foreground md:px-10 md:py-28 lg:px-14">
          <p className="section-label">A new perspective</p>
          <a href="mailto:studio@aurelis.example" className="group mt-12 block border-b border-accent-foreground pb-8">
            <span className="flex items-end justify-between gap-5 font-display text-[clamp(4rem,11vw,11rem)] leading-[0.82]">
              Begin a conversation <ArrowUpRight className="mb-2 size-10 shrink-0 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 md:size-16" />
            </span>
          </a>
        </section>
      </main>

      <footer className="bg-ink px-5 py-10 text-surface md:px-10 lg:px-14">
        <div className="flex flex-col gap-10 border-b border-surface/20 pb-10 md:flex-row md:items-start md:justify-between">
          <Wordmark inverse />
          <div className="grid grid-cols-2 gap-12 text-xs uppercase text-surface/60">
            <div className="grid gap-3"><span>Dubai</span><span>London</span><span>Singapore</span></div>
            <div className="grid gap-3"><a href="#projects">Projects</a><a href="#vision">About</a><a href="#contact">Contact</a></div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 pt-5 text-[0.65rem] uppercase text-surface/40"><span>© 2026 Aurelis Developments</span><span>Privacy · Terms</span></div>
      </footer>
    </div>
  );
}