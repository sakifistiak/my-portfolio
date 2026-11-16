import {NextRequest,NextResponse} from 'next/server';
import {verifyAdminRequest} from '@/lib/admin-api';
import {getSupabaseAdmin} from '@/lib/supabase';
export async function GET(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 const {data}=await getSupabaseAdmin().from('app_settings').select('value').eq('key','google_calendar').maybeSingle();
 const v=data?.value||{};
 return NextResponse.json({connected:!!v.refresh_token,email:v.email||null,calendarName:v.calendar_name||null,calendarId:v.calendar_id||null});
}
