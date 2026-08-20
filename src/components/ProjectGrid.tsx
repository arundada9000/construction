'use client';

import { useState, useMemo } from 'react';
import AnimatedSection from './AnimatedSection';

type Project = {
  title: string;
  location: string;
  status: 'completed' | 'ongoing';
  image: string;
};

type Props = {
  projects: Project[];
  lang: string;
  completedLabel: string;
  ongoingLabel: string;
};

export default function ProjectGrid({ projects, lang, completedLabel, ongoingLabel }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing'>('all');

  const locations = useMemo(() => {
    const unique = Array.from(new Set(projects.map(p => p.location)));
    return unique;
  }, [projects]);

  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesLocation = locationFilter === null || p.location === locationFilter;
      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [projects, search, statusFilter, locationFilter]);

  const statusOptions: { value: 'all' | 'completed' | 'ongoing'; label: string }[] = [
    { value: 'all', label: lang === 'ne' ? 'सबै' : 'All' },
    { value: 'completed', label: completedLabel },
    { value: 'ongoing', label: ongoingLabel },
  ];

  return (
    <>
      {/* Search & Filters */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        {/* Search */}
        <div className="relative mx-auto max-w-md">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder={lang === 'ne' ? 'परियोजना खोज्नुहोस्...' : 'Search projects...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/30 transition-shadow"
          />
        </div>

        {/* Status filters */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {statusOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                statusFilter === opt.value
                  ? 'bg-brand text-white shadow-md'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:border-brand/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Location filters — scrollable on mobile, centered on desktop */}
        <div className="mt-3 -mx-4 sm:mx-0 overflow-x-auto px-4 sm:px-0 scrollbar-none">
          <div className="flex items-center justify-start sm:justify-center gap-2 pb-1">
            <button
              onClick={() => setLocationFilter(null)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                locationFilter === null
                  ? 'bg-brand text-white shadow-md'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:border-brand/40'
              }`}
            >
              {lang === 'ne' ? 'सबै स्थान' : 'All Locations'}
            </button>
            {locations.map(loc => (
              <button
                key={loc}
                onClick={() => setLocationFilter(loc)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  locationFilter === loc
                    ? 'bg-brand text-white shadow-md'
                    : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:border-brand/40'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <svg className="mx-auto h-12 w-12 text-muted-foreground/50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <p className="mt-4 text-lg font-medium text-muted-foreground">
                {lang === 'ne' ? 'कुनै परियोजना भेटिएन' : 'No projects found'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                {lang === 'ne' ? 'खोज वा फिल्टर परिवर्तन गर्नुहोस्' : 'Try adjusting your search or filters'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, index) => (
                <AnimatedSection
                  key={project.title}
                  delay={index * 80}
                  direction="up"
                >
                  <div className="card-hover group rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="relative h-52 overflow-hidden rounded-t-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                            project.status === 'completed'
                              ? 'bg-white/90 text-zinc-800'
                              : 'bg-brand text-white'
                          }`}
                        >
                          {project.status === 'completed' ? completedLabel : ongoingLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
                        {project.location}
                      </p>
                      <h3 className="text-lg font-semibold text-foreground">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
