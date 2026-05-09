

const validateRequest = (schema) => {

    // ตรวจสอบตาม schema ที่กำหนดไว้ 
  return (req, res, next) => {
    const result = schema.safeParse(req.body); // เช็คข้อมูลใน body 
    // console.log('result:', JSON.stringify(result));

    if (!result.success) {
        // errors massage
        const errors = result.error?.issues?.map(err => err.message) ?? ['Invalid request'];
        return res.status(400).json({ message: errors.join(', ') });
    }
    
    req.body = result.data;
    next();
  };
};



module.exports = { validateRequest };