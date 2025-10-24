'use client';
export default function CleanRouteError({ error }: { error: Error }) {
  console.error('Clean route error:', error);
  return (
    <div style={{maxWidth:720,margin:'64px auto',padding:'24px',border:'1px solid #eee',borderRadius:12}}>
      <h2 style={{margin:0}}>Something went wrong loading this feed.</h2>
      <p style={{color:'#666'}}>Try refreshing. We’ve logged the error to the console for debugging.</p>
    </div>
  );
}
