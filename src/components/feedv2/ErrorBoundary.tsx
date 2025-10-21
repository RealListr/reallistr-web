'use client';
import React from 'react';

type Props = { children: React.ReactNode, fallback?: React.ReactNode };

export default class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // fire-and-forget to server so we can see it in Vercel logs
    fetch('/api/client-log', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        type: 'client-error',
        message: String(error?.message || error),
        stack: String(error?.stack || ''),
        info
      })
    }).catch(()=>{});
    console.error('[Feed ErrorBoundary]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-4 rounded-xl border bg-white text-sm">
          Something went wrong loading the feed. Try refresh. 🙏
        </div>
      );
    }
    return this.props.children;
  }
}
