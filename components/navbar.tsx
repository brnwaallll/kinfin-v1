"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

interface NavSubItem {
  title: string;
  href: string;
  description: string;
}

interface NavDropdownGroup {
  heading: "Capital" | "Advisory" | "Setup";
  items: NavSubItem[];
}

const dropdownGroups: NavDropdownGroup[] = [
  {
    heading: "Capital",
    items: [
      {
        title: "Working Capital",
        href: "/working-capital",
        description:
          "Structured liquidity and short-term credit facilities.",
      },
      {
        title: "Corporate Loans",
        href: "/corporate-loans",
        description:
          "Term debt, expansion financing, and bespoke capital solutions.",
      },
    ],
  },
  {
    heading: "Advisory",
    items: [
      {
        title: "CFO Services",
        href: "/cfo-services",
        description:
          "Strategic financial leadership, treasury, and capital allocation.",
      },
      {
        title: "IPO Advisory",
        href: "/ipo-advisory",
        description:
          "End-to-end public market readiness, structuring, and execution.",
      },
    ],
  },
  {
    heading: "Setup",
    items: [
      {
        title: "Company Registration",
        href: "/#setup",
        description:
          "Entity incorporation, governance frameworks, and structuring.",
      },
      {
        title: "Licensing",
        href: "/#setup",
        description:
          "Regulatory approvals, compliance clearances, and operational permits.",
      },
    ],
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeGroup, setActiveGroup] = React.useState<
    NavDropdownGroup["heading"] | null
  >(null);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const openMenu = React.useCallback((heading: NavDropdownGroup["heading"]) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveGroup(heading);
  }, []);

  const scheduleClose = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveGroup(null);
    }, 120);
  }, []);

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const currentDropdown = dropdownGroups.find(
    (group) => group.heading === activeGroup,
  );

  return (
    <div
      className="sticky top-0 z-50 w-full pt-3"
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto w-full px-4 sm:px-6">
        <div className="relative">
          <header className="rounded-lg border border-black/8 bg-[#F7F7F7] py-1.5 pr-2.5 pl-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:pr-3 sm:pl-6">
            <div className="flex h-12 items-center justify-between gap-4">
              {/* Left: Logo only */}
              <Link
                href="/"
                aria-label="KinFin Home"
                className="flex shrink-0 items-center transition-opacity hover:opacity-80"
              >
                <img
                  src="/KFVector.svg"
                  alt="KinFin"
                  className="h-9 w-auto max-w-[180px] shrink-0 object-contain sm:h-10"
                />
              </Link>

              {/* Right: Nav Triggers + Synced #121212 "Talk to us" Button */}
              <div className="hidden items-center gap-5 md:flex">
                <nav
                  aria-label="Primary"
                  className="flex items-center gap-6"
                >
                  {dropdownGroups.map((group) => {
                    const isOpen = activeGroup === group.heading;
                    return (
                      <button
                        key={group.heading}
                        type="button"
                        aria-expanded={isOpen}
                        onMouseEnter={() => openMenu(group.heading)}
                        onFocus={() => openMenu(group.heading)}
                        onClick={() =>
                          setActiveGroup((prev) =>
                            prev === group.heading ? null : group.heading,
                          )
                        }
                        className="inline-flex cursor-pointer items-center gap-1 bg-transparent py-2 text-sm font-medium text-[#121212] transition-colors hover:text-[#000000] focus:outline-none"
                      >
                        <span>{group.heading}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 text-[#525252] transition-transform duration-150 ${
                            isOpen ? "rotate-180 text-[#000000]" : ""
                          }`}
                        />
                      </button>
                    );
                  })}

                  <Link
                    href="/#about"
                    onMouseEnter={() => setActiveGroup(null)}
                    className="py-2 text-sm font-medium text-[#121212] transition-colors hover:text-[#000000]"
                  >
                    About
                  </Link>
                </nav>

                <Link
                  href="/#contact"
                  onMouseEnter={() => setActiveGroup(null)}
                  className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#121212] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#000000]"
                >
                  Talk to us
                </Link>
              </div>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle Menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-transparent text-[#121212] md:hidden"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
              <div className="space-y-4 border-t border-black/8 bg-[#F7F7F7] py-4 md:hidden">
                {dropdownGroups.map((group) => (
                  <div key={group.heading} className="space-y-1.5">
                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="group/item block rounded-lg px-2 py-1.5"
                        >
                          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#121212] transition-colors group-hover/item:text-[#000000]">
                            <span>{item.title}</span>
                            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                          </div>
                          <div className="text-xs text-[#525252]">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link
                  href="/#about"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-2 py-1.5 text-sm font-medium text-[#121212] transition-colors hover:text-[#000000]"
                >
                  About
                </Link>
                <div className="pt-1">
                  <Link
                    href="/#contact"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#121212] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#000000]"
                  >
                    Talk to us
                  </Link>
                </div>
              </div>
            )}
          </header>

          {/* Absolute Desktop Dropdown Panel — never shifts page layout */}
          {currentDropdown && (
            <div
              onMouseEnter={() => openMenu(currentDropdown.heading)}
              onMouseLeave={scheduleClose}
              className="absolute top-full right-0 z-50 hidden w-full max-w-[560px] pt-2 md:block"
            >
              <div className="w-full rounded-lg border border-black/8 bg-[#F7F7F7] px-6 py-5 text-[#121212] shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                <ul className="grid grid-cols-2 gap-4">
                  {currentDropdown.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        onClick={() => setActiveGroup(null)}
                        className="group/item block space-y-1 rounded-md bg-[#F7F7F7] px-2 py-1.5 no-underline outline-none transition-colors hover:bg-black/[0.02]"
                      >
                        <div className="inline-flex items-center gap-1.5 text-sm font-semibold leading-snug text-[#121212] transition-colors group-hover/item:text-[#000000]">
                          <span>{item.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                        </div>
                        <p className="text-xs leading-relaxed text-[#525252]">
                          {item.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;