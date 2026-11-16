import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';
const COOKIE_NAME = 'sakif_admin_session';
function signature(value: string) {
 const secret=process.env.ADMIN_SESSION_SECRET; if(!secret) throw new Error('Admin session secret is not configured.');
 return createHmac('sha256',secret).update(value).digest('base64url');
}
export function verifyAdminRequest(request: NextRequest) {
 const token=request.cookies.get(COOKIE_NAME)?.value; if(!token)return false;
 const [payload,supplied]=token.split('.'); if(!payload||!supplied)return false;
 const expected=signature(payload),a=Buffer.from(supplied),b=Buffer.from(expected);
 if(a.length!==b.length||!timingSafeEqual(a,b))return false;
 try {const d=JSON.parse(Buffer.from(payload,'base64url').toString());return d.sub===process.env.ADMIN_USERNAME&&d.exp>Math.floor(Date.now()/1000)}catch{return false}
}
