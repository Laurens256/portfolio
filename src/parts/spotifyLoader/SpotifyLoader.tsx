import styles from './spotifyLoader.module.css';

export default function SpotifyLoader() {
	return (
		<div className={styles.loading}>
			{[1, 0.8, 0.6, 0.4, 0.2, 0.2, 0.2, 0.4, 0.6, 0.8, 1].map((delay, index) => (
				<div key={index} 
				// style={{ animationDelay: `${delay}s` }}
				
				style={{
					'--delay': `${delay}s`
				} as React.CSSProperties}></div>
			))}
		</div>
	);
}
