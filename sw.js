self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    } catch (error) {
        data = {};
    }

    event.waitUntil(
        self.registration.showNotification(
            data.title || 'Graham Service Manager',
            {
                body: data.message ||
                    'You have a new notification.',
                tag: data.id || 'graham-notification',
                data: {
                    url: './index.html'
                }
            }
        )
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        self.clients.openWindow(
            new URL(
                './index.html',
                self.registration.scope
            ).href
        )
    );
});
