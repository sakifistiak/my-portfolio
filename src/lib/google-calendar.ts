import { getSupabaseAdmin } from '@/lib/supabase';
const GOOGLE_TOKEN_URL='https://oauth2.googleapis.com/token';
const GOOGLE_API='https://www.googleapis.com/calendar/v3';
export const TIME_ZONE='Asia/Dhaka';
export const MEETING_TYPES={general:{label:'General Discussion',duration:15},project:{label:'Project Discussion',duration:30},consultation:{label:'Business / SaaS Consultation',duration:30},technical:{label:'Technical Discussion',duration:45},collaboration:{label:'Collaboration / Partnership',duration:30}} as const;
export type MeetingType=keyof typeof MEETING_TYPES;
export async function getCalendarConfig(){
 const {data}=await getSupabaseAdmin().from('app_settings').select('value').eq('key','google_calendar').maybeSingle();
 const saved=data?.value||{};
 const clientId=process.env.GOOGLE_CLIENT_ID,clientSecret=process.env.GOOGLE_CLIENT_SECRET;
 const refreshToken=saved.refresh_token||process.env.GOOGLE_REFRESH_TOKEN;
 const calendarId=saved.calendar_id||process.env.GOOGLE_CALENDAR_ID;
 if(!clientId||!clientSecret||!refreshToken||!calendarId)throw new Error('Google Calendar is not connected. Open the admin panel and connect your Google account.');
 return {clientId,clientSecret,refreshToken,calendarId};
}
export async function getGoogleAccessToken(){
 const c=await getCalendarConfig();
 const response=await fetch(GOOGLE_TOKEN_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:c.clientId,client_secret:c.clientSecret,refresh_token:c.refreshToken,grant_type:'refresh_token'}),cache:'no-store'});
 const data=await response.json();
 if(!response.ok||!data.access_token)throw new Error(data.error_description||'Unable to authenticate with Google Calendar.');
 return data.access_token as string;
}
export async function calendarRequest<T>(path:string,init?:RequestInit):Promise<T>{
 const c=await getCalendarConfig(),token=await getGoogleAccessToken();
 const response=await fetch(`${GOOGLE_API}/calendars/${encodeURIComponent(c.calendarId)}${path}`,{...init,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json',...init?.headers},cache:'no-store'});
 const data=await response.json();if(!response.ok)throw new Error(data.error?.message||'Google Calendar request failed.');return data as T;
}
export function isMeetingType(value:unknown):value is MeetingType{return typeof value==='string'&&Object.prototype.hasOwnProperty.call(MEETING_TYPES,value)}
