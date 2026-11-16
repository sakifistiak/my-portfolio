import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { verifyAdminRequest } from '@/lib/admin-api';
export const runtime='nodejs';
export async function GET(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 const id=process.env.GOOGLE_CLIENT_ID,secret=process.env.GOOGLE_CLIENT_SECRET;
 if(!id||!secret)return NextResponse.json({error:'Google OAuth client is not configured.'},{status:503});
 const state=randomBytes(32).toString('hex');
 const redirectUri=process.env.GOOGLE_REDIRECT_URI||'https://sakif.pro.bd/api/admin/google/callback';
 const url=new URL('https://accounts.google.com/o/oauth2/v2/auth');
 url.search=new URLSearchParams({client_id:id,redirect_uri:redirectUri,response_type:'code',scope:'openid email profile https://www.googleapis.com/auth/calendar',access_type:'offline',prompt:'consent',include_granted_scopes:'true',state}).toString();
 const response=NextResponse.redirect(url);
 response.cookies.set('google_oauth_state',state,{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:600});
 return response;
}
