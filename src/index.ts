if (process.env.NODE_ENV !== 'production') {
	// use preact's devtools
	// eslint-disable-next-line global-require
	require('preact/debug');
}

import { render, h } from 'preact';
import { setup } from 'goober';
import { App } from './app';

setup(h);

declare interface NodeModule {
	hot: {
		accept(path?: string, callback?: () => void): void;
	};
}

function initializeUI() {
	const rootEl = document.getElementById('root');

	if (!rootEl) {
		return;
	}

	rootEl.innerHTML = '';

	render(App({}), rootEl);
}

function initializeApp() {
	initializeUI();

	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./sw.js');
	});

	Notification.requestPermission();
}

initializeApp();

// For hot-reloading in dev mode
if (process.env.NODE_ENV !== 'production' && ((module as unknown) as NodeModule).hot) {
	((module as unknown) as NodeModule).hot.accept('./app', initializeApp);
}
