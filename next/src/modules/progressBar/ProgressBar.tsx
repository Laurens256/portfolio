// source: https://github.com/beeinger/next-progress

import NProgress, { NProgressOptions } from 'nprogress';
import { useEffect } from 'react';

import { useRouter } from 'next/router';

interface NextProgressProps {
	delay?: number;
	options?: Partial<NProgressOptions>;
	disableSameRoute?: boolean;
}

/**
 * @param delay Delay of the animation - when page loads faster than the delay time progress bar won't be displayed.
 * @param options Options for - NProgress.configure(options).
 * @param disableSameRoute If true, progress bar won't be displayed when user travels the same route they're currently on.
 */
export default function ProgressBar({
	delay = 0,
	options,
	disableSameRoute = false
}: NextProgressProps) {
	const router = useRouter();

	useEffect(() => {
		console.log('called');
		options && NProgress.configure(options);

		let timeout: NodeJS.Timeout;

		const start: Handler = (e) => {
			clearTimeout(timeout);
			if (disableSameRoute && router.pathname === e) {
				return;
			}

			timeout = setTimeout(() => NProgress.start(), delay);
		};

		const done: Handler = () => {
			clearTimeout(timeout);
			NProgress.done();
		};

		router.events.on('routeChangeStart', start);
		router.events.on('routeChangeComplete', done);
		router.events.on('routeChangeError', done);

		return () => {
			router.events.off('routeChangeStart', start);
			router.events.off('routeChangeComplete', done);
			router.events.off('routeChangeError', done);

			clearTimeout(timeout);
		};
	}, []);

	return null;
}

//? Unexported type from next/dist/shared/lib/mitt.d.ts
declare type Handler = (...evts: any[]) => void;
