const { throwError } = require('../functions/throwError');
const { getPrimaryLink } = require('../functions/getPrimaryLink');
const { getSecondaryLink } = require('../functions/getSecondaryLink');
const db = require('../models/index');

const getRedirect = async (req, res, next) => {
  const scannerId = req.params.scannerId;
  const key = req.params.key;

  try {
    const scannerData = await db.Scanner.findByPk(scannerId, {
      include: { model: db.Device },
    }).then((scanner) => {
      if (!scanner) {
        throwError(404, 'ไม่พบ scanner นี้', {
          scannerId: scannerId,
        });
      }
      if (scanner.key !== key) {
        throwError(404, 'Key ไม่ถูกต้อง', {
          scannerId: scannerId,
          key: key,
        });
      }
      const accountId = scanner.Device.accountId;
      const profileType = scanner.type;

      if (profileType === 'secondary') {
        return getSecondaryLink(accountId);
      }
      return getPrimaryLink(accountId);
    });
    return res.status(200).json({ linkId: scannerData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRedirect,
};
