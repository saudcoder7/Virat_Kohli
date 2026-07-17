"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Section-level error boundary.
 * Catches runtime errors in any child component and renders a graceful
 * fallback instead of crashing the whole page.
 */
export default class SectionErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console for debugging — in production this goes to your error tracker
    console.error(
      `[SectionErrorBoundary] ${this.props.sectionName ?? "Section"} crashed:`,
      error,
      info.componentStack
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full py-16 flex flex-col items-center justify-center bg-[var(--color-bg-primary)]">
          <p
            className="text-xs tracking-widest uppercase opacity-30 font-mono"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {this.props.sectionName ?? "Section"} unavailable
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
