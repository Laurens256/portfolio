<script lang="ts">
	import { PageHeader } from '$components';
	import { BasicInfo, Experience, Education } from './components';
</script>

<PageHeader heading="About me" />

<BasicInfo />

<Experience />

<Education />

<p class="resumeCtaContainer">
	Want to know more?
	<a
		href="/Laurens_Duin_resume.pdf"
		class="resumeLink underline"
		target="_blank"
		download="Laurens_Duin_resume.pdf"
	>
		Download my resume
	</a>
</p>

<style>
  .resumeCtaContainer {
    margin-top: 0.5rem;
  }
</style>
