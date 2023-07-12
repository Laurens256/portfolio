declare const fetch: Function;

export default {
  pingServer: {
    task: () => {
      fetch('https://admin.laurensduin.nl/admin/');
      console.log('Pinging server');
    },
    options: {
      // rule: '*/1 * * * *' // Every minute,
      rule: '*/12 * * * *' // Every 12 minutes, server spins down after 15 minutes of inactivity (render)
    },
  },
};
