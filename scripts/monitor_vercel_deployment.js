async function checkDeployment() {
  console.log('Polling https://www.samplinghub.world for Vercel deployment update...\n');
  const maxAttempts = 24; // 24 * 10s = 4 minutes
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch('https://www.samplinghub.world', {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      const text = await res.text();
      const jsMatch = text.match(/\/assets\/index-[a-zA-Z0-9_\-]+\.js/);
      const cssMatch = text.match(/\/assets\/index-[a-zA-Z0-9_\-]+\.css/);
      const jsAsset = jsMatch ? jsMatch[0] : 'not found';
      const cssAsset = cssMatch ? cssMatch[0] : 'not found';
      const vercelId = res.headers.get('x-vercel-id');

      console.log(`[Attempt ${attempt}/${maxAttempts}] Status: ${res.status} | JS: ${jsAsset} | CSS: ${cssAsset}`);

      if (jsAsset !== '/assets/index-D5iNo2OL.js') {
        console.log('\n🚀 NEW DEPLOYMENT DETECTED LIVE ON WWW.SAMPLINGHUB.WORLD!');
        console.log('Updated JS Asset:', jsAsset);
        console.log('Updated CSS Asset:', cssAsset);
        console.log('Vercel Node ID:', vercelId);
        return true;
      }
    } catch (err) {
      console.log(`[Attempt ${attempt}] Fetch error:`, err.message);
    }
    await new Promise((r) => setTimeout(r, 10000));
  }
  console.log('\nTimed out waiting for new deployment asset.');
  return false;
}

checkDeployment().then(success => {
  process.exit(success ? 0 : 1);
});
