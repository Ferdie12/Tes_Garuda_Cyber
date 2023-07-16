import prisma from "../application/database.js";
import crypto from "crypto";

const generate_voucher = async (id) => {
  const today = new Date();
  const check = await prisma.voucher.findFirst({ where: { user_id: id } });

  if (check) {
    if (today > check.exp) {
      await prisma.voucher.delete({ where: { id: check.id } })
    } else {
      return check;
    }
  }

  const randomString1 = crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10);
  const exp = new Date();
  exp.setMonth(exp.getMonth() + 3);

  const voucher = await prisma.voucher.create({
    data: 
      {
        code: randomString1,
        value: 10000,
        is_default: true,
        exp,
        user_id: id,
      },
  });
  return voucher;
};

export default generate_voucher;
