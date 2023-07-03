declare const fetch: Function;

export default {
  pingServer: {
    task: () => {
      fetch('https://admin.laurensduin.nl/');
      console.log('Pinging server');
    },
    options: {
      // rule: '*/1 * * * *' // Every minute,
      rule: '*/13 * * * *' // Every 13 minutes, server spins down after 15 minutes of inactivity (render)
    },
  },
};
