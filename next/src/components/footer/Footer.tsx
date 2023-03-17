import styles from './footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<ul>
				<li>LD</li>
				<li>Copyright &copy; 2023 Laurens Duin</li>
				<li>
					<ul>
						<li>
							<a href="https://github.com/Laurens256/" target="_blank">
								<svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
									<path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
								</svg>
							</a>
						</li>
						{/* <li>
					<a href="mailto:duinlaurens2@gmail.com"
						><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
							<path
								d="m214.25884,223.27414l-172.51486,0c-22.5093,0 -40.81947,-18.31017 -40.81947,-40.81947l0,-108.90934c0,-22.50648 18.31299,-40.81947 40.81947,-40.81947l172.51486,0c22.50648,0 40.81665,18.31299 40.81665,40.81947l0,108.90934c0,22.5093 -18.31017,40.81947 -40.81665,40.81947zm-172.51486,-178.61166c-15.92679,0 -28.88285,12.95605 -28.88285,28.88285l0,108.90934c0,15.92679 12.95605,28.88567 28.88285,28.88567l172.51486,0c15.92679,0 28.88285,-12.95888 28.88285,-28.88567l0,-108.90934c0,-15.92679 -12.95605,-28.88285 -28.88285,-28.88285l-172.51486,0z"
							/>
							<path
								d="m32.11166,74.11293c30.50941,29.73002 61.01882,59.45721 91.52824,89.18722c5.68733,5.54049 14.41601,-3.16842 8.7202,-8.7202c-30.50941,-29.72719 -61.01882,-59.45721 -91.52824,-89.1844c-5.68733,-5.54332 -14.41601,3.16842 -8.7202,8.71738l0,0z"
							/>
							<path
								d="m132.3601,163.30016c30.50941,-29.72719 61.01882,-59.45721 91.52824,-89.1844c5.69298,-5.54896 -3.03004,-14.26352 -8.7202,-8.7202c-30.50941,29.72719 -61.01882,59.45721 -91.52824,89.1844c-5.69298,5.54896 3.03004,14.26352 8.7202,8.7202l0,0z"
							/>
							<path
								d="m223.5523,184.34386c-20.30101,-19.25335 -40.60485,-38.50387 -60.90587,-57.75722c-5.75793,-5.4586 -14.49225,3.24466 -8.7202,8.7202c20.30101,19.25335 40.60485,38.50387 60.90587,57.75722c5.75793,5.4586 14.49225,-3.24748 8.7202,-8.7202l0,0z"
							/>
							<path
								d="m41.71857,193.06124c20.30101,-19.25335 40.60485,-38.50387 60.90587,-57.75722c5.76923,-5.47272 -2.95945,-14.18162 -8.7202,-8.7202c-20.30101,19.25335 -40.60485,38.50387 -60.90587,57.75722c-5.76923,5.47272 2.95945,14.18445 8.7202,8.7202l0,0z"
							/>
						</svg></a
					>
				</li> */}
						<li>
							<a
								href="https://www.linkedin.com/in/laurens-duin-497b9a1a9/"
								target="_blank">
								<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
									<path d="m4.8794,85.30951l52.78173,0l0,169.77177l-52.78173,0l0,-169.77177zm26.39228,-84.3908c16.86967,0 30.57929,13.70961 30.57929,30.60758c0,16.88099 -13.70961,30.5906 -30.57929,30.5906c-16.90928,0 -30.57929,-13.70961 -30.57929,-30.5906c0,-16.89796 13.67001,-30.60758 30.57929,-30.60758" />
									<path d="m90.75546,85.30951l50.61185,0l0,23.21525l0.72141,0c7.04435,-13.35315 24.262,-27.41923 49.92439,-27.41923c53.43242,0 63.29451,35.15104 63.29451,80.86296l0,93.11278l-52.74213,0l0,-82.5604c0,-19.69307 -0.34232,-45.01597 -27.41923,-45.01597c-27.45884,0 -31.64867,21.46406 -31.64867,43.60144l0,83.97493l-52.74213,0l0,-169.77177z" />
								</svg>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</footer>
	);
}