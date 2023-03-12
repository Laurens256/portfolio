export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-supabase-strage',
      providerOptions: {
        url: env("SUPABASE_API_URL"),
        apiKey: env("SUPABASE_API_KEY"),
        bucket: env("SUPABASE_BUCKET"),
      },
    },
  },
});
