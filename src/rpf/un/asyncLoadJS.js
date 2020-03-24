export default url =>
  new Promise((resolve, reject) => {
    const hasLoaded = document.querySelector('script[src="' + url + '"]');
    hasLoaded && resolve();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  });
