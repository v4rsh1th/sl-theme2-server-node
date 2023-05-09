const { readdirSync } = require('fs');
const { join } = require('path');

export default (req, res) => {
  const {
    query: { plugin },
  } = req;

  try {
    const zips = readdirSync(join(process.cwd(), 'plugins', plugin));

    // Passing the latest file, the previous file can be used as an older version
    const latestVersion = zips[1];

    return res.json({
      version: latestVersion,
      // package: `http://localhost:3000/plugins/${plugin}/${latestVersion}`
      package: `https://node-rn.vercel.app/plugins/${plugin}/${latestVersion}`
    })
  } catch (e) {
    return res.status(404).json({
      message: 'Plugin not found',
    });
  };
};