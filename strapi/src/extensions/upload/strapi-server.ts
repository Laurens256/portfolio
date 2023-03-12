export default (plugin) => {
  const imageManipulation = plugin.services['image-manipulation'];
  plugin.services['image-manipulation'] = () => {
      return {
          ...imageManipulation(),
          generateThumbnail: () => { }
      };
  };
  return plugin;
};
