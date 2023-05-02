const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the triggered events at custom location
    window.deferredPrompt = event;
    // Show install button
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    // retrieve triggered event we stored earlier
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        // no event was stored, do nothing
        return;
    }

    // Show prompt
    promptEvent.prompt();
    // deferredPrompt can only be used once, needs to be reset now
    window.deferredPrompt = null;

    // hide install button
    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    // Once app is installed, clear the prompt
    window.deferredPrompt = null;
});
