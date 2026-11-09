export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Render automatically provides RENDER_EXTERNAL_URL in its environment
    const externalUrl = process.env.RENDER_EXTERNAL_URL || process.env.SITE_URL;

    if (externalUrl) {
      // Ping every 10 minutes (Render spins down after 15 minutes of inactivity)
      const PING_INTERVAL_MS = 10 * 60 * 1000;

      // Small initial delay after boot
      setTimeout(() => {
        const pingService = async () => {
          try {
            const target = `${externalUrl.replace(/\/+$/, '')}/api/health`;
            const response = await fetch(target, {
              headers: {
                'User-Agent': 'Render-KeepAlive-Daemon/1.0',
                'Cache-Control': 'no-cache',
              },
            });
            console.log(`[Keep-Alive] Pinged ${target} - Status: ${response.status}`);
          } catch (error) {
            console.error('[Keep-Alive] Ping failed:', error);
          }
        };

        // Run immediately after boot, then every 10 minutes
        pingService();
        setInterval(pingService, PING_INTERVAL_MS);
      }, 5000);
    }
  }
}
