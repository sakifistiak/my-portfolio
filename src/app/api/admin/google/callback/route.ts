import { NextRequest,NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
export const runtime='nodejs';
export async function GET(request:NextRequest){
 const code=request.nextUrl.searchParams.get('code'),state=request.nextUrl.searchParams.get('state'),saved=request.cookies.get('google_oauth_state')?.value,error=request.nextUrl.searchParams.get('error');
 const fail=(message:string)=>NextResponse.redirect(new URL('/panel/settings?google_error='+encodeURIComponent(message),request.url));
 if(error)return fail(error);
 if(!code||!state||!saved||state!==saved)return fail('OAuth state validation failed.');
 const clientId=process.env.GOOGLE_CLIENT_ID,clientSecret=process.env.GOOGLE_CLIENT_SECRET;
 if(!clientId||!clientSecret)return fail('Google OAuth client is not configured.');
 try{
  const tokenResponse=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:clientId,client_secret:clientSecret,redirect_uri:process.env.GOOGLE_REDIRECT_URI||'https://sakif.pro.bd/api/admin/google/callback',grant_type:'authorization_code'}),cache:'no-store'});
  const tokenData=await tokenResponse.json();
  if(!tokenResponse.ok||!tokenData.refresh_token)throw new Error(tokenData.error_description||'Google did not return a refresh token. Reconnect and grant offline access.');
  const profileResponse=await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{headers:{Authorization:'Bearer '+tokenData.access_token},cache:'no-store'});
  const profile=await profileResponse.json();
  const calendarResponse=await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList/primary',{headers:{Authorization:'Bearer '+tokenData.access_token},cache:'no-store'});
  const calendar=await calendarResponse.json();
  if(!calendarResponse.ok)throw new Error(calendar.error?.message||'Could not access the primary calendar.');
  const {error:saveError}=await getSupabaseAdmin().from('app_settings').upsert({key:'google_calendar',value:{refresh_token:tokenData.refresh_token,calendar_id:'primary',email:profile.email||null,calendar_name:calendar.summary||'Primary Calendar',connected_at:new Date().toISOString()}});
  if(saveError)throw saveError;
  const response=NextResponse.redirect(new URL('/panel/settings?google=connected',request.url));
  response.cookies.delete('google_oauth_state');
  return response;
 }catch(e){return fail(e instanceof Error?e.message:'Google connection failed.')}
}
