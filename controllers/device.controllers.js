const { throwError } = require('../functions/throwError');
const { getPrimaryLink } = require('../functions/getPrimaryLink');
const { getSecondaryLink } = require('../functions/getSecondaryLink');
const db = require('../models/index');

const getRedirect = async (req, res, next) => {
  const scannerId = req.params.scannerId;
  const key = req.params.key;
  let setAccountAction = false;

  try {
    const scannerData = await db.Scanner.findByPk(scannerId, {
      include: { model: db.Device },
    }).then((scanner) => {
      if (!scanner) {
        throwError(
          404,
          'ไม่พบ scanner นี้',
          {
            scannerId: scannerId,
          },
          false
        );
      }
      if (scanner.key !== key) {
        throwError(
          404,
          'Key ไม่ถูกต้อง',
          {
            scannerId: scannerId,
            key: key,
          },
          false
        );
      }
      if (!scanner.Device.accountId) {
        setAccountAction = true;
        return;
      }

      const accountId = scanner.Device.accountId;
      const profileType = scanner.type;

      if (profileType === 'secondary') {
        return getSecondaryLink(accountId);
      }
      return getPrimaryLink(accountId);
    });
    if (setAccountAction) {
      return res.status(200).json({
        setAccountAction: true,
        message: 'ตั้งค่า Device เชื่อม Account',
      });
    }
    return res.status(200).json({ linkId: scannerData });
  } catch (error) {
    next(error);
  }
};

const activate = (req, res, next) => {
  const accountId = req.account.id;
  const scannerId = req.body.scannerId;
  const key = req.body.key;

  db.Scanner.findByPk(scannerId, {
    include: { model: db.Device },
  })
    .then((scanner) => {
      if (!scanner) {
        throwError(
          404,
          'ไม่พบ scanner นี้',
          {
            scannerId: scannerId,
          },
          false
        );
      }
      if (scanner.key !== key) {
        throwError(
          404,
          'Key ไม่ถูกต้อง',
          {
            scannerId: scannerId,
            key: key,
          },
          false
        );
      }

      return db.Device.update(
        { accountId: accountId },
        { where: { id: scanner.deviceId } }
      );
    })
    .then((update) => {
      if (update[0]) {
        return res.status(200).json('อัพเดทสำเร็จ');
      }
      throwError(
        404,
        'Update ไม่สำเร็จ',
        {
          accountId: accountId,
          scannerId: scannerId,
          key: key,
        },
        false
      );
    })
    .catch((error) => {
      next(error);
    });
};

const getDeviceAll = (req, res, next) => {
  const accountId = req.account.id;

  db.Device.findAll({
    where: { accountId: accountId },
    include: { model: db.DeviceType },
  })
    .then((devices) => {
      return res.status(200).json(devices);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getRedirect,
  activate,
  getDeviceAll,
};
