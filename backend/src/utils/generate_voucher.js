import prisma from "../application/database.js";
import crypto from "crypto";

const generate_voucher = async (id) => {
  const today = new Date();
  const check = await prisma.voucher.findMany({ where: { user_id: id } });

  if (check.length > 0) {
    const expiredVouchers = check.filter((voucher) => today >= voucher.exp);

    if (expiredVouchers.length > 0) {
      for (const voucher of expiredVouchers) {
        await prisma.voucher.delete({ where: { id: voucher.id } });
      }
    } else {
      return check;
    }
  }

  const randomString1 = crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10);
  const randomString2 = crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10);
  const exp = new Date();
  exp.setMonth(exp.getMonth() + 3);

  await prisma.voucher.createMany({
    data: [
      {
        code: randomString1,
        value: 10000,
        is_default: true,
        exp,
        user_id: id,
      },
      {
        code: randomString2,
        value: 10000,
        is_default: true,
        exp,
        user_id: id,
      },
    ],
  });

  const voucher = await prisma.voucher.findMany({where: {user_id: id}})

  return voucher;
};

export default generate_voucher;
